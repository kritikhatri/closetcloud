import HeroWall from '../HeroWall/HeroWall.jsx'
import Logo from '../Logo/Logo.jsx'
import styles from './AuthLayout.module.css'

/*
  Shared frame for the Log in and Sign up pages: the form on the left,
  the moving mood board from the front page on the right (desktop only).
*/
export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className={styles.page}>
      <main className={styles.formSide}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.formWrap}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {children}
          {footer && <p className={styles.footer}>{footer}</p>}
        </div>
      </main>

      <aside className={styles.photoSide} aria-hidden="true">
        <div className={styles.wall}>
          <HeroWall />
        </div>
        <p className={styles.caption}>
          Your closet, <em>beautifully organised.</em>
        </p>
      </aside>
    </div>
  )
}
