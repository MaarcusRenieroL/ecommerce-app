package com.maarcus.backend.controller;

import com.maarcus.backend.model.Color;
import com.maarcus.backend.service.implementation.ColorServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/colors")
public class ColorController {

  @Autowired private final ColorServiceImplementation colorService;

  public ColorController(ColorServiceImplementation colorService) {
    this.colorService = colorService;
  }

  @GetMapping(path = "/all")
  public List<Color> getAllColors() {
    return colorService.getAllColors();
  }

  @GetMapping(path = "/get/{id}")
  public Optional<Color> getColor(@PathVariable Long id) {
    return colorService.getColor(id);
  }

  @PostMapping(path = "/add")
  public Optional<Color> addColor(@RequestBody Color color) {
    return colorService.addColor(color);
  }

  @PutMapping(path = "/update/{id}")
  public Color updateColor(@PathVariable Long id, @RequestBody Color color) {
    return colorService.updateColor(id, color);
  }

  @DeleteMapping(path = "/delete/{id}")
  public void deleteColor(@PathVariable Long id) {
    colorService.deleteColor(id);
  }
}
