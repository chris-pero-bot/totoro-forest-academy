import { useState } from 'react'

export default function FillTheGap({ task, onCorrect, onWrong, showHint }) {
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

  // Highlight the blank in the prompt
  const promptParts = task.prompt.split('___')

  return (
    <div className="animate-fadeIn">
      <div className="text-xl font-bold text-center mb-6 text-soot">
        {promptParts.map((part, i) => (
          <span key={i}>
            {part}
            {i < promptParts.length - 1 && (
              <span className={`inline-block min-w-[60px] border-b-4 mx-1 ${
                revealed && selected === task.correctIndex
                  ? 'border-success text-success'
                  : 'border-acorn text-acorn'
              }`}>
                {revealed ? task.options[task.correctIndex] : '______'}
              </span>
            )}
          </span>
        ))}
      </div>

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
            className={`py-5 px-8 rounded-2xl font-bold text-lg transition-[transform,border-color,background-color,box-shadow] duration-200 border-2 shadow-md hover:shadow-lg ${
              !revealed
                ? 'bg-white border-forest/20 text-soot hover:border-forest hover:bg-forest-pale hover:scale-[1.03] active:scale-[0.97]'
                : i === task.correctIndex
                  ? 'bg-success-bg border-success text-success animate-pop shadow-lg'
                  : i === selected
                    ? 'bg-white border-error-soft text-error-soft animate-shake'
                    : 'bg-gray-50 text-gray-400 border-gray-200'
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
          Oops! The answer was: {task.options[task.correctIndex]}
        </p>
      )}
    </div>
  )
}
