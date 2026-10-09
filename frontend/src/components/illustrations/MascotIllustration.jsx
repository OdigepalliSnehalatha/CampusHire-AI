import React from 'react';

export default function MascotIllustration({ className = "w-16 h-16", showGlow = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {showGlow && (
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-sky-500/20 rounded-full blur-lg animate-pulse" />
      )}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-md"
      >
        <defs>
          <linearGradient id="robotBodyGrad" x1="50" y1="60" x2="150" y2="170" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1" />
            <stop offset="0.5" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="faceScreenGrad" x1="60" y1="75" x2="140" y2="135" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F172A" />
            <stop offset="1" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="glowEyeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="capGrad" x1="50" y1="20" x2="150" y2="55" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1B4B" />
            <stop offset="1" stopColor="#312E81" />
          </linearGradient>
          <linearGradient id="goldTassel" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FBBF24" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="roadmapGrad" x1="120" y1="120" x2="170" y2="175" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>

        {/* Antenna */}
        <line x1="100" y1="60" x2="100" y2="40" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" />
        <circle cx="100" cy="38" r="7" fill="#38BDF8">
          <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Robot Head Outer Frame */}
        <rect x="52" y="62" width="96" height="78" rx="28" fill="url(#robotBodyGrad)" stroke="#C7D2FE" strokeWidth="2.5" />

        {/* Robot Ears */}
        <rect x="42" y="86" width="10" height="24" rx="5" fill="#8B5CF6" />
        <circle cx="47" cy="98" r="2.5" fill="#38BDF8" />
        <rect x="148" y="86" width="10" height="24" rx="5" fill="#8B5CF6" />
        <circle cx="153" cy="98" r="2.5" fill="#38BDF8" />

        {/* Glossy Face Screen */}
        <rect x="62" y="74" width="76" height="54" rx="18" fill="url(#faceScreenGrad)" />

        {/* Friendly Glowing Eyes (Happy Curved Eyes) */}
        <path d="M74 95 Q82 86 90 95" stroke="url(#glowEyeGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="82" cy="100" r="1.5" fill="#38BDF8" opacity="0.6" />

        <path d="M110 95 Q118 86 126 95" stroke="url(#glowEyeGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="118" cy="100" r="1.5" fill="#38BDF8" opacity="0.6" />

        {/* Cute Cheeks */}
        <ellipse cx="73" cy="108" rx="4" ry="2.5" fill="#F472B6" opacity="0.7" />
        <ellipse cx="127" cy="108" rx="4" ry="2.5" fill="#F472B6" opacity="0.7" />

        {/* Cheerful Robot Smile */}
        <path d="M93 112 Q100 119 107 112" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Graduation Cap (Mortarboard) */}
        <polygon points="100,18 152,32 100,46 48,32" fill="url(#capGrad)" stroke="#818CF8" strokeWidth="1.5" />
        <rect x="84" y="38" width="32" height="12" rx="4" fill="#312E81" />
        {/* Cap Button & Tassel */}
        <circle cx="100" cy="32" r="3.5" fill="url(#goldTassel)" />
        <path d="M100 32 Q130 35 138 52" stroke="url(#goldTassel)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <polygon points="138,52 143,62 133,62" fill="url(#goldTassel)" />

        {/* Robot Body / Chest */}
        <path d="M68 140 C68 135 132 135 132 140 L138 180 C138 186 62 186 62 180 Z" fill="url(#robotBodyGrad)" stroke="#C7D2FE" strokeWidth="2" />
        {/* Core Heart / Power Matrix */}
        <circle cx="100" cy="158" r="8" fill="#38BDF8" opacity="0.9">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <path d="M96 158 L100 154 L104 158 L100 162 Z" fill="#FFFFFF" />

        {/* Left Arm Waving */}
        <path d="M64 146 Q45 138 42 120" stroke="#8B5CF6" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="42" cy="118" r="6" fill="#A5B4FC" />

        {/* Right Arm holding Career Roadmap */}
        <path d="M136 148 Q150 152 156 160" stroke="#8B5CF6" strokeWidth="7" strokeLinecap="round" fill="none" />

        {/* Small Career Roadmap Document */}
        <g transform="rotate(-12 152 156)">
          <rect x="134" y="134" width="34" height="44" rx="4" fill="url(#roadmapGrad)" stroke="#CBD5E1" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
          {/* Roadmap Header Pin */}
          <circle cx="142" cy="142" r="2.5" fill="#EF4444" />
          <line x1="148" y1="142" x2="162" y2="142" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
          {/* Roadmap Steps */}
          <circle cx="142" cy="152" r="2" fill="#10B981" />
          <line x1="147" y1="152" x2="161" y2="152" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="142" y1="154" x2="142" y2="160" stroke="#94A3B8" strokeWidth="1" strokeDasharray="1 1" />
          <circle cx="142" cy="162" r="2" fill="#3B82F6" />
          <line x1="147" y1="162" x2="160" y2="162" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M158 170 L163 166 L160 173 Z" fill="#F59E0B" />
        </g>
      </svg>
    </div>
  );
}
