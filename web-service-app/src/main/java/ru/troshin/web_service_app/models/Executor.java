package ru.troshin.web_service_app.models;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.*;
import lombok.experimental.SuperBuilder;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@SuperBuilder
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Table(name="executors")
public class Executor extends User {

    @Min(value = 1, message = "Rating must be positive")
    @Max(value = 5,message = "Value must be no more than 5")
    private int rating;

    @Size(max = 500, message = "Description must be less than 500 characters")
    private String description;

    @Min(value = 0, message = "Work experience must be positive")
    private Double workExperience;

    @Min(value = 0, message = "Orders amount must be positive")
    private int ordersAmount;
}