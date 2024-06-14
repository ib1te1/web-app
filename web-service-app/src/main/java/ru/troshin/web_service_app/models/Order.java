package ru.troshin.web_service_app.models;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.*;
import ru.troshin.web_service_app.enums.Status;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@EqualsAndHashCode
@Table(name="orders")
public class Order {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="service_id", nullable = false)
    private MyService service;

    @ManyToOne
    @JoinColumn(name = "executor_id", nullable = false)
    private Executor executor;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;

    @FutureOrPresent(message = "Start date must be in the present or future")
    private LocalDate startDate;

    @Future(message = "End date must be in the future")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = false)
    private LocalDate createdAt;

    private LocalDate updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDate.now();
    }
}