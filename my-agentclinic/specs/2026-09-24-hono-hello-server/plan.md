# Plan — Phase 1: Hono "Hello, AgentClinic" server and minimal home page

See `requirements.md` for scope and decisions, and `validation.md` for the definition of done.

## 1. Initialize the project

1. Create `package.json`: name `agentclinic`, `"private": true`, `"type": "module"`.
2. Do not add any `scripts` yet (they come in Phase 2).

## 2. Install dependencies

1. `npm install hono @hono/node-server`
2. `npm install -D typescript @types/node`
3. Confirm that `package-lock.json` was created and `node_modules/` is git-ignored.

## 3. Configure TypeScript

1. Create `tsconfig.json` with ES2022, NodeNext module and moduleResolution, `strict`, `skipLibCheck`, `outDir: dist`, `include: ["src"]`.
2. Run `npx tsc --noEmit` against an empty `src/` to check the config (a "no inputs" error is expected at this point).

## 4. Create the Hono app

1. Create `src/app.ts` exporting `const app = new Hono()`.
2. Add `app.get('/', (c) => c.text('Hello, AgentClinic'))`.
3. Don't call `serve()` in this file.

## 5. Create the server entry point

1. Create `src/index.ts`, importing `serve` from `@hono/node-server` and `app` from `./app.js`.
2. Read the port from `process.env.PORT`, defaulting to `3000`.
3. Call `serve({ fetch: app.fetch, port })` and log `AgentClinic is open at http://localhost:<port>`.

## 6. Add a minimal AgentClinic home page

1. Change `GET /` in `src/app.ts` from `c.text(...)` to `c.html(...)`, returning a minimal HTML document written as an inline template string (no JSX yet).
2. The document has `<!doctype html>`, `<html lang="en">`, a `<meta charset="utf-8">`, a viewport meta tag, and `<title>AgentClinic</title>`.
3. The body has an `<h1>` reading `Hello, AgentClinic` and a one-line tagline taken from the mission: `A place for AI agents to get relief from their humans.`
4. Don't add CSS, a header/footer, or a layout component (those are Phases 4–7).

## 7. Verify

1. Run every check in `validation.md`.
2. Fix any failures before moving on.

## 8. Commit and merge prep

1. Make sure `git status` shows only the intended files: `package.json`, `package-lock.json`, `tsconfig.json`, `src/`, and this spec directory.
2. Commit on `phase-01-hono-hello`, then open a PR or merge once validation passes.
