# Validation — Phase 8: open the SQLite database on startup

The phase is done, and can be merged, when every check below passes.

**Status:** All checks except the browser check were run on `phase-08-sqlite` on 2026-09-24. A new database file is 0 bytes until the schema is added in Phase 9, which is normal for SQLite; `pragma integrity_check` still reports `ok`. The unwritable-path check fails with `SqliteError: unable to open database file` (`SQLITE_CANTOPEN`) and exit code 1. SK confirmed the browser check.

## Automated checks

- [x] `npm test` passes: 14 tests (the 11 existing tests, plus 3 new tests in `src/db/index.test.ts`).
- [x] The new tests cover: `:memory:` runs `select 1`; `pragma foreign_keys` is `1`; opening a path in a missing folder creates the folder and the file.
- [x] Running `npm test` doesn't create `data/` in the project.
- [x] `npm run typecheck` exits with code 0.
- [x] `npm run build` exits with code 0; `dist/db/index.js` exists and `dist/db/index.test.js` doesn't.

## Database on startup

Start each check with no `data/` folder.

- [x] `npm run dev` creates `data/` and `data/agentclinic.db`, then logs `AgentClinic is open at http://localhost:3000`.
- [x] `data/agentclinic.db` is a valid SQLite file (e.g. `sqlite3 data/agentclinic.db 'pragma integrity_check'` prints `ok`, or opening it with better-sqlite3 works).
- [x] Restarting the server reuses the existing file: no error, and the file isn't replaced.
- [x] `DATABASE_PATH=/tmp/agentclinic-test/other.db npm run dev` creates the database there, and doesn't create `data/` in the project.
- [x] `npm start` (after `npm run build`, from the project root) opens `data/agentclinic.db` and serves the page.
- [x] A path that can't be written to (e.g. `DATABASE_PATH=/agentclinic.db`) makes startup fail with a clear error, and the server doesn't listen.
- [x] Stopping the server (Ctrl+C) exits cleanly, and the database opens fine on the next start.

## App unchanged

- [x] Under both `npm run dev` and `npm start`, `/` returns the same HTML as in Phase 2, `/styles.css` returns `200` with `text/css`, and `/nope.css` returns `404`.
- [x] **Responsive:** no horizontal scrolling at 320px, 375px, 768px and 1280px, and main content is capped and centered at 1280px (the page shouldn't change in this phase).
- [x] Opening `http://localhost:3000/` in a browser shows the styled page, with no console errors and no failed network requests (confirmed by SK).

## Scope checks

- [x] Runtime `dependencies` are `hono`, `@hono/node-server` and `better-sqlite3`; `devDependencies` gains only `@types/better-sqlite3`.
- [x] `src/app.tsx` doesn't import the database.
- [x] `openDatabase` sets `foreign_keys = ON`, and doesn't set WAL mode, register signal handlers, or log anything.
- [x] No schema, tables, or seed data are added.
- [x] `.gitignore` contains `/data`, and `git status` doesn't list `data/` after the server runs.
- [x] No files in `public/` or `src/views/` are changed.

## Merge readiness

- [x] The work is on branch `phase-08-sqlite`, in commits that touch only `package.json`, `package-lock.json`, `.gitignore`, `src/index.ts`, `src/db/`, `specs/roadmap.md`, and this spec directory.
- [x] `specs/roadmap.md` marks Phase 8 as done, with a link to this spec.
