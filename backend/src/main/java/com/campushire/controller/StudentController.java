package com.campushire.controller;

import com.campushire.entity.*;
import com.campushire.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/profile")
    public ResponseEntity<StudentProfile> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(studentService.getProfileByEmail(userDetails.getUsername()));
    }

    @PutMapping("/profile")
    public ResponseEntity<StudentProfile> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                                        @RequestBody StudentProfile profile) {
        StudentProfile current = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(studentService.updateProfile(current.getUser().getId(), profile));
    }

    @GetMapping("/skills")
    public ResponseEntity<List<StudentSkill>> getSkills(@AuthenticationPrincipal UserDetails userDetails) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(studentService.getSkills(student.getId()));
    }

    @PostMapping("/skills")
    public ResponseEntity<StudentSkill> addSkill(@AuthenticationPrincipal UserDetails userDetails,
                                                 @RequestBody StudentSkill skill) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(studentService.addSkill(student.getId(), skill));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        studentService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects(@AuthenticationPrincipal UserDetails userDetails) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(studentService.getProjects(student.getId()));
    }

    @PostMapping("/projects")
    public ResponseEntity<Project> addProject(@AuthenticationPrincipal UserDetails userDetails,
                                              @RequestBody Project project) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(studentService.addProject(student.getId(), project));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        studentService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/certifications")
    public ResponseEntity<List<Certification>> getCertifications(@AuthenticationPrincipal UserDetails userDetails) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(studentService.getCertifications(student.getId()));
    }

    @PostMapping("/certifications")
    public ResponseEntity<Certification> addCertification(@AuthenticationPrincipal UserDetails userDetails,
                                                          @RequestBody Certification cert) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(studentService.addCertification(student.getId(), cert));
    }

    @DeleteMapping("/certifications/{id}")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
        studentService.deleteCertification(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/achievements")
    public ResponseEntity<List<Achievement>> getAchievements(@AuthenticationPrincipal UserDetails userDetails) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(studentService.getAchievements(student.getId()));
    }

    @GetMapping("/roadmap")
    public ResponseEntity<List<RoadmapStep>> getRoadmap(@AuthenticationPrincipal UserDetails userDetails) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(studentService.getRoadmap(student.getId()));
    }

    @PatchMapping("/roadmap/{stepId}")
    public ResponseEntity<RoadmapStep> updateRoadmapStep(@PathVariable Long stepId,
                                                         @RequestBody Map<String, String> body) {
        String newStatus = body.getOrDefault("status", "COMPLETED");
        return ResponseEntity.ok(studentService.updateRoadmapStepStatus(stepId, newStatus));
    }
}
