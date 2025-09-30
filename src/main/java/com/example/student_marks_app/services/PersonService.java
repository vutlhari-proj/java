package com.example.student_marks_app.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.student_marks_app.sequences.global_sequence.GlobalIdGenerator;
import com.example.student_marks_app.models.student.Student;
import com.example.student_marks_app.models.staff.Staff;
import com.example.student_marks_app.models.course.Course;

@Service
public class PersonService {

    private final GlobalIdGenerator globalIdGenerator;

    @Autowired
    public PersonService(GlobalIdGenerator globalIdGenerator) {
        this.globalIdGenerator = globalIdGenerator;
    }

    public Student createStudent(String name, String surname, String cellphone, String email, Course course) {
        String studNum = globalIdGenerator.generateId();
        return new Student(name, surname, cellphone, email, studNum, course);
    }

    public Staff createStaff(String name, String surname, String cellphone, String email, String position) {
        String staffNum = globalIdGenerator.generateId();
        return new Staff(name, surname, cellphone, email, staffNum, position);
    }
}