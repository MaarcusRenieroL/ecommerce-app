package com.maarcus.backend.service;

import com.maarcus.backend.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Optional<Product> addProduct(Product Product);

    Optional<Product> getProduct(Long id);

    List<Product> getAllProducts();

    Product updateProduct(Long id, Product Product);

    void deleteProduct(Long id);
}
