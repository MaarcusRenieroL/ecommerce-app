package com.maarcus.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(auth -> auth.requestMatchers("/api/products/all", "api/products/get/{id}", "/api/categories/all", "api/categories/get/{id}","/api/sizes/all", "api/sizes/get/{id}","/api/colors/all", "api/colors/get/{id}", "api/users/add").permitAll()).httpBasic(AbstractHttpConfigurer::disable).logout(LogoutConfigurer::permitAll);

        return http.build();
    }
}
