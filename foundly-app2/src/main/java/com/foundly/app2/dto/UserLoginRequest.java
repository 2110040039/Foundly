package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginRequest {
    private String usernameOrEmail;
    private String password;
}