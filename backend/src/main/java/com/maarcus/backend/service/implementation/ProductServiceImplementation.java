package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.product.ProductNotFoundException;
import com.maarcus.backend.model.product.*;
import com.maarcus.backend.model.user.Vendor;
import com.maarcus.backend.repository.*;
import com.maarcus.backend.service.ProductService;
import org.springframework.stereotype.Service;

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
	private final ProductVariantRepository productVariantRepository;
	private final VendorRepository vendorRepository;
	
	private void findCategoryAndSaveVariants(Product product) {
		try {
			
			Category category = product.getCategory();
			if (category != null) {
				Category existingCategory = categoryRepository.findByName(category.getName())
					.orElseGet(() -> categoryRepository.save(category));
				product.setCategory(existingCategory);
			}
			
			List<ProductVariant> variants = product.getVariants();
			if (variants != null && !variants.isEmpty()) {
				for (ProductVariant variant : variants) {
					
					Size size = variant.getSize();
					Size existingSize = sizeRepository.findByValue(size.getValue())
						.orElseGet(() -> sizeRepository.save(size));
					variant.setSize(existingSize);
					
					Color color = variant.getColor();
					Color existingColor = colorRepository.findByColorName(color.getColorName())
						.orElseGet(() -> colorRepository.save(color));
					variant.setColor(existingColor);
					
					variant.setProduct(product);
					
					productVariantRepository.save(variant);
				}
			}
			
		} catch (Exception e) {
			System.err.println("Error occurred while processing category or variants: " + e.getMessage());
			throw new RuntimeException("An error occurred while processing the product attributes.", e);
		}
	}
	
	
	public ProductServiceImplementation(
		ProductRepository productRepository,
		CategoryRepository categoryRepository,
		SizeRepository sizeRepository,
		ColorRepository colorRepository,
		ImageRepository imageRepository,
		ProductVariantRepository productVariantRepository, VendorRepository vendorRepository) {
		this.productRepository = productRepository;
		this.categoryRepository = categoryRepository;
		this.sizeRepository = sizeRepository;
		this.colorRepository = colorRepository;
		this.imageRepository = imageRepository;
		this.productVariantRepository = productVariantRepository;
		this.vendorRepository = vendorRepository;
	}
	
	@Override
	public Product addProduct(Product product) {
		imageRepository.saveAll(product.getProductImages());
		findCategoryAndSaveVariants(product);
		
		return productRepository.save(product);
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
		
		findCategoryAndSaveVariants(product);
		
		existingProduct.setName(product.getName());
		existingProduct.setDescription(product.getDescription());
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
		return productRepository.findByNameContainingIgnoreCase(name);
	}
	
	@Override
	public List<Product> getProductsByCategory(UUID categoryId) {
		
		Optional<Category> category = categoryRepository.findById(categoryId);
		
		return category.map(productRepository::findByCategory).orElse(null);
	}
	
	@Override
	public List<Product> getProductsByVendor(UUID vendorId) {
		
		Optional<Vendor> vendor = vendorRepository.findById(vendorId);
		
		return vendor.map(productRepository::findByVendor).orElse(null);
	}
	
	@Override
	public List<Product> searchProductsByPriceRange(double minPrice, double maxPrice) {
		return productRepository.findByPriceIsBetween(minPrice, maxPrice);
	}
}
