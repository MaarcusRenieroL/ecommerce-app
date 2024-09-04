package com.maarcus.backend.controller;

import com.maarcus.backend.model.Product;
import com.maarcus.backend.service.implementation.ProductServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private final ProductServiceImplementation productService;

    public ProductController(ProductServiceImplementation productService) {
        this.productService = productService;
    }

    @GetMapping(path = "/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping(path = "/get/{id}")
    public Optional<Product> getProduct(@PathVariable Long id) {
        return productService.getProduct(id);
    }

    @PostMapping(path = "/add")
    public Optional<Product> addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @PutMapping(path = "/update/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
