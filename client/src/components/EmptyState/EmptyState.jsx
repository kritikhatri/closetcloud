import { getLooks } from '../../data/inspiration.js'
import Icon from '../Icon/Icon.jsx'
import PhotoStack from '../PhotoStack/PhotoStack.jsx'
import styles from './EmptyState.module.css'

/*
  Shown when a list has nothing in it yet. A good empty state explains
  what will appear here and gives the one action that gets you started.

  `looks` (three inspiration ids) shows a small fan of photos instead of
  the icon, which suits the big "nothing here yet" moments. Smaller or
  error states keep the simple icon.
*/
export default function EmptyState({ icon, looks, title, children, action }) {
  return (
    <div className={`${styles.empty} ${looks ? styles.withPhotos : ''}`}>
      {looks ? (
        <PhotoStack looks={getLooks(looks)} size="sm" />
      ) : (
        icon && (
          <span className={styles.iconWrap}>
            <Icon name={icon} size={28} />
          </span>
        )
      )}
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.text}>{children}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
