/*
  Returns only the items that match every active filter.
  An empty filter value means "don't filter by this".

  For now this runs in the browser. Once the closet lives on the server
  (Phase 7), the same filters become URL query parameters on the API
  request and the database does the filtering.
*/
export function filterItems(items, { q, category, color, season, occasion }) {
  const search = q.trim().toLowerCase()

  return items.filter((item) => {
    if (category && item.category !== category) return false
    if (color && item.color !== color) return false
    if (season && !item.seasons.includes(season)) return false
    if (occasion && !item.occasions.includes(occasion)) return false
    if (search) {
      const haystack = `${item.name} ${item.brand} ${item.notes}`.toLowerCase()
      if (!haystack.includes(search)) return false
    }
    return true
  })
}

export const FILTER_KEYS = ['q', 'category', 'color', 'season', 'occasion']
