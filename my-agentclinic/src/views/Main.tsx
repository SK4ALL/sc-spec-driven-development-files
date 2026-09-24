import type { PropsWithChildren } from 'hono/jsx'

export const Main = ({ children }: PropsWithChildren) => (
  <main class="site-main">{children}</main>
)
