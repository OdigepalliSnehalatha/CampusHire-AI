import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  Clock,
  Compass,
  Target,
  Mic,
  FileText,
  Building2,
  User,
  LogOut,
  Sparkles,
  ChevronRight,
  Shield,
  Award,
  Layers,
  X
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, isOpen, onClose }) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const displayName = user.fullName || 'Student';
  const firstName = displayName.split(' ')[0];

  const getNavItems = () => {
    if (user.role === 'PLACEMENT_OFFICER') {
      return [
        { id: 'officer-dashboard', label: 'Command Center', icon: LayoutDashboard },
        { id: 'jobs', label: 'Placement Drives', icon: Briefcase },
        { id: 'officer-applications', label: 'Applications', icon: Clock },
        { id: 'officer-students', label: 'Student Directory', icon: User },
        { id: 'companies', label: 'Partner Companies', icon: Building2 }
      ];
    }

    if (user.role === 'RECRUITER') {
      return [
        { id: 'recruiter-dashboard', label: 'Recruiter Hub', icon: LayoutDashboard },
        { id: 'jobs', label: 'Company Drives', icon: Briefcase },
        { id: 'recruiter-applicants', label: 'Applicant Pipeline', icon: Clock },
        { id: 'companies', label: 'Partner Companies', icon: Building2 }
      ];
    }

    // Default: Student
    return [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'jobs', label: 'Eligible Jobs', icon: Briefcase },
      { id: 'applications', label: 'Applications', icon: Clock },
      { id: 'roadmap', label: 'Placement Roadmap', icon: Compass },
      { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Target },
      { id: 'interview-coach', label: 'Interview Coach', icon: Mic },
      { id: 'resume-assistant', label: 'Resume ATS', icon: FileText },
      { id: 'companies', label: 'Partner Companies', icon: Building2 },
      { id: 'profile', label: 'My Profile', icon: User }
    ];
  };

  const navItems = getNavItems();

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Left Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 shadow-xl lg:shadow-none flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          {/* Top Brand Logo */}
          <div className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavClick(user.role === 'PLACEMENT_OFFICER' ? 'officer-dashboard' : user.role === 'RECRUITER' ? 'recruiter-dashboard' : 'dashboard')}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-indigo-100" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-lg font-black tracking-tight text-slate-900">CampusHire</span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-mono">AI</span>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold tracking-wide">
                  Smart Placement Platform
                </div>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Personalized User Identity Badge (Hello, Priya! etc.) */}
          <div className="p-4 mx-3 my-3 bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-pink-50/60 rounded-2xl border border-indigo-100/80 shadow-xs space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-indigo-200/80 shadow-xs flex items-center justify-center text-xl shrink-0">
                {user.avatar || (user.role === 'PLACEMENT_OFFICER' ? '👔' : user.role === 'RECRUITER' ? '🌐' : '👨‍🎓')}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black text-indigo-950 truncate flex items-center space-x-1">
                  <span>Hello, {firstName}!</span>
                  <span>👋</span>
                </div>
                <div className="text-[11px] font-bold text-slate-700 truncate">
                  {displayName}
                </div>
                <div className="text-[10px] text-indigo-600/90 font-medium truncate">
                  {user.department || (user.role === 'PLACEMENT_OFFICER' ? 'Placement Cell' : user.role === 'RECRUITER' ? 'Campus Talent Lead' : 'Engineering Student')}
                </div>
              </div>
            </div>

            {/* Sub-Pills for CGPA & Status */}
            {user.role === 'STUDENT' && (
              <div className="pt-1.5 border-t border-indigo-200/50 flex items-center justify-between text-[10px]">
                <span className="font-bold text-slate-600">
                  CGPA: <span className="font-mono text-indigo-700 font-black">{user.cgpa || 8.5}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                  Batch 2026
                </span>
              </div>
            )}
          </div>

          {/* Navigation Links - Horizontal Rows */}
          <div className="px-3 space-y-1">
            <div className="px-3 pt-2 pb-1 text-[10px] font-black tracking-wider text-slate-400 uppercase">
              Dashboard Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-200 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer: Log Out */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={() => {
              logout();
              setActivePage('login');
              if (onClose) onClose();
            }}
            className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Sign Out ({firstName})</span>
          </button>
        </div>
      </aside>
    </>
  );
}
