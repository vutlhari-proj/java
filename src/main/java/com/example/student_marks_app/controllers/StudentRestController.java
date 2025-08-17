/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.dtos.StudentDTO;
import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.student.Student;
import com.example.student_marks_app.repositories.CourseRepository;
import com.example.student_marks_app.repositories.StudentRepository;
import java.util.List;
import javax.management.RuntimeErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author vutlh
 */

@RestController
@RequestMapping("/api/students")
public class StudentRestController {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private CourseRepository CourseRepository;
    
    @GetMapping()
    public List<StudentDTO> getAllStudents(){
        return studentRepository.findAll().stream()
                .map(StudentDTO::new).toList();
    }
    
    @PostMapping
    public Student addStudent(@RequestBody Student student){
        
        if (student.getCourse() != null && student.getCourse().getId() != null) {
            Course course = CourseRepository.findById(student.getCourse().getId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            
            student.setCourse(course);
        }
        
        return studentRepository.save(student);
    }
}
