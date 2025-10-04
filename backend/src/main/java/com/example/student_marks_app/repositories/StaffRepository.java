package com.example.student_marks_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.student_marks_app.models.staff.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, String> {
  
}
