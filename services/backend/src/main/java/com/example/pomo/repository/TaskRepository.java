package com.example.pomo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pomo.entity.Task;
import com.example.pomo.entity.User;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // Récupérer toutes les tâches d'un utilisateur
    List<Task> findByUserId(Long userId);

    // Récupérer toutes les tâches non complétées d'un utilisateur
    List<Task> findByUserIdAndCompletedFalse(Long userId);

    boolean existsByIdAndUser_Username(Long taskId, String username);

    List<Task> findByUser_Username(String username);

    Optional<Task> findFirstByUserOrderByCreatedAtDesc(User user);

}