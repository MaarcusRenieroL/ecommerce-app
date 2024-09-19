package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.category.CategoryNotFoundException;
import com.maarcus.backend.model.Category;
import com.maarcus.backend.repository.CategoryRepository;
import com.maarcus.backend.service.CategoryService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
	public Optional<Category> getCategory(UUID id) {
		return Optional.ofNullable(categoryRepository.findById(id)
			.orElseThrow(() -> new CategoryNotFoundException(id)));
	}
	
	@Override
	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}
	
	@Override
	public Category updateCategory(UUID id, Category category) {
		Optional<Category> existingCategory = getCategory(id);
		
		if (existingCategory.isPresent()) {
			existingCategory.get().setCategoryName(category.getCategoryName());
			
			return categoryRepository.save(existingCategory.get());
		}
		
		return null;
	}
	
	@Override
	public void deleteCategory(UUID id) {
		getCategory(id).ifPresent(categoryRepository::delete);
	}
}
