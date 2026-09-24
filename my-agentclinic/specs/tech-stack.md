# Tech Stack

## Language

- **TypeScript** everywhere, with `strict` mode on.
- **Node.js** (current LTS) runtime.

## Web framework: Hono (recommended)

We use [Hono](https://hono.dev) with `@hono/node-server`, rendering HTML on the server with Hono's built-in JSX.

Why Hono:

- **TypeScript-first** — routes, params, and JSX views are all typed.
- **Popular and modern** — widely adopted, actively maintained, with a small API that's easy to learn.
- **Server-side rendering built in** — `hono/jsx` produces HTML with no client build step.
- **Lightweight** — fast startup and few dependencies, which suits live demos.

Alternatives we considered: Express (familiar, but weaker typing and older idioms), Fastify (solid, but more setup for views), and Next.js (powerful, but heavier than this app needs).

## Database: SQLite

We store data in [SQLite](https://sqlite.org), accessed with [better-sqlite3](https://github.com/WiseLibs/better-sqlite3).

Why SQLite:

- **Zero setup** — a single file on disk, with no database server to install or run. Ideal for demos and learners.
- **Reliable** — mature, widely used, and fully transactional.
- **Simple API** — better-sqlite3 is synchronous, fast, and easy to read in code walkthroughs.

Conventions:

- The database file lives at `data/agentclinic.db` and is git-ignored.
- The schema is defined in SQL and applied on startup.
- Seed data (sample agents, ailments, therapies) keeps a fresh checkout demo-ready.
- Tests use an in-memory database (`:memory:`) so they stay fast and isolated.

## Frontend

- Server-rendered HTML pages via Hono JSX components.
- Plain, modern CSS (custom properties, flexbox/grid) served as a static file.
- Minimal client-side JavaScript, added only where a feature needs it.
- Target: current versions of evergreen browsers (Chrome, Edge, Firefox, Safari).

## Tooling

- **tsx** to run TypeScript directly in development (`npm run dev`, with watch mode).
- **tsc** for type-checking and builds (`npm run build`).
- **Vitest** for tests, using Hono's `app.request()` to test routes without a running server.

## Project layout

```
src/
  index.ts        # server entry point
  app.tsx         # Hono app and routes
  views/          # JSX page components and layout
  db/             # SQLite connection, schema, and seed data
public/           # static assets (CSS, images)
data/             # local SQLite database file (git-ignored)
specs/            # mission, tech stack, roadmap, feature specs
```
