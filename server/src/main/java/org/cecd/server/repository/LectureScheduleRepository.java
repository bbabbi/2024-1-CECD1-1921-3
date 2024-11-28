package org.cecd.server.repository;

import org.cecd.server.domain.LectureSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LectureScheduleRepository extends JpaRepository<LectureSchedule, Long> {
    List<LectureSchedule> findByLocationAndLectureDay(String location, String lectureDay);
}

