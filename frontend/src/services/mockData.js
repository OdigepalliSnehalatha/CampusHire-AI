// Mock / Fallback dataset with Real Companies and 5 Prototype Students

export const PROTOTYPE_STUDENTS = [
  {
    id: 1,
    email: 'alex@campushire.ai',
    fullName: 'Alex Chen',
    role: 'STUDENT',
    department: 'Computer Science and Engineering',
    cgpa: 8.6,
    graduationYear: 2026,
    targetRole: 'Java Backend Developer',
    profileCompletion: 88,
    bio: 'Passionate pre-final year CSE student specializing in Java backend development, Spring Boot microservices, and distributed cloud systems.',
    phone: '+91 98765 43210',
    resumeHeadline: 'Aspiring Java Backend Developer | Spring Boot Enthusiast | Problem Solver',
    githubUrl: 'https://github.com/alexchen-dev',
    linkedinUrl: 'https://linkedin.com/in/alexchen-dev',
    avatar: '👨‍💻',
    status: 'In Process (Oracle)',
    matchScore: 94
  },
  {
    id: 2,
    email: 'priya@campushire.ai',
    fullName: 'Priya Patel',
    role: 'STUDENT',
    department: 'Information Technology',
    cgpa: 9.2,
    graduationYear: 2026,
    targetRole: 'Full Stack React & Cloud Engineer',
    profileCompletion: 95,
    bio: 'Top-ranking IT student passionate about building highly interactive React web apps, TypeScript architectures, and scalable AWS cloud backends.',
    phone: '+91 98123 45678',
    resumeHeadline: 'Full Stack Engineer | React & TypeScript Enthusiast | AWS Certified Cloud Practitioner',
    githubUrl: 'https://github.com/priyapatel-tech',
    linkedinUrl: 'https://linkedin.com/in/priyapatel-tech',
    avatar: '👩‍💻',
    status: 'Selected 🎉 (Microsoft)',
    matchScore: 98
  },
  {
    id: 3,
    email: 'rohit@campushire.ai',
    fullName: 'Rohit Verma',
    role: 'STUDENT',
    department: 'Electronics and Communication',
    cgpa: 7.8,
    graduationYear: 2026,
    targetRole: 'Embedded Systems & IoT Engineer',
    profileCompletion: 78,
    bio: 'ECE enthusiast passionate about embedded C/C++, IoT device gateways, RTOS firmware development, and hardware-software telemetry protocols.',
    phone: '+91 97234 56789',
    resumeHeadline: 'Embedded Systems Engineer | C/C++ Developer | RTOS & IoT Specialist',
    githubUrl: 'https://github.com/rohitverma-ece',
    linkedinUrl: 'https://linkedin.com/in/rohitverma-ece',
    avatar: '👨‍🔧',
    status: 'Shortlisted (TCS Digital)',
    matchScore: 84
  },
  {
    id: 4,
    email: 'ananya@campushire.ai',
    fullName: 'Ananya Sharma',
    role: 'STUDENT',
    department: 'Computer Science (AI/ML)',
    cgpa: 8.9,
    graduationYear: 2026,
    targetRole: 'AI & Machine Learning Engineer',
    profileCompletion: 92,
    bio: 'Machine learning practitioner specializing in NLP transformers, computer vision pipelines, PyTorch models, and high-performance inference.',
    phone: '+91 96345 67890',
    resumeHeadline: 'AI & Data Science Engineer | PyTorch & NLP Specialist | Deep Learning Researcher',
    githubUrl: 'https://github.com/ananyasharma-ai',
    linkedinUrl: 'https://linkedin.com/in/ananyasharma-ai',
    avatar: '👩‍🔬',
    status: 'Technical Round (Amazon)',
    matchScore: 92
  },
  {
    id: 5,
    email: 'kavya@campushire.ai',
    fullName: 'Kavya Reddy',
    role: 'STUDENT',
    department: 'Electrical and Electronics Engineering',
    cgpa: 8.2,
    graduationYear: 2026,
    targetRole: 'Cloud DevOps & QA Automation Engineer',
    profileCompletion: 84,
    bio: 'EEE student with strong passion for test automation frameworks (Selenium, JUnit), CI/CD pipelines, container orchestration, and cloud reliability.',
    phone: '+91 95456 78901',
    resumeHeadline: 'QA Automation Engineer | Selenium & CI/CD Enthusiast | Cloud DevOps Associate',
    githubUrl: 'https://github.com/kavyareddy-qa',
    linkedinUrl: 'https://linkedin.com/in/kavyareddy-qa',
    avatar: '👩‍💼',
    status: 'Selected 🎉 (Infosys)',
    matchScore: 90
  }
];

