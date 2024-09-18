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
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "size")
public class Size {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO) // Ensure UUIDs are generated correctly
  @UuidGenerator
  @Column(name = "size_id", updatable = false, nullable = false, columnDefinition = "UUID")
  private UUID id;
  
  @Column(name = "size_name", nullable = false)
  private String name;
  
  @Column(name = "size_value")
  private String value;
}
