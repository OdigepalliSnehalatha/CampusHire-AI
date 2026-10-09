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

        // 1. Placement Officer & Recruiter
        User officerUser = new User("officer@campushire.ai", encodedPassword, "Dr. Rajesh Sharma", Role.PLACEMENT_OFFICER);
        userRepository.save(officerUser);

        User recruiterUser = new User("recruiter@campushire.ai", encodedPassword, "Sarah Jenkins", Role.RECRUITER);
        userRepository.save(recruiterUser);

        // 2. Prototype Student 1: Alex Chen (Java Backend Developer)
        User alexUser = new User("alex@campushire.ai", encodedPassword, "Alex Chen", Role.STUDENT);
        alexUser = userRepository.save(alexUser);
        User studentUser = new User("student@campushire.ai", encodedPassword, "Alex Chen", Role.STUDENT);
        studentUser = userRepository.save(studentUser);

        StudentProfile alexProfile = new StudentProfile(alexUser, "Computer Science and Engineering", 8.6, 2026, "Java Backend Developer");
        alexProfile.setPhone("+91 98765 43210");
        alexProfile.setBio("Passionate pre-final year CSE student specializing in Java backend development, Spring Boot microservices, and distributed cloud systems.");
        alexProfile.setProfileCompletion(88);
        alexProfile.setResumeHeadline("Aspiring Java Backend Developer | Spring Boot Enthusiast | Problem Solver");
        alexProfile.setGithubUrl("https://github.com/alexchen-dev");
        alexProfile.setLinkedinUrl("https://linkedin.com/in/alexchen-dev");
        alexProfile = studentProfileRepository.save(alexProfile);

        StudentProfile studentProfile = new StudentProfile(studentUser, "Computer Science and Engineering", 8.6, 2026, "Java Backend Developer");
        studentProfile.setProfileCompletion(88);
        studentProfileRepository.save(studentProfile);

        // Prototype Student 2: Priya Patel (Full Stack React & Cloud)
        User priyaUser = new User("priya@campushire.ai", encodedPassword, "Priya Patel", Role.STUDENT);
        priyaUser = userRepository.save(priyaUser);
        StudentProfile priyaProfile = new StudentProfile(priyaUser, "Information Technology", 9.2, 2026, "Full Stack React & Cloud Engineer");
        priyaProfile.setPhone("+91 98123 45678");
        priyaProfile.setBio("Top-ranking IT student passionate about building highly interactive React web apps, TypeScript architectures, and scalable AWS cloud backends.");
        priyaProfile.setProfileCompletion(95);
        priyaProfile.setResumeHeadline("Full Stack Engineer | React & TypeScript Enthusiast | AWS Certified Cloud Practitioner");
        priyaProfile.setGithubUrl("https://github.com/priyapatel-tech");
        priyaProfile.setLinkedinUrl("https://linkedin.com/in/priyapatel-tech");
        priyaProfile = studentProfileRepository.save(priyaProfile);

        // Prototype Student 3: Rohit Verma (Embedded Systems & IoT)
        User rohitUser = new User("rohit@campushire.ai", encodedPassword, "Rohit Verma", Role.STUDENT);
        rohitUser = userRepository.save(rohitUser);
        StudentProfile rohitProfile = new StudentProfile(rohitUser, "Electronics and Communication", 7.8, 2026, "Embedded Systems & IoT Engineer");
        rohitProfile.setPhone("+91 97234 56789");
        rohitProfile.setBio("ECE enthusiast passionate about embedded C/C++, IoT device gateways, RTOS firmware development, and hardware telemetry.");
        rohitProfile.setProfileCompletion(78);
        rohitProfile.setResumeHeadline("Embedded Systems Engineer | C/C++ Developer | RTOS & IoT Specialist");
        rohitProfile.setGithubUrl("https://github.com/rohitverma-ece");
        rohitProfile.setLinkedinUrl("https://linkedin.com/in/rohitverma-ece");
        rohitProfile = studentProfileRepository.save(rohitProfile);

        // Prototype Student 4: Ananya Sharma (AI & Machine Learning)
        User ananyaUser = new User("ananya@campushire.ai", encodedPassword, "Ananya Sharma", Role.STUDENT);
        ananyaUser = userRepository.save(ananyaUser);
        StudentProfile ananyaProfile = new StudentProfile(ananyaUser, "Computer Science (AI/ML)", 8.9, 2026, "AI & Machine Learning Engineer");
        ananyaProfile.setPhone("+91 96345 67890");
        ananyaProfile.setBio("Machine learning practitioner specializing in NLP transformers, computer vision pipelines, and PyTorch deep models.");
        ananyaProfile.setProfileCompletion(92);
        ananyaProfile.setResumeHeadline("AI & Data Science Engineer | PyTorch & NLP Specialist | Deep Learning Researcher");
        ananyaProfile.setGithubUrl("https://github.com/ananyasharma-ai");
        ananyaProfile.setLinkedinUrl("https://linkedin.com/in/ananyasharma-ai");
        ananyaProfile = studentProfileRepository.save(ananyaProfile);

        // Prototype Student 5: Kavya Reddy (Cloud DevOps & QA Automation)
        User kavyaUser = new User("kavya@campushire.ai", encodedPassword, "Kavya Reddy", Role.STUDENT);
        kavyaUser = userRepository.save(kavyaUser);
        StudentProfile kavyaProfile = new StudentProfile(kavyaUser, "Electrical and Electronics Engineering", 8.2, 2026, "Cloud DevOps & QA Automation Engineer");
        kavyaProfile.setPhone("+91 95456 78901");
        kavyaProfile.setBio("EEE student with strong passion for test automation frameworks (Selenium, JUnit), CI/CD pipelines, and cloud reliability.");
        kavyaProfile.setProfileCompletion(84);
        kavyaProfile.setResumeHeadline("QA Automation Engineer | Selenium & CI/CD Enthusiast | Cloud DevOps Associate");
        kavyaProfile.setGithubUrl("https://github.com/kavyareddy-qa");
        kavyaProfile.setLinkedinUrl("https://linkedin.com/in/kavyareddy-qa");
        kavyaProfile = studentProfileRepository.save(kavyaProfile);

        // 3. Real Companies
        Company google = companyRepository.save(new Company(
                "Google", "Cloud, Search & Artificial Intelligence", "Bangalore & Hyderabad", "https://careers.google.com",
                "🌐", "Google is a global technology leader focusing on search, cloud computing, software, artificial intelligence, and cutting-edge research.",
                22.5, 42
        ));

        Company microsoft = companyRepository.save(new Company(
                "Microsoft", "Enterprise Cloud, OS & AI Platforms", "Hyderabad & Bangalore", "https://careers.microsoft.com",
                "💻", "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
                19.8, 55
        ));

        Company amazon = companyRepository.save(new Company(
                "Amazon", "E-Commerce, AWS Cloud & Logistics", "Hyderabad & Bangalore", "https://amazon.jobs",
                "📦", "Amazon is guided by customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.",
                16.5, 60
        ));

        Company oracle = companyRepository.save(new Company(
                "Oracle", "Enterprise Databases, Java SE & Cloud Infrastructure", "Bangalore & Hyderabad", "https://oracle.com/careers",
                "🏛️", "Oracle offers integrated suites of applications plus autonomous cloud infrastructure, maintaining core Java stewardship.",
                13.5, 48
        ));

        Company tcs = companyRepository.save(new Company(
                "Tata Consultancy Services (TCS)", "Global IT Services & Digital Consulting", "Mumbai & Pan-India", "https://tcs.com/careers",
                "🏢", "TCS is an IT services, consulting and business solutions leader powering global enterprises with Digital and Innovator cadres.",
                8.5, 120
        ));

        Company infosys = companyRepository.save(new Company(
                "Infosys", "Next-Gen Digital Services & Consulting", "Bangalore & Pan-India", "https://infosys.com/careers",
                "🔷", "Infosys is a global leader in next-generation digital services and consulting, empowering clients across 50+ countries.",
                8.0, 95
        ));

        // 4. Real Placement Drives
        PlacementDrive driveOracle = driveRepository.save(new PlacementDrive(
                oracle, "Java Backend Developer", "Full-Time", "Bangalore & Hyderabad",
                10.0, 14.0, 7.5, "CSE, IT, ECE", 2026,
                "Java, Spring Boot, MySQL, REST APIs, Microservices",
                "Join Oracle Cloud Infrastructure squad. Architect resilient microservices, develop robust REST APIs with Spring Boot, and optimize high-throughput distributed database queries.",
                LocalDate.now().plusDays(20), "ACTIVE", 18
        ));

        PlacementDrive driveMicrosoft = driveRepository.save(new PlacementDrive(
                microsoft, "Software Development Engineer (SDE I)", "Full-Time", "Hyderabad & Bangalore",
                16.0, 22.0, 7.5, "CSE, IT, ECE", 2026,
                "Data Structures, OOP, Cloud Services, Java/C#, System Design",
                "Develop large-scale distributed systems and customer-facing cloud features for Microsoft Azure and developer ecosystems.",
                LocalDate.now().plusDays(25), "ACTIVE", 20
        ));

        PlacementDrive driveAmazon = driveRepository.save(new PlacementDrive(
                amazon, "Cloud Platform Associate", "Full-Time", "Hyderabad & Bangalore",
                14.0, 18.0, 7.0, "CSE, IT, ECE", 2026,
                "Java, Linux, AWS, Docker, Git, Networking",
                "Collaborate with senior DevOps architects to deploy scalable containerized services across AWS global infrastructure.",
                LocalDate.now().plusDays(15), "ACTIVE", 25
        ));

        PlacementDrive driveGoogle = driveRepository.save(new PlacementDrive(
                google, "Software Engineer - Campus Graduate", "Full-Time", "Bangalore & Hyderabad",
                18.0, 24.0, 8.0, "CSE, IT", 2026,
                "Algorithms, Data Structures, Java/C++/Python, Distributed Systems",
                "Solve complex algorithmic engineering challenges at global scale, contributing to core Google infrastructure and cloud platforms.",
                LocalDate.now().plusDays(30), "ACTIVE", 15
        ));

        PlacementDrive driveTcs = driveRepository.save(new PlacementDrive(
                tcs, "Digital Cadre Systems Engineer", "Full-Time", "Mumbai & Pune",
                7.0, 9.0, 6.5, "CSE, IT, ECE, EEE", 2026,
                "Java, Python, Cloud Fundamentals, Web Tech",
                "Join the premier TCS Digital cadre, building cutting-edge enterprise cloud platforms and modern digital automations.",
                LocalDate.now().plusDays(18), "ACTIVE", 45
        ));

        PlacementDrive driveInfosys = driveRepository.save(new PlacementDrive(
                infosys, "Specialist Programmer (Power Programmer)", "Full-Time", "Bangalore & Hyderabad",
                8.0, 10.5, 6.5, "CSE, IT, ECE, EEE", 2026,
                "Full Stack, Java/Python, Spring Boot, Microservices, DevOps",
                "Elite programming role at Infosys focused on rapid innovation, complex full-stack engineering, and microservices architecture.",
                LocalDate.now().plusDays(22), "ACTIVE", 35
        ));

        // 5. Student Skills for Alex
        skillRepository.save(new StudentSkill(alexProfile, "Java", 85, "Programming"));
        skillRepository.save(new StudentSkill(alexProfile, "Object-Oriented Programming (OOP)", 75, "Concepts"));
        skillRepository.save(new StudentSkill(alexProfile, "SQL & Relational DBs", 70, "Database"));
        skillRepository.save(new StudentSkill(alexProfile, "Spring Boot", 75, "Framework"));
        skillRepository.save(new StudentSkill(alexProfile, "Git & GitHub", 80, "Tool"));
        skillRepository.save(new StudentSkill(alexProfile, "REST APIs & Microservices", 80, "Backend"));
        skillRepository.save(new StudentSkill(alexProfile, "Docker", 65, "Cloud"));

        // Skills for Priya
        skillRepository.save(new StudentSkill(priyaProfile, "React", 92, "Frontend"));
        skillRepository.save(new StudentSkill(priyaProfile, "TypeScript", 85, "Programming"));
        skillRepository.save(new StudentSkill(priyaProfile, "Node.js", 82, "Backend"));
        skillRepository.save(new StudentSkill(priyaProfile, "AWS Cloud", 78, "Cloud"));

        // Skills for Rohit
        skillRepository.save(new StudentSkill(rohitProfile, "C/C++", 82, "Programming"));
        skillRepository.save(new StudentSkill(rohitProfile, "Embedded Linux", 75, "System"));
        skillRepository.save(new StudentSkill(rohitProfile, "Microcontrollers", 85, "Hardware"));

        // Skills for Ananya
        skillRepository.save(new StudentSkill(ananyaProfile, "Python", 94, "Programming"));
        skillRepository.save(new StudentSkill(ananyaProfile, "PyTorch", 85, "AI/ML"));
        skillRepository.save(new StudentSkill(ananyaProfile, "NLP & LLMs", 82, "AI/ML"));

        // Skills for Kavya
        skillRepository.save(new StudentSkill(kavyaProfile, "Java", 78, "Programming"));
        skillRepository.save(new StudentSkill(kavyaProfile, "Selenium WebDriver", 85, "QA"));
        skillRepository.save(new StudentSkill(kavyaProfile, "CI/CD & Jenkins", 70, "DevOps"));

        // 6. Projects for Alex
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

        // 7. Certifications for Alex
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

        // 8. Achievements for Alex
        achievementRepository.save(new Achievement(alexProfile, "PROFILE_COMPLETE", "Profile Complete 🏆", "Achieved over 85% profile completion score", "🏆", true));
        achievementRepository.save(new Achievement(alexProfile, "FIRST_APPLICATION", "First Application 🎯", "Submitted initial placement drive application", "🎯", true));
        achievementRepository.save(new Achievement(alexProfile, "PROJECT_ADDED", "First Project Added 💻", "Showcased portfolio project with GitHub repository", "💻", true));
        achievementRepository.save(new Achievement(alexProfile, "RESUME_READY", "Resume Ready 📄", "Analyzed and polished resume for campus ATS screening", "📄", true));
        achievementRepository.save(new Achievement(alexProfile, "INTERVIEW_READY", "Interview Ready 🎤", "Practiced mock technical rounds with CareerBuddy AI", "🎤", true));
        achievementRepository.save(new Achievement(alexProfile, "PLACEMENT_READY", "Placement Ready 🚀", "Completed core roadmap milestones for target career path", "🚀", false));

        // 9. Roadmap Steps for Alex
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 1, "Java Fundamentals", "Data types, control structures, methods, and syntax basics.", "Language", "COMPLETED"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 2, "Object-Oriented Programming (OOP)", "Inheritance, Polymorphism, Abstraction, and Encapsulation.", "Concepts", "COMPLETED"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 3, "Java Collections Framework", "Lists, Sets, Maps, Queues, Iterators, and Big-O efficiency.", "Language", "COMPLETED"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 4, "SQL & Relational Databases", "Joins, aggregations, indexing, and normal forms.", "Database", "COMPLETED"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 5, "Spring Boot Core", "Inversion of Control, Dependency Injection, and Spring Beans.", "Framework", "IN_PROGRESS"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 6, "REST APIs & JPA", "CRUD controllers, Entity relationships, and Hibernate.", "Backend", "IN_PROGRESS"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 7, "Portfolio Project Deployment", "Packaging runnable JAR, environment configurations, and documentation.", "Project", "NOT_STARTED"));
        roadmapStepRepository.save(new RoadmapStep(alexProfile, 8, "Technical Mock Interviews", "System design basics, behavioral questions, and live coding practice.", "Career", "NOT_STARTED"));

        // 10. Applications for Cohort
        Application appAlex1 = new Application(alexProfile, driveOracle, 94);
        appAlex1.setStatus("TECHNICAL_INTERVIEW");
        appAlex1.setNotes("Candidate demonstrates strong Java OOP and Spring Boot foundation. Shortlisted for Technical Evaluation Round 1.");
        appAlex1 = applicationRepository.save(appAlex1);

        Application appAlex2 = new Application(alexProfile, driveGoogle, 86);
        appAlex2.setStatus("SHORTLISTED");
        appAlex2.setNotes("Resume and coding test passed initial screening criteria. Awaiting slot confirmation.");
        applicationRepository.save(appAlex2);

        Application appPriya = new Application(priyaProfile, driveMicrosoft, 98);
        appPriya.setStatus("SELECTED");
        appPriya.setNotes("Outstanding technical performance across all rounds. Offer letter extended: ₹20 LPA.");
        applicationRepository.save(appPriya);

        Application appRohit = new Application(rohitProfile, driveTcs, 84);
        appRohit.setStatus("SHORTLISTED");
        appRohit.setNotes("Selected for Digital Cadre assessment based on C/C++ and IoT project portfolio.");
        applicationRepository.save(appRohit);

        Application appAnanya = new Application(ananyaProfile, driveAmazon, 92);
        appAnanya.setStatus("TECHNICAL_INTERVIEW");
        appAnanya.setNotes("Technical assessment score: 95/100. Scheduled for Technical Interview Round 2.");
        applicationRepository.save(appAnanya);

        Application appKavya = new Application(kavyaProfile, driveInfosys, 90);
        appKavya.setStatus("SELECTED");
        appKavya.setNotes("Cleared HackWithInfy grand challenge. Selected as Specialist Programmer at ₹9.5 LPA.");
        applicationRepository.save(appKavya);

        // 11. Interviews
        Interview interview1 = new Interview(
                appAlex1, "Technical Round 1 (System & Java Core)", LocalDateTime.now().plusDays(2).withHour(11).withMinute(0),
                "https://meet.google.com/xyz-campushire-oracle", "Sanjay Deshmukh (Principal Architect)"
        );
        interviewRepository.save(interview1);

        Interview interview2 = new Interview(
                appAnanya, "Technical Round 2 (Algorithms & AWS)", LocalDateTime.now().plusDays(4).withHour(14).withMinute(30),
                "https://chime.aws/campushire-amzn-mock", "Deepa Nair (Senior DevOps Lead)"
        );
        interviewRepository.save(interview2);

        // 12. Notifications
        notificationRepository.save(new Notification(
                alexUser, "Oracle Technical Interview Scheduled! 🏛️",
                "Your Technical Round 1 for Oracle (Java Backend Developer) is scheduled for Friday at 11:00 AM.",
                "INTERVIEW"
        ));

        notificationRepository.save(new Notification(
                alexUser, "New Google Placement Drive Active 🌐",
                "Google announced 15 openings for Campus Software Engineers (₹18–24 LPA). Your profile match is 86%!",
                "JOB"
        ));

        notificationRepository.save(new Notification(
                alexUser, "CareerBuddy Tip of the Day 💡",
                "Review Java Memory Model, Garbage Collection tuning, and HashMap collisions before your Oracle round!",
                "AI_TIP"
        ));
    }
}
