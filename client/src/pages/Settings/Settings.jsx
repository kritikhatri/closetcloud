import { useState } from 'react'
import Avatar from '../../components/Avatar/Avatar.jsx'
import Button from '../../components/Button/Button.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import { labelFor } from '../../constants/wardrobe.js'
import { AESTHETICS } from '../../data/inspiration.js'
import PageHeader from '../../components/PageHeader/PageHeader.jsx'
import useAuth from '../../hooks/useAuth.js'
import useQuiz from '../../hooks/useQuiz.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import styles from './Settings.module.css'

export default function Settings() {
  usePageTitle('Settings')
  const { user, logOut } = useAuth()
  const { openQuiz } = useQuiz()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState('')

  async function handleLogOut() {
    setIsLoggingOut(true)
    setError('')
    try {
      // On success RequireAuth sees we've logged out and sends us to the
      // front page, so there's nothing else to do here.
      await logOut()
    } catch (err) {
      setError(err.message)
      setIsLoggingOut(false)
    }
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Your profile and sign-in details."
        looks={['oat-knit', 'blossom-pink', 'all-white']}
      />

      <section className={styles.card} aria-labelledby="profile-heading">
        <div className={styles.profile}>
          <Avatar name={user.name} size="lg" />
          <div>
            <h2 id="profile-heading" className={styles.name}>
              {user.name}
            </h2>
            <p className="muted">Member since {memberSince}</p>
          </div>
        </div>

        <dl className={styles.details}>
          <div>
            <dt>Name</dt>
            <dd>{user.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.card} aria-labelledby="style-heading">
        <h2 id="style-heading" className={styles.cardTitle}>
          Your style
        </h2>
        {user.styleAesthetics.length > 0 ? (
          <>
            <ul className={styles.styleChips}>
              {user.styleAesthetics.map((value, index) => (
                <li key={value} className={styles.styleChip}>
                  {index === 0 && <Icon name="heart" size={14} fill="currentColor" />}
                  {labelFor(AESTHETICS, value)}
                </li>
              ))}
            </ul>
            <p className="muted">
              From your style quiz, best match first. Your dashboard inspiration is picked from
              these.
            </p>
            <div>
              <Button variant="secondary" onClick={openQuiz}>
                Retake the quiz
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="muted">
              Take the 1-minute style quiz to discover your aesthetic and personalise your
              inspiration.
            </p>
            <div>
              <Button onClick={openQuiz}>
                <Icon name="sparkle" size={18} />
                Find your aesthetic
              </Button>
            </div>
          </>
        )}
      </section>

      <section className={styles.card} aria-labelledby="session-heading">
        <h2 id="session-heading" className={styles.cardTitle}>
          Session
        </h2>
        <p className="muted">
          Logging out ends your session on this device. You’ll need your email and
          password to get back in.
        </p>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        <div>
          <Button variant="secondary" onClick={handleLogOut} disabled={isLoggingOut}>
            {isLoggingOut ? 'Logging out…' : 'Log out'}
          </Button>
        </div>
      </section>
    </>
  )
}
