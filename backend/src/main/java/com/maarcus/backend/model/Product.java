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

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "category_id", nullable = false, referencedColumnName = "category_id")
  private Category category;
}
