package com.example.student_marks_app.controllers;

import com.example.student_marks_app.records.LoginRequest;
import com.example.student_marks_app.records.LoginResponse;
import com.example.student_marks_app.records.PasswordRequest;
import com.example.student_marks_app.records.StudentStaffRegisterRequest;
import com.example.student_marks_app.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        httpRequest.getSession(true); // Ensures session is created
        return new LoginResponse(
            "Login successful",
            request.username(),
            authentication.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "")
        );
    }

    @PostMapping("/register-step1")
    public ResponseEntity<?> registerStep1(@RequestBody StudentStaffRegisterRequest request, HttpSession session) {
        System.out.println("Register Step 1 called with: " + request);
        session.setAttribute("registerData", request);
        System.out.println("Session data set: " + session.getAttribute("registerData"));
        return ResponseEntity.ok().body("Step 1 registration successful");
    }

    @PostMapping("/register-step2")
    public ResponseEntity<?> registerStep2(@RequestBody PasswordRequest passwordRequest, HttpSession session) {
        StudentStaffRegisterRequest registerData = (StudentStaffRegisterRequest) session.getAttribute("registerData");
        if (registerData == null) {
            return ResponseEntity.badRequest().body("No registration data found");
        }
        authService.completeRegistration(registerData, passwordRequest.password());
        session.removeAttribute("registerData"); // Clear session data
        System.out.println("Session data after removal: " + session.getAttribute("registerData"));
        return ResponseEntity.ok().body("Step 2 registration successful");
    }

}
