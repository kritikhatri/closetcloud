import { createApp } from './app.js'
import { config } from './config.js'
import { prisma } from './lib/prisma.js'

const app = createApp()

const server = app.listen(config.port, () => {
  console.log(`ClosetCloud API listening on http://localhost:${config.port}`)
})

/*
  Graceful shutdown: when the process is asked to stop (Ctrl+C, or the
  hosting platform redeploying), finish in-flight requests and close the
  database connections cleanly instead of cutting them off.
*/
async function shutdown(signal) {
  console.log(`${signal} received, shutting down...`)
  server.close(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
