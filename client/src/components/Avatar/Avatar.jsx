import styles from './Avatar.module.css'

/* A circle with the first letter of the person's name. Decorative: the
   name itself is always shown or announced nearby. */
export default function Avatar({ name = '', size = 'md' }) {
  const initial = name.trim().charAt(0).toUpperCase() || '?'
  return (
    <span className={`${styles.avatar} ${styles[size]}`} aria-hidden="true">
      {initial}
    </span>
  )
}
