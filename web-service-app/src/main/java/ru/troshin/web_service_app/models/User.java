package ru.troshin.web_service_app.models;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.*;
import lombok.experimental.SuperBuilder;
import ru.troshin.web_service_app.enums.Gender;
import ru.troshin.web_service_app.enums.Role;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@SuperBuilder
@Table(name="users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Firstname is mandatory")
    @Column(nullable = false)
    private String firstname;

    @NotBlank(message = "Surname is mandatory")
    @Column(nullable = false)
    private String surname;

    @NotBlank(message = "Username is mandatory")
    @Column(nullable = false)
    private String username;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password is mandatory")
    @Column(nullable = false)
    private String password;

    @Pattern(regexp = "^(\\+7|8)?\\d{10}$", message = "Invalid Russian phone number")
    private String phone;

    @Column(nullable = false)
    private LocalDate createdAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    private LocalDate updatedAt;

    @Column(name = "profile_picture")
    private String profilePictureURL;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user")
    private Set<Order> orders;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDate.now();
    }
}