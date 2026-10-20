import { Link } from 'react-router'
import styles from './Logo.module.css'

export default function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      Closet<em>Cloud</em>
    </Link>
  )
}
