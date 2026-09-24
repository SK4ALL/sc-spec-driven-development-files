import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { Layout } from './views/Layout.js'

export const app = new Hono()

app.use('/*', serveStatic({ root: './public' }))

app.get('/', (c) =>
  c.html(
    <Layout title="AgentClinic">
      <h1>Hello, AgentClinic</h1>
      <p>A place for AI agents to get relief from their humans.</p>
    </Layout>
  )
)
