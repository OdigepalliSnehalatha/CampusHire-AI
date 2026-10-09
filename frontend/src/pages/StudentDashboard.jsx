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
  GraduationCap
} from 'lucide-react';

export default function StudentDashboard({ setActivePage, onOpenChat }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, jobsData, appsData, achData] = await Promise.allSettled([
          studentApi.getProfile(),
          jobsApi.getRecommended(),
          applicationsApi.getMyApplications(),
          studentApi.getAchievements()
        ]);
        if (profData.status === 'fulfilled' && profData.value) setProfile(profData.value);
        if (jobsData.status === 'fulfilled' && jobsData.value) {
          // Normalize if recommended drives structure
          const formatted = jobsData.value.map(item => item.drive ? { ...item.drive, matchScore: item.matchScore, matchReasons: item.matchReasons } : item);
          if (formatted.length > 0) setJobs(formatted);
        }
        if (appsData.status === 'fulfilled' && appsData.value && appsData.value.length > 0) setApplications(appsData.value);
        if (achData.status === 'fulfilled' && achData.value && achData.value.length > 0) setAchievements(achData.value);
      } catch (e) {
        // Fallbacks preserved
      }
    }
    loadData();
  }, []);

  const studentName = profile?.fullName ? profile.fullName.split(' ')[0] : 'Alex';
  const completion = profile?.profileCompletion || 85;

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % CAREER_TIPS.length);
  };

  const eligibleCount = jobs.filter(j => !j.minCgpa || (profile?.cgpa && profile.cgpa >= j.minCgpa)).length;
  const shortlistedCount = applications.filter(a => a.status === 'SHORTLISTED' || a.status.includes('INTERVIEW')).length;
  const selectedCount = applications.filter(a => a.status === 'SELECTED').length;

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
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Good Morning, {studentName}! 👋
            </h1>
            <p className="text-indigo-200 text-sm sm:text-base font-normal">
              Ready to take your next career step?
            </p>
          </div>

          {/* Quick CTA to AI Career Assistant */}
          <div className="flex items-center space-x-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-3 sm:p-4">
            <MascotIllustration className="w-12 h-12 shrink-0" showGlow={false} />
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                <span>CareerBuddy AI</span>
                <span className="text-[10px] bg-indigo-500 px-1.5 py-0.2 rounded font-mono">24/7</span>
              </div>
              <div className="text-[11px] text-indigo-200 mb-1.5">Have a question or feeling nervous?</div>
              <button
                onClick={() => onOpenChat ? onOpenChat() : setActivePage('interview-coach')}
                className="text-[11px] font-bold text-indigo-900 bg-white hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors shadow-xs"
              >
                Chat with Assistant 🤖
              </button>
            </div>
          </div>
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
            {applications.map((app) => (
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
