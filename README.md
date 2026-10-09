# CampusHire AI 🎓🚀
### *Smart College Placement & Career Guidance Platform*
> **Tagline:** *"Your Campus. Your Career. Your Future."*

![CampusHire AI](https://img.shields.io/badge/Java-21-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg)
![Security](https://img.shields.io/badge/Spring%20Security-JWT-red.svg)
![Database](https://img.shields.io/badge/MySQL-8.0%20Ready-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)

---

## 🌟 Executive Overview
**CampusHire AI** is a startup-grade, modern AI-powered college placement management and career guidance platform built with **Java 21, Spring Boot, Spring Security, React 19, Tailwind CSS, and MySQL**.

Designed to replace traditional, clunky college ERP systems, CampusHire AI combines student placement management, recruiter workflows, officer analytics, and an empathetic AI scholar assistant into an intuitive product with soft gradients, glassmorphism cards, micro-interactions, and real-time guidance.

---

## 🐰 CareerBuddy AI — Scholar Rabbit Companion
One of the core highlights of CampusHire AI is **CareerBuddy**, an interactive AI career companion tailored for college students:

- **Cute Scholar Rabbit Mascot 🐰🎓:** An ultra-cute bunny scholar wearing a graduation mortarboard cap with a golden swinging tassel, tall fluffy ears with pink inner pads, sparkling anime boba eyes, whiskers, and a diploma scroll.
- **Lifelike Motion Illusion:** Fluid, pure CSS keyframe animations provide a gentle floating breathing bob, natural ear twitches, pendulum tassel swings, and waving paw motion with 100% transparent background preservation.
- **Authenticated Visibility:** CareerBuddy appears **only when logged in** to an account. It remains completely hidden on public landing and login pages.
- **Compact 5cm × 5cm Placement:** Positioned at the bottom-right corner (`5cm` length × `5cm` height) with a matching, constant-width typing bar directly beneath it (does not enlarge on click or focus).
- **Reduced 12cm × 12cm Chat Window:** Clicking the rabbit or submitting a question opens a compact, neatly proportioned `12cm × 12cm` chat interface that does not overwhelm the screen.
- **Dashboard Performance-Driven Feedback:** CareerBuddy dynamically analyzes the logged-in student's live dashboard performance (CGPA, profile completion %, department, target role) to deliver:
  - Personalized encouragement highlighting qualification for 95%+ campus recruitment drives.
  - 3 concrete, high-impact suggestions tailored to their academic bracket (Daily DSA discipline, backend microservices, resume ATS impact).
  - Empathetic responses for placement anxiety, low CGPA concerns, or interview preparation.

---

## 🚀 Key Modules & Capabilities

### 1. 📊 Dynamic Student Dashboard & Left Sidebar
- **Dynamic Name Greetings:** Greets the active student dynamically (e.g. `Hello, Priya! 👋`, `Hello, Alex! 👋`).
- **Left-Side Navigation Sidebar:** Clean, horizontal navigation links with active pill states, student profile snapshot, CGPA tag, and sign-out controls.
- **Real-Time Placement Season KPIs:** Circular gauge for profile readiness, active eligible drives count, applied tracker, shortlisted interviews, and offers.
- **Daily Career Tip:** Rotating practical placement advice updated daily.

### 2. 🔐 Secure Authentication & Multi-Role Support
- **JWT Authentication:** Password hashing with BCrypt and stateless JSON Web Token authorization.
- **Three Supported Roles:**
  - `STUDENT`: Job discovery, roadmap progress, interview practice, resume scoring.
  - `PLACEMENT_OFFICER`: Batch-wide analytics, company drives management, applicant review.
  - `RECRUITER`: Drive management, applicant shortlisting, interview status promotion.
- **5 Prototype Students:** Pre-configured test accounts representing diverse engineering departments:
  - **Alex Chen** (CSE, 8.6 CGPA, Java Backend Developer)
  - **Priya Patel** (IT, 9.2 CGPA, Full Stack React & Cloud Engineer)
  - **Rohit Verma** (ECE, 7.8 CGPA, Embedded Systems & IoT Engineer)
  - **Ananya Sharma** (Data Science, 8.4 CGPA, AI/ML Specialist)
  - **Kavya Reddy** (CSE, 8.9 CGPA, DevOps & Cloud Engineer)

### 3. 🎯 AI Skill Gap Analysis
- Role-specific benchmarking for in-demand tech roles (*Java Backend Developer*, *Full Stack Engineer*, *Cloud DevOps*).
- Visual progress bars comparing Current Skills vs. Industry Demand.
- Prioritized missing skill recommendations with recommended learning order.

### 4. 🗺️ Placement Roadmap — *"My Placement Roadmap"*
- 8-step structured journey from core fundamentals to interview mastery:
  1. *Java Fundamentals* (Completed)
  2. *Object-Oriented Programming* (Completed)
  3. *Java Collections Framework* (Completed)
  4. *SQL & Relational Databases* (In Progress)
  5. *Spring Boot Core & REST APIs*
  6. *Spring Data JPA & Hibernate*
  7. *Full-Stack Portfolio Project*
  8. *Technical Mock Interviews*
- Celebratory confetti effects upon completing milestones.

### 5. 📄 AI Resume Assistant (ATS Scorer)
- ATS score simulator (e.g., 78/100) with percentile rating.
- Section-by-section audit, keyword density check, and action-verb improvements.

### 6. 🎤 AI Interview Coach
- Interactive technical mock interview simulator.
- Difficulty levels (*Beginner, Intermediate, Advanced*) across Java, Backend, React, and SQL.
- Rubric scoring across **Concept Understanding**, **Correctness**, **Clarity**, and **Confidence**.
- Model answer pointers and automatic progression to the next question.

### 7. 💼 Smart Job Matching & Top Companies
- Integrated top tier corporate partners: **Google**, **Microsoft**, **Amazon**, **Oracle**, **TCS Digital**, **Infosys**, **Cognizant**, **Wipro**, and high-growth startups.
- Automated match score % calculated using CGPA eligibility, department, graduation year, and tech stack.
- One-click application pipeline tracking: `Applied` ➔ `Shortlisted` ➔ `Technical Round` ➔ `HR Round` ➔ `Selected`.

### 8. 📈 Placement Officer Analytics
- Visual analytics powered by **Recharts**:
  - Department-wise placement rate and batch hiring momentum.
  - Top hiring partners and average package distribution (₹ LPA).
  - Complete student directory with filterable CGPA and status columns.

---

## 🏛️ Clean Java Backend Architecture

The backend is built with clean, understandable Java patterns without unnecessary microservices overhead:

```
backend/src/main/java/com/campushire/
  ├── controller/      # REST API Endpoints (Auth, Student, Jobs, Applications, AI, Officer)
  ├── service/         # Business logic layer (AuthService, StudentService, DriveService, AiCareerService)
  ├── repository/      # Spring Data JPA Repository interfaces
  ├── entity/          # Relational JPA entities (User, StudentProfile, Company, PlacementDrive, Application)
  ├── dto/             # Clean Data Transfer Objects & API payloads
  ├── security/        # JWT Token Provider, JwtAuthenticationFilter, SecurityFilterChain
  ├── exception/       # GlobalExceptionHandler with standard HTTP error responses
  └── config/          # DataSeeder (seeds students, companies, and drives), CORS configuration
```

---

## 👥 Prototype Accounts (Email & Password Login)

CampusHire AI features dedicated accounts with sample data for evaluation:

| Role | Name | Email | Password |
|---|---|---|---|
| **👨‍🎓 Student 1** | Alex Chen (CSE, 8.6 CGPA) | `alex@campushire.ai` | `password123` |
| **👩‍🎓 Student 2** | Priya Patel (IT, 9.2 CGPA) | `priya@campushire.ai` | `password123` |
| **👨‍🎓 Student 3** | Rohit Verma (ECE, 7.8 CGPA) | `rohit@campushire.ai` | `password123` |
| **👩‍🎓 Student 4** | Ananya Sharma (DS, 8.4 CGPA) | `ananya@campushire.ai` | `password123` |
| **👩‍🎓 Student 5** | Kavya Reddy (CSE, 8.9 CGPA) | `kavya@campushire.ai` | `password123` |
| **👔 Placement Officer** | Dr. Rajesh Sharma | `officer@campushire.ai` | `password123` |
| **🏢 Recruiter** | Sarah Jenkins (Google / TechNova) | `recruiter@campushire.ai` | `password123` |

*The login page includes convenient 1-click test credentials to pre-fill the form instantly.*

---

## 🛠️ How to Run Locally

### Prerequisites
- **Java 17 or Java 21**
- **Node.js 18+** & npm
- **Maven** (bundled via `./mvnw.cmd`)

### 1. Start Backend (Spring Boot)
```bash
cd backend
mvnw.cmd spring-boot:run
```
- Server starts on **`http://localhost:8080`**.
- Automatically seeds all prototype students, companies, job drives, and interview questions in memory.
- Root route `http://localhost:8080/` automatically redirects to the active frontend port!

### 2. Start Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
- Application opens on **`http://localhost:5174`** (or `http://localhost:5173`).

---

## 🗄️ MySQL Database Setup (Optional)

The application defaults to an in-memory H2 database for zero-friction local setup.

To switch to **MySQL**:
1. Ensure MySQL is running on `localhost:3306`.
2. Run the provided database schema script:
   [`backend/src/main/resources/campushire_schema_and_data.sql`](file:///C:/Users/odige/.gemini/antigravity/scratch/CampusHire-AI/backend/src/main/resources/campushire_schema_and_data.sql)
3. Launch with the `mysql` Spring profile:
```bash
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=mysql
```
Or customize credentials in [`backend/src/main/resources/application.properties`](file:///C:/Users/odige/.gemini/antigravity/scratch/CampusHire-AI/backend/src/main/resources/application.properties).

---

## 🤖 Connecting Live AI Models (Google Gemini)

CampusHire AI includes an **AI Provider Abstraction**. By default, it operates in **"AI Demo Mode"** with rich empathetic career logic.

To connect live **Google Gemini**:
```bash
set GEMINI_API_KEY=your_actual_gemini_api_key
```
When restarted, [`GeminiAiCareerService`](file:///C:/Users/odige/.gemini/antigravity/scratch/CampusHire-AI/backend/src/main/java/com/campushire/service/GeminiAiCareerService.java) detects the environment variable and seamlessly routes career chat and interview coaching requests through Gemini.

---

## 📄 License
Created for academic excellence & campus placement enablement.
All rights reserved © 2026 CampusHire AI.
