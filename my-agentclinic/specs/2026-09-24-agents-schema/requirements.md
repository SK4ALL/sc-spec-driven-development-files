# Requirements — Phase 9: apply a SQL schema file on startup

## Context

This is roadmap Phase 9 (Database). Phase 8 opens `data/agentclinic.db` on startup, but the database is empty: no tables, 0 bytes. This phase adds a SQL schema file that's applied every time a connection is opened, starting with an empty `agents` table. Phase 10 then uses an in-memory database in tests, Phase 11 shows a hard-coded agents list, and Phase 12 loads that list from this table.

`specs/tech-stack.md` sets the conventions: the schema is defined in SQL and applied on startup, database code lives in `src/db/`, and a fresh checkout needs zero setup. Small steps follow `specs/mission.md`, principle 5.

There's no visible UI change in this phase. The page must look and behave exactly as in Phase 8, including the responsive rules in `specs/tech-stack.md`.

## Scope

In scope:

- `src/db/schema.sql`: the schema, with one `agents` table.
- `openDatabase()` in `src/db/index.ts`: read the schema file and apply it on every connection.
- The `build` script: copy `src/db/schema.sql` to `dist/db/schema.sql`.
- Unit tests in `src/db/index.test.ts` for the schema.

Out of scope:

- Seed data (Phase 13) and any other tables (ailments, therapies, appointments, and link tables come in Phases 16–26).
- Using the database in the app or its tests (Phases 10 and 12).
- A migrations system or schema versioning. `create table if not exists` is enough while the app is this small.
- Any UI change.

## Decisions

1. **Schema file.** `src/db/schema.sql` holds plain SQL, next to the database code that loads it (following the `src/db/` layout in `specs/tech-stack.md`).
2. **`agents` table:**

   ```sql
   create table if not exists agents (
     id integer primary key,
     name text not null,
     model text,
     bio text,
     created_at text not null default (datetime('now'))
   );
   ```

   - `id`: SQLite's integer row id, auto-assigned.
   - `name`: required, e.g. "Claudette".
   - `model`: optional, the kind of model the agent runs on (e.g. "GPT-ish").
   - `bio`: optional, a short playful description for the detail page.
   - `created_at`: filled in automatically with a UTC `YYYY-MM-DD HH:MM:SS` timestamp.
3. **Safe to re-run.** Every statement uses `if not exists`, so applying the schema on every startup never fails and never drops or changes existing data.
4. **Applied inside `openDatabase()`.** After turning on foreign keys, `openDatabase()` reads the schema and runs it with `db.exec()`. Every connection gets the schema, including `:memory:` databases in tests and in Phase 10. `src/index.ts` doesn't change.
5. **Finding the file.** The schema is loaded relative to the module itself: `readFileSync(new URL('./schema.sql', import.meta.url), 'utf8')`. That resolves to `src/db/schema.sql` under tsx and Vitest, and to `dist/db/schema.sql` under `npm start`, whatever the working directory.
6. **Build copy.** `tsc` doesn't copy `.sql` files, so the `build` script copies `src/db/schema.sql` to `dist/db/schema.sql` after compiling, using Node's `fs.cpSync` (cross-platform, like the existing clean step). There are still exactly five scripts; only `build` changes.
7. **Fail fast.** If the schema file is missing or has invalid SQL, `openDatabase()` throws and the server doesn't start, as in Phase 8, decision 7.
8. **Existing databases.** A `data/agentclinic.db` left over from Phase 8 (empty) gets the `agents` table on the next start; there's nothing to migrate.
