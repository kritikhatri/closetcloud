import { createHash, randomBytes } from 'node:crypto'
import { config } from '../config.js'
import { prisma } from './prisma.js'

/*
  Session-based login.

  1. On login we create a long random token (impossible to guess) and
     give it to the browser in a cookie.
  2. We store only a SHA-256 hash of the token in the `sessions` table.
     If the database leaked, the hashes couldn't be used as cookies.
  3. On every request we hash the cookie's token and look it up. Found and
     not expired → we know who is making the request.
  4. Logging out deletes the row, so that token stops working at once.
*/

export const SESSION_COOKIE = 'cc_session'
const DAY_MS = 24 * 60 * 60 * 1000
const SESSION_LENGTH_MS = 30 * DAY_MS
// "Sliding" expiry: active users stay logged in. Once a session is past
// its halfway point, any request pushes the expiry 30 days out again.
const RENEW_WHEN_LESS_THAN_MS = 15 * DAY_MS

const hashToken = (token) => createHash('sha256').update(token).digest('hex')

export async function createSession(userId) {
  const token = randomBytes(32).toString('base64url') // 256 bits of randomness
  const expiresAt = new Date(Date.now() + SESSION_LENGTH_MS)
  await prisma.session.create({ data: { id: hashToken(token), userId, expiresAt } })
  return { token, expiresAt }
}

/* Returns { user, expiresAt, renewed } for a valid token, otherwise null. */
export async function validateSessionToken(token) {
  const id = hashToken(token)
  const session = await prisma.session.findUnique({
    where: { id },
    include: { user: { select: publicUserFields } },
  })
  if (!session) return null

  if (session.expiresAt.getTime() <= Date.now()) {
    await prisma.session.delete({ where: { id } }).catch(() => {}) // already gone is fine
    return null
  }

  if (session.expiresAt.getTime() - Date.now() < RENEW_WHEN_LESS_THAN_MS) {
    const expiresAt = new Date(Date.now() + SESSION_LENGTH_MS)
    await prisma.session.update({ where: { id }, data: { expiresAt } })
    return { user: session.user, expiresAt, renewed: true }
  }

  return { user: session.user, expiresAt: session.expiresAt, renewed: false }
}

export async function deleteSession(token) {
  await prisma.session.deleteMany({ where: { id: hashToken(token) } })
}

/*
  Cookie settings, and why:
    httpOnly  – JavaScript can't read it, so an XSS bug can't steal it
    sameSite  – 'lax' means other websites can't make the browser send it
                with POST/PATCH/DELETE requests (blocks CSRF attacks)
    secure    – HTTPS only (in production; localhost runs over HTTP)
*/
export function setSessionCookie(res, token, expiresAt) {
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: config.isProduction,
    path: '/',
    expires: expiresAt,
  })
}

export function clearSessionCookie(res) {
  res.clearCookie(SESSION_COOKIE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: config.isProduction,
    path: '/',
  })
}

/* The only user fields ever sent to the browser. Never passwordHash. */
export const publicUserFields = {
  id: true,
  email: true,
  name: true,
  styleAesthetics: true,
  createdAt: true,
}
