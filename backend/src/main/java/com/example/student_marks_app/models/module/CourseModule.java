/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.models.module;

import com.example.student_marks_app.coursemodulemapping.CourseModuleMapping;
import com.example.student_marks_app.dtos.CourseSummaryDTO;
import com.example.student_marks_app.dtos.ModuleDTO;
import com.example.student_marks_app.dtos.ModuleSummary;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 *
 * @author vutlh
 */
@Entity
public class CourseModule {

    @Id
    private String code;

    private String moduleName;

    @Enumerated(EnumType.STRING)
    private Type type;
            
    @Enumerated(EnumType.STRING)
    private Credits credits;
    
    private boolean elective;
    
    @ManyToMany
    @JoinTable(
        name = "module_prerequisites",
        joinColumns = @JoinColumn(name = "module_code"),
        inverseJoinColumns = @JoinColumn(name = "prereq_code")
    )
    private Set<CourseModule> prerequisites = new HashSet<>();
            
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CourseModuleMapping> courseModules = new HashSet<>();

    public CourseModule() {
    }

    public CourseModule(String code, String moduleName, Type type, Credits Credits) {
        this.code = code;
        this.moduleName = moduleName;
        this.type = type;
        this.credits = Credits;
    }

    
    public CourseModule(String code, String moduleName, Credits Credits) {
        this.code = code;
        this.moduleName = moduleName;
        this.credits = Credits;
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

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Credits getCredits() {
        return credits;
    }

    public void setCredits(Credits credits) {
        this.credits = credits;
    }

    public boolean isElective() {
        return elective;
    }

    public void setElective(boolean elective) {
        this.elective = elective;
    }

    public Set<CourseModule> getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(Set<CourseModule> prerequisites) {
        this.prerequisites = prerequisites;
    }

    public Set<CourseModuleMapping> getCourseModules() {
        return courseModules;
    }

    public void setCourseModules(Set<CourseModuleMapping> courseModules) {
        this.courseModules = courseModules;
    }

    
    public ModuleSummary toDto() {
        return new ModuleSummary(this.code, this.moduleName);
    }

    public ModuleDTO toExtended() {
        List<CourseSummaryDTO> courses = this.courseModules.stream()
                .map(mapping -> mapping.getCourse().shortHand())
                .toList();
        
        Set<ModuleSummary> prereqs = this.prerequisites
                .stream()
                .map(mapping -> mapping.toDto())
                .collect(Collectors.toSet());
        return new ModuleDTO(code, moduleName, type.toString(), credits.getValue(),
                courses, prereqs);
    }
}
