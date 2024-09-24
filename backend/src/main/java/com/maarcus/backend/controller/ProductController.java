package com.maarcus.backend.controller;

import com.maarcus.backend.model.product.Product;
import com.maarcus.backend.service.ProductService;
import com.maarcus.backend.payload.response.StandardResponse;
import com.maarcus.backend.exception.product.ProductNotFoundException;
import com.maarcus.backend.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/products")
public class ProductController {
	
	private final ProductService productService;
	private final ResponseUtil responseUtil;
	
	
	@Autowired
	public ProductController(ProductService productService, ResponseUtil responseUtil) {
		this.productService = productService;
		this.responseUtil = responseUtil;
	}
	
	@PostMapping(path = "/add")
	public ResponseEntity<StandardResponse<Product>> addProduct(@RequestBody Product product) {
		Product createdProduct = productService.addProduct(product);
		
		return responseUtil.buildSuccessResponse(HttpStatus.CREATED, "Product created successfully", createdProduct);
	}
	
	@GetMapping(path = "/get/{id}")
	public ResponseEntity<StandardResponse<Product>> getProduct(@PathVariable UUID id) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		Product product = productService.getProduct(id).orElseThrow(() -> new ProductNotFoundException(id));
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Product retrieved successfully", product);
	}
	
	@GetMapping(path = "/all")
	public ResponseEntity<StandardResponse<List<Product>>> getAllProducts() {
		List<Product> products = productService.getAllProducts();
		
		if (products.isEmpty()) {
			return responseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, "No products found");
		}
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Products retrieved successfully", products);
	}
	
	@PutMapping(path = "/update/{id}")
	public ResponseEntity<StandardResponse<Product>> updateProduct(@PathVariable UUID id, @RequestBody Product product) {
		if (id == null) {
			return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing required field: id");
		}
		
		Product updatedProduct = productService.updateProduct(id, product);
		
		return responseUtil.buildSuccessResponse(HttpStatus.OK, "Product updated successfully", updatedProduct);
	}
	
	@DeleteMapping(path = "/delete/{id}")
	public ResponseEntity<StandardResponse<Void>> deleteProduct(@PathVariable UUID id) {
		try {
			productService.deleteProduct(id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new StandardResponse<>(HttpStatus.NO_CONTENT, "Product deleted successfully", null));
		} catch (ProductNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse<>(HttpStatus.NOT_FOUND, e.getMessage(), null));
		}
	}
	
	@GetMapping(path = "/search")
	public ResponseEntity<StandardResponse<List<Product>>> searchProductsByName(@RequestParam String name) {
		return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Products retrieved successfully", productService.searchAllProductsByName(name)));
	}
	
}
