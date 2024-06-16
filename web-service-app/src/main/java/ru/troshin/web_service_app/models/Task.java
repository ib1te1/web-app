package ru.troshin.web_service_app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@EqualsAndHashCode
@Table(name="tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    @Size(min = 3, max = 50)
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Description is mandatory")
    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Min(value = 0, message = "Minimum price must be positive")
    private Double priceMin;

    @Min(value = 0, message = "Maximum price must be positive")
    private Double priceMax;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "task",cascade = CascadeType.ALL)
    private Set<Order> orders;

    @FutureOrPresent(message = "Start date must be in the present or future")
    private LocalDate startDate;

    @Future(message = "End date must be in the future")
    private LocalDate endDate;
}
