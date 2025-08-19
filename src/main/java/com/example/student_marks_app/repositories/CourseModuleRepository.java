/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.repositories;

import com.example.student_marks_app.models.module.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author vutlh
 */
public interface CourseModuleRepository extends JpaRepository<CourseModule, String>{
    
}
