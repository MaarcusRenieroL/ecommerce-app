package com.maarcus.backend.exception.category;

import java.util.UUID;

public class CategoryNotFoundException extends RuntimeException {
	public CategoryNotFoundException(UUID id) {
		super("Category not found with the id: " + id);
	}
}
