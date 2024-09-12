package com.maarcus.backend.service.implementation;

import com.maarcus.backend.model.*;
import com.maarcus.backend.repository.*;
import com.maarcus.backend.service.ProductService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImplementation implements ProductService {

  private final ProductRepository productRepository;
  private final ImageRepository imageRepository;
  private final CategoryRepository categoryRepository;
  private final SizeRepository sizeRepository;
  private final ColorRepository colorRepository;

  public ProductServiceImplementation(
      ProductRepository productRepository,
      ImageRepository imageRepository,
      CategoryRepository categoryRepository,
      SizeRepository sizeRepository,
      ColorRepository colorRepository) {
    this.productRepository = productRepository;
    this.imageRepository = imageRepository;
    this.categoryRepository = categoryRepository;
    this.sizeRepository = sizeRepository;
    this.colorRepository = colorRepository;
  }

  @Override
  public Optional<Product> addProduct(Product product) {
    imageRepository.saveAll(product.getProductImages());
    Category category = product.getCategory();
    Size size = product.getSize();
    Color color = product.getColor();

    if (!categoryRepository.findByCategoryName(category.getCategoryName())) {
      categoryRepository.save(category);
    }

    if (!sizeRepository.findByName(size.getName())) {
      sizeRepository.save(size);
    }

    if (!colorRepository.findByName(color.getName())) {
      colorRepository.save(color);
    }

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
      existingProduct.setSize(product.getSize());
      existingProduct.setColor(product.getColor());

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

  @Override
  public List<Product> searchAllProductsByName(String name) {
    List<Product> products = new ArrayList<>();

    for (Product product : getAllProducts()) {
      if (product.getProductName().toLowerCase().contains(name.toLowerCase())) {
        products.add(product);
      }
    }

    return products;
  }
}
