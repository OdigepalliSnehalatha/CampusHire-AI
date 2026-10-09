import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { notificationsApi } from '../services/api';
import { INITIAL_NOTIFICATIONS } from '../services/mockData';
import {
  Menu,
  Bell,
  Sparkles,
  User,
  LogOut,
  ChevronDown,
  Building2,
  CheckCircle,
  Briefcase
} from 'lucide-react';

export default function DashboardHeader({ activePage, setActivePage, onToggleSidebar }) {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await notificationsApi.getAll();
        if (data && data.length > 0) setNotifications(data);
      } catch (e) {}
    }
    if (user) {
      loadNotifications();
    }
  }, [user]);

  if (!user) return null;

  const displayName = user.fullName || 'Student';
  const firstName = displayName.split(' ')[0];
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Student Command Center';
      case 'jobs': return 'Eligible Placement Drives';
      case 'applications': return 'My Applications Pipeline';
      case 'roadmap': return 'Personalized Placement Roadmap';
      case 'skill-gap': return 'AI Skill Gap Analysis';
      case 'interview-coach': return 'Interactive Interview Simulator';
      case 'resume-assistant': return 'Resume ATS Evaluator';
      case 'companies': return 'Partner Tech Enterprises';
      case 'profile': return 'Candidate Profile & Portfolio';
      case 'officer-dashboard': return 'Placement Officer Command Center';
      case 'recruiter-dashboard': return 'Recruiter Portal';
      default: return 'CampusHire AI';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Menu Toggle & Page Identity */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-black text-slate-900">{getPageTitle()}</span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
              2026 Batch
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Welcome back, <span className="font-bold text-indigo-600">{firstName}</span>!
          </div>
        </div>

        <div className="sm:hidden text-sm font-black text-slate-900">
          Hello, {firstName}! 👋
        </div>
      </div>

      {/* Right: Hello Greeting Pill, Notifications & User Menu */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Horizontal Greeting Pill for Student */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 font-semibold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Hello, <strong className="text-indigo-700 font-extrabold">{firstName}! 👋</strong></span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Notifications ({unreadCount} new)</span>
                <span className="text-[10px] text-indigo-600 font-semibold cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                    <div className="text-xs font-bold text-slate-800">{n.title}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{n.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/60"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
              {user.avatar || firstName[0]}
            </div>
            <span className="text-xs font-bold text-slate-800 hidden sm:inline">{firstName}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-900">{displayName}</div>
                <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                <div className="text-[10px] text-indigo-600 font-bold uppercase mt-1">
                  {user.role.replace('_', ' ')}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setActivePage('profile'); setShowUserMenu(false); }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2 font-medium"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => { setActivePage('dashboard'); setShowUserMenu(false); }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2 font-medium"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Dashboard Overview</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    logout();
                    setActivePage('login');
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2 font-bold"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
