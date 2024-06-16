package ru.troshin.web_service_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import ru.troshin.web_service_app.enums.Role;
@RequiredArgsConstructor
@Data
@AllArgsConstructor
public class LoginResponse {
    private Long userId;
    private String role;
}
