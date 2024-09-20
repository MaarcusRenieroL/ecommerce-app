package com.maarcus.backend.repository;

import com.maarcus.backend.model.Business;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessRepository extends JpaRepository<Business, UUID> {
}
