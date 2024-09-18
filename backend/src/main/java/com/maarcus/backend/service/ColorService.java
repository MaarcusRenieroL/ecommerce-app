package com.maarcus.backend.service;

import com.maarcus.backend.model.Color;
import java.util.List;
import java.util.Optional;

public interface ColorService {

  Color addColor(Color size);

  Optional<Color> getColor(Long id);

  List<Color> getAllColors();

  Color updateColor(Long id, Color size);

  void deleteColor(Long id);
}
