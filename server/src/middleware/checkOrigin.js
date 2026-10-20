import { config } from '../config.js'
import { HttpError } from '../utils/HttpError.js'

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

/*
  Extra protection against CSRF (another website tricking a logged-in
  browser into sending a request to our API).

  SameSite cookies already block most of this. As a second layer: browsers
  always send an Origin header with cross-site requests, and websites
  can't fake it. If a request that changes data comes from an origin
  that isn't our React app, refuse it.

  Requests with no Origin at all (curl, server-to-server) are allowed:
  they can't carry a victim's browser cookies anyway.
*/
export function checkOrigin(req, res, next) {
  if (SAFE_METHODS.has(req.method)) return next()

  const origin = req.get('origin')
  if (origin && origin !== config.clientOrigin) {
    throw new HttpError(403, 'Request blocked: unexpected origin.')
  }
  next()
}
