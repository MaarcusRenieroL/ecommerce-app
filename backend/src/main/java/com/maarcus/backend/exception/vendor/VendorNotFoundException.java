package com.maarcus.backend.exception.vendor;

import java.util.UUID;

public class VendorNotFoundException extends RuntimeException {
  public VendorNotFoundException(UUID id) {
    super("Vendor not found with the id: " + id);
  }
}
