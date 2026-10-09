-- CampusHire AI Database Schema & Initial Data
-- Compatible with MySQL 8.0+

CREATE DATABASE IF NOT EXISTS campushire_ai;
USE campushire_ai;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

-- Student profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    department VARCHAR(255),
    cgpa DOUBLE,
    graduation_year INT,
    phone VARCHAR(50),
    bio TEXT,
    target_role VARCHAR(255),
    profile_completion INT DEFAULT 40,
    resume_headline VARCHAR(255),
    resume_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    industry VARCHAR(255),
    location VARCHAR(255),
    website VARCHAR(255),
    logo_url VARCHAR(255),
    description TEXT,
    average_package DOUBLE,
    total_hired INT DEFAULT 0
);

-- Placement drives table
CREATE TABLE IF NOT EXISTS placement_drives (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    role_type VARCHAR(100),
    location VARCHAR(255),
    salary_min DOUBLE,
    salary_max DOUBLE,
    min_cgpa DOUBLE DEFAULT 6.0,
    eligible_departments VARCHAR(255),
    graduation_year INT DEFAULT 2026,
    required_skills VARCHAR(500),
    description TEXT,
    deadline DATE,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    total_openings INT DEFAULT 10,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    placement_drive_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'APPLIED',
    match_score INT DEFAULT 80,
    applied_date DATE NOT NULL,
    notes TEXT,
    feedback TEXT,
    UNIQUE KEY uq_student_drive (student_id, placement_drive_id),
    FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (placement_drive_id) REFERENCES placement_drives(id) ON DELETE CASCADE
);

-- Interviews table
CREATE TABLE IF NOT EXISTS interviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    interview_type VARCHAR(100),
    scheduled_at DATETIME,
    meeting_link VARCHAR(255),
    interviewer_name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'SCHEDULED',
    feedback TEXT,
    score INT,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- Student skills table
CREATE TABLE IF NOT EXISTS student_skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    proficiency INT DEFAULT 70,
    category VARCHAR(100),
    FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies VARCHAR(255),
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    role VARCHAR(100),
    FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    issue_date DATE,
    credential_url VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    badge_code VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    icon VARCHAR(50),
    unlocked_at DATETIME,
    unlocked BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE
);

-- Roadmap steps table
CREATE TABLE IF NOT EXISTS roadmap_steps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    step_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'NOT_STARTED',
    FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
