package com.example.student_marks_app.config;

import java.util.List;
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
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(List.of("http://localhost:5173",
                                                    "http://10.2.40.218:5173"));
            config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE",
                    "OPTIONS"));
            config.setAllowedHeaders(List.of("*"));
            config.setAllowCredentials(true);
            return config;
        }))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/index.html", "/login",
                        "/pages/student-registration.html", "/pages/staff-registration.html",
                        "/pages/login.html", "/pages/create-password.html",
                        "/pages/welcome.html", "/scripts/**", "/styles/**",
                        "/api/auth/**", "/api/auth/me","/images/**",
                        "/api/courses/search", "/config/**").permitAll()
                .requestMatchers("/home", "/courses", "/course-info/**",
                        "/modules", "/module-info/**").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/courses/**",
                        "/api/modules/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/courses/**",
                        "/api/modules/**").hasAnyRole("ADMINISTRATOR", "HOD")
                .requestMatchers(HttpMethod.PUT, "/api/courses/**",
                        "/api/modules/**").hasAnyRole("ADMINISTRATOR", "HOD")
                .requestMatchers(HttpMethod.DELETE, "/api/courses/**",
                        "/api/modules/**").hasRole("ADMINISTRATOR")
                .anyRequest().permitAll()
                )
                .formLogin(form -> form.disable()) // Use /login for custom login page
                .httpBasic(httpBasic -> httpBasic.disable())
                .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )
                .logout(logout -> logout
                .logoutUrl("/api/auth/logout")
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)
                .permitAll()
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
