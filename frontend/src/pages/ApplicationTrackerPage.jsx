import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { applicationsApi } from '../services/api';
import { INITIAL_APPLICATIONS } from '../services/mockData';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  IndianRupee,
  ChevronRight,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export default function ApplicationTrackerPage({ setActivePage }) {
  const { user } = useAuth();
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);

  useEffect(() => {
    async function loadApps() {
      try {
        const data = await applicationsApi.getMyApplications();
        if (data && data.length > 0) setApplications(data);
      } catch (e) {
        // fallback
      }
    }
    loadApps();
  }, []);

  const stages = [
    { key: 'APPLIED', label: 'Applied' },
    { key: 'SHORTLISTED', label: 'Shortlisted' },
    { key: 'TECHNICAL_INTERVIEW', label: 'Technical Interview' },
    { key: 'HR_INTERVIEW', label: 'HR Interview' },
    { key: 'SELECTED', label: 'Selected / Offer' }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'APPLIED': return 0;
      case 'SHORTLISTED': return 1;
      case 'TECHNICAL_INTERVIEW': return 2;
      case 'HR_INTERVIEW': return 3;
      case 'SELECTED': return 4;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Application Lifecycle & Milestones</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Application Tracking Pipeline
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Monitor each recruitment stage from initial resume submission to final selection
          </p>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {applications.map((app) => {
            const currentIdx = getStageIndex(app.status);

            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6"
              >
                {/* Application Header Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl shadow-inner">
                      {app.companyLogo || '🏢'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {app.companyName}
                      </div>
                      <h2 className="text-xl font-black text-slate-900">{app.jobTitle}</h2>
                      <div className="flex items-center space-x-3 text-xs text-slate-600 mt-1">
                        <span>📍 {app.location}</span>
                        <span>💰 ₹{app.salaryMin}–{app.salaryMax} LPA</span>
                        <span>📅 Applied on {app.appliedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {app.matchScore}% Profile Match
                    </span>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-800">
                      {app.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Stepper Timeline Progression */}
                <div className="py-2">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {stages.map((st, sidx) => {
                      const isCompleted = sidx < currentIdx;
                      const isCurrent = sidx === currentIdx;
                      const isPending = sidx > currentIdx;

                      return (
                        <div
                          key={st.key}
                          className={`p-3.5 rounded-2xl border transition-all ${
                            isCurrent
                              ? 'bg-indigo-50/80 border-indigo-500 shadow-sm ring-2 ring-indigo-500/20'
                              : isCompleted
                              ? 'bg-emerald-50/60 border-emerald-300'
                              : 'bg-slate-50 border-slate-200 opacity-60'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1.5">
                            {isCompleted && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            )}
                            {isCurrent && (
                              <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-ping" />
                            )}
                            {isPending && (
                              <span className="w-2.5 h-2.5 bg-slate-300 rounded-full" />
                            )}
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              Step {sidx + 1}
                            </span>
                          </div>
                          <div
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-indigo-900'
                                : isCompleted
                                ? 'text-emerald-900'
                                : 'text-slate-500'
                            }`}
                          >
                            {st.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recruiter / Placement Officer Notes */}
                {app.notes && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Status Update Notes:</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{app.notes}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-2xl">
              📄
            </div>
            <h3 className="text-lg font-bold text-slate-800">No applications submitted yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Explore open placement drives matching your profile and submit your initial application!
            </p>
            <button
              onClick={() => setActivePage('jobs')}
              className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Explore Drives Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
