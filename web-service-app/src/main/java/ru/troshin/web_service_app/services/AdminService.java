package ru.troshin.web_service_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.troshin.web_service_app.models.*;
import ru.troshin.web_service_app.repositories.*;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final OrderRepository orderRepository;
    private final ServiceRepository serviceRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Autowired
    public AdminService(OrderRepository orderRepository,
                        ServiceRepository serviceRepository,
                        CategoryRepository categoryRepository,
                        UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.serviceRepository = serviceRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    // CRUD операции для заказов

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Long orderId, Order order) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order existingOrder = optionalOrder.get();
            existingOrder.setDescription(order.getDescription());
            existingOrder.setStartDate(order.getStartDate());
            existingOrder.setEndDate(order.getEndDate());
            existingOrder.setStatus(order.getStatus());
            return orderRepository.save(existingOrder);
        }
        return null;
    }

    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }

    // CRUD операции для услуг

    public List<MyService> getAllServices() {
        return serviceRepository.findAll();
    }

    public MyService createService(MyService service) {
        return serviceRepository.save(service);
    }

    public MyService updateService(Long serviceId, MyService service) {
        Optional<MyService> optionalService = serviceRepository.findById(serviceId);
        if (optionalService.isPresent()) {
            MyService existingService = optionalService.get();
            existingService.setName(service.getName());
            existingService.setDescription(service.getDescription());
            existingService.setCategory(service.getCategory());
            existingService.setPriceMin(service.getPriceMin());
            existingService.setPriceMax(service.getPriceMax());
            return serviceRepository.save(existingService);
        }
        return null;
    }

    public void deleteService(Long serviceId) {
        serviceRepository.deleteById(serviceId);
    }

    // CRUD операции для категорий

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long categoryId, Category category) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            Category existingCategory = optionalCategory.get();
            existingCategory.setName(category.getName());
            return categoryRepository.save(existingCategory);
        }
        return null;
    }

    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    // CRUD операции для пользователей

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
    public User updateUser(Long userId, User user) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setFirstname(user.getFirstname());
            existingUser.setSurname(user.getSurname());
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setPhone(user.getPhone());
            existingUser.setGender(user.getGender());
            existingUser.setRole(user.getRole());
            return userRepository.save(existingUser);
        }
        return null;
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}