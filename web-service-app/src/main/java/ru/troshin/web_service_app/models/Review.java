package ru.troshin.web_service_app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Builder
@EqualsAndHashCode
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is mandatory")
    @Size(max = 50, message = "Title must be less than 100 characters")
    private String title;

    @Size( max = 1000)
    private String content;

    @Min(value = 1, message = "Rating must be positive")
    @Max(value = 5,message = "Value must be no more than 5")
    private int rating;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    @ManyToOne
    @JoinColumn(name = "executor_id", nullable = false)
    private Executor executor;

    @Column(nullable = false)
    private LocalDate createdAt;

    @Column(name = "review_picture")
    private String reviewPicture;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDate.now();
    }
}
