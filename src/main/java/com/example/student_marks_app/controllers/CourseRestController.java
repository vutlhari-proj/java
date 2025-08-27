/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.coursemodulemapping.CourseModuleId;
import com.example.student_marks_app.coursemodulemapping.CourseModuleMapping;
import com.example.student_marks_app.dtos.CourseDTO;
import com.example.student_marks_app.dtos.ModuleDTO;
import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.repositories.CourseModuleMappingRepository;
import com.example.student_marks_app.repositories.CourseRepository;
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
    private final CourseModuleMappingRepository mappingRepository;

    public CourseRestController(CourseRepository courseRepository, 
                                CourseModuleRepository moduleRepository,
                                CourseModuleMappingRepository mappingRepository) {
        this.courseRepository = courseRepository;
        this.moduleRepository = moduleRepository;
        this.mappingRepository = mappingRepository;
    }
    
    @GetMapping
    public List<CourseDTO> getAllCourse(){
        return courseRepository.findAll().stream()
                .map(Course::toDTO)
                .toList();
    }
    
    @GetMapping("/{code}")
    public CourseDTO getCourse(@PathVariable String code){
        return courseRepository.findById(code)
                .orElseThrow(() -> new RuntimeException("Course not found"))
                .toDTO();
    }
    
    @PostMapping
    public CourseDTO addCourse(@RequestBody CourseDTO dto) {
        if (dto.getCode() == null || dto.getCode().trim().isEmpty()) {
            throw new RuntimeException("Course code is required");
        }
        
        Course course = new Course(dto.getCode(), dto.getCourseName());
        courseRepository.save(course);
        
        if (dto.getModules() != null && !dto.getModules().isEmpty()) {
            for (ModuleDTO moduleDTO : dto.getModules()) {
                CourseModule module = moduleRepository.findById(moduleDTO.getCode())
                                        .orElseThrow(() -> new RuntimeException("module not found"));
                
                CourseModuleMapping mapping = new CourseModuleMapping(course, module);
                if (!mappingRepository.existsById(mapping.getId())) {
                    mappingRepository.save(mapping);
                }
            }
        }
        
        Course savedCourse = courseRepository.findById(course.getCode())
                .orElseThrow(() -> new RuntimeException("course not found after saving"));
        return savedCourse.toDTO();
    }
    
    @PostMapping("/{code}/modules")
    public CourseDTO addModuleToCourse(@PathVariable String code, @RequestBody List<String> moduleCodes){
        Course course = courseRepository.findById(code)
                        .orElseThrow(() -> new RuntimeException("Course not found"));
        
        for (String moduleCode : moduleCodes) {
            CourseModule module = moduleRepository.findById(moduleCode)
                    .orElseThrow(() -> new RuntimeException("module not found " + moduleCode));
            
            CourseModuleId id = new CourseModuleId(course.getCode(), module.getCode());
            CourseModuleMapping mapping = new CourseModuleMapping(course, module);
            if (!mappingRepository.existsById(mapping.getId())) {
                mappingRepository.save(mapping);
            }
        }
        
        Course updatedCourse = courseRepository.findById(code)
                .orElseThrow(() -> new RuntimeException("course not found"));
        
        return updatedCourse.toDTO();
    }
    
    @PostMapping("/{code}/update")
    public CourseDTO updateCourse(@PathVariable String code,@RequestBody CourseDTO dto){
        Course course = courseRepository.findById(code)
                        .orElseThrow(() -> new RuntimeException("Course not found"));
        
        
        if (dto.getCourseName() != null &&
            !course.getCourseName().equals(dto.getCourseName())) {
            
            course.setCourseName(dto.getCourseName());
        }
        
        mappingRepository.deleteAll(mappingRepository.findByCourse_Code(course.getCode()));
        if (dto.getModules()!= null) { 
            for (ModuleDTO moduleDTO : dto.getModules()) {
                CourseModule module = moduleRepository.findById(moduleDTO.getCode())
                        .orElseThrow(() -> new RuntimeException("module not found " + moduleDTO.getCode()));

                mappingRepository.save(new CourseModuleMapping(course, module));
            }
        }
        
        courseRepository.save(course);
        
        Course updatedCourse = courseRepository.findById(course.getCode())
                .orElseThrow(() -> new RuntimeException("course not found after updating"));
        return updatedCourse.toDTO();
    }
    
    @PostMapping("/{code}/delete")
    public void deleteCourse(@PathVariable String code){  
        Course course = courseRepository.findById(code)
                .orElseThrow(() -> new RuntimeException("unable to find course" + code));
        
        courseRepository.deleteById(code);
    }
}
