    # Validation — Phase 1: Hono "Hello, AgentClinic" server and minimal home page

The phase is done, and can be merged, when every check below passes.

## Automated checks

- [ ] `npx tsc --noEmit` exits with code 0 and no errors (strict mode).

## Manual checks

- [ ] `npx tsx src/index.ts` starts the server and logs `AgentClinic is open at http://localhost:3000`.
- [ ] `curl -i http://localhost:3000/` returns `200 OK` with a `text/html` content type.
- [ ] The response body starts with `<!doctype html>` and contains `<title>AgentClinic</title>`, `<h1>Hello, AgentClinic</h1>`, and the mission tagline.
- [ ] Opening `http://localhost:3000/` in a browser shows "AgentClinic" as the tab title, the heading and the tagline, with no console errors.
- [ ] `PORT=4000 npx tsx src/index.ts` serves on port 4000 instead.
- [ ] Stopping the server (Ctrl+C) exits cleanly.

## Scope checks

- [ ] `package.json` has `"type": "module"`, and `dependencies` contains only `hono` and `@hono/node-server`.
- [ ] `devDependencies` contains only `typescript` and `@types/node`.
- [ ] There is no `scripts` block for dev, build or test (those are Phases 2–3).
- [ ] `src/app.ts` exports `app` and does not start a server. Only `src/index.ts` calls `serve()`.
- [ ] The home page uses no JSX, CSS, `public/` assets, header or footer (those are Phases 4–7).
- [ ] Neither `dist/` nor `node_modules/` is committed.

## Merge readiness

- [ ] The work is on branch `phase-01-hono-hello`, in commits that touch only Phase 1 files and this spec directory.
- [ ] `specs/roadmap.md` is unchanged (Phase 1 is still listed as the first Foundation step; the home-page addition is recorded in `requirements.md`).
