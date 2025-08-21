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

            if (!openInBrowser(url)) {
                System.out.println("Open manually: " + url);
            }
        }

    }
    
    private boolean openInBrowser(String url){
        try{
            if (Desktop.isDesktopSupported()) {
                Desktop desktop = Desktop.getDesktop();
                if (desktop.isSupported(Desktop.Action.BROWSE)) {
                    desktop.browse(new URI(url));
                    return true;
                }
            }
            
            String os = System.getProperty("os.name").toLowerCase();
            if (os.contains("win")) {
                Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler " + url);
            }
            else if (os.contains("mac")) {
                Runtime.getRuntime().exec("open " + url);
            }
            else if (os.contains("nix")) {
                Runtime.getRuntime().exec("xdg-open " + url);
            }
            return true;
        }
        catch(Exception e){
            System.err.println("Failed to open browser: " + e.getMessage());
            return false;
        }
    }
}
