package ru.troshin.web_service_app.dto;

import lombok.Data;
import ru.troshin.web_service_app.models.MyService;


@Data
public class ServiceDTO {
    private Double priceMin;
    private Double priceMax;
    private Long id;
    private String name;
    private Long executorId;
    private String firstname;
    private String surname;
    private String email;
    private String phone;
    private byte[] profilePicture;
    private Double rating;
    private String description;
    private Double workExperience;
    private int ordersAmount;


    public ServiceDTO(MyService service, byte[] profilePicture) {
        this.priceMin=service.getPriceMin();
        this.priceMax=service.getPriceMax();
        this.id = service.getId();
        this.name=service.getName();
        this.firstname = service.getExecutor().getFirstname();
        this.surname = service.getExecutor().getSurname();
        this.email = service.getExecutor().getEmail();
        this.phone = service.getExecutor().getPhone();
        this.profilePicture=profilePicture;
        this.rating= service.getExecutor().getRating();
        this.description= service.getDescription();
        this.workExperience=service.getExecutor().getWorkExperience();
        this.ordersAmount= service.getExecutor().getOrdersAmount();
    }
}
