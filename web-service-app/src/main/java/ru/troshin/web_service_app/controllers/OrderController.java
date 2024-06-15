package ru.troshin.web_service_app.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.troshin.web_service_app.dto.OrderRequest;
import ru.troshin.web_service_app.models.Order;
import ru.troshin.web_service_app.services.OrderService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/task/create")
    public Order createOrder(@RequestBody OrderRequest order){
        return orderService.createOrder(order);
    }

    @GetMapping("/my-orders")
    public List<Order> getMyOrders(@RequestParam Long id){
        System.out.println(id);
        return orderService.findOrdersById(id);
    }
}
