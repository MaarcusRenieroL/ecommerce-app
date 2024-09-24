package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.vendor.VendorNotFoundException;
import com.maarcus.backend.model.user.Vendor;
import com.maarcus.backend.model.user.User;
import com.maarcus.backend.repository.VendorRepository;
import com.maarcus.backend.repository.UserRepository;
import com.maarcus.backend.service.VendorService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class VendorServiceImplementation implements VendorService {

  private final VendorRepository vendorRepository;
  private final UserRepository userRepository;

  public VendorServiceImplementation(VendorRepository vendorRepository, UserRepository userRepository) {
    this.vendorRepository = vendorRepository;
	  this.userRepository = userRepository;
  }

  @Override
  public Vendor addVendor(Vendor vendor, UUID uuid) {
    Optional<User> optionalUser = userRepository.findById(uuid);
    
    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
      
      user.setRole("VENDOR");
      user.setHasVendorAccount(true);

    }
    return vendorRepository.save(vendor);
  }

  @Override
  public Optional<Vendor> getVendor(UUID id) {
    return Optional.ofNullable(
        vendorRepository.findById(id).orElseThrow(() -> new VendorNotFoundException(id)));
  }

  public List<Vendor> getAllVendores() {
    return vendorRepository.findAll();
  }

  @Override
  public Vendor updateVendor(UUID id, Vendor vendor) {
    Optional<Vendor> existingVendor = getVendor(id);

    if (existingVendor.isPresent()) {
      existingVendor.get().setName(vendor.getName());

      return vendorRepository.save(existingVendor.get());
    }

    return null;
  }

  @Override
  public void deleteVendor(UUID id) {
    getVendor(id).ifPresent(vendorRepository::delete);
  }
  
  @Override
  public List<Vendor> searchVendorsByName(String name) {
    return vendorRepository.findByName(name);
  }
}
