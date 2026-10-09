import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../services/api';
import { INITIAL_ROADMAP } from '../services/mockData';
import confetti from 'canvas-confetti';
import {
  Compass,
  CheckCircle2,
  Clock,
  Circle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default function RoadmapPage({ setActivePage }) {
  const { user } = useAuth();
  const [steps, setSteps] = useState(INITIAL_ROADMAP);

  useEffect(() => {
    async function loadRoadmap() {
      try {
        const data = await studentApi.getRoadmap();
        if (data && data.length > 0) setSteps(data);
      } catch (e) {
        // fallback
      }
    }
    loadRoadmap();
  }, []);

  const completedCount = steps.filter(s => s.status === 'COMPLETED').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const toggleStepStatus = async (step) => {
    const nextStatus =
      step.status === 'NOT_STARTED'
        ? 'IN_PROGRESS'
        : step.status === 'IN_PROGRESS'
        ? 'COMPLETED'
        : 'NOT_STARTED';

    const updated = steps.map(s => s.id === step.id ? { ...s, status: nextStatus } : s);
    setSteps(updated);

    if (nextStatus === 'COMPLETED') {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    }

    try {
      await studentApi.updateRoadmapStep(step.id, nextStatus);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>Targeted 8-Step Career Sprint</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              My Placement Roadmap
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Your step-by-step master plan to secure a top campus offer
            </p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Milestones</div>
              <div className="text-sm font-black text-indigo-700">{completedCount} of {steps.length} Done</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
              {progressPercent}%
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Roadmap Completion</span>
            <span className="font-mono font-bold text-indigo-600">{progressPercent}% Achieved</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Vertical Stepper Roadmap Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-8">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-100 space-y-8">
            {steps.map((step, idx) => {
              const isCompleted = step.status === 'COMPLETED';
              const isInProgress = step.status === 'IN_PROGRESS';

              return (
                <div key={step.id} className="relative group">
                  {/* Step Marker Bullet */}
                  <div
                    onClick={() => toggleStepStatus(step)}
                    className={`absolute -left-[35px] sm:-left-[43px] top-1 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 ring-4 ring-emerald-50'
                        : isInProgress
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-4 ring-indigo-50 animate-pulse'
                        : 'bg-white border-2 border-slate-300 text-slate-400 hover:border-slate-400'
                    }`}
                    title="Click to toggle milestone status"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isInProgress ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{step.stepNumber}</span>
                    )}
                  </div>

                  {/* Step Body Card */}
                  <div className="bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                          STEP {step.stepNumber}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-medium text-slate-500">{step.category}</span>
                      </div>

                      <button
                        onClick={() => toggleStepStatus(step)}
                        className={`self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full transition-all ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isInProgress
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {isCompleted
                          ? '✓ Completed'
                          : isInProgress
                          ? '○ In Progress'
                          : '○ Not Started'}
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Guidance Card */}
        <div className="bg-indigo-50/80 border border-indigo-200 rounded-3xl p-6 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-indigo-900">Need help with step 4 or 5?</h4>
            <p className="text-xs text-indigo-700">CareerBuddy can recommend high-yield free tutorials & practice questions.</p>
          </div>
          <button
            onClick={() => setActivePage('interview-coach')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            Practice Mock Q&A →
          </button>
        </div>
      </div>
    </div>
  );
}
