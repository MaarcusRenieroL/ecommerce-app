package com.maarcus.backend.exception.color;

import java.util.UUID;

public class ColorNotFoundException extends RuntimeException {
	public ColorNotFoundException(UUID id) {
		super("Color not found with the id: " + id);
	}
}
