package com.example.pomo.unit.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.pomo.dto.UserCreateDTO;
import com.example.pomo.dto.UserResponseDTO;
import com.example.pomo.entity.User;
import com.example.pomo.repository.UserRepository;
import com.example.pomo.service.UserService;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void createUserTest() {
        UserCreateDTO userTest = new UserCreateDTO("usernameTest", "password1234", "mail@mymail.net");
        
        User userReturned = new User();
        userReturned.setUsername("usernameTest");
        userReturned.setPassword("password1234");
        userReturned.setEmail("mail@mymail.net");
        
        when(passwordEncoder.encode(anyString()))
        .thenReturn("encodedPassword");
        when(userRepository.save(Mockito.any(User.class))).thenReturn(userReturned);
        assertEquals(userService.createUser(userTest).getUsername(), userReturned.getUsername());
    }

    @Test
    void getUserInfosTest() {

        User userReturned = new User();
        userReturned.setId(123L);
        userReturned.setUsername("usernameTest");
        userReturned.setPassword("password1234");
        userReturned.setEmail("mail@mymail.net");

        when(userRepository.findByUsername("usernameTest")).thenReturn(Optional.of(userReturned));

        assertEquals(userService.getUserInfos("usernameTest").getUsername(), userReturned.getUsername());
    }
    
}
