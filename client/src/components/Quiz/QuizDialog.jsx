import { useEffect, useRef, useState } from 'react'
import useAuth from '../../hooks/useAuth.js'
import { buildRounds, scoreQuiz } from '../../utils/quiz.js'
import QuizIntro from './QuizIntro.jsx'
import QuizResult from './QuizResult.jsx'
import QuizRound from './QuizRound.jsx'
import styles from './Quiz.module.css'

/*
  The style quiz in a pop-up (<dialog>), opened on top of whatever page
  you're on, so you never leave it.

  Inside, a tiny "state machine" with three stages:
    intro → round (×5) → result

  This component stays mounted while the page is open, so closing the
  pop-up mid-quiz keeps your progress: reopen it and carry on.

  A finished result is also kept in sessionStorage (this browser tab
  only), so a visitor can sign up and come back to save it.
*/
const PENDING_KEY = 'closetcloud:quiz-result'

function readPending() {
  try {
    return JSON.parse(sessionStorage.getItem(PENDING_KEY))
  } catch {
    return null // storage blocked or corrupted: just start fresh
  }
}

function writePending(value) {
  try {
    if (value) sessionStorage.setItem(PENDING_KEY, JSON.stringify(value))
    else sessionStorage.removeItem(PENDING_KEY)
  } catch {
    // Storage unavailable (e.g. private mode): the quiz still works,
    // the result just won't survive a page change.
  }
}

export default function QuizDialog({ open, onClose }) {
  const { user } = useAuth()
  const dialogRef = useRef(null)

  const [pending] = useState(readPending)
  const [stage, setStage] = useState(pending ? 'result' : 'intro')
  const [rounds, setRounds] = useState(() => buildRounds())
  const [roundIndex, setRoundIndex] = useState(0)
  const [pickedIds, setPickedIds] = useState(() => new Set())
  const [result, setResult] = useState(pending)

  // Keep the real <dialog> in sync with `open`. showModal() dims the page,
  // traps focus inside, and makes Escape close it.
  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  function start() {
    setRounds(buildRounds()) // fresh photos every time
    setPickedIds(new Set())
    setRoundIndex(0)
    setResult(null)
    writePending(null)
    setStage('round')
  }

  function togglePick(lookId) {
    setPickedIds((current) => {
      const next = new Set(current)
      if (next.has(lookId)) next.delete(lookId)
      else next.add(lookId)
      return next
    })
  }

  function finish() {
    const value = { ranking: scoreQuiz(rounds, [...pickedIds]), pickedIds: [...pickedIds] }
    setResult(value)
    writePending(value)
    setStage('result')
  }

  function goNext() {
    if (roundIndex === rounds.length - 1) finish()
    else setRoundIndex((i) => i + 1)
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Find your aesthetic style quiz"
      // Escape fires "cancel": let React state close it, not the browser.
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      // A click on the dimmed backdrop lands on the <dialog> element itself.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <div className={styles.sheet}>
        <div className={styles.sheetHeader}>
          <span className={styles.sheetLabel}>Style quiz</span>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            <span aria-hidden="true">×</span>
            <span className="visually-hidden">Close the quiz</span>
          </button>
        </div>

        {/* Only render the contents while open, so each opening focuses
            the right heading and replays the entrance animations. */}
        {open && (
          <div className={styles.sheetBody}>
            {stage === 'intro' && <QuizIntro user={user} onStart={start} />}

            {stage === 'round' && (
              <QuizRound
                looks={rounds[roundIndex]}
                roundIndex={roundIndex}
                roundCount={rounds.length}
                pickedIds={pickedIds}
                onToggle={togglePick}
                onBack={() => setRoundIndex((i) => i - 1)}
                onNext={goNext}
              />
            )}

            {stage === 'result' && result && (
              <QuizResult
                result={result}
                onRetake={start}
                onSaved={() => writePending(null)}
              />
            )}
          </div>
        )}
      </div>
    </dialog>
  )
}
