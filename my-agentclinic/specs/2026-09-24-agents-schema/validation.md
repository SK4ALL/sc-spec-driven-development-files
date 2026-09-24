# Validation — Phase 9: apply a SQL schema file on startup

The phase is done, and can be merged, when every check below passes.

## Automated checks

- [ ] `npm test` passes: the 14 existing tests, plus the new schema tests in `src/db/index.test.ts`.
- [ ] The new tests cover:
  - `agents` exists with exactly `id`, `name`, `model`, `bio` and `created_at`;
  - `agents` starts empty;
  - inserting a row without `name` fails; `id` and `created_at` are filled in automatically;
  - reopening a file database (applying the schema again) doesn't fail and keeps existing rows.
- [ ] Running `npm test` doesn't create `data/` in the project.
- [ ] `npm run typecheck` exits with code 0.
- [ ] `npm run build` exits with code 0; `dist/db/schema.sql` exists and is identical to `src/db/schema.sql`; `dist/` still has no test files.

## Schema on startup

- [ ] With no `data/` folder, `npm run dev` creates `data/agentclinic.db` with an empty `agents` table (e.g. `sqlite3 data/agentclinic.db '.schema agents'` shows it, and `select count(*) from agents` is `0`).
- [ ] A `data/agentclinic.db` from Phase 8 (with no tables) gets the `agents` table on the next start.
- [ ] Restarting with an existing database keeps its rows: insert a row by hand, restart, and the row is still there.
- [ ] `npm start` (after `npm run build`, from the project root) applies the schema the same way.
- [ ] `npm start` run from another directory (e.g. `cd /tmp && DATABASE_PATH=/tmp/agentclinic-test/start.db node <project>/dist/index.js`) still finds `dist/db/schema.sql` and creates the table.
- [ ] If the schema can't be loaded (e.g. `dist/db/schema.sql` temporarily removed), startup fails with a clear error and the server doesn't listen. Rebuild afterwards.

## App unchanged

- [ ] Under both `npm run dev` and `npm start`, `/` returns the same HTML as in Phase 8, `/styles.css` returns `200` with `text/css`, and `/nope.css` returns `404`.
- [ ] **Responsive:** no horizontal scrolling at 320px, 375px, 768px and 1280px, and main content is capped and centered at 1280px (the page shouldn't change in this phase).
- [ ] Opening `http://localhost:3000/` in a browser shows the styled page, with no console errors and no failed network requests (confirmed by SK).

## Scope checks

- [ ] The schema has only the `agents` table, with no seed data.
- [ ] `package.json` still has exactly five scripts; only `build` changed, and dependencies are unchanged.
- [ ] `src/index.ts`, `src/app.tsx`, `src/views/` and `public/` are unchanged.
- [ ] `git status` doesn't list `data/` or `dist/`.

## Merge readiness

- [ ] The work is on branch `phase-09-schema`, in commits that touch only `package.json`, `src/db/`, `specs/roadmap.md`, and this spec directory.
- [ ] `specs/roadmap.md` marks Phase 9 as done, with a link to this spec.
