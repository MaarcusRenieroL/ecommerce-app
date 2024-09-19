package com.maarcus.backend.repository;

import com.maarcus.backend.model.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ColorRepository extends JpaRepository<Color, UUID> {
  Optional<Color> findByName(String name);
}
