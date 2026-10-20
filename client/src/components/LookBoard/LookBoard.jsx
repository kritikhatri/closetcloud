import { useSearchParams } from 'react-router'
import { AESTHETICS, LOOKS, mixedLooks } from '../../data/inspiration.js'
import LookCard from '../LookCard/LookCard.jsx'
import styles from './LookBoard.module.css'

/*
  The filterable mood board: aesthetic chips on top, masonry grid below.
  Used on both the front page and the in-app Inspiration page.
  The chosen aesthetic lives in the URL (?aesthetic=coquette), same idea
  as the wardrobe filters.
*/
export default function LookBoard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const active = searchParams.get('aesthetic') ?? ''

  const looks = active
    ? LOOKS.filter((look) => look.aesthetic === active)
    : mixedLooks()

  function choose(value) {
    setSearchParams(
      (params) => {
        if (value) params.set('aesthetic', value)
        else params.delete('aesthetic')
        return params
      },
      // preventScrollReset: stay where you are instead of jumping to the
      // top of the page when the URL changes.
      { replace: true, preventScrollReset: true },
    )
  }

  return (
    <div>
      <div className={styles.chips} role="group" aria-label="Filter by aesthetic">
        <button
          type="button"
          className={styles.chip}
          aria-pressed={!active}
          onClick={() => choose('')}
        >
          Everything
        </button>
        {AESTHETICS.map((aesthetic) => (
          <button
            key={aesthetic.value}
            type="button"
            className={styles.chip}
            aria-pressed={active === aesthetic.value}
            onClick={() => choose(aesthetic.value)}
          >
            {aesthetic.label}
          </button>
        ))}
      </div>

      <p className="visually-hidden" role="status">
        Showing {looks.length} looks
      </p>

      <ul className={styles.board}>
        {looks.map((look, index) => (
          <li key={look.id} className={styles.cell}>
            {/* The first few are visible straight away, so load them now. */}
            <LookCard look={look} eager={index < 4} />
          </li>
        ))}
      </ul>
    </div>
  )
}
