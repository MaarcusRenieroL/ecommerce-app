package com.maarcus.backend.repository;

import com.maarcus.backend.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {
  Optional<Size> findByName(String name);
}
