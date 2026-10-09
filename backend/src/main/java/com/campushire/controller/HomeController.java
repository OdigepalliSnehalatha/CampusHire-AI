package com.campushire.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Void> rootRedirect() {
        HttpHeaders headers = new HttpHeaders();
        // Automatically redirect anyone opening http://localhost:8080 to the active frontend
        headers.setLocation(URI.create("http://localhost:5174"));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @GetMapping("/api")
    public ResponseEntity<String> apiStatus() {
        return ResponseEntity.ok("CampusHire AI Backend API is running successfully on port 8080.");
    }
}
