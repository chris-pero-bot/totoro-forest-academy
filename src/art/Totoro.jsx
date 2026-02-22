export default function Totoro({ size = 200, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
      {/* Body */}
      <ellipse cx="100" cy="120" rx="70" ry="75" fill="#777" />
      {/* Belly */}
      <ellipse cx="100" cy="135" rx="50" ry="50" fill="#C4C4A0" />
      {/* Belly chevrons */}
      <path d="M 80 115 L 100 125 L 120 115" fill="none" stroke="#777" strokeWidth="3" />
      <path d="M 75 128 L 100 138 L 125 128" fill="none" stroke="#777" strokeWidth="3" />
      <path d="M 78 141 L 100 151 L 122 141" fill="none" stroke="#777" strokeWidth="3" />
      {/* Left ear */}
      <path d="M 55 60 L 45 15 L 70 50 Z" fill="#777" />
      <path d="M 58 55 L 50 22 L 67 50 Z" fill="#666" />
      {/* Right ear */}
      <path d="M 145 60 L 155 15 L 130 50 Z" fill="#777" />
      <path d="M 142 55 L 150 22 L 133 50 Z" fill="#666" />
      {/* Left eye */}
      <circle cx="78" cy="80" r="14" fill="white" />
      <circle cx="81" cy="80" r="8" fill="#2C2C2C" />
      <circle cx="83" cy="77" r="3" fill="white" />
      {/* Right eye */}
      <circle cx="122" cy="80" r="14" fill="white" />
      <circle cx="119" cy="80" r="8" fill="#2C2C2C" />
      <circle cx="121" cy="77" r="3" fill="white" />
      {/* Nose */}
      <ellipse cx="100" cy="90" rx="6" ry="4" fill="#2C2C2C" />
      {/* Mouth */}
      <path d="M 85 96 Q 100 108 115 96" fill="none" stroke="#2C2C2C" strokeWidth="2" />
      {/* Whiskers left */}
      <line x1="40" y1="82" x2="68" y2="88" stroke="#555" strokeWidth="1.5" />
      <line x1="38" y1="92" x2="67" y2="93" stroke="#555" strokeWidth="1.5" />
      <line x1="42" y1="102" x2="70" y2="98" stroke="#555" strokeWidth="1.5" />
      {/* Whiskers right */}
      <line x1="160" y1="82" x2="132" y2="88" stroke="#555" strokeWidth="1.5" />
      <line x1="162" y1="92" x2="133" y2="93" stroke="#555" strokeWidth="1.5" />
      <line x1="158" y1="102" x2="130" y2="98" stroke="#555" strokeWidth="1.5" />
    </svg>
  )
}
