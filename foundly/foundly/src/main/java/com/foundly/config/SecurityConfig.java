package com.foundly.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF protection 
            .csrf(AbstractHttpConfigurer::disable)
            
            // Disable HTTP Basic Authentication
            .httpBasic(AbstractHttpConfigurer::disable)
            
            // Disable form login
            .formLogin(AbstractHttpConfigurer::disable)
            
            // Optionally, configure which endpoints are secured
            .authorizeHttpRequests(authz -> authz
            	    .anyRequest().permitAll()
            	);

        return http.build();
    }
}