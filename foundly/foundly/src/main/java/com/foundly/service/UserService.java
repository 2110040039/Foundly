package com.foundly.service;

import com.foundly.entity.User;
import com.foundly.entity.User.UserRole;
import com.foundly.exception.ResourceNotFoundException;
import com.foundly.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class UserService {

	@Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Create a new user
    public User createUser(User user) {
        // Ensure passwordHash is set and encoded
        if (user.getPasswordHash() == null) {
            throw new IllegalArgumentException("Password must be provided");
        }
        if (user.getPasswordHash() != null) {
            user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        }
        
        // Encode the password before saving
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        
        // Set created at timestamp
        user.setCreatedAt(LocalDateTime.now());
        
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    // Get user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    // Update user
    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);

        user.setFullName(userDetails.getFullName());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        
        // Only update password if a new one is provided
        if (userDetails.getPasswordHash() != null) {
            user.setPasswordHash(passwordEncoder.encode(userDetails.getPasswordHash()));
        }
        
        user.setProfileImage(userDetails.getProfileImage());
        
        return userRepository.save(user);
    }


    // Delete user
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    // Check if email exists
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // Change user status
    public User updateUserStatus(Long id, User.AccountStatus status) {
        User user = getUserById(id);
        user.setAccountStatus(status);
        return userRepository.save(user);
    }

    // Change user role
    public User updateUserRole(Long id, UserRole role) {
        User user = getUserById(id);
        user.setRole(role);
        return userRepository.save(user);
    }
}