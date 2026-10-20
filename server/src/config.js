import { z } from 'zod'

/*
  Reads settings from environment variables once, at start-up, and checks
  them. If something required is missing the server refuses to start with
  a clear message, instead of failing mysteriously on the first request.

  Locally the values come from .env (loaded by `node --env-file=.env`).
  In production the hosting platform provides them.
*/
const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  // The website allowed to call this API with cookies (the React app).
  CLIENT_ORIGIN: z.string().url().default('http://localhost:5180'),
})

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment configuration:')
  for (const issue of parsed.error.issues) {
    console.error(`  ${issue.path.join('.')}: ${issue.message}`)
  }
  process.exit(1)
}

const env = parsed.data

export const config = {
  env: env.NODE_ENV,
  isProduction: env.NODE_ENV === 'production',
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  clientOrigin: env.CLIENT_ORIGIN,
}
