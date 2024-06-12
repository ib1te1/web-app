package ru.troshin.web_service_app.dto;

import lombok.Data;
import ru.troshin.web_service_app.enums.Gender;

@Data
public class RegistrationRequest {
    private String firstname;
    private String surname;
    private String email;
    private String password;
    private String phone;
    private String username;
    private Gender gender;
}
