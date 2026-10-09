// Mock / Fallback dataset for instant demo and offline resilience

export const DEMO_USERS = {
  student: {
    id: 1,
    email: 'student@campushire.ai',
    fullName: 'Alex Chen',
    role: 'STUDENT',
    department: 'Computer Science and Engineering',
    cgpa: 8.4,
    graduationYear: 2026,
    targetRole: 'Java Backend Developer',
    profileCompletion: 85,
    bio: 'Passionate pre-final year Computer Science student specializing in Java backend development, microservices, and distributed cloud systems.',
    phone: '+91 98765 43210',
    resumeHeadline: 'Aspiring Java Backend Developer | Spring Boot Enthusiast | Problem Solver',
    githubUrl: 'https://github.com/alexchen-dev',
    linkedinUrl: 'https://linkedin.com/in/alexchen-dev'
  },
  officer: {
    id: 2,
    email: 'officer@campushire.ai',
    fullName: 'Dr. Rajesh Sharma',
    role: 'PLACEMENT_OFFICER',
    department: 'Training & Placement Cell'
  },
  recruiter: {
    id: 3,
    email: 'recruiter@campushire.ai',
    fullName: 'Sarah Jenkins',
    role: 'RECRUITER',
    company: 'TechNova'
  }
};

export const INITIAL_SKILLS = [
  { id: 1, skillName: 'Java', proficiency: 80, category: 'Programming' },
  { id: 2, skillName: 'Object-Oriented Programming (OOP)', proficiency: 70, category: 'Concepts' },
  { id: 3, skillName: 'SQL & Relational DBs', proficiency: 50, category: 'Database' },
  { id: 4, skillName: 'Spring Boot', proficiency: 30, category: 'Framework' },
  { id: 5, skillName: 'Git & GitHub', proficiency: 60, category: 'Tool' },
  { id: 6, skillName: 'REST APIs', proficiency: 65, category: 'Backend' }
];

export const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'CampusHire AI Platform',
    description: 'Architected a full-featured campus placement platform with Spring Boot REST APIs, JWT authentication, and interactive AI career counseling widgets.',
    technologies: 'Java 21, Spring Boot, React, MySQL, Tailwind CSS',
    githubUrl: 'https://github.com/OdigepalliSnehalatha/CampusHire-AI',
    liveUrl: 'https://campushire-ai.demo.app',
    role: 'Lead Developer'
  },
  {
    id: 2,
    title: 'E-Commerce Microservices Engine',
    description: 'Developed order processing, payment gateway mock, and inventory tracking microservices with Spring Data JPA and MySQL transactions.',
    technologies: 'Java, Spring Boot, Hibernate, MySQL, Docker',
    githubUrl: 'https://github.com/alexchen-dev/ecommerce-services',
    liveUrl: 'https://shop-engine.demo.app',
    role: 'Backend Engineer'
  }
];

export const INITIAL_CERTIFICATIONS = [
  {
    id: 1,
    title: 'Oracle Certified Associate: Java SE Programmer',
    issuer: 'Oracle University',
    issueDate: '2026-04-15',
    credentialUrl: 'https://oracle.com/verify/cert-1029384'
  },
  {
    id: 2,
    title: 'Spring Boot Microservices Mastery',
    issuer: 'Coursera / Meta',
    issueDate: '2026-07-20',
    credentialUrl: 'https://coursera.org/verify/SPRG-9921'
  }
];

export const INITIAL_ACHIEVEMENTS = [
  { id: 1, badgeCode: 'PROFILE_COMPLETE', title: 'Profile Complete 🏆', description: 'Achieved over 80% profile completion score', icon: '🏆', unlocked: true },
  { id: 2, badgeCode: 'FIRST_APPLICATION', title: 'First Application 🎯', description: 'Submitted initial placement drive application', icon: '🎯', unlocked: true },
  { id: 3, badgeCode: 'PROJECT_ADDED', title: 'First Project Added 💻', description: 'Showcased portfolio project with GitHub repository', icon: '💻', unlocked: true },
  { id: 4, badgeCode: 'RESUME_READY', title: 'Resume Ready 📄', description: 'Analyzed and polished resume for campus ATS screening', icon: '📄', unlocked: true },
  { id: 5, badgeCode: 'INTERVIEW_READY', title: 'Interview Ready 🎤', description: 'Practiced mock technical rounds with CareerBuddy AI', icon: '🎤', unlocked: true },
  { id: 6, badgeCode: 'PLACEMENT_READY', title: 'Placement Ready 🚀', description: 'Completed core roadmap milestones for target career path', icon: '🚀', unlocked: false }
];

