package ru.troshin.web_service_app.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.troshin.web_service_app.dto.OrderRequest;
import ru.troshin.web_service_app.dto.TaskRequest;
import ru.troshin.web_service_app.models.Order;
import ru.troshin.web_service_app.models.Task;
import ru.troshin.web_service_app.services.OrderService;
import ru.troshin.web_service_app.services.TaskService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
@CrossOrigin
public class TaskController {

    private final TaskService taskService;




    @PostMapping("/task/create")
    public Task createTask(@RequestBody TaskRequest taskRequest){
        return taskService.createTask(taskRequest);
    }

    @GetMapping("/my-tasks")
    public List<Task> getMyTasks(@RequestParam Long id){
        return taskService.findTasksByUserId(id);
    }


}