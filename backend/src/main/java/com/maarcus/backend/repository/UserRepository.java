package com.maarcus.backend.repository;

import java.util.Optional;

import com.maarcus.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  public Optional<User> findByEmail(String email);

  Optional<User> findByUsername(String username);
}
