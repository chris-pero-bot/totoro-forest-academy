export default function SootSprite({ size = 30, asleep = false, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" className={className}>
      <circle cx="15" cy="15" r="12" fill="#2C2C2C" />
      {asleep ? (
        <>
          <line x1="9" y1="13" x2="13" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17" y1="13" x2="21" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="11" cy="12" r="2.5" fill="white" />
          <circle cx="19" cy="12" r="2.5" fill="white" />
          <circle cx="11" cy="12" r="1" fill="#2C2C2C" />
          <circle cx="19" cy="12" r="1" fill="#2C2C2C" />
        </>
      )}
      {/* Tiny legs/fuzz */}
      <line x1="8" y1="24" x2="6" y2="28" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="25" x2="11" y2="29" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="25" x2="19" y2="29" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="24" x2="24" y2="28" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
