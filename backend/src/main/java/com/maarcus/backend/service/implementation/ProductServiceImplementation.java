package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.product.ProductNotFoundException;
import com.maarcus.backend.model.Category;
import com.maarcus.backend.model.Color;
import com.maarcus.backend.model.Product;
import com.maarcus.backend.model.Size;
import com.maarcus.backend.repository.*;
import com.maarcus.backend.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImplementation implements ProductService {
	
	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	private final SizeRepository sizeRepository;
	private final ColorRepository colorRepository;
	private final ImageRepository imageRepository;
	
	private void findCategorySizeAndColor(Product product) {
		try {
			Category category = product.getCategory();
			if (category != null) {
				Category existingCategory = categoryRepository.findByCategoryName(category.getCategoryName())
					.orElseGet(() -> categoryRepository.save(category));
				product.setCategory(existingCategory);
			}
			
			Size size = product.getSize();
			if (size != null) {
				Size existingSize = sizeRepository.findByName(size.getName())
					.orElseGet(() -> sizeRepository.save(size));
				product.setSize(existingSize);
			}
			
			Color color = product.getColor();
			if (color != null) {
				Color existingColor = colorRepository.findByName(color.getName())
					.orElseGet(() -> colorRepository.save(color));
				product.setColor(existingColor);
			}
			
		} catch (Exception e) {
			System.err.println("Error occurred while processing category, size, or color: " + e.getMessage());
			throw new RuntimeException("An error occurred while processing the product attributes.", e);
		}
	}
	
	public ProductServiceImplementation(
		ProductRepository productRepository,
		CategoryRepository categoryRepository,
		SizeRepository sizeRepository,
		ColorRepository colorRepository, ImageRepository imageRepository) {
		this.productRepository = productRepository;
		this.categoryRepository = categoryRepository;
		this.sizeRepository = sizeRepository;
		this.colorRepository = colorRepository;
		this.imageRepository = imageRepository;
	}
	
	@Override
	public Optional<Product> addProduct(Product product) {
		imageRepository.saveAll(product.getProductImages());
		findCategorySizeAndColor(product);
		
		return Optional.of(productRepository.save(product));
	}
	
	@Override
	public Optional<Product> getProduct(Long id) {
		return Optional.ofNullable(productRepository.findById(id)
			.orElseThrow(() -> new ProductNotFoundException(id)));
	}
	
	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	
	@Override
	public Product updateProduct(Long id, Product product) {
		Product existingProduct = productRepository.findById(id)
			.orElseThrow(() -> new ProductNotFoundException(id));
		
		findCategorySizeAndColor(product);
		
		
		existingProduct.setProductName(product.getProductName());
		existingProduct.setQuantityInStock(product.getQuantityInStock());
		existingProduct.setProductDescription(product.getProductDescription());
		existingProduct.setProductImages(product.getProductImages());
		existingProduct.setPrice(product.getPrice());
		
		return productRepository.save(existingProduct);
	}
	
	@Override
	public void deleteProduct(Long id) {
		Product product = productRepository.findById(id)
			.orElseThrow(() -> new ProductNotFoundException(id));
		productRepository.delete(product);
	}
	
	@Override
	public List<Product> searchAllProductsByName(String name) {
		return productRepository.findByProductNameContainingIgnoreCase(name);
	}
}
