import React from 'react';

export default function MascotIllustration({ className = "w-16 h-16", showGlow = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {showGlow && (
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/30 via-purple-400/30 to-indigo-400/30 rounded-full blur-xl animate-pulse" />
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
            <stop offset="45%" stopColor="#FAF5FF" />
            <stop offset="80%" stopColor="#F3E8FF" />
            <stop offset="100%" stopColor="#E9D5FF" />
          </radialGradient>

          {/* Cheerful Belly Gradient */}
          <radialGradient id="bellyGrad" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="100%" stopColor="#FCE7F3" />
          </radialGradient>

          {/* Deep Sparkling Anime Eye Gradient */}
          <linearGradient id="eyeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="40%" stopColor="#312E81" />
            <stop offset="75%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#38BDF8" />
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
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>

        {/* Ambient Floating Sparkles & Stars */}
        <g opacity="0.95">
          {/* Top-Right Star */}
          <path d="M185 45 Q190 55 200 55 Q190 55 185 65 Q180 55 170 55 Q180 55 185 45 Z" fill="url(#starGrad)" />
          {/* Top-Left Star */}
          <path d="M32 60 Q36 68 44 68 Q36 68 32 76 Q28 68 20 68 Q28 68 32 60 Z" fill="url(#starGrad)" />
          {/* Tiny Sparkle Circles */}
          <circle cx="195" cy="85" r="3.5" fill="#F472B6" />
          <circle cx="28" cy="95" r="3" fill="#A855F7" />
          <circle cx="178" cy="180" r="4" fill="#38BDF8" />
          <circle cx="45" cy="175" r="3" fill="#FDE047" />
        </g>

        {/* Cute Soft Fluffy Ears with Pink Centers */}
        {/* Left Ear */}
        <path d="M60 75 C45 35 70 20 85 55 Z" fill="url(#cuteBodyGrad)" stroke="#C084FC" strokeWidth="2.5" />
        <path d="M64 70 C53 42 70 32 80 56 Z" fill="#FCE7F3" opacity="0.9" />

        {/* Right Ear */}
        <path d="M140 75 C155 35 130 20 115 55 Z" fill="url(#cuteBodyGrad)" stroke="#C084FC" strokeWidth="2.5" />
        <path d="M136 70 C147 42 130 32 120 56 Z" fill="#FCE7F3" opacity="0.9" />

        {/* Chubby, Round Adorable Silhouette */}
        <path
          d="M55 130 C45 95 65 65 100 65 C135 65 155 95 145 130 C155 165 135 195 100 195 C65 195 45 165 55 130 Z"
          fill="url(#cuteBodyGrad)"
          stroke="#C084FC"
          strokeWidth="2.5"
        />

        {/* Soft Pink Tummy Patch */}
        <ellipse cx="100" cy="148" rx="34" ry="32" fill="url(#bellyGrad)" opacity="0.95" />

        {/* Tiny Scholar Graduation Cap Tilted Playfully on Head */}
        <g transform="rotate(-10 100 50)">
          {/* Mortarboard Diamond */}
          <polygon points="100,24 144,37 100,50 56,37" fill="url(#capGrad)" stroke="#818CF8" strokeWidth="1.5" />
          {/* Cap Skull Under-band */}
          <path d="M80 42 Q100 48 120 42 L122 52 Q100 58 78 52 Z" fill="#1E1B4B" />
          {/* Golden Button */}
          <circle cx="100" cy="37" r="3.5" fill="url(#goldTassel)" />
          {/* Dangling Ribbon & Tassel */}
          <path d="M100 37 Q132 40 138 56" stroke="url(#goldTassel)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <polygon points="138,56 143,66 133,66" fill="url(#goldTassel)" />
        </g>

        {/* Ultra-Cute Big Sparkling Boba Anime Eyes & Expressive Eyebrows */}
        {/* Soft, Cheerful Arched Eyebrows */}
        <path d="M66 88 Q76 83 87 87" stroke="#4338CA" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M113 87 Q124 83 134 88" stroke="#4338CA" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Left Eye */}
        <g>
          {/* Main Eye Orb */}
          <ellipse cx="76" cy="112" rx="16" ry="19.5" fill="url(#eyeGrad)" />
          {/* Eye Outer Soft Glow */}
          <ellipse cx="76" cy="112" rx="16" ry="19.5" stroke="#312E81" strokeWidth="1.5" fill="none" />
          {/* Bottom Crescent Shimmer */}
          <path d="M64 118 C66 128 86 128 88 118 C85 125 67 125 64 118 Z" fill="#67E8F9" opacity="0.65" />
          {/* Main Giant Gloss Highlight (Upper Left) */}
          <ellipse cx="71" cy="103" rx="6.5" ry="8" transform="rotate(-15 71 103)" fill="#FFFFFF" />
          {/* Secondary Four-Point Star Catchlight (Mid Right) */}
          <path d="M83 115 Q85 119 88 119 Q85 119 83 123 Q82 119 79 119 Q82 119 83 115 Z" fill="#FFFFFF" />
          {/* Cute Micro-Dot Sparkles */}
          <circle cx="73" cy="122" r="2.2" fill="#E0F2FE" />
          <circle cx="79" cy="125" r="1.3" fill="#FFFFFF" />
          {/* Fluttery Cute Anime Eyelashes */}
          <path d="M61 100 Q74 91 90 98" stroke="#1E1B4B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M88 97 L93 94" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M63 103 L59 99" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Right Eye */}
        <g>
          {/* Main Eye Orb */}
          <ellipse cx="124" cy="112" rx="16" ry="19.5" fill="url(#eyeGrad)" />
          {/* Eye Outer Soft Glow */}
          <ellipse cx="124" cy="112" rx="16" ry="19.5" stroke="#312E81" strokeWidth="1.5" fill="none" />
          {/* Bottom Crescent Shimmer */}
          <path d="M112 118 C114 128 134 128 136 118 C133 125 115 125 112 118 Z" fill="#67E8F9" opacity="0.65" />
          {/* Main Giant Gloss Highlight (Upper Left) */}
          <ellipse cx="119" cy="103" rx="6.5" ry="8" transform="rotate(-15 119 103)" fill="#FFFFFF" />
          {/* Secondary Four-Point Star Catchlight (Mid Right) */}
          <path d="M131 115 Q133 119 136 119 Q133 119 131 123 Q130 119 127 119 Q130 119 131 115 Z" fill="#FFFFFF" />
          {/* Cute Micro-Dot Sparkles */}
          <circle cx="121" cy="122" r="2.2" fill="#E0F2FE" />
          <circle cx="127" cy="125" r="1.3" fill="#FFFFFF" />
          {/* Fluttery Cute Anime Eyelashes */}
          <path d="M110 98 Q126 91 139 100" stroke="#1E1B4B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M137 99 L142 95" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M112 101 L108 98" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Rosy Blush Cheeks with Soft Floating Hearts */}
        <ellipse cx="59" cy="128" rx="11" ry="7" fill="url(#blushGrad)" />
        <ellipse cx="141" cy="128" rx="11" ry="7" fill="url(#blushGrad)" />
        {/* Left Cheek Mini Heart */}
        <path d="M58 125 C58 123 60 122 61 124 C62 122 64 123 64 125 C64 127 61 129 61 129 C61 129 58 127 58 125 Z" fill="#FB7185" opacity="0.9" />
        {/* Right Cheek Mini Heart */}
        <path d="M139 125 C139 123 141 122 142 124 C143 122 145 123 145 125 C145 127 142 129 142 129 C142 129 139 127 139 125 Z" fill="#FB7185" opacity="0.9" />

        {/* Irresistibly Adorable Joyful Open Kitten Smile with Pink Tongue & Highlights */}
        <g>
          {/* Mouth Cavity */}
          <path
            d="M92 123 C92 138 108 138 108 123 C104 121 100 124 100 124 C100 124 96 121 92 123 Z"
            fill="#E11D48"
            stroke="#4C1D95"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Plump Baby-Pink Tongue */}
          <path
            d="M95 129 C95 136 105 136 105 129 C102 127 98 127 95 129 Z"
            fill="#FDA4AF"
          />
          {/* Tongue Gloss Specular Highlight */}
          <ellipse cx="100" cy="132" rx="2" ry="1" fill="#FFFFFF" opacity="0.9" />
          {/* Upper Lip Kitten 'ω' Arch */}
          <path
            d="M91 123 Q96 120.5 100 123.5 Q104 120.5 109 123"
            stroke="#4C1D95"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Corner Dimples */}
          <path d="M90 123 Q88 121 89 119.5" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M110 123 Q112 121 111 119.5" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </g>

        {/* Cute Little Feet Paws */}
        <ellipse cx="78" cy="192" rx="12" ry="7" fill="#F3E8FF" stroke="#C084FC" strokeWidth="1.5" />
        <ellipse cx="122" cy="192" rx="12" ry="7" fill="#F3E8FF" stroke="#C084FC" strokeWidth="1.5" />

        {/* Right Paw holding Cute Career Scroll / Roadmap */}
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
        <circle cx="140" cy="149" r="5.5" fill="#FFFFFF" />

        {/* Left Little Waving Paw */}
        <path d="M72 140 Q55 134 50 124" stroke="#D8B4FE" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="49" cy="123" r="6" fill="#FFFFFF" />

        {/* Tiny Floating Star on Paw */}
        <path d="M42 112 Q45 117 50 117 Q45 117 42 122 Q39 117 34 117 Q39 117 42 112 Z" fill="url(#starGrad)" />
      </svg>
    </div>
  );
}
