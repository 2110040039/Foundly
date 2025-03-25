package com.foundly.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
//import java.util.List;
//
//import org.springframework.context.annotation.Import;
//
//import com.mysql.cj.protocol.Message;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    
    @Column(nullable = false)
    private String fullName;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    private String phoneNumber;
    
    @Column(nullable = false)
    private String passwordHash;
    
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.User;
    
    private String profileImage;
    
    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus = AccountStatus.Active;
    
    private LocalDateTime createdAt;
    
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Import> itemReports;
//    
//    @OneToMany(mappedBy = "requesterUser", cascade = CascadeType.ALL)
//   private List<ItemReturnRequest> itemReturnRequests;
//    
//    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
//    private List<Message> sentMessages;
//    
//    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
//    private List<Message> receivedMessages;
    
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
    
    public enum UserRole {
        User, Admin
    }
    
    public enum AccountStatus {
        Active, Suspended
    }
    
    // Getters and Setters
    
    public Integer getUserId() {
        return userId;
    }
    
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getPasswordHash() {
        return passwordHash;
    }
    
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
    
    public UserRole getRole() {
        return role;
    }
    
    public void setRole(UserRole role) {
        this.role = role;
    }
    
    public String getProfileImage() {
        return profileImage;
    }
    
    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
    
    public AccountStatus getAccountStatus() {
        return accountStatus;
    }
    
    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}