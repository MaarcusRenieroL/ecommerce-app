package com.maarcus.backend.service;

import com.maarcus.backend.model.user.Vendor;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VendorService {
  
  Vendor addVendor(Vendor vendor, UUID uuid);
  
  Optional<Vendor> getVendor(UUID id);
  
  List<Vendor> getAllVendores();
  
  Vendor updateVendor(UUID id, Vendor vendor);
  
  void deleteVendor(UUID id);
  
  List<Vendor> searchVendorsByName(String name);
  
  Optional<Vendor> getVendorByUserId(UUID userId);
}
