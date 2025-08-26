/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.coursemodulemapping;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
/**
 *
 * @author vutlh
 */

@Embeddable
public class CourseModuleId implements Serializable {

    private String courseCode;
    private String moduleCode;

    public CourseModuleId() {}

    public CourseModuleId(String courseCode, String moduleCode) {
        this.courseCode = courseCode;
        this.moduleCode = moduleCode;
    }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getModuleCode() { return moduleCode; }
    public void setModuleCode(String moduleCode) { this.moduleCode = moduleCode; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CourseModuleId)) return false;
        CourseModuleId that = (CourseModuleId) o;
        return Objects.equals(courseCode, that.courseCode) &&
               Objects.equals(moduleCode, that.moduleCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(courseCode, moduleCode);
    }
}

