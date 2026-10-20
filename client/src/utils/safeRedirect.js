/*
  Where to send someone after they log in: the page they were trying to
  open (?next=/wardrobe), or the dashboard.

  Only same-site paths are allowed. Without this check, a link like
  /login?next=https://evil.example could bounce people to a fake site
  straight after they log in (an "open redirect").
*/
export function safeRedirect(next, fallback = '/home') {
  if (typeof next !== 'string') return fallback
  if (!next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) return fallback
  return next
}
