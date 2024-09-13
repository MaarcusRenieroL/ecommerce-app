package com.maarcus.backend.controller;

import com.maarcus.backend.model.Size;
import com.maarcus.backend.service.implementation.SizeServiceImplementation;
import com.maarcus.backend.exception.size.SizeNotFoundException;
import com.maarcus.backend.model.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sizes")
public class SizeController {
  
  private final SizeServiceImplementation sizeService;
  
  @Autowired
  public SizeController(SizeServiceImplementation sizeService) {
    this.sizeService = sizeService;
  }
  
  @GetMapping("/all")
  public ResponseEntity<StandardResponse<List<Size>>> getAllSizes() {
    return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Sizes retrieved successfully", sizeService.getAllSizes()));
  }
  
  @GetMapping("/get/{id}")
  public ResponseEntity<StandardResponse<Size>> getSize(@PathVariable Long id) {
    try {
      return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Size retrieved successfully", sizeService.getSize(id).orElseThrow(() -> new SizeNotFoundException(id))));
    } catch (SizeNotFoundException ex) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
    }
  }
  
  @PostMapping("/add")
  public ResponseEntity<StandardResponse<Size>> addSize(@RequestBody Size size) {
    return ResponseEntity.status(HttpStatus.CREATED).body(new StandardResponse<>(HttpStatus.CREATED, "Size added successfully", sizeService.addSize(size).orElseThrow(() -> new RuntimeException("Error adding size"))));
  }
  
  @PutMapping("/update/{id}")
  public ResponseEntity<StandardResponse<Size>> updateSize(@PathVariable Long id, @RequestBody Size size) {
    try {
      return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Size updated successfully", sizeService.updateSize(id, size)));
    } catch (SizeNotFoundException ex) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
    }
  }
  
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<StandardResponse<Void>> deleteSize(@PathVariable Long id) {
    try {
      sizeService.deleteSize(id);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new StandardResponse<>(HttpStatus.NO_CONTENT, "Size deleted successfully", null));
    } catch (SizeNotFoundException ex) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
    }
  }
}
