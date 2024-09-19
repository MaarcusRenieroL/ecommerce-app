package com.maarcus.backend.exception.user;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {
	public UserNotFoundException(UUID id) {
		super("User not found with the id: " + id);
	}
}

