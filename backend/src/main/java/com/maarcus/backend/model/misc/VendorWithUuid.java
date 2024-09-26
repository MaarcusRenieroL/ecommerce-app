package com.maarcus.backend.model.misc;

import com.maarcus.backend.model.user.Vendor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.StringJoiner;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VendorWithUuid {
    private Vendor vendor;
    private UUID uuid;
    
    @Override
    public String toString() {
        return new StringJoiner(", ", VendorWithUuid.class.getSimpleName() + "[", "]")
          .add("vendor=" + vendor.toString())
          .add("uuid=" + uuid)
          .toString();
    }
}
