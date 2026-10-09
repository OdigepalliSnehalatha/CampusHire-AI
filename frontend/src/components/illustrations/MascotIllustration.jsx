import React from 'react';

export default function MascotIllustration({ className = "w-16 h-16", showGlow = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {showGlow && (
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/25 via-purple-400/25 to-indigo-400/25 rounded-full blur-xl animate-pulse" />
      )}
      <svg
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-md select-none"
      >
        <defs>
          {/* Soft Pastel Body Gradient */}
          <radialGradient id="cuteBodyGrad" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F5E8FF" />
            <stop offset="85%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#D8B4FE" />
          </radialGradient>

          {/* Cheerful Belly Gradient */}
          <radialGradient id="bellyGrad" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="100%" stopColor="#FCE7F3" />
          </radialGradient>

          {/* Big Sparkly Anime Eye Gradients */}
          <linearGradient id="eyeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="50%" stopColor="#312E81" />
            <stop offset="80%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>

          <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>

          <linearGradient id="goldTassel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="scrollGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>

          <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>

        {/* Ambient Floating Sparkles & Stars */}
        <g opacity="0.9">
          {/* Top-Right Star */}
          <path d="M185 45 Q190 55 200 55 Q190 55 185 65 Q180 55 170 55 Q180 55 185 45 Z" fill="url(#starGrad)" />
          {/* Top-Left Star */}
          <path d="M32 60 Q36 68 44 68 Q36 68 32 76 Q28 68 20 68 Q28 68 32 60 Z" fill="url(#starGrad)" />
          {/* Tiny Sparkle Circles */}
          <circle cx="195" cy="85" r="3" fill="#F472B6" />
          <circle cx="28" cy="95" r="2.5" fill="#A855F7" />
          <circle cx="175" cy="180" r="3.5" fill="#38BDF8" />
          <circle cx="45" cy="175" r="3" fill="#FDE047" />
        </g>

        {/* Cute Soft Fluffy Ears */}
        {/* Left Ear */}
        <path d="M60 75 C45 35 70 20 85 55 Z" fill="url(#cuteBodyGrad)" stroke="#C084FC" strokeWidth="2" />
        <path d="M64 70 C53 42 70 32 80 56 Z" fill="#FCE7F3" opacity="0.85" />

        {/* Right Ear */}
        <path d="M140 75 C155 35 130 20 115 55 Z" fill="url(#cuteBodyGrad)" stroke="#C084FC" strokeWidth="2" />
        <path d="M136 70 C147 42 130 32 120 56 Z" fill="#FCE7F3" opacity="0.85" />

        {/* Chubby, Round Adorable Head & Body */}
        {/* Main Body Silhouette */}
        <path
          d="M55 130 C45 95 65 65 100 65 C135 65 155 95 145 130 C155 165 135 195 100 195 C65 195 45 165 55 130 Z"
          fill="url(#cuteBodyGrad)"
          stroke="#C084FC"
          strokeWidth="2.5"
        />

        {/* Soft Tummy Patch */}
        <ellipse cx="100" cy="148" rx="34" ry="32" fill="url(#bellyGrad)" opacity="0.9" />

        {/* Tiny Adorable Scholar Graduation Cap Tilted on Head */}
        <g transform="rotate(-10 100 50)">
          {/* Mortarboard Diamond */}
          <polygon points="100,26 142,38 100,50 58,38" fill="url(#capGrad)" stroke="#818CF8" strokeWidth="1.5" />
          {/* Cap Skull Under-band */}
          <path d="M82 43 Q100 48 118 43 L120 52 Q100 57 80 52 Z" fill="#1E1B4B" />
          {/* Golden Button */}
          <circle cx="100" cy="38" r="3.5" fill="url(#goldTassel)" />
          {/* Dangling Ribbon & Tassel */}
          <path d="M100 38 Q132 40 138 56" stroke="url(#goldTassel)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <polygon points="138,56 143,66 133,66" fill="url(#goldTassel)" />
        </g>

        {/* Big Expressive Sparkling Anime Eyes */}
        {/* Left Eye */}
        <ellipse cx="78" cy="112" rx="14" ry="17" fill="url(#eyeGrad)" />
        {/* Left Eye Sparkles */}
        <ellipse cx="74" cy="104" rx="5.5" ry="7" fill="#FFFFFF" />
        <circle cx="84" cy="118" r="3" fill="#FFFFFF" />
        <circle cx="75" cy="120" r="1.5" fill="#E0E7FF" />
        {/* Left Eyelash Accent */}
        <path d="M68 98 Q76 94 86 97" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Right Eye */}
        <ellipse cx="122" cy="112" rx="14" ry="17" fill="url(#eyeGrad)" />
        {/* Right Eye Sparkles */}
        <ellipse cx="118" cy="104" rx="5.5" ry="7" fill="#FFFFFF" />
        <circle cx="128" cy="118" r="3" fill="#FFFFFF" />
        <circle cx="119" cy="120" r="1.5" fill="#E0E7FF" />
        {/* Right Eyelash Accent */}
        <path d="M114 97 Q124 94 132 98" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Blushing Rosy Cheeks */}
        <ellipse cx="64" cy="126" rx="9" ry="6" fill="url(#blushGrad)" />
        <ellipse cx="136" cy="126" rx="9" ry="6" fill="url(#blushGrad)" />

        {/* Tiny Sweet Cat/Bunny Mouth (:3 smile) */}
        <path
          d="M93 124 Q97 128 100 124 Q103 128 107 124"
          stroke="#4C1D95"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cute Little Feet Paws */}
        <ellipse cx="78" cy="192" rx="12" ry="7" fill="#F3E8FF" stroke="#C084FC" strokeWidth="1.5" />
        <ellipse cx="122" cy="192" rx="12" ry="7" fill="#F3E8FF" stroke="#C084FC" strokeWidth="1.5" />

        {/* Left Paws holding Cute Career Scroll / Roadmap */}
        {/* Rolled Certificate / Roadmap Scroll */}
        <g transform="rotate(18 140 148)">
          <rect x="130" y="128" width="16" height="42" rx="5" fill="url(#scrollGrad)" stroke="#F59E0B" strokeWidth="1.5" />
          {/* Scroll Tie Ribbon */}
          <rect x="129" y="144" width="18" height="6" rx="2" fill="#F43F5E" />
          <polygon points="147,150 153,158 143,156" fill="#F43F5E" />
          {/* Mini Gold Seal */}
          <circle cx="138" cy="147" r="3" fill="#F59E0B" />
        </g>

        {/* Right Little Arm/Paw Holding Scroll */}
        <path d="M125 142 Q136 142 142 149" stroke="#D8B4FE" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="140" cy="149" r="5" fill="#FFFFFF" />

        {/* Left Little Waving Paw */}
        <path d="M72 140 Q55 134 50 124" stroke="#D8B4FE" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="49" cy="123" r="5.5" fill="#FFFFFF" />

        {/* Tiny Floating Star on Paw */}
        <path d="M42 112 Q45 117 50 117 Q45 117 42 122 Q39 117 34 117 Q39 117 42 112 Z" fill="url(#starGrad)" />
      </svg>
    </div>
  );
}
