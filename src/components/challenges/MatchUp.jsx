import { useState } from 'react'

export default function MatchUp({ task, onCorrect, onWrong, showHint }) {
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matched, setMatched] = useState([])
  const [wrongPair, setWrongPair] = useState(null)

  const pairs = task.pairs
  const allMatched = matched.length === pairs.length

  // Shuffle right side (but keep consistent)
  const [shuffledRight] = useState(() => {
    const rights = pairs.map((p, i) => ({ text: p.right, origIdx: i }))
    for (let i = rights.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rights[i], rights[j]] = [rights[j], rights[i]]
    }
    return rights
  })

  function handleLeftClick(index) {
    if (matched.includes(index) || allMatched) return
    setSelectedLeft(index)
    setWrongPair(null)
  }

  function handleRightClick(shuffledIdx) {
    if (selectedLeft === null || allMatched) return
    const rightOrigIdx = shuffledRight[shuffledIdx].origIdx

    if (rightOrigIdx === selectedLeft) {
      // Correct match!
      const newMatched = [...matched, selectedLeft]
      setMatched(newMatched)
      setSelectedLeft(null)
      setWrongPair(null)

      if (newMatched.length === pairs.length) {
        setTimeout(onCorrect, 600)
      }
    } else {
      // Wrong match
      setWrongPair({ left: selectedLeft, right: shuffledIdx })
      setTimeout(() => {
        setWrongPair(null)
        setSelectedLeft(null)
        if (matched.length === 0) {
          onWrong()
        }
      }, 800)
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

      <div className="flex gap-4 justify-center">
        {/* Left column */}
        <div className="flex flex-col gap-3 flex-1">
          {pairs.map((pair, i) => (
            <button
              key={i}
              onClick={() => handleLeftClick(i)}
              disabled={matched.includes(i)}
              className={`py-4 px-5 rounded-2xl font-bold text-base transition-all duration-200 border-2 text-center shadow-md ${
                matched.includes(i)
                  ? 'bg-success-bg border-success text-success shadow-lg'
                  : selectedLeft === i
                    ? 'bg-acorn/20 border-acorn text-earth scale-105 shadow-lg'
                    : wrongPair?.left === i
                      ? 'bg-error-bg border-error-soft animate-shake'
                      : 'bg-white border-forest/20 text-soot hover:border-forest hover:shadow-lg hover:scale-[1.03] active:scale-[0.97]'
              }`}
            >
              {pair.left}
            </button>
          ))}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3 flex-1">
          {shuffledRight.map((item, i) => (
            <button
              key={i}
              onClick={() => handleRightClick(i)}
              disabled={matched.includes(item.origIdx)}
              className={`py-4 px-5 rounded-2xl font-bold text-base transition-all duration-200 border-2 text-center shadow-md ${
                matched.includes(item.origIdx)
                  ? 'bg-success-bg border-success text-success shadow-lg'
                  : wrongPair?.right === i
                    ? 'bg-error-bg border-error-soft animate-shake'
                    : 'bg-white border-forest/20 text-soot hover:border-forest hover:shadow-lg hover:scale-[1.03] active:scale-[0.97]'
              }`}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>

      {allMatched && (
        <p className="text-center mt-4 text-success font-bold text-lg animate-pop">All matched!</p>
      )}
    </div>
  )
}
