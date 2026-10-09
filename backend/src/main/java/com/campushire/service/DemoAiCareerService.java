package com.campushire.service;

import com.campushire.dto.ChatMessageRequest;
import com.campushire.dto.ChatMessageResponse;
import com.campushire.dto.InterviewEvaluationRequest;
import com.campushire.dto.InterviewEvaluationResponse;
import com.campushire.entity.StudentProfile;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("demoAiCareerService")
public class DemoAiCareerService implements AiCareerService {

    private final List<String> careerTips = Arrays.asList(
            "Don't try to learn 10 technologies at once. Master the core fundamentals first.",
            "One well-documented, deployed project is worth more to a recruiter than five half-finished tutorial clones.",
            "Practice explaining your code out loud. Technical interviews evaluate how clearly you communicate your thought process.",
            "Write clean commit messages in Git. Recruiters love seeing realistic engineering practices on GitHub.",
            "Review your core data structures (Arrays, HashMaps, Trees) before deep-diving into complex frameworks.",
            "Prepare 2-3 genuine questions to ask your interviewer at the end of each placement round.",
            "Consistent daily practice of 1-2 coding problems beats cramming 30 problems the night before a placement test.",
            "Don't worry about knowing every library; demonstrate strong problem-solving and eagerness to learn."
    );

