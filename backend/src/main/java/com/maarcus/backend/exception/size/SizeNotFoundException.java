package com.maarcus.backend.exception.size;

import java.util.UUID;

public class SizeNotFoundException extends RuntimeException {
	public SizeNotFoundException(UUID id) {
		super("Size not found with the id: " + id);
	}
}
