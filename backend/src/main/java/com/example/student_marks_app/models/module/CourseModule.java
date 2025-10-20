/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.models.module;

import com.example.student_marks_app.coursemodulemapping.CourseModuleMapping;
import com.example.student_marks_app.dtos.CourseDTO;
import com.example.student_marks_app.dtos.CourseSummaryDTO;
import com.example.student_marks_app.dtos.ModuleDTO;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 *
 * @author vutlh
 */
@Entity
public class CourseModule {

    @Id
    private String code;

    private String moduleName;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CourseModuleMapping> courseModules = new HashSet<>();

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

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public ModuleDTO toDto() {
        return new ModuleDTO(this.code, this.moduleName);
    }

    public ModuleDTO toExtended() {
        List<CourseSummaryDTO> courses = this.courseModules.stream()
                .map(mapping -> mapping.getCourse().shortHand())
                .toList();
        
        return new ModuleDTO(code, moduleName, courses);
    }
}