export const DEMO_USERS = {
  student: PROTOTYPE_STUDENTS[0], // Alex Chen (default student)
  student1: PROTOTYPE_STUDENTS[0], // Alex Chen
  student2: PROTOTYPE_STUDENTS[1], // Priya Patel
  student3: PROTOTYPE_STUDENTS[2], // Rohit Verma
  student4: PROTOTYPE_STUDENTS[3], // Ananya Sharma
  student5: PROTOTYPE_STUDENTS[4], // Kavya Reddy
  officer: {
    id: 6,
    email: 'officer@campushire.ai',
    fullName: 'Dr. Rajesh Sharma',
    role: 'PLACEMENT_OFFICER',
    department: 'Training & Placement Cell',
    phone: '+91 98980 12345'
  },
  recruiter: {
    id: 7,
    email: 'recruiter@campushire.ai',
    fullName: 'Sarah Jenkins',
    role: 'RECRUITER',
    company: 'Google',
    phone: '+91 98760 54321'
  }
};

export const INITIAL_SKILLS = [
  { id: 1, skillName: 'Java', proficiency: 85, category: 'Programming' },
  { id: 2, skillName: 'Object-Oriented Programming (OOP)', proficiency: 75, category: 'Concepts' },
  { id: 3, skillName: 'SQL & Relational DBs', proficiency: 70, category: 'Database' },
  { id: 4, skillName: 'Spring Boot', proficiency: 75, category: 'Framework' },
  { id: 5, skillName: 'Git & GitHub', proficiency: 80, category: 'Tool' },
  { id: 6, skillName: 'REST APIs & Microservices', proficiency: 80, category: 'Backend' },
  { id: 7, skillName: 'Docker & Containerization', proficiency: 65, category: 'Cloud' }
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
  { id: 1, badgeCode: 'PROFILE_COMPLETE', title: 'Profile Complete 🏆', description: 'Achieved over 85% profile completion score', icon: '🏆', unlocked: true },
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
  { id: 4, stepNumber: 4, title: 'SQL & Relational Databases', description: 'Joins, aggregations, indexing, and normal forms.', category: 'Database', status: 'COMPLETED' },
  { id: 5, stepNumber: 5, title: 'Spring Boot Core', description: 'Inversion of Control, Dependency Injection, and Spring Beans.', category: 'Framework', status: 'IN_PROGRESS' },
  { id: 6, stepNumber: 6, title: 'REST APIs & JPA', description: 'CRUD controllers, Entity relationships, and Hibernate.', category: 'Backend', status: 'IN_PROGRESS' },
  { id: 7, stepNumber: 7, title: 'Portfolio Project Deployment', description: 'Packaging runnable JAR, environment configurations, and documentation.', category: 'Project', status: 'NOT_STARTED' },
  { id: 8, stepNumber: 8, title: 'Technical Mock Interviews', description: 'System design basics, behavioral questions, and live coding practice.', category: 'Career', status: 'NOT_STARTED' }
];

