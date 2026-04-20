package com.example.pomo.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Data
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String password;
    private String email;

    @OneToMany(mappedBy="user")
    private List<Task> tasks;
}
