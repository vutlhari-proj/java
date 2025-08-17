/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.models.student;

import com.example.student_marks_app.models.course.Course;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

/**
 *
 * @author vutlh
 */
@Entity
public class Student {

    @Id
    private String studNum;

    private String name;
    private String surname;

    @ManyToOne
    private Course course;

    public Student() {
    }

    public Student(String name, String surname, String studNum, Course course) {
        this.name = name;
        this.surname = surname;
        this.studNum = studNum;
        this.course = course;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getStudNum() {
        return studNum;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
    
    

}
