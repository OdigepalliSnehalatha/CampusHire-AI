package com.campushire.service;

import com.campushire.dto.ApplicationDto;
import com.campushire.dto.StatusUpdateRequest;
import com.campushire.entity.*;
import com.campushire.exception.BadRequestException;
import com.campushire.exception.ResourceNotFoundException;
import com.campushire.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final PlacementDriveRepository driveRepository;
    private final PlacementDriveService driveService;
    private final StudentSkillRepository skillRepository;
    private final AchievementRepository achievementRepository;
    private final NotificationRepository notificationRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                              StudentProfileRepository studentProfileRepository,
                              PlacementDriveRepository driveRepository,
                              PlacementDriveService driveService,
                              StudentSkillRepository skillRepository,
                              AchievementRepository achievementRepository,
                              NotificationRepository notificationRepository) {
        this.applicationRepository = applicationRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.driveRepository = driveRepository;
        this.driveService = driveService;
        this.skillRepository = skillRepository;
        this.achievementRepository = achievementRepository;
        this.notificationRepository = notificationRepository;
    }

    @Transactional
    public ApplicationDto apply(Long studentId, Long driveId) {
        if (applicationRepository.existsByStudentIdAndPlacementDriveId(studentId, driveId)) {
            throw new BadRequestException("You have already applied to this placement drive.");
        }

        StudentProfile student = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        PlacementDrive drive = driveRepository.findById(driveId)
                .orElseThrow(() -> new ResourceNotFoundException("Placement Drive not found"));

        List<StudentSkill> skills = skillRepository.findByStudentId(studentId);
        Set<String> skillNames = skills.stream().map(s -> s.getSkillName().toLowerCase()).collect(Collectors.toSet());
        int matchScore = driveService.calculateMatchScore(student, drive, skillNames);

        Application application = new Application(student, drive, matchScore);
        Application saved = applicationRepository.save(application);

        // Unlock "First Application" achievement
        achievementRepository.findByStudentIdAndBadgeCode(studentId, "FIRST_APPLICATION")
                .ifPresent(badge -> {
                    badge.setUnlocked(true);
                    achievementRepository.save(badge);
                });

        // Create alert notification
        Notification notification = new Notification(
                student.getUser(),
                "Application Submitted Successfully! 🎯",
                "You applied for " + drive.getTitle() + " at " + drive.getCompany().getName() + ". Match score: " + matchScore + "%",
                "JOB"
        );
        notificationRepository.save(notification);

        return convertToDto(saved);
    }

    public List<ApplicationDto> getStudentApplications(Long studentId) {
        return applicationRepository.findByStudentId(studentId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ApplicationDto> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ApplicationDto> getApplicationsByDrive(Long driveId) {
        return applicationRepository.findByPlacementDriveId(driveId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApplicationDto updateStatus(Long applicationId, StatusUpdateRequest request) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        application.setStatus(request.getStatus());
        if (request.getNotes() != null) application.setNotes(request.getNotes());
        if (request.getFeedback() != null) application.setFeedback(request.getFeedback());

        // Unlock achievements and notifications based on status progression
        Long studentId = application.getStudent().getId();
        User user = application.getStudent().getUser();

        if (request.getStatus().contains("INTERVIEW")) {
            achievementRepository.findByStudentIdAndBadgeCode(studentId, "INTERVIEW_READY")
                    .ifPresent(badge -> {
                        badge.setUnlocked(true);
                        achievementRepository.save(badge);
                    });

            Notification notif = new Notification(
                    user,
                    "Interview Stage Reached! 🎤",
                    "Your application for " + application.getPlacementDrive().getTitle() + " at "
                            + application.getPlacementDrive().getCompany().getName() + " progressed to " + request.getStatus() + "!",
                    "INTERVIEW"
            );
            notificationRepository.save(notif);
        } else if ("SELECTED".equalsIgnoreCase(request.getStatus())) {
            achievementRepository.findByStudentIdAndBadgeCode(studentId, "PLACEMENT_READY")
                    .ifPresent(badge -> {
                        badge.setUnlocked(true);
                        achievementRepository.save(badge);
                    });

            Notification notif = new Notification(
                    user,
                    "🎉 Congratulations! You have been Selected!",
                    "You received an offer for " + application.getPlacementDrive().getTitle() + " at "
                            + application.getPlacementDrive().getCompany().getName() + "!",
                    "SELECTION"
            );
            notificationRepository.save(notif);
        }

        Application saved = applicationRepository.save(application);
        return convertToDto(saved);
    }

    private ApplicationDto convertToDto(Application app) {
        ApplicationDto dto = new ApplicationDto();
        dto.setId(app.getId());
        dto.setStudentId(app.getStudent().getId());
        dto.setStudentName(app.getStudent().getUser().getFullName());
        dto.setDepartment(app.getStudent().getDepartment());
        dto.setCgpa(app.getStudent().getCgpa());
        dto.setDriveId(app.getPlacementDrive().getId());
        dto.setJobTitle(app.getPlacementDrive().getTitle());
        dto.setCompanyName(app.getPlacementDrive().getCompany().getName());
        dto.setCompanyLogo(app.getPlacementDrive().getCompany().getLogoUrl());
        dto.setLocation(app.getPlacementDrive().getLocation());
        dto.setSalaryMin(app.getPlacementDrive().getSalaryMin());
        dto.setSalaryMax(app.getPlacementDrive().getSalaryMax());
        dto.setStatus(app.getStatus());
        dto.setMatchScore(app.getMatchScore());
        dto.setAppliedDate(app.getAppliedDate());
        dto.setNotes(app.getNotes());
        return dto;
    }
}
