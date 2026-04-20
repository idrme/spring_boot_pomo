package com.example.pomo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserEditDTO {

    private String username;
    @NotBlank(message = "Your password must not be blank")
    private String password;
    @NotBlank(message = "Your password must not be blank")
    @Size(min=8, message = "Your new password must contain at least 8 characters.")
    private String new_password;
    @NotBlank(message = "You must choose an email adresss")
    @Email(message = "Your email adress must be valid")
    private String email;

    public UserEditDTO(String username, String password, String new_password, String email) {
        this.username = username;
        this.password = password;
        this.new_password = new_password;
        this.email = email;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getNewPassword() { return new_password; }
    public void setNewPassword(String new_password) { this.new_password = new_password; }
}
