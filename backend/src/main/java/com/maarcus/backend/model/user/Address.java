package com.maarcus.backend.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "address")
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "address_id", nullable = false)
	private UUID addressId;
	
	@Column(name = "address_line_1", nullable = false)
	@NotBlank
	private String addressLine1;
	
	@Column(name = "address_line_2", nullable = false)
	@NotBlank
	private String addressLine2;
	
	@Column(name = "address_line_3", nullable = false)
	@NotBlank
	private String addressLine3;
	
	@Column(name = "city", nullable = false)
	@NotBlank
	private String city;
	
	@Column(name = "state", nullable = false)
	@NotBlank
	private String state;
	
	@Column(name = "country", nullable = false)
	@NotBlank
	private String country;
	
	@Column(name = "postal_code", nullable = false)
	@NotBlank
	private String postalCode;
	
	@Column(name = "is_default", nullable = false)
	private Boolean isDefault;
	
	@Column(name = "address_type", nullable = false)
	private String addressType;
	
	@Column(name = "landmark", nullable = true)
	private String landmark;
	
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;
	
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "vendor_id", nullable = false)
	private Vendor vendor;
	
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
