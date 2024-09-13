package com.maarcus.backend.service.implementation;

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
    User savedUser = userRepository.save(user);
    return Optional.of(savedUser);
  }

  @Override
  public Optional<User> getUser(Long id) {
    return userRepository.findById(id);
  }

  @Override
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @Override
  public User updateUser(Long id, User user) {
    Optional<User> existingUserOptional = getUser(id);

    if (existingUserOptional.isPresent()) {
      User existingUser = existingUserOptional.get();
      existingUser.setFirstName(user.getFirstName());
      existingUser.setLastName(user.getLastName());
      existingUser.setEmail(user.getEmail());
      existingUser.setPhoneNumber(user.getPhoneNumber());
      existingUser.setAddressLine1(user.getAddressLine1());
      existingUser.setAddressLine2(user.getAddressLine2());
      existingUser.setAddressLine3(user.getAddressLine3());

      return userRepository.save(existingUser);
    } else {
      throw new RuntimeException("User not found with the id: " + id);
    }
  }

  @Override
  public void deleteUser(Long id) {
    Optional<User> user = getUser(id);

    if (user.isPresent()) {
      User toBeDeletedUser = user.get();
      userRepository.delete(toBeDeletedUser);
    }
  }

  @Override
  public User signInUser(String email, String password) {
    Optional<User> user = userRepository.findByEmail(email);

    if (user.isPresent()) {
      if (passwordEncoder.matches(password, user.get().getPassword())) {
        return user.get();
      }
    }

    return null;
  }
}
