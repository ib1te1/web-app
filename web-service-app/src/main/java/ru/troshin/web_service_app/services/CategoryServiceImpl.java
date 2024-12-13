package ru.troshin.web_service_app.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.troshin.web_service_app.exeptions.CategoryNotFoundExeption;
import ru.troshin.web_service_app.models.Category;
import ru.troshin.web_service_app.models.User;
import ru.troshin.web_service_app.repositories.CategoryRepository;
import ru.troshin.web_service_app.services.interfaces.CategoryService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

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


    public byte[] getCategoryImage(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId) ;
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            System.out.println(category);
            String filePath = "web-service-app/src/main/resources/static/categoryImages/category_" + category.getId()+".jpg";
            System.out.println(filePath);
        try {
            System.out.println("Current working directory: " + System.getProperty("user.dir"));
            return Files.readAllBytes(Paths.get(filePath));
            } catch (IOException e) {
                throw new IllegalStateException("Failed to read image", e);
            }
            } else {
                throw new IllegalStateException("User not found");
            }
    }

    public Map<Category,byte[]> getCategoriesWithImages(){
        Map<Category,byte[]> categoryMap=new HashMap<>();
        List<Category> categories=new ArrayList<>(categoryRepository.findAll());
        for (Category category : categories) {
            categoryMap.put(category,
                    getCategoryImage(category.getId()));
        }
        return categoryMap;
    }

    public boolean existsById(Long id) {
        return categoryRepository.existsById(id);
    }

    public boolean existsByName(String name) {
        return categoryRepository.existsByName(name);
    }
}
