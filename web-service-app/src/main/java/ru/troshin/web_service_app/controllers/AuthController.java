package ru.troshin.web_service_app.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.troshin.web_service_app.dto.LoginRequest;
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

    private final UserValidator userValidator;

    private final AuthenticationManager authenticationManager;

    @PostMapping("/registration")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest,
                                          BindingResult bindingResult) {
        System.out.println("Received registration request");
        User user=User.builder()
                    .username(registrationRequest.getUsername())
                    .password(registrationRequest.getPassword())
                    .email(registrationRequest.getEmail())
                    .firstname(registrationRequest.getFirstname())
                    .surname(registrationRequest.getSurname())
                    .phone(registrationRequest.getPhone())
                    .role(Role.ROLE_USER)
                    .build();

        userValidator.validate(user,bindingResult);

        if(bindingResult.hasErrors()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        userService.createUser(user);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }
//    @RequestMapping(value = "/login", method = {RequestMethod.OPTIONS})
//    public ResponseEntity<?> handleLoginOptions() {
//        System.out.println("Here handle");
//        return ResponseEntity.ok().header(HttpHeaders.ALLOW, "OPTIONS").build();
//    }


    @PostMapping("/login")
    public ResponseEntity<String> loginPage(@RequestBody LoginRequest loginRequest) {
        String str=loginRequest.getUsername();
        String password=loginRequest.getPassword();
        System.out.println("Received login request");
        System.out.println(str);
        System.out.println(password);
        System.out.println("123");
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            return new ResponseEntity<>("User authenticated successfully!", HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
        finally {
            System.out.println("123");
        }
    }
//    @GetMapping("/login")
//    public ResponseEntity<String> loginPage() {
//        System.out.println("Get login page");
//        return new ResponseEntity<>("Login page", HttpStatus.OK);
//    }
}