    @Override
    public ChatMessageResponse chat(StudentProfile student, ChatMessageRequest request) {
        String userText = request.getMessage() != null ? request.getMessage().trim().toLowerCase() : "";
        String studentName = (student != null && student.getUser() != null && student.getUser().getFullName() != null)
                ? student.getUser().getFullName().split(" ")[0] : "there";

        String reply;
        List<String> suggestedActions = Arrays.asList(
                "💼 Find suitable jobs",
                "📄 Improve my resume",
                "🎯 Check my skills",
                "🎤 Prepare for interview",
                "📚 What should I learn?",
                "💡 Give me career advice"
        );
        List<ChatMessageResponse.CareerPathSuggestion> careerSuggestions = new ArrayList<>();

        double cgpa = (student != null && student.getCgpa() != null) ? student.getCgpa() : 8.5;
        int completion = (student != null && student.getProfileCompletion() != null) ? student.getProfileCompletion() : 85;
        String dept = (student != null && student.getDepartment() != null) ? student.getDepartment() : "Computer Science";
        String targetRole = (student != null && student.getTargetRole() != null) ? student.getTargetRole() : "Java Backend Developer";

        if (userText.contains("performance") || userText.contains("dashboard") || userText.contains("suggestion") || userText.contains("encourage") || userText.contains("how am i doing")) {
            String tierHeader = cgpa >= 9.0 ? "🌟 Exceptional Placement Readiness (Top Tier)"
                    : cgpa >= 8.0 ? "🚀 High Placement Potential (Top 10% Bracket)"
                    : "🌱 Steady Progress & Strong Practical Potential";

            reply = "Hi " + studentName + "! 🐰🎓 Here is your personalized performance breakdown from CareerBuddy:\n\n" +
                    tierHeader + "\n" +
                    "• **CGPA:** " + cgpa + " (" + dept + ")\n" +
                    "• **Profile Completion:** " + completion + "% Ready\n" +
                    "• **Target Role:** " + targetRole + "\n\n" +
                    (cgpa >= 8.0 
                        ? "Your strong " + cgpa + " CGPA comfortably qualifies you for **95%+ campus placement drives** (Oracle, Google, TCS Digital)! You are in prime shape to convert high-package offers." 
                        : "Focus on demonstrated coding grit and hands-on GitHub projects—recruiters prioritize problem solvers over test scores!") + "\n\n" +
                    "### 🎯 3 High-Impact Suggestions For You:\n" +
                    "1. 💻 **Daily Problem Solving:** Solve 2 LeetCode Medium problems daily on Arrays, HashMaps, and Binary Trees.\n" +
                    "2. ☕ **Framework Depth:** Strengthen Spring Boot, REST APIs, and SQL query optimizations.\n" +
                    "3. 🎤 **Interview Polish:** Practice explaining your projects clearly using the STAR method.\n\n" +
                    "Keep moving forward with confidence! 💙";
        } else if (userText.contains("scared") || userText.contains("won't get placed") || userText.contains("wont get placed") || userText.contains("fear")) {
            reply = "That's completely normal, " + studentName + ". 🌱\n\n" +
                    "You don't need to know everything today. Placement prep is a gradual marathon, not an overnight sprint.\n\n" +
                    "Let's focus on one manageable step at a time. Based on your profile:\n" +
                    "1. Strengthen your core Java fundamentals (OOP, Collections).\n" +
                    "2. Practice 2 coding problems every day.\n" +
                    "3. Build one strong, deployed project showcasing clean architecture.\n" +
                    "4. Practice explaining your projects with clarity.\n\n" +
                    "You are making real progress by showing up and preparing. Keep going! 💙";
        } else if (userText.contains("failed") || userText.contains("rejected")) {
            reply = "I hear you, and it hurts. But please remember: every engineer you admire has failed multiple placement rounds. 💡\n\n" +
                    "An interview rejection is not a reflection of your potential—it's simply feedback on where to calibrate:\n" +
                    "• Did the questions catch you off guard on theory or coding syntax?\n" +
                    "• Did you have trouble articulating your approach clearly?\n\n" +
                    "Write down every question you remember from that round today while it's fresh. Turn that into your study checklist for the next company drive!";
        } else if (userText.contains("cgpa") || userText.contains("low cgpa") || userText.contains("marks")) {
            reply = "While some companies set initial CGPA cutoffs (often 6.5 or 7.0), many modern product startups and high-growth recruiters prioritize demonstrated problem-solving, real projects, and coding ability above raw grades.\n\n" +
                    "Here is your high-impact action plan:\n" +
                    "1. Build a stellar GitHub portfolio with live deployed demos.\n" +
                    "2. Excel in online coding assessments (HackerRank, LeetCode).\n" +
                    "3. Showcase specialized skills (e.g. Spring Boot, REST APIs, System Design basics).\n\n" +
                    "Let your tangible code speak louder than test scores!";
        } else if (userText.contains("resume")) {
            reply = "Here are 4 quick high-impact tweaks for your placement resume:\n\n" +
                    "1. **Use Action Verbs + Metrics:** Replace 'worked on backend' with 'Engineered REST APIs using Spring Boot, reducing response time by 25%'.\n" +
                    "2. **Feature Clean GitHub Links:** Include direct clickable links to source code and live deployed demos.\n" +
                    "3. **Match Keywords:** Tailor technical keywords (e.g., JPA, Hibernate, MySQL, Docker) to the specific job description.\n" +
                    "4. **Keep it 1 Page:** Placement officers and recruiters review dozens of resumes; keep it concise and crisp!\n\n" +
                    "Would you like to run our automated ATS Resume Check now?";
        } else if (userText.contains("interview") || userText.contains("prepare for interview")) {
            reply = "Technical interviews generally follow a 3-part formula:\n\n" +
                    "1. **Core Language & OOP (30%):** Explain differences clearly (e.g. Interface vs Abstract Class, ArrayList vs LinkedList, JVM memory layout).\n" +
                    "2. **Data Structures & Problem Solving (40%):** Clarify problem constraints first, speak your thought process before writing code, and state time/space complexities.\n" +
                    "3. **Your Projects & Architecture (30%):** Be ready to explain the database schema, design decisions, and challenges you overcame.\n\n" +
                    "Try our interactive **AI Interview Coach** from the sidebar to practice with instant feedback!";
        } else if (userText.contains("career advice") || userText.contains("career path") || userText.contains("role")) {
            reply = "Based on your academic profile, here are high-potential career pathways aligned with current hiring trends:";

            careerSuggestions.add(new ChatMessageResponse.CareerPathSuggestion(
                    "Java Backend Developer",
                    "High industry demand across enterprise & fintech companies; matches your Java & Database coursework.",
                    Arrays.asList("Java 17+", "Spring Boot", "MySQL/PostgreSQL", "REST APIs"),
                    Arrays.asList("Spring Data JPA", "Spring Security", "Docker Basics"),
                    "Java Fundamentals -> Spring Boot -> JPA & Database queries -> Mock Interviews"
            ));

            careerSuggestions.add(new ChatMessageResponse.CareerPathSuggestion(
                    "Full Stack Software Engineer",
                    "Broad hiring opportunities across SaaS companies looking for end-to-end builders.",
                    Arrays.asList("JavaScript/React", "Java or Node.js", "Git", "REST APIs"),
                    Arrays.asList("State Management", "Tailwind CSS", "Cloud Deployment"),
                    "React UI -> Spring Boot REST API -> Integrated Full Stack Project"
            ));

            careerSuggestions.add(new ChatMessageResponse.CareerPathSuggestion(
                    "Data Analyst / BI Engineer",
                    "Strong fit if you enjoy data storytelling, SQL optimization, and analytics dashboards.",
                    Arrays.asList("SQL", "Python", "Excel", "Data Modeling"),
                    Arrays.asList("PowerBI / Tableau", "Pandas", "Statistical Analysis"),
                    "Advanced SQL -> Python Pandas -> Business Dashboards portfolio"
            ));
        } else if (userText.contains("learn") || userText.contains("roadmap") || userText.contains("what should i learn")) {
            reply = "Here is a high-leverage 30-Day Placement Sprint plan for backend readiness:\n\n" +
                    "• **Week 1 (Days 1–7): Core Java & OOP Deep Dive**\n" +
                    "  Polymorphism, Abstraction, Collections Framework internals, Exception Handling.\n\n" +
                    "• **Week 2 (Days 8–14): Relational Databases & SQL**\n" +
                    "  Complex Joins, Indexing, Group By, Schema Normalization.\n\n" +
                    "• **Week 3 (Days 15–21): Spring Boot & REST APIs**\n" +
                    "  Controllers, Services, Repositories, Spring Data JPA, JWT Authentication.\n\n" +
                    "• **Week 4 (Days 22–30): Portfolio Project & Mock Rounds**\n" +
                    "  Deploy to GitHub, write README documentation, and practice technical Q&A.\n\n" +
                    "Check out your interactive **My Placement Roadmap** to track each step!";
        } else if (userText.contains("job") || userText.contains("drives") || userText.contains("suitable")) {
            reply = "I've matched several active placement drives to your profile! Top recommendations currently include:\n\n" +
                    "1. **TechNova Solutions** — Java Backend Developer (₹6.0–8.0 LPA) • 92% Match\n" +
                    "2. **CloudSphere Technologies** — Cloud Associate Engineer (₹7.5–10.0 LPA) • 88% Match\n" +
                    "3. **DataCore Labs** — Junior Data Engineer (₹6.5–8.5 LPA) • 85% Match\n\n" +
                    "Head to the **Eligible Jobs** section to review criteria and submit applications with one click!";
        } else {
            reply = "Hi " + studentName + "! 👋 I'm CareerBuddy, your AI Placement Assistant.\n\n" +
                    "Whether you want to discover matched jobs, prepare for upcoming interviews, refine your resume, or build a study roadmap, I'm here to support your journey.\n\n" +
                    "What would you like to explore today?";
        }

        ChatMessageResponse response = new ChatMessageResponse(reply, "AI Demo Mode", suggestedActions);
        response.setCareerSuggestions(careerSuggestions);
        return response;
    }

