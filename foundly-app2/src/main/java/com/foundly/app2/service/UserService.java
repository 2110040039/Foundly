package com.foundly.app2.service;

import com.foundly.app2.entity.User;
import com.foundly.app2.repository.UserRepository;
import com.foundly.app2.dto.UserLoginRequest;
import com.foundly.app2.dto.UserRegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a user by ID
    public Optional<User> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }

    // Get a user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // Create or update a user
    public User saveUser (User user) {
        return userRepository.save(user);
    }

    // Delete a user
    public void deleteUser (Integer userId) {
        userRepository.deleteById(userId);
    }

    public User registerUser(UserRegistrationRequest registrationRequest) {
        User user = new User();
        user.setEmployeeId(registrationRequest.getEmployeeId());
        user.setName(registrationRequest.getName());
        user.setEmail(registrationRequest.getEmail());
        user.setPhone(registrationRequest.getPhone());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setUsername(registrationRequest.getUsername()); // Set the username
        return userRepository.save(user);
    }

    // Login a user
    public Optional<User> loginUser (UserLoginRequest loginRequest) {
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());
        if (user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    // Find a user by ID (new method)
    public Optional<User> findById(Integer userId) {
        return userRepository.findById(userId);
    }
}