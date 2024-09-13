package com.maarcus.backend.controller;

import com.maarcus.backend.exception.category.CategoryNotFoundException;
import com.maarcus.backend.model.Color;
import com.maarcus.backend.service.ColorService;
import com.maarcus.backend.model.StandardResponse;
import com.maarcus.backend.exception.color.ColorNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/colors")
public class ColorController {
  
  private final ColorService colorService;
  
  @Autowired
  public ColorController(ColorService colorService) {
    this.colorService = colorService;
  }
  
  @GetMapping("/all")
  public ResponseEntity<StandardResponse<List<Color>>> getAllColors() {

    return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Colors retrieved successfully", colorService.getAllColors()));
  }
  
  @GetMapping("/get/{id}")
  public ResponseEntity<StandardResponse<Optional<Color>>> getColor(@PathVariable Long id) {
    try {
      return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Color retrieved successfully", colorService.getColor(id)));
    } catch (ColorNotFoundException ex) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
    }
  }
  
  @PostMapping("/add")
  public ResponseEntity<StandardResponse<Optional<Color>>> addColor(@RequestBody Color color) {
    try {
      return ResponseEntity.status(HttpStatus.CREATED).body(new StandardResponse<>(HttpStatus.CREATED, "Color added successfully", colorService.addColor(color)));
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StandardResponse<>(HttpStatus.BAD_REQUEST, ex.getMessage(), null));
    }
  }
  
  @PutMapping("/update/{id}")
  public ResponseEntity<StandardResponse<Color>> updateColor(@PathVariable Long id, @RequestBody Color color) {
    try {
      return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Color updated successfully", colorService.updateColor(id, color)));
    } catch (ColorNotFoundException ex) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
    }
  }
  
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<StandardResponse<Void>> deleteColor(@PathVariable Long id) {
    try {
      colorService.deleteColor(id);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new StandardResponse<>(HttpStatus.NO_CONTENT, "Color deleted successfully", null));
    } catch (CategoryNotFoundException ex) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
    }
  }
}
