import React from 'react';
import HeroIllustration from '../components/illustrations/HeroIllustration';
import MascotIllustration from '../components/illustrations/MascotIllustration';
import {
  Compass,
  Sparkles,
  FileText,
  Mic,
  BarChart3,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Building2,
  Users,
  Award,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function LandingPage({ setActivePage }) {
  const stats = [
    { value: '500+', label: 'Students Empowered', sub: 'Active cohorts' },
    { value: '50+', label: 'Partner Companies', sub: 'Top tech enterprises' },
    { value: '100+', label: 'Placement Drives', sub: 'Across 2026 season' },
    { value: '90%', label: 'Avg Profile Completion', sub: 'Campus-wide readiness' }
  ];

  const features = [
    {
      icon: Compass,
      title: 'Smart Placement Discovery',
      description: 'Personalized job recommendations scored by AI based on your CGPA, branch, technical skills, and target roles.',
      color: 'from-blue-500 to-indigo-600',
      tag: 'Matching Engine'
    },
    {
      icon: Sparkles,
      title: 'AI Career Guidance',
      description: 'Meet CareerBuddy 🤖 — your empathetic AI companion guiding you with realistic placement strategies and study schedules.',
      color: 'from-purple-500 to-indigo-600',
      tag: 'CampusBuddy AI'
    },
    {
      icon: FileText,
      title: 'Resume ATS Support',
      description: 'Upload your resume for instant scoring, missing sections alerts, and high-impact action-oriented keyword suggestions.',
      color: 'from-amber-500 to-orange-600',
      tag: 'ATS Scorer'
    },
    {
      icon: Mic,
      title: 'Interview Preparation',
      description: 'Interactive AI Interview Coach with real-time feedback on concept correctness, clarity, and communication confidence.',
      color: 'from-emerald-500 to-teal-600',
      tag: 'Mock Simulator'
    },
    {
      icon: BarChart3,
      title: 'Skill Gap Analysis',
      description: 'Identify the exact skills missing between your current coursework and industry requirements for target roles.',
      color: 'from-rose-500 to-pink-600',
      tag: 'Gap Analyzer'
    }
  ];

  const partners = [
    { name: 'TechNova', domain: 'Enterprise Software', pkg: '₹6–8 LPA', logo: '🏢' },
    { name: 'CloudSphere', domain: 'Cloud & DevOps', pkg: '₹8–10 LPA', logo: '☁️' },
    { name: 'DataCore', domain: 'Big Data & AI', pkg: '₹6–7.5 LPA', logo: '📊' },
    { name: 'InnoSoft', domain: 'Product Engineering', pkg: '₹5.5–7 LPA', logo: '🚀' },
    { name: 'NextGen', domain: 'FinTech & Payments', pkg: '₹7–9 LPA', logo: '⚡' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Next-Generation AI Campus Recruitment Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Build Your Career.<br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 bg-clip-text text-transparent">
                  Find Your Opportunity.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                CampusHire AI helps students discover opportunities, prepare for placements and connect with recruiters — all in one place.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActivePage('dashboard')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('jobs')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200/80 shadow-md shadow-slate-200/50 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Explore Opportunities</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Highlights Trust Checklist */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Real Placement Drives</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Interactive AI Mascot Coach</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Zero ERP Clutter</span>
                </span>
              </div>
            </div>

            {/* Right Hero Custom Vector Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroIllustration className="w-full max-w-md lg:max-w-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Configurable Statistics Section */}
      <section className="bg-slate-900 text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-xs">
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400 bg-clip-text text-transparent mb-1">
                  {s.value}
                </div>
                <div className="text-sm font-bold text-slate-200">{s.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CampusHire? Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Why CampusHire?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Designed to help students excel in modern placements
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We replaced rigid, clunky ERP tables with an intelligent platform that actively coaches, prepares, and matches you to roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl hover:border-indigo-200 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-md shadow-indigo-500/20`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                        {feat.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => setActivePage('dashboard')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                    >
                      <span>Explore Feature</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Special 6th Card: CareerBuddy Mascot spotlight */}
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <MascotIllustration className="w-12 h-12" showGlow={false} />
                  <span className="text-[11px] font-bold text-indigo-200 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                    Always Online
                  </span>
                </div>
                <h3 className="text-lg font-bold">Meet CareerBuddy AI</h3>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                  Stressed about interviews or unsure what to study next? Your AI placement assistant provides empathetic, structured guidance 24/7.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-indigo-700/50">
                <button
                  onClick={() => setActivePage('dashboard')}
                  className="w-full py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs rounded-xl shadow-md transition-all text-center"
                >
                  Chat with CareerBuddy 🤖
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Partner Companies */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Featured Placement Partners</h3>
              <p className="text-xs text-slate-500">Actively hiring for 2026 graduation batch</p>
            </div>
            <button
              onClick={() => setActivePage('companies')}
              className="mt-3 md:mt-0 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <span>View All Hiring Companies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all text-center"
              >
                <div className="text-3xl mb-2">{p.logo}</div>
                <div className="font-bold text-sm text-slate-800">{p.name}</div>
                <div className="text-[11px] text-slate-500 mb-2">{p.domain}</div>
                <div className="inline-block bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/60">
                  {p.pkg}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-tr from-indigo-700 via-indigo-800 to-purple-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden text-center space-y-6">
            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Ready to land your dream offer?
              </h2>
              <p className="text-sm sm:text-base text-indigo-100 leading-relaxed font-normal">
                Join hundreds of students actively preparing for campus drives with CareerBuddy AI and our personalized learning roadmap.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setActivePage('dashboard')}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-sm rounded-2xl shadow-xl transition-all"
              >
                Open Student Dashboard
              </button>
              <button
                onClick={() => setActivePage('login')}
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-900/60 hover:bg-indigo-900/80 text-white font-bold text-sm rounded-2xl border border-indigo-400/30 transition-all"
              >
                Sign In with Demo Accounts
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
