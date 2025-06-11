package com.cancikrikci.security.controller;

import com.cancikrikci.common.lib.entity.User;
import com.cancikrikci.security.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.apache.catalina.session.StandardSession;
import org.hibernate.tool.schema.internal.StandardTableCleaner;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class UserController {
    private final UserService m_userService;
    private String m_username;


    public UserController(UserService userService)
    {
        m_userService = userService;
    }

    @GetMapping("user/activeuser")
    public String getUsername()
    {
        return m_username;
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
    public ResponseEntity<?> login(@RequestBody User user)
    {
        m_username = user.getUsername();
        boolean isAuthenticated = m_userService.authenticate(user.getUsername(), user.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok(user); // Giriş başarılı, kullanıcıyı veya tokenı dönebilirsin
        } else {
            return ResponseEntity.status(401).body("Kullanıcı adı veya şifre hatalı");
        }
    }


}
