package org.cecd.server.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessMessage {

    // example
    MEMBER_CREATE_SUCCESS(HttpStatus.CREATED.value(),"멤버 생성이 완료되었습니다."),
    ;
    private final int status;
    private final String message;
}
