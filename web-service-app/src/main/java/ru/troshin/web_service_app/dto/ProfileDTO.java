package ru.troshin.web_service_app.dto;

import lombok.Data;
import ru.troshin.web_service_app.enums.Gender;
import ru.troshin.web_service_app.enums.Role;
import ru.troshin.web_service_app.models.Executor;
import ru.troshin.web_service_app.models.User;

import java.time.LocalDate;

@Data
public class ProfileDTO {
    private Long id;
    private String firstname;
    private String surname;
    private String username;
    private String email;
    private String phone;
    private LocalDate createdAt;
    private Gender gender;
    private byte[] profilePicture;
    private Role role;

    private Double workExperience;
    private String description;

    public ProfileDTO(User user,byte[] profilePicture) {
        System.out.println("DTO");
        System.out.println(user.getId());
        this.id = user.getId();
        this.firstname = user.getFirstname();
        this.surname = user.getSurname();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.createdAt = user.getCreatedAt();
        this.role = user.getRole();
        this.gender=user.getGender();
        this.profilePicture=profilePicture;


        if (user instanceof Executor) {
            Executor executor = (Executor) user;
            this.description = executor.getDescription();
            this.workExperience = executor.getWorkExperience();
        }
    }
}
