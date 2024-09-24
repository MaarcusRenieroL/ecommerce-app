package com.maarcus.backend.model.user;

import com.maarcus.backend.model.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vendors")
public class Vendor {
  
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "vendor_id", nullable = false)
  private UUID id;
  
  @Column(name = "name", nullable = false)
  private String name;
  
  @Column(name = "description", nullable = false)
  private String description;
  
  @Column(name = "email", nullable = false)
  private String email;
  
  @Column(name = "phone", nullable = false)
  private String phone;
  
  @OneToMany(mappedBy = "vendor", cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH }, fetch = FetchType.LAZY)
  private List<Address> addresses;
  
  @Column(nullable = true)
  private String websiteUrl;
  
  @Column(nullable = true)
  private String logoUrl;
  
  @Column(name = "rating", nullable = true)
  private Double rating;
  
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;
  
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;
  
  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
  }
  
  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }
  
  @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Product> products;
}
