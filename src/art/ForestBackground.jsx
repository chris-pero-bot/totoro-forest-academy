export default function ForestBackground({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background trees */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-40 opacity-20" viewBox="0 0 800 160" preserveAspectRatio="none">
        <path d="M0 160 L50 80 L100 160 Z" fill="#2D5016" />
        <path d="M80 160 L140 60 L200 160 Z" fill="#4A7C28" />
        <path d="M180 160 L230 90 L280 160 Z" fill="#2D5016" />
        <path d="M260 160 L320 50 L380 160 Z" fill="#4A7C28" />
        <path d="M360 160 L410 80 L460 160 Z" fill="#2D5016" />
        <path d="M440 160 L500 60 L560 160 Z" fill="#4A7C28" />
        <path d="M540 160 L590 90 L640 160 Z" fill="#2D5016" />
        <path d="M620 160 L680 50 L740 160 Z" fill="#4A7C28" />
        <path d="M720 160 L770 80 L820 160 Z" fill="#2D5016" />
      </svg>
      {children}
    </div>
  )
}
