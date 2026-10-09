import React from 'react';

/**
 * CareerBuddy Rabbit Mascot with Graduation Cap 🐰🎓
 * An ultra-cute, friendly scholar bunny companion with long fluffy ears,
 * graduation mortarboard, big sparkling anime boba eyes, soft bunny nose,
 * sweet 'ω' smile, whiskers, and diploma scroll.
 */
export default function MascotIllustration({ className = "w-16 h-16", showGlow = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {showGlow && (
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/25 via-purple-400/25 to-indigo-400/25 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-md select-none"
      >
        <defs>
          {/* Soft Silky Bunny Fur Gradient */}
          <radialGradient id="bunnyFurGrad" cx="45%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#FAF5FF" />
            <stop offset="85%" stopColor="#F3E8FF" />
            <stop offset="100%" stopColor="#E9D5FF" />
          </radialGradient>

          {/* Soft Pink Inner Ear Gradient */}
          <linearGradient id="innerEarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE2E4" />
            <stop offset="60%" stopColor="#FCE7F3" />
            <stop offset="100%" stopColor="#FBCFE8" />
          </linearGradient>

          {/* Cheerful Belly Gradient */}
          <radialGradient id="bunnyBellyGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="100%" stopColor="#FCE7F3" />
          </radialGradient>

          {/* Deep Sparkling Anime Eye Gradient */}
          <linearGradient id="bunnyEyeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="35%" stopColor="#312E81" />
            <stop offset="75%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Graduation Cap Dark Navy Scholar Gradient */}
          <linearGradient id="bunnyCapGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#312E81" />
            <stop offset="60%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Golden Tassel Gradient */}
          <linearGradient id="goldTasselGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Career Scroll Parchment Gradient */}
          <linearGradient id="scrollGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>

          {/* Cheerful Rosy Blush Gradient */}
          <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
          </radialGradient>

          {/* Sparkling Gold Star Gradient */}
          <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* Ambient Floating Sparkles & Career Magic */}
        <g opacity="0.95">
          {/* Top-Right Star */}
          <path d="M205 38 Q210 48 220 48 Q210 48 205 58 Q200 48 190 48 Q200 48 205 38 Z" fill="url(#starGrad)" />
          {/* Top-Left Star */}
          <path d="M28 54 Q32 62 40 62 Q32 62 28 70 Q24 62 16 62 Q24 62 28 54 Z" fill="url(#starGrad)" />
          {/* Tiny Sparkle Circles */}
          <circle cx="216" cy="80" r="3.5" fill="#F472B6" />
          <circle cx="24" cy="95" r="3" fill="#A855F7" />
          <circle cx="202" cy="188" r="4" fill="#38BDF8" />
          <circle cx="36" cy="180" r="3" fill="#FDE047" />
        </g>

        {/* ============================================================ */}
        {/* TALL CUTE FLUFFY RABBIT EARS WITH SOFT PINK INNER PADS */}
        {/* ============================================================ */}

        {/* LEFT RABBIT EAR */}
        <g id="left-rabbit-ear">
          {/* Outer Ear Contour - Tall, arched bunny ear */}
          <path
            d="M74 82 C50 72 38 32 60 12 C72 1 92 18 90 56 L92 80 Z"
            fill="url(#bunnyFurGrad)"
            stroke="#C084FC"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Soft Pink Inner Ear Pad */}
          <path
            d="M75 75 C60 67 51 36 67 18 C75 10 85 24 83 50 L85 75 Z"
            fill="url(#innerEarGrad)"
            opacity="0.92"
          />
          {/* Ear Inner Highlight */}
          <path
            d="M66 28 C64 38 65 52 70 64"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* RIGHT RABBIT EAR */}
        <g id="right-rabbit-ear">
          {/* Outer Ear Contour - Tall, cheerfully tilted bunny ear */}
          <path
            d="M148 80 L150 56 C148 18 168 1 180 12 C202 32 190 72 166 82 Z"
            fill="url(#bunnyFurGrad)"
            stroke="#C084FC"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Soft Pink Inner Ear Pad */}
          <path
            d="M155 75 L157 50 C155 24 165 10 173 18 C189 36 180 67 165 75 Z"
            fill="url(#innerEarGrad)"
            opacity="0.92"
          />
          {/* Ear Inner Highlight */}
          <path
            d="M174 28 C176 38 175 52 170 64"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* ============================================================ */}
        {/* CHUBBY BUNNY SILHOUETTE BODY & HEAD */}
        {/* ============================================================ */}
        <path
          d="M62 144 C48 102 68 74 120 74 C172 74 192 102 178 144 C192 186 166 216 120 216 C74 216 48 186 62 144 Z"
          fill="url(#bunnyFurGrad)"
          stroke="#C084FC"
          strokeWidth="2.5"
        />

        {/* Soft Cheerful Bunny Belly Patch */}
        <ellipse cx="120" cy="168" rx="40" ry="34" fill="url(#bunnyBellyGrad)" opacity="0.95" />

        {/* ============================================================ */}
        {/* GRADUATION CAP (MORTARBOARD) PERCHED ON HEAD */}
        {/* ============================================================ */}
        <g id="scholar-graduation-cap" transform="rotate(-5 120 54)">
          {/* Mortarboard Diamond Cap Top */}
          <polygon
            points="120,32 166,48 120,64 74,48"
            fill="url(#bunnyCapGrad)"
            stroke="#818CF8"
            strokeWidth="1.8"
          />
          {/* Cap Skull Under-band sitting snugly on head */}
          <path
            d="M96 56 Q120 64 144 56 L145 68 Q120 76 95 68 Z"
            fill="#1E1B4B"
          />
          {/* Golden Center Cap Button */}
          <circle cx="120" cy="48" r="4" fill="url(#goldTasselGrad)" stroke="#B45309" strokeWidth="0.8" />

          {/* Dangling Golden Graduation Ribbon & Tassel */}
          <path
            d="M120 48 Q156 50 164 68"
            stroke="url(#goldTasselGrad)"
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Swinging Tassel Brush */}
          <polygon points="164,68 171,82 157,82" fill="url(#goldTasselGrad)" />
          {/* Tassel Ring */}
          <ellipse cx="164" cy="70" rx="3" ry="1.5" fill="#F59E0B" />
        </g>

        {/* ============================================================ */}
        {/* BIG SPARKLING ANIME BOBA EYES & EYEBROWS */}
        {/* ============================================================ */}
        {/* Cheerful Arched Eyebrows */}
        <path d="M78 98 Q89 92 101 96" stroke="#4338CA" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d="M139 96 Q151 92 162 98" stroke="#4338CA" strokeWidth="2.6" strokeLinecap="round" fill="none" />

        {/* LEFT ANIME EYE */}
        <g id="left-eye">
          {/* Main Eye Orb */}
          <ellipse cx="91" cy="122" rx="16.5" ry="20" fill="url(#bunnyEyeGrad)" />
          <ellipse cx="91" cy="122" rx="16.5" ry="20" stroke="#312E81" strokeWidth="1.5" fill="none" />
          {/* Bottom Crescent Shimmer */}
          <path d="M79 128 C81 138 101 138 103 128 C100 135 82 135 79 128 Z" fill="#67E8F9" opacity="0.75" />
          {/* Giant Gloss Specular Highlight (Upper Left) */}
          <ellipse cx="86" cy="113" rx="7" ry="8.5" transform="rotate(-15 86 113)" fill="#FFFFFF" />
          {/* Star Catchlight (Mid Right) */}
          <path d="M98 125 Q100 129 103 129 Q100 129 98 133 Q97 129 94 129 Q97 129 98 125 Z" fill="#FFFFFF" />
          {/* Micro-sparkle dots */}
          <circle cx="88" cy="133" r="2.2" fill="#E0F2FE" />
          <circle cx="94" cy="136" r="1.4" fill="#FFFFFF" />
          {/* Fluttery Anime Eyelashes */}
          <path d="M75 110 Q89 101 106 108" stroke="#1E1B4B" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M104 107 L110 103" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M77 113 L73 109" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" />
        </g>

        {/* RIGHT ANIME EYE */}
        <g id="right-eye">
          {/* Main Eye Orb */}
          <ellipse cx="149" cy="122" rx="16.5" ry="20" fill="url(#bunnyEyeGrad)" />
          <ellipse cx="149" cy="122" rx="16.5" ry="20" stroke="#312E81" strokeWidth="1.5" fill="none" />
          {/* Bottom Crescent Shimmer */}
          <path d="M137 128 C139 138 159 138 161 128 C158 135 140 135 137 128 Z" fill="#67E8F9" opacity="0.75" />
          {/* Giant Gloss Specular Highlight (Upper Left) */}
          <ellipse cx="144" cy="113" rx="7" ry="8.5" transform="rotate(-15 144 113)" fill="#FFFFFF" />
          {/* Star Catchlight (Mid Right) */}
          <path d="M156 125 Q158 129 161 129 Q158 129 156 133 Q155 129 152 129 Q155 129 156 125 Z" fill="#FFFFFF" />
          {/* Micro-sparkle dots */}
          <circle cx="146" cy="133" r="2.2" fill="#E0F2FE" />
          <circle cx="152" cy="136" r="1.4" fill="#FFFFFF" />
          {/* Fluttery Anime Eyelashes */}
          <path d="M134 108 Q151 101 165 110" stroke="#1E1B4B" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M163 109 L168 105" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M136 111 L132 107" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" />
        </g>

        {/* ============================================================ */}
        {/* CUTE BUNNY NOSE & SWEET 'ω' MOUTH */}
        {/* ============================================================ */}
        {/* Sweet Heart-Shaped Bunny Nose */}
        <path
          d="M116 133 C116 130 124 130 124 133 C124 136 120 139 120 139 C120 139 116 136 116 133 Z"
          fill="#FB7185"
        />

        {/* Joyful Open Bunny 'ω' Smile */}
        <g id="bunny-mouth">
          {/* Mouth Cavity */}
          <path
            d="M110 142 C110 157 130 157 130 142 C125 140 120 143 120 143 C120 143 115 140 110 142 Z"
            fill="#E11D48"
            stroke="#4C1D95"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Baby-Pink Tongue */}
          <path
            d="M113 148 C113 155 127 155 127 148 C123 146 117 146 113 148 Z"
            fill="#FDA4AF"
          />
          {/* Tongue Gloss Specular Highlight */}
          <ellipse cx="120" cy="151" rx="2.5" ry="1.2" fill="#FFFFFF" opacity="0.9" />

          {/* Upper Lip 'ω' Arch */}
          <path
            d="M109 142 Q115 138.5 120 142.5 Q125 138.5 131 142"
            stroke="#4C1D95"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Cute Lip Dimples */}
          <path d="M108 142 Q106 140 107 138" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M132 142 Q134 140 133 138" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </g>

        {/* ============================================================ */}
        {/* ROSY BLUSH CHEEKS WITH HEARTS & BUNNY WHISKERS */}
        {/* ============================================================ */}
        {/* Left Cheek Blush */}
        <ellipse cx="71" cy="140" rx="12" ry="7.5" fill="url(#blushGrad)" />
        {/* Right Cheek Blush */}
        <ellipse cx="169" cy="140" rx="12" ry="7.5" fill="url(#blushGrad)" />

        {/* Cheek Floating Mini Hearts */}
        <path d="M70 137 C70 135 72 134 73 136 C74 134 76 135 76 137 C76 139 73 141 73 141 C73 141 70 139 70 137 Z" fill="#FB7185" opacity="0.9" />
        <path d="M167 137 C167 135 169 134 170 136 C171 134 173 135 173 137 C173 139 170 141 170 141 C170 141 167 139 167 137 Z" fill="#FB7185" opacity="0.9" />

        {/* Left Bunny Whiskers */}
        <path d="M64 138 L42 134" stroke="#C084FC" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M64 144 L40 147" stroke="#C084FC" strokeWidth="1.8" strokeLinecap="round" />

        {/* Right Bunny Whiskers */}
        <path d="M176 138 L198 134" stroke="#C084FC" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M176 144 L200 147" stroke="#C084FC" strokeWidth="1.8" strokeLinecap="round" />

        {/* ============================================================ */}
        {/* PAWS, FEET & GRADUATION CAREER DIPLOMA */}
        {/* ============================================================ */}
        {/* Cute Rabbit Feet Paws */}
        <ellipse cx="94" cy="214" rx="13" ry="7.5" fill="#F3E8FF" stroke="#C084FC" strokeWidth="1.6" />
        <ellipse cx="146" cy="214" rx="13" ry="7.5" fill="#F3E8FF" stroke="#C084FC" strokeWidth="1.6" />
        {/* Tiny Foot Toe Pads */}
        <circle cx="91" cy="214" r="1.8" fill="#FCE7F3" />
        <circle cx="95" cy="215" r="1.8" fill="#FCE7F3" />
        <circle cx="99" cy="214" r="1.8" fill="#FCE7F3" />
        <circle cx="143" cy="214" r="1.8" fill="#FCE7F3" />
        <circle cx="147" cy="215" r="1.8" fill="#FCE7F3" />
        <circle cx="151" cy="214" r="1.8" fill="#FCE7F3" />

        {/* Right Paw holding Graduate Career Scroll / Roadmap */}
        <g transform="rotate(18 162 165)">
          <rect x="152" y="142" width="18" height="46" rx="5" fill="url(#scrollGrad)" stroke="#F59E0B" strokeWidth="1.5" />
          {/* Scroll Tie Ribbon */}
          <rect x="151" y="160" width="20" height="6" rx="2" fill="#F43F5E" />
          <polygon points="171,166 177,174 167,172" fill="#F43F5E" />
          {/* Mini Gold Seal */}
          <circle cx="161" cy="163" r="3" fill="#F59E0B" />
        </g>

        {/* Right Paw Arm hugging Scroll */}
        <path d="M148 158 Q158 158 164 165" stroke="#D8B4FE" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="162" cy="165" r="6" fill="#FFFFFF" stroke="#C084FC" strokeWidth="1" />

        {/* Left Waving Paw */}
        <path d="M88 156 Q70 148 64 138" stroke="#D8B4FE" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="63" cy="137" r="6.5" fill="#FFFFFF" stroke="#C084FC" strokeWidth="1" />

        {/* Sparkling Wand Star on Waving Paw */}
        <path d="M54 125 Q57 131 63 131 Q57 131 54 137 Q51 131 45 131 Q51 131 54 125 Z" fill="url(#starGrad)" />
      </svg>
    </div>
  );
}
