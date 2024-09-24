package com.maarcus.backend.service;

import com.maarcus.backend.model.product.Category;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryService {

  Category addCategory(Category Category);

  Optional<Category> getCategory(UUID id);

  List<Category> getAllCategories();

  Category updateCategory(UUID id, Category Category);

  void deleteCategory(UUID id);
}
