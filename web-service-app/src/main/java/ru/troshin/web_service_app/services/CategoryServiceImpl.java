package ru.troshin.web_service_app.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.troshin.web_service_app.exeptions.CategoryNotFoundExeption;
import ru.troshin.web_service_app.models.Category;
import ru.troshin.web_service_app.repositories.CategoryRepository;
import ru.troshin.web_service_app.services.interfaces.CategoryService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public Category findById(Long id) {
        return categoryRepository
                .findById(id)
                .orElseThrow(()->new CategoryNotFoundExeption("Category not found"));
    }

    public Optional<Category> findByName(String name) {
        return categoryRepository.findByName(name);
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }
    @Transactional
    public void save(Category category) {
        categoryRepository.save(category);
    }
    @Transactional
    public void delete(Long id) {
        if(!categoryRepository.existsById(id)) {
            throw new CategoryNotFoundExeption("Category not found");
        }
        categoryRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(Long id, Category updatedCategory) {
        if(!categoryRepository.existsById(id)) {
            throw new CategoryNotFoundExeption("Category not found");
        }
        updatedCategory.setId(id);
        categoryRepository.save(updatedCategory);
    }

    public boolean existsById(Long id) {
        return categoryRepository.existsById(id);
    }

    public boolean existsByName(String name) {
        return categoryRepository.existsByName(name);
    }
}
