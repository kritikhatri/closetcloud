import { useEffect, useRef } from 'react'
import Button from '../../components/Button/Button.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import { lookImageUrl } from '../../data/inspiration.js'
import styles from './Quiz.module.css'

const PROMPTS = [
  'Which of these would you wear?',
  'Tap the looks that feel like you',
  'Which ones would you save?',
  'Which make you stop scrolling?',
  'Last round: what do you love?',
]

/*
  One round: a grid of photos you tap to "heart". Each photo is a real
  <button> with aria-pressed, so it works with a keyboard (Tab + Enter or
  Space) and screen readers announce "pressed" / "not pressed".
*/
export default function QuizRound({
  looks,
  roundIndex,
  roundCount,
  pickedIds,
  onToggle,
  onBack,
  onNext,
}) {
  const headingRef = useRef(null)
  const pickedHere = looks.filter((look) => pickedIds.has(look.id)).length
  const isLast = roundIndex === roundCount - 1

  // Each new round: move focus to the question, so keyboard and
  // screen-reader users start at the top of the new set of photos.
  useEffect(() => {
    headingRef.current?.focus()
  }, [roundIndex])

  return (
    <section className={styles.round}>
      <div className={styles.progressRow}>
        <span className={styles.progressLabel}>
          Round {roundIndex + 1} of {roundCount}
        </span>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuemax={roundCount}
          aria-valuenow={roundIndex + 1}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${((roundIndex + 1) / roundCount) * 100}%` }}
          />
        </div>
      </div>

      <h1 ref={headingRef} tabIndex={-1} className={styles.prompt}>
        {PROMPTS[roundIndex % PROMPTS.length]}
      </h1>
      <p className={styles.hint} aria-live="polite">
        {pickedHere === 0
          ? 'Pick as many as you like, at least one.'
          : `${pickedHere} picked`}
      </p>

      {/* key={roundIndex} gives each round a fresh grid, which replays the
          fade-in animation when the round changes. */}
      <ul className={styles.grid} key={roundIndex}>
        {looks.map((look, index) => {
          const picked = pickedIds.has(look.id)
          return (
            <li key={look.id} style={{ '--delay': `${index * 50}ms` }}>
              <button
                type="button"
                className={styles.option}
                aria-pressed={picked}
                aria-label={look.title}
                onClick={() => onToggle(look.id)}
              >
                <img src={lookImageUrl(look, 500)} alt="" className={styles.optionImage} />
                <span className={styles.heart} aria-hidden="true">
                  <Icon name="heart" size={22} fill={picked ? 'currentColor' : 'none'} />
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className={styles.roundActions}>
        {roundIndex > 0 ? (
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        ) : (
          <span />
        )}
        <Button onClick={onNext} disabled={pickedHere === 0}>
          {isLast ? 'See my aesthetic' : 'Next round'}
        </Button>
      </div>
    </section>
  )
}
