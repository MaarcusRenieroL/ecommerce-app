package com.maarcus.backend.service;

import com.maarcus.backend.model.Business;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BusinessService {

  Business addBusiness(Business business);

  Optional<Business> getBusiness(UUID id);

  List<Business> getAllBusinesses();

  Business updateBusiness(UUID id, Business business);

  void deleteBusiness(UUID id);
}
