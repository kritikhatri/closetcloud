import {
  SESSION_COOKIE,
  clearSessionCookie,
  setSessionCookie,
  validateSessionToken,
} from '../lib/sessions.js'
import { HttpError } from '../utils/HttpError.js'

/*
  Runs on every API request. If the request carries a valid session
  cookie, it attaches the logged-in user as `req.user`. It never blocks a
  request by itself: public routes (like login) still work without a user.
*/
export async function loadUser(req, res, next) {
  const token = req.cookies?.[SESSION_COOKIE]
  if (!token) return next()

  const result = await validateSessionToken(token)
  if (!result) {
    // Expired or unknown token: tidy up the browser's stale cookie.
    clearSessionCookie(res)
    return next()
  }

  req.user = result.user
  req.sessionToken = token
  // Sliding expiry: give the browser the new, later expiry date too.
  if (result.renewed) setSessionCookie(res, token, result.expiresAt)
  next()
}

/*
  Put this in front of any route that needs a logged-in user. Every query
  in those routes then filters by req.user.id, so one person can never
  read or change another person's data, whatever ids they put in the URL.
*/
export function requireAuth(req, res, next) {
  if (!req.user) throw new HttpError(401, 'Please log in to continue.')
  next()
}
