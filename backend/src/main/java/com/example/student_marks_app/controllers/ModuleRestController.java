/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.coursemodulemapping.CourseModuleId;
import com.example.student_marks_app.coursemodulemapping.CourseModuleMapping;
import com.example.student_marks_app.dtos.CourseDTO;
import com.example.student_marks_app.dtos.ModuleDTO;
import com.example.student_marks_app.dtos.ModuleRequestDTO;
import com.example.student_marks_app.dtos.ModuleSummary;
import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.repositories.CourseModuleMappingRepository;
import com.example.student_marks_app.repositories.CourseModuleRepository;
import com.example.student_marks_app.repositories.CourseRepository;
import com.example.student_marks_app.services.CourseModuleService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    private final CourseModuleService moduleService;
    
    public ModuleRestController(CourseModuleService moduleService) {
        this.moduleService = moduleService;
    }
    
    @GetMapping
    public ResponseEntity<?> getAllModules(){
        try{
            List<ModuleSummary> modules = moduleService.getAllModules();
            return ResponseEntity.ok(modules);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/{code}")
    public ResponseEntity<?> getModule(@PathVariable String code){
        try{
            ModuleDTO module = moduleService.getModule(code);
            return ResponseEntity.ok(module);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
  
    @PostMapping
    public ResponseEntity<?> createModule(@RequestBody ModuleRequestDTO request){
        try{
            CourseModule module = moduleService.createModule(request);
            return ResponseEntity.ok("module created successfully "+ module.getCode());
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{code}/delete")
    public ResponseEntity<?> deleteModule(@PathVariable String code){
        try{
            moduleService.deleteModule(code);
            return ResponseEntity.ok("module deleted successfully");
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/update")
    public ResponseEntity<?> updateModule(@RequestBody ModuleRequestDTO request){
        try{
            System.out.println(request);
            CourseModule module = moduleService.updateModule(request);
            return ResponseEntity.ok("module updated successfully "+ module.getCode());
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
