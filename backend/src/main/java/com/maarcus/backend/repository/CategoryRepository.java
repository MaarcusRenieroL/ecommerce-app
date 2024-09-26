package com.maarcus.backend.repository;

import com.maarcus.backend.model.product.Category;
import com.maarcus.backend.model.user.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
  Optional<Category> findByName(String name);
  
  List<Category> findByVendor(Vendor vendor);
}
