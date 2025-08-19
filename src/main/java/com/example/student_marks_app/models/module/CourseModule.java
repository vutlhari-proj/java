/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.models.module;

import com.example.student_marks_app.models.course.Course;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import java.util.List;

/**
 *
 * @author vutlh
 */
@Entity
public class CourseModule {
    
    @Id
    private String code;
    
    private String moduleName;

    @ManyToMany(mappedBy = "modules")
    @JsonBackReference
    private List<Course> courses;
    
    public CourseModule() {
    }

    public CourseModule(String code, String moduleName) {
        this.code = code;
        this.moduleName = moduleName;
    }

    public String getCode() {
        return code;
    }

    public String getModuleName() {
        return moduleName;
    }
    
    
}
