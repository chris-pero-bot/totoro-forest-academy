import { useState } from 'react'

export default function WordBuild({ task, onCorrect, onWrong, showHint }) {
  const answer = task.answer.toLowerCase()
  const [shuffledLetters] = useState(() => {
    const letters = answer.split('').map((char, i) => ({ char, id: i }))
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]]
    }
    return letters
  })

  const [selected, setSelected] = useState([])
  const [revealed, setRevealed] = useState(false)

  const currentWord = selected.map(s => s.char).join('')
  const isUsed = (letter) => selected.find(s => s.id === letter.id)

  function handleLetterClick(letter) {
    if (revealed || isUsed(letter)) return

    const newSelected = [...selected, letter]
    setSelected(newSelected)

    const builtWord = newSelected.map(s => s.char).join('')

    if (builtWord.length === answer.length) {
      setRevealed(true)
      if (builtWord === answer) {
        setTimeout(onCorrect, 800)
      } else {
        setTimeout(onWrong, 1200)
      }
    } else {
      // Check if current path can still lead to correct answer
      if (answer.startsWith(builtWord)) {
        // Still on the right track
      }
    }
  }

  function handleUndo() {
    if (revealed || selected.length === 0) return
    setSelected(selected.slice(0, -1))
  }

  return (
    <div className="animate-fadeIn">
      <p className="text-xl font-bold text-center mb-2 text-soot">{task.prompt}</p>

      {showHint && task.hint && (
        <p className="text-center text-forest mb-4 text-sm bg-forest-light/10 p-2 rounded-lg">
          Hint: {task.hint}
        </p>
      )}

      {/* Word display */}
      <div className="flex justify-center gap-2 mb-6">
        {answer.split('').map((_, i) => (
          <div
            key={i}
            className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition-[border-color,background-color] shadow-sm ${
              selected[i]
                ? revealed
                  ? currentWord === answer
                    ? 'border-success bg-success/20 text-success'
                    : currentWord[i] === answer[i]
                      ? 'border-success bg-success/10 text-success'
                      : 'border-error-soft bg-error-soft/10 text-error-soft'
                  : 'border-acorn bg-acorn/10 text-earth'
                : 'border-gray-300 bg-white text-gray-300'
            }`}
          >
            {selected[i]?.char || '_'}
          </div>
        ))}
      </div>

      {/* Letter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {shuffledLetters.map((letter) => (
          <button
            key={letter.id}
            onClick={() => handleLetterClick(letter)}
            disabled={!!isUsed(letter) || revealed}
            className={`w-14 h-14 rounded-2xl font-bold text-2xl transition-[transform,border-color,background-color,box-shadow] duration-200 shadow-md ${
              isUsed(letter)
                ? 'bg-gray-200 text-gray-400 shadow-none'
                : 'bg-white border-2 border-forest/30 text-soot hover:border-forest hover:bg-forest-pale hover:scale-110 hover:shadow-lg active:scale-95'
            }`}
          >
            {letter.char}
          </button>
        ))}
      </div>

      {!revealed && selected.length > 0 && (
        <button onClick={handleUndo} className="block mx-auto text-sm text-forest underline">
          Undo last letter
        </button>
      )}

      {revealed && currentWord === answer && (
        <p className="text-center mt-4 text-success font-bold text-lg animate-pop">You spelled it!</p>
      )}
      {revealed && currentWord !== answer && (
        <p className="text-center mt-4 text-error-soft font-bold text-lg animate-pop">
          The word was: {answer}
        </p>
      )}
    </div>
  )
}
