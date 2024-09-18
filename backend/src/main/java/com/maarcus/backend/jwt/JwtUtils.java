package com.maarcus.backend.jwt;

import java.security.Key;
import java.util.Date;

import com.maarcus.backend.service.implementation.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Component
public class JwtUtils {
  @Value("${spring.app.jwtSecret}")
  private String jwtSecret;

  @Value("${spring.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public String getToken(String email, String authorities){
    return Jwts.builder()
        .subject(email)
        .claim("authorities",authorities)
        .issuer("Spring Security App")
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis()+(1000*60*10)))
        .signWith(key())
        .compact();
  }

  public String generateJwtToken(Authentication authentication) {

    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

    return Jwts.builder()
        .subject((userPrincipal.getUsername()))
        .issuedAt(new Date())
        .expiration(new Date((new Date()).getTime() + jwtExpirationMs)).signWith(key()).compact();
  }
  
  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parser().build().parseSignedClaims(token).getPayload().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(authToken);
      return true;
    } catch (MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException e) {
      return false;
    }
  }
}