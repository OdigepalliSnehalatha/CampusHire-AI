// CampusHire AI - API Client Service

const BASE_URL = '/api';

function getToken() {
  return localStorage.getItem('campushire_token');
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('campushire_token', token);
  } else {
    localStorage.removeItem('campushire_token');
  }
}

export async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (response.status === 401) {
      // Unauthorized
      setToken(null);
    }

    if (!response.ok) {
      let errorMessage = 'Request failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        errorMessage = response.statusText;
      }
      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.warn(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
}

// Authentication API
export const authApi = {
  login: (email, password) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }),
  register: (data) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getCurrentUser: () => apiRequest('/auth/me')
};

// Student API
export const studentApi = {
  getProfile: () => apiRequest('/student/profile'),
  updateProfile: (data) => apiRequest('/student/profile', {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  getSkills: () => apiRequest('/student/skills'),
  addSkill: (skill) => apiRequest('/student/skills', {
    method: 'POST',
    body: JSON.stringify(skill)
  }),
  deleteSkill: (id) => apiRequest(`/student/skills/${id}`, { method: 'DELETE' }),
  getProjects: () => apiRequest('/student/projects'),
  addProject: (project) => apiRequest('/student/projects', {
    method: 'POST',
    body: JSON.stringify(project)
  }),
  deleteProject: (id) => apiRequest(`/student/projects/${id}`, { method: 'DELETE' }),
  getCertifications: () => apiRequest('/student/certifications'),
  addCertification: (cert) => apiRequest('/student/certifications', {
    method: 'POST',
    body: JSON.stringify(cert)
  }),
  deleteCertification: (id) => apiRequest(`/student/certifications/${id}`, { method: 'DELETE' }),
  getAchievements: () => apiRequest('/student/achievements'),
  getRoadmap: () => apiRequest('/student/roadmap'),
  updateRoadmapStep: (stepId, status) => apiRequest(`/student/roadmap/${stepId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  })
};

// Placement Drives & Jobs API
export const jobsApi = {
  getAll: () => apiRequest('/jobs'),
  getById: (id) => apiRequest(`/jobs/${id}`),
  getRecommended: () => apiRequest('/jobs/recommended'),
  create: (data) => apiRequest('/jobs', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

// Applications API
export const applicationsApi = {
  apply: (driveId) => apiRequest(`/applications/apply/${driveId}`, { method: 'POST' }),
  getMyApplications: () => apiRequest('/applications/my-applications'),
  getAll: () => apiRequest('/applications'),
  getByDrive: (driveId) => apiRequest(`/applications/drive/${driveId}`),
  updateStatus: (id, status, notes, feedback) => apiRequest(`/applications/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, notes, feedback })
  })
};

// Interviews API
export const interviewsApi = {
  getMyInterviews: () => apiRequest('/interviews/my-interviews'),
  getAll: () => apiRequest('/interviews'),
  schedule: (applicationId, data) => apiRequest(`/interviews/schedule/${applicationId}`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateFeedback: (id, feedback, score) => apiRequest(`/interviews/${id}/feedback`, {
    method: 'PATCH',
    body: JSON.stringify({ feedback, score })
  })
};

// Companies API
export const companiesApi = {
  getAll: () => apiRequest('/companies'),
  getById: (id) => apiRequest(`/companies/${id}`)
};

// AI Assistant & Guidance API
export const aiApi = {
  chat: (message, category, history) => apiRequest('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message, category, history })
  }),
  skillGap: (targetRole) => apiRequest('/ai/skill-gap', {
    method: 'POST',
    body: JSON.stringify({ targetRole })
  }),
  resumeAnalyze: (resumeText, fileName) => apiRequest('/ai/resume-analyze', {
    method: 'POST',
    body: JSON.stringify({ resumeText, fileName })
  }),
  interviewCoach: (data) => apiRequest('/ai/interview-coach', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getTips: () => apiRequest('/ai/tips'),
  getRandomTip: () => apiRequest('/ai/random-tip')
};

// Placement Officer API
export const officerApi = {
  getAnalytics: () => apiRequest('/placement-officer/analytics'),
  getStudents: () => apiRequest('/placement-officer/students'),
  getApplications: () => apiRequest('/placement-officer/applications')
};

// Notifications API
export const notificationsApi = {
  getAll: () => apiRequest('/notifications'),
  getUnreadCount: () => apiRequest('/notifications/unread-count'),
  markAsRead: (id) => apiRequest(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllRead: () => apiRequest('/notifications/mark-all-read', { method: 'POST' })
};
