package org.cecd.server.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class CommandRequest {
    private String sensorId;
    private boolean command;
}