export const REAL_COMPANIES = [
  {
    id: 1,
    name: 'Google',
    industry: 'Cloud, Search & Artificial Intelligence',
    location: 'Bangalore & Hyderabad, India',
    website: 'https://careers.google.com',
    logoUrl: '🌐',
    description: 'Google is a global technology leader focusing on search, cloud computing, software, artificial intelligence, and cutting-edge research.',
    averagePackage: 22.5,
    totalHired: 42,
    openings: 15
  },
  {
    id: 2,
    name: 'Microsoft',
    industry: 'Enterprise Cloud, OS & AI Platforms',
    location: 'Hyderabad & Bangalore, India',
    website: 'https://careers.microsoft.com',
    logoUrl: '💻',
    description: 'Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge, empowering billions of people.',
    averagePackage: 19.8,
    totalHired: 55,
    openings: 20
  },
  {
    id: 3,
    name: 'Amazon',
    industry: 'E-Commerce, AWS Cloud & Logistics',
    location: 'Hyderabad & Bangalore, India',
    website: 'https://amazon.jobs',
    logoUrl: '📦',
    description: 'Amazon is guided by customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.',
    averagePackage: 16.5,
    totalHired: 60,
    openings: 25
  },
  {
    id: 4,
    name: 'Oracle',
    industry: 'Enterprise Databases, Java SE & Cloud Infrastructure',
    location: 'Bangalore & Hyderabad, India',
    website: 'https://oracle.com/careers',
    logoUrl: '🏛️',
    description: 'Oracle offers integrated suites of applications plus secure, autonomous infrastructure in the Oracle Cloud, maintaining core Java stewardship.',
    averagePackage: 13.5,
    totalHired: 48,
    openings: 18
  },
  {
    id: 5,
    name: 'Tata Consultancy Services (TCS)',
    industry: 'Global IT Services & Digital Consulting',
    location: 'Mumbai & Pan-India',
    website: 'https://tcs.com/careers',
    logoUrl: '🏢',
    description: 'TCS is an IT services, consulting and business solutions organization delivering real results to global businesses through its Digital & Innovator cadres.',
    averagePackage: 8.5,
    totalHired: 120,
    openings: 45
  },
  {
    id: 6,
    name: 'Infosys',
    industry: 'Next-Gen Digital Services & Consulting',
    location: 'Bangalore & Pan-India',
    website: 'https://infosys.com/careers',
    logoUrl: '🔷',
    description: 'Infosys is a global leader in next-generation digital services and consulting, empowering clients in more than 50 countries to navigate their digital journey.',
    averagePackage: 8.0,
    totalHired: 95,
    openings: 35
  }
];

