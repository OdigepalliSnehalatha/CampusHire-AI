package com.campushire.service;

import com.campushire.entity.PlacementDrive;
import com.campushire.entity.StudentProfile;
import com.campushire.entity.StudentSkill;
import com.campushire.exception.ResourceNotFoundException;
import com.campushire.repository.PlacementDriveRepository;
import com.campushire.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PlacementDriveService {

    private final PlacementDriveRepository driveRepository;
    private final StudentSkillRepository skillRepository;

    public PlacementDriveService(PlacementDriveRepository driveRepository, StudentSkillRepository skillRepository) {
        this.driveRepository = driveRepository;
        this.skillRepository = skillRepository;
    }

    public List<PlacementDrive> getAllDrives() {
        return driveRepository.findAll();
    }

    public List<PlacementDrive> getActiveDrives() {
        return driveRepository.findByStatus("ACTIVE");
    }

    public PlacementDrive getDriveById(Long id) {
        return driveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Placement Drive not found: " + id));
    }

    public PlacementDrive createDrive(PlacementDrive drive) {
        return driveRepository.save(drive);
    }

    public PlacementDrive updateDrive(Long id, PlacementDrive updated) {
        PlacementDrive drive = getDriveById(id);
        drive.setTitle(updated.getTitle());
        drive.setRoleType(updated.getRoleType());
        drive.setLocation(updated.getLocation());
        drive.setSalaryMin(updated.getSalaryMin());
        drive.setSalaryMax(updated.getSalaryMax());
        drive.setMinCgpa(updated.getMinCgpa());
        drive.setEligibleDepartments(updated.getEligibleDepartments());
        drive.setGraduationYear(updated.getGraduationYear());
        drive.setRequiredSkills(updated.getRequiredSkills());
        drive.setDescription(updated.getDescription());
        drive.setDeadline(updated.getDeadline());
        drive.setStatus(updated.getStatus());
        drive.setTotalOpenings(updated.getTotalOpenings());
        return driveRepository.save(drive);
    }

    public List<Map<String, Object>> getRecommendedDrives(StudentProfile student) {
        List<PlacementDrive> activeDrives = getActiveDrives();
        List<StudentSkill> studentSkills = skillRepository.findByStudentId(student.getId());
        Set<String> studentSkillNames = studentSkills.stream()
                .map(s -> s.getSkillName().toLowerCase())
                .collect(Collectors.toSet());

        List<Map<String, Object>> recommended = new ArrayList<>();

        for (PlacementDrive drive : activeDrives) {
            int matchScore = calculateMatchScore(student, drive, studentSkillNames);
            List<String> matchReasons = getMatchReasons(student, drive, studentSkillNames);

            Map<String, Object> item = new HashMap<>();
            item.put("drive", drive);
            item.put("matchScore", matchScore);
            item.put("matchReasons", matchReasons);
            item.put("eligible", student.getCgpa() != null && student.getCgpa() >= drive.getMinCgpa());

            recommended.add(item);
        }

        // Sort descending by match score
        recommended.sort((a, b) -> Integer.compare((int) b.get("matchScore"), (int) a.get("matchScore")));
        return recommended;
    }

    public int calculateMatchScore(StudentProfile student, PlacementDrive drive, Set<String> studentSkillNames) {
        int score = 40; // Base score

        // CGPA eligibility check
        if (student.getCgpa() != null && drive.getMinCgpa() != null) {
            if (student.getCgpa() >= drive.getMinCgpa()) {
                score += 20;
            } else {
                score -= 15;
            }
        }

        // Department eligibility
        if (student.getDepartment() != null && drive.getEligibleDepartments() != null) {
            if (drive.getEligibleDepartments().toLowerCase().contains(student.getDepartment().toLowerCase())
                    || drive.getEligibleDepartments().contains("All")
                    || drive.getEligibleDepartments().toLowerCase().contains("cse")) {
                score += 15;
            }
        }

        // Graduation Year match
        if (student.getGraduationYear() != null && drive.getGraduationYear() != null
                && Objects.equals(student.getGraduationYear(), drive.getGraduationYear())) {
            score += 10;
        }

        // Skills match
        if (drive.getRequiredSkills() != null && !studentSkillNames.isEmpty()) {
            String[] reqSkills = drive.getRequiredSkills().split(",");
            int matchedSkillCount = 0;
            for (String req : reqSkills) {
                String clean = req.trim().toLowerCase();
                for (String sSkill : studentSkillNames) {
                    if (sSkill.contains(clean) || clean.contains(sSkill)) {
                        matchedSkillCount++;
                        break;
                    }
                }
            }
            if (reqSkills.length > 0) {
                score += (int) (((double) matchedSkillCount / reqSkills.length) * 15);
            }
        }

        return Math.max(10, Math.min(98, score));
    }

    private List<String> getMatchReasons(StudentProfile student, PlacementDrive drive, Set<String> studentSkillNames) {
        List<String> reasons = new ArrayList<>();
        if (student.getCgpa() != null && drive.getMinCgpa() != null && student.getCgpa() >= drive.getMinCgpa()) {
            reasons.add("CGPA requirement (" + drive.getMinCgpa() + "+) satisfied (" + student.getCgpa() + ")");
        }
        if (student.getDepartment() != null && drive.getEligibleDepartments() != null) {
            reasons.add("Department (" + student.getDepartment() + ") eligible");
        }
        if (drive.getRequiredSkills() != null) {
            String[] reqSkills = drive.getRequiredSkills().split(",");
            for (String req : reqSkills) {
                String clean = req.trim().toLowerCase();
                if (studentSkillNames.stream().anyMatch(s -> s.contains(clean) || clean.contains(s))) {
                    reasons.add("Skill match: " + req.trim());
                }
            }
        }
        if (student.getGraduationYear() != null && Objects.equals(student.getGraduationYear(), drive.getGraduationYear())) {
            reasons.add("Graduation batch (" + drive.getGraduationYear() + ") matches");
        }
        return reasons;
    }
}
