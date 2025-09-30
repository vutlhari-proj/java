package com.example.student_marks_app.models.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {
  
  @Id
  private String userId;
  private String username;
  private String password;
  private String role;


  public User(String userId, String username, String password, String role) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  public String getUserId() {
    return userId;
  }
  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
  }

  public String getRole() {
    return role;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setRole(String role) {
    this.role = role;
  }
}
