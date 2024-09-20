package com.maarcus.backend.controller;

import com.maarcus.backend.exception.business.BusinessNotFoundException;
import com.maarcus.backend.model.Business;
import com.maarcus.backend.payload.response.StandardResponse;
import com.maarcus.backend.service.BusinessService;
import com.maarcus.backend.utils.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/businesses")
public class BusinessController {
	
	private final BusinessService businessService;
	private final ResponseUtil responseUtil;
	
	public BusinessController(BusinessService businessService, ResponseUtil responseUtil) {
		this.businessService = businessService;
		this.responseUtil = responseUtil;
	}
	
	@GetMapping("/all")
	public ResponseEntity<StandardResponse<List<Business>>> getAllBusinesses() {
		List<Business> businesses = businessService.getAllBusinesses();
		
		if (businesses.isEmpty()) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, "No businesses found");
		}
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Businesses retrieved successfully", businesses);
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<StandardResponse<Business>> getBusiness(@PathVariable UUID id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		Business business = businessService.getBusiness(id)
			.orElseThrow(() -> new BusinessNotFoundException(id));
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Business retrieved successfully", business);
	}
	
	@PostMapping("/add")
	public ResponseEntity<StandardResponse<Business>> addBusiness(@RequestBody Business business) {
		if (business.getBusinessName() == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: businessName");
		}
		
		Business createdBusiness = businessService.addBusiness(business);
		return responseUtil.buildSuccessResponse(HttpStatus.CREATED, "Business created successfully", createdBusiness);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<StandardResponse<Business>> updateBusiness(@PathVariable UUID id, @RequestBody Business business) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		if (business.getBusinessName() == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: businessName");
		}
		
		try {
			Business updatedBusiness = businessService.updateBusiness(id, business);
			return responseUtil.buildSuccessResponse(HttpStatus.OK, "Business updated successfully", updatedBusiness);
		} catch (BusinessNotFoundException e) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<StandardResponse<Void>> deleteBusiness(@PathVariable UUID id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		try {
			businessService.deleteBusiness(id);
			return responseUtil.buildSuccessResponse(HttpStatus.NO_CONTENT, "Business deleted successfully", null);
		} catch (BusinessNotFoundException e) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
}
