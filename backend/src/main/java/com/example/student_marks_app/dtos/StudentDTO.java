/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.dtos;

/**
 *
 * @author vutlh
 */
public class StudentDTO {
    
    private String studNum;
    private String name;
    private String surname;
    private String id;
    private String courseCode;

    public StudentDTO(String studNum, String name, String surname, String id, String courseCode) {
        this.studNum = studNum;
        this.name = name;
        this.surname = surname;
        this.id = id;
        this.courseCode = courseCode;
    }

    public String getStudNum() {
        return studNum;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getId(){
        return id;
    }
    
    public String getCourseName() {
        return courseCode;
    }  
}
