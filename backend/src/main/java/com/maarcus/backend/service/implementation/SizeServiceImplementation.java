package com.maarcus.backend.service.implementation;

import com.maarcus.backend.model.Size;
import com.maarcus.backend.repository.SizeRepository;
import com.maarcus.backend.service.SizeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SizeServiceImplementation implements SizeService {

  private final SizeRepository sizeRepository;

  public SizeServiceImplementation(SizeRepository sizeRepository) {
    this.sizeRepository = sizeRepository;
  }

  @Override
  public Optional<Size> addSize(Size size) {
    Size savedSize = sizeRepository.save(size);
    return Optional.of(savedSize);
  }

  @Override
  public Optional<Size> getSize(Long id) {
    return sizeRepository.findById(id);
  }

  @Override
  public List<Size> getAllSizes() {
    return sizeRepository.findAll();
  }

  @Override
  public Size updateSize(Long id, Size size) {
    Optional<Size> existingSizeOptional = getSize(id);

    if (existingSizeOptional.isPresent()) {
      Size existingSize = existingSizeOptional.get();
      size.setName(existingSize.getName());
      size.setValue(existingSize.getValue());

      return sizeRepository.save(existingSize);
    } else {
      throw new RuntimeException("Size not found with the id: " + id);
    }
  }

  @Override
  public void deleteSize(Long id) {
    Optional<Size> size = getSize(id);

    if (size.isPresent()) {
      Size toBeDeletedSize = size.get();
      sizeRepository.delete(toBeDeletedSize);
    }
  }
}

