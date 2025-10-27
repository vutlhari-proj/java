/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.models.course;

import com.example.student_marks_app.converters.CreditsConverter;
import com.example.student_marks_app.converters.NqfConverter;
import com.example.student_marks_app.coursemodulemapping.CourseModuleMapping;
import com.example.student_marks_app.dtos.CourseDTO;
import com.example.student_marks_app.dtos.CourseSummaryDTO;
import com.example.student_marks_app.dtos.ModuleSummary;
import com.example.student_marks_app.models.department.Department;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.models.module.Credits;
import com.example.student_marks_app.models.module.Nqf_Level;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    
    @Convert(converter = CreditsConverter.class)
    private Credits credits = Credits.TWO;
    
    @Column(name = "nqf_level")
    @Convert(converter = NqfConverter.class)
    private Nqf_Level nqf_level = Nqf_Level.FIVE;
    
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

    public void setCode(String code) {
        this.code = code;
    }
    
    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Credits getCredits() {
        return credits;
    }

    public void setCredits(Credits credits) {
        this.credits = credits;
    }

    public Nqf_Level getNqf_level() {
        return nqf_level;
    }

    public void setNqf_level(Nqf_Level nqf_level) {
        this.nqf_level = nqf_level;
    }

    
    public Set<CourseModuleMapping> getCourseModules() {
        return courseModules;
    }

    public CourseDTO toDTO(){
        List<ModuleSummary> moduleList = this.courseModules.stream()
                .map(mapping -> new ModuleSummary(mapping.getModule().getCode(), mapping.getModule().getModuleName()))
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

    @Override
    public String toString() {
        return "Course{" + "code=" + code + ", courseName=" + courseName + ", credits=" + credits + ", nqf_level=" + nqf_level + ", courseModules=" + courseModules + ", department=" + department + '}';
    }
    
    
}
