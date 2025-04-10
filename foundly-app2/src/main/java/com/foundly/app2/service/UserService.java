package com.foundly.app2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.foundly.app2.dto.UserLoginRequest;
import com.foundly.app2.dto.UserRegistrationRequest;
import com.foundly.app2.entity.User;
import com.foundly.app2.repository.UserRepository;

@Service
public class UserService {
	@Autowired(required=true)
	private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    //private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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

    public User registerUser(UserRegistrationRequest request) {
        User user = new User();
        user.setEmployeeId(request.getEmployeeId());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }


    public Optional<User> loginUser(UserLoginRequest loginRequest) {
        String identifier = loginRequest.getUsernameOrEmail();
        Optional<User> user;

        // Check by email if it looks like an email, else by username
        if (identifier.contains("@")) {
            user = userRepository.findByEmail(identifier);
        } else {
            user = userRepository.findByUsername(identifier);
        }
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