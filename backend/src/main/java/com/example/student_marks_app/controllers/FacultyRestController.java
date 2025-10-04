/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.controllers;

import com.example.student_marks_app.models.department.Department;
import com.example.student_marks_app.models.faculty.Faculty;
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
@RequestMapping("/api/faculties")
public class FacultyRestController {
    
    private final FacultyRepository facultyRepository;
    private final DepartmentRepository deptRepository;

    public FacultyRestController(FacultyRepository facultyRepository, DepartmentRepository deptRepository) {
        this.facultyRepository = facultyRepository;
        this.deptRepository = deptRepository;
    }
    
    @GetMapping
    public List<Faculty> getAllFaculties(){
        return facultyRepository.findAll();
    }
    
    @GetMapping("/{code}")
    public Faculty getFaculty(@PathVariable long code){
        return facultyRepository.findById(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Faculty not found"));
    }
    
    @PostMapping
    public Faculty addFaculty(@RequestBody Faculty faculty){
        if (faculty.getFacName().trim().isEmpty()) {
            throw new RuntimeException("faculty name is empty");
        }
        
        return facultyRepository.save(faculty);
    }
    
    @PutMapping("/{code}")
    public Faculty updateFaculty(@PathVariable long code, Faculty faculty){
        Faculty toUpdate = facultyRepository.findById(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Faculty not found"));
        
        toUpdate.setFacName(faculty.getFacName());
        
        return facultyRepository.save(toUpdate);
    }
    
    @DeleteMapping("/{code}")
    public void deleteFaculty(@PathVariable long code){
        if (!facultyRepository.existsById(code)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Faculty not found");
        }
        
        Faculty faculty = facultyRepository.findById(code)
                .orElseThrow();
        for (Department dept : faculty.getDepartments()) {
            dept.setFaculty(null);
            deptRepository.save(dept);
        }
        facultyRepository.deleteById(code);
    }
    
    @PostMapping("/{code}/departments/{deptCode}")
    public Faculty addDepartment(@PathVariable long code, @PathVariable long deptCode){
        Faculty faculty = facultyRepository.findById(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Faculty not found"));
        
        Department department = deptRepository.findById(deptCode)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found"));
        
        faculty.addDepartment(department);
        deptRepository.save(department);
        
        return facultyRepository.save(faculty);
    }
    
    @DeleteMapping("/{code}/departments/{deptCode}")
    public void removeDepartment(@PathVariable long code, @PathVariable long deptCode){
        Faculty faculty = facultyRepository.findById(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Faculty not found"));
        
        Department department = deptRepository.findById(deptCode)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found"));
        
        faculty.removeDepartment(department);
        deptRepository.save(department);
        
        facultyRepository.save(faculty);
    }
}
