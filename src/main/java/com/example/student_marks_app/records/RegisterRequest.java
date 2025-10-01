package com.example.student_marks_app.records;

import com.example.student_marks_app.models.user.Role;

public record RegisterRequest (String userId, String username, String password, Role role){}
