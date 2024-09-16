package com.maarcus.backend.controller;

import com.maarcus.backend.jwt.JwtUtils;
import com.maarcus.backend.model.User;
import com.maarcus.backend.payload.request.LoginRequest;
import com.maarcus.backend.payload.response.Response;
import com.maarcus.backend.payload.response.Token;
import com.maarcus.backend.repository.UserRepository;
import com.maarcus.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
  public ResponseEntity<?> login(@RequestBody LoginRequest loginData){
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
        role = userRepository.findByEmail(loginData.getEmail()).get().getRole();
      }

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
}
