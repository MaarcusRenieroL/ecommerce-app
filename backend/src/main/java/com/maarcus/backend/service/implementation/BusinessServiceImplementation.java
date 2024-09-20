package com.maarcus.backend.service.implementation;

import com.maarcus.backend.exception.business.BusinessNotFoundException;
import com.maarcus.backend.model.Business;
import com.maarcus.backend.model.User;
import com.maarcus.backend.repository.BusinessRepository;
import com.maarcus.backend.repository.UserRepository;
import com.maarcus.backend.service.BusinessService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class BusinessServiceImplementation implements BusinessService {

  private final BusinessRepository businessRepository;
  private final UserRepository userRepository;

  public BusinessServiceImplementation(BusinessRepository businessRepository, UserRepository userRepository) {
    this.businessRepository = businessRepository;
	  this.userRepository = userRepository;
  }

  @Override
  public Business addBusiness(Business business, UUID uuid) {
    Optional<User> optionalUser = userRepository.findById(uuid);
    
    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
      
      user.setRole("VENDOR");
      user.setHasBusinessAccount(true);

    }
    return businessRepository.save(business);
  }

  @Override
  public Optional<Business> getBusiness(UUID id) {
    return Optional.ofNullable(
        businessRepository.findById(id).orElseThrow(() -> new BusinessNotFoundException(id)));
  }

  public List<Business> getAllBusinesses() {
    return businessRepository.findAll();
  }

  @Override
  public Business updateBusiness(UUID id, Business business) {
    Optional<Business> existingBusiness = getBusiness(id);

    if (existingBusiness.isPresent()) {
      existingBusiness.get().setBusinessName(business.getBusinessName());

      return businessRepository.save(existingBusiness.get());
    }

    return null;
  }

  @Override
  public void deleteBusiness(UUID id) {
    getBusiness(id).ifPresent(businessRepository::delete);
  }
}
