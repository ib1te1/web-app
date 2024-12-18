package ru.troshin.web_service_app.utils.validators;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.troshin.web_service_app.models.Category;
import ru.troshin.web_service_app.services.CategoryServiceImpl;

@Component
@RequiredArgsConstructor
public class CategoryValidator implements Validator {

    private final CategoryServiceImpl categoryService;


    @Override
    public boolean supports(Class<?> clazz) {
        return Category.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Category category = (Category) target;

    }
}
