/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.repositories.CourseRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.student_marks_app.repositories.CourseModuleRepository;

/**
 *
 * @author vutlh
 */

@RestController
@RequestMapping("/api/courses")
public class CourseRestController {
    
    private final CourseRepository courseRepository;
    private final CourseModuleRepository moduleRepository;

    public CourseRestController(CourseRepository courseRepository, CourseModuleRepository moduleRepository) {
        this.courseRepository = courseRepository;
        this.moduleRepository = moduleRepository;
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
        
        List<CourseModule> validModules = new ArrayList<>();
        if (course.getModules() != null) {
            for (CourseModule module : course.getModules()) {
                CourseModule exstingModule = moduleRepository.findById(module.getCode())
                        .orElseThrow(() -> new RuntimeException("Module not found"));
                
                validModules.add(exstingModule);
            }
            
            
        }
        
        course.setModules(validModules);
        return courseRepository.save(course);
    }
    
    @PostMapping("/{code}/modules")
    public Course addModuleToCourse(@PathVariable String code, @RequestBody List<CourseModule> modules){
        Course course = courseRepository.findById(code)
                        .orElseThrow(() -> new RuntimeException("Course not found"));
        
        for (CourseModule module : modules) {
            CourseModule existingModule = moduleRepository.findById(module.getCode())
                                .orElseThrow(() -> new RuntimeException("Module not found" + module.getCode()));
        
            if (!course.getModules().contains(existingModule)) {
                course.getModules().add(existingModule);
            }
        }
        
        
        return courseRepository.save(course);
    }
    
    @PostMapping("/{code}/update")
    public Course updateCourse(@PathVariable String code,@RequestBody Course updatedCourse){
        Course course = courseRepository.findById(code)
                        .orElseThrow(() -> new RuntimeException("Course not found"));
        
        
        if (updatedCourse.getCourseName() != null &&
            !course.getCourseName().equals(updatedCourse.getCourseName())) {
            
            course.setCourseName(updatedCourse.getCourseName());
        }
        
        if (updatedCourse.getModules() != null &&
            !course.getModules().equals(updatedCourse.getModules())) {
            
            List<CourseModule> modules = updatedCourse.getModules().stream()
                                         .map(m -> moduleRepository.findById(m.getCode())
                                         .orElseThrow(() -> new RuntimeException("Module not found" + m.getCode())))
                                         .toList();
            
            course.setModules(modules);
        }
        
        return courseRepository.save(course);
    }
}
