package com.maarcus.backend.repository;

import com.maarcus.backend.model.product.Category;
import com.maarcus.backend.model.product.Product;
import com.maarcus.backend.model.user.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
	List<Product> findByNameContainingIgnoreCase(String name);
	
	List<Product> findByCategory(Category category);
	
	List<Product> findByVendor(Vendor vendor);
	
	List<Product> findByPriceIsBetween(double lower, double upper);
}
