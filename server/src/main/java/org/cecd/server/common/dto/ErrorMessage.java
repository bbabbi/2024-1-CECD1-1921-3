package org.cecd.server.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorMessage {
    DEVICE_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "해당하는 장치가 존재하지 않습니다."),
    ;
    private final int status;
    private final String message;
}