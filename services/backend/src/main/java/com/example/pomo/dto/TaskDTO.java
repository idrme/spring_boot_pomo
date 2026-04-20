package com.example.pomo.dto;

import java.time.LocalDateTime;

import com.example.pomo.entity.User;


// A FINIR
public class TaskDTO {

    private Long id;
    private String title;
    private boolean completed;
    private LocalDateTime createdAt;
    private User user;
    private int time;

    // Constructeur
    public TaskDTO(User user, String title, boolean completed, int time, Long id) {
        this.user = user;
        this.title = title;
        this.completed = completed;
        this.time = time;
        this.id = id;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public boolean getCompleted() { return completed; }
    public int getTime() { return time; }

    // Setters si besoin (optionnel)
}