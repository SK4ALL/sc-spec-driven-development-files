# Validation — Phase 2: `npm run dev` and a working `npm run build`

The phase is done, and can be merged, when every check below passes.

## Automated checks

- [ ] `npm test` passes (all 11 existing tests).
- [ ] `npm run typecheck` exits with code 0, covers the test files, and doesn't create `dist/`.
- [ ] `npm run build` exits with code 0.

## Dev server

- [ ] `npm run dev` starts the server and logs `AgentClinic is open at http://localhost:3000`.
- [ ] `curl -i http://localhost:3000/` returns `200 OK` with the Phase 1 home page (doctype, title, header, main, footer, stylesheet link).
- [ ] Editing a file in `src/` (e.g. the footer text) makes tsx restart the server, and the next request shows the change without restarting `npm run dev` by hand. Revert the edit afterwards.
- [ ] `PORT=4000 npm run dev` serves on port 4000.
- [ ] Stopping it (Ctrl+C) exits cleanly.

## Build and start

- [ ] After `npm run build`, `dist/` contains `index.js`, `app.js`, and `views/Header.js`, `views/Main.js`, `views/Footer.js`, `views/Layout.js`.
- [ ] `dist/` contains no test files (nothing matching `*.test.*`) and no `dist/src/` folder.
- [ ] A stale file left in `dist/` (e.g. `dist/stale.js`) is gone after the next `npm run build`.
- [ ] `npm start` (from the project root) logs `AgentClinic is open at http://localhost:3000`.
- [ ] Under `npm start`, `/` returns the same HTML as under `npm run dev`, `/styles.css` returns `200` with `text/css`, and `/nope.css` returns `404`.
- [ ] `PORT=4000 npm start` serves on port 4000.

## Responsive checks

The page shouldn't change in this phase. Under `npm start`, recheck it at each width:

- [ ] **320px and 375px (phone):** no horizontal scrolling; text wraps rather than being clipped.
- [ ] **768px (tablet):** no horizontal scrolling.
- [ ] **1280px (desktop):** no horizontal scrolling; main content is capped and centered.
- [ ] Opening `http://localhost:3000/` in a browser under `npm start` shows the styled page, with no console errors and no failed network requests (confirmed by SK).

## Scope checks

- [ ] `scripts` contains exactly `dev`, `build`, `start`, `typecheck` and `test`.
- [ ] `devDependencies` gains only `tsx`; runtime `dependencies` are still only `hono` and `@hono/node-server`.
- [ ] `tsconfig.json` is unchanged; `tsconfig.build.json` extends it.
- [ ] `.gitignore` contains `/dist`, and `git status` doesn't list `dist/` after a build.
- [ ] No files in `src/` or `public/` are changed.

## Merge readiness

- [ ] The work is on branch `phase-02-dev-and-build`, in commits that touch only `package.json`, `package-lock.json`, `tsconfig.build.json`, `.gitignore`, `specs/roadmap.md`, and this spec directory.
- [ ] `specs/roadmap.md` marks Phase 2 as done, with a link to this spec.
