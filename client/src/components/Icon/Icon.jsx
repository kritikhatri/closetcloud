/*
  A tiny hand-made icon set (24×24, outline style) so we don't need an
  icon library. Each icon is just the inner SVG shapes; <Icon> wraps them
  in a consistent <svg>.

  Icons are decorative by default (aria-hidden) because they always sit
  next to a text label. If an icon is ever used alone, give its button an
  aria-label instead.
*/
const paths = {
  home: (
    <>
      <path d="M3.5 10.5 12 4l8.5 6.5" />
      <path d="M5.5 9v10.5h13V9" />
      <path d="M10 19.5v-5.5h4v5.5" />
    </>
  ),
  hanger: (
    <>
      <path d="M12 7.2a2.2 2.2 0 1 1 2.2 2.2c-.9 0-2.2.6-2.2 1.8v.6" />
      <path d="M12 11.8 3.3 17.6a1 1 0 0 0 .6 1.9h16.2a1 1 0 0 0 .6-1.9Z" />
    </>
  ),
  outfit: (
    <>
      {/* two overlapping garment cards = an outfit made of pieces */}
      <rect x="3.5" y="5" width="10" height="13" rx="2" />
      <path d="M16.5 6.5h2a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  inspiration: (
    <>
      {/* bookmark = saved looks */}
      <path d="M6.5 4h11a1 1 0 0 1 1 1v15.5L12 16.5l-6.5 4V5a1 1 0 0 1 1-1Z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="4" />
      <path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
}

export default function Icon({ name, size = 22, strokeWidth = 1.6, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
