package org.cecd.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommandRequest {
    private String senserNumber;
    private boolean command;
}
