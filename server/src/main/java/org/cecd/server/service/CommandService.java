package org.cecd.server.service;

import lombok.RequiredArgsConstructor;
import org.cecd.server.dto.CommandRequest;
import org.cecd.server.utils.AgentClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommandService {

    private final AgentClient agentClient;

    public String forwardToAgent(CommandRequest commandRequest) {
        // agent로 POST 요청
        return agentClient.sendCommand(commandRequest);
    }

}

