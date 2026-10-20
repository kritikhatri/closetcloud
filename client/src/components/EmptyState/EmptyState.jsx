import Icon from '../Icon/Icon.jsx'
import styles from './EmptyState.module.css'

/*
  Shown when a list has nothing in it yet. A good empty state explains
  what will appear here and gives the one action that gets you started.
*/
export default function EmptyState({ icon, title, children, action }) {
  return (
    <div className={styles.empty}>
      {icon && (
        <span className={styles.iconWrap}>
          <Icon name={icon} size={28} />
        </span>
      )}
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.text}>{children}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
