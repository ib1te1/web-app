package ru.troshin.web_service_app.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.troshin.web_service_app.dto.LoginRequest;
import ru.troshin.web_service_app.dto.LoginResponse;
import ru.troshin.web_service_app.dto.RegistrationRequest;
import ru.troshin.web_service_app.enums.Role;
import ru.troshin.web_service_app.models.User;
import ru.troshin.web_service_app.services.UserService;
import ru.troshin.web_service_app.utils.validators.UserValidator;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin()
public class AuthController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;



    @PostMapping("/registration")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest,
                                               BindingResult bindingResult) {
        try {
            userService.registerUser(registrationRequest, bindingResult);
            return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }



    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginPage(@RequestBody LoginRequest loginRequest) {
        System.out.println("Received login request");
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            User user = userService.findUserByUsername(loginRequest.getUsername()).get();
            LoginResponse loginResponse = new LoginResponse(user.getId(), user.getRole().name());
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
