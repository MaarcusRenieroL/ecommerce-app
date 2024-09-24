package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.color.ColorNotFoundException;
import com.maarcus.backend.model.product.Color;
import com.maarcus.backend.model.product.Product;
import com.maarcus.backend.model.product.ProductVariant;
import com.maarcus.backend.repository.ColorRepository;
import com.maarcus.backend.repository.ProductRepository;
import com.maarcus.backend.service.ColorService;

import java.util.*;

import org.springframework.stereotype.Service;

@Service
public class ColorServiceImplementation implements ColorService {
	
	private final ColorRepository colorRepository;
	private final ProductRepository productRepository;
	
	public ColorServiceImplementation(ColorRepository colorRepository, ProductRepository productRepository) {
		this.colorRepository = colorRepository;
		this.productRepository = productRepository;
	}
	
	@Override
	public Color addColor(Color color) {
		return colorRepository.save(color);
	}
	
	@Override
	public Optional<Color> getColor(UUID id) {
		return Optional.ofNullable(colorRepository.findById(id)
			.orElseThrow(() -> new ColorNotFoundException(id)));
	}
	
	@Override
	public List<Color> getAllColors() {
		return colorRepository.findAll();
	}
	
	@Override
	public Color updateColor(UUID id, Color color) {
		Optional<Color> existingColor = getColor(id);
		
		if (existingColor.isPresent()) {
			existingColor.get().setColorName(color.getColorName());
			
			return colorRepository.save(existingColor.get());
		}
		
		return null;
	}
	
	@Override
	public void deleteColor(UUID id) {
		getColor(id).ifPresent(colorRepository::delete);
	}
	
	@Override
	public List<Color> getColorsByProductId(UUID productId) {
		Optional<Product> product = productRepository.findById(productId);
		
		if (product.isPresent()) {
			List<ProductVariant> variants = product.get().getVariants();
			
			if (!variants.isEmpty()) {
				Set<Color> colors = new HashSet<>();
				
				for (ProductVariant variant : variants) {
					if (variant.getColor() != null) {
						colors.add(variant.getColor());
					}
				}
				
				return new ArrayList<>(colors);
			}
		}
		
		return Collections.emptyList();
	}
}
