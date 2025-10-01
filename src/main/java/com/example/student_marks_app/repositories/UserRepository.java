package com.example.student_marks_app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.student_marks_app.models.user.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
  
  Optional<User> findByUsername(String username);
}
