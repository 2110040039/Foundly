package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationRequest {
    private String name;
    private String email;
    //private String phone;
    //private String username;
    private String password;
    private String employeeId;// New field for username
}