/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.dtos.StudentDTO;
import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.student.Student;
import com.example.student_marks_app.models.user.User;
import com.example.student_marks_app.repositories.UserRepository;
import com.example.student_marks_app.repositories.CourseRepository;
import com.example.student_marks_app.repositories.StudentRepository;
import com.example.student_marks_app.services.PersonService;
import java.util.List;
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
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final PersonService personService;
    private final UserRepository userRepository;

    public StudentRestController(StudentRepository studentRepository,
                                 CourseRepository courseRepository,
                                 PersonService personService,
                                 UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.personService = personService;
        this.userRepository = userRepository;
    }
            
    @GetMapping()
    public List<StudentDTO> getAllStudents(){
        return studentRepository.findAll().stream()
                .map(Student :: toDTO).toList();
    }

    @PostMapping
    public Student addStudent(@RequestBody Student st){
        st = personService.createStudent(st.getName(), st.getSurname(), st.getIdNum(), 
                st.getCellphone(), st.getCourse());

        if (st.getCourse() != null && st.getCourse().getCode() != null) {
            Course course = courseRepository.findById(st.getCourse().getCode())
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            st.setCourse(course);
        }

        // Create a new User for the student
        User user = new User(
            st.getStudNum(), // userId
            st.getEmail(),   // username
            st.getStudNum(), // password (default, you may want to change this)
            "STUDENT"       // role
        );
        userRepository.save(user);

        return studentRepository.save(st);
    }
}
