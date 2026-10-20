import { ButtonLink } from '../../components/Button/Button.jsx'
import LookBoard from '../../components/LookBoard/LookBoard.jsx'
import Logo from '../../components/Logo/Logo.jsx'
import { AESTHETICS, LOOKS, UNSPLASH_URL, lookImageUrl } from '../../data/inspiration.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import styles from './Landing.module.css'

// The three photos in the hero collage, with a handwritten-style caption each.
const collage = [
  { id: 'pink-faux-fur', caption: 'coquette', className: styles.photoA },
  { id: 'ivory-coat', caption: 'minimal', className: styles.photoB },
  { id: 'leather-mini', caption: 'date night', className: styles.photoC },
].map((item) => ({ ...item, look: LOOKS.find((look) => look.id === item.id) }))

const steps = [
  {
    title: 'Photograph your pieces',
    text: 'Snap what’s already in your closet and sort it by category, colour, season and occasion.',
  },
  {
    title: 'Build outfits',
    text: 'Pair pieces you own into looks, and save the combinations you love.',
  },
  {
    title: 'Plan the week',
    text: 'Put outfits on the calendar so getting dressed is one less decision in the morning.',
  },
]

/*
  The public front page. It sits outside the app layout (no sidebar),
  like the landing page of a real product.
*/
export default function Landing() {
  usePageTitle(null) // just "ClosetCloud"

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Logo />
          <nav aria-label="Front page" className={styles.headerNav}>
            <a href="#looks" className={styles.headerLink}>
              Inspiration
            </a>
            <a href="#how" className={styles.headerLink}>
              How it works
            </a>
            <ButtonLink to="/home" size="sm">
              Open my closet
            </ButtonLink>
          </nav>
        </div>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className={`container ${styles.hero}`}>
          <div className={styles.heroText}>
            <p className="eyebrow">Your digital wardrobe</p>
            <h1 className={styles.heroTitle}>
              Get dressed with what you <em>already&nbsp;love.</em>
            </h1>
            <p className={styles.heroLead}>
              ClosetCloud keeps every piece you own in one beautiful place, so
              you can mix new outfits, plan your week, and borrow ideas from a
              board of looks worth saving.
            </p>
            <div className={styles.heroActions}>
              <ButtonLink to="/home">Open my closet</ButtonLink>
              <ButtonLink to="/inspiration" variant="secondary">
                Browse inspiration
              </ButtonLink>
            </div>
          </div>

          {/* Decorative collage: the same photos appear (with alt text and
              credits) on the board below, so it's hidden from screen readers. */}
          <div className={styles.collage} aria-hidden="true">
            {collage.map(({ id, caption, className, look }) => (
              <figure key={id} className={`${styles.polaroid} ${className}`}>
                <img
                  src={lookImageUrl(look, 600)}
                  alt=""
                  width={600}
                  height={Math.round(600 * look.ratio)}
                  fetchPriority="high"
                />
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
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

        {/* ---------- Mood board ---------- */}
        <section id="looks" className={`container ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className="eyebrow">The mood board</p>
            <h2 className={styles.sectionTitle}>
              Outfit inspiration, <em>by aesthetic</em>
            </h2>
            <p className="muted">
              {LOOKS.length} hand-picked looks to steal ideas from, from
              coquette pinks to late-night sequins.
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
              {steps.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{step.title}</h3>
                  <p className="muted">{step.text}</p>
                </li>
              ))}
            </ol>
            <div className={styles.cta}>
              <ButtonLink to="/wardrobe/new">Add your first piece</ButtonLink>
            </div>
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
