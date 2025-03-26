package com.foundly.app.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ItemStatus {
    PENDING, MATCHED, RESOLVED;

    @JsonCreator
    public static ItemStatus fromString(String value) {
        for (ItemStatus status : ItemStatus.values()) {
            if (status.name().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid ItemStatus: " + value);
    }

    @JsonValue
    public String toJson() {
        return name();
    }
}
