import { useState, useEffect } from 'react'

const COLORS = ['#daa520', '#6aaf35', '#87ceeb', '#ff6b6b', '#f0c850', '#4caf50']

export default function Confetti({ trigger }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!trigger) return
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      color: COLORS[i % COLORS.length],
      x: (Math.random() - 0.5) * 60,
      xEnd: (Math.random() - 0.5) * 160,
      delay: Math.random() * 0.15,
      size: 6 + Math.random() * 6,
    }))
    setParticles(newParticles)
    const timer = setTimeout(() => setParticles([]), 1100)
    return () => clearTimeout(timer)
  }, [trigger])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            '--x': `${p.x}px`,
            '--x-end': `${p.xEnd}px`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
