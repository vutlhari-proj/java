/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.databaseloader;

import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.module.CourseModule;
import com.example.student_marks_app.repositories.CourseModuleRepository;
import com.example.student_marks_app.repositories.CourseRepository;
import jakarta.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 *
 * @author vutlh
 */

public class Databaseloader {
    
    /*@Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private CourseModuleRepository moduleRepository;
    
    /*@PostConstruct
    public void loadCourses(){
        JdbcTemplate.execute("TRUNCATE TABLE cou)
        try(BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\vutlh\\Downloads\\courses.txt"))){
            String line;
            while ((line = br.readLine()) != null) {                
                String[] tokens = line.split("#");
                
                String code = tokens[0].trim();
                String name = tokens[1].trim();
                
                courseRepository.save(new Course(code, name));
            }
        } catch (IOException ex) {
            Logger.getLogger(Databaseloader.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    @PostConstruct
    public void loadModules(){
        try(BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\vutlh\\Downloads\\modules.txt"))){
            String line;
            while ((line = br.readLine()) != null) {                
                String[] tokens = line.split("#");
                
                String code = tokens[0].trim();
                String name = tokens[1].trim();
                
                moduleRepository.save(new CourseModule(code, name));
            }
        } catch (IOException ex) {
            Logger.getLogger(Databaseloader.class.getName()).log(Level.SEVERE, null, ex);
        }
    }*/
}
