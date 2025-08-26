/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.dtos;

/**
 *
 * @author vutlh
 */
public class ModuleDTO {
    private String code;
    private String moduleName;

    public ModuleDTO(String code, String moduleName) {
        this.code = code;
        this.moduleName = moduleName;
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
    
    
}
