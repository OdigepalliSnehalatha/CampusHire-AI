package com.campushire.controller;

import com.campushire.dto.*;
import com.campushire.entity.StudentProfile;
import com.campushire.service.AiCareerService;
import com.campushire.service.ResumeAnalysisService;
import com.campushire.service.SkillGapService;
import com.campushire.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiCareerService aiCareerService;
    private final SkillGapService skillGapService;
    private final ResumeAnalysisService resumeAnalysisService;
    private final StudentService studentService;

    public AiController(AiCareerService aiCareerService,
                        SkillGapService skillGapService,
                        ResumeAnalysisService resumeAnalysisService,
                        StudentService studentService) {
        this.aiCareerService = aiCareerService;
        this.skillGapService = skillGapService;
        this.resumeAnalysisService = resumeAnalysisService;
        this.studentService = studentService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatMessageResponse> chat(@AuthenticationPrincipal UserDetails userDetails,
                                                    @RequestBody ChatMessageRequest request) {
        StudentProfile student = null;
        if (userDetails != null) {
            try {
                student = studentService.getProfileByEmail(userDetails.getUsername());
            } catch (Exception ignored) {}
        }
        return ResponseEntity.ok(aiCareerService.chat(student, request));
    }

    @PostMapping("/skill-gap")
    public ResponseEntity<SkillGapResponse> skillGap(@AuthenticationPrincipal UserDetails userDetails,
                                                     @RequestBody(required = false) SkillGapRequest request) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(skillGapService.analyzeSkillGap(student, request));
    }

    @PostMapping("/resume-analyze")
    public ResponseEntity<ResumeAnalysisResponse> analyzeResume(@AuthenticationPrincipal UserDetails userDetails,
                                                                @RequestBody(required = false) Map<String, String> body) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        String resumeText = body != null ? body.get("resumeText") : "";
        String fileName = body != null ? body.get("fileName") : "Resume.pdf";
        return ResponseEntity.ok(resumeAnalysisService.analyzeResume(student, resumeText, fileName));
    }

    @PostMapping("/interview-coach")
    public ResponseEntity<InterviewEvaluationResponse> evaluateInterview(@AuthenticationPrincipal UserDetails userDetails,
                                                                         @RequestBody InterviewEvaluationRequest request) {
        StudentProfile student = studentService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(aiCareerService.evaluateInterviewAnswer(student, request));
    }

    @GetMapping("/tips")
    public ResponseEntity<List<String>> getTips() {
        return ResponseEntity.ok(aiCareerService.getCareerTips());
    }

    @GetMapping("/random-tip")
    public ResponseEntity<Map<String, String>> getRandomTip() {
        return ResponseEntity.ok(Collections.singletonMap("tip", aiCareerService.getRandomTip()));
    }
}
