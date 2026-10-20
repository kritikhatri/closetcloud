import { getLooks } from '../../data/inspiration.js'
import PhotoStack from '../PhotoStack/PhotoStack.jsx'
import styles from './PageHeader.module.css'

/*
  The editorial heading at the top of every page:
    small uppercase eyebrow → big serif title → description → actions

  Pass `looks` (three inspiration ids) to turn it into a blush banner
  with a fan of photos on the right. Without it you get the plain,
  quieter header, which suits form pages like "Add a piece".
*/
export default function PageHeader({ eyebrow, title, description, actions, looks }) {
  return (
    <header className={looks ? styles.banner : styles.header}>
      <div className={styles.text}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {looks && (
        <div className={styles.photos}>
          <PhotoStack looks={getLooks(looks)} />
        </div>
      )}
    </header>
  )
}
