package com.maarcus.backend.model;

import jakarta.persistence.*;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, name = "product_name")
  private String productName;

  @Column(nullable = false, name = "product_description")
  private String productDescription;

  @OneToMany private List<Image> productImages;

  @Column(nullable = false, name = "price")
  private Double price;

  @Column(name = "quantity_in_stock", nullable = false)
  private int quantityInStock;
  
  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;

  @ManyToOne
  @JoinColumn(name = "size_id", nullable = true)
  private Size size;

  @ManyToOne
  @JoinColumn(name = "color_id", nullable = true)
  private Color color;
}
