package com.maarcus.backend.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
	name = "users",
	uniqueConstraints = {
		@UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email")
	})
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "user_id", updatable = false, nullable = false)
	private UUID id;
	
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
	
	@OneToMany(mappedBy = "user", cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH }, fetch = FetchType.LAZY)
	private List<Address> addresses;
	
	@Column(name = "phone_number", nullable = false)
	private String phoneNumber;
	
	// Add the One-to-One relationship with Vendor
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Vendor vendorAccount;
	
	@Column(name = "hasVendor", nullable = true)
	private boolean hasVendorAccount;
	
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;
	
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;
	
	@PrePersist
	protected void onCreate() {
		createdAt = LocalDateTime.now();
		updatedAt = LocalDateTime.now();
	}
	
	@PreUpdate
	protected void onUpdate() {
		updatedAt = LocalDateTime.now();
	}
}
