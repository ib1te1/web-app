package ru.troshin.web_service_app.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.troshin.web_service_app.dto.NewOrderDTO;
import ru.troshin.web_service_app.dto.OrderRequest;
import ru.troshin.web_service_app.enums.Role;
import ru.troshin.web_service_app.enums.Status;
import ru.troshin.web_service_app.models.Order;
import ru.troshin.web_service_app.models.Task;
import ru.troshin.web_service_app.models.User;
import ru.troshin.web_service_app.repositories.*;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    private final ServiceRepository serviceRepository;

    private final ExecutorRepository executorRepository;

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;


    public List<Order> getPendingOrdersForExecutor(Long executorId) {
        return orderRepository.findByExecutorIdAndStatus(executorId,Status.PENDING);
    }

    public Order createOrderWithTask(NewOrderDTO orderRequest) {
        System.out.println(orderRequest);
        Task task = Task.builder()
                .name(orderRequest.getTaskName())
                .description(orderRequest.getTaskDetails())
                .startDate(orderRequest.getStartDate())
                .endDate(orderRequest.getEndDate())
                .priceMin(orderRequest.getPriceFrom())
                .priceMax(orderRequest.getPriceTo())
                .user(userRepository.findById(orderRequest.getUserId()).orElseThrow(() -> new IllegalStateException("User not found")))
                .category(serviceRepository.findById(orderRequest.getItemId()).orElseThrow(() -> new IllegalStateException("Service not found")).getCategory())
                .build();
        task = taskRepository.save(task);

        System.out.println(task);
        Order order = Order.builder()
                .user(userRepository.findById(orderRequest.getUserId()).orElseThrow(() -> new IllegalStateException("User not found")))
                .service(serviceRepository.findById(orderRequest.getItemId()).orElseThrow(() -> new IllegalStateException("Service not found")))
                .executor(executorRepository.findById(serviceRepository.findById(orderRequest.getItemId()).get().getExecutor().getId()).orElseThrow(() -> new IllegalStateException("Executor not found")))
                .task(task)
                .description(orderRequest.getTaskDetails())
                .startDate(orderRequest.getStartDate())
                .endDate(orderRequest.getEndDate())
                .build();
        System.out.println(order);
        return orderRepository.save(order);
    }

    public Order createOrder(OrderRequest orderRequest) {
        Order order = Order.builder()
                .user(userRepository.findById(orderRequest.getUserId()).orElseThrow())
                .service(serviceRepository.findById(orderRequest.getServiceId()).orElseThrow())
                .executor(executorRepository.findById(serviceRepository.findById(orderRequest.getServiceId()).get().getExecutor().getId()).orElseThrow())
                .description(orderRequest.getTaskDetails())
                .startDate(orderRequest.getStartDate())
                .endDate(orderRequest.getEndDate())
                .build();
        System.out.println(order);
        return orderRepository.save(order);
    }

    public List<Order> findOrdersById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getRole() == Role.ROLE_EXECUTOR) {
                return orderRepository.findByExecutorId(id);
            } else {
                return orderRepository.findByUserId(id);
            }
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    public Order updateOrderStatus(Long orderId, Status status) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new IllegalStateException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public Order save(Order order) {
        return orderRepository.save(order);
    }
}
