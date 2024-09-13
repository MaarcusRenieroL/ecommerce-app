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
  @Column(name = "id", updatable = false, nullable = false, columnDefinition = "UUID")
  private UUID id;
  
  @Column(name = "name", nullable = false)
  private String name;
  
  @Column(name = "value")
  private String value;
}
