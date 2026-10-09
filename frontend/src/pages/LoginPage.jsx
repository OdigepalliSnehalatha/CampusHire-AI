import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MascotIllustration from '../components/illustrations/MascotIllustration';
import { ArrowRight, Lock, Mail, User, ShieldCheck, Sparkles, Building, GraduationCap, Briefcase } from 'lucide-react';

export default function LoginPage({ setActivePage }) {
  const { login, register, switchDemoUser } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('student@campushire.ai');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Alex Chen');
  const [role, setRole] = useState('STUDENT');
  const [department, setDepartment] = useState('Computer Science and Engineering');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (isRegistering) {
        await register({ fullName, email, password, role, department });
      } else {
        await login(email, password);
      }
      setActivePage(role === 'PLACEMENT_OFFICER' ? 'officer-dashboard' : role === 'RECRUITER' ? 'recruiter-dashboard' : 'dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemo = (roleKey, targetPage) => {
    switchDemoUser(roleKey);
    setActivePage(targetPage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-100/70">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Side: Illustration & Motivational Showcase */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Branding */}
          <div className="relative z-10 space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                <Sparkles className="w-5 h-5 text-indigo-300" />
              </div>
              <span className="text-xl font-black tracking-tight">CampusHire AI</span>
            </div>
            <p className="text-xs text-indigo-200 font-medium">Smart Placement & Career Guidance</p>
          </div>

          {/* Central Career Mascot Showcase */}
          <div className="my-8 text-center relative z-10 space-y-4">
            <div className="inline-block p-4 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl">
              <MascotIllustration className="w-24 h-24 sm:w-28 sm:h-28" />
            </div>

            <div className="space-y-2 max-w-xs mx-auto">
              <blockquote className="text-base sm:text-lg font-bold leading-snug tracking-tight text-indigo-100">
                “Your dream career starts with one step.”
              </blockquote>
              <p className="text-xs text-indigo-300 leading-relaxed font-normal">
                Let CareerBuddy AI organize your roadmap, optimize your resume ATS score, and match you with verified placement drives.
              </p>
            </div>
          </div>

          {/* Quick Demo Switcher inside Left Panel */}
          <div className="relative z-10 pt-4 border-t border-indigo-700/60 space-y-2">
            <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider">
              1-Click Instant Demo Login:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student', 'dashboard')}
                className="px-2 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-center transition-all flex flex-col items-center"
              >
                <span className="text-sm">👨‍🎓</span>
                <span className="text-[10px] text-indigo-100">Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('officer', 'officer-dashboard')}
                className="px-2 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-center transition-all flex flex-col items-center"
              >
                <span className="text-sm">👔</span>
                <span className="text-[10px] text-indigo-100">Officer</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('recruiter', 'recruiter-dashboard')}
                className="px-2 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-center transition-all flex flex-col items-center"
              >
                <span className="text-sm">🏢</span>
                <span className="text-[10px] text-indigo-100">Recruiter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {isRegistering ? 'Create Student Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isRegistering
                  ? 'Join CampusHire AI to access smart placement opportunities'
                  : 'Enter your credentials or click any quick demo profile on the left'}
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
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
                        placeholder="Alex Chen"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Account Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
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
                    placeholder="student@campushire.ai"
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
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all"
              >
                <span>{submitting ? 'Authenticating...' : isRegistering ? 'Complete Registration' : 'Sign In to CampusHire'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
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
