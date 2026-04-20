package com.example.pomo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

public class UserCreateDTO {

    @NotBlank(message = "Your username must not be blank")
    private String username;
    @NotBlank(message = "Your password must not be blank")
    @Size(min=8, message = "Your password must contains 8 min")
    private String password;
    @NotBlank(message = "You must choose an email adresss")
    @Email(message = "Your email adress must be valid")
    private String email;

    public UserCreateDTO(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
