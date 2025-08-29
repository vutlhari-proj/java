/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.coursemodulemapping.CourseModuleMapping;
import com.example.student_marks_app.dtos.CourseDTO;
import com.example.student_marks_app.dtos.ModuleDTO;
import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.repositories.CourseModuleMappingRepository;
import com.example.student_marks_app.repositories.CourseModuleRepository;
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
@RequestMapping("/api/modules")
public class ModuleRestController {
    
    private final CourseModuleRepository moduleRepository;
    private final CourseRepository courseRepository;
    private final CourseModuleMappingRepository mappingRepository;

    public ModuleRestController(CourseModuleRepository moduleRepository,
                                CourseRepository courseRepository,
                                CourseModuleMappingRepository mappingRepository) {
        this.moduleRepository = moduleRepository;
        this.courseRepository = courseRepository;
        this.mappingRepository = mappingRepository;
    }
    
    @GetMapping
    public List<CourseModule> getAllModules(){
        return moduleRepository.findAll();
    }
    
    @GetMapping("/{code}")
    public ModuleDTO getMOdule(@PathVariable String code){
        return moduleRepository.findById(code)
                .orElseThrow(() -> new RuntimeException("unable to find module"))
                .toDto();
    }
    
    @GetMapping("/{code}/courses")
    public List<CourseDTO> inCourses(@PathVariable String code){
        return mappingRepository.findByModule_Code(code).stream()
                .map(CourseModuleMapping::getCourse)
                .map(course ->{
                    CourseDTO dto = new CourseDTO(course.getCode(),course.getCourseName(), null);
                    return dto;
                })
                .toList();
    }
    
    @PostMapping
    public CourseModule addModule(@RequestBody CourseModule module){
        if (module.getCode() == null || module.getCode().trim().isEmpty()) {
            throw new RuntimeException("Module code is required");
        }
        
        return moduleRepository.save(module);
    }
    
    @PostMapping("/{code}/delete")
    public void deleteModule(@PathVariable String code){
        CourseModule module = moduleRepository.findById(code)
                .orElseThrow(() -> new RuntimeException("Module doesn't exist"));
        
        courseRepository.deleteById(code);
    }
    
    @PostMapping("/{code}/update")
    public ModuleDTO updateModule(@PathVariable String code, ModuleDTO dto){
        CourseModule module = moduleRepository.findById(code)
                .orElseThrow(() -> new RuntimeException("unable to find module " + code));
        
        if (dto.getModuleName() != null &&
                !module.getModuleName().equals(dto.getModuleName())) {
            module.setModuleName(dto.getModuleName());
        }
        
        moduleRepository.save(module);
        
        return moduleRepository.findById(code)
                    .orElseThrow(() -> new RuntimeException("module not found after updating"))
                .toDto();
    }
}
