package com.example.pomo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.pomo.dto.UserLoginDTO;
import com.example.pomo.dto.UserResponseDTO;
import com.example.pomo.service.UserService;
import com.example.pomo.dto.UserCreateDTO;
import com.example.pomo.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.servlet.http.Cookie;


// @CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> setCookieEntity(@RequestBody UserLoginDTO request) {
        if (userService.login(request))
        {
            ResponseCookie cookie = ResponseCookie.from("jwt", jwtUtil.generateToken(request.getUsername()))
                    .httpOnly(true)
                    .path("/")
                    .sameSite("None")
                    .maxAge(360000)
                    .secure(true)    // true si HTTPS
                    .build();

            return ResponseEntity.ok()
                    .header("Set-Cookie", cookie.toString())
                    .body("Cookie envoyé via ResponseEntity !");
        }
        else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Mauvais mot depasse ou username");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> setCookieEntity(@Valid @RequestBody UserCreateDTO request) {
        try {
            UserResponseDTO userCreated = userService.createUser(request);
            ResponseCookie cookie = ResponseCookie.from("jwt", jwtUtil.generateToken(request.getUsername()))
                    .httpOnly(true)
                    .path("/")
                    .sameSite("None")
                    .maxAge(360000)
                    .secure(true)    // true si HTTPS
                    .build();

            return ResponseEntity.ok()
                    .header("Set-Cookie", cookie.toString())
                    .body(userCreated);

        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        try {
            ResponseCookie cookie = ResponseCookie.from("jwt", null)
                    .httpOnly(true)
                    .path("/")
                    .sameSite("None")
                    .maxAge(0)
                    .secure(true)    // true si HTTPS
                    .build();

            return ResponseEntity.ok()
                    .header("Set-Cookie", cookie.toString())
                    .body("");

        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("");
        }
    }
}