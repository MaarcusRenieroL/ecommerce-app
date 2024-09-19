package com.maarcus.backend.controller;

import com.maarcus.backend.exception.category.CategoryNotFoundException;
import com.maarcus.backend.model.Color;
import com.maarcus.backend.service.ColorService;
import com.maarcus.backend.payload.response.StandardResponse;
import com.maarcus.backend.exception.color.ColorNotFoundException;
import com.maarcus.backend.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/colors")
public class ColorController {
  
  private final ColorService colorService;
  private final ResponseUtil responseUtil;
  
  @Autowired
  public ColorController(ColorService colorService, ResponseUtil responseUtil) {
    this.colorService = colorService;
	  this.responseUtil = responseUtil;
  }
  
  @GetMapping(path = "/all")
  public ResponseEntity<StandardResponse<List<Color>>> getAllColors() {
    List<Color> colors = colorService.getAllColors();
    
    if (colors.isEmpty()) {
      return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, "No categories found");
    }
    
    return responseUtil.buildSuccessResponse(HttpStatus.OK, "Categories retrieved successfully", colors);
  }
  
  @GetMapping(path = "/get/{id}")
  public ResponseEntity<StandardResponse<Color>> getColor(@PathVariable UUID id) {
    
    if (id == null) {
      return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
    }
    
    Color color = colorService.getColor(id).orElseThrow(() -> new ColorNotFoundException(id));
    
    return responseUtil.buildSuccessResponse(HttpStatus.OK, "Color retrieved successfully", color);
  }
  
  @PostMapping(path = "/add")
  public ResponseEntity<StandardResponse<Color>> addColor(@RequestBody Color color) {
    if (color.getName() == null) {
      return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: name");
    }
    
    if (color.getValue() == null) {
      return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: value");
    }
    
    Color createdColor = colorService.addColor(color);
    return responseUtil.buildSuccessResponse(HttpStatus.CREATED, "Color created successfully", createdColor);
  }
  
  @PutMapping(path = "/update/{id}")
  public ResponseEntity<StandardResponse<Color>> updateColor(@PathVariable UUID id, @RequestBody Color color) {
    if (id == null) {
      return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
    }
    
    if (color.getName() == null) {
      return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: name");
    }
    
    if (color.getValue() == null) {
      return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: value");
    }
    
    try {
      Color updatedColor = colorService.updateColor(id, color);
      return responseUtil.buildSuccessResponse(HttpStatus.OK, "Color updated successfully", updatedColor);
    } catch (CategoryNotFoundException e) {
      return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }
  
  @DeleteMapping(path = "/delete/{id}")
  public ResponseEntity<StandardResponse<Void>> deleteColor(@PathVariable UUID id) {
    if (id == null) {
      return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
    }
    
    try {
      colorService.deleteColor(id);
      return responseUtil.buildSuccessResponse(HttpStatus.NO_CONTENT, "Color deleted successfully", null);
    } catch (CategoryNotFoundException e) {
      return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }
}
