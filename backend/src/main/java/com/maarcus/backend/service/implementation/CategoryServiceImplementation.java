package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.category.CategoryNotFoundException;
import com.maarcus.backend.model.misc.CategoryWithName;
import com.maarcus.backend.model.product.Category;
import com.maarcus.backend.model.user.Vendor;
import com.maarcus.backend.repository.CategoryRepository;
import com.maarcus.backend.repository.VendorRepository;
import com.maarcus.backend.service.CategoryService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImplementation implements CategoryService {
	
	private final CategoryRepository categoryRepository;
	private final VendorRepository vendorRepository;
	
	public CategoryServiceImplementation(CategoryRepository categoryRepository, VendorRepository vendorRepository) {
		this.categoryRepository = categoryRepository;
		this.vendorRepository = vendorRepository;
	}
	
	@Override
	public Category addCategory(Category category, UUID vendorId) {
		Optional<Vendor> optionalVendor = vendorRepository.findById(vendorId);

		if (optionalVendor.isPresent()) {
			category.setVendor(optionalVendor.get());
			return categoryRepository.save(category);
		}

		return null;
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
			existingCategory.get().setName(category.getName());
			
			return categoryRepository.save(existingCategory.get());
		}
		
		return null;
	}
	
	@Override
	public void deleteCategory(UUID id) {
		getCategory(id).ifPresent(categoryRepository::delete);
	}
	
	@Override
	public List<CategoryWithName> findCategoriesByVendor(UUID vendorId) {
		Optional<Vendor> optionalVendor = vendorRepository.findById(vendorId);
		List<CategoryWithName> categories = new ArrayList<>();
		
		if (optionalVendor.isPresent()) {
			for (Category category : categoryRepository.findAll()) {
				if (category.getVendor().getId().equals(vendorId)) {
					categories.add(new CategoryWithName(category.getId(), category.getName()));
				}
			}
		}
		
		return categories;
	}
}
