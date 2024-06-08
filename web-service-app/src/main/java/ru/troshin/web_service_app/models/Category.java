package ru.troshin.web_service_app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@EqualsAndHashCode
@Table(name="categories")
public class Category {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "Name is mandatory field")
    @Column(nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "category")
    private Set<Service> services;

    @Column(name = "category_picture")
    private String categoryPictureURL;
}
