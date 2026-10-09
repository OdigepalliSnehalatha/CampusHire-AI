import React from 'react';

export default function HeroIllustration({ className = "w-full max-w-lg h-auto" }) {
  return (
    <div className={`relative ${className}`}>
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute -top-6 -left-6 w-56 h-56 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Badges */}
      <div className="absolute -top-4 left-6 z-20 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 shadow-lg flex items-center space-x-3 transform -rotate-3 hover:rotate-0 transition-transform">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg shadow-inner">
          ✓
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">Placement Offer</div>
          <div className="text-sm font-bold text-slate-800">TechNova • ₹8 LPA</div>
        </div>
      </div>

      <div className="absolute top-1/2 -right-4 z-20 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 shadow-lg flex items-center space-x-3 transform rotate-3 hover:rotate-0 transition-transform">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg shadow-inner">
          ⚡
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">AI Skill Match</div>
          <div className="text-sm font-bold text-indigo-600">92% Match Score</div>
        </div>
      </div>

      <div className="absolute -bottom-4 left-12 z-20 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 shadow-lg flex items-center space-x-3 transform -rotate-2 hover:rotate-0 transition-transform">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg shadow-inner">
          🤖
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">CareerBuddy</div>
          <div className="text-sm font-bold text-slate-800">Interview Ready!</div>
        </div>
      </div>

      {/* Main SVG Vector Illustration */}
      <svg
        viewBox="0 0 540 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl relative z-10"
      >
        <defs>
          <linearGradient id="deskGrad" x1="50" y1="360" x2="490" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E2E8F0" />
            <stop offset="0.5" stopColor="#CBD5E1" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="laptopGrad" x1="180" y1="210" x2="350" y2="330" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E293B" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="190" y1="220" x2="340" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="#312E81" />
            <stop offset="0.5" stopColor="#4338CA" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="hoodieGrad" x1="200" y1="180" x2="330" y2="350" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="230" y1="80" x2="310" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1B4B" />
            <stop offset="1" stopColor="#312E81" />
          </linearGradient>
        </defs>

        {/* Desk Surface */}
        <rect x="40" y="340" width="460" height="14" rx="7" fill="url(#deskGrad)" />
        <rect x="70" y="354" width="16" height="50" rx="3" fill="#94A3B8" />
        <rect x="454" y="354" width="16" height="50" rx="3" fill="#94A3B8" />

        {/* Coffee Mug on Desk */}
        <rect x="90" y="295" width="26" height="34" rx="5" fill="#EEF2F6" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M116 302 C124 302 124 322 116 322" stroke="#CBD5E1" strokeWidth="3" fill="none" />
        <path d="M96 286 Q100 280 102 288" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />

        {/* Career Growth Chart Floating in Background */}
        <g opacity="0.85">
          <rect x="360" y="70" width="140" height="100" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.05))" />
          <path d="M375 145 L405 125 L435 132 L470 95" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="470" cy="95" r="4.5" fill="#10B981" />
          <text x="375" y="90" fill="#64748B" fontSize="10" fontWeight="600">Placement Velocity</text>
          <text x="440" y="90" fill="#10B981" fontSize="11" fontWeight="700">▲ +94%</text>
        </g>

        {/* Student Character Sitting */}
        {/* Back and Body / Hoodie */}
        <path d="M225 185 C210 195 190 230 185 270 L175 350 L345 350 L335 270 C330 230 310 195 295 185 Z" fill="url(#hoodieGrad)" />

        {/* Neck */}
        <rect x="246" y="155" width="28" height="28" rx="6" fill="#FBBF24" />

        {/* Head */}
        <ellipse cx="260" cy="130" rx="26" ry="32" fill="#FCD34D" />

        {/* Hair */}
        <path d="M234 125 C230 95 260 80 285 85 C295 90 292 110 288 120 C280 100 265 95 242 105 Z" fill="url(#hairGrad)" />

        {/* Headphones */}
        <path d="M230 120 C230 85 290 85 290 120" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" fill="none" />
        <rect x="226" y="115" width="10" height="20" rx="5" fill="#6366F1" />
        <rect x="284" y="115" width="10" height="20" rx="5" fill="#6366F1" />

        {/* Face Profile Features */}
        <circle cx="272" cy="126" r="2.5" fill="#1E293B" />
        <path d="M276 138 Q270 144 264 140" stroke="#B45309" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Glasses */}
        <rect x="264" y="120" width="16" height="12" rx="3" stroke="#0F172A" strokeWidth="2" fill="rgba(255,255,255,0.2)" />
        <line x1="280" y1="125" x2="286" y2="122" stroke="#0F172A" strokeWidth="2" />

        {/* Hands on Laptop Keyboard */}
        <ellipse cx="230" cy="285" rx="12" ry="8" fill="#FCD34D" />
        <ellipse cx="290" cy="285" rx="12" ry="8" fill="#FCD34D" />

        {/* Laptop Body */}
        {/* Screen */}
        <rect x="180" y="195" width="160" height="100" rx="8" fill="url(#laptopGrad)" stroke="#475569" strokeWidth="2" />
        <rect x="188" y="202" width="144" height="84" rx="5" fill="url(#screenGrad)" />

        {/* Screen Code & UI Elements */}
        <g opacity="0.95">
          <circle cx="198" cy="212" r="3" fill="#EF4444" />
          <circle cx="206" cy="212" r="3" fill="#F59E0B" />
          <circle cx="214" cy="212" r="3" fill="#10B981" />
          {/* Syntax Lines */}
          <line x1="200" y1="226" x2="260" y2="226" stroke="#A5B4FC" strokeWidth="3" strokeLinecap="round" />
          <line x1="210" y1="236" x2="310" y2="236" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <line x1="220" y1="246" x2="290" y2="246" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
          <line x1="220" y1="256" x2="275" y2="256" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
          <line x1="200" y1="268" x2="240" y2="268" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
          {/* Status Badge on screen */}
          <rect x="270" y="263" width="52" height="14" rx="4" fill="#10B981" />
          <text x="276" y="274" fill="#FFFFFF" fontSize="8" fontWeight="700">HIRED ✓</text>
        </g>

        {/* Laptop Keyboard Base */}
        <path d="M160 295 L360 295 L345 330 L175 330 Z" fill="#0F172A" stroke="#334155" strokeWidth="2" />
        <rect x="225" y="302" width="70" height="10" rx="2" fill="#334155" />
        <rect x="240" y="318" width="40" height="6" rx="2" fill="#1E293B" />
      </svg>
    </div>
  );
}
