/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.models.course;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.List;

/**
 *
 * @author vutlh
 */

@Entity
public class Course {
    
    @Id
    private String code;
    
    
    private String courseName;
    
    @ElementCollection
    private List<String> modules;

    public Course() {
    }

    
    public Course(String code, String courseName, List<String> modules) {
        this.code = code;
        this.courseName = courseName;
        this.modules = modules;
    }

    public String getCode() {
        return code;
    }
    
    public String getCourseName() {
        return courseName;
    }

    public List<String> getModules() {
        return modules;
    }
}
