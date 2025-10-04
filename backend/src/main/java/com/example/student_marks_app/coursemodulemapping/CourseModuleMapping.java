/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.coursemodulemapping;

import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.models.module.CourseModule;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

/**
 *
 * @author vutlh
 */


@Entity
@Table(name = "course_module_mapping")
public class CourseModuleMapping {

    @EmbeddedId
    private CourseModuleId id;

    @ManyToOne
    @MapsId("courseCode")
    @JoinColumn(name = "course_code")
    private Course course;

    @ManyToOne
    @MapsId("moduleCode")
    @JoinColumn(name = "module_code")
    private CourseModule module;

    public CourseModuleMapping() {}

    public CourseModuleMapping(Course course, CourseModule module) {
        this.course = course;
        this.module = module;
        this.id = new CourseModuleId(course.getCode(), module.getCode());
    }

    public CourseModuleId getId() { return id; }
    public Course getCourse() { return course; }
    public CourseModule getModule() { return module; }
}

