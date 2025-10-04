package com.example.student_marks_app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping({"/", "/index", "/login"})
    public String login() {
        return "index";
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }

    @GetMapping("/courses")
    public String courses() {
        return "courses";
    }

    @GetMapping("/course-info")
    public String courseInfo() {
        return "course-info";
    }

    @GetMapping("/modules")
    public String modules() {
        return "modules";
    }

    @GetMapping("/module-info")
    public String moduleInfo() {
        return "module-info";
    }
}
