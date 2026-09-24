# Requirements — Phase 1: Hono "Hello, AgentClinic" server, home page, layout and stylesheet

## Context

This is the first roadmap phase (Foundation, step 1). It started as the smallest visible change: a running Hono server that says hello. It was then extended to cover a JSX layout (with header, main and footer) and a linked stylesheet, so the first demo shows a real, styled page. That pulls in the core of roadmap Phases 4–7; the nav links from Phase 6 are still deferred. Dev scripts, builds and tests still come later, so each step stays easy to demo live (see `specs/mission.md`, principle 5: *Small steps*).

Stack guidance comes from `specs/tech-stack.md`: TypeScript in strict mode, Node.js LTS, Hono with `@hono/node-server`, server-rendered Hono JSX, and plain CSS served as a static file.

## Scope

In scope:

- A `package.json` for the `agentclinic` project.
- Runtime dependencies: `hono`, `@hono/node-server`.
- Dev dependencies: `typescript`, `@types/node` (so `process.env` type-checks).
- A `tsconfig.json`, with Hono JSX enabled.
- `src/app.tsx`: the Hono app. It serves `public/` as static files, and `GET /` renders the home page through `Layout`.
- `src/index.ts`: the server entry point, which serves the app.
- `src/views/Layout.tsx`: the main layout component, built from three subcomponents in `src/views/`: `Header.tsx`, `Main.tsx` and `Footer.tsx`.
- `public/styles.css`: the site stylesheet, linked from the layout.

Out of scope, and deferred to the phase shown:

- `npm run dev` / `npm run build` scripts, and `tsx` as a dependency (Phase 2).
- Vitest and tests (Phase 3).
- Nav links in the header (Phase 6). The header shows only the AgentClinic name for now.
- The database (Phase 8+).
- Polished visual design, responsive tweaks and an accessibility pass (Phases 36–38).

## Decisions

1. **ESM modules.** `package.json` sets `"type": "module"`.
2. **TypeScript config.** `target: ES2022`, `module: NodeNext`, `moduleResolution: NodeNext`, `strict: true`, `skipLibCheck: true`, `types: ["node"]` (TypeScript 7 no longer auto-includes `@types/*`), `jsx: react-jsx`, `jsxImportSource: hono/jsx`, `outDir: dist`, `include: ["src"]`. Because this is NodeNext, relative imports use the `.js` extension (e.g. `import { app } from './app.js'`), even for `.tsx` files.
3. **Split app and entry.** `src/app.tsx` exports `app` and does not start a server, so the Phase 3 tests can import it with `app.request()`. `src/index.ts` is the only file that calls `serve()`.
4. **Port.** Read from `PORT`, defaulting to `3000`. On startup, log a friendly line with the URL (e.g. `AgentClinic is open at http://localhost:3000`).
5. **Home page.** `GET /` returns `text/html` via `c.html(<Layout title="AgentClinic">…</Layout>)`. The page content is `<h1>Hello, AgentClinic</h1>`, followed by `<p>A place for AI agents to get relief from their humans.</p>` (from `specs/mission.md`).
6. **Layout component.** `Layout` takes a `title` prop and `children`, and renders the whole document:
   - `<!doctype html>` (emitted with `raw()` from `hono/html`, since JSX can't express a doctype), then `<html lang="en">`.
   - A `<head>` with `<meta charset="utf-8">`, the viewport meta tag, `<title>{title}</title>`, and `<link rel="stylesheet" href="/styles.css">`.
   - A `<body>` made of three subcomponents:
     - `Header`: a `<header class="site-header">` with the AgentClinic name, linking to `/`.
     - `Main`: a `<main class="site-main">` that renders `children`.
     - `Footer`: a `<footer class="site-footer">` with a short, playful line.
7. **Stylesheet.** `public/styles.css` is served with `serveStatic({ root: './public' })` from `@hono/node-server/serve-static`, so it's available at `/styles.css`. Node can't `import` CSS without a bundler, so the stylesheet is served and linked rather than imported in code. It uses CSS custom properties for colors, fonts and spacing, and a flex-column body so the footer stays at the bottom. There's no client-side JavaScript.
8. **Static root.** `./public` is resolved from the working directory, so the server is started from the project root.
9. **Git hygiene.** `node_modules/` stays git-ignored (it already is). `dist/` is never committed.
