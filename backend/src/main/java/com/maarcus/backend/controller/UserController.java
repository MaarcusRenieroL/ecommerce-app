package com.maarcus.backend.controller;

import com.maarcus.backend.model.User;
import com.maarcus.backend.service.implementation.UserServiceImplementation;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired private final UserServiceImplementation userService;

  public UserController(UserServiceImplementation userService) {
    this.userService = userService;
  }

  @GetMapping(path = "/all")
  public List<User> getAllUsers() {
    return userService.getAllUsers();
  }

  @GetMapping(path = "/get/{id}")
  public Optional<User> getUser(@PathVariable Long id) {
    return userService.getUser(id);
  }

  @PostMapping(path = "/add")
  public Optional<User> addUser(@RequestBody User user) {
    return userService.addUser(user);
  }

  @PutMapping(path = "/update/{id}")
  public User updateUser(@PathVariable Long id, @RequestBody User user) {
    return userService.updateUser(id, user);
  }

  @DeleteMapping(path = "/delete/{id}")
  public void deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
  }
}
