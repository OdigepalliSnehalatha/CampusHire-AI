package com.campushire.service;

import com.campushire.dto.ChatMessageRequest;
import com.campushire.dto.ChatMessageResponse;
import com.campushire.dto.InterviewEvaluationRequest;
import com.campushire.dto.InterviewEvaluationResponse;
import com.campushire.entity.StudentProfile;

import java.util.List;

public interface AiCareerService {
    ChatMessageResponse chat(StudentProfile student, ChatMessageRequest request);
    InterviewEvaluationResponse evaluateInterviewAnswer(StudentProfile student, InterviewEvaluationRequest request);
    List<String> getCareerTips();
    String getRandomTip();
}
