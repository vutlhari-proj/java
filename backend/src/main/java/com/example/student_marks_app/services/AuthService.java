package com.example.student_marks_app.services;

import com.example.student_marks_app.models.student.Student;
import com.example.student_marks_app.models.staff.Staff;
import com.example.student_marks_app.models.user.Role;
import com.example.student_marks_app.models.user.User;
import com.example.student_marks_app.records.LoginRequest;
import com.example.student_marks_app.records.LoginResponse;
import com.example.student_marks_app.records.RegisterRequest;
import com.example.student_marks_app.records.RegistrationResponse;
import com.example.student_marks_app.records.StudentStaffRegisterRequest;
import com.example.student_marks_app.repositories.StudentRepository;
import com.example.student_marks_app.repositories.CourseRepository;
import com.example.student_marks_app.repositories.StaffRepository;
import com.example.student_marks_app.models.course.Course;
import com.example.student_marks_app.records.UserExpanded;
import org.springframework.transaction.annotation.Transactional;
import com.example.student_marks_app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StudentRepository studentRepository;
    private final StaffRepository staffRepository;
    private final CourseRepository courseRepository;
    private final PersonService personService;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            StudentRepository studentRepository, StaffRepository staffRepository,
            CourseRepository courseRepository, PersonService personService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.studentRepository = studentRepository;
        this.staffRepository = staffRepository;
        this.courseRepository = courseRepository;
        this.personService = personService;
    }

    public String register(RegisterRequest request) {
        // Old single user registration retained for compatibility
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        String encodedPassword = passwordEncoder.encode(request.password());
        User user = new User(
                request.userId(),
                request.username(),
                encodedPassword,
                request.role()
        );
        userRepository.save(user);
        return "User registered successfully";
    }

    public LoginResponse login(LoginRequest request) {
        // Find the user by username
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        // Check if the password matches
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        String username = user.getUsername(), role = user.getRole().name(), name ="", surname = "";
        if (user.getRole() == Role.STUDENT) {
            Student student = studentRepository.findById(user.getUserId())
                    .orElseThrow(() -> new RuntimeException("Student id not found"));
            
            name = student.getName();
            surname = student.getSurname();
        }
        else{
            Staff staff = staffRepository.findById(user.getUserId())
                    .orElseThrow(() -> new RuntimeException("Student id not found"));
            
            name = staff.getName();
            surname = staff.getSurname();
        }
        
        return new LoginResponse("Login successful", new UserExpanded(username, name, surname, role));
    }

    @Transactional
    public RegistrationResponse completeRegistration(StudentStaffRegisterRequest registerData, String password) {
        String type = registerData.type();

        if (type.equalsIgnoreCase("STUDENT")) {
            // Create Student entity
            Course course = courseRepository.findById(registerData.courseOrPosition())
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            Student student = personService.createStudent(
                    registerData.name(),
                    registerData.surname(),
                    registerData.idNum(),
                    registerData.cellphone(),
                    registerData.email(),
                    course
            );
            studentRepository.save(student);

            // Create User entity for student
            User user = new User(
                    student.getStudNum(),
                    student.getStudNum() + "@tut4life.ac.za",
                    passwordEncoder.encode(password),
                    Role.STUDENT
            );
            userRepository.save(user);

            return new RegistrationResponse(student.getName(), student.getSurname(), user.getUsername());
        } else {
            // Create Staff entity
            Staff staff = personService.createStaff(
                    registerData.name(),
                    registerData.surname(),
                    registerData.idNum(),
                    registerData.cellphone(),
                    registerData.email(),
                    Role.valueOf(registerData.courseOrPosition()) // position
            );

            staffRepository.save(staff);

            // Create User entity for staff
            User user = new User(
                    staff.getStaffNum(),
                    staff.getStaffNum() + "@tut4life.ac.za",
                    passwordEncoder.encode(password),
                    staff.getPosition()
            );
            userRepository.save(user);
            return new RegistrationResponse(staff.getName(), staff.getSurname(), user.getUsername());
        }

    }
}
