package com.maarcus.backend.service.implementation;

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
    Color savedColor = colorRepository.save(color);
    return Optional.of(savedColor);
  }

  @Override
  public Optional<Color> getColor(Long id) {
    return colorRepository.findById(id);
  }

  @Override
  public List<Color> getAllColors() {
    return colorRepository.findAll();
  }

  @Override
  public Color updateColor(Long id, Color color) {
    Optional<Color> existingColorOptional = getColor(id);

    if (existingColorOptional.isPresent()) {
      Color existingColor = existingColorOptional.get();
      color.setName(existingColor.getName());
      color.setValue(existingColor.getValue());

      return colorRepository.save(existingColor);
    } else {
      throw new RuntimeException("Color not found with the id: " + id);
    }
  }

  @Override
  public void deleteColor(Long id) {
    Optional<Color> color = getColor(id);

    if (color.isPresent()) {
      Color toBeDeletedColor = color.get();
      colorRepository.delete(toBeDeletedColor);
    }
  }
}
