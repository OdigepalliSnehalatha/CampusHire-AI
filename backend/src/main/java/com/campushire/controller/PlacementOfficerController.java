package com.campushire.controller;

import com.campushire.dto.ApplicationDto;
import com.campushire.dto.PlacementAnalyticsDto;
import com.campushire.entity.StudentProfile;
import com.campushire.service.AnalyticsService;
import com.campushire.service.ApplicationService;
import com.campushire.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placement-officer")
public class PlacementOfficerController {

    private final AnalyticsService analyticsService;
    private final StudentService studentService;
    private final ApplicationService applicationService;

    public PlacementOfficerController(AnalyticsService analyticsService,
                                    StudentService studentService,
                                    ApplicationService applicationService) {
        this.analyticsService = analyticsService;
        this.studentService = studentService;
        this.applicationService = applicationService;
    }

    @GetMapping("/analytics")
    public ResponseEntity<PlacementAnalyticsDto> getAnalytics() {
        return ResponseEntity.ok(analyticsService.getPlacementAnalytics());
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentProfile>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationDto>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }
}
