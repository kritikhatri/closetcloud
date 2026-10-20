import {
  CATEGORIES,
  COLORS,
  LIMITS,
  OCCASIONS,
  SEASONS,
} from '../constants/wardrobe.js'

const allowed = (options) => new Set(options.map((option) => option.value))
const categoryValues = allowed(CATEGORIES)
const colorValues = allowed(COLORS)
const seasonValues = allowed(SEASONS)
const occasionValues = allowed(OCCASIONS)

/*
  Cleans and checks a clothing item before saving.
  Returns { values, errors }:
    values – trimmed, tidied data that's safe to store
    errors – { fieldName: 'message' }; empty object means it's valid

  The browser runs this for instant feedback. The server will run the
  same checks again in Phase 7, because anyone can bypass browser code.
*/
export function validateItem(input) {
  const values = {
    name: String(input.name ?? '').trim(),
    category: input.category ?? '',
    color: input.color ?? '',
    seasons: [...new Set(input.seasons ?? [])],
    occasions: [...new Set(input.occasions ?? [])],
    brand: String(input.brand ?? '').trim(),
    notes: String(input.notes ?? '').trim(),
    imageUrl: input.imageUrl ?? '',
  }
  const errors = {}

  if (!values.imageUrl) errors.imageUrl = 'Add a photo of this piece.'

  if (!values.name) errors.name = 'Give this piece a name.'
  else if (values.name.length > LIMITS.name)
    errors.name = `Keep the name under ${LIMITS.name} characters.`

  if (!categoryValues.has(values.category))
    errors.category = 'Choose a category.'

  if (!colorValues.has(values.color)) errors.color = 'Choose the main colour.'

  if (values.seasons.some((season) => !seasonValues.has(season)))
    errors.seasons = 'One of the seasons isn’t recognised.'

  if (values.occasions.some((occasion) => !occasionValues.has(occasion)))
    errors.occasions = 'One of the occasions isn’t recognised.'

  if (values.brand.length > LIMITS.brand)
    errors.brand = `Keep the brand under ${LIMITS.brand} characters.`

  if (values.notes.length > LIMITS.notes)
    errors.notes = `Keep notes under ${LIMITS.notes} characters.`

  return { values, errors }
}
