package ru.troshin.web_service_app.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.troshin.web_service_app.models.MyService;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<MyService, Long> {
    public Optional<MyService> findByName(String name);
}
