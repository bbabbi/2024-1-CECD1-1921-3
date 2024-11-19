package org.cecd.server.controller;

import org.cecd.server.dto.CommandRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CommandControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void sendControlCommand() {
        // 요청 데이터 생성
        CommandRequest commandRequest = new CommandRequest();
        commandRequest.setSenserNumber("12345");
        commandRequest.setCommand(true);

        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        // 요청 엔티티 생성
        HttpEntity<CommandRequest> request = new HttpEntity<>(commandRequest, headers);

        // 테스트용 엔드포인트로 POST 요청 전송
        ResponseEntity<String> response = restTemplate.exchange(
                "/command",
                HttpMethod.POST,
                request,
                String.class
        );

        // 응답 검증
        assertThat(response.getStatusCodeValue()).isEqualTo(200); // 상태 코드 검증
        assertThat(response.getBody()).contains("Command sent successfully"); // 응답 메시지 검증
    }
}
