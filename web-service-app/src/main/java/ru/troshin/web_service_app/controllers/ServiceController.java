package ru.troshin.web_service_app.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.troshin.web_service_app.dto.ServiceRequest;
import ru.troshin.web_service_app.models.MyService;
import ru.troshin.web_service_app.services.ServiceService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
@CrossOrigin
public class ServiceController {

    private final ServiceService serviceService;

    @PostMapping("/service/create")
    public MyService createService(@RequestBody ServiceRequest serviceRequest) {
        return serviceService.createService(serviceRequest);
    }

    @GetMapping("/my-services")
    public List<MyService> getMyServices(@RequestParam Long executorId) {
        return serviceService.findServicesByExecutorId(executorId);
    }
}