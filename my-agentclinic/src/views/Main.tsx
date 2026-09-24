import type { PropsWithChildren } from 'hono/jsx'

export type MainProps = PropsWithChildren

export const Main = ({ children }: MainProps) => (
  <main class="site-main">{children}</main>
)
