package com.example.pomo.dto;

import java.time.LocalDateTime;

import com.example.pomo.entity.User;


// A FINIR
public class TaskCreateDTO {

    private String title;
    private boolean completed;
    private LocalDateTime createdAt;
    private User user;
    private int time;

    // Constructeur
    public TaskCreateDTO(User user, String title, boolean completed, int time) {
        this.user = user;
        this.title = title;
        this.completed = completed;
        this.time = time;
    }

    // Getters
    public String getTitle() { return title; }
    public boolean getCompleted() { return completed; }
    public int getTime() { return time; }

    // Setters si besoin (optionnel)
}