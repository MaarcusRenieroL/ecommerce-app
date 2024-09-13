package com.maarcus.backend.controller;

import com.maarcus.backend.model.Product;
import com.maarcus.backend.service.ProductService;
import com.maarcus.backend.model.StandardResponse;
import com.maarcus.backend.exception.product.ProductNotFoundException;
import com.maarcus.backend.exception.category.CategoryNotFoundException;
import com.maarcus.backend.exception.size.SizeNotFoundException;
import com.maarcus.backend.exception.color.ColorNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  
  private final ProductService productService;
  
  @Autowired
  public ProductController(ProductService productService) {
    this.productService = productService;
  }
  
  @PostMapping("/add")
  public ResponseEntity<StandardResponse<Optional<Product>>> addProduct(@RequestBody Product product) {
    try {
      return ResponseEntity.status(HttpStatus.CREATED).body(new StandardResponse<>(HttpStatus.CREATED, "Product added successfully", productService.addProduct(product)));
    } catch (CategoryNotFoundException | SizeNotFoundException | ColorNotFoundException ex) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StandardResponse<>(HttpStatus.BAD_REQUEST, ex.getMessage(), null));
    }
  }
  
  @GetMapping("/get/{id}")
  public ResponseEntity<StandardResponse<Optional<Product>>> getProduct(@PathVariable Long id) {
    try {
      return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Product retrieved successfully", productService.getProduct(id)));
    } catch (ProductNotFoundException ex) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
    }
  }
  
  @GetMapping("/all")
  public ResponseEntity<StandardResponse<List<Product>>> getAllProducts() {
    return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Products retrieved successfully", productService.getAllProducts()));
  }
  
  @PutMapping("/update/{id}")
  public ResponseEntity<StandardResponse<Product>> updateProduct(@PathVariable Long id, @RequestBody Product product) {
    try {
      return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Product updated successfully", productService.updateProduct(id, product)));
    } catch (ProductNotFoundException | CategoryNotFoundException | SizeNotFoundException | ColorNotFoundException ex) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StandardResponse<>(HttpStatus.BAD_REQUEST, ex.getMessage(), null));
    }
  }
  
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<StandardResponse<Void>> deleteProduct(@PathVariable Long id) {
    try {
      productService.deleteProduct(id);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new StandardResponse<>(HttpStatus.NO_CONTENT, "Product deleted successfully", null));
    } catch (ProductNotFoundException ex) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
    }
  }
  
  @GetMapping("/search")
  public ResponseEntity<StandardResponse<List<Product>>> searchProductsByName(@RequestParam String name) {
    return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Products retrieved successfully", productService.searchAllProductsByName(name)));
  }
}
