package org.cecd.server.utils;

import lombok.RequiredArgsConstructor;
import org.cecd.server.dto.CommandRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class AgentClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String AGENT_URL = /*agent-server-ip*/ "http://192.168.0.113:3000/control";

    public String sendCommand(CommandRequest commandRequest) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<CommandRequest> request = new HttpEntity<>(commandRequest, headers);

        try {
            restTemplate.postForEntity(AGENT_URL, request, String.class);
            return "Command sent successfully!";
        } catch (Exception e) {
            return "Failed to send command to agent: " + e.getMessage();
        }
    }
}
