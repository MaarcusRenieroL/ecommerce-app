package com.maarcus.backend.payload;

import com.maarcus.backend.model.Business;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BusinessWithUuid {
    private Business business;
    private UUID uuid;
}
