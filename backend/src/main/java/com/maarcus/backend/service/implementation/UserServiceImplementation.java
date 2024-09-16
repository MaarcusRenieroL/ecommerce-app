package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.user.UserNotFoundException;
import com.maarcus.backend.exception.user.InvalidCredentialsException;
import com.maarcus.backend.model.User;
import com.maarcus.backend.repository.UserRepository;
import com.maarcus.backend.service.UserService;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public UserServiceImplementation(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
  }
	
	@Override
	public Optional<User> addUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return Optional.of(userRepository.save(user));
	}
	
	@Override
	public Optional<User> getUser(Long id) {
		return Optional.ofNullable(userRepository.findById(id)
			.orElseThrow(() -> new UserNotFoundException(id)));
	}
	
	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	@Override
	public User updateUser(Long id, User user) {
		Optional<User> existingUser = getUser(id);
		
		if (existingUser.isPresent()) {
			existingUser.get().setFirstName(user.getFirstName());
			existingUser.get().setLastName(user.getLastName());
			existingUser.get().setEmail(user.getEmail());
			existingUser.get().setRole(user.getRole());
			existingUser.get().setPhoneNumber(user.getPhoneNumber());
			existingUser.get().setAddressLine1(user.getAddressLine1());
			existingUser.get().setAddressLine2(user.getAddressLine2());
			existingUser.get().setAddressLine3(user.getAddressLine3());
			
			return userRepository.save(existingUser.get());
		}
		
		return null;
	}
	
	@Override
	public void deleteUser(Long id) {
		getUser(id).ifPresent(userRepository::delete);
	}
	
	@Override
	public User signInUser(String email, String password) {
		Optional<User> user = userRepository.findByEmail(email);
		if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
			return user.get();
		}
		throw new InvalidCredentialsException();
	}
	
}
