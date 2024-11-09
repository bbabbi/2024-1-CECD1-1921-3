package org.cecd.server.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import org.cecd.server.domain.EnergyData;
import org.cecd.server.dto.EnergyUsageResponse;
import org.cecd.server.repository.EnergyDataRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.cert.X509Certificate;
import java.util.stream.Collectors;

@Service
public class EnergyDataService {

    @Autowired
    private EnergyDataRepository energyDataRepository;
    @Autowired
    private EntityManagerFactory entityManagerFactory;
    private final int THRESHOLD = 57056;

    @Scheduled(fixedRate = 300000)  // 5분마다 크롤링
    public void crawlData() {
        List<String> urls = List.of(
                "https://swiu_testbed.dongguk.edu/sensorboard/67/dataview?senMngno=000100010000000067&prjtype=&sengrpcd=0001&prjgrpcd=0001",
                "https://swiu_testbed.dongguk.edu/sensorboard/68/dataview?senMngno=000100010000000068&prjtype=&sengrpcd=0001&prjgrpcd=0001"
                // 추가 URL
        );

        for (String url : urls) {
            crawlDataFromUrl(url);
        }
    }

    private void crawlDataFromUrl(String url) {
        try {
            // SSL 인증서 무시 설정
            TrustManager[] trustAllCerts = new TrustManager[]{
                    new X509TrustManager() {
                        public X509Certificate[] getAcceptedIssuers() {
                            return null;
                        }

                        public void checkClientTrusted(X509Certificate[] certs, String authType) {}
                        public void checkServerTrusted(X509Certificate[] certs, String authType) {}
                    }
            };

            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

            HostnameVerifier allHostsValid = (hostname, session) -> true;
            HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);

            // 데이터 가져오기
            URL siteURL = new URL(url);
            HttpsURLConnection connection = (HttpsURLConnection) siteURL.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder content = new StringBuilder();
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();

            // Jsoup으로 HTML 파싱
            Document doc = Jsoup.parse(content.toString());

            // 테이블 찾기
            Element table = doc.selectFirst(".board-table");
            if (table != null) {
                Elements rows = table.select("tr");
                for (int i = 1; i < rows.size(); i++) {  // 첫 번째 행은 헤더이므로 제외
                    Element row = rows.get(i);
                    Elements cells = row.select("td");

                    if (cells.size() >= 3) {
                        String sensorId = cells.get(0).text().trim();

                        // 날짜 정보를 LocalDateTime 형식으로 변환
                        Element dateSpan = cells.get(1).selectFirst("span");
                        String dateString = (dateSpan != null && dateSpan.hasAttr("data-date-time")) ?
                                dateSpan.attr("data-date-time") : "N/A";

                        // "(Korean Standard Time)" 제거
                        if (dateString.contains("(")) {
                            dateString = dateString.substring(0, dateString.indexOf("(")).trim();
                        }

                        // 날짜를 LocalDateTime으로 변환
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE MMM dd yyyy HH:mm:ss 'GMT'Z", Locale.ENGLISH);
                        ZonedDateTime zonedDateTime = ZonedDateTime.parse(dateString, formatter);
                        LocalDateTime dateTime = zonedDateTime.toLocalDateTime();

                        String data = cells.get(2).text().trim();

                        // 특정 값이 포함된 데이터 (onoff와 lock) 제외
                        if (data.contains("\"onoff\":\"1\"") && data.contains("\"lock\":\"0\"")) {
                            continue;
                        }

                        // 중복 데이터가 존재하는지 확인
                        Optional<EnergyData> existingData = energyDataRepository.findBySensorNumberAndDateTime(sensorId, dateTime);
                        if (existingData.isPresent()) {
                            continue;  // 중복된 데이터가 이미 존재하면 저장하지 않음
                        }

                        // 새로운 데이터 저장
                        EnergyData energyData = EnergyData.builder()
                                .sensorNumber(sensorId)
                                .dateTime(dateTime)
                                .energy(extractJsonField(data, "energy"))
                                .power(extractJsonField(data, "power"))
                                .current(extractJsonField(data, "current"))
                                .voltage(extractJsonField(data, "voltage"))
                                .enable(Boolean.parseBoolean(extractJsonField(data, "enable")))
                                .threshold((int) Double.parseDouble(extractJsonField(data, "threshold")))
                                .build();

                        energyDataRepository.save(energyData);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 매일 자정 테이블 초기화
    @Scheduled(cron = "0 0 0 * * *")
    public void resetTableData() {
        energyDataRepository.deleteAll();
        resetAutoIncrement();
        System.out.println("데이터베이스 테이블이 초기화되었습니다.");
    }

    private void resetAutoIncrement() {
        String resetSql = "ALTER TABLE energy_data AUTO_INCREMENT = 1";
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            entityManager.createNativeQuery(resetSql).executeUpdate();
            transaction.commit();
        } catch (Exception e) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            e.printStackTrace();
        } finally {
            entityManager.close();
        }
    }

    // JSON 문자열에서 특정 필드를 추출하는 유틸리티 메서드
    private String extractJsonField(String json, String fieldName) {
        String pattern = String.format("\"%s\":\"([^\"]+)\"", fieldName);
        java.util.regex.Pattern regex = java.util.regex.Pattern.compile(pattern);
        java.util.regex.Matcher matcher = regex.matcher(json);
        return matcher.find() ? matcher.group(1) : "";
    }

    public EnergyDataService(EnergyDataRepository energyDataRepository) {
        this.energyDataRepository = energyDataRepository;
    }

    public List<EnergyUsageResponse> getAllEnergyUsages() {
        return energyDataRepository.findAll().stream()
                .map(data -> {
                    double current = Double.parseDouble(data.getCurrent());
                    double voltage = Double.parseDouble(data.getVoltage());
                    double result = current * voltage;
                    double percentage = (result / THRESHOLD) * 100;

                    return new EnergyUsageResponse(
                            data.getSensorNumber(),
                            data.getDateTime(),
                            result,
                            percentage
                    );
                })
                .collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList));
    }
}
