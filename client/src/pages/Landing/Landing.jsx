import { Link, useSearchParams } from 'react-router'
import { ButtonLink } from '../../components/Button/Button.jsx'
import LookBoard from '../../components/LookBoard/LookBoard.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import Logo from '../../components/Logo/Logo.jsx'
import { AESTHETICS, LOOKS, UNSPLASH_URL, lookImageUrl } from '../../data/inspiration.js'
import useAuth from '../../hooks/useAuth.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import HeroWall from '../../components/HeroWall/HeroWall.jsx'
import styles from './Landing.module.css'

const byId = Object.fromEntries(LOOKS.map((look) => [look.id, look]))

// One cover photo per aesthetic for the "Find your aesthetic" cards.
const aestheticCovers = {
  coquette: 'tiered-pink',
  cottagecore: 'hay-bale-florals',
  'old-money': 'beige-blazer-leaves',
  minimal: 'cream-suit',
  streetwear: 'tee-joggers',
  college: 'denim-cargo',
  casual: 'vest-jeans',
  'date-night': 'pink-corset',
  formal: 'black-satin',
}

const steps = [
  {
    title: 'Photograph your pieces',
    text: 'Snap what’s already in your closet and sort it by category, colour, season and occasion.',
    look: 'stripes-flatlay',
  },
  {
    title: 'Build outfits',
    text: 'Pair pieces you own into looks, and save the combinations you love.',
    look: 'cardigan-flatlay',
  },
  {
    title: 'Plan the week',
    text: 'Put outfits on the calendar so getting dressed is one less decision in the morning.',
    look: 'tee-boots-flatlay',
  },
]

/* A little coquette bow, drawn as an SVG so it stays crisp at any size. */
function Bow({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 40" fill="none" aria-hidden="true">
      <path
        d="M32 18c-6-9-22-16-26-10-4 5 2 14 13 13 5-.5 10-2 13-3Zm0 0c6-9 22-16 26-10 4 5-2 14-13 13-5-.5-10-2-13-3Z"
        fill="currentColor"
        opacity=".9"
      />
      <path
        d="M30 20c-3 6-8 13-13 17m17-17c3 6 8 13 13 17"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="32" cy="19" r="4.5" fill="currentColor" />
    </svg>
  )
}

