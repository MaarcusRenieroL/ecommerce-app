package com.maarcus.backend.exception.business;

import java.util.UUID;

public class BusinessNotFoundException extends RuntimeException {
  public BusinessNotFoundException(UUID id) {
    super("Business not found with the id: " + id);
  }
}
