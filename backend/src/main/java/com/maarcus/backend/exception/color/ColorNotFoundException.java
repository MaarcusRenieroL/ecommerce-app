package com.maarcus.backend.exception.color;

public class ColorNotFoundException extends RuntimeException {
	public ColorNotFoundException(Long id) {
		super("Color not found with the id: " + id);
	}
}
