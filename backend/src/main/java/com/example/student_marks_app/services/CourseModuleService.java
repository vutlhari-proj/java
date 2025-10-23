/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.services;

import com.example.student_marks_app.coursemodulemapping.CourseModuleMapping;
import com.example.student_marks_app.dtos.ModuleDTO;
import com.example.student_marks_app.dtos.ModuleRequestDTO;
import com.example.student_marks_app.dtos.ModuleSummary;
import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.models.module.Credits;
import com.example.student_marks_app.models.module.Nqf_Level;
import com.example.student_marks_app.models.module.Type;
import com.example.student_marks_app.repositories.CourseModuleRepository;
import com.example.student_marks_app.repositories.CourseRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author vutlh
 */
@Service
public class CourseModuleService {

    private final CourseModuleRepository moduleRepository;
    private final CourseRepository courseRepository;

    public CourseModuleService(CourseModuleRepository moduleRepository,
            CourseRepository courseRepository) {
        this.moduleRepository = moduleRepository;
        this.courseRepository = courseRepository;
    }
    
    public List<ModuleSummary> getAllModules(){
        return moduleRepository.findAll()
                .stream()
                .map(CourseModule::toDto)
                .toList();
    }
    
    public ModuleDTO getModule(String code){
        return moduleRepository.findById(code)
                .orElseThrow(() -> new RuntimeException("unable to find module"))
                .toExtended();
    }

    public CourseModule createModule(ModuleRequestDTO request) {
        Credits creditEnum = Credits.fromValue(0);

        CourseModule module = new CourseModule(
                request.getCode(),
                request.getModuleName(),
                Type.valueOf(request.getType()),
                Credits.fromValue(request.getCredits()),
                Nqf_Level.fromValue(request.getNqf_level())
        );

        if (request.getprerequisites() != null) {
            Set<CourseModule> prereqs = request.getprerequisites()
                    .stream()
                    .map(code -> moduleRepository.findById(code)
                    .orElseThrow(() -> new IllegalArgumentException("Prereq code not found: " + code))
                    )
                    .collect(Collectors.toSet());
            module.setPrerequisites(prereqs);
        }

        if (request.getCourseCodes() != null) {
            Set<CourseModuleMapping> mappings = new HashSet<>();
            for (String courseCode : request.getCourseCodes()) {
                Course course = courseRepository.findById(courseCode)
                        .orElseThrow(() -> new RuntimeException("course not found"));

                CourseModuleMapping mapping = new CourseModuleMapping(course, module);
                mappings.add(mapping);
            }

            module.setCourseModules(mappings);
        }

        if (hasCircularPrerequisites(module, new HashSet<>())) {
            throw new IllegalArgumentException("Circular prerequisites detected");
        }

        return moduleRepository.save(module);
    }

    @Transactional
    public CourseModule updateModule(ModuleRequestDTO request) {
        CourseModule module = moduleRepository.findById(request.getCode())
                .orElseThrow(() -> new RuntimeException("Course code not found: " + request.getCode()));

        if (!module.getModuleName().equals(request.getModuleName())) {
            module.setModuleName(request.getModuleName());
        }

        if ( module.isElective() != request.isElective()) {
            module.setElective(request.isElective());
        }

        if (module.getType() == null || !module.getType().toString().equalsIgnoreCase(request.getType())) {
            module.setType(Type.valueOf(request.getType().toUpperCase()));
        }

        if (module.getCredits() == null || (module.getCredits().getValue() != request.getCredits())) {
            module.setCredits(Credits.fromValue(request.getCredits()));
        }

        if (module.getNqf_Level() == null || module.getNqf_Level().getValue() != request.getNqf_level()) {
            module.setNqf_Level(Nqf_Level.fromValue(request.getNqf_level()));
        }
        Set<String> existingCourses = module.getCourseModules()
                .stream()
                .map(m -> m.getCourse().getCode())
                .collect(Collectors.toSet());
        
        Set<String> requestCourses = safeSet(request.getCourseCodes());
        
        if (!existingCourses.equals(requestCourses)) {
            Set<CourseModuleMapping> mappings = requestCourses
                    .stream()
                    .map(code -> new CourseModuleMapping(
                            courseRepository.findById(code)
                                .orElseThrow(() -> new RuntimeException("unable to find course" + code))
                            , module
                    ))
                    .collect(Collectors.toSet());
            
            module.getCourseModules().clear();
            module.getCourseModules().addAll(mappings);
        }
        
       
        Set<String> existingPrereqs = module.getPrerequisites()
                .stream()
                .map(CourseModule::getCode)
                .collect(Collectors.toSet());
        
        Set<String> requestPrereqs = safeSet(request.getprerequisites());
        
        if (!existingPrereqs.equals(requestPrereqs)) {
            Set<CourseModule> prereqs = requestPrereqs
                    .stream()
                    .map(code -> moduleRepository.findById(code)
                        .orElseThrow(() -> new RuntimeException("unable to find module: " + code))
                    )
                    .collect(Collectors.toSet());
            
            module.getPrerequisites().clear();
            module.getPrerequisites().addAll(prereqs);
        }
        
        if (hasCircularPrerequisites(module, new HashSet<>())) {
            throw new IllegalArgumentException("Circular prerequisites detected");
        }
        
        return moduleRepository.save(module);
    }

    @Transactional
    public void deleteModule(String code){
        moduleRepository.removeAsPrerequisite(code);
        
        moduleRepository.deleteById(code);
    }
    
    private boolean hasCircularPrerequisites(CourseModule module, Set<CourseModule> visited) {
        if (visited.contains(module)) {
            return true;
        }

        visited.add(module);

        for (CourseModule prereq : module.getPrerequisites()) {
            if (hasCircularPrerequisites(module, new HashSet<>(visited))) {
                return true;
            }
        }

        return false;
    }
    
    private <T> Set<T> safeSet(List<T> list){
        return list == null ? new HashSet<>() : new HashSet<>(list);
    }
}
