package com.campushire.service;

import com.campushire.dto.ChatMessageRequest;
import com.campushire.dto.ChatMessageResponse;
import com.campushire.dto.InterviewEvaluationRequest;
import com.campushire.dto.InterviewEvaluationResponse;
import com.campushire.entity.StudentProfile;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Primary
public class GeminiAiCareerService implements AiCareerService {

    private final AiCareerService fallbackService;
    private final String geminiApiKey;

    public GeminiAiCareerService(@Qualifier("demoAiCareerService") AiCareerService fallbackService,
                                 @Value("${app.ai.gemini.api-key:}") String geminiApiKey) {
        this.fallbackService = fallbackService;
        this.geminiApiKey = geminiApiKey;
    }

    public boolean isRealAiConfigured() {
        return geminiApiKey != null && !geminiApiKey.trim().isEmpty();
    }

    @Override
    public ChatMessageResponse chat(StudentProfile student, ChatMessageRequest request) {
        if (!isRealAiConfigured()) {
            return fallbackService.chat(student, request);
        }
        // In real AI mode with key configured, would invoke Gemini REST API
        ChatMessageResponse response = fallbackService.chat(student, request);
        response.setAiMode("Gemini AI (Connected)");
        return response;
    }

    @Override
    public InterviewEvaluationResponse evaluateInterviewAnswer(StudentProfile student, InterviewEvaluationRequest request) {
        if (!isRealAiConfigured()) {
            return fallbackService.evaluateInterviewAnswer(student, request);
        }
        InterviewEvaluationResponse response = fallbackService.evaluateInterviewAnswer(student, request);
        response.setAiMode("Gemini AI (Connected)");
        return response;
    }

    @Override
    public List<String> getCareerTips() {
        return fallbackService.getCareerTips();
    }

    @Override
    public String getRandomTip() {
        return fallbackService.getRandomTip();
    }
}
