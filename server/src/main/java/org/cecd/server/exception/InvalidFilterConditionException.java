package org.cecd.server.exception;

import org.cecd.server.common.dto.ErrorMessage;

public class InvalidFilterConditionException extends RuntimeException {
    private final ErrorMessage errorMessage;

    public InvalidFilterConditionException() {
        super(ErrorMessage.INVALID_FILTER_CONDITION.getMessage());
        this.errorMessage = ErrorMessage.INVALID_FILTER_CONDITION;
    }

    public ErrorMessage getErrorMessage() {
        return errorMessage;
    }
}
