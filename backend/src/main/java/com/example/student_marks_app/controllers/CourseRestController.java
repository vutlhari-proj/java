/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.coursemodulemapping.CourseModuleId;
import com.example.student_marks_app.coursemodulemapping.CourseModuleMapping;
import com.example.student_marks_app.dtos.CourseDTO;
import com.example.student_marks_app.dtos.CourseSummaryDTO;
import com.example.student_marks_app.dtos.ModuleDTO;
import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.repositories.CourseModuleMappingRepository;
import com.example.student_marks_app.repositories.CourseRepository;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.student_marks_app.repositories.CourseModuleRepository;
import com.example.student_marks_app.repositories.DepartmentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.server.ResponseStatusException;

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
    
    private final DepartmentRepository deptRepository;
    
    public CourseRestController(CourseRepository courseRepository, 
                                CourseModuleRepository moduleRepository,
                                CourseModuleMappingRepository mappingRepository,
                                DepartmentRepository deptRepository) {
        this.courseRepository = courseRepository;
        this.moduleRepository = moduleRepository;
        this.mappingRepository = mappingRepository;
        this.deptRepository = deptRepository;
    }
    
    @GetMapping
    public List<CourseSummaryDTO> getAllCourse(){
        return courseRepository.findAll().stream()
                .map(Course::shortHand)
                .toList();
    }
    
    @GetMapping("/{code}")
    public CourseDTO getCourse(@PathVariable String code){
        return courseRepository.findById(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"))
                .toDTO();
    }
    
    @GetMapping("/search")
    public List<Map<String, String>> searchCourses(@RequestParam("query") String query) {
        return courseRepository.findByCourseNameContainingIgnoreCase(query).stream()
                .map(course -> Map.of(
                    "courseCode", course.getCode(),
                    "courseName", course.getCourseName()
                ))
                .toList();
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
                                        .orElseThrow(() -> 
                                        new ResponseStatusException(HttpStatus.NOT_FOUND, "MOdule not found"));
                
                CourseModuleMapping mapping = new CourseModuleMapping(course, module);
                if (!mappingRepository.existsById(mapping.getId())) {
                    mappingRepository.save(mapping);
                }
            }
        }
        
        Course savedCourse = courseRepository.findById(course.getCode())
                .orElseThrow(() -> 
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found after saving"));
        return savedCourse.toDTO();
    }
    
    @PostMapping("/{code}/modules")
    public CourseDTO addModuleToCourse(@PathVariable String code, @RequestBody List<String> moduleCodes){
        Course course = courseRepository.findById(code)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
        
        for (String moduleCode : moduleCodes) {
            CourseModule module = moduleRepository.findById(moduleCode)
                    .orElseThrow(() -> 
                           new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found " + moduleCode));
            
            CourseModuleId id = new CourseModuleId(course.getCode(), module.getCode());
            CourseModuleMapping mapping = new CourseModuleMapping(course, module);
            if (!mappingRepository.existsById(mapping.getId())) {
                mappingRepository.save(mapping);
            }
        }
        
        Course updatedCourse = courseRepository.findById(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
        
        return updatedCourse.toDTO();
    }
    
    @PutMapping("/{code}")
    public CourseDTO updateCourse(@PathVariable String code,@RequestBody CourseDTO dto){
        Course course = courseRepository.findById(code)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
        
        
        if (dto.getCourseName() != null &&
            !course.getCourseName().equals(dto.getCourseName())) {
            
            course.setCourseName(dto.getCourseName());
        }
        
        mappingRepository.deleteAll(mappingRepository.findByCourse_Code(course.getCode()));
        if (dto.getModules()!= null) { 
            for (ModuleDTO moduleDTO : dto.getModules()) {
                CourseModule module = moduleRepository.findById(moduleDTO.getCode())
                        .orElseThrow(() ->
                                new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found" + moduleDTO.getCode()));

                mappingRepository.save(new CourseModuleMapping(course, module));
            }
        }
        
        if (dto.getDepartment() != null && !course.getDepartment().equals(dto.getDepartment())) {
            course.setDepartment(dto.getDepartment());
        }
        
        courseRepository.save(course);
        
        Course updatedCourse = courseRepository.findById(course.getCode())
                .orElseThrow(() -> new
         ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found after updating"));
        return updatedCourse.toDTO();
    }
    
    @DeleteMapping("/{code}")
    public void deleteCourse(@PathVariable String code){  
        Course course = courseRepository.findById(code)
                .orElseThrow(() -> 
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
        
        courseRepository.deleteById(code);
    }
}
