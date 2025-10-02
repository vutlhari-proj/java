package com.example.student_marks_app.controllers;

import java.util.List;

import org.springframework.context.annotation.Role;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.student_marks_app.dtos.StaffDTO;
import com.example.student_marks_app.models.staff.Staff;
import com.example.student_marks_app.models.user.User;
import com.example.student_marks_app.repositories.StaffRepository;
import com.example.student_marks_app.repositories.UserRepository;
import com.example.student_marks_app.services.PersonService;

@RestController
@RequestMapping("/api/staff")
public class StaffRestController {
    private final StaffRepository staffRepository;
    private final PersonService personService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Add this

    public StaffRestController(StaffRepository staffRepository,
                               PersonService personService,
                               UserRepository userRepository,
                               PasswordEncoder passwordEncoder) { // Add this
        this.staffRepository = staffRepository;
        this.personService = personService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder; // Add this
    }
    
    @GetMapping()
    public List<StaffDTO> getAllStaff(){
        return staffRepository.findAll().stream()
                .map(Staff::toDTO).toList();
    }

    @PostMapping
    public Staff addStaff(@RequestBody Staff st){
        st = personService.createStaff(st.getName(), st.getSurname(), st.getIdNum(), 
                st.getCellphone(), st.getEmail(), st.getPosition());

        // Create a new User for the staff with a default password
        String encodedPassword = passwordEncoder.encode(st.getStaffNum());
        String username = st.getStaffNum() + "@tut4life.ac.za";
        User user = new User(
            st.getStaffNum(), // userId
            username,         // username
            encodedPassword,  // encoded default password
            st.getPosition()  // role
        );
        userRepository.save(user);

        return staffRepository.save(st);
    }
}
