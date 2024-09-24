package com.maarcus.backend.controller;

import com.maarcus.backend.exception.category.CategoryNotFoundException;
import com.maarcus.backend.model.product.Category;
import com.maarcus.backend.payload.response.StandardResponse;
import com.maarcus.backend.service.CategoryService;
import com.maarcus.backend.utils.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/categories")
public class CategoryController {
	
	private final CategoryService categoryService;
	private final ResponseUtil responseUtil;
	
	public CategoryController(CategoryService categoryService, ResponseUtil responseUtil) {
		this.categoryService = categoryService;
		this.responseUtil = responseUtil;
	}
	
	@GetMapping("/all")
	public ResponseEntity<StandardResponse<List<Category>>> getAllCategories() {
		List<Category> categories = categoryService.getAllCategories();
		
		if (categories.isEmpty()) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, "No categories found");
		}
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Categories retrieved successfully", categories);
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<StandardResponse<Category>> getCategory(@PathVariable UUID id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		Category category = categoryService.getCategory(id)
			.orElseThrow(() -> new CategoryNotFoundException(id));
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Category retrieved successfully", category);
	}
	
	@PostMapping("/add")
	public ResponseEntity<StandardResponse<Category>> addCategory(@RequestBody Category category) {
		if (category.getName() == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: name");
		}
		
		Category createdCategory = categoryService.addCategory(category);
		return responseUtil.buildSuccessResponse(HttpStatus.CREATED, "Category created successfully", createdCategory);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<StandardResponse<Category>> updateCategory(@PathVariable UUID id, @RequestBody Category category) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		if (category.getName() == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: name");
		}
		
		try {
			Category updatedCategory = categoryService.updateCategory(id, category);
			return responseUtil.buildSuccessResponse(HttpStatus.OK, "Category updated successfully", updatedCategory);
		} catch (CategoryNotFoundException e) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<StandardResponse<Void>> deleteCategory(@PathVariable UUID id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		try {
			categoryService.deleteCategory(id);
			return responseUtil.buildSuccessResponse(HttpStatus.NO_CONTENT, "Category deleted successfully", null);
		} catch (CategoryNotFoundException e) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
}
