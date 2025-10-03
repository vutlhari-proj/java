package com.example.student_marks_app.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRestController {
  
  @GetMapping("/api/user/role")
  public List<String> getCurrentUserRole(Authentication auth) {
    // Assuming 'auth' contains the authenticated user's details
    // Extract roles from the authentication object
    return auth.getAuthorities().stream()
               .map(GrantedAuthority::getAuthority)
               .collect(Collectors.toList());
  }
}
