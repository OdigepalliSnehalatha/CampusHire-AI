package com.campushire.service;

import com.campushire.entity.*;
import com.campushire.exception.ResourceNotFoundException;
import com.campushire.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {

    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final StudentSkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final CertificationRepository certificationRepository;
    private final AchievementRepository achievementRepository;
    private final RoadmapStepRepository roadmapStepRepository;

    public StudentService(StudentProfileRepository studentProfileRepository,
                          UserRepository userRepository,
                          StudentSkillRepository skillRepository,
                          ProjectRepository projectRepository,
                          CertificationRepository certificationRepository,
                          AchievementRepository achievementRepository,
                          RoadmapStepRepository roadmapStepRepository) {
        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.certificationRepository = certificationRepository;
        this.achievementRepository = achievementRepository;
        this.roadmapStepRepository = roadmapStepRepository;
    }

    public StudentProfile getProfileByUserId(Long userId) {
        return studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for user: " + userId));
    }

    public StudentProfile getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        return getProfileByUserId(user.getId());
    }

    @Transactional
    public StudentProfile updateProfile(Long userId, StudentProfile updated) {
        StudentProfile profile = getProfileByUserId(userId);
        if (updated.getDepartment() != null) profile.setDepartment(updated.getDepartment());
        if (updated.getCgpa() != null) profile.setCgpa(updated.getCgpa());
        if (updated.getGraduationYear() != null) profile.setGraduationYear(updated.getGraduationYear());
        if (updated.getPhone() != null) profile.setPhone(updated.getPhone());
        if (updated.getBio() != null) profile.setBio(updated.getBio());
        if (updated.getTargetRole() != null) profile.setTargetRole(updated.getTargetRole());
        if (updated.getResumeHeadline() != null) profile.setResumeHeadline(updated.getResumeHeadline());
        if (updated.getResumeUrl() != null) profile.setResumeUrl(updated.getResumeUrl());
        if (updated.getLinkedinUrl() != null) profile.setLinkedinUrl(updated.getLinkedinUrl());
        if (updated.getGithubUrl() != null) profile.setGithubUrl(updated.getGithubUrl());

        recalculateProfileCompletion(profile);
        return studentProfileRepository.save(profile);
    }

    public List<StudentSkill> getSkills(Long studentId) {
        return skillRepository.findByStudentId(studentId);
    }

    @Transactional
    public StudentSkill addSkill(Long studentId, StudentSkill skill) {
        StudentProfile profile = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        skill.setStudent(profile);
        StudentSkill saved = skillRepository.save(skill);
        recalculateProfileCompletion(profile);
        return saved;
    }

    @Transactional
    public void deleteSkill(Long skillId) {
        skillRepository.deleteById(skillId);
    }

    public List<Project> getProjects(Long studentId) {
        return projectRepository.findByStudentId(studentId);
    }

    @Transactional
    public Project addProject(Long studentId, Project project) {
        StudentProfile profile = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        project.setStudent(profile);
        Project saved = projectRepository.save(project);

        // Unlock "First Project Added" achievement if not unlocked
        achievementRepository.findByStudentIdAndBadgeCode(studentId, "PROJECT_ADDED")
                .ifPresent(badge -> {
                    badge.setUnlocked(true);
                    achievementRepository.save(badge);
                });

        recalculateProfileCompletion(profile);
        return saved;
    }

    @Transactional
    public void deleteProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    public List<Certification> getCertifications(Long studentId) {
        return certificationRepository.findByStudentId(studentId);
    }

    @Transactional
    public Certification addCertification(Long studentId, Certification certification) {
        StudentProfile profile = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        certification.setStudent(profile);
        Certification saved = certificationRepository.save(certification);
        recalculateProfileCompletion(profile);
        return saved;
    }

    @Transactional
    public void deleteCertification(Long certId) {
        certificationRepository.deleteById(certId);
    }

    public List<Achievement> getAchievements(Long studentId) {
        return achievementRepository.findByStudentId(studentId);
    }

    public List<RoadmapStep> getRoadmap(Long studentId) {
        return roadmapStepRepository.findByStudentIdOrderByStepNumberAsc(studentId);
    }

    @Transactional
    public RoadmapStep updateRoadmapStepStatus(Long stepId, String newStatus) {
        RoadmapStep step = roadmapStepRepository.findById(stepId)
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap step not found"));
        step.setStatus(newStatus);
        return roadmapStepRepository.save(step);
    }

    public List<StudentProfile> getAllStudents() {
        return studentProfileRepository.findAll();
    }

    private void recalculateProfileCompletion(StudentProfile profile) {
        int score = 30; // base registered
        if (profile.getCgpa() != null && profile.getCgpa() > 0) score += 10;
        if (profile.getDepartment() != null && !profile.getDepartment().isEmpty()) score += 10;
        if (profile.getBio() != null && !profile.getBio().isEmpty()) score += 10;
        if (profile.getResumeHeadline() != null && !profile.getResumeHeadline().isEmpty()) score += 10;

        List<StudentSkill> skills = skillRepository.findByStudentId(profile.getId());
        if (!skills.isEmpty()) score += 15;

        List<Project> projects = projectRepository.findByStudentId(profile.getId());
        if (!projects.isEmpty()) score += 15;

        profile.setProfileCompletion(Math.min(100, score));
        studentProfileRepository.save(profile);
    }
}
