package com.maarcus.backend.exception.category;

public class CategoryNotFoundException extends RuntimeException {
	public CategoryNotFoundException(Long id) {
		super("Category not found with the id: " + id);
	}
}
