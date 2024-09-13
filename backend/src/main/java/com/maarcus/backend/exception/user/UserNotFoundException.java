package com.maarcus.backend.exception.user;

public class UserNotFoundException extends RuntimeException {
	public UserNotFoundException(Long id) {
		super("User not found with the id: " + id);
	}
}

