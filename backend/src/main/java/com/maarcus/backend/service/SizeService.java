package com.maarcus.backend.service;

import com.maarcus.backend.model.product.Size;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SizeService {

  Size addSize(Size size);
  
  Optional<Size> getSize(UUID id);

  List<Size> getAllSizes();

  Size updateSize(UUID id, Size size);

  void deleteSize(UUID id);
  
  List<Size> getSizesByProductId(UUID productId);
  
}
