/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.repositories;

import com.example.student_marks_app.coursemodulemapping.CourseModuleId;
import com.example.student_marks_app.coursemodulemapping.CourseModuleMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author vutlh
 */
public interface CourseModuleMappingRepository extends JpaRepository<CourseModuleMapping, CourseModuleId>{
    
    List<CourseModuleMapping> findByCourse_Code(String courseCode);
    
    List<CourseModuleMapping> findByModule_Code(String moduleCode);
    
    void deleteByCourse_CodeAndModule_code(String courseCode, String moduleCode);
}
