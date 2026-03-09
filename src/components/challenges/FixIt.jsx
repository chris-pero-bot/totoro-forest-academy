import { useState } from 'react'

export default function FixIt({ task, onCorrect, onWrong, showHint }) {
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
      <p className="text-sm text-forest-dark/60 text-center mb-2 font-bold">Find and fix the error!</p>

      <div className="bg-error-bg border-2 border-error-soft/30 rounded-2xl p-5 mb-6 shadow-md">
        <p className="text-xl font-bold text-center text-soot">{task.prompt}</p>
      </div>

      {showHint && task.hint && (
        <p className="text-center text-forest mb-4 text-sm bg-forest-light/10 p-2 rounded-lg">
          Hint: {task.hint}
        </p>
      )}

      <p className="text-sm text-center text-forest-dark/60 mb-3 font-bold">
        Replace the wrong word with:
      </p>

      <div className="grid grid-cols-2 gap-3">
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
        <p className="text-center mt-4 text-success font-bold text-lg animate-pop">You fixed it!</p>
      )}
      {revealed && selected !== task.correctIndex && (
        <p className="text-center mt-4 text-error-soft font-bold text-lg animate-pop">
          Oops! The fix was: {task.options[task.correctIndex]}
        </p>
      )}
    </div>
  )
}
