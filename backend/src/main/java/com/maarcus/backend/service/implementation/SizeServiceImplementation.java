package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.size.SizeNotFoundException;
import com.maarcus.backend.model.Size;
import com.maarcus.backend.repository.SizeRepository;
import com.maarcus.backend.service.SizeService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class SizeServiceImplementation implements SizeService {

  private final SizeRepository sizeRepository;

  public SizeServiceImplementation(SizeRepository sizeRepository) {
    this.sizeRepository = sizeRepository;
  }

  @Override
  public Size addSize(Size size) {
    return sizeRepository.save(size);
  }

  public Optional<Size> getSize(UUID id) {
    return Optional.ofNullable(
        sizeRepository.findById(id).orElseThrow(() -> new SizeNotFoundException(id)));
  }

  @Override
  public List<Size> getAllSizes() {
    return sizeRepository.findAll();
  }

  @Override
  public Size updateSize(UUID id, Size size) {
    Optional<Size> existingSize = getSize(id);

    if (existingSize.isPresent()) {
      existingSize.get().setName(size.getName());
      existingSize.get().setValue(size.getValue());

      return sizeRepository.save(existingSize.get());
    }

    return null;
  }

  @Override
  public void deleteSize(UUID id) {
    getSize(id).ifPresent(sizeRepository::delete);
  }
}
