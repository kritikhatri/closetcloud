import { lookImageUrl } from '../../data/inspiration.js'
import styles from './PhotoStack.module.css'

/*
  Three photos fanned out like prints on a table. Purely decorative:
  used in page banners and empty states to bring the editorial feel of
  the front page into the app. Hidden from screen readers because it
  carries no information.
*/
export default function PhotoStack({ looks, size = 'md' }) {
  return (
    <div className={`${styles.stack} ${styles[size]}`} aria-hidden="true">
      {looks.slice(0, 3).map((look) => (
        <img key={look.id} src={lookImageUrl(look, 300)} alt="" className={styles.photo} />
      ))}
    </div>
  )
}