export const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Java Backend Developer',
    company: { name: 'Oracle', logoUrl: '🏛️', location: 'Bangalore & Hyderabad' },
    roleType: 'Full-Time',
    location: 'Bangalore & Hyderabad',
    salaryMin: 10.0,
    salaryMax: 14.0,
    minCgpa: 7.5,
    eligibleDepartments: 'CSE, IT, ECE',
    graduationYear: 2026,
    requiredSkills: 'Java, Spring Boot, MySQL, REST APIs, Microservices',
    description: 'Join Oracle Cloud Infrastructure squad. Architect resilient microservices, develop robust REST APIs with Spring Boot, and optimize high-throughput distributed database queries.',
    deadline: '2026-10-30',
    status: 'ACTIVE',
    totalOpenings: 18,
    matchScore: 94,
    matchReasons: [
      'Java proficiency (85%) directly matches requirements',
      'CSE department is eligible',
      'CGPA requirement (7.5+) satisfied (8.6)',
      '2026 Graduation batch matches'
    ]
  },
  {
    id: 2,
    title: 'Software Development Engineer (SDE I)',
    company: { name: 'Microsoft', logoUrl: '💻', location: 'Hyderabad & Bangalore' },
    roleType: 'Full-Time',
    location: 'Hyderabad & Bangalore',
    salaryMin: 16.0,
    salaryMax: 22.0,
    minCgpa: 7.5,
    eligibleDepartments: 'CSE, IT, ECE',
    graduationYear: 2026,
    requiredSkills: 'Data Structures, OOP, Cloud Services, Java/C#, System Design',
    description: 'Develop large-scale distributed systems and customer-facing cloud features for Microsoft Azure and Microsoft 365 developer ecosystems.',
    deadline: '2026-11-05',
    status: 'ACTIVE',
    totalOpenings: 20,
    matchScore: 88,
    matchReasons: [
      'Strong OOP and Java fundamentals match',
      'CGPA requirement (7.5+) satisfied (8.6)',
      'Department eligible'
    ]
  },
  {
    id: 3,
    title: 'Cloud Platform Associate',
    company: { name: 'Amazon', logoUrl: '📦', location: 'Hyderabad & Bangalore' },
    roleType: 'Full-Time',
    location: 'Hyderabad & Bangalore',
    salaryMin: 14.0,
    salaryMax: 18.0,
    minCgpa: 7.0,
    eligibleDepartments: 'CSE, IT, ECE',
    graduationYear: 2026,
    requiredSkills: 'Java, Linux, AWS, Docker, Git, Networking',
    description: 'Collaborate with senior DevOps architects to deploy scalable containerized services across AWS global infrastructure with high fault-tolerance.',
    deadline: '2026-10-28',
    status: 'ACTIVE',
    totalOpenings: 25,
    matchScore: 90,
    matchReasons: [
      'Git, Docker, and Java skills match',
      'High CGPA and branch eligibility'
    ]
  },
  {
    id: 4,
    title: 'Software Engineer - Campus Graduate',
    company: { name: 'Google', logoUrl: '🌐', location: 'Bangalore & Hyderabad' },
    roleType: 'Full-Time',
    location: 'Bangalore & Hyderabad',
    salaryMin: 18.0,
    salaryMax: 24.0,
    minCgpa: 8.0,
    eligibleDepartments: 'CSE, IT',
    graduationYear: 2026,
    requiredSkills: 'Algorithms, Data Structures, Java/C++/Python, Distributed Systems',
    description: 'Solve complex algorithmic engineering challenges at global scale, contributing to core Google infrastructure, search indexing, and machine learning services.',
    deadline: '2026-11-15',
    status: 'ACTIVE',
    totalOpenings: 15,
    matchScore: 86,
    matchReasons: [
      'Algorithms and Java programming match',
      'CGPA requirement (8.0+) satisfied (8.6)'
    ]
  },
  {
    id: 5,
    title: 'Digital Cadre Systems Engineer',
    company: { name: 'Tata Consultancy Services (TCS)', logoUrl: '🏢', location: 'Mumbai & Pune' },
    roleType: 'Full-Time',
    location: 'Mumbai & Pune',
    salaryMin: 7.0,
    salaryMax: 9.0,
    minCgpa: 6.5,
    eligibleDepartments: 'CSE, IT, ECE, EEE',
    graduationYear: 2026,
    requiredSkills: 'Java, Python, Cloud Fundamentals, Web Tech',
    description: 'Join the premier TCS Digital cadre, building cutting-edge enterprise cloud platforms, blockchain integrations, and modern AI automations for global Fortune 500s.',
    deadline: '2026-11-10',
    status: 'ACTIVE',
    totalOpenings: 45,
    matchScore: 92,
    matchReasons: [
      'Multi-disciplinary branch eligibility',
      'Exceeds minimum CGPA requirements'
    ]
  },
  {
    id: 6,
    title: 'Specialist Programmer (Power Programmer)',
    company: { name: 'Infosys', logoUrl: '🔷', location: 'Bangalore & Hyderabad' },
    roleType: 'Full-Time',
    location: 'Bangalore & Hyderabad',
    salaryMin: 8.0,
    salaryMax: 10.5,
    minCgpa: 6.5,
    eligibleDepartments: 'CSE, IT, ECE, EEE',
    graduationYear: 2026,
    requiredSkills: 'Full Stack, Java/Python, Spring Boot, Microservices, DevOps',
    description: 'Elite programming role at Infosys focused on rapid innovation, complex full-stack engineering, microservices deployment, and advanced architectural challenges.',
    deadline: '2026-11-20',
    status: 'ACTIVE',
    totalOpenings: 35,
    matchScore: 89,
    matchReasons: [
      'Java & Spring Boot match Specialist requirements',
      'Batch and CGPA fully compatible'
    ]
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Alex Chen',
    department: 'CSE',
    cgpa: 8.6,
    driveId: 1,
    jobTitle: 'Java Backend Developer',
    companyName: 'Oracle',
    companyLogo: '🏛️',
    location: 'Bangalore & Hyderabad',
    salaryMin: 10.0,
    salaryMax: 14.0,
    status: 'TECHNICAL_INTERVIEW',
    matchScore: 94,
    appliedDate: '2026-10-02',
    notes: 'Candidate demonstrates strong Java OOP and Spring Boot foundation. Shortlisted for Technical Evaluation Round 1.'
  },
  {
    id: 2,
    studentId: 1,
    studentName: 'Alex Chen',
    department: 'CSE',
    cgpa: 8.6,
    driveId: 4,
    jobTitle: 'Software Engineer - Campus Graduate',
    companyName: 'Google',
    companyLogo: '🌐',
    location: 'Bangalore & Hyderabad',
    salaryMin: 18.0,
    salaryMax: 24.0,
    status: 'SHORTLISTED',
    matchScore: 86,
    appliedDate: '2026-10-04',
    notes: 'Resume and coding test passed initial screening criteria. Awaiting slot confirmation.'
  },
  {
    id: 3,
    studentId: 2,
    studentName: 'Priya Patel',
    department: 'IT',
    cgpa: 9.2,
    driveId: 2,
    jobTitle: 'Software Development Engineer (SDE I)',
    companyName: 'Microsoft',
    companyLogo: '💻',
    location: 'Hyderabad & Bangalore',
    salaryMin: 16.0,
    salaryMax: 22.0,
    status: 'SELECTED',
    matchScore: 98,
    appliedDate: '2026-09-28',
    notes: 'Outstanding technical performance across all rounds. Offer letter extended: ₹20 LPA.'
  },
  {
    id: 4,
    studentId: 3,
    studentName: 'Rohit Verma',
    department: 'ECE',
    cgpa: 7.8,
    driveId: 5,
    jobTitle: 'Digital Cadre Systems Engineer',
    companyName: 'Tata Consultancy Services (TCS)',
    companyLogo: '🏢',
    location: 'Mumbai & Pune',
    salaryMin: 7.0,
    salaryMax: 9.0,
    status: 'SHORTLISTED',
    matchScore: 84,
    appliedDate: '2026-10-05',
    notes: 'Selected for Digital Cadre assessment based on C/C++ and IoT project portfolio.'
  },
  {
    id: 5,
    studentId: 4,
    studentName: 'Ananya Sharma',
    department: 'CSE (AI/ML)',
    cgpa: 8.9,
    driveId: 3,
    jobTitle: 'Cloud Platform Associate',
    companyName: 'Amazon',
    companyLogo: '📦',
    location: 'Hyderabad & Bangalore',
    salaryMin: 14.0,
    salaryMax: 18.0,
    status: 'TECHNICAL_INTERVIEW',
    matchScore: 92,
    appliedDate: '2026-10-01',
    notes: 'Technical assessment score: 95/100. Scheduled for Technical Interview Round 2.'
  },
  {
    id: 6,
    studentId: 5,
    studentName: 'Kavya Reddy',
    department: 'EEE',
    cgpa: 8.2,
    driveId: 6,
    jobTitle: 'Specialist Programmer (Power Programmer)',
    companyName: 'Infosys',
    companyLogo: '🔷',
    location: 'Bangalore & Hyderabad',
    salaryMin: 8.0,
    salaryMax: 10.5,
    status: 'SELECTED',
    matchScore: 90,
    appliedDate: '2026-09-25',
    notes: 'Cleared HackWithInfy grand challenge. Selected as Specialist Programmer at ₹9.5 LPA.'
  }
];

