import { useState } from 'react'

export default function SortIt({ task, onCorrect, onWrong, showHint }) {
  const [assignments, setAssignments] = useState({}) // { itemIndex: bucketName }
  const [revealed, setRevealed] = useState(false)
  const [selectedBucket, setSelectedBucket] = useState(null)

  const allSorted = Object.keys(assignments).length === task.items.length

  function handleBucketClick(bucketName) {
    if (revealed) return
    setSelectedBucket(bucketName)
  }

  function handleItemClick(itemIndex) {
    if (revealed || assignments[itemIndex] !== undefined || !selectedBucket) return

    const newAssignments = { ...assignments, [itemIndex]: selectedBucket }
    setAssignments(newAssignments)

    if (Object.keys(newAssignments).length === task.items.length) {
      // Check all answers
      setRevealed(true)
      const allCorrect = task.items.every((item, i) => newAssignments[i] === item.correctBucket)
      if (allCorrect) {
        setTimeout(onCorrect, 800)
      } else {
        setTimeout(onWrong, 1200)
      }
    }
  }

  const BUCKET_STYLES = [
    { bg: 'bg-sky', icon: '🔵' },
    { bg: 'bg-orange-500', icon: '🟠' },
    { bg: 'bg-purple-500', icon: '🟣' },
  ]

  function getBucketColor(bucketName) {
    const idx = task.buckets.indexOf(bucketName)
    return BUCKET_STYLES[idx]?.bg || 'bg-gray-500'
  }

  return (
    <div className="animate-fadeIn">
      <p className="text-xl font-bold text-center mb-4 text-soot">{task.prompt}</p>

      {showHint && task.hint && (
        <p className="text-center text-forest mb-3 text-sm bg-forest-light/10 p-2 rounded-lg">
          Hint: {task.hint}
        </p>
      )}

      {/* Buckets */}
      <div className="flex gap-3 mb-4 justify-center">
        {task.buckets.map((bucket, idx) => (
          <button
            key={bucket}
            onClick={() => handleBucketClick(bucket)}
            className={`py-3 px-6 rounded-2xl font-bold text-white transition-[transform,opacity,box-shadow] duration-200 shadow-md ${getBucketColor(bucket)} ${
              selectedBucket === bucket ? 'ring-4 ring-acorn-glow scale-105 shadow-lg' : 'opacity-80 hover:opacity-100 hover:scale-[1.03]'
            }`}
          >
            {BUCKET_STYLES[idx]?.icon} {bucket}
          </button>
        ))}
      </div>

      {selectedBucket && !revealed && (
        <p className="text-center text-sm text-forest-dark/60 mb-3">
          Tap items to put them in <strong>{selectedBucket}</strong>
        </p>
      )}

      {/* Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {task.items.map((item, i) => {
          const assigned = assignments[i]
          const isCorrect = revealed && assigned === item.correctBucket

          return (
            <button
              key={i}
              onClick={() => handleItemClick(i)}
              disabled={assigned !== undefined || revealed}
              className={`py-4 px-5 rounded-2xl font-bold text-base transition-[border-color,background-color] duration-200 border-2 shadow-md ${
                assigned !== undefined
                  ? revealed
                    ? isCorrect
                      ? 'bg-success/20 border-success text-success'
                      : 'bg-error-soft/20 border-error-soft text-error-soft animate-shake'
                    : `${getBucketColor(assigned)} text-white border-transparent opacity-80`
                  : 'bg-white border-forest/20 text-soot hover:border-forest hover:bg-forest-light/10'
              }`}
            >
              {item.text}
              {revealed && !isCorrect && assigned && (
                <span className="block text-xs mt-1">→ {item.correctBucket}</span>
              )}
            </button>
          )
        })}
      </div>

      {revealed && (
        <p className={`text-center mt-4 font-bold text-lg animate-pop ${
          task.items.every((item, i) => assignments[i] === item.correctBucket)
            ? 'text-success' : 'text-error-soft'
        }`}>
          {task.items.every((item, i) => assignments[i] === item.correctBucket)
            ? 'All sorted correctly!'
            : 'Almost! Check the corrections above.'}
        </p>
      )}
    </div>
  )
}
