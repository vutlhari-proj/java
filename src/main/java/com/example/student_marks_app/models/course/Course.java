/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.models.course;

import java.util.ArrayList;

/**
 *
 * @author vutlh
 */
public class Course {
    
    private String courseName;
    private ArrayList<String> modules;

    public Course(String courseName, String[] modules) {
        this.courseName = courseName;
        this.modules = modules;
    }
    
    public String getCourseName() {
        return courseName;
    }

    public ArrayList<String> getModules() {
        return modules;
    }
}
