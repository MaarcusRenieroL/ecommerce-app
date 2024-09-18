package com.maarcus.backend.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {
  @Id
  @UuidGenerator
  @Column(name = "product_id", updatable = false, nullable = false)
  private UUID id;
  
  @Column(nullable = false, name = "product_name")
  private String productName;
  
  @Column(nullable = false, name = "product_description")
  private String productDescription;
  
  @Column(nullable = false, name = "product_images")
  @OneToMany private List<Image> productImages;
  
  @Column(nullable = false, name = "product_price")
  private Double price;
  
  @Column(name = "quantity_in_stock", nullable = false)
  private int quantityInStock;
  
  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;
  
  @ManyToMany
  @JoinTable(name = "product_sizes",
    joinColumns = @JoinColumn(name = "product_id"),
    inverseJoinColumns = @JoinColumn(name = "size_id"))
  private List<Size> sizes;
  
  @ManyToMany
  @JoinTable(name = "product_colors",
    joinColumns = @JoinColumn(name = "product_id"),
    inverseJoinColumns = @JoinColumn(name = "color_id"))
  private List<Color> colors;
}
