# CampusHire AI 🎓🚀
### *Smart College Placement & Career Guidance Platform*
> **Tagline:** *"Your Campus. Your Career. Your Future."*

![CampusHire AI](https://img.shields.io/badge/Java-21-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg)
![Security](https://img.shields.io/badge/Spring%20Security-JWT-red.svg)
![Database](https://img.shields.io/badge/MySQL-8.0%20Ready-blue.svg)

---

## 🌟 Executive Overview
**CampusHire AI** is a startup-grade, modern AI-powered college placement management and career guidance platform built with **Java 21, Spring Boot, Spring Security, React, and MySQL**.

Unlike traditional, clunky college ERP systems, CampusHire AI delivers a sleek, high-delight student and recruiter experience with soft gradients, glassmorphism cards, micro-interactions, responsive dashboards, and intelligent career acceleration tools.

---

## 🚀 Key Modules & Capabilities

### 1. 🤖 AI Career Assistant — *"CampusBuddy AI / CareerBuddy"*
- Floating assistant launcher button `[🤖 CareerBuddy]` accessible across all screens.
- Custom SVG Mascot: cute small AI companion robot wearing a graduation cap, holding a career roadmap.
- Empathetic, student-focused personality that handles placement anxieties (*"I'm scared I won't get placed"*, *"My CGPA is low"*, *"I failed my interview"*) with realistic, constructive guidance.
- AI abstraction architecture (`AiCareerService`, `DemoAiCareerService`, `GeminiAiCareerService`) clearly labeled **"AI Demo Mode"** locally, ready for one-step connection to Google Gemini or OpenAI APIs.

### 2. 🎯 AI Skill Gap Analysis
- Role-specific benchmarking (e.g., *Java Backend Developer*, *Full Stack Engineer*, *Data Analyst*).
- Visual progress bars comparing Current Skills vs. Industry Demand.
- Missing skills detection with prioritized, recommended learning order sequence.

### 3. 🗺️ Personalized Learning Roadmap — *"My Placement Roadmap"*
- 8-step structured journey:
  1. *Java Fundamentals* (Completed)
  2. *Object-Oriented Programming* (Completed)
  3. *Java Collections Framework* (Completed)
  4. *SQL & Relational Databases* (In Progress)
  5. *Spring Boot Core*
  6. *REST APIs & JPA*
  7. *Portfolio Project Deployment*
  8. *Technical Mock Interviews*
- Interactive milestone status toggling with celebratory confetti effects.

### 4. 📄 AI Resume Assistant (ATS Scorer)
- Resume upload simulator and evaluation engine.
- ATS Score calculation (e.g., 74/100) with percentile ranking.
- Section completeness audit, high-impact action-verb recommendations, and keyword density suggestions.

### 5. 🎤 AI Interview Coach
- Interactive mock technical interview simulator.
- Question prompter based on role and difficulty (*Beginner, Intermediate, Advanced*).
- Multi-dimensional rubric scoring across **Concept Understanding**, **Correctness**, **Clarity**, and **Confidence**.
- Constructive feedback, ideal talking points, and automated next-question progression.

### 6. 💼 Placement Drives & Smart Job Matching
- Smart recommendation engine calculating match score % based on CGPA criteria, department eligibility, graduation batch, and required technical skills.
- One-click application modal with celebratory feedback.
- Rich filters by department, salary package (₹ LPA), and minimum CGPA.

### 7. ⏱️ Application Tracking Pipeline
- 5-stage timeline progression: `Applied` ➔ `Shortlisted` ➔ `Technical Interview` ➔ `HR Interview` ➔ `Selected / Offer`.
- Interview schedule details, meeting links, and recruiter notes.

### 8. 🏆 Milestone Achievements (Lightweight Gamification)
- Unlocked badges for *Profile Complete 🏆*, *First Application 🎯*, *First Project Added 💻*, *Resume Ready 📄*, *Interview Ready 🎤*, and *Placement Ready 🚀*.

### 9. 📊 Placement Officer Executive Dashboard
- Interactive charts powered by **Recharts**:
  - Department-wise placement rate & student cohort distribution.
  - Monthly hiring velocity and offers momentum.
  - Top corporate partner hiring metrics and average packages.
- Student cohort tracking directory.

### 10. 🏢 Recruiter Command Hub
- Candidate review pipeline, filtering by match percentage and GPA.
- Interactive status promotions (*Schedule Tech Round*, *Release Offer*).
- Post new campus drive opening modal.

---

## 👥 Demo Accounts (1-Click Login Available)

CampusHire AI includes a **1-Click Demo Role Switcher** right in the top navigation bar:

| Role | Name | Email | Password |
|---|---|---|---|
| **👨‍🎓 Student** | Alex Chen (CSE, 8.4 CGPA) | `student@campushire.ai` | `password123` |
| **👔 Placement Officer** | Dr. Rajesh Sharma | `officer@campushire.ai` | `password123` |
| **🏢 Recruiter** | Sarah Jenkins (TechNova) | `recruiter@campushire.ai` | `password123` |

---

## 🏛️ Clean Java Backend Architecture

The backend adheres strictly to clean, readable, beginner/intermediate friendly Java principles without unnecessary microservices complexity:

```
backend/src/main/java/com/campushire/
  ├── controller/      # REST API Endpoints (Auth, Student, Jobs, Applications, AI, Officer)
  ├── service/         # Business logic layer (Auth, Student, Drives, AI Career, Analytics)
  ├── repository/      # Spring Data JPA interfaces
  ├── entity/          # Relational JPA entities (User, StudentProfile, Company, Drive, etc.)
  ├── dto/             # Data Transfer Objects & request/response payloads
  ├── security/        # JWT Token Provider, Auth Filter, SecurityConfig
  ├── exception/       # GlobalExceptionHandler, Custom Exceptions (400, 401, 403, 404, 500)
  └── config/          # DataSeeder (seeds rich realistic demo data), CORS configuration
```

---

## 🛠️ How to Run Locally

### Prerequisites
- **Java 21** (or Java 17+)
- **Node.js 18+** & npm

### Option 1: One-Click Startup (Windows)
1. Double click [`start-backend.bat`](file:///C:/Users/odige/.gemini/antigravity/scratch/CampusHire-AI/start-backend.bat) to launch the Spring Boot backend on **port 8080**.
2. Double click [`start-frontend.bat`](file:///C:/Users/odige/.gemini/antigravity/scratch/CampusHire-AI/start-frontend.bat) to launch the React frontend on **port 5173**.

### Option 2: Running via Terminal

#### Backend (Spring Boot):
```bash
cd backend
mvnw.cmd spring-boot:run
```
*The backend automatically starts with an in-memory database and loads all seed data for students, companies, drives, and roadmaps!*

#### Frontend (React + Vite):
```bash
cd frontend
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 🗄️ MySQL Database Setup (Optional)

By default, the backend runs with an in-memory H2 database for zero-configuration instant development.

To connect to your local **MySQL** server:
1. Ensure MySQL is running on `localhost:3306`.
2. Execute the database script located at:
   [`backend/src/main/resources/campushire_schema_and_data.sql`](file:///C:/Users/odige/.gemini/antigravity/scratch/CampusHire-AI/backend/src/main/resources/campushire_schema_and_data.sql)
3. Run the backend with the `mysql` profile:
```bash
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=mysql
```
Or edit [`backend/src/main/resources/application.properties`](file:///C:/Users/odige/.gemini/antigravity/scratch/CampusHire-AI/backend/src/main/resources/application.properties) with your MySQL credentials.

---

## 🤖 Connecting External AI (Google Gemini / OpenAI)
CampusHire AI features an **AI-ready abstraction**.
To connect real Google Gemini models:
1. Set the environment variable:
```bash
set GEMINI_API_KEY=your_gemini_api_key_here
```
2. When the backend starts, [`GeminiAiCareerService`](file:///C:/Users/odige/.gemini/antigravity/scratch/CampusHire-AI/backend/src/main/java/com/campushire/service/GeminiAiCareerService.java) automatically detects the key and switches from **"AI Demo Mode"** to live Gemini processing!

---

## 📄 License
Created for academic excellence & campus placement enablement.
