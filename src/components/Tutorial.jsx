import { useState } from 'react'
import { useGame } from '../context/GameContext'
import Totoro from '../art/Totoro'
import SootSprite from '../art/SootSprite'
import Acorn from '../art/Acorn'

const TUTORIAL_STEPS = [
  {
    title: "Hello!",
    text: "I'm Totoro. Welcome to my forest!",
    component: 'totoro',
  },
  {
    title: "The Forest",
    text: "The forest has 3 magical places. Each place has Trails for you to explore.",
    component: 'realms',
  },
  {
    title: "Trails and Clearings",
    text: "Each Trail has small missions called Clearings. Finish all the Clearings to complete a Trail!",
    component: 'trails',
  },
  {
    title: "Soot Sprites",
    text: "These little guys are Soot Sprites. They help you! If you make a mistake, one goes to sleep.",
    component: 'soot',
  },
  {
    title: "Acorns",
    text: "Collect acorns by answering correctly! You can spend them in the shop.",
    component: 'acorns',
  },
  {
    title: "Power-ups",
    text: "Need help? Use a power-up! Mei's Hint shows a clue. Totoro's Roar removes wrong answers. Catbus Skip lets you skip!",
    component: 'powerups',
  },
  {
    title: "Practice Time!",
    text: "Let's try a quick question!",
    component: 'practice',
  },
]

export default function Tutorial() {
  const { dispatch } = useGame()
  const [step, setStep] = useState(0)
  const [practiceAnswer, setPracticeAnswer] = useState(null)

  const current = TUTORIAL_STEPS[step]

  function handleNext() {
    if (step < TUTORIAL_STEPS.length - 1) {
      setStep(step + 1)
    } else {
      dispatch({ type: 'COMPLETE_TUTORIAL' })
    }
  }

  function handlePractice(index) {
    setPracticeAnswer(index)
    setTimeout(handleNext, 1200)
  }

  function renderComponent() {
    switch (current.component) {
      case 'totoro':
        return <div className="animate-bounceIn"><Totoro size={160} /></div>
      case 'realms':
        return (
          <div className="flex gap-4 animate-fadeIn">
            {['The Forest Museum', "Totoro's Feast", 'Catbus City Tour'].map((name, i) => (
              <div key={i} className="bg-white/20 rounded-xl p-3 text-center text-sm text-cream w-28">
                <div className="text-3xl mb-1">{['🌲', '🍽️', '🚌'][i]}</div>
                {name}
              </div>
            ))}
          </div>
        )
      case 'trails':
        return (
          <div className="flex gap-2 animate-fadeIn">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="w-12 h-12 rounded-full bg-forest-light flex items-center justify-center text-white font-bold">
                {n}
              </div>
            ))}
          </div>
        )
      case 'soot':
        return (
          <div className="flex gap-3 animate-fadeIn">
            {[false, false, false, false, true].map((asleep, i) => (
              <SootSprite key={i} size={40} asleep={asleep} />
            ))}
          </div>
        )
      case 'acorns':
        return (
          <div className="flex items-center gap-2 animate-bounceIn">
            <Acorn size={48} />
            <span className="text-4xl font-heading text-acorn">+3</span>
          </div>
        )
      case 'powerups':
        return (
          <div className="flex flex-col gap-2 text-sm text-cream animate-fadeIn">
            <div className="bg-white/10 rounded-lg p-2">Mei's Hint — Shows you a clue (10 acorns)</div>
            <div className="bg-white/10 rounded-lg p-2">Totoro's Roar — Removes two wrong answers (20 acorns)</div>
            <div className="bg-white/10 rounded-lg p-2">Catbus Skip — Skip a hard question (30 acorns)</div>
          </div>
        )
      case 'practice':
        return (
          <div className="w-full max-w-md animate-fadeIn">
            <p className="text-cream text-center mb-4 text-lg">What animal has a long neck?</p>
            <div className="grid grid-cols-2 gap-3">
              {['Giraffe', 'Snake', 'Dolphin', 'Eagle'].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handlePractice(i)}
                  disabled={practiceAnswer !== null}
                  className={`py-3 px-4 rounded-xl font-bold text-lg transition-all ${
                    practiceAnswer === null
                      ? 'bg-white/90 text-forest-dark hover:bg-white hover:scale-105'
                      : i === 0
                        ? 'bg-success text-white'
                        : practiceAnswer === i
                          ? 'bg-error-soft text-white animate-shake'
                          : 'bg-white/40 text-gray-400'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {practiceAnswer === 0 && (
              <p className="text-center mt-3 text-success font-bold animate-pop text-lg">Great job!</p>
            )}
            {practiceAnswer !== null && practiceAnswer !== 0 && (
              <p className="text-center mt-3 text-cream font-bold animate-pop text-lg">Almost! The answer is Giraffe!</p>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-dark via-forest to-forest-light flex flex-col items-center justify-center p-6">
      {/* Skip button */}
      <button
        onClick={() => dispatch({ type: 'SKIP_TUTORIAL' })}
        className="absolute top-4 right-4 text-cream/50 hover:text-cream text-sm"
      >
        Skip
      </button>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {TUTORIAL_STEPS.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === step ? 'bg-acorn scale-125' : i < step ? 'bg-cream/60' : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Title */}
      <h2 className="font-heading text-3xl text-cream mb-2">{current.title}</h2>
      <p className="text-cream/90 text-lg mb-8 text-center max-w-md font-body">{current.text}</p>

      {/* Visual */}
      <div className="mb-8 flex justify-center">{renderComponent()}</div>

      {/* Next button */}
      {current.component !== 'practice' && (
        <button
          onClick={handleNext}
          className="bg-acorn hover:bg-yellow-600 text-white font-heading text-xl px-10 py-3 rounded-full shadow-lg transition-all hover:scale-105"
        >
          {step === TUTORIAL_STEPS.length - 1 ? "Let's Go!" : 'Next'}
        </button>
      )}
    </div>
  )
}
