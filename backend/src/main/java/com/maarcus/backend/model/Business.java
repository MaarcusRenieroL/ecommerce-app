package com.maarcus.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "businesses")
public class Business {

  @Id
  @UuidGenerator
  @Column(name = "business_id", nullable = false)
  private String id;

  @Column(nullable = false)
  private String businessName;

  @Column(nullable = false)
  private String businessDescription;

  @Column(nullable = false)
  private String businessEmail;

  @Column(nullable = false)
  private String businessPhone;

  @Column(nullable = false)
  private String addressLine1;

  @Column(nullable = true)
  private String addressLine2;

  @Column(nullable = true)
  private String addressLine3;

  @Column(nullable = false)
  private String postalCode;

  @Column(nullable = true)
  private String websiteUrl;

  @Column(nullable = true)
  private String logoUrl;
}
