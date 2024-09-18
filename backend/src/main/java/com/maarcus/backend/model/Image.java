package com.maarcus.backend.model;

import jakarta.persistence.*;
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
@Table(name = "images")
public class Image {
  @Id
  @UuidGenerator
  @Column(name = "image_id", updatable = false, nullable = false)
  private UUID id;
  
  @Column(nullable = false, name = "image_url")
  private String url;
  
}
