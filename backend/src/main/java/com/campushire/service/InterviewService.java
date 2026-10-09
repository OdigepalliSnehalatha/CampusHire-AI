package com.campushire.service;

import com.campushire.entity.Application;
import com.campushire.entity.Interview;
import com.campushire.entity.Notification;
import com.campushire.exception.ResourceNotFoundException;
import com.campushire.repository.ApplicationRepository;
import com.campushire.repository.InterviewRepository;
import com.campushire.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final ApplicationRepository applicationRepository;
    private final NotificationRepository notificationRepository;

    public InterviewService(InterviewRepository interviewRepository,
                            ApplicationRepository applicationRepository,
                            NotificationRepository notificationRepository) {
        this.interviewRepository = interviewRepository;
        this.applicationRepository = applicationRepository;
        this.notificationRepository = notificationRepository;
    }

    public List<Interview> getStudentInterviews(Long studentId) {
        return interviewRepository.findByApplicationStudentId(studentId);
    }

    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    @Transactional
    public Interview scheduleInterview(Long applicationId, Interview interview) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        interview.setApplication(application);
        Interview saved = interviewRepository.save(interview);

        // Update application status to Technical or HR Interview
        String nextStatus = interview.getInterviewType() != null && interview.getInterviewType().toLowerCase().contains("hr")
                ? "HR_INTERVIEW" : "TECHNICAL_INTERVIEW";
        application.setStatus(nextStatus);
        applicationRepository.save(application);

        // Send alert notification to student
        Notification notif = new Notification(
                application.getStudent().getUser(),
                "New Interview Scheduled! 🎤",
                interview.getInterviewType() + " interview scheduled for " + application.getPlacementDrive().getTitle()
                        + " with " + interview.getInterviewerName() + " on " + interview.getScheduledAt(),
                "INTERVIEW"
        );
        notificationRepository.save(notif);

        return saved;
    }

    @Transactional
    public Interview updateFeedback(Long interviewId, String feedback, Integer score) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));
        interview.setFeedback(feedback);
        interview.setScore(score);
        interview.setStatus("COMPLETED");
        return interviewRepository.save(interview);
    }
}