export const INITIAL_ROADMAP = [
  { id: 1, stepNumber: 1, title: 'Java Fundamentals', description: 'Data types, control structures, methods, and syntax basics.', category: 'Language', status: 'COMPLETED' },
  { id: 2, stepNumber: 2, title: 'Object-Oriented Programming (OOP)', description: 'Inheritance, Polymorphism, Abstraction, and Encapsulation.', category: 'Concepts', status: 'COMPLETED' },
  { id: 3, stepNumber: 3, title: 'Java Collections Framework', description: 'Lists, Sets, Maps, Queues, Iterators, and Big-O efficiency.', category: 'Language', status: 'COMPLETED' },
  { id: 4, stepNumber: 4, title: 'SQL & Relational Databases', description: 'Joins, aggregations, indexing, and normal forms.', category: 'Database', status: 'IN_PROGRESS' },
  { id: 5, stepNumber: 5, title: 'Spring Boot Core', description: 'Inversion of Control, Dependency Injection, and Spring Beans.', category: 'Framework', status: 'NOT_STARTED' },
  { id: 6, stepNumber: 6, title: 'REST APIs & JPA', description: 'CRUD controllers, Entity relationships, and Hibernate.', category: 'Backend', status: 'NOT_STARTED' },
  { id: 7, stepNumber: 7, title: 'Portfolio Project Deployment', description: 'Packaging runnable JAR, environment configurations, and documentation.', category: 'Project', status: 'NOT_STARTED' },
  { id: 8, stepNumber: 8, title: 'Technical Mock Interviews', description: 'System design basics, behavioral questions, and live coding practice.', category: 'Career', status: 'NOT_STARTED' }
];

export const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Java Backend Developer',
    company: { name: 'TechNova', logoUrl: '🏢', location: 'Hyderabad' },
    roleType: 'Full-Time',
    location: 'Hyderabad',
    salaryMin: 6.0,
    salaryMax: 8.0,
    minCgpa: 7.5,
    eligibleDepartments: 'CSE, IT, ECE',
    graduationYear: 2026,
    requiredSkills: 'Java, Spring Boot, MySQL, REST APIs',
    description: "Join TechNova's core banking engineering squad. Architect resilient microservices, design scalable REST APIs, and optimize high-throughput MySQL queries.",
    deadline: '2026-10-30',
    status: 'ACTIVE',
    totalOpenings: 15,
    matchScore: 92,
    matchReasons: [
      'Java skill matches required qualifications',
      'CSE department is eligible',
      'CGPA requirement (7.5+) satisfied (8.4)',
      '2026 Graduation batch matches'
    ]
  },
  {
    id: 2,
    title: 'Cloud Platform Associate',
    company: { name: 'CloudSphere', logoUrl: '☁️', location: 'Bangalore' },
    roleType: 'Full-Time',
    location: 'Bangalore',
    salaryMin: 8.0,
    salaryMax: 10.0,
    minCgpa: 7.0,
    eligibleDepartments: 'CSE, IT',
    graduationYear: 2026,
    requiredSkills: 'Java, Linux, AWS, Docker, Git',
    description: 'Collaborate with senior DevOps architects to deploy scalable containerized services across hybrid cloud environments.',
    deadline: '2026-11-05',
    status: 'ACTIVE',
    totalOpenings: 10,
    matchScore: 88,
    matchReasons: [
      'Git and Java skills match',
      'CGPA requirement (7.0+) satisfied (8.4)',
      'Department eligible'
    ]
  },
  {
    id: 3,
    title: 'Full Stack Software Engineer',
    company: { name: 'NextGen Technologies', logoUrl: '⚡', location: 'Noida' },
    roleType: 'Full-Time',
    location: 'Noida',
    salaryMin: 7.0,
    salaryMax: 9.0,
    minCgpa: 7.0,
    eligibleDepartments: 'CSE, IT, ECE',
    graduationYear: 2026,
    requiredSkills: 'Java, React, Spring Boot, JavaScript, SQL',
    description: 'Build dynamic interactive web portals and back-end transaction processors for our premier merchant dashboard.',
    deadline: '2026-10-25',
    status: 'ACTIVE',
    totalOpenings: 12,
    matchScore: 85,
    matchReasons: [
      'Full Stack skill stack matches',
      'High department and GPA compatibility'
    ]
  },
  {
    id: 4,
    title: 'Junior Data Analyst',
    company: { name: 'DataCore', logoUrl: '📊', location: 'Pune' },
    roleType: 'Full-Time',
    location: 'Pune',
    salaryMin: 6.0,
    salaryMax: 7.5,
    minCgpa: 6.5,
    eligibleDepartments: 'CSE, IT, ECE, EEE',
    graduationYear: 2026,
    requiredSkills: 'SQL, Python, Excel, PowerBI',
    description: 'Extract business metrics, construct live dashboards, and analyze telemetry datasets to uncover actionable growth insights.',
    deadline: '2026-11-10',
    status: 'ACTIVE',
    totalOpenings: 8,
    matchScore: 78,
    matchReasons: [
      'SQL proficiency matches data needs',
      'CGPA requirement (6.5+) satisfied'
    ]
  },
  {
    id: 5,
    title: 'Frontend React Engineer',
    company: { name: 'InnoSoft', logoUrl: '🚀', location: 'Chennai' },
    roleType: 'Full-Time',
    location: 'Chennai',
    salaryMin: 5.5,
    salaryMax: 7.0,
    minCgpa: 6.5,
    eligibleDepartments: 'CSE, IT',
    graduationYear: 2026,
    requiredSkills: 'React, JavaScript, HTML5, CSS3, Tailwind CSS',
    description: 'Craft silky-smooth client interfaces, integrate asynchronous GraphQL/REST endpoints, and guarantee responsive UX.',
    deadline: '2026-10-28',
    status: 'ACTIVE',
    totalOpenings: 10,
    matchScore: 80,
    matchReasons: [
      'React and Web fundamentals match',
      'Department and batch eligible'
    ]
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Alex Chen',
    department: 'CSE',
    cgpa: 8.4,
    driveId: 1,
    jobTitle: 'Java Backend Developer',
    companyName: 'TechNova',
    companyLogo: '🏢',
    location: 'Hyderabad',
    salaryMin: 6.0,
    salaryMax: 8.0,
    status: 'TECHNICAL_INTERVIEW',
    matchScore: 92,
    appliedDate: '2026-10-02',
    notes: 'Candidate demonstrates strong Java OOP foundation. Selected for technical evaluation round.'
  },
  {
    id: 2,
    studentId: 1,
    studentName: 'Alex Chen',
    department: 'CSE',
    cgpa: 8.4,
    driveId: 2,
    jobTitle: 'Cloud Platform Associate',
    companyName: 'CloudSphere',
    companyLogo: '☁️',
    location: 'Bangalore',
    salaryMin: 8.0,
    salaryMax: 10.0,
    status: 'SHORTLISTED',
    matchScore: 88,
    appliedDate: '2026-10-04',
    notes: 'Resume passed initial screening criteria.'
  }
];

