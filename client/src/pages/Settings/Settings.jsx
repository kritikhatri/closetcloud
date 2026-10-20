import { useState } from 'react'
import Avatar from '../../components/Avatar/Avatar.jsx'
import Button from '../../components/Button/Button.jsx'
import PageHeader from '../../components/PageHeader/PageHeader.jsx'
import useAuth from '../../hooks/useAuth.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import styles from './Settings.module.css'

export default function Settings() {
  usePageTitle('Settings')
  const { user, logOut } = useAuth()
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
