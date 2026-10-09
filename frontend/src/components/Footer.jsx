import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg text-white">CampusHire AI</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              "Your Campus. Your Career. Your Future."
            </p>
            <div className="text-[11px] text-slate-500">
              Smart College Placement & Career Guidance Platform
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Student Hub</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActivePage('jobs')} className="hover:text-indigo-400 transition-colors">Eligible Placement Drives</button></li>
              <li><button onClick={() => setActivePage('skill-gap')} className="hover:text-indigo-400 transition-colors">AI Skill Gap Analysis</button></li>
              <li><button onClick={() => setActivePage('roadmap')} className="hover:text-indigo-400 transition-colors">My Placement Roadmap</button></li>
              <li><button onClick={() => setActivePage('interview-coach')} className="hover:text-indigo-400 transition-colors">AI Interview Coach</button></li>
              <li><button onClick={() => setActivePage('resume-assistant')} className="hover:text-indigo-400 transition-colors">AI Resume ATS Assistant</button></li>
            </ul>
          </div>

          {/* Institutional Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Placement Management</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActivePage('officer-dashboard')} className="hover:text-indigo-400 transition-colors">Executive Placement Analytics</button></li>
              <li><button onClick={() => setActivePage('recruiter-dashboard')} className="hover:text-indigo-400 transition-colors">Recruiter Hiring Portal</button></li>
              <li><button onClick={() => setActivePage('companies')} className="hover:text-indigo-400 transition-colors">Partner Companies</button></li>
            </ul>
          </div>

          {/* Architecture & Stack */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">System Stack</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built with Java 21, Spring Boot, Spring Security (JWT), React, Tailwind CSS, and MySQL.
            </p>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 text-[11px] border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Placement Assistant Active</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            © 2026 CampusHire AI. Designed for ambitious students & universities.
          </div>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Powered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>by Google DeepMind pair programming</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
