/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.dtos;

import com.example.student_marks_app.models.department.Department;
import java.util.List;

/**
 *
 * @author vutlh
 */
public class CourseDTO {
    
    private String code;
    private String courseName;
    private List<ModuleDTO> modules;
    private Department department;

    public CourseDTO(String code, String courseName, List<ModuleDTO> modules, Department department) {
        this.code = code;
        this.courseName = courseName;
        this.modules = modules;
        this.department = department;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public List<ModuleDTO> getModules() {
        return modules;
    }

    public void setModules(List<ModuleDTO> modules) {
        this.modules = modules;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
    
}
