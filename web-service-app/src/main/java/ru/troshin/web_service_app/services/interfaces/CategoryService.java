package ru.troshin.web_service_app.services.interfaces;


import ru.troshin.web_service_app.models.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    public Category findById(Long id);
    public Optional<Category> findByName(String name);
    public List<Category> findAll();
    public void save(Category category);
    public void delete(Long id);
    public void update(Long id, Category category);
    public boolean existsById(Long id);
    public boolean existsByName(String name);
}