    @Override
    public InterviewEvaluationResponse evaluateInterviewAnswer(StudentProfile student, InterviewEvaluationRequest request) {
        String answer = request.getStudentAnswer() != null ? request.getStudentAnswer().trim() : "";
        int wordCount = answer.split("\\s+").length;

        int conceptScore = 8;
        int correctnessScore = 8;
        int clarityScore = 7;
        int confidenceScore = 8;
        String feedback;
        String idealPoints;
        String nextQuestion = "What is the difference between `@Component`, `@Service`, and `@Repository` in Spring Boot?";

        if (wordCount < 10) {
            conceptScore = 4;
            correctnessScore = 5;
            clarityScore = 4;
            confidenceScore = 4;
            feedback = "Your answer is quite brief. In technical interviews, interviewers expect you to clearly explain the underlying mechanics, tradeoffs, and practical use cases rather than just a one-line definition.";
            idealPoints = "• Define both data structures clearly\n• Compare time complexity for access, insertion, and deletion\n• Explain internal memory layouts (contiguous array vs pointer nodes)";
        } else if (answer.toLowerCase().contains("complexity") || answer.toLowerCase().contains("o(1)") || answer.toLowerCase().contains("array") || answer.toLowerCase().contains("node")) {
            conceptScore = 9;
            correctnessScore = 9;
            clarityScore = 8;
            confidenceScore = 9;
            feedback = "Excellent answer! You correctly highlighted the structural differences and mentioned time complexity implications for lookup vs insertion/deletion.";
            idealPoints = "• ArrayList uses dynamic resizable arrays (O(1) random access, O(n) worst-case insertion)\n• LinkedList uses doubly-linked nodes (O(n) search, O(1) insertion/deletion once positioned)\n• Memory overhead difference due to pointer references";
        } else {
            conceptScore = 7;
            correctnessScore = 7;
            clarityScore = 7;
            confidenceScore = 7;
            feedback = "Good conceptual explanation! To make this answer top-tier, incorporate the time complexity (Big-O notation) and explain when you would choose one over the other in real software.";
            idealPoints = "• ArrayList is preferable for frequent read/search operations\n• LinkedList can be considered for frequent insertions/removals at beginning or middle without reallocation\n• Mention memory locality benefits of ArrayList in modern CPU cache";
        }

        int overallScore = (conceptScore + correctnessScore + clarityScore + confidenceScore) / 4;

        return new InterviewEvaluationResponse(
                overallScore,
                conceptScore,
                correctnessScore,
                clarityScore,
                confidenceScore,
                feedback,
                idealPoints,
                nextQuestion,
                "AI Demo Mode"
        );
    }

    @Override
    public List<String> getCareerTips() {
        return careerTips;
    }

    @Override
    public String getRandomTip() {
        int index = new Random().nextInt(careerTips.size());
        return careerTips.get(index);
    }
}
