package org.cecd.server.service;

import lombok.RequiredArgsConstructor;
import org.cecd.server.domain.LectureSchedule;
import org.cecd.server.dto.OccupancyResponse;
import org.cecd.server.repository.LectureScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OccupancyService {

    private final LectureScheduleRepository lectureScheduleRepository;

    public OccupancyResponse getOccupancyInfo(String location) {
        // 현재 시간 및 요일 가져오기
        LocalDateTime now = LocalDateTime.now();
        String currentDay = now.getDayOfWeek().toString(); // 현재 요일 동적으로 설정
        LocalTime currentTime = LocalTime.of(now.getHour(), now.getMinute()); // 초 단위 제거

        // 로그 추가
        System.out.println("Current Time: " + currentTime);
        System.out.println("Current Day: " + currentDay);

        // 해당 location의 강의 일정 가져오기
        List<LectureSchedule> schedules = lectureScheduleRepository.findByLocationAndLectureDay(location, currentDay);

        if (schedules.isEmpty()) {
            System.out.println("No schedules found for location: " + location + " on day: " + currentDay);
        }

        // 현재 강의 중인지 확인
        boolean isLecturing = schedules.stream()
                .anyMatch(schedule -> {
                    LocalTime startTime = LocalTime.parse(schedule.getStartTime().trim());
                    LocalTime endTime = LocalTime.parse(schedule.getEndTime().trim());

                    // 로그 추가
                    System.out.println("Schedule Start: " + startTime + ", End: " + endTime);
                    System.out.println("Is Current Time After Start: " + currentTime.isAfter(startTime));
                    System.out.println("Is Current Time Before End: " + currentTime.isBefore(endTime));

                    return currentTime.isAfter(startTime) && currentTime.isBefore(endTime);
                });

        // 상태 계산
        boolean occupancyStatus = !isLecturing;
        boolean wasteStatus = !isLecturing;

        return new OccupancyResponse(location, isLecturing, occupancyStatus, wasteStatus);
    }
}
