import { useSearchParams } from 'react-router'
import { listItems } from '../../api/wardrobe.js'
import Button, { ButtonLink } from '../../components/Button/Button.jsx'
import ClothingGrid, {
  ClothingGridSkeleton,
} from '../../components/ClothingGrid/ClothingGrid.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import PageHeader from '../../components/PageHeader/PageHeader.jsx'
import useAsyncData from '../../hooks/useAsyncData.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import { FILTER_KEYS, filterItems } from '../../utils/filterItems.js'
import WardrobeFilters from './WardrobeFilters.jsx'
import styles from './Wardrobe.module.css'

export default function Wardrobe() {
  usePageTitle('Wardrobe')
  const { data: items, error, isLoading, reload } = useAsyncData(listItems)

  /*
    Filters live in the URL (?category=tops&color=black) instead of in
    useState. That means the Back button undoes a filter change, a
    refresh keeps your filters, and a filtered view can be bookmarked.
  */
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = Object.fromEntries(
    FILTER_KEYS.map((key) => [key, searchParams.get(key) ?? '']),
  )
  const hasFilters = FILTER_KEYS.some((key) => filters[key])

  function updateFilter(key, value) {
    setSearchParams(
      (params) => {
        if (value) params.set(key, value)
        else params.delete(key)
        return params
      },
      // Typing in search shouldn't add a history entry per keystroke.
      { replace: key === 'q' },
    )
  }

  // Recomputed on every render. That's fine: filtering even a few hundred
  // items takes well under a millisecond, so caching it would only add
  // complexity.
  const visibleItems = items ? filterItems(items, filters) : []
  const categoryCounts = {}
  for (const item of items ?? []) {
    categoryCounts[item.category] = (categoryCounts[item.category] ?? 0) + 1
  }

  const addButton = (
    <ButtonLink to="/wardrobe/new">
      <Icon name="plus" size={18} />
      Add a piece
    </ButtonLink>
  )

  return (
    <>
      <PageHeader
        eyebrow="Your closet"
        title="Wardrobe"
        description="Every piece you own, photographed and sorted by category, colour, season and occasion."
        actions={items?.length > 0 && addButton}
      />

      {isLoading && (
        <>
          <p role="status" className="visually-hidden">
            Loading your wardrobe…
          </p>
          <ClothingGridSkeleton />
        </>
      )}

      {error && (
        <EmptyState
          title="We couldn’t load your wardrobe"
          action={<Button onClick={reload}>Try again</Button>}
        >
          {error.message}
        </EmptyState>
      )}

      {items?.length === 0 && (
        <EmptyState icon="hanger" title="Your closet is empty" action={addButton}>
          Start with a few favourites. Snap a photo, pick a category, and the
          piece will appear here.
        </EmptyState>
      )}

      {items?.length > 0 && (
        <>
          <WardrobeFilters
            filters={filters}
            onChange={updateFilter}
            categoryCounts={categoryCounts}
            total={items.length}
          />

          <div className={styles.resultsBar}>
            {/* role="status" announces the new count after each filter change. */}
            <p role="status" className="muted">
              {hasFilters
                ? `${visibleItems.length} of ${items.length} pieces`
                : `${items.length} ${items.length === 1 ? 'piece' : 'pieces'}`}
            </p>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={() => setSearchParams({})}>
                Clear filters
              </Button>
            )}
          </div>

          {visibleItems.length > 0 ? (
            <ClothingGrid items={visibleItems} />
          ) : (
            <EmptyState
              title="No pieces match"
              action={
                <Button variant="secondary" onClick={() => setSearchParams({})}>
                  Clear filters
                </Button>
              }
            >
              Try a different search, or remove a filter or two.
            </EmptyState>
          )}
        </>
      )}
    </>
  )
}
