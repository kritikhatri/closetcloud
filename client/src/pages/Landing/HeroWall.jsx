import { LOOKS, lookImageUrl } from '../../data/inspiration.js'
import styles from './HeroWall.module.css'

/*
  The moving mood board in the hero: three columns of photos drifting
  up and down at different speeds.

  How the endless loop works: each column shows its photos twice in a
  row. The CSS animation slides the column up by exactly half its height
  (one full copy), then snaps back to the start. Because both halves are
  identical, the snap is invisible — it looks like it never ends.
*/
const columns = [
  { ids: ['pink-faux-fur', 'black-cami', 'stripes-flatlay', 'blush-satin', 'teal-coat', 'oversized-hoodie'], duration: '55s' },
  { ids: ['ivory-coat', 'tiered-pink', 'leather-mini', 'cardigan-flatlay', 'black-satin', 'denim-cargo'], duration: '65s', reverse: true },
  { ids: ['rose-maxi', 'cream-suit', 'pink-corset', 'white-crosswalk', 'sequin-gown', 'gingham-bag'], duration: '60s' },
]

const byId = Object.fromEntries(LOOKS.map((look) => [look.id, look]))

export default function HeroWall() {
  return (
    // Purely decorative (every photo appears with alt text and credit in
    // the board further down), so screen readers skip it.
    <div className={styles.wall} aria-hidden="true">
      {columns.map((column, columnIndex) => {
        const looks = column.ids.map((id) => byId[id])
        return (
          <div key={columnIndex} className={styles.column}>
            <div
              className={`${styles.track} ${column.reverse ? styles.reverse : ''}`}
              style={{ '--duration': column.duration }}
            >
              {[...looks, ...looks].map((look, index) => (
                <img
                  key={index}
                  src={lookImageUrl(look, 400)}
                  alt=""
                  width={400}
                  height={Math.round(400 * look.ratio)}
                  // Only the first copy of each column is visible at load.
                  loading={index < looks.length ? 'eager' : 'lazy'}
                  className={styles.photo}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
