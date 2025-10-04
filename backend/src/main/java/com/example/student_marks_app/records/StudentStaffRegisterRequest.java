package com.example.student_marks_app.records;

public record StudentStaffRegisterRequest(
    String type, // "STUDENT" or "STAFF"
    String name,
    String surname,
    String idNum,
    String cellphone,
    String email,
    String courseOrPosition
) {}
