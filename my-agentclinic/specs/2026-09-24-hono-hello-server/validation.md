# Validation — Phase 1: Hono "Hello, AgentClinic" server, home page, layout, stylesheet and tests

The phase is done, and can be merged, when every check below passes.

**Status:** The original Phase 1 (plain server and minimal home page) was verified on 2026-09-24. The type-check and curl checks were run on `phase-01-hono-hello` (`fe51720`), and SK confirmed the browser check on `main` (`d398dff`). The layout and stylesheet checks were run on `phase-01-layout`, the test checks on `phase-01-tests`, and the responsive checks on `responsive-design` (in headless Chrome, using a same-origin iframe for phone widths). SK confirmed the styled-page browser check on `main` (`e60d604`).

## Automated checks

- [x] `npx tsc --noEmit` exits with code 0 and no errors (strict mode, JSX enabled), including the test files.
- [x] `npm test` passes: 11 tests in `src/app.test.ts` and `src/views/Layout.test.tsx`, including the viewport meta tag and the mobile-first breakpoints.
- [x] Breaking a component on purpose (e.g. turning `<footer>` into a `<div>`) makes `npm test` fail, and restoring it makes the tests pass again.

## Manual checks

- [x] `npx tsx src/index.ts` (run from the project root) starts the server and logs `AgentClinic is open at http://localhost:3000`.
- [x] `curl -i http://localhost:3000/` returns `200 OK` with a `text/html` content type.
- [x] The response body starts with `<!doctype html>` and contains `<title>AgentClinic</title>`, `<h1>Hello, AgentClinic</h1>`, and the mission tagline.
- [x] The body has a `<header>`, a `<main>` wrapping the heading and tagline, and a `<footer>`, in that order.
- [x] The `<head>` contains `<link rel="stylesheet" href="/styles.css">`.
- [x] `curl -i http://localhost:3000/styles.css` returns `200 OK` with a `text/css` content type.
- [x] A missing static file (e.g. `/nope.css`) returns `404`.
- [x] Opening `http://localhost:3000/` in a browser shows "AgentClinic" as the tab title, the styled header (with the AgentClinic name), the heading and tagline, and the footer at the bottom of the window, with no console errors and no failed network requests.
- [x] `PORT=4000 npx tsx src/index.ts` serves on port 4000 instead.

## Responsive checks

Check at each width with the browser's device toolbar. Headless Chrome can't go below a 500px window, so use a same-origin iframe for phone widths.

- [x] **320px (small phone):** no horizontal scrolling (`scrollWidth` equals `clientWidth`); the tagline and footer text wrap instead of being clipped; the header, heading and footer are all readable.
- [x] **375px (phone):** same as 320px.
- [x] **768px (tablet):** no horizontal scrolling; the gutters are wider than on phones.
- [x] **1280px (desktop):** no horizontal scrolling; main content is capped at 60rem and centered; the header and footer stretch full width.
- [x] At every width, the footer sits at the bottom of the window when the content is short.
- [x] The header's AgentClinic link is at least 44px tall.
- [x] The CSS has only `min-width` media queries, at `40rem` and `64rem`.
- [x] Stopping the server (Ctrl+C) exits cleanly.

## Scope checks

- [x] `package.json` has `"type": "module"`, and `dependencies` contains only `hono` and `@hono/node-server`.
- [x] `devDependencies` contains only `typescript`, `@types/node` and `vitest`.
- [x] `scripts` contains only `test` (`vitest run`); there's no `dev` or `build` script yet (Phase 2).
- [x] `src/app.tsx` exports `app` and does not start a server. Only `src/index.ts` calls `serve()`.
- [x] `Layout` is built from exactly three subcomponents (`Header`, `Main`, `Footer`) in `src/views/`.
- [x] The header has no nav links yet (Phase 6), and there's no client-side JavaScript.
- [x] Neither `dist/` nor `node_modules/` is committed.

## Merge readiness

- [x] The work is on branches `phase-01-layout` and `phase-01-tests`, in commits that touch only Phase 1 files (`package.json`, `package-lock.json`, `tsconfig.json`, `src/`, `public/`) and this spec directory.
- [x] `specs/roadmap.md` keeps Phase 1 as the first Foundation step, and marks Phases 1, 3, 4, 5 and 7 as done and Phase 6 as partly done (nav links still to do). The additions pulled in from Phases 3–7 are recorded in `requirements.md`.
