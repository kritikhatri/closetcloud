import { useId, useState } from 'react'
import { CATEGORIES, COLORS, OCCASIONS, SEASONS } from '../../constants/wardrobe.js'
import { SelectField, TextField } from '../../components/Field/Field.jsx'
import styles from './Wardrobe.module.css'

/*
  Search box, category tabs and dropdown filters.
  It doesn't store anything itself: it receives the current `filters`
  and reports changes through `onChange(key, value)`. The page keeps the
  real state (in the URL).
*/
export default function WardrobeFilters({ filters, onChange, categoryCounts, total }) {
  const moreFiltersId = useId()
  const activeMoreCount = ['color', 'season', 'occasion'].filter((key) => filters[key]).length
  // On phones the dropdowns start hidden (unless one is already in use),
  // so the clothes are visible without scrolling. Desktop always shows them.
  const [moreOpen, setMoreOpen] = useState(activeMoreCount > 0)

  return (
    <div className={styles.filters}>
      <div className={styles.filterRow}>
        <div className={styles.search}>
          <TextField
            label="Search"
            type="search"
            placeholder="Name, brand or notes"
            value={filters.q}
            onChange={(event) => onChange('q', event.target.value)}
          />
        </div>

        {/* aria-expanded tells screen readers whether the panel is open. */}
        <button
          type="button"
          className={styles.moreToggle}
          aria-expanded={moreOpen}
          aria-controls={moreFiltersId}
          onClick={() => setMoreOpen((open) => !open)}
        >
          Filters{activeMoreCount > 0 && ` (${activeMoreCount})`}
        </button>

        <div
          id={moreFiltersId}
          className={`${styles.moreFilters} ${moreOpen ? styles.moreOpen : ''}`}
        >
          <SelectField
            label="Colour"
            placeholder="Any colour"
            options={COLORS}
            value={filters.color}
            onChange={(event) => onChange('color', event.target.value)}
          />
          <SelectField
            label="Season"
            placeholder="Any season"
            options={SEASONS}
            value={filters.season}
            onChange={(event) => onChange('season', event.target.value)}
          />
          <SelectField
            label="Occasion"
            placeholder="Any occasion"
            options={OCCASIONS}
            value={filters.occasion}
            onChange={(event) => onChange('occasion', event.target.value)}
          />
        </div>
      </div>

      {/* aria-pressed tells screen readers which tab is selected. */}
      <div className={styles.tabs} role="group" aria-label="Filter by category">
        <button
          type="button"
          className={styles.tab}
          aria-pressed={!filters.category}
          onClick={() => onChange('category', '')}
        >
          All <span className={styles.count}>{total}</span>
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category.value}
            type="button"
            className={styles.tab}
            aria-pressed={filters.category === category.value}
            onClick={() => onChange('category', category.value)}
          >
            {category.label}{' '}
            <span className={styles.count}>{categoryCounts[category.value] ?? 0}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
