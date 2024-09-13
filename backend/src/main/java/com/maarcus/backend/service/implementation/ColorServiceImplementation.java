package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.color.ColorNotFoundException;
import com.maarcus.backend.model.Color;
import com.maarcus.backend.repository.ColorRepository;
import com.maarcus.backend.service.ColorService;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class ColorServiceImplementation implements ColorService {
	
	private final ColorRepository colorRepository;
	
	public ColorServiceImplementation(ColorRepository colorRepository) {
		this.colorRepository = colorRepository;
	}
	
	@Override
	public Optional<Color> addColor(Color color) {
		return Optional.of(colorRepository.save(color));
	}
	
	@Override
	public Optional<Color> getColor(Long id) {
		return Optional.ofNullable(colorRepository.findById(id)
			.orElseThrow(() -> new ColorNotFoundException(id)));
	}
	
	@Override
	public List<Color> getAllColors() {
		return colorRepository.findAll();
	}
	
	@Override
	public Color updateColor(Long id, Color color) {
		Optional<Color> existingColor = getColor(id);
		
		if (existingColor.isPresent()) {
			existingColor.get().setName(color.getName());
			existingColor.get().setValue(color.getValue());
			
			return colorRepository.save(existingColor.get());
		}
		
		return null;
	}
	
	@Override
	public void deleteColor(Long id) {
		getColor(id).ifPresent(colorRepository::delete);
	}
}
