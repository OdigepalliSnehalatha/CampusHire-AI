import React, { useState, useEffect } from 'react';
import { officerApi, applicationsApi, jobsApi } from '../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import {
  Users,
  Building2,
  Briefcase,
  FileText,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Plus,
  Send,
  Filter
} from 'lucide-react';

export default function OfficerDashboard({ setActivePage }) {
  const [activeTab, setActiveTab] = useState('analytics'); // analytics, applications, drives, students
  const [analytics, setAnalytics] = useState({
    totalStudents: 520,
    registeredCompanies: 48,
    activeDrives: 16,
    totalApplications: 890,
    shortlistedCount: 285,
    placedStudents: 412,
    placementRate: 82.5,
    averagePackage: 7.8,
    highestPackage: 24.0,
    departmentStats: [
      { department: 'CSE', total: 180, placed: 162, rate: 90.0 },
      { department: 'IT', total: 120, placed: 102, rate: 85.0 },
      { department: 'ECE', total: 110, placed: 85, rate: 77.2 },
      { department: 'EEE', total: 60, placed: 41, rate: 68.3 },
      { department: 'ME', total: 50, placed: 22, rate: 44.0 }
    ],
    monthlyTrends: [
      { month: 'Aug', offers: 24, drives: 6 },
      { month: 'Sep', offers: 58, drives: 12 },
      { month: 'Oct', offers: 95, drives: 18 },
      { month: 'Nov', offers: 112, drives: 14 },
      { month: 'Dec', offers: 68, drives: 8 },
      { month: 'Jan', offers: 55, drives: 10 }
    ],
    topHiringCompanies: [
      { company: 'TechNova', hired: 45, avgPackage: 8.5 },
      { company: 'CloudSphere', hired: 38, avgPackage: 10.2 },
      { company: 'DataCore', hired: 32, avgPackage: 7.8 },
      { company: 'InnoSoft', hired: 28, avgPackage: 6.5 },
      { company: 'NextGen', hired: 24, avgPackage: 9.0 }
    ]
  });

  const [studentCohort, setStudentCohort] = useState([
    { id: 1, name: 'Alex Chen', dept: 'CSE', cgpa: 8.4, target: 'Java Backend', status: 'In Process', match: '92%' },
    { id: 2, name: 'Priya Patel', dept: 'IT', cgpa: 8.9, target: 'Full Stack', status: 'Selected (TechNova)', match: '95%' },
    { id: 3, name: 'Rohit Verma', dept: 'ECE', cgpa: 7.2, target: 'Data Analyst', status: 'Shortlisted', match: '80%' },
    { id: 4, name: 'Ananya Roy', dept: 'CSE', cgpa: 9.1, target: 'Cloud Engineer', status: 'Selected (CloudSphere)', match: '98%' },
    { id: 5, name: 'Vikram Singh', dept: 'EEE', cgpa: 7.6, target: 'Software Engineer', status: 'In Process', match: '78%' }
  ]);

  const COLORS = ['#6366F1', '#38BDF8', '#10B981', '#F59E0B', '#F43F5E'];

  useEffect(() => {
    async function loadData() {
      try {
        const data = await officerApi.getAnalytics();
        if (data) setAnalytics(data);
      } catch (e) {}
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Officer Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Placement & Training Cell Executive Suite</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Placement Officer Command Center
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Live institution recruitment telemetry, company partnerships, and student cohort readiness
            </p>
          </div>

          {/* Quick Sub Tabs */}
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'students' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student Cohort
            </button>
          </div>
        </div>

        {/* 6 Executive Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Students</span>
            <div className="text-2xl font-black text-slate-900">{analytics.totalStudents}</div>
            <span className="text-[10px] text-emerald-600 font-semibold">2026 Batch</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Partner Companies</span>
            <div className="text-2xl font-black text-slate-900">{analytics.registeredCompanies}</div>
            <span className="text-[10px] text-indigo-600 font-semibold">+12 this year</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Active Drives</span>
            <div className="text-2xl font-black text-slate-900">{analytics.activeDrives}</div>
            <span className="text-[10px] text-blue-600 font-semibold">Ongoing Drives</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Applications</span>
            <div className="text-2xl font-black text-slate-900">{analytics.totalApplications}</div>
            <span className="text-[10px] text-purple-600 font-semibold">Submitted</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Placed Students</span>
            <div className="text-2xl font-black text-emerald-600">{analytics.placedStudents}</div>
            <span className="text-[10px] text-emerald-700 font-bold">{analytics.placementRate}% Rate</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Package Stats</span>
            <div className="text-xl font-black text-slate-900">₹{analytics.averagePackage} LPA</div>
            <span className="text-[10px] text-indigo-600 font-bold">Max: ₹{analytics.highestPackage} LPA</span>
          </div>
        </div>

        {/* Tab 1: Recharts Visualizations */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Department-wise Placement Bar Chart */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Department Placement Distribution</h3>
                    <p className="text-xs text-slate-500">Total enrolled vs verified placed offers</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                    2026 Season
                  </span>
                </div>

                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.departmentStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Bar dataKey="total" name="Total Students" fill="#E2E8F0" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="placed" name="Placed Students" fill="#6366F1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Placement Momentum Line Chart */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Hiring Velocity Trend</h3>
                    <p className="text-xs text-slate-500">Monthly offers released by campus recruiters</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Live Telemetry
                  </span>
                </div>

                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                      />
                      <Line type="monotone" dataKey="offers" name="Offers Released" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Company-wise Hiring Breakdown */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Top Corporate Hiring Partners</h3>
                  <p className="text-xs text-slate-500">Recruiters with largest cohort intakes & package averages</p>
                </div>
                <button
                  onClick={() => setActivePage('jobs')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Manage Drives →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
                {analytics.topHiringCompanies.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-center">
                    <div className="text-2xl mb-1">🏢</div>
                    <div className="font-black text-sm text-slate-900">{c.company}</div>
                    <div className="text-xs text-emerald-700 font-bold">{c.hired} Offers Made</div>
                    <div className="text-[11px] text-slate-500">Avg ₹{c.avgPackage} LPA</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Student Cohort Table */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Registered Student Cohort</h3>
                <p className="text-xs text-slate-500">Track candidate status, CGPA qualifications, and target roles</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-3">Candidate</th>
                    <th className="py-3 px-3">Dept</th>
                    <th className="py-3 px-3">CGPA</th>
                    <th className="py-3 px-3">Target Role</th>
                    <th className="py-3 px-3">AI Match</th>
                    <th className="py-3 px-3">Placement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentCohort.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900">{st.name}</td>
                      <td className="py-3 px-3 text-slate-600 font-medium">{st.dept}</td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-800">{st.cgpa}</td>
                      <td className="py-3 px-3 text-slate-700">{st.target}</td>
                      <td className="py-3 px-3 text-emerald-600 font-bold">{st.match}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            st.status.includes('Selected')
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-indigo-100 text-indigo-800'
                          }`}
                        >
                          {st.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
