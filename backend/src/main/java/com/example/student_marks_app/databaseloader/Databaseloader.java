/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.databaseloader;

import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.department.Department;
import com.example.student_marks_app.models.faculty.Faculty;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.models.module.Credits;
import com.example.student_marks_app.models.module.Nqf_Level;
import com.example.student_marks_app.repositories.CourseModuleRepository;
import com.example.student_marks_app.repositories.CourseRepository;
import com.example.student_marks_app.repositories.DepartmentRepository;
import com.example.student_marks_app.repositories.FacultyRepository;
import jakarta.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

/**
 *
 * @author vutlh
 */

@Service
public class Databaseloader {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private CourseModuleRepository moduleRepository;
    
    @Autowired
    private DepartmentRepository deptRepository;

    @Autowired
    private FacultyRepository facultyRepository;
    
    public Databaseloader() {
    }
    
    /*@PostConstruct
    public void loadMod(){
        try(BufferedReader br = new BufferedReader(
                new FileReader("C:\\Users\\vutlh\\Downloads\\modules_formatted.txt"))){
            String line;
            
            while((line = br.readLine()) != null){
                line = line.trim();
                
                String tokens[] = line.split("#");
                if(tokens.length < 4) continue;
                String code = tokens[0];
                String name = tokens[1];
                Credits credits = Credits.fromValue(Integer.parseInt(tokens[2]));
                Nqf_Level nqf = Nqf_Level.fromValue(Integer.parseInt(tokens[3]));
                
                CourseModule module = new CourseModule();
                module.setCode(code);
                module.setModuleName(name);
                module.setCredits(credits);
                module.setNqf_level(nqf);
                moduleRepository.save(module);
            }
            
            System.out.println("success");
        } catch (IOException ex) {
            Logger.getLogger(Databaseloader.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    /*@PostConstruct
    public void loadFac(){
        try(BufferedReader br = new BufferedReader(
                new FileReader("C:\\Users\\vutlh\\Downloads\\faculty_departments_full.txt"))){
            String line;
            Faculty currentFaculty = null;
            
            while((line = br.readLine()) != null){
                line = line.trim();
                
                if(line.isEmpty()) continue;;
                
                if (line.endsWith(":")) {
                    String facName = line.substring(0, line.length() - 1).trim();
                    currentFaculty = facultyRepository.findByFacNameIgnoreCase(facName)
                            .orElseThrow(() -> new RuntimeException("fac not fiund" + facName));
                }
                else if(line.startsWith("-") && currentFaculty != null){
                    String deptName = line.substring(2).trim();
                    Department dept = new Department(deptName);
                    dept.setFaculty(currentFaculty);
                    
                    deptRepository.save(dept);
                    
                    System.out.println("linked " + deptName + " -> " + currentFaculty.getFacName());
                }
            }
            
            System.out.println("success");
        } catch (IOException ex) {
            Logger.getLogger(Databaseloader.class.getName()).log(Level.SEVERE, null, ex);
        }
    }*/
}
