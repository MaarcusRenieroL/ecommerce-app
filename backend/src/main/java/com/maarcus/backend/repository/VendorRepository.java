package com.maarcus.backend.repository;

import com.maarcus.backend.model.user.Vendor;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, UUID> {
	List<Vendor> findByName(String name);
}
