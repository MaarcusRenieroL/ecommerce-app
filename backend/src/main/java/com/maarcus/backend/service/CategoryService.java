package com.maarcus.backend.service;

import com.maarcus.backend.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    Category addCategory(Category Category);

    Optional<Category> getCategory(Long id);

    List<Category> getAllCategories();

    Category updateCategory(Long id, Category Category);

    void deleteCategory(Long id);
}
