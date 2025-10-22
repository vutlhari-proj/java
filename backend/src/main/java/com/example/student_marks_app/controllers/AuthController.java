package com.example.student_marks_app.controllers;

import com.example.student_marks_app.records.LoginRequest;
import com.example.student_marks_app.records.LoginResponse;
import com.example.student_marks_app.records.PasswordRequest;
import com.example.student_marks_app.records.RegistrationResponse;
import com.example.student_marks_app.records.StudentStaffRegisterRequest;
import com.example.student_marks_app.records.UserExpanded;
import com.example.student_marks_app.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/me")
    public ResponseEntity<?> currentUser(Authentication auth){
        try{
            return ResponseEntity.ok(authService.getCurrentUser(auth));
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest req){
        try{
            return ResponseEntity.ok(authService.refresh(req));
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest req
            ,HttpServletResponse rep){
        try {
            return ResponseEntity.ok(authService.login(loginRequest, req, rep));
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/register-step1")
    public ResponseEntity<?> registerStep1(@RequestBody StudentStaffRegisterRequest request, HttpSession session) {
        System.out.println("Register Step 1 called with: " + request);
        session.setAttribute("registerData", request);
        System.out.println("Session data set: " + session.getAttribute("registerData"));
        return ResponseEntity.ok().body("Step 1 registration successful");
    }

    @PostMapping("/register-step2")
    public RegistrationResponse registerStep2(@RequestBody PasswordRequest passwordRequest, HttpSession session) {
        StudentStaffRegisterRequest registerData = (StudentStaffRegisterRequest) session.getAttribute("registerData");
        
        session.removeAttribute("registerData"); // Clear session data
        System.out.println("Session data after removal: " + session.getAttribute("registerData"));
        return authService.completeRegistration(registerData, passwordRequest.password());
    }

}
