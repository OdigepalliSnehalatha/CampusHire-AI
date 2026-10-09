import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiApi } from '../services/api';
import {
  Target,
  Sparkles,
  TrendingUp,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export default function SkillGapPage({ setActivePage }) {
  const { user } = useAuth();
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Java Backend Developer');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalysis = async (role) => {
    setLoading(true);
    try {
      const res = await aiApi.skillGap(role);
      setAnalysis(res);
    } catch (e) {
      // Offline fallback
      setAnalysis({
        targetRole: role,
        matchPercentage: 74,
        currentSkills: [
          { name: 'Java Core', proficiency: 80, status: 'proficient' },
          { name: 'OOP Concepts', proficiency: 70, status: 'proficient' },
          { name: 'Git & Version Control', proficiency: 60, status: 'proficient' },
          { name: 'SQL & Database Queries', proficiency: 50, status: 'needs_improvement' },
          { name: 'Spring Framework Basics', proficiency: 30, status: 'beginner' }
        ],
        missingSkills: [
          'Spring Boot 3',
          'RESTful APIs',
          'Spring Data JPA & Hibernate',
          'MySQL Optimization & Indexing',
          'Docker Basics'
        ],
        recommendedLearningOrder: [
          '1. Spring Boot 3 fundamentals and dependency injection',
          '2. Building robust RESTful APIs with validation',
          '3. Spring Data JPA repository patterns and entity relationships',
          '4. MySQL relational database design & query tuning',
          '5. Git branching workflows and collaboration'
        ],
        aiInsight: 'You have a solid foundation in Java core and OOP! Focus next on Spring Boot and REST APIs to bridge the backend industry gap.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis(targetRole);
  }, [targetRole]);

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-2">
              <Target className="w-3.5 h-3.5 text-rose-600" />
              <span>AI Skill Compatibility Engine</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Skill Gap Analysis
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Benchmark your current competencies against industry hiring requirements
            </p>
          </div>

          {/* Role Selector */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500 pl-2">Target Role:</span>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Java Backend Developer">Java Backend Developer</option>
              <option value="Full Stack Software Engineer">Full Stack Software Engineer</option>
              <option value="Data Analyst / BI Engineer">Data Analyst / BI Engineer</option>
            </select>
          </div>
        </div>

        {/* Overview Match Score & AI Insights */}
        {analysis && (
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                  CareerBuddy AI Assessment
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">{analysis.targetRole}</h2>
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-normal">
                {analysis.aiInsight}
              </p>
            </div>

            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-4 text-center shrink-0 min-w-[160px]">
              <div className="text-3xl sm:text-4xl font-black text-white mb-0.5">
                {analysis.matchPercentage}%
              </div>
              <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider">
                Overall Compatibility
              </div>
            </div>
          </div>
        )}

        {/* Detailed Grid: Current Skills vs Missing Skills */}
        {analysis && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Current Skills with Progress Bars */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Current Assessed Skills</h3>
                  <p className="text-xs text-slate-500">Based on your coursework, projects, and assessments</p>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {analysis.currentSkills.length} Verified
                </span>
              </div>

              <div className="space-y-4">
                {analysis.currentSkills.map((sk, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{sk.name}</span>
                      <span className="font-mono font-bold text-slate-600">{sk.proficiency}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          sk.proficiency >= 70
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                            : sk.proficiency >= 50
                            ? 'bg-gradient-to-r from-indigo-500 to-sky-500'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500'
                        }`}
                        style={{ width: `${sk.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Missing Skills & Recommended Learning Order */}
            <div className="lg:col-span-5 space-y-6">
              {/* Missing Skills Alert Box */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
                <div className="flex items-center space-x-2 text-rose-600">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    Target Skills to Acquire
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((ms, idx) => (
                    <span
                      key={idx}
                      className="bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-rose-200/80 flex items-center space-x-1"
                    >
                      <span>+</span>
                      <span>{ms}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Learning Order */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
                <div className="flex items-center space-x-2 text-indigo-600">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    Recommended Learning Order
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {analysis.recommendedLearningOrder.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium flex items-center space-x-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step.replace(/^\d+\.\s*/, '')}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActivePage('roadmap')}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5 mt-2"
                >
                  <span>Sync to My Placement Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
