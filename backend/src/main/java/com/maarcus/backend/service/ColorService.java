package com.maarcus.backend.service;

import com.maarcus.backend.model.Color;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ColorService {

  Color addColor(Color size);

  Optional<Color> getColor(UUID id);

  List<Color> getAllColors();

  Color updateColor(UUID id, Color size);

  void deleteColor(UUID id);
}
