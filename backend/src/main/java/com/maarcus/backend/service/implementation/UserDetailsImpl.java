package com.maarcus.backend.service.implementation;

import java.io.Serial;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.maarcus.backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
  @Serial
  private static final long serialVersionUID = 1L;

  @Getter
  @Setter
  private UUID id;

  @Getter
  @Setter
  private String username;

  @Getter
  @Setter
  private String email;

  @JsonIgnore
  private String password;

  @Getter
  @Setter
  private String role;

  private Collection<? extends GrantedAuthority> authorities;

  public UserDetailsImpl(UUID id, String username, String email, String password,
      String role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  public static UserDetailsImpl build(User user) {
    String role = user.getRole();

    return new UserDetailsImpl(user.getId(),
        user.getUsername(),
        user.getEmail(),
        user.getPassword(),
        role); // Use the roles as a collection of Strings
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role));
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id);
  }
}