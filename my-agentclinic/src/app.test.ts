import { describe, expect, it } from 'vitest'
import { app } from './app.js'

describe('GET /', () => {
  it('returns the AgentClinic home page as HTML', async () => {
    const res = await app.request('/')

    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/html')

    const body = await res.text()
    expect(body.startsWith('<!doctype html>')).toBe(true)
    expect(body).toContain('<html lang="en">')
    expect(body).toContain('<title>AgentClinic</title>')
    expect(body).toContain('<h1>Hello, AgentClinic</h1>')
    expect(body).toContain('A place for AI agents to get relief from their humans.')
  })

  it('renders the header, main and footer in order', async () => {
    const body = await (await app.request('/')).text()

    const header = body.indexOf('<header')
    const main = body.indexOf('<main')
    const footer = body.indexOf('<footer')

    expect(header).toBeGreaterThan(-1)
    expect(main).toBeGreaterThan(header)
    expect(footer).toBeGreaterThan(main)
  })

  it('sets the responsive viewport', async () => {
    const body = await (await app.request('/')).text()

    expect(body).toContain(
      '<meta name="viewport" content="width=device-width, initial-scale=1"/>'
    )
  })

  it('links the stylesheet', async () => {
    const body = await (await app.request('/')).text()

    expect(body).toContain('<link rel="stylesheet" href="/styles.css"/>')
  })
})

describe('static files', () => {
  it('serves the stylesheet as CSS', async () => {
    const res = await app.request('/styles.css')

    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/css')
    expect(await res.text()).toContain('.site-header')
  })

  it('serves a mobile-first stylesheet with rem breakpoints', async () => {
    const css = await (await app.request('/styles.css')).text()

    expect(css).toContain('@media (min-width: 40rem)')
    expect(css).toContain('@media (min-width: 64rem)')
    expect(css).not.toMatch(/@media[^{]*max-width/)
  })

  it('returns 404 for a missing file', async () => {
    const res = await app.request('/nope.css')

    expect(res.status).toBe(404)
  })
})
