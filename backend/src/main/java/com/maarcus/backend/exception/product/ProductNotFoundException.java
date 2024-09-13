package com.maarcus.backend.exception.product;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ProductNotFoundException extends ResponseStatusException {
	public ProductNotFoundException(Long id) {
		super(HttpStatus.NOT_FOUND, "Product not found with id: " + id);
	}
}
