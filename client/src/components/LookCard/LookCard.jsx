import { AESTHETICS, lookCreditUrl, lookImageUrl, lookSrcSet } from '../../data/inspiration.js'
import { SEASONS, labelFor } from '../../constants/wardrobe.js'
import styles from './LookCard.module.css'

/*
  One inspiration photo on the mood board. Deliberately looks different
  from a ClothingCard (the "Inspiration" tag, the credit line) so nobody
  confuses a stock photo with a piece they own.
*/
export default function LookCard({ look, eager = false }) {
  return (
    <figure className={styles.card}>
      <div className={styles.media}>
        <img
          src={lookImageUrl(look, 600)}
          srcSet={lookSrcSet(look)}
          // Tell the browser roughly how wide the image will be shown, so
          // it can choose the right file from srcSet.
          sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 300px"
          // width/height reserve the right space before the image arrives.
          width={600}
          height={Math.round(600 * look.ratio)}
          alt={look.title}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className={styles.tag}>Inspiration</span>
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.title}>{look.title}</span>
        <span className={styles.meta}>
          {labelFor(AESTHETICS, look.aesthetic)} · {labelFor(SEASONS, look.season)}
        </span>
        <a
          className={styles.credit}
          href={lookCreditUrl(look)}
          target="_blank"
          rel="noreferrer"
        >
          Photo: {look.photographer}
          <span className="visually-hidden"> on Unsplash (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  )
}
