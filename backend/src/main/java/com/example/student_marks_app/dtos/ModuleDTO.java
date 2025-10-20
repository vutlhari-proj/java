/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.dtos;

import java.util.List;

/**
 *
 * @author vutlh
 */
public class ModuleDTO {
    private String code;
    private String moduleName;
    private List<CourseSummaryDTO> courses;
    
    public ModuleDTO(String code, String moduleName) {
        this.code = code;
        this.moduleName = moduleName;
    }

    public ModuleDTO(String code, String moduleName, List<CourseSummaryDTO> courses) {
        this.code = code;
        this.moduleName = moduleName;
        this.courses = courses;
    }

    
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public List<CourseSummaryDTO> getCourses() {
        return courses;
    }

    public void setCourses(List<CourseSummaryDTO> courses) {
        this.courses = courses;
    }
    
}
