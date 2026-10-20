import { Router } from 'express'
import { rateLimit } from 'express-rate-limit'
import { config } from '../config.js'
import { getDummyHash, hashPassword, verifyPassword } from '../lib/password.js'
import { prisma } from '../lib/prisma.js'
import {
  clearSessionCookie,
  createSession,
  deleteSession,
  publicUserFields,
  setSessionCookie,
} from '../lib/sessions.js'
import { requireAuth } from '../middleware/auth.js'
import { HttpError } from '../utils/HttpError.js'
import { validate } from '../utils/validate.js'
import { loginSchema, signupSchema } from '../validation/auth.js'

export const authRouter = Router()

/*
  Brute-force protection: each IP address gets a limited number of
  sign-up/login attempts per 15 minutes. Without this, a script could try
  thousands of passwords against one account.
*/
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: config.env === 'test' ? 1000 : 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (req, res, next) =>
    next(new HttpError(429, 'Too many attempts. Please wait a few minutes and try again.')),
})

async function startSession(res, userId) {
  const { token, expiresAt } = await createSession(userId)
  setSessionCookie(res, token, expiresAt)
}

/* POST /api/auth/signup  { name, email, password } → 201 { user } */
authRouter.post('/signup', authLimiter, async (req, res) => {
  const { name, email, password } = validate(signupSchema, req.body)

  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } })
  if (existing) {
    throw new HttpError(409, 'An account with this email already exists.', {
      email: 'An account with this email already exists. Try logging in.',
    })
  }

  const user = await prisma.user.create({
    data: { name, email, passwordHash: await hashPassword(password) },
    select: publicUserFields,
  })

  await startSession(res, user.id)
  res.status(201).json({ user })
})

/* POST /api/auth/login  { email, password } → 200 { user } */
authRouter.post('/login', authLimiter, async (req, res) => {
  const { email, password } = validate(loginSchema, req.body)

  const account = await prisma.user.findUnique({
    where: { email },
    select: { ...publicUserFields, passwordHash: true },
  })

  // Always run a full hash check, even when the email doesn't exist (see
  // getDummyHash), and always give the same message, so the response
  // doesn't reveal whether an email has an account.
  const passwordOk = await verifyPassword(password, account?.passwordHash ?? (await getDummyHash()))
  if (!account || !passwordOk) {
    throw new HttpError(401, 'Email or password is incorrect.')
  }

  // Logging in again from the same browser replaces its old session.
  if (req.sessionToken) await deleteSession(req.sessionToken)

  await startSession(res, account.id)
  const { passwordHash, ...user } = account // never send the hash
  res.json({ user })
})

/* POST /api/auth/logout → 204 (no content) */
authRouter.post('/logout', async (req, res) => {
  if (req.sessionToken) await deleteSession(req.sessionToken)
  clearSessionCookie(res)
  res.status(204).end()
})

/* GET /api/auth/me → 200 { user } if logged in, otherwise 401 */
authRouter.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})
