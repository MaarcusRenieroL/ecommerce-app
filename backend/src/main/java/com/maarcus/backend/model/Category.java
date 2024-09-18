package com.maarcus.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category")
public class Category {
  
  @Id
  @UuidGenerator
  @Column(name = "category_id", updatable = false, nullable = false)
  private UUID id;

  @Column(name = "category_name")
  private String categoryName;
}
