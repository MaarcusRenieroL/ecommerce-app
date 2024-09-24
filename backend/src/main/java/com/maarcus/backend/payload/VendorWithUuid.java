package com.maarcus.backend.payload;

import com.maarcus.backend.model.user.Vendor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VendorWithUuid {
    private Vendor vendor;
    private UUID uuid;
}
