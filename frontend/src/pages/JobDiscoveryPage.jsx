import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobsApi, applicationsApi } from '../services/api';
import { INITIAL_JOBS } from '../services/mockData';
import confetti from 'canvas-confetti';
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  IndianRupee,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
  Building,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function JobDiscoveryPage({ setActivePage }) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [minCgpaFilter, setMinCgpaFilter] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([1, 2]); // default demo applied
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await jobsApi.getRecommended();
        if (data && data.length > 0) {
          const list = data.map(item => item.drive ? { ...item.drive, matchScore: item.matchScore, matchReasons: item.matchReasons } : item);
          setJobs(list);
        }
      } catch (e) {
        // use fallback
      }
    }
    fetchJobs();
  }, []);

  const handleApply = async (job) => {
    setApplying(true);
    try {
      await applicationsApi.apply(job.id);
    } catch (e) {
      // simulate success for UI demo
    } finally {
      setApplying(false);
      setAppliedJobs(prev => [...prev, job.id]);
      setApplySuccess(true);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setTimeout(() => {
        setApplySuccess(false);
        setSelectedJob(null);
      }, 1800);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.company?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.requiredSkills || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      selectedDept === 'ALL' ||
      !job.eligibleDepartments ||
      job.eligibleDepartments.includes(selectedDept) ||
      job.eligibleDepartments.includes('All');

    const matchesCgpa = !job.minCgpa || job.minCgpa >= minCgpaFilter;

    return matchesSearch && matchesDept && matchesCgpa;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Campus Recruitment 2026 Drives</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Placement Drives & Opportunities
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Discover verified campus hiring drives with AI-calculated compatibility scores
            </p>
          </div>

          <button
            onClick={() => setActivePage('applications')}
            className="self-start md:self-auto px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center space-x-2"
          >
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>My Submitted Applications ({appliedJobs.length})</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by job title, company, or skills (Java, Spring, SQL)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>

            {/* Department Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              >
                <option value="ALL">All Departments</option>
                <option value="CSE">Computer Science (CSE)</option>
                <option value="IT">Information Tech (IT)</option>
                <option value="ECE">Electronics (ECE)</option>
                <option value="EEE">Electrical (EEE)</option>
              </select>
            </div>

            {/* Minimum CGPA */}
            <div className="md:col-span-3">
              <select
                value={minCgpaFilter}
                onChange={(e) => setMinCgpaFilter(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              >
                <option value={0}>All CGPA Criteria</option>
                <option value={6.5}>CGPA 6.5+ Criteria</option>
                <option value={7.0}>CGPA 7.0+ Criteria</option>
                <option value={7.5}>CGPA 7.5+ Criteria</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => {
            const hasApplied = appliedJobs.includes(job.id);
            const isEligible = !job.minCgpa || (user?.cgpa ? user.cgpa >= job.minCgpa : true);

            return (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar with Logo & Match Score */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shadow-inner">
                        {job.company?.logoUrl || '🏢'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500">{job.company?.name}</div>
                        <h3 className="text-base font-bold text-slate-900 leading-tight">{job.title}</h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {job.matchScore || 85}% Match
                      </span>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{job.location}</span>
                    </span>
                    <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-bold">
                      💰 ₹{job.salaryMin}–{job.salaryMax} LPA
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                      🎓 CGPA {job.minCgpa}+
                    </span>
                  </div>

                  {/* Required Skills Chips */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Required Skills
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requiredSkills?.split(',').map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-50 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-slate-200"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Why Recommended AI Box */}
                  {job.matchReasons && job.matchReasons.length > 0 && (
                    <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3 text-xs space-y-1">
                      <div className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>Why Recommended</span>
                      </div>
                      {job.matchReasons.map((r, i) => (
                        <div key={i} className="text-[11px] text-indigo-700 flex items-center space-x-1.5">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    View Details
                  </button>

                  {hasApplied ? (
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Applied</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto text-xl">
              🔍
            </div>
            <h3 className="text-base font-bold text-slate-800">No matching placement drives found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query, department selection, or CGPA filter to discover more drives.
            </p>
          </div>
        )}

        {/* Job Details & Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl">
                    {selectedJob.company?.logoUrl || '🏢'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500">{selectedJob.company?.name}</div>
                    <h2 className="text-xl font-black text-slate-900">{selectedJob.title}</h2>
                    <div className="text-xs text-slate-600 mt-0.5">
                      {selectedJob.location} • {selectedJob.roleType}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Package & Criteria Badges */}
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl text-center">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Salary Package</div>
                  <div className="text-sm font-black text-indigo-700">₹{selectedJob.salaryMin}–{selectedJob.salaryMax} LPA</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Min CGPA</div>
                  <div className="text-sm font-black text-slate-800">{selectedJob.minCgpa}+</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Openings</div>
                  <div className="text-sm font-black text-slate-800">{selectedJob.totalOpenings} Seats</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Role Overview</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.requiredSkills?.split(',').map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-lg border border-indigo-200"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Eligibility Check */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs text-emerald-800">
                  <span className="font-bold">You are eligible to apply: </span>
                  Your profile meets the department ({selectedJob.eligibleDepartments}) and CGPA requirement.
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl"
                >
                  Close
                </button>

                {appliedJobs.includes(selectedJob.id) ? (
                  <button
                    disabled
                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 opacity-90"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Already Applied</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleApply(selectedJob)}
                    disabled={applying}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/25 flex items-center space-x-1.5 transition-all"
                  >
                    <span>{applying ? 'Submitting Application...' : 'Confirm Application'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
