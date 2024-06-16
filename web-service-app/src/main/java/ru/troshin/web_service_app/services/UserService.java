package ru.troshin.web_service_app.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;
import ru.troshin.web_service_app.dto.ProfileDTO;
import ru.troshin.web_service_app.dto.RegistrationRequest;
import ru.troshin.web_service_app.enums.Role;
import ru.troshin.web_service_app.models.Executor;
import ru.troshin.web_service_app.models.User;
import ru.troshin.web_service_app.repositories.UserRepository;
import ru.troshin.web_service_app.utils.validators.UserValidator;

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

    private final UserValidator userValidator;


    public void updateUser(Executor user) {
        Optional<User> existingUser = userRepository.findById(user.getId());
        if (existingUser.isPresent()) {
            User updateUser = existingUser.get();
            updateUser.setFirstname(user.getFirstname());
            updateUser.setSurname(user.getSurname());
            updateUser.setGender(user.getGender());
            updateUser.setPhone(user.getPhone());
            updateUser.setEmail(user.getEmail());

            // Check if the user is an Executor and update specific fields
            if (updateUser instanceof Executor) {
                Executor executor = (Executor) updateUser;
                executor.setDescription(user.getDescription());
                executor.setWorkExperience(user.getWorkExperience());
            }

            userRepository.save(updateUser);
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    public void deleteUser(Long userId) {
        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.getOrders().clear();
            System.out.println(user.getOrders());
            userRepository.save(user);
            userRepository.delete(user);
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    public void registerUser(RegistrationRequest registrationRequest, BindingResult bindingResult) {
        if (registrationRequest.getRole() == Role.ROLE_EXECUTOR) {
            Executor executor = Executor.builder()
                    .username(registrationRequest.getUsername())
                    .password(registrationRequest.getPassword())
                    .email(registrationRequest.getEmail())
                    .firstname(registrationRequest.getFirstname())
                    .surname(registrationRequest.getSurname())
                    .phone(registrationRequest.getPhone())
                    .gender(registrationRequest.getGender())
                    .role(registrationRequest.getRole())
                    .description(registrationRequest.getDescription())
                    .workExperience(registrationRequest.getWorkExperience())
                    .profilePictureURL(null)
                    .build();
            userValidator.validate(executor, bindingResult);
            if (bindingResult.hasErrors()) {
                throw new IllegalArgumentException("Validation errors occurred");
            }
            createExecutor(executor);
        } else {
            User user = User.builder()
                    .username(registrationRequest.getUsername())
                    .password(registrationRequest.getPassword())
                    .email(registrationRequest.getEmail())
                    .firstname(registrationRequest.getFirstname())
                    .surname(registrationRequest.getSurname())
                    .phone(registrationRequest.getPhone())
                    .gender(registrationRequest.getGender())
                    .role(registrationRequest.getRole())
                    .profilePictureURL(null)
                    .build();
            userValidator.validate(user, bindingResult);
            if (bindingResult.hasErrors()) {
                throw new IllegalArgumentException("Validation errors occurred");
            }
            createUser(user);
        }
    }

    public void createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setProfilePictureURL("/images/default_profile_picture_user.jpg");
        userRepository.save(user);
    }

    public void createExecutor(Executor executor) {
        executor.setPassword(passwordEncoder.encode(executor.getPassword()));
        executor.setProfilePictureURL("/images/default_profile_picture_executor.jpg");
        userRepository.save(executor);
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
