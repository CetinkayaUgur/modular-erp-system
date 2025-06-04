package com.cancikrikci.security.service;

import com.cancikrikci.security.entity.User;
import com.cancikrikci.security.entity.UserDetailx;
import com.cancikrikci.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository m_userRepository;

    public UserService(UserRepository userRepository)
    {
        m_userRepository = userRepository;
    }

    @Lazy
    @Autowired
    private AuthenticationManager m_authenticationManager;
    private final BCryptPasswordEncoder m_passwordEncoder = new BCryptPasswordEncoder(12);
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        User user = m_userRepository.findByUsername(username);

        if(user == null)
            throw new UsernameNotFoundException("yok");

        return new UserDetailx(user);
    }
    public List<User> getAll()
    {
        return m_userRepository.findAll();
    }

    public User registerUser(User user)
    {
        user.setPassword(m_passwordEncoder.encode(user.password));
        return m_userRepository.save(user);
    }

    public boolean authenticate(String username, String rawPassword) {
        User user = m_userRepository.findByUsername(username);
        if (user == null) return false;
        return m_passwordEncoder.matches(rawPassword, user.getPassword());
    }

}
