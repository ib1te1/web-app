package ru.troshin.web_service_app.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.troshin.web_service_app.dto.OrderRequest;
import ru.troshin.web_service_app.enums.Role;
import ru.troshin.web_service_app.enums.Status;
import ru.troshin.web_service_app.models.Order;
import ru.troshin.web_service_app.models.User;
import ru.troshin.web_service_app.repositories.ExecutorRepository;
import ru.troshin.web_service_app.repositories.OrderRepository;
import ru.troshin.web_service_app.repositories.ServiceRepository;
import ru.troshin.web_service_app.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    private final ServiceRepository serviceRepository;

    private final ExecutorRepository executorRepository;


    public Order createOrder(OrderRequest orderRequest){
        Order order=Order.builder()
                        .user(userRepository.findById(orderRequest.getUserId()).get())
                                .service(serviceRepository.findById(orderRequest.getServiceId()).get())
                .executor(executorRepository.findById(serviceRepository.findById(orderRequest.getServiceId()).get().getExecutor().getId()).get())
                        .description(orderRequest.getTaskDetails())
                                .startDate(orderRequest.getStartDate())
                                        .endDate(orderRequest.getEndDate())
                .status(Status.PENDING)
                .build();
        System.out.println("!!!!!!!!!!!!!!ORDER FROM SERVICE!!!!!!!!!!!!!!!!");
        System.out.println(order);
        System.out.println(order.getStatus());
        return orderRepository.save(order);
    }

    
    public List<Order> findOrdersById(Long id){
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
}
