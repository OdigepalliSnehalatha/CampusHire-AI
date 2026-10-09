import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CareerBuddyChat from './components/CareerBuddyChat';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import JobDiscoveryPage from './pages/JobDiscoveryPage';
import ApplicationTrackerPage from './pages/ApplicationTrackerPage';
import SkillGapPage from './pages/SkillGapPage';
import RoadmapPage from './pages/RoadmapPage';
import ResumeAssistantPage from './pages/ResumeAssistantPage';
import InterviewCoachPage from './pages/InterviewCoachPage';
import ProfilePage from './pages/ProfilePage';
import CompaniesPage from './pages/CompaniesPage';
import OfficerDashboard from './pages/OfficerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';

function AppContent() {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState(() => {
    // If user is already in session, default to their dashboard, otherwise landing
    return user ? 'dashboard' : 'landing';
  });

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage setActivePage={setActivePage} />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'dashboard':
        return <StudentDashboard setActivePage={setActivePage} />;
      case 'jobs':
        return <JobDiscoveryPage setActivePage={setActivePage} />;
      case 'applications':
        return <ApplicationTrackerPage setActivePage={setActivePage} />;
      case 'skill-gap':
        return <SkillGapPage setActivePage={setActivePage} />;
      case 'roadmap':
        return <RoadmapPage setActivePage={setActivePage} />;
      case 'resume-assistant':
        return <ResumeAssistantPage setActivePage={setActivePage} />;
      case 'interview-coach':
        return <InterviewCoachPage setActivePage={setActivePage} />;
      case 'profile':
        return <ProfilePage setActivePage={setActivePage} />;
      case 'companies':
        return <CompaniesPage setActivePage={setActivePage} />;
      case 'officer-dashboard':
      case 'officer-applications':
      case 'officer-students':
        return <OfficerDashboard setActivePage={setActivePage} />;
      case 'recruiter-dashboard':
      case 'recruiter-applicants':
        return <RecruiterDashboard setActivePage={setActivePage} />;
      default:
        return <StudentDashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white font-sans">
      {/* Top Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Persistent Floating AI Career Assistant */}
      <CareerBuddyChat />

      {/* Modern Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
