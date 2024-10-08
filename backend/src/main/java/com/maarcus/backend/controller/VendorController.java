package com.maarcus.backend.controller;

import com.maarcus.backend.exception.vendor.VendorNotFoundException;
import com.maarcus.backend.model.misc.VendorWithUuid;
import com.maarcus.backend.model.user.User;
import com.maarcus.backend.model.user.Vendor;
import com.maarcus.backend.payload.response.StandardResponse;
import com.maarcus.backend.service.VendorService;
import com.maarcus.backend.utils.ResponseUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/vendor")
public class VendorController {
	
	private final VendorService vendorService;
	private final ResponseUtil responseUtil;
	
	public VendorController(VendorService vendorService, ResponseUtil responseUtil) {
		this.vendorService = vendorService;
		this.responseUtil = responseUtil;
	}
	
	@GetMapping("/all")
	public ResponseEntity<StandardResponse<List<Vendor>>> getAllVendors() {
		List<Vendor> vendors = vendorService.getAllVendores();
		
		if (vendors.isEmpty()) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, "No vendors found");
		}
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Vendors retrieved successfully", vendors);
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<StandardResponse<Vendor>> getVendor(@PathVariable UUID id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		Vendor vendor = vendorService.getVendor(id)
			.orElseThrow(() -> new VendorNotFoundException(id));
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Vendor retrieved successfully", vendor);
	}
	
	@GetMapping("/users/get/{id}")
	public ResponseEntity<StandardResponse<String>> getVendorFromUserId(@PathVariable String id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		Vendor vendor = vendorService.getVendorByUserId(UUID.fromString(id))
			.orElseThrow(() -> new VendorNotFoundException(UUID.fromString(id)));
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Vendor retrieved successfully", String.valueOf(vendor.getId()));
	}
	
	@PostMapping("/add")
	public ResponseEntity<StandardResponse<VendorWithUuid>> addVendor(
		@RequestBody VendorWithUuid vendorWithUuid, HttpServletResponse response) {
		
		UUID uuid = vendorWithUuid.getUuid();
		Vendor vendor = vendorWithUuid.getVendor();
		
		if (uuid == null) {
			return responseUtil.buildErrorResponse(HttpStatus.UNAUTHORIZED, "Missing required field: id");
		}
		
		if (vendor.getName() == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: vendorName");
		}
		
		Vendor createdVendor = vendorService.addVendor(vendor, uuid);
		
		Cookie hasVendorCookie = new Cookie("hasVendor", "true");
		hasVendorCookie.setHttpOnly(true);
		hasVendorCookie.setSecure(true);
		hasVendorCookie.setPath("/");
		hasVendorCookie.setMaxAge(24 * 60 * 60);
		response.addCookie(hasVendorCookie);
		
		Cookie roleCookie = new Cookie("role", "VENDOR");
		roleCookie.setHttpOnly(true);
		roleCookie.setSecure(true);
		roleCookie.setPath("/");
		roleCookie.setMaxAge(24 * 60 * 60);
		response.addCookie(roleCookie);
		
		return responseUtil.buildSuccessResponse(HttpStatus.CREATED, "Vendor created successfully", new VendorWithUuid(createdVendor, uuid));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<StandardResponse<Vendor>> updateVendor(@PathVariable UUID id, @RequestBody Vendor vendor) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		if (vendor.getName() == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: vendorName");
		}
		
		try {
			Vendor updatedVendor = vendorService.updateVendor(id, vendor);
			return responseUtil.buildSuccessResponse(HttpStatus.OK, "Vendor updated successfully", updatedVendor);
		} catch (VendorNotFoundException e) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<StandardResponse<Void>> deleteVendor(@PathVariable UUID id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		try {
			vendorService.deleteVendor(id);
			return responseUtil.buildSuccessResponse(HttpStatus.NO_CONTENT, "Vendor deleted successfully", null);
		} catch (VendorNotFoundException e) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
}
