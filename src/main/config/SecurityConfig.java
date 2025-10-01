import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      http
          .csrf().disable()
          .authorizeHttpRequests((requests) -> requests
              .requestMatchers("/api/auth/**").permitAll()
              .requestMatchers("/api/faculty/**").hasAnyRole("ADMINISTRATOR")
              .requestMatchers("/api/department/**").hasAnyRole("ADMINISTRATOR", "HOD")
              .requestMatchers("/api/course/**").hasAnyRole("ADMINISTRATOR", "HOD")
              .requestMatchers("/api/module/**").hasAnyRole("ADMINISTRATOR", "HOD", "LECTURER")
              .requestMatchers("/api/lecturer/**").hasAnyRole("ADMINISTRATOR", "HOD", "LECTURER")
              .requestMatchers("/api/student/**").hasAnyRole("ADMINISTRATOR", "ADMIN", "STUDENT")
              .anyRequest().authenticated()
          )
          .httpBasic();
      return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
  }
}
