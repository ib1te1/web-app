package ru.troshin.web_service_app.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.troshin.web_service_app.enums.Status;
import ru.troshin.web_service_app.models.Order;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class TestController {

    private final TestService testService;

    public List<Order> getOrders(Long id, Status status) {

    }
}
