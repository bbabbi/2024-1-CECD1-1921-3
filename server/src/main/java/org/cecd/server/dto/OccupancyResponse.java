package org.cecd.server.dto;

public record OccupancyResponse(
        String location,
        boolean isLecturing,
        boolean occupancyStatus,
        boolean wasteStatus
) {}
