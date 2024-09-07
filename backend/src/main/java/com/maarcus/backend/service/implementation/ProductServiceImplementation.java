package com.maarcus.backend.service.implementation;

import com.maarcus.backend.model.Product;
import com.maarcus.backend.repository.CategoryRepository;
import com.maarcus.backend.repository.ImageRepository;
import com.maarcus.backend.repository.ProductRepository;
import com.maarcus.backend.service.ProductService;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ProductServiceImplementation implements ProductService {

  private final ProductRepository productRepository;
  private final ImageRepository imageRepository;
  private final CategoryRepository categoryRepository;

  public ProductServiceImplementation(
      ProductRepository productRepository,
      ImageRepository imageRepository,
      CategoryRepository categoryRepository) {
    this.productRepository = productRepository;
    this.imageRepository = imageRepository;
    this.categoryRepository = categoryRepository;
  }

  @Override
  public Optional<Product> addProduct(Product product) {
    imageRepository.saveAll(product.getProductImages());
    categoryRepository.save(product.getCategory());
    Product savedProduct = productRepository.save(product);
    return Optional.of(savedProduct);
  }

  @Override
  public Optional<Product> getProduct(Long id) {
    return productRepository.findById(id);
  }

  @Override
  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  @Override
  public Product updateProduct(Long id, Product product) {
    Optional<Product> existingProductOptional = getProduct(id);

    if (existingProductOptional.isPresent()) {
      Product existingProduct = existingProductOptional.get();
      existingProduct.setProductName(product.getProductName());
      existingProduct.setQuantityInStock(product.getQuantityInStock());
      existingProduct.setProductDescription(product.getProductDescription());
      existingProduct.setProductImages(product.getProductImages());
      existingProduct.setPrice(product.getPrice());

      return productRepository.save(existingProduct);
    } else {
      throw new RuntimeException("Product not found with the id: " + id);
    }
  }

  @Override
  public void deleteProduct(Long id) {
    Optional<Product> product = getProduct(id);

    if (product.isPresent()) {
      Product toBeDeletedProduct = product.get();
      productRepository.delete(toBeDeletedProduct);
    }
  }
}

