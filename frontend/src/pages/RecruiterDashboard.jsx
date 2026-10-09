import React, { useState } from 'react';
import { jobsApi, applicationsApi } from '../services/api';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  Plus,
  ArrowRight,
  Filter,
  Check,
  X
} from 'lucide-react';

export default function RecruiterDashboard({ setActivePage }) {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Alex Chen', role: 'Java Backend Developer', cgpa: 8.4, dept: 'CSE', score: 92, stage: 'Technical Interview' },
    { id: 2, name: 'Priya Patel', role: 'Java Backend Developer', cgpa: 8.9, dept: 'IT', score: 95, stage: 'Shortlisted' },
    { id: 3, name: 'Kunal Deshmukh', role: 'Java Backend Developer', cgpa: 7.9, dept: 'CSE', score: 86, stage: 'Applied' },
    { id: 4, name: 'Meera Nair', role: 'Java Backend Developer', cgpa: 8.1, dept: 'ECE', score: 84, stage: 'HR Interview' }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    roleType: 'Full-Time',
    location: 'Hyderabad',
    salaryMin: 6.0,
    salaryMax: 8.0,
    minCgpa: 7.5,
    eligibleDepartments: 'CSE, IT, ECE',
    requiredSkills: 'Java, Spring Boot, MySQL'
  });

  const handleAdvanceCandidate = (candidateId, nextStage) => {
    setCandidates(prev =>
      prev.map(c => c.id === candidateId ? { ...c, stage: nextStage } : c)
    );
    if (nextStage === 'Selected / Offer') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setShowCreateModal(false);
    confetti({ particleCount: 40, spread: 40 });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>TechNova Recruiter Portal</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Recruiter Command Hub
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Review applicant pools, filter by match scores, and release interview invites
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Placement Drive</span>
          </button>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Active Drives</span>
            <div className="text-2xl font-black text-slate-900">3</div>
            <span className="text-[10px] text-indigo-600 font-semibold">TechNova Openings</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Applicants</span>
            <div className="text-2xl font-black text-slate-900">{candidates.length + 24}</div>
            <span className="text-[10px] text-blue-600 font-semibold">Total Profiles</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Shortlisted</span>
            <div className="text-2xl font-black text-slate-900">14</div>
            <span className="text-[10px] text-purple-600 font-semibold">Screening Passed</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Interviews</span>
            <div className="text-2xl font-black text-amber-600">8</div>
            <span className="text-[10px] text-amber-700 font-semibold">Scheduled This Week</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Offers Extended</span>
            <div className="text-2xl font-black text-emerald-600">5</div>
            <span className="text-[10px] text-emerald-700 font-semibold">Accepted</span>
          </div>
        </div>

        {/* Candidate Evaluation Pipeline Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Live Applicant Pipeline</h3>
              <p className="text-xs text-slate-500">Filter candidate suitability by AI match percentage and CGPA</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              TechNova • Java Backend Openings
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Candidate</th>
                  <th className="py-3 px-3">Dept & CGPA</th>
                  <th className="py-3 px-3">Target Role</th>
                  <th className="py-3 px-3">AI Match Score</th>
                  <th className="py-3 px-3">Current Pipeline Stage</th>
                  <th className="py-3 px-3 text-right">Recruiter Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-slate-900">{cand.name}</td>
                    <td className="py-3.5 px-3 text-slate-600">
                      <span className="font-semibold">{cand.dept}</span> • CGPA <span className="font-mono font-bold text-slate-900">{cand.cgpa}</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 font-medium">{cand.role}</td>
                    <td className="py-3.5 px-3">
                      <span className="font-extrabold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {cand.score}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                        {cand.stage}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right space-x-1.5">
                      <button
                        onClick={() => handleAdvanceCandidate(cand.id, 'Technical Interview')}
                        className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-lg transition-colors"
                      >
                        Schedule Tech
                      </button>
                      <button
                        onClick={() => handleAdvanceCandidate(cand.id, 'Selected / Offer')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-xs transition-colors"
                      >
                        Release Offer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Drive Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-black text-slate-900">Post New Campus Drive</h3>
              <form onSubmit={handleCreateJob} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Drive Role Title</label>
                  <input
                    type="text"
                    required
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="e.g. Associate Cloud Engineer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Min Salary (LPA)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newJob.salaryMin}
                      onChange={(e) => setNewJob({ ...newJob, salaryMin: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Max Salary (LPA)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newJob.salaryMax}
                      onChange={(e) => setNewJob({ ...newJob, salaryMax: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Required Skills</label>
                  <input
                    type="text"
                    required
                    value={newJob.requiredSkills}
                    onChange={(e) => setNewJob({ ...newJob, requiredSkills: e.target.value })}
                    placeholder="Java, Spring Boot, MySQL"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Publish Drive
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
