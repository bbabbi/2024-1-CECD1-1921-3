package org.cecd.server.repository;

import org.cecd.server.domain.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findByBuildingNameAndLocation(String buildingName, String location);
    List<Device> findByBuildingName(String buildingName);
}
