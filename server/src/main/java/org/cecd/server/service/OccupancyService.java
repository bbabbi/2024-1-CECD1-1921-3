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
        String currentDay = now.getDayOfWeek().toString();
        LocalTime currentTime = now.toLocalTime();

        // 해당 location의 강의 일정 가져오기
        List<LectureSchedule> schedules = lectureScheduleRepository.findByLocationAndLectureDay(location, currentDay);

        // 현재 강의 중인지 확인
        boolean isLecturing = schedules.stream()
                .anyMatch(schedule -> currentTime.isAfter(LocalTime.parse(schedule.getStartTime()))
                        && currentTime.isBefore(LocalTime.parse(schedule.getEndTime())));

        // 상태 계산
        boolean occupancyStatus = !isLecturing;
        boolean wasteStatus = !isLecturing;

        return new OccupancyResponse(location, isLecturing, occupancyStatus, wasteStatus);
    }
}
