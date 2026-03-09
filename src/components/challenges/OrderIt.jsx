import { useState } from 'react'

export default function OrderIt({ task, onCorrect, onWrong, showHint }) {
  const [items] = useState(() => {
    const shuffled = task.items.map((text, origIdx) => ({ text, origIdx }))
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  })
  const [order, setOrder] = useState([])
  const [revealed, setRevealed] = useState(false)

  function handleItemClick(item) {
    if (revealed || order.find(o => o.origIdx === item.origIdx)) return

    const newOrder = [...order, item]
    setOrder(newOrder)

    if (newOrder.length === items.length) {
      setRevealed(true)
      const isCorrect = newOrder.every((item, i) => item.origIdx === task.correctOrder[i])
      if (isCorrect) {
        setTimeout(onCorrect, 800)
      } else {
        setTimeout(onWrong, 1200)
      }
    }
  }

  function handleReset() {
    if (revealed) return
    setOrder([])
  }

  const isPlaced = (item) => order.find(o => o.origIdx === item.origIdx)

  return (
    <div className="animate-fadeIn">
      <p className="text-xl font-bold text-center mb-4 text-soot">{task.prompt}</p>

      {showHint && task.hint && (
        <p className="text-center text-forest mb-3 text-sm bg-forest-light/10 p-2 rounded-lg">
          Hint: {task.hint}
        </p>
      )}

      {/* Ordered slots */}
      <div className="mb-4 space-y-2">
        {task.items.map((_, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-2xl border-2 min-h-[52px] transition-[border-color,background-color] shadow-sm ${
              order[i]
                ? revealed
                  ? order[i].origIdx === task.correctOrder[i]
                    ? 'border-success bg-success/10'
                    : 'border-error-soft bg-error-soft/10'
                  : 'border-acorn bg-acorn/10'
                : 'border-dashed border-gray-300 bg-white/50'
            }`}
          >
            <span className="w-8 h-8 rounded-full bg-forest-dark text-white flex items-center justify-center font-bold text-sm">
              {i + 1}
            </span>
            <span className="font-bold text-sm text-soot">
              {order[i]?.text || '...'}
            </span>
          </div>
        ))}
      </div>

      {/* Available items */}
      {!revealed && (
        <>
          <p className="text-xs text-center text-forest-dark/60 mb-2">Tap items in order:</p>
          <div className="flex flex-wrap gap-3 justify-center mb-3">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => handleItemClick(item)}
                disabled={!!isPlaced(item)}
                className={`py-3 px-5 rounded-2xl text-base font-bold transition-[transform,border-color,background-color,box-shadow] duration-200 shadow-md ${
                  isPlaced(item)
                    ? 'bg-gray-200 text-gray-400 shadow-none'
                    : 'bg-white border-2 border-forest/20 text-soot hover:border-forest hover:bg-forest-pale hover:shadow-lg hover:scale-[1.03] active:scale-[0.97]'
                }`}
              >
                {item.text}
              </button>
            ))}
          </div>
          {order.length > 0 && !revealed && (
            <button onClick={handleReset} className="block mx-auto text-sm text-forest underline">
              Reset order
            </button>
          )}
        </>
      )}

      {revealed && (
        <p className={`text-center mt-4 font-bold text-lg animate-pop ${
          order.every((item, i) => item.origIdx === task.correctOrder[i])
            ? 'text-success' : 'text-error-soft'
        }`}>
          {order.every((item, i) => item.origIdx === task.correctOrder[i])
            ? 'Perfect order!'
            : 'Not quite! Check the right order above.'}
        </p>
      )}
    </div>
  )
}
