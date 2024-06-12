package ru.troshin.web_service_app.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.troshin.web_service_app.dto.CategoryWithImageDto;
import ru.troshin.web_service_app.models.Category;
import ru.troshin.web_service_app.services.CategoryServiceImpl;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/")
public class CategoryController {

    private final CategoryServiceImpl categoryService;


    @GetMapping
    public ResponseEntity<List<CategoryWithImageDto>> getAllCategoriesWithImages() {
        Map<Category, byte[]> categoriesWithImages = categoryService.getCategoriesWithImages();
        List<CategoryWithImageDto> dtoList = categoriesWithImages.entrySet().stream()
                .map(entry -> {
                    try {
                        return new CategoryWithImageDto(entry.getKey(), entry.getValue());
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }

}
