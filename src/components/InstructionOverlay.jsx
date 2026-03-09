import { useGame } from '../context/GameContext'

const INSTRUCTIONS = {
  pick_one: {
    text: "Tap the right answer!",
    icon: "👆",
  },
  fill_the_gap: {
    text: "Pick the word that goes in the blank!",
    icon: "✏️",
  },
  match_up: {
    text: "Connect the pairs! Tap one on the left, then tap its match on the right.",
    icon: "🔗",
  },
  fix_it: {
    text: "This sentence has a mistake. Pick the word that fixes it!",
    icon: "🔧",
  },
  sort_it: {
    text: "Tap a group, then tap items to put them in it!",
    icon: "📦",
  },
  order_it: {
    text: "Put these in the right order. Tap them one by one!",
    icon: "🔢",
  },
  snap_choice: {
    text: "Quick! You have 8 seconds for each question. Go fast!",
    icon: "⚡",
  },
  word_build: {
    text: "Tap the letters to spell the word!",
    icon: "🔤",
  },
}

export default function InstructionOverlay({ challengeType, onDismiss }) {
  const instruction = INSTRUCTIONS[challengeType]
  if (!instruction) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 text-center">
        <div className="text-6xl mb-4" aria-hidden="true">{instruction.icon}</div>
        <p className="text-xl font-bold text-soot mb-6 font-body">{instruction.text}</p>
        <button
          onClick={onDismiss}
          className="bg-gradient-to-r from-acorn to-acorn-light text-white font-heading text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-[transform,box-shadow,background-color] hover:scale-105 active:scale-95"
        >
          Got it!
        </button>
      </div>
    </div>
  )
}
