package ru.troshin.web_service_app.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.troshin.web_service_app.dto.ServiceDTO;
import ru.troshin.web_service_app.services.ServiceService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class ServiceController {

    private final ServiceService service;

    @GetMapping("/catalog")
    public List<ServiceDTO> getServices(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Integer priceFrom,
            @RequestParam(required = false) Integer priceTo,
            @RequestParam(required = false) String searchTerm) {
        return service.getFilteredServices(categoryId, priceFrom, priceTo, searchTerm);
    }
}