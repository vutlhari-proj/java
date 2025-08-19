/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.repositories.CourseRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author vutlh
 */

@RestController
@RequestMapping("/api/courses")
public class CourseRestController {
    
    private final CourseRepository courseRepository;

    public CourseRestController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
    
    @GetMapping
    public List<Course> getAllCourse(){
        return courseRepository.findAll();
    }
    
    @GetMapping("/{code}")
    public Course getCourse(@PathVariable String code){
        return courseRepository.findById(code)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }
    
    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        if (course.getCode() == null || course.getCode().trim().isEmpty()) {
            throw new RuntimeException("Course code is required");
        }
        return courseRepository.save(course);
    }
}
