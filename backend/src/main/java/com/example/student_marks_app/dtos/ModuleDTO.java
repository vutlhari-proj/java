/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.dtos;

import java.util.List;
import java.util.Set;

/**
 *
 * @author vutlh
 */
public class ModuleDTO {
    private String code;
    private String moduleName;
    private String type;
    private int credits;
    private int nqf_level;
    private boolean elective;
    private Set<ModuleSummary> prerequisites;
    private List<CourseSummaryDTO> courses;

    public ModuleDTO(String code, String moduleName, String type, int credits, int nqf_level,
            boolean elective, List<CourseSummaryDTO> courses, Set<ModuleSummary> prerequisites) {
        this.code = code;
        this.moduleName = moduleName;
        this.type = type;
        this.credits = credits;
        this.nqf_level = nqf_level;
        this.elective = elective;
        this.courses = courses;
        this.prerequisites = prerequisites;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public int getNqf_level() {
        return nqf_level;
    }

    public void setNqf_level(int nqf_level) {
        this.nqf_level = nqf_level;
    }

    public boolean isElective() {
        return elective;
    }

    public void setElective(boolean elective) {
        this.elective = elective;
    }
    
    

    public Set<ModuleSummary> getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(Set<ModuleSummary> prerequisites) {
        this.prerequisites = prerequisites;
    }
    
    
    
}
