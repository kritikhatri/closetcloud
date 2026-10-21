import { useState } from 'react'
import { Link } from 'react-router'
import Logo from '../../components/Logo/Logo.jsx'
import useAuth from '../../hooks/useAuth.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import { buildRounds, scoreQuiz } from '../../utils/quiz.js'
import QuizIntro from './QuizIntro.jsx'
import QuizResult from './QuizResult.jsx'
import QuizRound from './QuizRound.jsx'
import styles from './Quiz.module.css'

/*
  The style quiz, as a tiny "state machine" with three stages:
    intro → round (×5) → result

  A finished result is also kept in sessionStorage (this browser tab
  only). That way a visitor who isn't logged in can sign up and come
  back to /quiz to save it, without retaking the quiz.
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

export default function Quiz() {
  usePageTitle('Find your aesthetic')
  const { user } = useAuth()

  // Lazy initial state: runs once, on first render.
  const [pending] = useState(readPending)
  const [stage, setStage] = useState(pending ? 'result' : 'intro')
  const [rounds, setRounds] = useState(() => buildRounds())
  const [roundIndex, setRoundIndex] = useState(0)
  const [pickedIds, setPickedIds] = useState(() => new Set())
  const [result, setResult] = useState(pending)

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
    const ranking = scoreQuiz(rounds, [...pickedIds])
    const value = { ranking, pickedIds: [...pickedIds] }
    setResult(value)
    writePending(value)
    setStage('result')
  }

  function goNext() {
    if (roundIndex === rounds.length - 1) finish()
    else setRoundIndex((i) => i + 1)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Logo />
        <Link to={user ? '/home' : '/'} className={styles.close}>
          {user ? 'Back to my closet' : 'Back to ClosetCloud'}
        </Link>
      </header>

      <main className={styles.main}>
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
      </main>
    </div>
  )
}
