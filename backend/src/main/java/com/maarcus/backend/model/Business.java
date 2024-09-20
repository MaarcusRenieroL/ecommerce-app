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

  @Column(nullable = false, name = "business_name")
  private String businessName;

  @Column(nullable = false, name = "business_description")
  private String businessDescription;

  @Column(nullable = false, name = "business_email")
  private String businessEmail;

  @Column(nullable = false, name = "business_phone_number")
  private String businessPhone;

  @Column(nullable = false, name = "business_address_line_1")
  private String addressline1;

  @Column(nullable = true, name = "business_address_line_2")
  private String addressline2;

  @Column(nullable = true, name = "business_address_line_3")
  private String addressline3;

  @Column(nullable = false, name = "business_postal_code")
  private String postalCode;

  @Column(nullable = true, name = "business_website_url")
  private String websiteUrl;

  @Column(nullable = true, name = "business_logo_url")
  private String logoUrl;
}
