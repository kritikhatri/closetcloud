/*
  The one function every API call goes through.

  It handles the repetitive parts in one place:
    • sends/parses JSON
    • includes the login cookie
    • turns error responses into ApiError, with the server's message and
      per-field messages ({ email: 'Enter a valid email address.' })
    • turns "server unreachable" into a friendly message
    • tells the app when the session has expired (401)
*/

/* An error that remembers its HTTP status, so pages can tell "not found"
   (404) apart from "invalid input" (400) or "not logged in" (401). */
export class ApiError extends Error {
  constructor(message, status, fieldErrors) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

// The AuthProvider registers a function here so that any 401 from any
// request can log the user out of the UI (e.g. their session expired).
let handleUnauthorized = null
export function onUnauthorized(callback) {
  handleUnauthorized = callback
}

/*
  Message for errors that didn't come from our API (so there's no JSON
  error body). In development, a 502/504 means Vite's proxy couldn't reach
  the Express server, almost always because it isn't running, so say so.
*/
function fallbackMessage(status) {
  if (import.meta.env.DEV && (status === 502 || status === 504)) {
    return 'The ClosetCloud API isn’t running. Start it with `npm run dev` in the closetcloud folder (or `npm run dev` inside server/).'
  }
  if (status >= 500) return 'ClosetCloud’s server isn’t responding. Please try again in a moment.'
  return `Request failed (${status}).`
}

export async function apiFetch(path, { method = 'GET', body } = {}) {
  let response
  try {
    response = await fetch(`/api${path}`, {
      method,
      credentials: 'same-origin', // send the session cookie
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    // fetch only throws when no response arrived at all (offline, DNS…).
    throw new ApiError('Can’t reach ClosetCloud. Check your connection and try again.', 0)
  }

  // 204 = success with no body (e.g. logout).
  const data = response.status === 204 ? null : await response.json().catch(() => null)

  if (!response.ok) {
    if (response.status === 401) handleUnauthorized?.()
    const message =
      data?.error?.message ?? fallbackMessage(response.status)
    throw new ApiError(message, response.status, data?.error?.fields)
  }

  return data
}
