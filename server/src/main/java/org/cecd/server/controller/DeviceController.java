package org.cecd.server.controller;

import org.cecd.server.domain.Device;
import org.cecd.server.exception.InvalidFilterConditionException;
import org.cecd.server.service.DeviceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping("/filter")
    public List<Device> getDevicesByBuildingAndLocation(
            @RequestParam String buildingName,
            @RequestParam String location) {


        if ("All".equals(buildingName) && "All".equals(location)) {
            return deviceService.getAllDevices();
        }

        if ("All".equals(buildingName) && !"All".equals(location)) {
            throw new InvalidFilterConditionException();
        }

        if (!"All".equals(buildingName) && "All".equals(location)) {
            return deviceService.getDevicesByBuilding(buildingName);
        }

        return deviceService.getDevicesByBuildingAndLocation(buildingName, location);
    }
}