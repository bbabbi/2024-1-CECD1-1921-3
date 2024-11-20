package org.cecd.server.controller;

import lombok.RequiredArgsConstructor;
import org.cecd.server.dto.CommandRequest;
import org.cecd.server.service.CommandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class CommandController {

    private final CommandService commandService;

    @PostMapping("/control")
    public ResponseEntity<String> sendControlCommand(@RequestBody CommandRequest commandRequest) {
        String result = commandService.forwardToAgent(commandRequest);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/command")
    public ResponseEntity<CommandRequest> echoControlCommand(@RequestBody CommandRequest commandRequest) {
        return ResponseEntity.ok(commandRequest);
    }
}
