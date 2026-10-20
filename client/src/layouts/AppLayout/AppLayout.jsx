import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import Avatar from '../../components/Avatar/Avatar.jsx'
import { dailyLooks, lookImageUrl } from '../../data/inspiration.js'
import useAuth from '../../hooks/useAuth.js'
import Icon from '../../components/Icon/Icon.jsx'
import Logo from '../../components/Logo/Logo.jsx'
import ToastProvider from '../../components/Toast/ToastProvider.jsx'
import { navItems } from './navItems.js'
import styles from './AppLayout.module.css'

/*
  The frame around every signed-in page.
    Desktop (≥ 900px): sidebar on the left, page on the right.
    Mobile  (< 900px): slim top bar + tab bar fixed to the bottom.
  <Outlet /> is where React Router renders the current page.
*/

// NavLink passes { isActive } so we can style the current page's link.
const linkClass = (base) => ({ isActive }) =>
  isActive ? `${base} ${styles.active}` : base

export default function AppLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const isFirstRender = useRef(true)
  // AppLayout only renders inside RequireAuth, so user is always set here.
  const { user } = useAuth()
  // Read the date once (see Dashboard for why) and pick today's look.
  const [lookOfDay] = useState(() => dailyLooks(new Date(), 1, 7)[0])

  // In a single-page app the browser doesn't "load a new page", so screen
  // readers don't notice navigation. Moving focus to <main> after each
  // route change tells them the content changed. Skip the first render so
  // we don't steal focus on initial load.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    mainRef.current?.focus()
  }, [pathname])

  // ToastProvider sits here, around every page, so a message shown just
  // before navigating ("Added to your closet") survives the page change.
  return (
    <ToastProvider>
      <div className={styles.shell}>
        <a href="#main" className={styles.skipLink}>
          Skip to content
        </a>

        {/* ---------- Desktop sidebar ---------- */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarLogo}>
            <Logo />
          </div>

          <nav aria-label="Main" className={styles.sideNav}>
            <ul>
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={linkClass(styles.sideLink)}
                  >
                    <Icon name={item.icon} />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <Link to="/inspiration" className={styles.lookOfDay}>
            <img src={lookImageUrl(lookOfDay, 400)} alt="" />
            <span className={styles.lookOfDayText}>
              <span className={styles.lookOfDayLabel}>Look of the day</span>
              <span className={styles.lookOfDayTitle}>{lookOfDay.title}</span>
            </span>
          </Link>

          <NavLink to="/settings" className={linkClass(`${styles.sideLink} ${styles.account}`)}>
            <Avatar name={user.name} size="sm" />
            <span className={styles.accountText}>
              <span className={styles.accountName}>{user.name}</span>
              <span className={styles.accountHint}>Settings</span>
            </span>
          </NavLink>
        </aside>

        {/* ---------- Mobile top bar ---------- */}
        <header className={styles.topbar}>
          <Logo />
          <NavLink
            to="/settings"
            className={linkClass(styles.topbarSettings)}
            aria-label={`Settings for ${user.name}`}
          >
            <Avatar name={user.name} size="md" />
          </NavLink>
        </header>

        <main id="main" ref={mainRef} tabIndex={-1} className={styles.main}>
          <div className="container">
            <Outlet />
          </div>
        </main>

        {/* ---------- Mobile tab bar ---------- */}
        <nav aria-label="Main" className={styles.tabbar}>
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={linkClass(styles.tabLink)}
                >
                  <Icon name={item.icon} size={22} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </ToastProvider>
  )
}
