package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileUpdateRequest {
    private String name;       // Editable
    private String username;   // Editable
    private String email;      // Editable
    private String password;   // Optional (only updates if not null/empty)
}
