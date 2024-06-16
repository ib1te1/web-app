package ru.troshin.web_service_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.troshin.web_service_app.models.Task;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    public Optional<Task> findByName(String name);

    public List<Task> findByUserId(Long userId);
}
