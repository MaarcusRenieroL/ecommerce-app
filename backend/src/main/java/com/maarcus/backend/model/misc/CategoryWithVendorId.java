package com.maarcus.backend.model.misc;

import java.util.UUID;

import com.maarcus.backend.model.product.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryWithVendorId {
  private Category category;
  private String vendorId;
}
