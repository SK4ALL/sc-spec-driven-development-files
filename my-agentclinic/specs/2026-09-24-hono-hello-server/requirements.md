# Requirements — Phase 1: Hono "Hello, AgentClinic" server

## Context

This is the first roadmap phase (Foundation, step 1). The goal is the smallest visible change: a running Hono server that says hello. Everything else (dev scripts, builds, tests, JSX, styling) comes in later phases, so each step stays easy to demo live (see `specs/mission.md`, principle 5: *Small steps*).

Stack guidance comes from `specs/tech-stack.md`: TypeScript in strict mode, Node.js LTS, Hono with `@hono/node-server`.

## Scope

In scope:

- A `package.json` for the `agentclinic` project.
- Runtime dependencies: `hono`, `@hono/node-server`.
- Dev dependencies: `typescript`, `@types/node` (so `process.env` type-checks).
- A `tsconfig.json`.
- `src/app.ts`: the Hono app, with `GET /` returning the plain text `Hello, AgentClinic`.
- `src/index.ts`: the server entry point, which serves the app.

Out of scope, and deferred to the phase shown:

- `npm run dev` / `npm run build` scripts, and `tsx` as a dependency (Phase 2).
- Vitest and tests (Phase 3).
- JSX, layout and HTML output (Phase 4). `app.ts` becomes `app.tsx` then.
- Static assets and styling (Phase 5+).
- The database (Phase 8+).

## Decisions

1. **ESM modules.** `package.json` sets `"type": "module"`.
2. **TypeScript config.** `target: ES2022`, `module: NodeNext`, `moduleResolution: NodeNext`, `strict: true`, `skipLibCheck: true`, `outDir: dist`, `include: ["src"]`. Because this is NodeNext, relative imports use the `.js` extension (e.g. `import { app } from './app.js'`).
3. **Split app and entry.** `src/app.ts` exports `app` and does not start a server, so the Phase 3 tests can import it with `app.request()`. `src/index.ts` is the only file that calls `serve()`.
4. **Port.** Read from `PORT`, defaulting to `3000`. On startup, log a friendly line with the URL (e.g. `AgentClinic is open at http://localhost:3000`).
5. **Response.** `GET /` returns `text/plain` with the body `Hello, AgentClinic`.
6. **Git hygiene.** `node_modules/` stays git-ignored (it already is). `dist/` is never committed.
