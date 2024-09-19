package com.maarcus.backend.service;

import com.maarcus.backend.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {

  User addUser(User user);

  Optional<User> getUser(UUID id);

  List<User> getAllUsers();

  User updateUser(UUID id, User user);

  void deleteUser(UUID id);
}
