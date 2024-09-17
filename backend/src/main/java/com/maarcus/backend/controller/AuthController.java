package com.maarcus.backend.controller;

import com.maarcus.backend.jwt.JwtUtils;
import com.maarcus.backend.model.User;
import com.maarcus.backend.payload.request.LoginRequest;
import com.maarcus.backend.payload.response.Response;
import com.maarcus.backend.payload.response.Token;
import com.maarcus.backend.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  AuthenticationManager authenticationManager;
  @Autowired
  private JwtUtils jwtUtils;

  @Autowired private UserRepository userRepository;


  @PostMapping("/sign-in")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginData, HttpServletResponse response){
    try{
      Authentication authToken = new UsernamePasswordAuthenticationToken(
          loginData.getEmail(),
          loginData.getPassword()
      );
      authToken = authenticationManager.authenticate(authToken);
      String token = jwtUtils.getToken(loginData.getEmail(),authToken.getAuthorities().toString());

      Optional<User> optionalUser = userRepository.findByEmail(loginData.getEmail());

      String role = "";

      if (optionalUser.isPresent()) {
        role = optionalUser.get().getRole();
      }
      
      Cookie cookie = new Cookie("jwt", token);
      cookie.setHttpOnly(true);
      cookie.setSecure(true);
      cookie.setPath("/");
      cookie.setMaxAge(24 * 60 * 60);
      response.addCookie(cookie);

      return ResponseEntity.status(HttpStatus.OK)
          .body(Response.builder()
              .statusCode(HttpStatus.OK)
              .message("Login successful")
              .data(
                  Token.builder()
                      .token(token)
                      .role(role)
                      .build()
              )
              .build());
    }
    catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Response.builder()
              .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
              .message("Login attempt failed: "+e.getMessage())
              .data(null)
              .build());
    }
  }
  
  @GetMapping("/check")
  public ResponseEntity<String> checkAuthCookie(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if ("jwt".equals(cookie.getName())) {
          
          String token = cookie.getValue();
          boolean isValid = jwtUtils.validateJwtToken(token);
          if (isValid) {
            return ResponseEntity.ok("User is authenticated");
          } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
          }
        }
      }
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication cookie not found");
  }
  
  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpServletResponse response) {
    Cookie cookie = new Cookie("jwt", null);
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    cookie.setPath("/");
    cookie.setMaxAge(0);
    response.addCookie(cookie);
    
    return ResponseEntity.ok("Logged out successfully");
  }
}
