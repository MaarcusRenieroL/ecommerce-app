package com.maarcus.backend.controller;

import com.maarcus.backend.exception.size.SizeNotFoundException;
import com.maarcus.backend.model.Size;
import com.maarcus.backend.payload.response.StandardResponse;
import com.maarcus.backend.service.SizeService;
import com.maarcus.backend.utils.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/sizes")
public class SizeController {
  
  private final SizeService sizeService;
  private final ResponseUtil responseUtil;
  
  public SizeController(SizeService sizeService, ResponseUtil responseUtil) {
    this.sizeService = sizeService;
    this.responseUtil = responseUtil;
  }
  
  @GetMapping("/all")
  public ResponseEntity<StandardResponse<List<Size>>> getAllSizes() {
    List<Size> sizes = sizeService.getAllSizes();
    
    if (sizes.isEmpty()) {
      return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, "No sizes found");
    }
    
    return responseUtil.buildSuccessResponse(HttpStatus.OK, "Sizes retrieved successfully", sizes);
  }
  
  @GetMapping("/get/{id}")
  public ResponseEntity<StandardResponse<Size>> getSize(@PathVariable UUID id) {
    if (id == null) {
      return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
    }
    
    Size size = sizeService.getSize(id)
      .orElseThrow(() -> new SizeNotFoundException(id));
    
    return responseUtil.buildSuccessResponse(HttpStatus.OK, "Size retrieved successfully", size);
  }
  
  @PostMapping("/add")
  public ResponseEntity<StandardResponse<Size>> addSize(@RequestBody Size size) {
    if (size.getName() == null || size.getValue() == null) {
      return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required fields: name or value");
    }
    
    Size createdSize = sizeService.addSize(size);
    return responseUtil.buildSuccessResponse(HttpStatus.CREATED, "Size created successfully", createdSize);
  }
  
  @PutMapping("/update/{id}")
  public ResponseEntity<StandardResponse<Size>> updateSize(@PathVariable UUID id, @RequestBody Size size) {
    if (id == null || size.getName() == null || size.getValue() == null) {
      return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required fields: id, name, or value");
    }
    
    try {
      Size updatedSize = sizeService.updateSize(id, size);
      return responseUtil.buildSuccessResponse(HttpStatus.OK, "Size updated successfully", updatedSize);
    } catch (SizeNotFoundException e) {
      return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }
  
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<StandardResponse<Void>> deleteSize(@PathVariable UUID id) {
    if (id == null) {
      return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
    }
    
    try {
      sizeService.deleteSize(id);
      return responseUtil.buildSuccessResponse(HttpStatus.NO_CONTENT, "Size deleted successfully", null);
    } catch (SizeNotFoundException e) {
      return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }
}
