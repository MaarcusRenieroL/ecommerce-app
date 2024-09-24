package com.maarcus.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.maarcus.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findByEmail(String email);

  Optional<User> findByUsername(String username);
  
  List<User> findByRole(String role);
}
