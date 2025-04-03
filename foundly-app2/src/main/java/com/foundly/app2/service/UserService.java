package com.foundly.app2.service;

import com.foundly.app2.entity.User;
import com.foundly.app2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Delete a user
    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }
}
