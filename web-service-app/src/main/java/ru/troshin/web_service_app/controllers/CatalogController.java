package ru.troshin.web_service_app.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import ru.troshin.web_service_app.dto.ServiceDTO;
import ru.troshin.web_service_app.dto.TaskDTO;
import ru.troshin.web_service_app.services.ServiceService;
import ru.troshin.web_service_app.services.TaskService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/catalog")
@CrossOrigin
public class CatalogController {

    private final ServiceService serviceService;
    private final TaskService taskService;

    @GetMapping
    public List<?> getCatalog(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Integer priceFrom,
            @RequestParam(required = false) Integer priceTo,
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = true) String role) {
        System.out.println(role);
        if ("ROLE_USER".equals(role)) {
            return serviceService.getFilteredServices(categoryId, priceFrom, priceTo, searchTerm);
        } else if ("ROLE_EXECUTOR".equals(role)) {
            return taskService.getFiltredTasks(categoryId, priceFrom, priceTo, searchTerm);
        } else {
            throw new RuntimeException("User does not have a valid role.");
        }
    }
}