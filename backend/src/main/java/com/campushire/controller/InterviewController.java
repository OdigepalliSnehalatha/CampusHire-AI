package com.campushire.controller;

import com.campushire.entity.Interview;
import com.campushire.entity.StudentProfile;
import com.campushire.service.InterviewService;
import com.campushire.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;
    private final StudentService studentService;

    public InterviewController(InterviewService interviewService, StudentService studentService) {
        this.interviewService = interviewService;
        this.studentService = studentService;
    }

    @GetMapping("/my-interviews")
    public ResponseEntity<List<Interview>> getMyInterviews(@AuthenticationPrincipal UserDetails userDetails) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(interviewService.getStudentInterviews(student.getId()));
    }

    @GetMapping
    public ResponseEntity<List<Interview>> getAllInterviews() {
        return ResponseEntity.ok(interviewService.getAllInterviews());
    }

    @PostMapping("/schedule/{applicationId}")
    public ResponseEntity<Interview> scheduleInterview(@PathVariable Long applicationId,
                                                       @RequestBody Interview interview) {
        return ResponseEntity.ok(interviewService.scheduleInterview(applicationId, interview));
    }

    @PatchMapping("/{id}/feedback")
    public ResponseEntity<Interview> updateFeedback(@PathVariable Long id,
                                                    @RequestBody Map<String, Object> body) {
        String feedback = (String) body.get("feedback");
        Integer score = body.get("score") != null ? ((Number) body.get("score")).intValue() : null;
        return ResponseEntity.ok(interviewService.updateFeedback(id, feedback, score));
    }
}
