import Button from './components/Button/Button.jsx'
import styles from './App.module.css'

/*
  TEMPORARY style-guide page (Phase 2).
  It lets us see the design system in one place. In Phase 3 this file
  becomes the router, and this preview goes away.
*/

const swatches = [
  { name: 'Ivory', token: '--color-ivory', hex: '#FBF7F2' },
  { name: 'Surface', token: '--color-surface', hex: '#FFFFFF' },
  { name: 'Blush', token: '--color-blush', hex: '#F3DEDC' },
  { name: 'Rose', token: '--color-rose', hex: '#A8566B' },
  { name: 'Rose deep', token: '--color-rose-deep', hex: '#8E4358' },
  { name: 'Ink', token: '--color-ink', hex: '#2B2526' },
  { name: 'Ink soft', token: '--color-ink-soft', hex: '#6F6466' },
  { name: 'Line', token: '--color-line', hex: '#E8DEDA' },
]

export default function App() {
  return (
    <main className="container">
      <header className={styles.hero}>
        <p className="eyebrow">Design system · Phase 2</p>
        <h1 className={styles.heroTitle}>
          Your closet, <em>beautifully</em> organised.
        </h1>
        <p className={styles.lead}>
          ClosetCloud is a digital wardrobe for planning outfits with the pieces
          you already own.
        </p>
        <div className={styles.row}>
          <Button>Add a piece</Button>
          <Button variant="secondary">Build an outfit</Button>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="colour-heading">
        <h2 id="colour-heading">Colour</h2>
        <ul className={styles.swatches}>
          {swatches.map((s) => (
            <li key={s.token} className={styles.swatch}>
              <span
                className={styles.chip}
                style={{ background: `var(${s.token})` }}
              />
              <span className={styles.swatchName}>{s.name}</span>
              <code className="muted">{s.hex}</code>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="type-heading">
        <h2 id="type-heading">Typography</h2>
        <div className={styles.typeStack}>
          <p className={styles.display}>Cormorant Garamond — Display</p>
          <h2>Section heading for wardrobe pages</h2>
          <h3>Card title · Linen summer dress</h3>
          <h4>Small heading in DM Sans</h4>
          <p>
            Body text is DM Sans at 16px with a relaxed line height, so longer
            notes about a piece stay easy to read.
          </p>
          <p className="muted">Secondary text for captions and metadata.</p>
          <p>
            Links look <a href="#type-heading">like this</a>.
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="button-heading">
        <h2 id="button-heading">Buttons</h2>
        <p className="muted">Press Tab to see the keyboard focus ring.</p>
        <div className={styles.row}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Delete</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm">Small</Button>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="surface-heading">
        <h2 id="surface-heading">Surfaces</h2>
        <div className={styles.cards}>
          <article className={styles.card}>
            <p className="eyebrow">Card</p>
            <h3>White surface</h3>
            <p className="muted">Soft border, medium radius, gentle shadow.</p>
          </article>
          <article className={`${styles.card} ${styles.cardBlush}`}>
            <p className={`eyebrow ${styles.eyebrowDeep}`}>Selected</p>
            <h3>Blush surface</h3>
            <p>Text on blush always uses ink or rose-deep.</p>
          </article>
        </div>
      </section>
    </main>
  )
}
