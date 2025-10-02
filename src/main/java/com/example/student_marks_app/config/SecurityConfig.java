package com.example.student_marks_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      http
              .csrf(csrf -> csrf.disable())
              .authorizeHttpRequests(auth -> auth
                .requestMatchers("/index.html", "/pages/student-registration.html", 
                "/pages/staff-registration.html", "/pages/login.html", "/pages/create-password.html",
                "/pages/welcome.html",
                "/scripts/**", "/styles/**", 
                "/api/auth/**", "/images/**",
                "/api/courses/search", "/config/**").permitAll()
                .requestMatchers("/pages/home.html", "/pages/courses.html", "/pages/course-info.html",
                "/pages/modules.html", "/pages/module-info.html").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/courses/**", "/api/modules/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/courses/**", "/api/modules/**").hasAnyRole("ADMINISTRATOR", "HOD")
                .requestMatchers(HttpMethod.PUT, "/api/courses/**", "/api/modules/**").hasAnyRole("ADMINISTRATOR", "HOD")
                .requestMatchers(HttpMethod.DELETE, "/api/courses/**", "/api/modules/**").hasRole("ADMINISTRATOR")
                .anyRequest().authenticated()
              );
      // No .httpBasic() so no browser popup
      return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
      return authenticationConfiguration.getAuthenticationManager();
  }
}
