/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.student_marks_app.repositories;

import com.example.student_marks_app.models.department.Department;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author vutlh
 */
public interface DepartmentRepository extends JpaRepository<Department, Long>{
    Optional<Department> findByDeptNameIgnoreCase(String name);
}
