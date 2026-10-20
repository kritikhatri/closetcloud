import { PrismaPg } from '@prisma/adapter-pg'
// Prisma 7 generates its client as TypeScript into src/generated/prisma
// (run `npm run db:generate` to create it). Node 22.18+ can load .ts files
// directly by stripping the type annotations, so no build step is needed.
import { PrismaClient } from '../generated/prisma/client.ts'
import { config } from '../config.js'

/*
  The single database client for the whole server.
  Each PrismaClient keeps a pool of open connections, so we create exactly
  one and import it everywhere instead of making a new one per request.
  The `pg` adapter is the PostgreSQL driver Prisma talks through.
*/
const adapter = new PrismaPg({ connectionString: config.databaseUrl })

export const prisma = new PrismaClient({ adapter })
