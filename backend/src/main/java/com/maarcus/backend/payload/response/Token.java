package com.maarcus.backend.payload.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Token {
  private String token;
  private String role;
  private String id;
  private String hasBusiness;
}

