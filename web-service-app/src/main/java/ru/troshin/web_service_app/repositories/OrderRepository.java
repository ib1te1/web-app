package ru.troshin.web_service_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.troshin.web_service_app.enums.Status;
import ru.troshin.web_service_app.models.Order;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findByExecutorId(Long executorId);
    List <Order> findByExecutorIdAndStatus (Long executorId, Status status);
    List<Order> findByUserIdAndStatus(Long userId, Status status);
}
