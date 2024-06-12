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
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
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
                    .gender(registrationRequest.getGender())
                    .profilePictureURL(null)
                    .build();

        userValidator.validate(user,bindingResult);

        if(bindingResult.hasErrors()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        userService.createUser(user);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }



    @PostMapping("/login")
    public ResponseEntity<Long> loginPage(@RequestBody LoginRequest loginRequest) {
        System.out.println("Received login request");
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
//            SecurityContext securityContext= SecurityContextHolder.getContext();
//            securityContext.setAuthentication(authentication);
//            System.out.println(authentication);
//            HttpSession session=request.getSession(true);
//            session.setAttribute("SPRING_SECURITY_CONTEXT",securityContext);
//            System.out.println("Session from auth:"+session);
            return new ResponseEntity<>(userService.findUserByUsername(loginRequest.getUsername()).get().getId(),
                    HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }
}
