package ru.troshin.web_service_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.troshin.web_service_app.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
