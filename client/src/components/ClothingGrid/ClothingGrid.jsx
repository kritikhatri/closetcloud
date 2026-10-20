import ClothingCard from '../ClothingCard/ClothingCard.jsx'
import styles from './ClothingGrid.module.css'

/* Pinterest-style masonry grid of clothing cards. */
export default function ClothingGrid({ items, compact = false }) {
  return (
    <ul className={`${styles.grid} ${compact ? styles.compact : ''}`}>
      {items.map((item) => (
        <li key={item.id} className={styles.cell}>
          <ClothingCard item={item} />
        </li>
      ))}
    </ul>
  )
}

/* Grey placeholder cards shown while the wardrobe loads. Varied heights
   hint at the masonry layout that's about to appear. */
const skeletonHeights = [260, 200, 300, 230, 280, 210, 250, 300]

export function ClothingGridSkeleton({ count = 8 }) {
  return (
    <ul className={styles.grid} aria-hidden="true">
      {skeletonHeights.slice(0, count).map((height, index) => (
        <li key={index} className={styles.cell}>
          <div className={styles.skeletonImage} style={{ height }} />
          <div className={styles.skeletonLine} />
          <div className={`${styles.skeletonLine} ${styles.short}`} />
        </li>
      ))}
    </ul>
  )
}
