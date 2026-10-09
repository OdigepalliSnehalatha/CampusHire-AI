import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { studentApi, jobsApi, applicationsApi, aiApi } from '../services/api';
import {
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_ACHIEVEMENTS,
  CAREER_TIPS
} from '../services/mockData';
import MascotIllustration from '../components/illustrations/MascotIllustration';
import {
  Briefcase,
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Target,
  RefreshCw,
  ExternalLink,
  Building,
  GraduationCap,
  Send
} from 'lucide-react';

export default function StudentDashboard({ setActivePage, onOpenChat }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [tipIndex, setTipIndex] = useState(0);
  const [buddyQuery, setBuddyQuery] = useState('');

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        ...user,
        fullName: user.fullName || prev?.fullName
      }));
    }
  }, [user]);

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, jobsData, appsData, achData] = await Promise.allSettled([
          studentApi.getProfile(),
          jobsApi.getRecommended(),
          applicationsApi.getMyApplications(),
          studentApi.getAchievements()
        ]);
        if (profData.status === 'fulfilled' && profData.value) {
          setProfile(prev => ({
            ...prev,
            ...profData.value,
            fullName: user?.fullName || profData.value?.user?.fullName || prev?.fullName || 'Student'
          }));
        }
        if (jobsData.status === 'fulfilled' && jobsData.value) {
          const formatted = jobsData.value.map(item => item.drive ? { ...item.drive, matchScore: item.matchScore, matchReasons: item.matchReasons } : item);
          if (formatted.length > 0) setJobs(formatted);
        }
        if (appsData.status === 'fulfilled' && appsData.value && appsData.value.length > 0) {
          setApplications(appsData.value);
        }
        if (achData.status === 'fulfilled' && achData.value && achData.value.length > 0) {
          setAchievements(achData.value);
        }
      } catch (e) {
        // Fallbacks preserved
      }
    }
    loadData();
  }, [user?.email, user?.id]);

  const studentFullName = user?.fullName || profile?.fullName || profile?.user?.fullName || 'Student';
  const firstName = studentFullName.split(' ')[0];
  const completion = profile?.profileCompletion || user?.profileCompletion || 85;

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % CAREER_TIPS.length);
  };

  const studentApps = applications.filter(a => !profile?.id || a.studentId === profile?.id || a.studentName === studentFullName);
  const displayApps = studentApps.length > 0 ? studentApps : applications;

  const eligibleCount = jobs.filter(j => !j.minCgpa || ((profile?.cgpa || user?.cgpa) && (profile?.cgpa || user?.cgpa) >= j.minCgpa)).length;
  const shortlistedCount = displayApps.filter(a => a.status === 'SHORTLISTED' || a.status.includes('INTERVIEW')).length;
  const selectedCount = displayApps.filter(a => a.status === 'SELECTED').length;

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-indigo-700/50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Placement Drive Season 2026 Active</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center space-x-2">
              <span>Hello, {firstName}!</span>
              <span>👋</span>
            </h1>
            <p className="text-indigo-200 text-sm sm:text-base font-normal">
              Ready to take your next career step?
            </p>
          </div>

          {/* Rabbit Scholar Buddy Mascot + Equal-Width Type Bar */}
          <div className="w-full sm:w-80 md:w-88 flex flex-col items-center">
            {/* The Buddy Picture Box (Rabbit with Graduation Cap) */}
            <div className="w-full bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-3.5 shadow-xl flex flex-col items-center text-center relative overflow-hidden group">
              <div className="flex items-center space-x-1.5 self-center bg-pink-500/30 border border-pink-400/40 text-pink-200 text-[10px] font-black px-2.5 py-0.5 rounded-full mb-1">
                <Sparkles className="w-2.5 h-2.5 text-pink-300" />
                <span>CareerBuddy • Scholar Companion 🐰🎓</span>
              </div>

              {/* Rabbit Mascot Picture */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center my-0.5 transition-transform group-hover:scale-105 duration-300">
                <MascotIllustration className="w-full h-full" showGlow={true} />
              </div>

              {/* Friendly Quote */}
              <p className="text-[11px] text-indigo-100 font-medium leading-tight">
                "Hi {firstName}! Ask me anything about your placements, resume, or interview prep!"
              </p>
            </div>

            {/* Type Bar directly below buddy picture with EQUAL width */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!buddyQuery.trim()) return;
                const q = buddyQuery.trim();
                setBuddyQuery('');
                window.dispatchEvent(new CustomEvent('open-career-buddy', { detail: { query: q } }));
              }}
              className="w-full mt-2.5 flex items-center bg-white rounded-xl shadow-lg border-2 border-indigo-200/90 p-1 focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-300 transition-all"
            >
              <input
                type="text"
                value={buddyQuery}
                onChange={(e) => setBuddyQuery(e.target.value)}
                placeholder="Ask CareerBuddy anything..."
                className="flex-1 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
              />
              <button
                type="submit"
                disabled={!buddyQuery.trim()}
                className="px-3.5 py-2 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold flex items-center space-x-1 shrink-0 transition-transform active:scale-95 shadow-xs"
              >
                <span>Ask</span>
                <Send className="w-3 h-3" />
              </button>
            </form>

            {/* Quick Suggestion Chips matching the width */}
            <div className="w-full mt-2 flex items-center justify-between gap-1 text-[10px]">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-career-buddy', { detail: { query: '💼 Find suitable jobs for my profile' } }))}
                className="flex-1 py-1 px-1 bg-white/10 hover:bg-white/20 text-indigo-100 rounded-lg text-center font-semibold truncate border border-white/15 transition-colors"
              >
                💼 Jobs
              </button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-career-buddy', { detail: { query: '📄 How can I improve my resume for ATS?' } }))}
                className="flex-1 py-1 px-1 bg-white/10 hover:bg-white/20 text-indigo-100 rounded-lg text-center font-semibold truncate border border-white/15 transition-colors"
              >
                📄 Resume
              </button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-career-buddy', { detail: { query: '🎯 What are my missing skills for Java Developer?' } }))}
                className="flex-1 py-1 px-1 bg-white/10 hover:bg-white/20 text-indigo-100 rounded-lg text-center font-semibold truncate border border-white/15 transition-colors"
              >
                🎯 Skills
              </button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-career-buddy', { detail: { query: '🎤 Give me common Java interview questions' } }))}
                className="flex-1 py-1 px-1 bg-white/10 hover:bg-white/20 text-indigo-100 rounded-lg text-center font-semibold truncate border border-white/15 transition-colors"
              >
                🎤 Interview
              </button>
            </div>
          </div>
        </div>

        {/* Left Side Horizontal Navigation Strip */}
        <div className="max-w-7xl mx-auto mt-6 flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActivePage('dashboard')}
            className="px-3.5 py-1.5 rounded-xl bg-white/20 text-white font-bold text-xs backdrop-blur-md border border-white/30 whitespace-nowrap shadow-xs"
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActivePage('jobs')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-100 font-semibold text-xs backdrop-blur-md border border-white/15 whitespace-nowrap transition-colors"
          >
            💼 Eligible Jobs ({eligibleCount})
          </button>
          <button
            onClick={() => setActivePage('applications')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-100 font-semibold text-xs backdrop-blur-md border border-white/15 whitespace-nowrap transition-colors"
          >
            📋 Applications ({displayApps.length})
          </button>
          <button
            onClick={() => setActivePage('roadmap')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-100 font-semibold text-xs backdrop-blur-md border border-white/15 whitespace-nowrap transition-colors"
          >
            🗺️ Career Roadmap
          </button>
          <button
            onClick={() => setActivePage('skill-gap')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-100 font-semibold text-xs backdrop-blur-md border border-white/15 whitespace-nowrap transition-colors"
          >
            🎯 Skill Gap Analysis
          </button>
          <button
            onClick={() => setActivePage('interview-coach')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-100 font-semibold text-xs backdrop-blur-md border border-white/15 whitespace-nowrap transition-colors"
          >
            🎤 Mock Interview Coach
          </button>
          <button
            onClick={() => setActivePage('resume-assistant')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-100 font-semibold text-xs backdrop-blur-md border border-white/15 whitespace-nowrap transition-colors"
          >
            📄 Resume ATS Score
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-8">
        {/* Core Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* 1. Profile Completion with Circular Gauge */}
          <div
            onClick={() => setActivePage('profile')}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profile</span>
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="flex items-center space-x-3 my-1">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="#E2E8F0" strokeWidth="4" fill="transparent" />
                  <circle
                    cx="24" cy="24" r="20"
                    stroke="#6366F1" strokeWidth="4" fill="transparent"
                    strokeDasharray={125.6}
                    strokeDashoffset={125.6 - (125.6 * completion) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-xs font-black text-slate-800">{completion}%</span>
              </div>
              <div className="text-xs font-bold text-slate-800 leading-tight">Profile Ready</div>
            </div>
            <span className="text-[10px] text-indigo-600 font-semibold group-hover:underline">Update info →</span>
          </div>

          {/* 2. Eligible Jobs */}
          <div
            onClick={() => setActivePage('jobs')}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Eligible</span>
              <Briefcase className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 my-1">{eligibleCount}</div>
            <span className="text-[10px] text-blue-600 font-semibold group-hover:underline">Active Drives →</span>
          </div>

          {/* 3. Applications */}
          <div
            onClick={() => setActivePage('applications')}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Applied</span>
              <FileText className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 my-1">{applications.length}</div>
            <span className="text-[10px] text-purple-600 font-semibold group-hover:underline">Track status →</span>
          </div>

          {/* 4. Shortlisted */}
          <div
            onClick={() => setActivePage('applications')}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shortlisted</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 my-1">{shortlistedCount}</div>
            <span className="text-[10px] text-amber-600 font-semibold group-hover:underline">Interview pipeline →</span>
          </div>

          {/* 5. Upcoming Interviews */}
          <div
            onClick={() => setActivePage('applications')}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interviews</span>
              <Calendar className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 my-1">1</div>
            <span className="text-[10px] text-rose-600 font-semibold group-hover:underline">Fri, 11:00 AM →</span>
          </div>

          {/* 6. Selected / Offers */}
          <div
            onClick={() => setActivePage('applications')}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Selected</span>
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-black text-white my-1">{selectedCount > 0 ? selectedCount : 'Pending'}</div>
            <span className="text-[10px] text-emerald-100 font-semibold group-hover:underline">Final rounds →</span>
          </div>
        </div>

        {/* Daily Career Tip of the Day */}
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-700 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Career Tip of the Day
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-800 italic mt-0.5">
                "{CAREER_TIPS[tipIndex]}"
              </p>
            </div>
          </div>

          <button
            onClick={nextTip}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 bg-white hover:bg-amber-100/60 px-3.5 py-1.5 rounded-xl border border-amber-200 shadow-xs flex items-center space-x-1.5 transition-all shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Next Tip</span>
          </button>
        </div>

        {/* Gamification / Achievement Badges */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span>Milestone Achievements</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  {achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked
                </span>
              </h2>
              <p className="text-xs text-slate-500">Track your verified career preparation badges</p>
            </div>
            <button
              onClick={() => setActivePage('roadmap')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <span>View Placement Roadmap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  ach.unlocked
                    ? 'bg-indigo-50/50 border-indigo-200 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-50 grayscale'
                }`}
              >
                <div className="text-2xl mb-1">{ach.icon}</div>
                <div className="text-xs font-bold text-slate-800 truncate">{ach.title}</div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">{ach.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Jobs & Placement Drives */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Recommended for You 🎯</h2>
              <p className="text-xs text-slate-500">Drives matched to your CSE background, 8.4 CGPA, and Java skill stack</p>
            </div>
            <button
              onClick={() => setActivePage('jobs')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <span>View All Drives</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl p-2 bg-slate-100 rounded-xl">{job.company?.logoUrl || '🏢'}</div>
                      <div>
                        <div className="text-xs font-bold text-slate-500">{job.company?.name || 'Tech Company'}</div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">{job.title}</h3>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {job.matchScore || 85}% Match
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-slate-600 pt-1">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">📍 {job.location}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md font-bold text-slate-800">
                      💰 ₹{job.salaryMin}–{job.salaryMax} LPA
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">🎓 CGPA {job.minCgpa}+</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Why recommended reasons */}
                  {job.matchReasons && (
                    <div className="bg-indigo-50/60 rounded-xl p-2.5 space-y-1">
                      <div className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider">Why Recommended:</div>
                      {job.matchReasons.slice(0, 2).map((r, i) => (
                        <div key={i} className="text-[11px] text-indigo-700 flex items-center space-x-1">
                          <span>✓</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActivePage('jobs')}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => setActivePage('jobs')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications & Timeline */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Application Pipeline Timeline</h2>
              <p className="text-xs text-slate-500">Live recruitment progress tracked step-by-step</p>
            </div>
            <button
              onClick={() => setActivePage('applications')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <span>Full Applications Board</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {displayApps.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl p-2 bg-white rounded-xl shadow-xs">{app.companyLogo || '🏢'}</div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{app.jobTitle}</div>
                    <div className="text-xs text-slate-500 font-medium">{app.companyName} • {app.location}</div>
                  </div>
                </div>

                {/* Visual Pipeline Bar */}
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                    {app.status.replace('_', ' ')}
                  </span>
                  <span className="text-slate-400 text-xs">Applied {app.appliedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
