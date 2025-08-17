/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.dtos;

import com.example.student_marks_app.models.student.Student;

/**
 *
 * @author vutlh
 */
public class StudentDTO {
    
    private String studNum;
    private String name;
    private String surname;
    private String courseCode;

    public StudentDTO(Student student) {
        this.studNum = student.getStudNum();
        this.name = student.getName();
        this.surname = student.getSurname();
        this.courseCode = student.getCourse() != null ? student.getCourse().getCode() : null;
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

    public String getCourseName() {
        return courseCode;
    }  
}
