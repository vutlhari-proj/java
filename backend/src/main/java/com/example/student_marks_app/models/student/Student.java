/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.models.student;

import com.example.student_marks_app.dtos.StudentDTO;
import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.person.Person;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

/**
 *
 * @author vutlh
 */
@Entity
public class Student extends Person{

    @Id
    private String studNum;

    @ManyToOne
    private Course course;

    public Student() {
        super("", "", "", "", "");
    }
    
    public Student(String name, String surname, String  id, String cellphone, String email, String studNum, Course course) {
        super(name, surname, id, cellphone, email);
        this.studNum = studNum;
        this.course = course;
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
    
    
    public StudentDTO toDTO() {
        return new StudentDTO(
                this.studNum,
                this.name,
                this.surname,
                this.idNum,
                this.course != null ? this.course.getCode() : null
        );
    }
}
