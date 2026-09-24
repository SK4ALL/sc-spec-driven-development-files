    # Validation — Phase 1: Hono "Hello, AgentClinic" server and minimal home page

The phase is done, and can be merged, when every check below passes.

**Status: Verified on 2026-09-24.** The type-check and curl checks were run on `phase-01-hono-hello` (`fe51720`); the type-check was re-run and the browser check confirmed by SK on `main` after the merge (`d398dff`).

## Automated checks

- [x] `npx tsc --noEmit` exits with code 0 and no errors (strict mode).

## Manual checks

- [x] `npx tsx src/index.ts` starts the server and logs `AgentClinic is open at http://localhost:3000`.
- [x] `curl -i http://localhost:3000/` returns `200 OK` with a `text/html` content type.
- [x] The response body starts with `<!doctype html>` and contains `<title>AgentClinic</title>`, `<h1>Hello, AgentClinic</h1>`, and the mission tagline.
- [x] Opening `http://localhost:3000/` in a browser shows "AgentClinic" as the tab title, the heading and the tagline, with no console errors.
- [x] `PORT=4000 npx tsx src/index.ts` serves on port 4000 instead.
- [x] Stopping the server (Ctrl+C) exits cleanly.

## Scope checks

- [x] `package.json` has `"type": "module"`, and `dependencies` contains only `hono` and `@hono/node-server`.
- [x] `devDependencies` contains only `typescript` and `@types/node`.
- [x] There is no `scripts` block for dev, build or test (those are Phases 2–3).
- [x] `src/app.ts` exports `app` and does not start a server. Only `src/index.ts` calls `serve()`.
- [x] The home page uses no JSX, CSS, `public/` assets, header or footer (those are Phases 4–7).
- [x] Neither `dist/` nor `node_modules/` is committed.

## Merge readiness

- [x] The work is on branch `phase-01-hono-hello`, in commits that touch only Phase 1 files and this spec directory.
- [x] `specs/roadmap.md` is unchanged (Phase 1 is still listed as the first Foundation step; the home-page addition is recorded in `requirements.md`).
