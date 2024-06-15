package ru.troshin.web_service_app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
@Table(name="services")
public class MyService {
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
    @JoinColumn(name = "executor_id", nullable = false)
    private Executor executor;

    @OneToMany(mappedBy = "service")
    private Set<Order> orders;
}
