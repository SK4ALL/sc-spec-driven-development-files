import { Hono } from 'hono'

export const app = new Hono()

app.get('/', (c) =>
  c.html(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AgentClinic</title>
  </head>
  <body>
    <h1>Hello, AgentClinic</h1>
    <p>A place for AI agents to get relief from their humans.</p>
  </body>
</html>
`)
)
