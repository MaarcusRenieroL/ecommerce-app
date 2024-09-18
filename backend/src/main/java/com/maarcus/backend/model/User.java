package com.maarcus.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table( name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
    })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Column(nullable = false, name = "username")
  private String username;

  @NotBlank
  @Column(nullable = false, name = "first_name")
  private String firstName;

  @NotBlank
  @Column(nullable = false, name = "last_name")
  private String lastName;

  @NotBlank
  @Email
  @Column(nullable = false, name = "email")
  private String email;

  @NotBlank
  @Column(nullable = false, name = "password")
  private String password;

  @Column(name = "role", nullable = false)
  private String role;

  @Column(nullable = false, name = "address_line_1")
  private String addressLine1;

  @Column(nullable = true, name = "address_line_2")
  private String addressLine2;

  @Column(nullable = true, name = "address_line_3")
  private String addressLine3;

  @Column(name = "phone_number", nullable = false)
  private String phoneNumber;
}
