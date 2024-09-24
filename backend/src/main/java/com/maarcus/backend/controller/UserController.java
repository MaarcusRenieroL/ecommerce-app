package com.maarcus.backend.controller;

import com.maarcus.backend.exception.user.UserNotFoundException;
import com.maarcus.backend.model.user.User;
import com.maarcus.backend.payload.response.StandardResponse;
import com.maarcus.backend.service.UserService;
import com.maarcus.backend.utils.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/users")
public class UserController {
	
	private final UserService userService;
	private final ResponseUtil responseUtil;
	
	public UserController(UserService userService, ResponseUtil responseUtil) {
		this.userService = userService;
		this.responseUtil = responseUtil;
	}
	
	@GetMapping("/all")
	public ResponseEntity<StandardResponse<List<User>>> getAllUsers() {
		List<User> users = userService.getAllUsers();
		
		if (users.isEmpty()) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, "No users found");
		}
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Users retrieved successfully", users);
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<StandardResponse<User>> getUser(@PathVariable UUID id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		User user = userService.getUser(id)
			.orElseThrow(() -> new UserNotFoundException(id));
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "User retrieved successfully", user);
	}
	
	@PostMapping("/add")
	public ResponseEntity<StandardResponse<User>> addUser(@RequestBody User user) {
		if (user == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "User data is required");
		}
		
		User createdUser = userService.addUser(user);
		return responseUtil.buildSuccessResponse(HttpStatus.CREATED, "User created successfully", createdUser);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<StandardResponse<User>> updateUser(@PathVariable UUID id, @RequestBody User user) {
		if (id == null || user == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required fields: id or user data");
		}
		
		try {
			User updatedUser = userService.updateUser(id, user);
			return responseUtil.buildSuccessResponse(HttpStatus.OK, "User updated successfully", updatedUser);
		} catch (UserNotFoundException e) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<StandardResponse<Void>> deleteUser(@PathVariable UUID id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		try {
			userService.deleteUser(id);
			return responseUtil.buildSuccessResponse(HttpStatus.NO_CONTENT, "User deleted successfully", null);
		} catch (UserNotFoundException e) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
}
