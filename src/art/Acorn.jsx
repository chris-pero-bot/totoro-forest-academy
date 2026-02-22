export default function Acorn({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      {/* Cap */}
      <ellipse cx="12" cy="8" rx="8" ry="5" fill="#8B6914" />
      <rect x="4" y="6" width="16" height="3" rx="1" fill="#A0781E" />
      {/* Stem */}
      <rect x="11" y="2" width="2" height="4" rx="1" fill="#6B4F10" />
      {/* Body */}
      <ellipse cx="12" cy="16" rx="7" ry="8" fill="#DAA520" />
      {/* Highlight */}
      <ellipse cx="10" cy="14" rx="2" ry="3" fill="#E8C252" opacity="0.6" />
    </svg>
  )
}
