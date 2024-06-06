package org.cecd.server.common.dto;

public record SuccessResponse(
        int status,
        String message
) {

    public static SuccessResponse of(SuccessMessage successMessage) {
        return new SuccessResponse(successMessage.getStatus(), successMessage.getMessage());
    }

}
