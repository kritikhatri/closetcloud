import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { config } from './config.js'
import { loadUser } from './middleware/auth.js'
import { checkOrigin } from './middleware/checkOrigin.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { authRouter } from './routes/auth.js'

/*
  Builds the Express app. Kept separate from index.js (which starts the
  server) so the automated tests can create the app without opening a
  fixed port.

  Middleware runs top to bottom for every request, like an assembly line.
*/
export function createApp() {
  const app = express()

  // Behind a hosting platform's proxy in production, trust its
  // X-Forwarded-* headers so rate limiting sees the real visitor IP and
  // secure cookies work over the proxy's HTTPS.
  if (config.isProduction) app.set('trust proxy', 1)

  app.use(helmet()) // sensible security headers on every response
  app.use(
    cors({
      // Only our React app may call the API from a browser, with cookies.
      origin: config.clientOrigin,
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '100kb' })) // parse JSON bodies (size-capped)
  app.use(cookieParser()) // fills req.cookies
  app.use(checkOrigin) // CSRF second layer
  app.use(loadUser) // sets req.user if the session cookie is valid

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
  })

  app.use('/api/auth', authRouter)

  app.use('/api', notFound)
  app.use(errorHandler) // must be last

  return app
}
