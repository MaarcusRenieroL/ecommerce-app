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
@Table(name = "users")
public class User {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @UuidGenerator
  @Column(name = "id", updatable = false, nullable = false, columnDefinition = "UUID")
  private UUID id;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false, unique = true)
  private String password;

  @Column(nullable = false)
  private String addressLine1;

  @Column(nullable = true)
  private String addressLine2;

  @Column(nullable = true)
  private String addressLine3;

  @Column(name = "phone_number")
  private String phoneNumber;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Role role;

  public enum Role {
    VENDOR,
    CUSTOMER,
    ADMIN
  }

  @Override
  public String toString() {
    return "User{"
        + "id="
        + id
        + ", firstName='"
        + firstName
        + '\''
        + ", lastName='"
        + lastName
        + '\''
        + ", email='"
        + email
        + '\''
        + ", password='"
        + password
        + '\''
        + ", addressLine1='"
        + addressLine1
        + '\''
        + ", addressLine2='"
        + addressLine2
        + '\''
        + ", addressLine3='"
        + addressLine3
        + '\''
        + ", phoneNumber='"
        + phoneNumber
        + '\''
        + ", role="
        + role
        + '}';
  }
}
