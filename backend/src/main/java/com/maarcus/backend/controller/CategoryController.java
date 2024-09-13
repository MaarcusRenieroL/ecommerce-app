package com.maarcus.backend.controller;

import com.maarcus.backend.model.Category;
import com.maarcus.backend.model.StandardResponse;
import com.maarcus.backend.service.CategoryService;
import com.maarcus.backend.exception.category.CategoryNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	
	private final CategoryService categoryService;
	
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<StandardResponse<List<Category>>> getAllCategories() {
		List<Category> categories = categoryService.getAllCategories();
		StandardResponse<List<Category>> response = new StandardResponse<>(HttpStatus.OK, "Categories retrieved successfully", categories);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<StandardResponse<Category>> getCategory(@PathVariable Long id) {
		Optional<Category> categoryOptional = categoryService.getCategory(id);
		return categoryOptional.map(category -> ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Category retrieved successfully", category))).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, "Category not found", null)));
	}
	
	@PostMapping("/add")
	public ResponseEntity<StandardResponse<Category>> addCategory(@RequestBody Category category) {
		return ResponseEntity.status(HttpStatus.CREATED).body(new StandardResponse<>(HttpStatus.CREATED, "Category created successfully", categoryService.addCategory(category)));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<StandardResponse<Category>> updateCategory(@PathVariable Long id, @RequestBody Category category) {
		try {
			return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Category updated successfully", categoryService.updateCategory(id, category)));
		} catch (CategoryNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<StandardResponse<Void>> deleteCategory(@PathVariable Long id) {
		try {
			categoryService.deleteCategory(id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new StandardResponse<>(HttpStatus.NO_CONTENT, "Category deleted successfully", null));
		} catch (CategoryNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
		}
	}
}
