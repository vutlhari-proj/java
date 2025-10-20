/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.models.course;

import com.example.student_marks_app.coursemodulemapping.CourseModuleMapping;
import com.example.student_marks_app.dtos.CourseDTO;
import com.example.student_marks_app.dtos.CourseSummaryDTO;
import com.example.student_marks_app.dtos.ModuleDTO;
import com.example.student_marks_app.models.department.Department;
import com.example.student_marks_app.models.module.CourseModule;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 *
 * @author vutlh
 */

@Entity
public class Course {
    
    @Id
    private String code;
    
    
    private String courseName;
    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CourseModuleMapping> courseModules = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dept_code")
    private Department department;
    
    public Course() {
    }
   
    public Course(String code, String courseName) {
        this.code = code;
        this.courseName = courseName;
    }
    
    public String getCode() {
        return code;
    }
    
    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Set<CourseModuleMapping> getCourseModules() {
        return courseModules;
    }

    public CourseDTO toDTO(){
        List<ModuleDTO> moduleList = this.courseModules.stream()
                .map(mapping -> new ModuleDTO(mapping.getModule().getCode(), mapping.getModule().getModuleName()))
                .toList();
        
        return new CourseDTO(this.code, this.courseName, moduleList, department);
    }
    
    public CourseSummaryDTO shortHand(){
        return new CourseSummaryDTO(code, courseName);
    }
    
    public void addModule(CourseModule module){
        CourseModuleMapping mapping = new CourseModuleMapping(this, module);
        courseModules.add(mapping);
    }
    
    public void removeModule(CourseModule module){
        courseModules.removeIf(mapping -> mapping.getModule().equals(module));
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
    
    
}
