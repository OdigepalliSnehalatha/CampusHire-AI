package com.campushire.service;

import com.campushire.dto.SkillGapRequest;
import com.campushire.dto.SkillGapResponse;
import com.campushire.entity.StudentProfile;
import com.campushire.entity.StudentSkill;
import com.campushire.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SkillGapService {

    private final StudentSkillRepository skillRepository;

    public SkillGapService(StudentSkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public SkillGapResponse analyzeSkillGap(StudentProfile student, SkillGapRequest request) {
        String targetRole = request != null && request.getTargetRole() != null && !request.getTargetRole().isEmpty()
                ? request.getTargetRole()
                : (student.getTargetRole() != null ? student.getTargetRole() : "Java Backend Developer");

        List<StudentSkill> existingSkills = skillRepository.findByStudentId(student.getId());

        List<SkillGapResponse.SkillItem> currentSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();
        List<String> recommendedOrder = new ArrayList<>();
        String aiInsight;
        int matchPercentage = 75;

        if (targetRole.toLowerCase().contains("java") || targetRole.toLowerCase().contains("backend")) {
            currentSkills.add(new SkillGapResponse.SkillItem("Java Core", 80, "proficient"));
            currentSkills.add(new SkillGapResponse.SkillItem("Object-Oriented Programming (OOP)", 70, "proficient"));
            currentSkills.add(new SkillGapResponse.SkillItem("Git & Version Control", 60, "proficient"));
            currentSkills.add(new SkillGapResponse.SkillItem("SQL & Database Queries", 50, "needs_improvement"));
            currentSkills.add(new SkillGapResponse.SkillItem("Spring Framework Basics", 30, "beginner"));

            missingSkills.addAll(Arrays.asList("Spring Boot 3", "RESTful APIs", "Spring Data JPA & Hibernate", "MySQL Indexing & Optimization", "Docker Basics"));
            recommendedOrder.addAll(Arrays.asList(
                    "1. Spring Boot 3 fundamentals and dependency injection",
                    "2. Building robust RESTful APIs with validation",
                    "3. Spring Data JPA repository patterns and entity relationships",
                    "4. MySQL relational database design & query tuning",
                    "5. Git branching workflows and collaboration"
            ));
            matchPercentage = 72;
            aiInsight = "You have a solid foundation in Java core and OOP! Focus next on Spring Boot and REST APIs to bridge the backend industry gap.";
        } else if (targetRole.toLowerCase().contains("data") || targetRole.toLowerCase().contains("analyst") || targetRole.toLowerCase().contains("ai")) {
            currentSkills.add(new SkillGapResponse.SkillItem("Python Programming", 75, "proficient"));
            currentSkills.add(new SkillGapResponse.SkillItem("SQL Queries", 65, "proficient"));
            currentSkills.add(new SkillGapResponse.SkillItem("Data Visualization", 55, "needs_improvement"));
            currentSkills.add(new SkillGapResponse.SkillItem("Statistics & Probability", 60, "proficient"));

            missingSkills.addAll(Arrays.asList("Pandas & NumPy", "Tableau / PowerBI", "Scikit-Learn", "Machine Learning Algorithms", "A/B Testing"));
            recommendedOrder.addAll(Arrays.asList(
                    "1. Pandas & NumPy for data manipulation",
                    "2. Advanced SQL window functions & aggregation",
                    "3. PowerBI / Tableau dashboard storytelling",
                    "4. Machine learning core concepts"
            ));
            matchPercentage = 68;
            aiInsight = "Great analytical baseline. Building a portfolio with real-world Kaggle datasets and PowerBI dashboards will make you stand out.";
        } else {
            // Full Stack / General Software Engineer
            currentSkills.add(new SkillGapResponse.SkillItem("JavaScript (ES6+)", 75, "proficient"));
            currentSkills.add(new SkillGapResponse.SkillItem("React Fundamentals", 70, "proficient"));
            currentSkills.add(new SkillGapResponse.SkillItem("HTML5 & Modern CSS", 85, "proficient"));
            currentSkills.add(new SkillGapResponse.SkillItem("Node.js / Express", 45, "beginner"));

            missingSkills.addAll(Arrays.asList("TypeScript", "State Management (Redux/Zustand)", "REST API Integration", "Next.js", "CI/CD"));
            recommendedOrder.addAll(Arrays.asList(
                    "1. TypeScript type safety in React",
                    "2. Backend API development & integration",
                    "3. Modern state management",
                    "4. Automated testing and CI/CD pipelines"
            ));
            matchPercentage = 70;
            aiInsight = "Strong UI foundations! Connecting frontends to production-grade APIs and adopting TypeScript will give you high recruiter appeal.";
        }

        return new SkillGapResponse(targetRole, matchPercentage, currentSkills, missingSkills, recommendedOrder, aiInsight);
    }
}
