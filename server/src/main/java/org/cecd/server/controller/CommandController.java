package org.cecd.server.controller;

import lombok.RequiredArgsConstructor;
import org.cecd.server.dto.CommandRequest;
import org.cecd.server.service.CommandService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
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

    @MessageMapping("/socket/control") // 클라이언트가 이 경로로 메시지를 송신
    @SendTo("/topic/commands") // 이 경로를 구독 중인 모든 클라이언트에게 메시지 전달
    public CommandRequest sendCommand (CommandRequest commandRequest) {
        System.out.println("Received command: " + commandRequest); // 로그 추가
        return commandRequest; // command는 클라이언트로 전달할 메시지
    }
}
