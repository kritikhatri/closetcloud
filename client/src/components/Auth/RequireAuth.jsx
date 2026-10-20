import { Navigate, Outlet, useLocation } from 'react-router'
import useAuth from '../../hooks/useAuth.js'
import Button from '../Button/Button.jsx'
import Logo from '../Logo/Logo.jsx'
import styles from './RequireAuth.module.css'

/*
  A layout route that guards every page inside the app.
    • still checking → a calm loading screen
    • server unreachable → explain, with a Try again button
    • not logged in → go to /login, remembering where you were headed
    • logged in → show the page

  This only controls what the browser shows. The real protection is on
  the server: every private API route checks the session itself.
*/
export default function RequireAuth() {
  const { status, user, error, retry, loggedOut } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return (
      <div className={styles.screen} role="status">
        <Logo />
        <p className="muted">Opening your closet…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className={styles.screen}>
        <Logo />
        <h1 className={styles.title}>We can’t reach ClosetCloud</h1>
        <p className="muted">{error?.message}</p>
        <Button onClick={retry}>Try again</Button>
      </div>
    )
  }

  if (!user) {
    // Chose to log out → back to the front page. Otherwise (never logged
    // in, or session expired) → the login form, then back to this page.
    if (loggedOut) return <Navigate to="/" replace />
    const next = location.pathname + location.search
    return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />
  }

  return <Outlet />
}
