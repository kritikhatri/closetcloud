import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import Button, { ButtonLink } from '../Button/Button.jsx'
import Icon from '../Icon/Icon.jsx'
import PhotoStack from '../PhotoStack/PhotoStack.jsx'
import { AESTHETICS, LOOKS, getLooks } from '../../data/inspiration.js'
import useAuth from '../../hooks/useAuth.js'
import styles from './Quiz.module.css'

const aestheticByValue = Object.fromEntries(AESTHETICS.map((a) => [a.value, a]))

/* Three photos for the result: ones you picked from your top aesthetic
   first, topped up with other looks from that aesthetic. */
function resultLooks(topValue, pickedIds) {
  const picked = getLooks(pickedIds).filter((look) => look.aesthetic === topValue)
  const others = LOOKS.filter(
    (look) => look.aesthetic === topValue && !pickedIds.includes(look.id),
  )
  return [...picked, ...others].slice(0, 3)
}

export default function QuizResult({ result, onRetake, onSaved }) {
  const { user, updateProfile } = useAuth()
  const { pathname } = useLocation()
  // After signing up / logging in, come back to this same page with the
  // quiz reopened (QuizProvider watches for ?quiz=open).
  const returnHere = encodeURIComponent(`${pathname}?quiz=open`)
  const headingRef = useRef(null)
  const [saveState, setSaveState] = useState('idle') // idle | saving | saved | error
  const [saveError, setSaveError] = useState('')

  const ranking = result.ranking.slice(0, 3)
  const [top, second] = ranking
  const topAesthetic = aestheticByValue[top.aesthetic]
  // Equal scores → it's honestly a tie, so say so.
  const isTie = second && second.score === top.score
  const topValues = ranking.map((row) => row.aesthetic)

  const alreadySaved =
    user && user.styleAesthetics.join() === topValues.join() && saveState !== 'error'

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  async function save() {
    setSaveState('saving')
    setSaveError('')
    try {
      await updateProfile({ styleAesthetics: topValues })
      setSaveState('saved')
      onSaved()
    } catch (error) {
      setSaveState('error')
      setSaveError(error.message)
    }
  }

  const boardLink = user
    ? `/inspiration?aesthetic=${top.aesthetic}`
    : { pathname: '/', search: `?aesthetic=${top.aesthetic}`, hash: '#looks' }

  return (
    <section className={styles.result}>
      <div className={styles.resultPhotos}>
        <PhotoStack looks={resultLooks(top.aesthetic, result.pickedIds)} />
      </div>

      <p className="eyebrow">Your aesthetic</p>
      <h1 ref={headingRef} tabIndex={-1} className={styles.resultTitle}>
        {isTie ? (
          <>
            You’re a mix of <em>{topAesthetic.label}</em> &amp;{' '}
            <em>{aestheticByValue[second.aesthetic].label}</em>
          </>
        ) : (
          <>
            You’re mostly <em>{topAesthetic.label}</em>
          </>
        )}
      </h1>
      <p className={styles.lead}>{topAesthetic.description}</p>

      <h2 className={styles.matchesTitle}>Your top matches</h2>
      <ol className={styles.matches}>
        {ranking.map((row, index) => {
          const percent = Math.round(row.score * 100)
          return (
            <li key={row.aesthetic} className={styles.match}>
              <div className={styles.matchText}>
                <span className={styles.matchName}>{aestheticByValue[row.aesthetic].label}</span>
                <span className={styles.matchPercent}>{percent}% match</span>
              </div>
              <div className={styles.barTrack} aria-hidden="true">
                <div
                  className={styles.barFill}
                  style={{ '--width': `${percent}%`, '--delay': `${index * 150}ms` }}
                />
              </div>
              <span className={styles.matchDetail}>
                You picked {row.picked} of {row.shown} {aestheticByValue[row.aesthetic].label.toLowerCase()} looks
              </span>
            </li>
          )
        })}
      </ol>

      <div className={styles.resultActions}>
        {user ? (
          alreadySaved || saveState === 'saved' ? (
            <p className={styles.savedBadge} role="status">
              <Icon name="heart" size={18} fill="currentColor" />
              Saved to your profile
            </p>
          ) : (
            <Button onClick={save} disabled={saveState === 'saving'}>
              {saveState === 'saving' ? 'Saving…' : 'Save to my profile'}
            </Button>
          )
        ) : (
          <ButtonLink to={`/signup?next=${returnHere}`}>
            Sign up to save your style
          </ButtonLink>
        )}
        <ButtonLink to={boardLink} variant="secondary">
          See the {topAesthetic.label.toLowerCase()} board
        </ButtonLink>
        <Button variant="ghost" onClick={onRetake}>
          Retake
        </Button>
      </div>

      {saveError && (
        <p className={styles.saveError} role="alert">
          {saveError}
        </p>
      )}
      {!user && (
        <p className={styles.loginNote}>
          Already have an account?{' '}
          <Link to={`/login?next=${returnHere}`}>
            Log in to save it
          </Link>
        </p>
      )}
      {user && (alreadySaved || saveState === 'saved') && (
        <p className={styles.loginNote}>
          Your dashboard’s inspiration now leans {topAesthetic.label.toLowerCase()}.{' '}
          <Link to="/home">
            Go to my closet
          </Link>
        </p>
      )}
    </section>
  )
}
