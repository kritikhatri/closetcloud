import { useEffect } from 'react'

/*
  Sets the browser tab title, e.g. "Wardrobe · ClosetCloud".
  Screen readers also announce the title, so each page needs its own.
*/
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ClosetCloud` : 'ClosetCloud'
  }, [title])
}
