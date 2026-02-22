import { useState } from 'react'

export default function PickOne({ task, onCorrect, onWrong, showHint }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  function handleSelect(index) {
    if (revealed) return
    setSelected(index)
    setRevealed(true)

    if (index === task.correctIndex) {
      setTimeout(onCorrect, 800)
    } else {
      setTimeout(onWrong, 1000)
    }
  }

  return (
    <div className="animate-fadeIn">
      <p className="text-xl font-bold text-center mb-6 text-soot">{task.prompt}</p>

      {showHint && task.hint && (
        <p className="text-center text-forest mb-4 text-sm bg-forest-light/10 p-2 rounded-lg">
          Hint: {task.hint}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {task.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={revealed}
            className={`py-4 px-6 rounded-xl font-bold text-lg transition-all border-2 ${
              !revealed
                ? 'bg-white border-forest/20 text-soot hover:border-forest hover:bg-forest-light/10 hover:scale-[1.02]'
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

      {revealed && selected === task.correctIndex && (
        <p className="text-center mt-4 text-success font-bold text-lg animate-pop">Great job!</p>
      )}
      {revealed && selected !== task.correctIndex && (
        <p className="text-center mt-4 text-error-soft font-bold text-lg animate-pop">
          Oops! Try the next one!
        </p>
      )}
    </div>
  )
}
