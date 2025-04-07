package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationRequest {
    private String employeeId;
    private String name;
    private String email;
    private String phone;
    private String password;
}