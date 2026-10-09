package com.campushire.config;

import com.campushire.entity.*;
import com.campushire.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final CompanyRepository companyRepository;
    private final PlacementDriveRepository driveRepository;
    private final ApplicationRepository applicationRepository;
    private final InterviewRepository interviewRepository;
    private final StudentSkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final CertificationRepository certificationRepository;
    private final AchievementRepository achievementRepository;
    private final RoadmapStepRepository roadmapStepRepository;
    private final NotificationRepository notificationRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      StudentProfileRepository studentProfileRepository,
                      CompanyRepository companyRepository,
                      PlacementDriveRepository driveRepository,
                      ApplicationRepository applicationRepository,
                      InterviewRepository interviewRepository,
                      StudentSkillRepository skillRepository,
                      ProjectRepository projectRepository,
                      CertificationRepository certificationRepository,
                      AchievementRepository achievementRepository,
                      RoadmapStepRepository roadmapStepRepository,
                      NotificationRepository notificationRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.companyRepository = companyRepository;
        this.driveRepository = driveRepository;
        this.applicationRepository = applicationRepository;
        this.interviewRepository = interviewRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.certificationRepository = certificationRepository;
        this.achievementRepository = achievementRepository;
        this.roadmapStepRepository = roadmapStepRepository;
        this.notificationRepository = notificationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return; // Seed data already loaded
        }

        String encodedPassword = passwordEncoder.encode("password123");

        // 1. Placement Officer
        User officerUser = new User("officer@campushire.ai", encodedPassword, "Dr. Rajesh Sharma", Role.PLACEMENT_OFFICER);
        userRepository.save(officerUser);

        // 2. Recruiter
        User recruiterUser = new User("recruiter@campushire.ai", encodedPassword, "Sarah Jenkins", Role.RECRUITER);
        userRepository.save(recruiterUser);

        // 3. Primary Student (Alex Chen)
        User alexUser = new User("student@campushire.ai", encodedPassword, "Alex Chen", Role.STUDENT);
        alexUser = userRepository.save(alexUser);

        StudentProfile alexProfile = new StudentProfile(alexUser, "Computer Science and Engineering", 8.4, 2026, "Java Backend Developer");
        alexProfile.setPhone("+91 98765 43210");
        alexProfile.setBio("Passionate pre-final year Computer Science student specializing in Java backend development, microservices, and distributed cloud systems.");
        alexProfile.setProfileCompletion(85);
        alexProfile.setResumeHeadline("Aspiring Java Backend Developer | Spring Boot Enthusiast | Problem Solver");
        alexProfile.setGithubUrl("https://github.com/alexchen-dev");
        alexProfile.setLinkedinUrl("https://linkedin.com/in/alexchen-dev");
        alexProfile = studentProfileRepository.save(alexProfile);

        // 4. Secondary Students
        User priyaUser = new User("priya@campushire.ai", encodedPassword, "Priya Patel", Role.STUDENT);
        userRepository.save(priyaUser);
        StudentProfile priyaProfile = new StudentProfile(priyaUser, "Information Technology", 8.9, 2026, "Full Stack Developer");
        priyaProfile.setProfileCompletion(90);
        studentProfileRepository.save(priyaProfile);

        User rohitUser = new User("rohit@campushire.ai", encodedPassword, "Rohit Verma", Role.STUDENT);
        userRepository.save(rohitUser);
        StudentProfile rohitProfile = new StudentProfile(rohitUser, "Electronics and Communication", 7.2, 2026, "Data Analyst");
        rohitProfile.setProfileCompletion(70);
        studentProfileRepository.save(rohitProfile);

        // 5. Companies
        Company techNova = companyRepository.save(new Company(
                "TechNova", "Enterprise Software & Cloud", "Hyderabad", "https://technova.example.com",
                "🏢", "TechNova is a premier global enterprise software leader building resilient cloud platforms and distributed fintech solutions.",
                8.2, 45
        ));

        Company cloudSphere = companyRepository.save(new Company(
                "CloudSphere", "Cloud Infrastructure & DevOps", "Bangalore", "https://cloudsphere.example.com",
                "☁️", "CloudSphere accelerates global enterprise transformations with scalable multi-cloud architectures and kubernetes orchestration.",
                10.0, 38
        ));

        Company dataCore = companyRepository.save(new Company(
                "DataCore", "Big Data & AI Analytics", "Pune", "https://datacore.example.com",
                "📊", "DataCore builds modern data pipelines and enterprise AI analytical engines for Fortune 500 decision intelligence.",
                7.5, 32
        ));

        Company innoSoft = companyRepository.save(new Company(
                "InnoSoft", "Product Engineering", "Chennai", "https://innosoft.example.com",
                "🚀", "InnoSoft engineers next-generation SaaS digital platforms with high user delight and ultra-fast responsive interfaces.",
                6.5, 28
        ));

        Company nextGen = companyRepository.save(new Company(
                "NextGen Technologies", "FinTech & Payments", "Noida", "https://nextgen.example.com",
                "⚡", "NextGen powers real-time cross-border financial transactions and high-frequency automated payment gateways.",
                9.0, 24
        ));

        // 6. Placement Drives
        PlacementDrive drive1 = driveRepository.save(new PlacementDrive(
                techNova, "Java Backend Developer", "Full-Time", "Hyderabad",
                6.0, 8.0, 7.5, "CSE, IT, ECE", 2026,
                "Java, Spring Boot, MySQL, REST APIs",
                "Join TechNova's core banking engineering squad. Architect resilient microservices, design scalable REST APIs, and optimize high-throughput MySQL queries.",
                LocalDate.now().plusDays(20), "ACTIVE", 15
        ));

        PlacementDrive drive2 = driveRepository.save(new PlacementDrive(
                cloudSphere, "Cloud Platform Associate", "Full-Time", "Bangalore",
                8.0, 10.0, 7.0, "CSE, IT", 2026,
                "Java, Linux, AWS, Docker, Git",
                "Collaborate with senior DevOps architects to deploy scalable containerized services across hybrid cloud environments.",
                LocalDate.now().plusDays(25), "ACTIVE", 10
        ));

        PlacementDrive drive3 = driveRepository.save(new PlacementDrive(
                nextGen, "Full Stack Software Engineer", "Full-Time", "Noida",
                7.0, 9.0, 7.0, "CSE, IT, ECE", 2026,
                "Java, React, Spring Boot, JavaScript, SQL",
                "Build dynamic interactive web portals and back-end transaction processors for our premier merchant dashboard.",
                LocalDate.now().plusDays(15), "ACTIVE", 12
        ));

        PlacementDrive drive4 = driveRepository.save(new PlacementDrive(
                dataCore, "Junior Data Analyst", "Full-Time", "Pune",
                6.0, 7.5, 6.5, "CSE, IT, ECE, EEE", 2026,
                "SQL, Python, Excel, PowerBI",
                "Extract business metrics, construct live dashboards, and analyze telemetry datasets to uncover actionable growth insights.",
                LocalDate.now().plusDays(30), "ACTIVE", 8
        ));

        PlacementDrive drive5 = driveRepository.save(new PlacementDrive(
                innoSoft, "Frontend React Engineer", "Full-Time", "Chennai",
                5.5, 7.0, 6.5, "CSE, IT", 2026,
                "React, JavaScript, HTML5, CSS3, Tailwind CSS",
                "Craft silky-smooth client interfaces, integrate asynchronous GraphQL/REST endpoints, and guarantee responsive UX.",
                LocalDate.now().plusDays(18), "ACTIVE", 10
        ));

        // 7. Student Skills for Alex
        skillRepository.save(new StudentSkill(alexProfile, "Java", 80, "Programming"));
        skillRepository.save(new StudentSkill(alexProfile, "Object-Oriented Programming (OOP)", 70, "Concepts"));
        skillRepository.save(new StudentSkill(alexProfile, "SQL & Relational DBs", 50, "Database"));
        skillRepository.save(new StudentSkill(alexProfile, "Spring Boot", 30, "Framework"));
        skillRepository.save(new StudentSkill(alexProfile, "Git & GitHub", 60, "Tool"));
        skillRepository.save(new StudentSkill(alexProfile, "REST APIs", 65, "Backend"));

        // 8. Projects for Alex
        projectRepository.save(new Project(
                alexProfile,
                "CampusHire AI Platform",
                "Architected a full-featured campus placement platform with Spring Boot REST APIs, JWT authentication, and interactive AI career counseling widgets.",
                "Java 21, Spring Boot, React, MySQL, Tailwind CSS",
                "https://github.com/OdigepalliSnehalatha/CampusHire-AI",
                "https://campushire-ai.demo.app",
                "Lead Developer"
        ));

        projectRepository.save(new Project(
                alexProfile,
                "E-Commerce Microservices Engine",
                "Developed order processing, payment gateway mock, and inventory tracking microservices with Spring Data JPA and MySQL transactions.",
                "Java, Spring Boot, Hibernate, MySQL, Docker",
                "https://github.com/alexchen-dev/ecommerce-services",
                "https://shop-engine.demo.app",
                "Backend Engineer"
        ));

        // 9. Certifications for Alex
        certificationRepository.save(new Certification(
                alexProfile,
                "Oracle Certified Associate: Java SE Programmer",
                "Oracle University",
                LocalDate.of(2026, 4, 15),
                "https://oracle.com/verify/cert-1029384"
        ));

        certificationRepository.save(new Certification(
                alexProfile,
                "Spring Boot Microservices Mastery",
                "Coursera / Meta",
                LocalDate.of(2026, 7, 20),
                "https://coursera.org/verify/SPRG-9921"
        ));

        // 10. Achievements for Alex (Lightweight Gamification)
        achievementRepository.save(new Achievement(alexProfile, "PROFILE_COMPLETE", "Profile Complete 🏆", "Achieved over 80% profile completion score", "🏆", true));
        achievementRepository.save(new Achievement(alexProfile, "FIRST_APPLICATION", "First Application 🎯", "Submitted initial placement drive application", "🎯", true));
        achievementRepository.save(new Achievement(alexProfile, "PROJECT_ADDED", "First Project Added 💻", "Showcased portfolio project with GitHub repository", "💻", true));
        achievementRepository.save(new Achievement(alexProfile, "RESUME_READY", "Resume Ready 📄", "Analyzed and polished resume for campus ATS screening", "📄", true));
        achievementRepository.save(new Achievement(alexProfile, "INTERVIEW_READY", "Interview Ready 🎤", "Practiced mock technical rounds with CareerBuddy AI", "🎤", true));
        achievementRepository.save(new Achievement(alexProfile, "PLACEMENT_READY", "Placement Ready 🚀", "Completed core roadmap milestones for target career path", "🚀", false));

        // 11. Roadmap Steps for Alex ("My Placement Roadmap")
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 1, "Java Fundamentals", "Data types, control structures, methods, and syntax basics.", "Language", "COMPLETED"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 2, "Object-Oriented Programming (OOP)", "Inheritance, Polymorphism, Abstraction, and Encapsulation.", "Concepts", "COMPLETED"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 3, "Java Collections Framework", "Lists, Sets, Maps, Queues, Iterators, and Big-O efficiency.", "Language", "COMPLETED"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 4, "SQL & Relational Databases", "Joins, aggregations, indexing, and normal forms.", "Database", "IN_PROGRESS"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 5, "Spring Boot Core", "Inversion of Control, Dependency Injection, and Spring Beans.", "Framework", "NOT_STARTED"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 6, "REST APIs & JPA", "CRUD controllers, Entity relationships, and Hibernate.", "Backend", "NOT_STARTED"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 7, "Portfolio Project Deployment", "Packaging runnable JAR, environment configurations, and documentation.", "Project", "NOT_STARTED"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 8, "Technical Mock Interviews", "System design basics, behavioral questions, and live coding practice.", "Career", "NOT_STARTED"));

        // 12. Applications for Alex
        Application app1 = new Application(alexProfile, drive1, 92);
        app1.setStatus("TECHNICAL_INTERVIEW");
        app1.setNotes("Candidate demonstrates strong Java OOP foundation. Selected for technical evaluation round.");
        app1 = applicationRepository.save(app1);

        Application app2 = new Application(alexProfile, drive2, 88);
        app2.setStatus("SHORTLISTED");
        app2.setNotes("Resume passed initial screening criteria.");
        applicationRepository.save(app2);

        // 13. Interviews for Alex
        Interview interview1 = new Interview(
                app1, "Technical Round 1", LocalDateTime.now().plusDays(2).withHour(11).withMinute(0),
                "https://meet.google.com/xyz-campushire-mock", "Prakash Rao (Senior Backend Lead)"
        );
        interviewRepository.save(interview1);

        // 14. Notifications for Alex
        notificationRepository.save(new Notification(
                alexUser, "Technical Interview Scheduled! 🎤",
                "Your Technical Round 1 for TechNova (Java Backend Developer) is scheduled for Friday at 11:00 AM.",
                "INTERVIEW"
        ));

        notificationRepository.save(new Notification(
                alexUser, "New Placement Drive Matching Your Skills 🎯",
                "TechNova just announced 15 openings for Java Backend Developer (₹6–8 LPA). Your profile match is 92%!",
                "JOB"
        ));

        notificationRepository.save(new Notification(
                alexUser, "CareerBuddy Tip of the Day 💡",
                "Review the internal workings of HashMap before your TechNova interview round!",
                "AI_TIP"
        ));
    }
}
