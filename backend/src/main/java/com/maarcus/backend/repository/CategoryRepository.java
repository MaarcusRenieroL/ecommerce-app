package com.maarcus.backend.repository;

import com.maarcus.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    public boolean findByCategoryName(String name);
}
