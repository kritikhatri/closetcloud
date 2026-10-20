import { useState } from 'react'
import { Link } from 'react-router'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import styles from './Dashboard.module.css'

const quickActions = [
  {
    to: '/wardrobe',
    icon: 'hanger',
    title: 'Add a piece',
    text: 'Photograph something you own and give it a home.',
  },
  {
    to: '/outfits',
    icon: 'outfit',
    title: 'Build an outfit',
    text: 'Pair pieces from your closet into a look worth saving.',
  },
  {
    to: '/calendar',
    icon: 'calendar',
    title: 'Plan a look',
    text: 'Decide tomorrow’s outfit tonight, and skip the morning scramble.',
  },
]

function getGreeting(hour) {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  usePageTitle('Home')

  // React may render a component many times. Reading the clock directly
  // would give a different answer each render; a lazy useState initializer
  // reads it once, when the page first appears, and keeps that value.
  const [now] = useState(() => new Date())
  // toLocaleDateString formats dates the way the user's browser/region expects.
  const today = now.toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <>
      <header className={styles.welcome}>
        <p className="eyebrow">{today}</p>
        <h1 className={styles.greeting}>
          {getGreeting(now.getHours())}.
          <br />
          <em>What are we wearing?</em>
        </h1>
      </header>

      <section aria-labelledby="quick-actions" className={styles.section}>
        <h2 id="quick-actions" className="visually-hidden">
          Quick actions
        </h2>
        <ul className={styles.actions}>
          {quickActions.map((action) => (
            <li key={action.to}>
              <Link to={action.to} className={styles.actionCard}>
                <span className={styles.actionIcon}>
                  <Icon name={action.icon} />
                </span>
                <h3 className={styles.actionTitle}>{action.title}</h3>
                <p className={styles.actionText}>{action.text}</p>
                <Icon name="arrowRight" size={18} className={styles.arrow} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.columns}>
        <section aria-labelledby="recent" className={styles.section}>
          <h2 id="recent" className={styles.sectionTitle}>
            Recently added
          </h2>
          <EmptyState icon="hanger" title="Your closet is waiting">
            The pieces you add to your wardrobe will show up here.
          </EmptyState>
        </section>

        <section aria-labelledby="upcoming" className={styles.section}>
          <h2 id="upcoming" className={styles.sectionTitle}>
            Coming up
          </h2>
          <EmptyState icon="calendar" title="Nothing planned yet">
            Outfits you schedule on the calendar will appear here.
          </EmptyState>
        </section>
      </div>
    </>
  )
}
