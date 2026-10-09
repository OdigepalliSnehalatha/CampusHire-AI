package com.campushire.controller;

import com.campushire.dto.ApplicationDto;
import com.campushire.dto.StatusUpdateRequest;
import com.campushire.entity.StudentProfile;
import com.campushire.service.ApplicationService;
import com.campushire.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;
    private final StudentService studentService;

    public ApplicationController(ApplicationService applicationService, StudentService studentService) {
        this.applicationService = applicationService;
        this.studentService = studentService;
    }

    @PostMapping("/apply/{driveId}")
    public ResponseEntity<ApplicationDto> apply(@AuthenticationPrincipal UserDetails userDetails,
                                                @PathVariable Long driveId) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(applicationService.apply(student.getId(), driveId));
    }

    @GetMapping("/my-applications")
    public ResponseEntity<List<ApplicationDto>> getMyApplications(@AuthenticationPrincipal UserDetails userDetails) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(applicationService.getStudentApplications(student.getId()));
    }

    @GetMapping
    public ResponseEntity<List<ApplicationDto>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @GetMapping("/drive/{driveId}")
    public ResponseEntity<List<ApplicationDto>> getApplicationsByDrive(@PathVariable Long driveId) {
        return ResponseEntity.ok(applicationService.getApplicationsByDrive(driveId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApplicationDto> updateStatus(@PathVariable Long id,
                                                       @Valid @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(applicationService.updateStatus(id, request));
    }
}
