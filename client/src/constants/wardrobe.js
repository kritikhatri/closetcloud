/*
  The fixed option lists for clothing items. The form, the filters and
  (later) the server's validation all read from these, so a category
  only ever has to be added in one place.
  `value` is what gets stored; `label` is what people see.
*/

export const CATEGORIES = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'bags', label: 'Bags' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'other', label: 'Other' },
]

// `swatch` is only for display — the little colour dot next to the name.
export const COLORS = [
  { value: 'black', label: 'Black', swatch: '#1f1b1c' },
  { value: 'white', label: 'White', swatch: '#ffffff' },
  { value: 'cream', label: 'Cream', swatch: '#f1e7d3' },
  { value: 'beige', label: 'Beige', swatch: '#d8c3a5' },
  { value: 'brown', label: 'Brown', swatch: '#7a5236' },
  { value: 'grey', label: 'Grey', swatch: '#9a9597' },
  { value: 'navy', label: 'Navy', swatch: '#26324f' },
  { value: 'blue', label: 'Blue', swatch: '#6f93c6' },
  { value: 'green', label: 'Green', swatch: '#6f8a62' },
  { value: 'red', label: 'Red', swatch: '#b23a3a' },
  { value: 'pink', label: 'Pink', swatch: '#eab1bd' },
  { value: 'purple', label: 'Purple', swatch: '#8c6fa8' },
  { value: 'yellow', label: 'Yellow', swatch: '#ead27a' },
  { value: 'orange', label: 'Orange', swatch: '#df8b4e' },
  {
    value: 'multi',
    label: 'Multi / print',
    swatch: 'conic-gradient(#eab1bd, #ead27a, #6f93c6, #6f8a62, #eab1bd)',
  },
]

export const SEASONS = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' },
]

export const OCCASIONS = [
  { value: 'casual', label: 'Casual' },
  { value: 'college', label: 'College' },
  { value: 'work', label: 'Work' },
  { value: 'date', label: 'Date night' },
  { value: 'party', label: 'Party' },
  { value: 'formal', label: 'Formal' },
  { value: 'sport', label: 'Sport' },
  { value: 'travel', label: 'Travel' },
  { value: 'lounge', label: 'Lounge' },
]

export const LIMITS = {
  name: 80,
  brand: 60,
  notes: 500,
}

/* Turns a stored value back into its label: labelFor(CATEGORIES, 'tops') → 'Tops' */
export function labelFor(options, value) {
  return options.find((option) => option.value === value)?.label ?? value
}
