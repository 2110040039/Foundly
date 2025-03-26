package com.foundly.app.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum RequestType {
    CLAIM, HANDOVER;

    @JsonCreator
    public static RequestType fromString(String value) {
        return RequestType.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return this.name();
    }
}
