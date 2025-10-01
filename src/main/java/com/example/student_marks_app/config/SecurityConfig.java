package com.example.student_marks_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      http
              .csrf(csrf -> csrf.disable())
              .authorizeHttpRequests((requests) -> requests
                                .anyRequest().permitAll()
                            //   .requestMatchers("/api/auth/**").permitAll()
                            //   .requestMatchers("/api/faculty/**").hasAnyRole("ADMINISTRATOR")
                            //   .requestMatchers("/api/department/**").hasAnyRole("ADMINISTRATOR", "HOD")
                            //   .requestMatchers("/api/course/**").hasAnyRole("ADMINISTRATOR", "HOD")
                            //   .requestMatchers("/api/module/**").hasAnyRole("ADMINISTRATOR", "HOD", "LECTURER")
                            //   .requestMatchers("/api/lecturer/**").hasAnyRole("ADMINISTRATOR", "HOD", "LECTURER")
                            //   .requestMatchers("/api/student/**").hasAnyRole("ADMINISTRATOR", "ADMIN", "STUDENT")
                            //   .anyRequest().authenticated()
              )
              .httpBasic(httpBasic -> {}/*withDefaults()*/);
      return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
  }
}
