import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Lock, Mail, User, Sparkles, GraduationCap, Building2, ShieldCheck, Heart } from 'lucide-react';

export default function LoginPage({ setActivePage }) {
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [department, setDepartment] = useState('Computer Science and Engineering');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    try {
      if (isRegistering) {
        const res = await register({ fullName, email, password, role, department });
        if (res?.user?.role === 'PLACEMENT_OFFICER') setActivePage('officer-dashboard');
        else if (res?.user?.role === 'RECRUITER') setActivePage('recruiter-dashboard');
        else setActivePage('dashboard');
      } else {
        const res = await login(email, password);
        if (res?.user?.role === 'PLACEMENT_OFFICER') setActivePage('officer-dashboard');
        else if (res?.user?.role === 'RECRUITER') setActivePage('recruiter-dashboard');
        else setActivePage('dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to fill form credentials for user convenience
  const fillSampleCredentials = (sampleEmail, sampleRole) => {
    setEmail(sampleEmail);
    setPassword('password123');
    setRole(sampleRole);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-pink-50/60">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
        {/* Left Side: Cute CareerBuddy Illusion & Motivational Showcase */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Soft Pastel Background Ambient Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

          {/* Top Branding */}
          <div className="relative z-10 space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                <Sparkles className="w-5 h-5 text-pink-300" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">CampusHire AI</span>
                <span className="block text-[10px] text-pink-200 font-medium">Smart Placement & Guidance</span>
              </div>
            </div>
          </div>

          {/* Professional Career & Placement Growth Illustration */}
          <div className="my-6 text-center relative z-10 space-y-4">
            <div className="inline-block p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl">
              <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto flex items-center justify-center">
                <svg viewBox="0 0 120 120" fill="none" className="w-full h-full drop-shadow-md">
                  <circle cx="60" cy="60" r="54" fill="url(#loginGlow)" fillOpacity="0.3" stroke="#818CF8" strokeWidth="2" strokeDasharray="4 4" />
                  <defs>
                    <radialGradient id="loginGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#818CF8" />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="gradCapGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#C7D2FE" />
                    </linearGradient>
                  </defs>
                  {/* Mortarboard Graduation Cap */}
                  <polygon points="60,28 92,44 60,60 28,44" fill="url(#gradCapGrad)" stroke="#C7D2FE" strokeWidth="2" />
                  <path d="M44,52 L44,68 Q60,78 76,68 L76,52" fill="#4338CA" stroke="#818CF8" strokeWidth="1.5" />
                  <circle cx="60" cy="44" r="3" fill="#FDE047" />
                  <path d="M60,44 Q80,48 84,62" stroke="#FDE047" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <polygon points="84,62 88,72 80,72" fill="#FDE047" />
                  {/* Career Growth Bars & Success Trajectory */}
                  <rect x="36" y="80" width="14" height="20" rx="3" fill="#6366F1" opacity="0.9" />
                  <rect x="53" y="72" width="14" height="28" rx="3" fill="#818CF8" opacity="0.9" />
                  <rect x="70" y="64" width="14" height="36" rx="3" fill="#34D399" opacity="0.9" />
                  <path d="M38,76 L55,68 L76,58" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="76" cy="58" r="3" fill="#FDE047" />
                </svg>
              </div>
            </div>

            <div className="space-y-2 max-w-xs mx-auto">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/25 border border-indigo-400/40 text-indigo-100 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                <span>Smart Placement Portal</span>
              </div>
              <blockquote className="text-base sm:text-lg font-black leading-snug tracking-tight text-white">
                “Your dream career starts with one step.”
              </blockquote>
              <p className="text-xs text-indigo-200/90 leading-relaxed font-normal">
                Discover campus placement drives, track recruitment pipelines, and prepare with tailored career guidance.
              </p>
            </div>
          </div>

          {/* 5 Prototype Students & Roles Quick Selector */}
          <div className="relative z-10 pt-4 border-t border-white/15 space-y-2.5">
            <div className="text-[11px] font-bold text-pink-200 uppercase tracking-wider flex items-center justify-between">
              <span>Prototype Test Accounts:</span>
              <span className="text-[10px] text-indigo-300 font-normal">Click to pre-fill form</span>
            </div>

            {/* Prototype Students Grid */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-pink-300/90 font-semibold block">5 Student Cohorts:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => fillSampleCredentials('alex@campushire.ai', 'STUDENT')}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all group"
                >
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs">👨‍💻</span>
                    <span className="text-[11px] font-bold text-white group-hover:text-pink-200 truncate">Alex Chen</span>
                  </div>
                  <div className="text-[9px] text-pink-200/80 truncate">CSE • 8.6 • Java Backend</div>
                </button>

                <button
                  type="button"
                  onClick={() => fillSampleCredentials('priya@campushire.ai', 'STUDENT')}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all group"
                >
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs">👩‍💻</span>
                    <span className="text-[11px] font-bold text-white group-hover:text-pink-200 truncate">Priya Patel</span>
                  </div>
                  <div className="text-[9px] text-pink-200/80 truncate">IT • 9.2 • React/Cloud</div>
                </button>

                <button
                  type="button"
                  onClick={() => fillSampleCredentials('rohit@campushire.ai', 'STUDENT')}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all group"
                >
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs">👨‍🔧</span>
                    <span className="text-[11px] font-bold text-white group-hover:text-pink-200 truncate">Rohit Verma</span>
                  </div>
                  <div className="text-[9px] text-pink-200/80 truncate">ECE • 7.8 • IoT/Embedded</div>
                </button>

                <button
                  type="button"
                  onClick={() => fillSampleCredentials('ananya@campushire.ai', 'STUDENT')}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all group"
                >
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs">👩‍🔬</span>
                    <span className="text-[11px] font-bold text-white group-hover:text-pink-200 truncate">Ananya Sharma</span>
                  </div>
                  <div className="text-[9px] text-pink-200/80 truncate">AI/ML • 8.9 • PyTorch</div>
                </button>

                <button
                  type="button"
                  onClick={() => fillSampleCredentials('kavya@campushire.ai', 'STUDENT')}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all group"
                >
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs">👩‍💼</span>
                    <span className="text-[11px] font-bold text-white group-hover:text-pink-200 truncate">Kavya Reddy</span>
                  </div>
                  <div className="text-[9px] text-pink-200/80 truncate">EEE • 8.2 • QA/DevOps</div>
                </button>
              </div>
            </div>

            {/* Officer & Recruiter */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fillSampleCredentials('officer@campushire.ai', 'PLACEMENT_OFFICER')}
                className="flex-1 px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-center transition-all flex items-center justify-center space-x-1.5"
              >
                <span className="text-xs">👔</span>
                <span className="text-[10px] text-pink-100 font-medium">Placement Officer</span>
              </button>
              <button
                type="button"
                onClick={() => fillSampleCredentials('recruiter@campushire.ai', 'RECRUITER')}
                className="flex-1 px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-center transition-all flex items-center justify-center space-x-1.5"
              >
                <span className="text-xs">🌐</span>
                <span className="text-[10px] text-pink-100 font-medium">Google Recruiter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Explicit Login & Password Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {isRegistering ? 'Create Your Account' : 'Sign In to CampusHire'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isRegistering
                  ? 'Join students and recruiters on the smart campus career network'
                  : 'Enter your registered email and password to access your dashboard'}
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-in fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegistering && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alex Chen"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Account Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                    >
                      <option value="STUDENT">Student Candidate</option>
                      <option value="PLACEMENT_OFFICER">Placement Officer / Admin</option>
                      <option value="RECRUITER">Company Recruiter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                    >
                      <option value="Computer Science and Engineering">Computer Science (CSE)</option>
                      <option value="Information Technology">Information Technology (IT)</option>
                      <option value="Electronics and Communication">Electronics & Communication (ECE)</option>
                      <option value="Electrical Engineering">Electrical Engineering (EEE)</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@campushire.ai"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all transform active:scale-98"
              >
                <span>
                  {submitting
                    ? 'Authenticating...'
                    : isRegistering
                    ? 'Complete Registration'
                    : 'Sign In to CampusHire'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                {isRegistering
                  ? 'Already have an account? Sign In here'
                  : "Don't have an account? Create a student profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
