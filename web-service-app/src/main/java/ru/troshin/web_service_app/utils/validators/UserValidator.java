package ru.troshin.web_service_app.utils.validators;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.troshin.web_service_app.models.User;
import ru.troshin.web_service_app.services.MyUserDetailsService;


@AllArgsConstructor
@Component
public class UserValidator implements Validator {

    private final MyUserDetailsService myUserDetailsService;

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        try {
            myUserDetailsService.loadUserByUsername(user.getUsername());
        }
        catch (UsernameNotFoundException e) {
            return;
        }
        errors.rejectValue("username", "",
                "Человек с таким именем пользователя уже существует");
    }
}
