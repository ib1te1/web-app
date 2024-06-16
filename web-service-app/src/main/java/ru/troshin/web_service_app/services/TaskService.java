package ru.troshin.web_service_app.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.troshin.web_service_app.dto.OrderRequest;
import ru.troshin.web_service_app.dto.TaskDTO;
import ru.troshin.web_service_app.dto.TaskRequest;
import ru.troshin.web_service_app.models.Order;
import ru.troshin.web_service_app.models.Task;
import ru.troshin.web_service_app.models.User;
import ru.troshin.web_service_app.repositories.*;
import ru.troshin.web_service_app.services.interfaces.CategoryService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    private final UserService userService;

    private final CategoryService categoryService;

    private final UserRepository  userRepository;

    private final ServiceRepository serviceRepository;

    private final ExecutorRepository executorRepository;

    private final OrderRepository orderRepository;



    public Order createOrderWithTask(OrderRequest orderRequest) {
        Task task = Task.builder()
                .name(orderRequest.getTaskName())
                .description(orderRequest.getTaskDetails())
                .startDate(orderRequest.getStartDate())
                .endDate(orderRequest.getEndDate())
                .priceMin(orderRequest.getPriceFrom())
                .priceMax(orderRequest.getPriceTo())
                .user(userRepository.findById(orderRequest.getUserId()).orElseThrow(() -> new IllegalStateException("User not found")))
                .category(serviceRepository.findById(orderRequest.getServiceId()).orElseThrow(() -> new IllegalStateException("Service not found")).getCategory())
                .build();
        task = taskRepository.save(task);

        Order order = Order.builder()
                .user(userRepository.findById(orderRequest.getUserId()).orElseThrow(() -> new IllegalStateException("User not found")))
                .service(serviceRepository.findById(orderRequest.getServiceId()).orElseThrow(() -> new IllegalStateException("Service not found")))
                .executor(executorRepository.findById(serviceRepository.findById(orderRequest.getServiceId()).get().getExecutor().getId()).orElseThrow(() -> new IllegalStateException("Executor not found")))
                .task(task)
                .description(orderRequest.getTaskDetails())
                .startDate(orderRequest.getStartDate())
                .endDate(orderRequest.getEndDate())
                .build();
        return orderRepository.save(order);
    }

    public Task createTask(TaskRequest taskRequest) {
        System.out.println(taskRequest);
        Task task = Task.builder()
                .name(taskRequest.getTaskName())
                .description(taskRequest.getTaskDetails())
                .startDate(taskRequest.getStartDate())
                .endDate(taskRequest.getEndDate())
                .priceMin(taskRequest.getPriceFrom())
                .priceMax(taskRequest.getPriceTo())
                .user(userService.findUserById(taskRequest.getUserId()).orElseThrow(() -> new RuntimeException("User not found")))
                .category(categoryService.findByName(taskRequest.getCategory()).orElseThrow(() -> new RuntimeException("Category not found")))
                .build();
        return taskRepository.save(task);
    }

    public List<Task> findTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }


    public List<TaskDTO> getFiltredTasks(Long categoryId, Integer priceFrom, Integer priceTo, String searchTerm) {
        List<Task> tasks = taskRepository.findAll();
        List<TaskDTO> filteredServices = new ArrayList<>();

        if (categoryId != null) {
            tasks = tasks.stream()
                    .filter(service -> service.getCategory().getId().equals(categoryId))
                    .collect(Collectors.toList());
        }

        if (priceFrom != null && priceTo != null) {
            tasks = tasks.stream()
                    .filter(service -> service.getPriceMin() >= priceFrom && service.getPriceMax() <= priceTo)
                    .collect(Collectors.toList());
        } else if (priceFrom != null) {
            tasks = tasks.stream()
                    .filter(service -> service.getPriceMin() >= priceFrom)
                    .collect(Collectors.toList());
        } else if (priceTo != null) {
            tasks = tasks.stream()
                    .filter(service -> service.getPriceMax() <= priceTo)
                    .collect(Collectors.toList());
        }

        if (searchTerm != null && !searchTerm.isEmpty()) {
            tasks = tasks.stream()
                    .filter(service -> service.getName().toLowerCase().contains(searchTerm.toLowerCase()) ||
                            service.getCategory().getName().toLowerCase().contains(searchTerm.toLowerCase()))
                    .collect(Collectors.toList());
        }

        for (Task task : tasks) {
            filteredServices.add(new TaskDTO(task, userService.getUserProfileImage(task.getUser().getId())));
        }
        return filteredServices;
    }
}
