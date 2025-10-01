package com.example.student_marks_app.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.student_marks_app.models.user.User;
import com.example.student_marks_app.records.LoginRequest;
import com.example.student_marks_app.records.LoginResponse;
import com.example.student_marks_app.records.RegisterRequest;
import com.example.student_marks_app.repositories.UserRepository;

@Service
public class AuthService {
  
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public String register(RegisterRequest request) {
    // Check if the username already exists
    if (userRepository.findByUsername(request.username()).isPresent()) {
      throw new IllegalArgumentException("Username already exists");
    }

    String encodedPassword = passwordEncoder.encode(request.password());
    User user = new User(
        request.userId(),
        request.username(),
        encodedPassword,
        request.role()
    );
    userRepository.save(user);
    return "User registered successfully";
  }

  public LoginResponse login(LoginRequest request) {
    // Find the user by username
    User user = userRepository.findByUsername(request.username())
        .orElseThrow(() -> new RuntimeException("Invalid username or password"));

    // Check if the password matches
    if (!passwordEncoder.matches(request.password(), user.getPassword())) {
      throw new IllegalArgumentException("Invalid username or password");
    }

    // Return a successful login response (you might want to include a JWT token here)
    return new LoginResponse("Login successful", user.getUsername(), user.getRole().name());
  }
}
