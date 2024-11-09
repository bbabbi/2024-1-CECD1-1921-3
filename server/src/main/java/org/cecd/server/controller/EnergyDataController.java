package org.cecd.server.controller;

import org.cecd.server.dto.EnergyUsageResponse;
import org.cecd.server.service.EnergyDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/energy-usage")
public class EnergyDataController {

    private final EnergyDataService energyDataService;

    public EnergyDataController(EnergyDataService energyDataService) {
        this.energyDataService = energyDataService;
    }

    @GetMapping
    public List<EnergyUsageResponse> getEnergyUsage() {
        return energyDataService.getAllEnergyUsages();
    }
}
