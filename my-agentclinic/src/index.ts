import { serve } from '@hono/node-server'
import { app } from './app.js'
import { DEFAULT_DATABASE_PATH, openDatabase } from './db/index.js'

const port = Number(process.env.PORT ?? 3000)

const db = openDatabase(process.env.DATABASE_PATH ?? DEFAULT_DATABASE_PATH)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AgentClinic is open at http://localhost:${info.port}`)
})
