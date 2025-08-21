/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.models.course;

import com.example.student_marks_app.models.module.CourseModule;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
    
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "course_module_mapping",
        joinColumns = @JoinColumn(name = "course_code"),
        inverseJoinColumns = @JoinColumn(name = "module_code")
    )
    private List<CourseModule> modules;

    public Course() {
    }

    
    public Course(String code, String courseName, List<CourseModule> modules) {
        this.code = code;
        this.courseName = courseName;
        this.modules = modules;
    }

    public Course(String code, String courseName) {
        this.code = code;
        this.courseName = courseName;
        this.modules = null;
    }
    
    public String getCode() {
        return code;
    }
    
    public String getCourseName() {
        return courseName;
    }

    public List<CourseModule> getModules() {
        return modules;
    }

    public void setModules(List<CourseModule> modules) {
        this.modules = modules;
    }
}
