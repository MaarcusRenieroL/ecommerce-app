package com.maarcus.backend.service;

import com.maarcus.backend.model.Size;

import java.util.List;
import java.util.Optional;

public interface SizeService {

  Optional<Size> addSize(Size size);

  Optional<Size> getSize(Long id);

  List<Size> getAllSizes();

  Size updateSize(Long id, Size size);

  void deleteSize(Long id);
}
