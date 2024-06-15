package ru.troshin.web_service_app.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class OrderRequest {
    private Long userId;
    private Long serviceId;
    private String taskName;
    private String taskDetails;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double priceFrom;
    private Double priceTo;
}
