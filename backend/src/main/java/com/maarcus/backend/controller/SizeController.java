package com.maarcus.backend.controller;

import com.maarcus.backend.model.Size;
import com.maarcus.backend.service.implementation.SizeServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sizes")
public class SizeController {

  @Autowired private final SizeServiceImplementation sizeService;

  public SizeController(SizeServiceImplementation sizeService) {
    this.sizeService = sizeService;
  }

  @GetMapping(path = "/all")
  public List<Size> getAllSizes() {
    return sizeService.getAllSizes();
  }

  @GetMapping(path = "/get/{id}")
  public Optional<Size> getSize(@PathVariable Long id) {
    return sizeService.getSize(id);
  }

  @PostMapping(path = "/add")
  public Optional<Size> addSize(@RequestBody Size size) {
    return sizeService.addSize(size);
  }

  @PutMapping(path = "/update/{id}")
  public Size updateSize(@PathVariable Long id, @RequestBody Size size) {
    return sizeService.updateSize(id, size);
  }

  @DeleteMapping(path = "/delete/{id}")
  public void deleteSize(@PathVariable Long id) {
    sizeService.deleteSize(id);
  }
}
