import { useState, useEffect } from 'react'

export default function SnapChoice({ task, onCorrect, onWrong, showHint }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(task.timeLimit || 8)

  useEffect(() => {
    if (revealed) return
    if (timeLeft <= 0) {
      setRevealed(true)
      setTimeout(onWrong, 800)
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, revealed, onWrong])

  function handleSelect(index) {
    if (revealed) return
    setSelected(index)
    setRevealed(true)

    if (index === task.correctIndex) {
      setTimeout(onCorrect, 600)
    } else {
      setTimeout(onWrong, 800)
    }
  }

  const timerPercentage = (timeLeft / (task.timeLimit || 8)) * 100

  return (
    <div className="animate-fadeIn">
      {/* Timer bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-linear"
          style={{
            width: `${timerPercentage}%`,
            backgroundColor: timerPercentage > 50 ? '#4CAF50' : timerPercentage > 25 ? '#DAA520' : '#FF6B6B',
          }}
        />
      </div>

      <p className="text-sm text-center text-forest-dark/60 mb-2 font-bold">{task.prompt}</p>
      <p className="text-xl font-bold text-center mb-6 text-soot">{task.question}</p>

      <div className="flex gap-3 justify-center">
        {task.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={revealed}
            className={`py-4 px-8 rounded-xl font-bold text-xl transition-all border-2 min-w-[120px] ${
              !revealed
                ? 'bg-white border-forest/20 text-soot hover:border-forest hover:bg-forest-light/10 hover:scale-105'
                : i === task.correctIndex
                  ? 'bg-success text-white border-success animate-pop'
                  : i === selected
                    ? 'bg-error-soft text-white border-error-soft animate-shake'
                    : 'bg-gray-100 text-gray-400 border-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {revealed && timeLeft <= 0 && selected === null && (
        <p className="text-center mt-4 text-error-soft font-bold animate-pop">Time's up!</p>
      )}
    </div>
  )
}
