package com.example.pomo.controller;



import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.example.pomo.dto.TaskCreateDTO;
import com.example.pomo.dto.TaskDTO;
import com.example.pomo.dto.TaskMineDTO;
import com.example.pomo.dto.UserDTO;
import com.example.pomo.dto.UserEditDTO;
import com.example.pomo.dto.UserLoginDTO;
import com.example.pomo.dto.UserResponseDTO;
import com.example.pomo.service.TaskService;
import com.example.pomo.service.UserService;
import com.example.pomo.util.JwtUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import jakarta.validation.Valid;


// @CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PrivateController {


    private final TaskService taskService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public PrivateController(TaskService taskService, JwtUtil jwtUtil, UserService userService) {
        this.userService = userService;
        this.taskService = taskService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/private/createTask")
    public TaskDTO createTask(@RequestBody TaskCreateDTO request, HttpServletRequest httpRequest) {

        // Je récupère le username dans le cookie jwt
        String jwt = null;
        if (httpRequest.getCookies() != null) {
            for (Cookie cookie : httpRequest.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }
        String username = jwtUtil.extractUsername(jwt);

        return taskService.createTask(username, request.getTitle(), request.getTime());
    }

    // Met une tache completed
    @GetMapping("/private/setFinishedTask")
    public String setFinishedTask(@RequestParam Long id, HttpServletRequest httpRequest) {

        // Je récupère le username dans le cookie jwt
        String jwt = null;
        if (httpRequest.getCookies() != null) {
            for (Cookie cookie : httpRequest.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }
        String username = jwtUtil.extractUsername(jwt);

        // Je fais appel à createTask
        taskService.updateTaskCompleted(id, username);

        return username;
    }

    @GetMapping("/private/myTasks")
    public List<TaskMineDTO> getAllMyTasks(HttpServletRequest httpRequest) {

        // Je récupère le username dans le cookie jwt
        String jwt = null;
        if (httpRequest.getCookies() != null) {
            for (Cookie cookie : httpRequest.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }
        String username = jwtUtil.extractUsername(jwt);

        // Je fais appel à createTask
        return taskService.getAllMyTasks(username);

    }

    // Vérifie si la personne a un JWT valide en cookie. Retourne infos associés a cet user
    @GetMapping("/private/connected")
    public UserResponseDTO isConnected(HttpServletRequest httpRequest) {
        // Je récupère le username dans le cookie jwt
        String jwt = null;
        if (httpRequest.getCookies() != null) {
            for (Cookie cookie : httpRequest.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        String username = jwtUtil.extractUsername(jwt);
        UserResponseDTO user = userService.getUserInfos(username);
        return user;
    }

    @PatchMapping("/private/edit")
    public UserResponseDTO editAccount(@Valid @RequestBody UserEditDTO request, HttpServletRequest httpRequest) {

        // Je récupère le username dans le cookie jwt
        String jwt = null;
        if (httpRequest.getCookies() != null) {
            for (Cookie cookie : httpRequest.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }
        String username = jwtUtil.extractUsername(jwt);

        if (!username.equals(request.getUsername()))
        {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Invalid input"
            );
        }

        UserResponseDTO dto = userService.editUser(request);
        return dto;
    }

}