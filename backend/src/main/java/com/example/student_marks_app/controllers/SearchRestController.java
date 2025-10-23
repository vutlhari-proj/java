/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.dtos.CourseSummaryDTO;
import com.example.student_marks_app.dtos.ModuleSummary;
import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.records.SearchRequest;
import com.example.student_marks_app.records.SearchResponse;
import com.example.student_marks_app.repositories.CourseModuleRepository;
import com.example.student_marks_app.repositories.CourseRepository;
import com.example.student_marks_app.repositories.DepartmentRepository;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author vutlh
 */
@RestController
@RequestMapping("/api/search")
public class SearchRestController {
    
    private final CourseRepository courseRepo;
    private final CourseModuleRepository modulerepo;
    private final DepartmentRepository deptRepo;

    public SearchRestController(
            CourseRepository courseRepo, 
            CourseModuleRepository modulerepo, 
            DepartmentRepository deptRepo
    ) {
        this.courseRepo = courseRepo;
        this.modulerepo = modulerepo;
        this.deptRepo = deptRepo;
    }
    
    @PostMapping
    public ResponseEntity<?> search(@RequestBody SearchRequest req ){
        
        String query = req.query() != null ? req.query().trim() : "";
        String type = req.type() != null ? req.type().trim() : "";
        
        if (query.isEmpty() || type.isEmpty()) {
            return ResponseEntity.badRequest().body("Missing search query or type");
        }
        
        return switch (type){
            case "module" ->{
                List<ModuleSummary> modules = (req.deptCode() != null)
                        ? modulerepo.searchModulesInDepartment(req.deptCode(), query)
                            .stream()
                            .map(CourseModule::toDto)
                            .toList()
                        
                        : modulerepo.search(query)
                            .stream()
                            .map(CourseModule::toDto)
                            .toList();
                yield ResponseEntity.ok(new SearchResponse<ModuleSummary>(modules));
            }
            
            case "course" ->{
                List<CourseSummaryDTO> courses = (req.deptCode() != null)
                        ? courseRepo.searchModulesInDepartment(req.deptCode(), query)
                            .stream()
                            .map(Course::shortHand)
                            .toList()
                        
                        : courseRepo.search(query)
                            .stream()
                            .map(Course::shortHand)
                            .toList();
                
                yield  ResponseEntity.ok(new SearchResponse<CourseSummaryDTO>(courses));
            }
            default -> ResponseEntity.badRequest().body( "Invalid search type");
        };
    }
}
