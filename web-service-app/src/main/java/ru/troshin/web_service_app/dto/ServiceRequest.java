package ru.troshin.web_service_app.dto;

import lombok.Data;

@Data
public class ServiceRequest {
    private Long executorId;
    private String serviceName;
    private String serviceDetails;
    private Double priceFrom;
    private Double priceTo;
    private String category;
}