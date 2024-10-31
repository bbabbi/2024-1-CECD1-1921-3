package org.cecd.server.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorMessage {
    DEVICE_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "해당하는 장치가 존재하지 않습니다."),
    LAYOUT_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "해당 강의실에 대한 IoT 기기 배치도가 존재하지 않습니다."),
    INVALID_FILTER_CONDITION(HttpStatus.BAD_REQUEST.value(), "빌딩명칭이 'All'인 경우 호실은 'All'만 가능합니다.")
    ;
    private final int status;
    private final String message;
}