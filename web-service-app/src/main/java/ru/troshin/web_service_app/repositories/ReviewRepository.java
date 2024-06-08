package ru.troshin.web_service_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.troshin.web_service_app.models.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
}
