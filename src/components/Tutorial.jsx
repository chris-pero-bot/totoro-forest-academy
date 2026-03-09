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
    text: "Need help? Use a power-up!",
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
        return (
          <div className="animate-bounceIn">
            <img
              src="/assets/characters/totoro-happy.png"
              alt="Totoro"
              className="w-48 h-48 object-contain drop-shadow-2xl"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
            <div style={{ display: 'none' }}><Totoro size={160} /></div>
          </div>
        )
      case 'realms':
        return (
          <div className="flex gap-4 animate-fadeIn">
            {['The Forest Museum', "Totoro's Feast", 'Catbus City Tour'].map((name, i) => (
              <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center text-sm text-white w-28 shadow">
                <div className="text-3xl mb-1" aria-hidden="true">{['🌲', '🍽️', '🚌'][i]}</div>
                {name}
              </div>
            ))}
          </div>
        )
      case 'trails':
        return (
          <div className="flex gap-3 animate-fadeIn">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="w-14 h-14 rounded-full bg-forest-light flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {n}
              </div>
            ))}
          </div>
        )
      case 'soot':
        return (
          <div className="flex gap-3 animate-fadeIn items-center">
            {[false, false, false, false, true].map((asleep, i) => (
              <img
                key={i}
                src={asleep ? '/assets/characters/soot-sprite-asleep.png' : '/assets/characters/soot-sprite-alive.png'}
                alt={asleep ? 'Sleeping soot sprite' : 'Soot sprite'}
                className={`w-10 h-10 object-contain ${asleep ? 'opacity-50' : ''}`}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            ))}
          </div>
        )
      case 'acorns':
        return (
          <div className="flex items-center gap-3 animate-bounceIn">
            <img src="/assets/ui/acorn.png" alt="Acorn" className="w-12 h-12 object-contain" onError={(e) => { e.target.style.display = 'none' }} />
            <span className="text-4xl font-heading text-acorn-glow text-shadow-dark">+3</span>
          </div>
        )
      case 'powerups':
        return (
          <div className="flex flex-col gap-3 animate-fadeIn w-full max-w-sm">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
              <img src="/assets/characters/mei.png" alt="Mei" className="w-10 h-10 object-contain" onError={(e) => { e.target.style.display = 'none' }} />
              <span className="text-white text-base">Mei's Hint — Shows you a clue</span>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
              <img src="/assets/characters/totoro-happy.png" alt="Totoro" className="w-10 h-10 object-contain" onError={(e) => { e.target.style.display = 'none' }} />
              <span className="text-white text-base">Totoro's Roar — Removes wrong answers</span>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
              <img src="/assets/characters/catbus.png" alt="Catbus" className="w-10 h-10 object-contain" onError={(e) => { e.target.style.display = 'none' }} />
              <span className="text-white text-base">Catbus Skip — Skip a hard question</span>
            </div>
          </div>
        )
      case 'practice':
        return (
          <div className="w-full max-w-md animate-fadeIn">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <p className="text-soot text-center mb-4 text-xl font-bold">What animal has a long neck?</p>
              <div className="grid grid-cols-2 gap-3">
                {['Giraffe', 'Snake', 'Dolphin', 'Eagle'].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handlePractice(i)}
                    disabled={practiceAnswer !== null}
                    className={`py-4 px-5 rounded-2xl font-bold text-lg transition-[transform,border-color,background-color,box-shadow] shadow-lg hover:shadow-xl duration-200 ${
                      practiceAnswer === null
                        ? 'bg-white text-soot border-2 border-forest/20 hover:border-forest hover:scale-105 active:scale-95'
                        : i === 0
                          ? 'bg-success text-white border-2 border-success animate-pop'
                          : practiceAnswer === i
                            ? 'bg-white text-error-soft border-2 border-error-soft animate-shake'
                            : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {practiceAnswer === 0 && (
                <p className="text-center mt-4 text-success font-bold animate-pop text-lg">Great job!</p>
              )}
              {practiceAnswer !== null && practiceAnswer !== 0 && (
                <p className="text-center mt-4 text-error-soft font-bold animate-pop text-lg">Almost! The answer is Giraffe!</p>
              )}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-dark via-forest to-forest-light flex flex-col items-center justify-center p-6 relative">
      {/* Skip button */}
      <button
        onClick={() => dispatch({ type: 'SKIP_TUTORIAL' })}
        className="absolute top-4 right-4 bg-white/20 text-white font-bold text-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
      >
        Skip
      </button>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {TUTORIAL_STEPS.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-[background-color,transform] ${
              i === step ? 'bg-acorn-glow scale-125' : i < step ? 'bg-white/60' : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Title & text in panel */}
      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-5 mb-6 text-center max-w-md">
        <h2 className="font-heading text-3xl text-white mb-2 text-shadow-dark">{current.title}</h2>
        <p className="text-white text-lg font-body">{current.text}</p>
      </div>

      {/* Visual */}
      <div className="mb-8 flex justify-center">{renderComponent()}</div>

      {/* Next button */}
      {current.component !== 'practice' && (
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-acorn to-acorn-light text-white font-heading text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-[transform,box-shadow,background-color] duration-200 hover:scale-105 active:scale-95"
        >
          {step === TUTORIAL_STEPS.length - 1 ? "Let's Go!" : 'Next'}
        </button>
      )}
    </div>
  )
}
