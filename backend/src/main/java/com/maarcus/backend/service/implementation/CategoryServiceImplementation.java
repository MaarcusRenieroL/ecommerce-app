package com.maarcus.backend.service.implementation;

import com.maarcus.backend.model.Category;
import com.maarcus.backend.repository.CategoryRepository;
import com.maarcus.backend.service.CategoryService;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImplementation implements CategoryService {

  private final CategoryRepository categoryRepository;

  public CategoryServiceImplementation(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  @Override
  public Category addCategory(Category category) {
    return categoryRepository.save(category);
  }

  @Override
  public Optional<Category> getCategory(Long id) {
    return categoryRepository.findById(id);
  }

  @Override
  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }

  @Override
  public Category updateCategory(Long id, Category category) {
    Optional<Category> existingCategoryOptional = getCategory(id);

    if (existingCategoryOptional.isPresent()) {
      Category existingCategory = existingCategoryOptional.get();
      existingCategory.setCategoryName(category.getCategoryName());

      return categoryRepository.save(existingCategory);
    } else {
      throw new RuntimeException("Category not found with the id: " + id);
    }
  }

  @Override
  public void deleteCategory(Long id) {
    Optional<Category> category = getCategory(id);

    if (category.isPresent()) {
      Category toBeDeletedCategory = category.get();
      categoryRepository.delete(toBeDeletedCategory);
    }
  }
}
