package ru.troshin.web_service_app.services;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.troshin.web_service_app.models.Executor;
import ru.troshin.web_service_app.repositories.ExecutorRepository;


import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExecutorService {

    private final ExecutorRepository executorRepository;


    public Optional<Executor> findExecutorById(Long id) {
        return executorRepository.findById(id);
    }

}
