/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.dtos.ModuleDTO;
import com.example.student_marks_app.dtos.ModuleRequestDTO;
import com.example.student_marks_app.dtos.ModuleSummary;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.repositories.CourseModuleRepository;
import com.example.student_marks_app.services.CourseModuleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author vutlh
 */
@RestController
@RequestMapping("/api/modules")
public class ModuleRestController {

    private final CourseModuleService moduleService;
    private final CourseModuleRepository moduleRepository;
    public ModuleRestController(CourseModuleService moduleService,
                                CourseModuleRepository moduleRepository) {
        this.moduleService = moduleService;
        this.moduleRepository = moduleRepository;
    }
    
    /*@GetMapping
    public ResponseEntity<?> getAllModules(){
        try{
            List<ModuleSummary> modules = moduleService.getAllModules();
            return ResponseEntity.ok(modules);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }*/
    
    @GetMapping
    public ResponseEntity<?> getAllModules(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "200") int size){
        try{
            Page<ModuleSummary> pageable = 
                    moduleRepository.findAllBy(PageRequest.of(page, size));
            System.out.println(pageable);
            return ResponseEntity.ok(pageable);
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
