import { describe, expect, it } from 'vitest'
import { Layout } from './Layout.js'
import { Header } from './Header.js'
import { Main } from './Main.js'
import { Footer } from './Footer.js'

const render = async (node: unknown) => String(await node)

describe('Layout', () => {
  it('uses the title prop and puts children inside main', async () => {
    const html = await render(
      <Layout title="Test Title">
        <p>Page content</p>
      </Layout>
    )

    expect(html.startsWith('<!doctype html>')).toBe(true)
    expect(html).toContain('<title>Test Title</title>')
    expect(html).toContain('<main class="site-main"><p>Page content</p></main>')
  })
})

describe('Header', () => {
  it('links the AgentClinic name to the home page', async () => {
    const html = await render(<Header />)

    expect(html).toBe(
      '<header class="site-header"><a class="site-name" href="/">AgentClinic</a></header>'
    )
  })
})

describe('Main', () => {
  it('wraps its children in a main element', async () => {
    const html = await render(<Main>hello</Main>)

    expect(html).toBe('<main class="site-main">hello</main>')
  })
})

describe('Footer', () => {
  it('renders a footer with a playful line', async () => {
    const html = await render(<Footer />)

    expect(html).toMatch(/^<footer class="site-footer"><p>.+<\/p><\/footer>$/)
  })
})
