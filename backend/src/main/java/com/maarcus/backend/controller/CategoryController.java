package com.maarcus.backend.controller;

import com.maarcus.backend.exception.category.CategoryNotFoundException;
import com.maarcus.backend.model.misc.CategoryWithVendorId;
import com.maarcus.backend.model.misc.CategoryWithName;
import com.maarcus.backend.model.product.Category;
import com.maarcus.backend.payload.response.StandardResponse;
import com.maarcus.backend.service.implementation.CategoryServiceImplementation;
import com.maarcus.backend.utils.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/categories")
public class CategoryController {
	
	private final CategoryServiceImplementation categoryService;
	private final ResponseUtil responseUtil;
	
	public CategoryController(CategoryServiceImplementation categoryService, ResponseUtil responseUtil) {
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
	
	@GetMapping("/get/vendor/{id}")
	public ResponseEntity<StandardResponse<List<CategoryWithName>>> getVendorCategories(@PathVariable String id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Categories retrieved successfully", categoryService.findCategoriesByVendor(UUID.fromString(id)));
	}
	
	@PostMapping("/add")
	public ResponseEntity<StandardResponse<CategoryWithName>> addCategory(@RequestBody CategoryWithVendorId categoryWithVendorId) {
		if (categoryWithVendorId.getVendorId() == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: vendorId");
		}

		if (categoryWithVendorId.getCategory().getName() == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: categoryName");
		}
		
		Category category = categoryService.addCategory(categoryWithVendorId.getCategory(), UUID.fromString(categoryWithVendorId.getVendorId()));

		return responseUtil.buildSuccessResponse(HttpStatus.CREATED, "Category created successfully", new CategoryWithName(category.getId(), category.getName()));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<StandardResponse<CategoryWithName>> updateCategory(@PathVariable UUID id, @RequestBody Category category) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		if (category.getName() == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: name");
		}
		
		try {
			Category updatedCategory = categoryService.updateCategory(id, category);
			return responseUtil.buildSuccessResponse(HttpStatus.OK, "Category updated successfully", new CategoryWithName(updatedCategory.getId(), updatedCategory.getName()));
		} catch (CategoryNotFoundException e) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<StandardResponse<Void>> deleteCategory(@PathVariable String id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		try {
			categoryService.deleteCategory(UUID.fromString(id));
			return responseUtil.buildSuccessResponse(HttpStatus.OK, "Category deleted successfully", null);
		} catch (CategoryNotFoundException e) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
}
