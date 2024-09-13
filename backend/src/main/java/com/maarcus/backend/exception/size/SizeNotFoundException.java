package com.maarcus.backend.exception.size;

public class SizeNotFoundException extends RuntimeException {
	public SizeNotFoundException(Long id) {
		super("Size not found with the id: " + id);
	}
}
