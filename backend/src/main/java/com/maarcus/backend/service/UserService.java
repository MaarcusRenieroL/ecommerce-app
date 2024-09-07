package com.maarcus.backend.service;

import com.maarcus.backend.model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {

  Optional<User> addUser(User user);

  Optional<User> getUser(Long id);

  List<User> getAllUsers();

  User updateUser(Long id, User user);

  void deleteUser(Long id);
}
