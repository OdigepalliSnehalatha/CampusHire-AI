package com.campushire.controller;

import com.campushire.entity.PlacementDrive;
import com.campushire.entity.StudentProfile;
import com.campushire.service.PlacementDriveService;
import com.campushire.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class PlacementDriveController {

    private final PlacementDriveService driveService;
    private final StudentService studentService;

    public PlacementDriveController(PlacementDriveService driveService, StudentService studentService) {
        this.driveService = driveService;
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<PlacementDrive>> getAllDrives() {
        return ResponseEntity.ok(driveService.getActiveDrives());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlacementDrive> getDriveById(@PathVariable Long id) {
        return ResponseEntity.ok(driveService.getDriveById(id));
    }

    @GetMapping("/recommended")
    public ResponseEntity<List<Map<String, Object>>> getRecommendedDrives(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(driveService.getRecommendedDrives(student));
    }

    @PostMapping
    public ResponseEntity<PlacementDrive> createDrive(@RequestBody PlacementDrive drive) {
        return ResponseEntity.ok(driveService.createDrive(drive));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlacementDrive> updateDrive(@PathVariable Long id, @RequestBody PlacementDrive drive) {
        return ResponseEntity.ok(driveService.updateDrive(id, drive));
    }
}
