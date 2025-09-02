/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.models.faculty;

import com.example.student_marks_app.models.department.Department;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author vutlh
 */
@Entity
public class Faculty {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "faculty_seq")
    @SequenceGenerator(
        name = "faculty_seq",
        sequenceName = "faculty_seq",
        initialValue = 10,
        allocationSize = 10
    )
    private long code;
    
    private String facName;
    
    @OneToMany(mappedBy = "faculty", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Department> departments = new ArrayList<>();

    public Faculty() {
    }

    public Faculty(String facName) {
        this.facName = facName;
    }

    public String getFacName() {
        return facName;
    }

    public void setFacName(String facName) {
        this.facName = facName;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }
    
    public void addDepartment(Department dept){
        departments.add(dept);
        dept.setFaculty(this);
    }
    
    public void removeDepartment(Department dept){
        departments.remove(dept);
        dept.setFaculty(null);
    }
}
