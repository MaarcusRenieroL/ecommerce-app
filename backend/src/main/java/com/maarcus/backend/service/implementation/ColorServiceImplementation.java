package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.color.ColorNotFoundException;
import com.maarcus.backend.model.Color;
import com.maarcus.backend.repository.ColorRepository;
import com.maarcus.backend.service.ColorService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;

@Service
public class ColorServiceImplementation implements ColorService {
	
	private final ColorRepository colorRepository;
	
	public ColorServiceImplementation(ColorRepository colorRepository) {
		this.colorRepository = colorRepository;
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
			existingColor.get().setName(color.getName());
			existingColor.get().setValue(color.getValue());
			
			return colorRepository.save(existingColor.get());
		}
		
		return null;
	}
	
	@Override
	public void deleteColor(UUID id) {
		getColor(id).ifPresent(colorRepository::delete);
	}
}