/*
  The public front page. It sits outside the app layout (no sidebar),
  like the landing page of a real product.
*/
export default function Landing() {
  usePageTitle(null) // just "ClosetCloud"
  const [, setSearchParams] = useSearchParams()
  const { user } = useAuth()

  // Filters the mood board to one aesthetic and scrolls down to it.
  function openBoard(aesthetic) {
    setSearchParams({ aesthetic }, { replace: true, preventScrollReset: true })
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document
      .getElementById('looks')
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Logo />
          <nav aria-label="Front page" className={styles.headerNav}>
            <a href="#aesthetics" className={styles.headerLink}>
              Aesthetics
            </a>
            <a href="#looks" className={styles.headerLink}>
              Mood board
            </a>
            <a href="#how" className={styles.headerLink}>
              How it works
            </a>
            {user ? (
              <ButtonLink to="/home" size="sm">
                Open my closet
              </ButtonLink>
            ) : (
              <>
                <Link to="/login" className={styles.loginLink}>
                  Log in
                </Link>
                <ButtonLink to="/signup" size="sm">
                  Sign up
                </ButtonLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroText}>
              <p className={styles.pill}>
                <span className={styles.pillDot} aria-hidden="true" />
                Your digital wardrobe &amp; outfit planner
              </p>
              <h1 className={styles.heroTitle}>
                Get dressed with what you{' '}
                <span className={styles.heroAccent}>
                  <em>already love</em>
                  <Bow className={styles.bow} />
                </span>
              </h1>
              <p className={styles.heroLead}>
                Every piece you own in one beautiful place. Mix new outfits, plan
                your week, and steal ideas from a board of looks worth saving.
              </p>
              <div className={styles.heroActions}>
                {user ? (
                  <ButtonLink to="/home">Open my closet</ButtonLink>
                ) : (
                  <ButtonLink to="/signup">Start your closet</ButtonLink>
                )}
                <a href="#looks" className={styles.textLink}>
                  Browse the mood board ↓
                </a>
              </div>

              <div className={styles.quickAesthetics}>
                <span className={styles.quickLabel}>Find your aesthetic:</span>
                {AESTHETICS.slice(0, 3).map((aesthetic) => (
                  <button
                    key={aesthetic.value}
                    type="button"
                    className={styles.quickChip}
                    onClick={() => openBoard(aesthetic.value)}
                  >
                    {aesthetic.label}
                  </button>
                ))}
                <Link to="/quiz" className={styles.quizChip}>
                  <Icon name="sparkle" size={16} />
                  Not sure? Take the quiz
                </Link>
              </div>
            </div>

            <div className={styles.heroWall}>
              <HeroWall />
            </div>
          </div>
        </section>

        {/* ---------- Scrolling strip of aesthetics ---------- */}
        <div className={styles.marquee} aria-hidden="true">
          {/* The list is repeated twice so the loop looks seamless. */}
          <div className={styles.marqueeTrack}>
            {[...AESTHETICS, ...AESTHETICS].map((aesthetic, index) => (
              <span key={index} className={styles.marqueeItem}>
                {aesthetic.label}
                <span className={styles.star}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ---------- Find your aesthetic ---------- */}
        <section id="aesthetics" className={`container ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className="eyebrow">Boards</p>
            <h2 className={styles.sectionTitle}>
              Find your <em>aesthetic</em>
            </h2>
            <p className="muted">Tap a board to see every look in that style.</p>
          </div>

          <Link to="/quiz" className={styles.quizBanner}>
            <span className={styles.quizBannerIcon} aria-hidden="true">
              <Icon name="heart" size={22} fill="currentColor" />
            </span>
            <span className={styles.quizBannerText}>
              <span className={styles.quizBannerTitle}>Not sure which one is you?</span>
              <span>Heart the outfits you love in 5 quick rounds and see your match.</span>
            </span>
            <span className={styles.quizBannerCta}>
              Take the style quiz <Icon name="arrowRight" size={18} />
            </span>
          </Link>

          <ul className={styles.boards}>
            {AESTHETICS.map((aesthetic) => {
              const cover = byId[aestheticCovers[aesthetic.value]]
              const count = LOOKS.filter((look) => look.aesthetic === aesthetic.value).length
              return (
                <li key={aesthetic.value}>
                  <button
                    type="button"
                    className={styles.boardCard}
                    onClick={() => openBoard(aesthetic.value)}
                  >
                    <img
                      src={lookImageUrl(cover, 500)}
                      alt=""
                      width={500}
                      height={Math.round(500 * cover.ratio)}
                      loading="lazy"
                    />
                    <span className={styles.boardText}>
                      <span className={styles.boardName}>{aesthetic.label}</span>
                      <span className={styles.boardCount}>{count} looks</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        {/* ---------- Mood board ---------- */}
        <section id="looks" className={`container ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className="eyebrow">The mood board</p>
            <h2 className={styles.sectionTitle}>
              Outfit inspiration, <em>pinned for you</em>
            </h2>
            <p className="muted">
              {LOOKS.length} hand-picked looks, from coquette pinks to late-night
              sequins.
            </p>
          </div>
          <LookBoard />
        </section>

        {/* ---------- How it works ---------- */}
        <section id="how" className={styles.how}>
          <div className="container">
            <div className={styles.sectionHead}>
              <p className="eyebrow">How it works</p>
              <h2 className={styles.sectionTitle}>
                Your closet, <em>but organised</em>
              </h2>
            </div>
            <ol className={styles.steps}>
              {steps.map((step, index) => {
                const look = byId[step.look]
                return (
                  <li key={step.title} className={styles.step}>
                    <div className={styles.stepImage}>
                      <img src={lookImageUrl(look, 600)} alt="" loading="lazy" />
                      <span className={styles.stepNumber} aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3>{step.title}</h3>
                    <p className="muted">{step.text}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* ---------- Closing call to action ---------- */}
        <section className={styles.closing}>
          <div className={`container ${styles.closingInner}`}>
            <img
              className={`${styles.closingPhoto} ${styles.closingLeft}`}
              src={lookImageUrl(byId['blossom-pink'], 500)}
              alt=""
              loading="lazy"
            />
            <div className={styles.closingText}>
              <Bow className={styles.closingBow} />
              <h2 className={styles.closingTitle}>
                Fall back in love <em>with your closet.</em>
              </h2>
              <p>Start with one piece. It only takes a photo.</p>
              <ButtonLink to="/wardrobe/new" variant="secondary">
                Add your first piece
              </ButtonLink>
            </div>
            <img
              className={`${styles.closingPhoto} ${styles.closingRight}`}
              src={lookImageUrl(byId['red-swirl'], 500)}
              alt=""
              loading="lazy"
            />
          </div>
        </section>
      </main>

      <footer className={`container ${styles.footer}`}>
        <Logo />
        <p className="muted">
          Inspiration photography from{' '}
          <a href={UNSPLASH_URL} target="_blank" rel="noreferrer">
            Unsplash
          </a>
          , credited on every look.
        </p>
      </footer>
    </div>
  )
}
