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
    
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    // Create or update a user
    public User saveUser(User updatedUser) {
        // Fetch existing user from DB
        User existingUser = userRepository.findById(updatedUser.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Only update allowed editable fields
        existingUser.setName(updatedUser.getName());
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());

        // Update password only if provided
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        return userRepository.save(existingUser);
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

        // Generate a default username using the name (lowercase, no spaces)
        String baseUsername = request.getName().trim().toLowerCase().replaceAll("\\s+", "");
        String username = baseUsername;
        int counter = 1;

        // Ensure uniqueness by checking if username already exists
        while (userRepository.findByUsername(username).isPresent()) {
            username = baseUsername + counter;
            counter++;
        }

        user.setUsername(username); // Set the generated username
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }



    public Optional<User> loginUser(UserLoginRequest loginRequest) {
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