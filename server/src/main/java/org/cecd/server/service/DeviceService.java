package org.cecd.server.service;

import org.cecd.server.domain.Device;
import org.cecd.server.repository.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;

    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public List<Device> getDevicesByBuildingAndLocation(String buildingName, String location) {
        return deviceRepository.findByBuildingNameAndLocation(buildingName, location);
    }

    public List<Device> getDevicesByBuilding(String buildingName) {
        return deviceRepository.findByBuildingName(buildingName);
    }

    public Device getDeviceByBuildingAndLocation(String buildingName, String location) {
        return deviceRepository.findByBuildingNameAndLocation(buildingName, location)
                .stream()
                .findFirst()
                .orElse(null);
    }
}