export const INITIAL_INTERVIEWS = [
  {
    id: 1,
    applicationId: 1,
    jobTitle: 'Java Backend Developer',
    companyName: 'TechNova',
    interviewType: 'Technical Round 1',
    scheduledAt: '2026-10-12T11:00:00',
    meetingLink: 'https://meet.google.com/xyz-campushire-mock',
    interviewerName: 'Prakash Rao (Senior Backend Lead)',
    status: 'SCHEDULED'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Technical Interview Scheduled! 🎤',
    message: 'Your Technical Round 1 for TechNova (Java Backend Developer) is scheduled for Friday at 11:00 AM.',
    type: 'INTERVIEW',
    isRead: false,
    createdAt: '2026-10-09T09:30:00'
  },
  {
    id: 2,
    title: 'New Placement Drive Matching Your Skills 🎯',
    message: 'TechNova just announced 15 openings for Java Backend Developer (₹6–8 LPA). Your profile match is 92%!',
    type: 'JOB',
    isRead: false,
    createdAt: '2026-10-08T14:15:00'
  },
  {
    id: 3,
    title: 'CareerBuddy Tip of the Day 💡',
    message: 'Review the internal workings of HashMap before your TechNova interview round!',
    type: 'AI_TIP',
    isRead: true,
    createdAt: '2026-10-07T10:00:00'
  }
];

export const CAREER_TIPS = [
  "Don't try to learn 10 technologies at once. Master the core fundamentals first.",
  "One well-documented, deployed project is worth more to a recruiter than five half-finished tutorial clones.",
  "Practice explaining your code out loud. Technical interviews evaluate how clearly you communicate your thought process.",
  "Write clean commit messages in Git. Recruiters love seeing realistic engineering practices on GitHub.",
  "Review your core data structures (Arrays, HashMaps, Trees) before deep-diving into complex frameworks.",
  "Prepare 2-3 genuine questions to ask your interviewer at the end of each placement round.",
  "Consistent daily practice of 1-2 coding problems beats cramming 30 problems the night before a placement test.",
  "Don't worry about knowing every library; demonstrate strong problem-solving and eagerness to learn."
];
