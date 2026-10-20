import { useState } from 'react'
import { Link } from 'react-router'
import { listItems } from '../../api/wardrobe.js'
import { ButtonLink } from '../../components/Button/Button.jsx'
import ClothingGrid, {
  ClothingGridSkeleton,
} from '../../components/ClothingGrid/ClothingGrid.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import LookCard from '../../components/LookCard/LookCard.jsx'
import PhotoStack from '../../components/PhotoStack/PhotoStack.jsx'
import { dailyLooks, getLooks, lookImageUrl } from '../../data/inspiration.js'
import useAsyncData from '../../hooks/useAsyncData.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import styles from './Dashboard.module.css'

const quickActions = [
  {
    to: '/wardrobe/new',
    icon: 'hanger',
    title: 'Add a piece',
    text: 'Photograph something you own',
    look: 'tee-boots-flatlay',
  },
  {
    to: '/outfits',
    icon: 'outfit',
    title: 'Build an outfit',
    text: 'Pair pieces into a look',
    look: 'ivory-coat',
  },
  {
    to: '/calendar',
    icon: 'calendar',
    title: 'Plan a look',
    text: 'Decide tomorrow’s outfit tonight',
    look: 'white-crosswalk',
  },
]

const RECENT_COUNT = 4

function getGreeting(hour) {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  usePageTitle('Home')
  // listItems returns newest first, so the first few are the most recent.
  const { data: items, error, isLoading } = useAsyncData(listItems)

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
  const heroLooks = dailyLooks(now, 3)
  const todaysLooks = dailyLooks(now, 4, 3)

  return (
    <>
      {/* ---------- Greeting banner ---------- */}
      <header className={styles.welcome}>
        <div className={styles.welcomeText}>
          <p className="eyebrow">{today}</p>
          <h1 className={styles.greeting}>
            {getGreeting(now.getHours())}.
            <br />
            <em>What are we wearing?</em>
          </h1>
          {items && (
            <p className={styles.closetCount}>
              <Icon name="hanger" size={18} />
              {items.length === 0
                ? 'Your closet is ready for its first piece'
                : `${items.length} ${items.length === 1 ? 'piece' : 'pieces'} in your closet`}
            </p>
          )}
        </div>
        <div className={styles.welcomePhotos}>
          <PhotoStack looks={heroLooks} />
        </div>
      </header>

      {/* ---------- Quick actions ---------- */}
      <section aria-labelledby="quick-actions" className={styles.section}>
        <h2 id="quick-actions" className="visually-hidden">
          Quick actions
        </h2>
        <ul className={styles.actions}>
          {quickActions.map((action) => {
            const [look] = getLooks([action.look])
            return (
              <li key={action.to}>
                <Link to={action.to} className={styles.actionCard}>
                  <img src={lookImageUrl(look, 500)} alt="" className={styles.actionImage} />
                  <span className={styles.actionBody}>
                    <span className={styles.actionIcon}>
                      <Icon name={action.icon} size={20} />
                    </span>
                    <span className={styles.actionTitle}>{action.title}</span>
                    <span className={styles.actionText}>{action.text}</span>
                  </span>
                  <Icon name="arrowRight" size={20} className={styles.arrow} />
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* ---------- Today's inspiration ---------- */}
      <section aria-labelledby="todays-inspiration" className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <p className="eyebrow">Changes daily</p>
            <h2 id="todays-inspiration" className={styles.sectionTitle}>
              Today’s inspiration
            </h2>
          </div>
          <Link to="/inspiration" className={styles.viewAll}>
            See the full board
          </Link>
        </div>
        <ul className={styles.inspoRow}>
          {todaysLooks.map((look) => (
            <li key={look.id}>
              <LookCard look={look} />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Your closet ---------- */}
      <div className={styles.columns}>
        <section aria-labelledby="recent" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 id="recent" className={styles.sectionTitle}>
              Recently added
            </h2>
            {items?.length > 0 && (
              <Link to="/wardrobe" className={styles.viewAll}>
                View all {items.length}
              </Link>
            )}
          </div>

          {isLoading && <ClothingGridSkeleton count={4} />}
          {error && (
            <p className="muted" role="alert">
              We couldn’t load your wardrobe: {error.message}
            </p>
          )}
          {items?.length === 0 && (
            <EmptyState
              looks={['stripes-flatlay', 'cardigan-flatlay', 'beanie-flatlay']}
              title="Your closet is waiting"
              action={<ButtonLink to="/wardrobe/new">Add your first piece</ButtonLink>}
            >
              The pieces you add to your wardrobe will show up here.
            </EmptyState>
          )}
          {items?.length > 0 && (
            <ClothingGrid items={items.slice(0, RECENT_COUNT)} compact />
          )}
        </section>

        <section aria-labelledby="upcoming" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 id="upcoming" className={styles.sectionTitle}>
              Coming up
            </h2>
          </div>
          <EmptyState
            looks={['trench-scarf', 'blush-backless', 'teal-coat']}
            title="Nothing planned yet"
          >
            Outfits you schedule on the calendar will appear here.
          </EmptyState>
        </section>
      </div>
    </>
  )
}
