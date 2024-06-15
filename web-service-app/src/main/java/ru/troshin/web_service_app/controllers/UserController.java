package ru.troshin.web_service_app.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.troshin.web_service_app.dto.ProfileDTO;
import ru.troshin.web_service_app.models.User;
import ru.troshin.web_service_app.services.UserService;

import java.util.Optional;

@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;


    @GetMapping("/details/{id}")
    public ResponseEntity<ProfileDTO> getUserInfo(@PathVariable Long id) {
        ProfileDTO profileDTO = null;
        try {
            Optional<User> optionalUser = userService.findUserById(id);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                byte[] profilePicture = userService.getUserProfileImage(id);
                profileDTO = new ProfileDTO(user, profilePicture);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return new ResponseEntity<>(profileDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(profileDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        System.out.println(user);
        try {
            userService.updateUser(user);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{userId}/image/upload")
    public ResponseEntity<String> uploadUserProfileImage(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        try {
            userService.uploadUserProfileImage(userId, file);
            return new ResponseEntity<>("Image uploaded successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
