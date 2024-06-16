package ru.troshin.web_service_app.dto;

import lombok.Data;
import ru.troshin.web_service_app.models.Category;
import ru.troshin.web_service_app.models.Task;

@Data
public class TaskDTO {
    private Long id;
    private String name;
    private Category category;
    private Double priceMin;
    private Double priceMax;
    private String description;
    private Long userId;
    private String firstname;
    private String surname;
    private String email;
    private String phone;
    private byte[] profilePicture;

    public TaskDTO(Task task, byte[] profilePicture) {
        this.priceMin=task.getPriceMin();
        this.priceMax=task.getPriceMax();
        this.id = task.getId();
        this.name=task.getName();
        this.firstname = task.getUser().getFirstname();
        this.surname = task.getUser().getSurname();
        this.email = task.getUser().getEmail();
        this.phone = task.getUser().getPhone();
        this.profilePicture=profilePicture;
        this.description=task.getDescription();
    }
}
