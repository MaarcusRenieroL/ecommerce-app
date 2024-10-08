package com.maarcus.backend.controller;

import com.maarcus.backend.jwt.JwtUtils;
import com.maarcus.backend.model.user.User;
import com.maarcus.backend.payload.request.LoginRequest;
import com.maarcus.backend.payload.response.StandardResponse;
import com.maarcus.backend.payload.response.Token;
import com.maarcus.backend.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/auth")
public class AuthController {

  @Autowired AuthenticationManager authenticationManager;
  @Autowired private JwtUtils jwtUtils;

  @Autowired private UserRepository userRepository;
  
  private void configureCookie(Cookie cookie, HttpServletResponse response) {
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    cookie.setPath("/");
    cookie.setMaxAge(24 * 60 * 60);
    response.addCookie(cookie);
  }

  @PostMapping(path = "/sign-in")
  public ResponseEntity<StandardResponse<?>> login(
      @RequestBody LoginRequest loginData, HttpServletResponse response) {
    try {
      Authentication authToken =
          new UsernamePasswordAuthenticationToken(loginData.getEmail(), loginData.getPassword());
      authToken = authenticationManager.authenticate(authToken);
      String token = jwtUtils.getToken(loginData.getEmail(), authToken.getAuthorities().toString());

      Optional<User> optionalUser = userRepository.findByEmail(loginData.getEmail());

      String role = "";
      String id = "";
      String hasVendor = "";

      if (optionalUser.isPresent()) {
        role = optionalUser.get().getRole();
        id = String.valueOf(optionalUser.get().getId());
        hasVendor = String.valueOf(optionalUser.get().isHasVendorAccount());
      }

      
      assert id != null;
      
      Cookie jwt = new Cookie("jwt", token);
      Cookie cookieRole = new Cookie("role", role);
      Cookie cookieId = new Cookie("id", id);
      Cookie hasVendorCookie = new Cookie("hasVendor", hasVendor);
      
      configureCookie(jwt, response);
      configureCookie(cookieRole, response);
      configureCookie(cookieId, response);
      configureCookie(hasVendorCookie, response);
      
      return ResponseEntity.ok()
          .body(
              new StandardResponse<>(
                  HttpStatus.OK,
                  "Login Successful",
                  Token.builder().id(id).token(token).role(role).hasVendor(hasVendor).build()));

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(
              new StandardResponse<>(
                  HttpStatus.INTERNAL_SERVER_ERROR,
                  "Login attempt failed: " + e.getMessage(),
                  null));
    }
  }

  @GetMapping(path = "/check")
  public ResponseEntity<StandardResponse<Map<String, String>>> checkAuthCookie(
      HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    Map<String, String> response = new HashMap<>();

    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if ("jwt".equals(cookie.getName())) {
          String token = cookie.getValue();
          if (jwtUtils.validateJwtToken(token)) {
            response.put("message", "User is authenticated");
          }
        }

        if ("role".equals(cookie.getName())) {
          String role = cookie.getValue();
          response.put("role", role);
        }

        if ("id".equals(cookie.getName())) {
          String id = cookie.getValue();
          response.put("id", id);
        }
        
        if ("hasVendor".equals(cookie.getName())) {
          response.put("hasVendor", cookie.getValue());
        }
      }
      if (response.containsKey("role")) {
        return ResponseEntity.ok(
            new StandardResponse<>(HttpStatus.OK, "User is authenticated", response));
      }
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(new StandardResponse<>(HttpStatus.UNAUTHORIZED, "User is not authenticated", null));
  }

  @PostMapping(path = "/logout")
  public ResponseEntity<StandardResponse<?>> logout(HttpServletResponse response) {
    Cookie jwt = new Cookie("jwt", null);
    Cookie cookieRole = new Cookie("role", null);
    Cookie cookieId = new Cookie("id", null);

    jwt.setHttpOnly(true);
    jwt.setSecure(true);
    jwt.setPath("/");
    jwt.setMaxAge(0);
    response.addCookie(jwt);

    cookieRole.setHttpOnly(true);
    cookieRole.setSecure(true);
    cookieRole.setPath("/");
    cookieRole.setMaxAge(0);
    response.addCookie(cookieRole);

    cookieId.setHttpOnly(true);
    cookieId.setSecure(true);
    cookieId.setPath("/");
    cookieId.setMaxAge(0);
    response.addCookie(cookieId);

    return ResponseEntity.ok(new StandardResponse<>(HttpStatus.OK, "Logout Successful", null));
  }
}
