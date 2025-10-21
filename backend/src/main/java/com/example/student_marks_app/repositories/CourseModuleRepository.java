/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.repositories;

import com.example.student_marks_app.models.module.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author vutlh
 */
public interface CourseModuleRepository extends JpaRepository<CourseModule, String>{
    
    @Modifying
    @Transactional
    @Query(
            value = "DELETE FROM module_prerequisites WHERE prereq_code = :code",
            nativeQuery = true
    )
    void removeAsPrerequisite(@Param("code") String code); 
}
