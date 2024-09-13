package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.product.ProductNotFoundException;
import com.maarcus.backend.model.*;
import com.maarcus.backend.repository.*;
import com.maarcus.backend.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductServiceImplementation implements ProductService {
	
	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	private final SizeRepository sizeRepository;
	private final ColorRepository colorRepository;
	private final ImageRepository imageRepository;
	
	private void findCategorySizeAndColor(Product product) {
		try {
			// Handle Category
			Category category = product.getCategory();
			if (category != null) {
				Category existingCategory = categoryRepository.findByCategoryName(category.getCategoryName())
					.orElseGet(() -> categoryRepository.save(category));
				product.setCategory(existingCategory);
			}
			
			// Handle Sizes
			List<Size> sizes = product.getSizes();
			if (sizes != null && !sizes.isEmpty()) {
				List<Size> updatedSizes = new ArrayList<>();
				for (Size size : sizes) {
					Size existingSize = sizeRepository.findByName(size.getName())
						.orElseGet(() -> sizeRepository.save(size));
					updatedSizes.add(existingSize);
				}
				product.setSizes(updatedSizes);
			}
			
			// Handle Colors
			List<Color> colors = product.getColors();
			if (colors != null && !colors.isEmpty()) {
				List<Color> updatedColors = new ArrayList<>();
				for (Color color : colors) {
					Color existingColor = colorRepository.findByName(color.getName())
						.orElseGet(() -> colorRepository.save(color));
					updatedColors.add(existingColor);
				}
				product.setColors(updatedColors);
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
	public Optional<Product> getProduct(UUID id) {
		return Optional.ofNullable(productRepository.findById(id)
			.orElseThrow(() -> new ProductNotFoundException(id)));
	}
	
	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	
	@Override
	public Product updateProduct(UUID id, Product product) {
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
	public void deleteProduct(UUID id) {
		Product product = productRepository.findById(id)
			.orElseThrow(() -> new ProductNotFoundException(id));
		productRepository.delete(product);
	}
	
	@Override
	public List<Product> searchAllProductsByName(String name) {
		return productRepository.findByProductNameContainingIgnoreCase(name);
	}
}