export const INITIAL_INTERVIEWS = [
  {
    id: 1,
    applicationId: 1,
    jobTitle: 'Java Backend Developer',
    companyName: 'Oracle',
    interviewType: 'Technical Round 1 (System & Java Core)',
    scheduledAt: '2026-10-12T11:00:00',
    meetingLink: 'https://meet.google.com/xyz-campushire-oracle',
    interviewerName: 'Sanjay Deshmukh (Principal Architect)',
    status: 'SCHEDULED'
  },
  {
    id: 2,
    applicationId: 5,
    jobTitle: 'Cloud Platform Associate',
    companyName: 'Amazon',
    interviewType: 'Technical Round 2 (Algorithms & AWS)',
    scheduledAt: '2026-10-14T14:30:00',
    meetingLink: 'https://chime.aws/campushire-amzn-mock',
    interviewerName: 'Deepa Nair (Senior DevOps Lead)',
    status: 'SCHEDULED'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Oracle Technical Interview Scheduled! 🏛️',
    message: 'Your Technical Round 1 for Oracle (Java Backend Developer) is scheduled for Friday at 11:00 AM.',
    type: 'INTERVIEW',
    isRead: false,
    createdAt: '2026-10-09T09:30:00'
  },
  {
    id: 2,
    title: 'New Google Placement Drive Active 🌐',
    message: 'Google announced 15 openings for Campus Software Engineers (₹18–24 LPA). Your profile match is 86%!',
    type: 'JOB',
    isRead: false,
    createdAt: '2026-10-08T14:15:00'
  },
  {
    id: 3,
    title: 'CareerBuddy Tip of the Day 💡',
    message: 'Review Java Memory Model, Garbage Collection tuning, and HashMap collisions before your Oracle round!',
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
