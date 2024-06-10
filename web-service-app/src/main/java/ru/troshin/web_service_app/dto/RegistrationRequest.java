package ru.troshin.web_service_app.dto;

import lombok.Data;

@Data
public class RegistrationRequest {
    private String firstname;
    private String surname;
    private String email;
    private String password;
    private String phone;
    private String username;
}
