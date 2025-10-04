package com.example.student_marks_app.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Set;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        Set<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());
        if (roles.contains("ROLE_ADMINISTRATOR")) {
            response.sendRedirect("/admin-dashboard");
        } else if (roles.contains("ROLE_STUDENT")) {
            response.sendRedirect("/student-dashboard");
        } else if (roles.contains("ROLE_LECTURER")) {
            response.sendRedirect("/lecturer-dashboard");
        } else {
            response.sendRedirect("/home");
        }
    }
}