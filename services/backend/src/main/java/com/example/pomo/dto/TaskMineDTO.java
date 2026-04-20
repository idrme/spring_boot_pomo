package com.example.pomo.dto;

import java.time.LocalDateTime;

import com.example.pomo.entity.Task;
import com.example.pomo.entity.User;


// A FINIR
public class TaskMineDTO {

    private Long id;
    private String title;
    private boolean completed;
    private LocalDateTime createdAt;
    private int time;

    // Constructeur
    public TaskMineDTO(String title, boolean completed, int time) {
        this.title = title;
        this.completed = completed;
        this.time = time;
    }

    public TaskMineDTO(Task task)
    {
        this.id = task.getId();
        this.title = task.getTitle();
        this.completed = task.isCompleted();
        this.createdAt = task.getCreatedAt();
        this.time = task.getTime();
    }

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public boolean getCompleted() { return completed; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public int getTime() { return time; }

    // Setters si besoin (optionnel)
}