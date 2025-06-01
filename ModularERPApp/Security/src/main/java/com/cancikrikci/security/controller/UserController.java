package com.cancikrikci.security.controller;

import com.cancikrikci.security.entity.User;
import com.cancikrikci.security.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class UserController {
    private final UserService m_userService;

    public UserController(UserService userService)
    {
        m_userService = userService;
    }

    @GetMapping("users")
    public List<User> getAll()
    {
        return m_userService.getAll();
    }
    @PostMapping("register")
    public User register(@RequestBody User user)
    {
        return m_userService.registerUser(user);
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody User user) {
        boolean isAuthenticated = m_userService.authenticate(user.getUsername(), user.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok(user); // Giriş başarılı, kullanıcıyı veya tokenı dönebilirsin
        } else {
            return ResponseEntity.status(401).body("Kullanıcı adı veya şifre hatalı");
        }
    }


}
