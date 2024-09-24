package com.maarcus.backend.service;

import com.maarcus.backend.model.product.Product;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductService {

  Product addProduct(Product Product);

  Optional<Product> getProduct(UUID id);

  List<Product> getAllProducts();

  Product updateProduct(UUID id, Product Product);

  void deleteProduct(UUID id);

  List<Product> searchAllProductsByName(String name);
  
  List<Product> getProductsByCategory(UUID categoryId);
  
  List<Product> getProductsByVendor(UUID vendorId);
  
  List<Product> searchProductsByPriceRange(double minPrice, double maxPrice);
}
