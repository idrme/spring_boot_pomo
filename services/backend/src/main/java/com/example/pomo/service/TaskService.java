package com.example.pomo.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.pomo.dto.TaskDTO;
import com.example.pomo.dto.TaskMineDTO;
import com.example.pomo.entity.Task;
import com.example.pomo.entity.User;
import com.example.pomo.repository.TaskRepository;
import com.example.pomo.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // Crée une tache en BDD
    public TaskDTO createTask(String username, String title, int time) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username).orElseThrow( () -> new UsernameNotFoundException("user not found"));

        Task task = new Task();
        task.setUser(user);
        task.setTitle(title);
        task.setCompleted(false);
        task.setCreatedAt(java.time.LocalDateTime.now());
        task.setTime(time);
        Task saved = taskRepository.save(task);
        return new TaskDTO(user, saved.getTitle(), saved.isCompleted(), saved.getTime(), saved.getId());
    }

    // Met une tache en BDD terminée (completed)
    public void updateTaskCompleted(Long taskId, String username) {
        if (!taskRepository.existsByIdAndUser_Username(taskId, username)) {
            throw new RuntimeException("Forbidden");
        }
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setCompleted(true);
        taskRepository.save(task);
    }

    public List<TaskMineDTO> getAllMyTasks(String username)
    {
        List<Task> myTasks = taskRepository.findByUser_Username(username);
        return myTasks.stream().map(task -> new TaskMineDTO(task)).toList();
    }
}