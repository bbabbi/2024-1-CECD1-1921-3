package org.cecd.server.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class EnergyUsageResponse {
    private String sensorNumber;
    private LocalDateTime dateTime;
    private double result;
    private double percentage;
}