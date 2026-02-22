export default function Catbus({ size = 150, className = '' }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 150 90" className={className}>
      {/* Body */}
      <rect x="15" y="25" width="120" height="45" rx="22" fill="#D4872A" />
      {/* Stripe */}
      <rect x="15" y="40" width="120" height="12" rx="6" fill="#B8721F" />
      {/* Windows */}
      <rect x="30" y="30" width="14" height="14" rx="3" fill="#FFE4B5" />
      <rect x="50" y="30" width="14" height="14" rx="3" fill="#FFE4B5" />
      <rect x="70" y="30" width="14" height="14" rx="3" fill="#FFE4B5" />
      <rect x="90" y="30" width="14" height="14" rx="3" fill="#FFE4B5" />
      <rect x="110" y="30" width="14" height="14" rx="3" fill="#FFE4B5" />
      {/* Left ear */}
      <path d="M 25 25 L 18 8 L 35 22 Z" fill="#D4872A" />
      <path d="M 27 23 L 22 12 L 33 22 Z" fill="#FFB366" />
      {/* Right ear */}
      <path d="M 125 25 L 132 8 L 115 22 Z" fill="#D4872A" />
      <path d="M 123 23 L 128 12 L 117 22 Z" fill="#FFB366" />
      {/* Eyes */}
      <circle cx="30" cy="22" r="5" fill="#FFE4B5" />
      <circle cx="30" cy="22" r="2.5" fill="#2C2C2C" />
      <circle cx="120" cy="22" r="5" fill="#FFE4B5" />
      <circle cx="120" cy="22" r="2.5" fill="#2C2C2C" />
      {/* Grin */}
      <path d="M 55 60 Q 75 72 95 60" fill="none" stroke="#2C2C2C" strokeWidth="2" />
      {/* Legs */}
      <rect x="30" y="65" width="8" height="15" rx="4" fill="#D4872A" />
      <rect x="55" y="65" width="8" height="15" rx="4" fill="#D4872A" />
      <rect x="87" y="65" width="8" height="15" rx="4" fill="#D4872A" />
      <rect x="112" y="65" width="8" height="15" rx="4" fill="#D4872A" />
      {/* Tail */}
      <path d="M 135 45 Q 148 35 145 50 Q 142 60 135 55" fill="#D4872A" stroke="#B8721F" strokeWidth="1" />
    </svg>
  )
}
