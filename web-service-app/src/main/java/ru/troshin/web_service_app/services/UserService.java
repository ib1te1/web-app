package ru.troshin.web_service_app.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.troshin.web_service_app.models.User;
import ru.troshin.web_service_app.repositories.UserRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    public void updateUser(User user) {
        Optional<User> existingUser = userRepository.findById(user.getId());
        if (existingUser.isPresent()) {
            User updateUser = existingUser.get();
            updateUser.setFirstname(user.getFirstname());
            updateUser.setSurname(user.getSurname());
            updateUser.setGender(user.getGender());
            updateUser.setPhone(user.getPhone());
            updateUser.setEmail(user.getEmail());
            userRepository.save(updateUser);
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    public void deleteUser(Long userId) {
        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isPresent()) {
            userRepository.delete(existingUser.get());
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    public void createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setProfilePictureURL("/images/default_profile_picture.jpg");
        userRepository.save(user);
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public Optional<User> findUserById(Long id){
        return userRepository.findById(id);
    }

    public void uploadUserProfileImage(Long userId, MultipartFile file) {
        Optional<User> userOptional = findUserById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String uploadDir = "src/main/resources/static/images";
            String filename = userId + "_" + file.getOriginalFilename();
            String filePath = uploadDir + File.separator + filename;

            try {
                Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
                user.setProfilePictureURL("/images/" + filename);
                userRepository.save(user);
            } catch (IOException e) {
                throw new IllegalStateException("Failed to upload image", e);
            }
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    public byte[] getUserProfileImage(Long userId) {
        Optional<User> userOptional = findUserById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String filePath = "src/main/resources/static" + user.getProfilePictureURL();
            try {
                return Files.readAllBytes(Paths.get(filePath));
            } catch (IOException e) {
                throw new IllegalStateException("Failed to read image", e);
            }
        } else {
            throw new IllegalStateException("User not found");
        }
    }


}
