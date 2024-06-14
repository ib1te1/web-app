package ru.troshin.web_service_app.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.troshin.web_service_app.dto.ServiceDTO;
import ru.troshin.web_service_app.models.MyService;
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
            @RequestParam(required = false) Integer priceTo) {
        System.out.println("Category Id: " + categoryId);
        System.out.println("Price Range: " + priceFrom + " - " + priceTo);
        List<ServiceDTO> filteredServices = service.getFilteredServices(categoryId, priceFrom, priceTo);
        System.out.println("Filtered Services: " + filteredServices);
        return filteredServices;
    }

}
