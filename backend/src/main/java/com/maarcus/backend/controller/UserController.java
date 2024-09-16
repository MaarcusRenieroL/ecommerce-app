package com.maarcus.backend.controller;

import com.maarcus.backend.exception.user.UserNotFoundException;
import com.maarcus.backend.model.SignIn;
import com.maarcus.backend.model.StandardResponse;
import com.maarcus.backend.model.User;
import com.maarcus.backend.service.UserService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<StandardResponse<List<User>>> getAllUsers() {
		return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Users retrieved successfully", userService.getAllUsers()));
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<StandardResponse<User>> getUser(@PathVariable Long id) {
		return userService.getUser(id).map(user -> ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "User retrieved successfully", user))).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, "User not found", null)));
	}
	
	@PostMapping("/add")
	public ResponseEntity<StandardResponse<Optional<User>>> addUser(@RequestBody User user) {
		System.out.println("roles: ");
		System.out.println(user.getRole());
		return ResponseEntity.status(HttpStatus.CREATED).body(new StandardResponse<>(HttpStatus.CREATED, "User created successfully", userService.addUser(user)));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<StandardResponse<User>> updateUser(@PathVariable Long id, @RequestBody User user) {
		try {
			return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "User updated successfully", userService.updateUser(id, user)));
		} catch (UserNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<StandardResponse<Void>> deleteUser(@PathVariable Long id) {
		try {
			userService.deleteUser(id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new StandardResponse<>(HttpStatus.NO_CONTENT, "User deleted successfully", null));
		} catch (UserNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
		}
	}
}
