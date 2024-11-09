package org.cecd.server.repository;

import org.cecd.server.domain.EnergyData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface EnergyDataRepository extends JpaRepository<EnergyData, Long> {
    Optional<EnergyData> findBySensorNumberAndDateTime(String sensorNumber, LocalDateTime dateTime);
}
