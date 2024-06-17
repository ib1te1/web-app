package ru.troshin.web_service_app.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.troshin.web_service_app.dto.NewOrderDTO;
import ru.troshin.web_service_app.dto.OrderRequest;
import ru.troshin.web_service_app.enums.Status;
import ru.troshin.web_service_app.models.Order;
import ru.troshin.web_service_app.services.OrderService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
@CrossOrigin
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/order/create")
    public Order createOrder(@RequestBody OrderRequest order) {
        return orderService.createOrder(order);
    }

    @GetMapping("/my-orders")
    public List<Order> getMyOrders(@RequestParam Long id) {
        return orderService.findOrdersById(id);
    }
    @GetMapping("/pending-orders")
    public List<Order> getPendingOrders(@RequestParam Long executorId) {
        return orderService.getPendingOrdersForExecutor(executorId);
    }

    @PostMapping("/order/update-status")
    public Order updateOrderStatus(@RequestParam Long orderId, @RequestParam Status status) {
        return orderService.updateOrderStatus(orderId, status);
    }
    @PostMapping("/order/create-direct")
    public Order createOrderDirect(@RequestParam Long taskId,@RequestParam Long executorId) {
        System.out.println("createOrderDirect");
        return orderService.createOrderDirect(taskId, executorId);
    }

    @PostMapping("/order/create-with-task")
    public Order createOrderWithTask(@RequestBody NewOrderDTO orderRequest) {
        System.out.println("CREATE ORDER WITH TASK");
        return orderService.createOrderWithTask(orderRequest);
    }
}
