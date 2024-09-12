package com.maarcus.backend.repository;

import com.maarcus.backend.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {
  public boolean findByName(String name);
}
