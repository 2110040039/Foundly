package com.foundly.app2.repository;

import com.foundly.app2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    // Custom query method to find a user by email, returning an Optional
    Optional<User> findByEmail(String email);
}
