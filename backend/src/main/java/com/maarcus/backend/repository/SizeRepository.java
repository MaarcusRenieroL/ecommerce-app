package com.maarcus.backend.repository;

import com.maarcus.backend.model.product.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SizeRepository extends JpaRepository<Size, UUID> {
  Optional<Size> findByValue(String name);
}
