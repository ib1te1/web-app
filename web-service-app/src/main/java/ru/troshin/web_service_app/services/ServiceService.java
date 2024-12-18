package ru.troshin.web_service_app.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.troshin.web_service_app.dto.ServiceDTO;
import ru.troshin.web_service_app.dto.ServiceRequest;
import ru.troshin.web_service_app.models.MyService;
import ru.troshin.web_service_app.repositories.ExecutorRepository;
import ru.troshin.web_service_app.repositories.ServiceRepository;
import ru.troshin.web_service_app.services.interfaces.CategoryService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    private final UserService userService;

    private final ExecutorRepository executorRepository;

    private final CategoryService categoryService;

    public MyService createService(ServiceRequest serviceRequest) {
        System.out.println(serviceRequest);
        MyService service = MyService.builder()
                .name(serviceRequest.getServiceName())
                .description(serviceRequest.getServiceDetails())
                .priceMin(serviceRequest.getPriceFrom())
                .priceMax(serviceRequest.getPriceTo())
                .executor(executorRepository.findById(serviceRequest.getExecutorId()).orElseThrow(() -> new RuntimeException("Executor not found")))
                .category(categoryService.findByName(serviceRequest.getCategory()).orElseThrow(() -> new RuntimeException("Category not found")))
                .build();
        return serviceRepository.save(service);
    }

    public List<MyService> findServicesByExecutorId(Long executorId) {
        return serviceRepository.findByExecutorId(executorId);
    }

    public List<ServiceDTO> getFilteredServices(Long categoryId, Integer priceFrom, Integer priceTo, String searchTerm) {
        List<MyService> services = serviceRepository.findAll();
        List<ServiceDTO> filteredServices = new ArrayList<>();

        if (categoryId != null) {
            services = services.stream()
                    .filter(service -> service.getCategory().getId().equals(categoryId))
                    .collect(Collectors.toList());
        }

        if (priceFrom != null && priceTo != null) {
            services = services.stream()
                    .filter(service -> service.getPriceMin() >= priceFrom && service.getPriceMax() <= priceTo)
                    .collect(Collectors.toList());
        } else if (priceFrom != null) {
            services = services.stream()
                    .filter(service -> service.getPriceMin() >= priceFrom)
                    .collect(Collectors.toList());
        } else if (priceTo != null) {
            services = services.stream()
                    .filter(service -> service.getPriceMax() <= priceTo)
                    .collect(Collectors.toList());
        }

        if (searchTerm != null && !searchTerm.isEmpty()) {
            services = services.stream()
                    .filter(service -> service.getName().toLowerCase().contains(searchTerm.toLowerCase()) ||
                            service.getCategory().getName().toLowerCase().contains(searchTerm.toLowerCase()))
                    .collect(Collectors.toList());
        }

        for (MyService service : services) {
            filteredServices.add(new ServiceDTO(service, userService.getUserProfileImage(service.getExecutor().getId())));
        }
        return filteredServices;
    }
}