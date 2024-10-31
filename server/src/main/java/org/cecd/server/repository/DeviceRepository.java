package org.cecd.server.repository;

import org.cecd.server.domain.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findByBuildingNameAndLocation(String buildingName, String location);
    List<Device> findByBuildingName(String buildingName);
}
