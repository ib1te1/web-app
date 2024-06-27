package ru.troshin.web_service_app.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.troshin.web_service_app.enums.Status;
import ru.troshin.web_service_app.models.Order;
import ru.troshin.web_service_app.repositories.OrderRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestService {


    private final OrderRepository orderRepository;

    public List<Order> getOrders(Long id, Status status){
        orderRepository.findByUserIdAndStatus(id, status);
    }
}
