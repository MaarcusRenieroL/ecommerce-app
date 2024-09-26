package com.maarcus.backend.model.product;

import com.maarcus.backend.model.user.Vendor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.StringJoiner;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "categories")
public class Category {
  
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false, nullable = false)
  private UUID id;
  
  @Column(name = "name", nullable = false)
  private String name;
  
  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Product> products;
  
  @ManyToOne
  @JoinColumn(name = "vendor_id", nullable = false)
  private Vendor vendor;
  
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

  @Override
  public String toString() {
    return new StringJoiner(", ", Vendor.class.getSimpleName() + "[", "]")
      .add("id=" + id)
      .add("name='" + name + "'")
    
      .toString();
  }
}
