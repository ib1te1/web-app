package ru.troshin.web_service_app.services;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.troshin.web_service_app.models.User;
import ru.troshin.web_service_app.repositories.UserRepository;
import ru.troshin.web_service_app.security.MyUserDetails;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isEmpty()) {
            throw new UsernameNotFoundException("User with such username not found. Username:" + username);
        }
        return new MyUserDetails(user.get());
    }
}
