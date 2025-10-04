/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.department.Department;
import com.example.student_marks_app.repositories.CourseRepository;
import com.example.student_marks_app.repositories.DepartmentRepository;
import com.example.student_marks_app.repositories.FacultyRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 *
 * @author vutlh
 */
@RestController
@RequestMapping("/api/departments")
public class DepartmentRestController {
    
    private final DepartmentRepository deptRepository;
    private final CourseRepository courseRepository;
    
    private final FacultyRepository facultyRepository;

    public DepartmentRestController(DepartmentRepository deptRepository, 
                                    CourseRepository courseRepository, 
                                    FacultyRepository facultyRepository) {
        
        this.deptRepository = deptRepository;
        this.courseRepository = courseRepository;
        this.facultyRepository = facultyRepository;
    }
    
    @GetMapping
    public List<Department> getAllDepartments(){
        return deptRepository.findAll();
    }
    
    @GetMapping("/{code}")
    public Department getDepartment(@PathVariable long code){
        return deptRepository.findById(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found"));
    }
    
    @PostMapping
    public Department addDepartment(@RequestBody Department dept){
        if (dept.getDeptName().trim().isEmpty()) {
            throw new RuntimeException("department name is null");
        }
        
        return deptRepository.save(dept);
    }
    
    @PutMapping("/{code}")
    public Department updateDepartment(@PathVariable long code, @RequestBody Department dept){
        Department department = deptRepository.findById(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found"));
        
        department.setDeptName(dept.getDeptName());
        
        return deptRepository.save(department);
    }
    
    @DeleteMapping("/{code}")
    public void deleteDepartment(@PathVariable long code){
        Department department = deptRepository.findById(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found"));
        
        deptRepository.deleteById(department.getCode());
    }
    
    @PostMapping("/{code}/addCourses")
    public void addCourses(@PathVariable long code, @RequestBody List<String> courseCodes){
        Department department = deptRepository.findById(code)
                .orElseThrow(() -> new RuntimeException("unable to find department"));
        
        for (String courseCode : courseCodes) {
            Course course = courseRepository.findById(courseCode)
                    .orElseThrow(() -> new RuntimeException("couldn't find course"));
            
            department.addCourse(course);
            
            course.setDepartment(department);
            courseRepository.save(course);
        }
    }
    
    @DeleteMapping("/{code}/removeCourses")
    public void removeCourses(@PathVariable long code, @RequestBody List<String> courseCodes){
        Department department = deptRepository.findById(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found"));
        
        for (String courseCode : courseCodes) {
            Course course = courseRepository.findById(courseCode)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
            
            department.removeCourse(course);
            
            course.setDepartment(null);
            courseRepository.save(course);
        }
    }
}
