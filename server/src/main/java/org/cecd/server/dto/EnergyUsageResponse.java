package org.cecd.server.dto;

import java.time.LocalDateTime;

public record EnergyUsageResponse(
        String sensorNumber,
        LocalDateTime dateTime,
        double result,
        double percentage
) {}