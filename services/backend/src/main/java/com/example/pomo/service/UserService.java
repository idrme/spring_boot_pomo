package com.example.pomo.service;

import com.example.pomo.entity.User;
import com.example.pomo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.pomo.dto.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public UserResponseDTO createUser(UserCreateDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail()))
        {
            throw new RuntimeException("Email déjà utilisé");
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());
        user = userRepository.save(user);

        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    public boolean login(UserLoginDTO dto) {
        return userRepository.findByUsername(dto.getUsername())
                .map(user -> passwordEncoder.matches(dto.getPassword(), user.getPassword()))
                .orElse(false);
    }

    public UserResponseDTO getUserInfos(String username)
    {
        User user = userRepository.findByUsername(username).orElseThrow( () -> new UsernameNotFoundException("user not found"));
        UserResponseDTO userDTO = new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
        return userDTO;
    }

   public UserResponseDTO editUser(UserEditDTO dto) {
        User user = userRepository.findByUsername(dto.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Vérifie si l'ancien mot de passe est correct
         if (!passwordEncoder.matches(dto.getPassword(), user.getPassword()))
         {
            throw new RuntimeException("Ancien mot de passe mauvais");
         }
        
        // Prépare la mise a jour de l'email
        if (userRepository.existsByEmail(dto.getEmail()))
        {
            if (!(user.getEmail().equals(dto.getEmail())))
            {
                throw new RuntimeException("Email déjà utilisé"); 
            }
        }
        else {
            user.setEmail(dto.getEmail());
        }

        // Prépare la mise à jour du mot de passe si la longueur est sup a 0
        if (dto.getNewPassword().length() >= 1)
        {
            user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        }

        // // Valide la mise à jour
        userRepository.save(user);

        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
    }

}
