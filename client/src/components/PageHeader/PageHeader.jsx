import styles from './PageHeader.module.css'

/*
  The editorial heading at the top of every page:
    small uppercase eyebrow → big serif title → description → actions
*/
export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className={styles.header}>
      <div className={styles.text}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  )
}
