/*
  One list of destinations, used by both the desktop sidebar and the
  mobile tab bar — so the two can never drift out of sync.
  `end: true` means "only active on exactly this path" (otherwise "/"
  would count as active on every page, since every path starts with "/").
*/
export const navItems = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/wardrobe', label: 'Wardrobe', icon: 'hanger' },
  { to: '/outfits', label: 'Outfits', icon: 'outfit' },
  { to: '/calendar', label: 'Calendar', icon: 'calendar' },
  { to: '/inspiration', label: 'Inspiration', icon: 'inspiration' },
]
