// Line-art character illustrations in the same rounded-square style.
// Each SVG is viewBox="0 0 100 110" — size with a className like "w-16".

export const IllustrationTyping = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="110" rx="16" fill="#DDE3F5"/>
    {/* Laptop screen */}
    <rect x="14" y="67" width="72" height="35" rx="4" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Screen lines */}
    <line x1="22" y1="77" x2="78" y2="77" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="22" y1="86" x2="60" y2="86" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round"/>
    <line x1="22" y1="93" x2="71" y2="93" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round"/>
    {/* Laptop base */}
    <rect x="10" y="100" width="80" height="6" rx="3" fill="#18181B"/>
    {/* Body */}
    <rect x="36" y="45" width="28" height="22" rx="7" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Head */}
    <circle cx="50" cy="26" r="17" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Eyes */}
    <circle cx="44" cy="23" r="2.5" fill="#18181B"/>
    <circle cx="56" cy="23" r="2.5" fill="#18181B"/>
    {/* Smile */}
    <path d="M44 31 Q50 37 56 31" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Arms to keyboard */}
    <path d="M36 54 Q21 72 18 100" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M64 54 Q79 72 82 100" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

export const IllustrationCopy = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="110" rx="16" fill="#FFE4E6"/>
    {/* Document shadow */}
    <rect x="65" y="52" width="24" height="34" rx="3" fill="#FECDD3"/>
    {/* Document */}
    <rect x="60" y="46" width="24" height="34" rx="3" fill="white" stroke="#18181B" strokeWidth="1.5"/>
    {/* Document lines */}
    <line x1="66" y1="56" x2="79" y2="56" stroke="#FDA4AF" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="66" y1="63" x2="79" y2="63" stroke="#E4E4E7" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="66" y1="70" x2="74" y2="70" stroke="#E4E4E7" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Sparkle near doc */}
    <path d="M88 38 L90 34 L92 38 L88 38Z" fill="#FB7185"/>
    <path d="M86 36 L90 34 L94 36 L90 38Z" fill="#FB7185"/>
    {/* Body */}
    <rect x="32" y="45" width="28" height="22" rx="7" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Head */}
    <circle cx="46" cy="26" r="17" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Eyes */}
    <circle cx="40" cy="23" r="2.5" fill="#18181B"/>
    <circle cx="52" cy="23" r="2.5" fill="#18181B"/>
    {/* Happy smile */}
    <path d="M40 32 Q46 38 52 32" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Left arm */}
    <path d="M32 54 Q18 74 16 104" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* Right arm reaching for doc */}
    <path d="M60 54 Q66 50 62 47" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* Legs */}
    <path d="M40 67 L38 106" stroke="#18181B" strokeWidth="2" strokeLinecap="round"/>
    <path d="M52 67 L54 106" stroke="#18181B" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IllustrationSearch = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="110" rx="16" fill="#DCFCE7"/>
    {/* Magnifying glass */}
    <circle cx="30" cy="80" r="16" fill="white" stroke="#18181B" strokeWidth="2"/>
    <circle cx="30" cy="80" r="9" fill="#BBF7D0"/>
    {/* Handle */}
    <line x1="42" y1="92" x2="55" y2="105" stroke="#18181B" strokeWidth="3" strokeLinecap="round"/>
    {/* Shine on lens */}
    <path d="M23 74 Q25 71 28 72" stroke="#18181B" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4"/>
    {/* Body */}
    <rect x="36" y="43" width="28" height="22" rx="7" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Head */}
    <circle cx="50" cy="24" r="17" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Eyes - looking left/focused */}
    <circle cx="43" cy="22" r="2.5" fill="#18181B"/>
    <circle cx="55" cy="22" r="2.5" fill="#18181B"/>
    {/* Determined expression */}
    <path d="M44 29 Q50 33 56 29" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Eyebrows angled for focus */}
    <path d="M41 17 Q44 15 47 17" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M53 17 Q56 15 59 17" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Left arm holding magnifying glass */}
    <path d="M36 52 Q22 65 24 76" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* Right arm */}
    <path d="M64 52 Q78 68 78 100" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* Legs */}
    <path d="M44 65 L42 106" stroke="#18181B" strokeWidth="2" strokeLinecap="round"/>
    <path d="M56 65 L58 106" stroke="#18181B" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IllustrationSave = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="110" rx="16" fill="#FEF9C3"/>
    {/* Bookmark floating top-right */}
    <path d="M80 4 L80 28 L72 22 L64 28 L64 4 Z" fill="#FDE047" stroke="#18181B" strokeWidth="1.5" strokeLinejoin="round"/>
    {/* Sparkles */}
    <circle cx="15" cy="18" r="3.5" fill="#FDE047" stroke="#18181B" strokeWidth="1.5"/>
    <circle cx="10" cy="40" r="2.5" fill="#FDE047" stroke="#18181B" strokeWidth="1.5"/>
    <circle cx="88" cy="48" r="2" fill="#FDE047" stroke="#18181B" strokeWidth="1.5"/>
    {/* Body */}
    <rect x="36" y="50" width="28" height="22" rx="7" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Head */}
    <circle cx="50" cy="31" r="17" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Happy arch eyes */}
    <path d="M42 29 Q44 26 46 29" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M54 29 Q56 26 58 29" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Big smile */}
    <path d="M42 38 Q50 45 58 38" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Arms raised/excited */}
    <path d="M36 58 Q20 50 16 40" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M64 58 Q80 50 84 40" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* Legs */}
    <path d="M44 72 L42 106" stroke="#18181B" strokeWidth="2" strokeLinecap="round"/>
    <path d="M56 72 L58 106" stroke="#18181B" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IllustrationBrowse = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="110" rx="16" fill="#DBEAFE"/>
    {/* Category grid */}
    <rect x="8" y="74" width="24" height="15" rx="3" fill="white" stroke="#18181B" strokeWidth="1.5"/>
    <rect x="38" y="74" width="24" height="15" rx="3" fill="#EEF2FF" stroke="#6366F1" strokeWidth="1.5"/>
    <rect x="68" y="74" width="24" height="15" rx="3" fill="white" stroke="#18181B" strokeWidth="1.5"/>
    <rect x="8" y="93" width="24" height="14" rx="3" fill="white" stroke="#18181B" strokeWidth="1.5"/>
    <rect x="38" y="93" width="24" height="14" rx="3" fill="white" stroke="#18181B" strokeWidth="1.5"/>
    <rect x="68" y="93" width="24" height="14" rx="3" fill="white" stroke="#18181B" strokeWidth="1.5"/>
    {/* Dots inside cards */}
    <circle cx="20" cy="81" r="3" fill="#93C5FD"/>
    <circle cx="50" cy="81" r="3" fill="#6366F1"/>
    <circle cx="80" cy="81" r="3" fill="#93C5FD"/>
    <circle cx="20" cy="100" r="2.5" fill="#BFDBFE"/>
    <circle cx="50" cy="100" r="2.5" fill="#BFDBFE"/>
    <circle cx="80" cy="100" r="2.5" fill="#BFDBFE"/>
    {/* Body */}
    <rect x="36" y="43" width="28" height="22" rx="7" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Head */}
    <circle cx="50" cy="24" r="17" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Eyes */}
    <circle cx="44" cy="22" r="2.5" fill="#18181B"/>
    <circle cx="56" cy="22" r="2.5" fill="#18181B"/>
    {/* Smile */}
    <path d="M44 29 Q50 35 56 29" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Arms gesturing to grid */}
    <path d="M36 52 Q18 62 12 72" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M64 52 Q82 62 88 72" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

