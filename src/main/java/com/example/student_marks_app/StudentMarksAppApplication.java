package com.example.student_marks_app;

import java.awt.Desktop;
import java.net.URI;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.web.context.WebServerApplicationContext;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class StudentMarksAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentMarksAppApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationEvent(ApplicationReadyEvent event) {

        if (event.getApplicationContext() instanceof WebServerApplicationContext webContext) {
            int port = webContext.getWebServer().getPort();

            String url = "http://localhost:" + port;

            if (Desktop.isDesktopSupported()) {
                try {
                    Desktop.getDesktop().browse(new URI(url));
                } catch (Exception e) {
                    System.err.println("Failed to open browser: " + e.getMessage());
                }
            } else {
                System.out.println("open browser to " + url);
            }
        }

    }
}
