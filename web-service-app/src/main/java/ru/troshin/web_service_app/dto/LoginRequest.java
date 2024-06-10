package ru.troshin.web_service_app.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
