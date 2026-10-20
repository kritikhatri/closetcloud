import { useState } from 'react'
import { Link } from 'react-router'
import { CATEGORIES, COLORS, labelFor } from '../../constants/wardrobe.js'
import Icon from '../Icon/Icon.jsx'
import styles from './ClothingCard.module.css'

/* One piece of clothing in the grid: photo first, details underneath. */
export default function ClothingCard({ item }) {
  const [imageFailed, setImageFailed] = useState(false)
  const color = COLORS.find((option) => option.value === item.color)

  return (
    <Link to={`/wardrobe/${item.id}`} className={styles.card}>
      <div className={styles.media}>
        {imageFailed ? (
          // Broken or missing image → a calm placeholder instead of the
          // browser's broken-image icon.
          <div className={styles.fallback}>
            <Icon name="hanger" size={32} />
            <span>Photo unavailable</span>
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <div className={styles.body}>
        {/* The image alt is empty because the name right here already
            describes it; screen readers would otherwise say it twice. */}
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.meta}>
          {color && (
            <span
              className={styles.swatch}
              style={{ background: color.swatch }}
              title={color.label}
              aria-hidden="true"
            />
          )}
          {labelFor(CATEGORIES, item.category)}
          {item.brand && <> · {item.brand}</>}
        </p>
      </div>
    </Link>
  )
}
