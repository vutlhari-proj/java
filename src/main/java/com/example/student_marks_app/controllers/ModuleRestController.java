/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.dtos.ModuleDTO;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.repositories.CourseModuleRepository;
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

    public ModuleRestController(CourseModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
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
    
    @PostMapping
    public CourseModule addModule(@RequestBody CourseModule module){
        if (module.getCode() == null || module.getCode().trim().isEmpty()) {
            throw new RuntimeException("Module code is required");
        }
        
        return moduleRepository.save(module);
    }
}