export const IllustrationLost = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="110" rx="16" fill="#F3E8FF"/>
    {/* Question mark 1 — large, top left */}
    <path d="M12 22 Q12 13 18 13 Q24 13 24 22 Q24 27 18 29 L18 34" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="18" cy="38" r="2" fill="#C084FC"/>
    {/* Question mark 2 — medium, top right */}
    <path d="M73 17 Q73 11 78 11 Q83 11 83 17 Q83 21 78 23 L78 27" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="78" cy="30" r="1.5" fill="#C084FC"/>
    {/* Question mark 3 — small, right */}
    <path d="M85 44 Q85 40 88 40 Q91 40 91 44 Q91 46 88 47 L88 50" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="88" cy="53" r="1" fill="#C084FC"/>
    {/* Body */}
    <rect x="36" y="55" width="28" height="22" rx="7" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* Head */}
    <circle cx="50" cy="36" r="17" fill="white" stroke="#18181B" strokeWidth="2"/>
    {/* X eyes */}
    <path d="M43 31 L47 35 M47 31 L43 35" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M53 31 L57 35 M57 31 L53 35" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Confused mouth (sad arc) */}
    <path d="M44 45 Q50 41 56 45" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Sweat drop */}
    <path d="M64 26 Q67 21 70 26 Q70 31 67 31 Q64 31 64 26 Z" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="1"/>
    {/* Arms raised in confusion */}
    <path d="M36 63 Q18 53 13 42" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M64 63 Q82 53 87 42" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* Legs */}
    <path d="M44 77 L42 106" stroke="#18181B" strokeWidth="2" strokeLinecap="round"/>
    <path d="M56 77 L58 106" stroke="#18181B" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
