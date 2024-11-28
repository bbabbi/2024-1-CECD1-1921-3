package org.cecd.server.controller;

import lombok.RequiredArgsConstructor;
import org.cecd.server.dto.OccupancyResponse;
import org.cecd.server.service.OccupancyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/occupancy")
public class OccupancyController {

    private final OccupancyService occupancyService;

    @GetMapping("/{location}")
    public ResponseEntity<OccupancyResponse> getOccupancy(@PathVariable String location) {
        OccupancyResponse response = occupancyService.getOccupancyInfo(location);
        return ResponseEntity.ok(response);
    }
}

