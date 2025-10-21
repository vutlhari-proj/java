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
public class ModuleRequestDTO {
    private String code;
    private String moduleName;
    private String type;
    private boolean elective;
    private int credits;
    private int nqf_level;
    private List<String> prerequisiteCodes;
    private List<String> courseCodes;

    public ModuleRequestDTO(String code, String moduleName, String type, boolean elective, 
            int credits, int nqf_level, List<String> prerequisiteCodes, List<String> courseCodes) {
        this.code = code;
        this.moduleName = moduleName;
        this.type = type;
        this.elective = elective;
        this.credits = credits;
        this.nqf_level = nqf_level;
        this.prerequisiteCodes = prerequisiteCodes;
        this.courseCodes = courseCodes;
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

    public String getType() {
        return type;
    }

    public boolean isElective() {
        return elective;
    }

    public void setElective(boolean elective) {
        this.elective = elective;
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

    public List<String> getPrerequisiteCodes() {
        return prerequisiteCodes;
    }

    public void setPrerequisiteCodes(List<String> prerequisiteCodes) {
        this.prerequisiteCodes = prerequisiteCodes;
    }

    public List<String> getCourseCodes() {
        return courseCodes;
    }

    public void setCourseCodes(List<String> courseCodes) {
        this.courseCodes = courseCodes;
    }

    @Override
    public String toString() {
        return "ModuleRequestDTO{" + "code=" + code + ", moduleName=" + moduleName + ", type=" + type + ", elective=" + elective + ", credits=" + credits + ", nqf_level=" + nqf_level + ", prerequisiteCodes=" + prerequisiteCodes + ", courseCodes=" + courseCodes + '}';
    }

   
}
