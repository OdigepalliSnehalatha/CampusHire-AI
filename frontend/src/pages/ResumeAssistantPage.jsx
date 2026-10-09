import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiApi } from '../services/api';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  TrendingUp,
  RefreshCw,
  Tag,
  ArrowRight
} from 'lucide-react';

export default function ResumeAssistantPage({ setActivePage }) {
  const { user } = useAuth();
  const [analyzing, setAnalyzing] = useState(false);
  const [fileName, setFileName] = useState('Alex_Chen_Java_Resume.pdf');
  const [result, setResult] = useState({
    score: 74,
    summary: 'Your resume has strong academic credentials and clear project titles. To push your ATS score into the top 10% (85+), quantify project impacts with numbers and highlight modern backend framework keywords.',
    completeness: 85,
    missingSections: [
      'Certifications section is missing credential verification URLs',
      'Work Experience / Internship section could include quantifiable metrics'
    ],
    skillSuggestions: [
      'Add Git and GitHub repository links under technical skills',
      'Highlight Java 17+, Spring Boot, and RESTful APIs specifically',
      'Include database tools (MySQL, PostgreSQL, Redis)'
    ],
    projectSuggestions: [
      'Add 2 measurable project achievements (e.g. "Reduced load latency by 35%")',
      'Link live deployed demo URLs alongside GitHub repository links',
      'Clearly mention your individual contributions vs team roles'
    ],
    formattingSuggestions: [
      'Ensure consistent bullet point styling across all project descriptions',
      'Keep resume to a clean single-page ATS-friendly format',
      'Use strong action verbs (e.g., "Architected", "Implemented", "Engineered")'
    ],
    keywordSuggestions: [
      'Spring Boot',
      'Microservices',
      'REST API',
      'Hibernate/JPA',
      'SQL Query Optimization',
      'JUnit/Mockito',
      'Agile/Scrum',
      'CI/CD'
    ],
    aiMode: 'AI Demo Mode (Heuristic ATS Evaluator)'
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      runAnalysis(file.name);
    }
  };

  const runAnalysis = async (name) => {
    setAnalyzing(true);
    try {
      const data = await aiApi.resumeAnalyze('Mock Resume Sample Content', name);
      if (data) setResult(data);
    } catch (e) {
      // Keep rich fallback
    } finally {
      setTimeout(() => setAnalyzing(false), 900);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Campus ATS Scanner & Resume Polisher</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            AI Resume Assistant
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Optimize your resume for company recruiter filters and campus screening rounds
          </p>
        </div>

        {/* Upload Box */}
        <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-indigo-200 text-center space-y-4 hover:border-indigo-400 transition-all shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">
              Upload your Resume (PDF, DOCX)
            </h3>
            <p className="text-xs text-slate-500">
              Active file: <span className="font-mono font-bold text-indigo-600">{fileName}</span>
            </p>
          </div>

          <div className="flex items-center justify-center space-x-3 pt-2">
            <label className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md transition-colors">
              <span>Choose Resume File</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
            </label>
            <button
              onClick={() => runAnalysis(fileName)}
              disabled={analyzing}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${analyzing ? 'animate-spin' : ''}`} />
              <span>{analyzing ? 'Evaluating...' : 'Re-Analyze'}</span>
            </button>
          </div>
        </div>

        {/* Evaluation Results */}
        {result && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Score Banner */}
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                    ATS Readiness Report
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono text-indigo-100">
                    {result.aiMode}
                  </span>
                </div>
                <h2 className="text-2xl font-black">Resume Assessment Summary</h2>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-normal">
                  {result.summary}
                </p>
              </div>

              {/* Score Dial */}
              <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 text-center shrink-0 min-w-[170px]">
                <div className="text-4xl sm:text-5xl font-black text-white mb-1">
                  {result.score}<span className="text-2xl text-indigo-300">/100</span>
                </div>
                <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                  Top 20% Percentile
                </div>
              </div>
            </div>

            {/* Suggestions & Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Actionable Project & Achievement Suggestions */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md space-y-4">
                <div className="flex items-center space-x-2 text-indigo-600">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Project & Content Tweaks
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {result.projectSuggestions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 flex items-start space-x-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formatting & Missing Sections */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md space-y-4">
                <div className="flex items-center space-x-2 text-amber-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Missing Sections & Layout
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {result.missingSections.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 flex items-start space-x-2"
                    >
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Keyword ATS Optimization Cloud */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center space-x-2 text-slate-800">
                <Tag className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  High-Impact ATS Keywords for Target Role
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Incorporate these industry keywords naturally in your skills section and bullet points:
              </p>

              <div className="flex flex-wrap gap-2">
                {result.keywordSuggestions.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
