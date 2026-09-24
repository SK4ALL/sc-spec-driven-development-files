# Requirements — Phase 8: open the SQLite database on startup

## Context

This is roadmap Phase 8, the first step of the Database section. The app has no data yet; this phase only proves that a SQLite database can be opened when the server starts. The schema is Phase 9, the in-memory test database is Phase 10, and reading agents from the database starts in Phase 12. Keeping this phase this small follows `specs/mission.md`, principle 5 (*Small steps*).

`specs/tech-stack.md` sets the stack and conventions: SQLite through better-sqlite3, a database file at `data/agentclinic.db` that's git-ignored, and zero setup for a fresh checkout.

There's no visible UI change in this phase. The page must look and behave exactly as in Phase 2, including the responsive rules in `specs/tech-stack.md`.

## Scope

In scope:

- Runtime dependency: `better-sqlite3`.
- Dev dependency: `@types/better-sqlite3`.
- `src/db/index.ts`: an `openDatabase(path)` function, and a `DEFAULT_DATABASE_PATH` constant (`data/agentclinic.db`).
- `src/index.ts`: open the database on startup, before the server starts listening.
- A `DATABASE_PATH` environment variable to override the path.
- `foreign_keys = ON` on every connection.
- Git-ignoring `data/`.
- `src/db/index.test.ts`: unit tests for `openDatabase`.

Out of scope:

- The schema and any tables (Phase 9).
- Using the in-memory database in the app's tests, or passing the database into `app` (Phases 10 and 12).
- WAL journal mode. SQLite's default rollback journal is enough for now.
- Closing the database on SIGINT/SIGTERM. The process exits and SQLite releases the file; there's no WAL to checkpoint.
- A startup log line for the database. The existing `AgentClinic is open at …` line stays the only log.
- Migrations, seed data, and backups.
- Any UI change.

## Decisions

1. **Library.** `better-sqlite3`, as chosen in `specs/tech-stack.md`. It's synchronous and needs no database server. Node 22's built-in `node:sqlite` is still experimental, so it isn't used.
2. **Database module.** `src/db/index.ts` exports:
   - `DEFAULT_DATABASE_PATH = 'data/agentclinic.db'`.
   - `openDatabase(path: string): Database`, which opens (or creates) the database at `path`, turns on foreign keys, and returns the connection.
3. **Where it's opened.** `src/index.ts` calls `openDatabase(process.env.DATABASE_PATH ?? DEFAULT_DATABASE_PATH)` before `serve()`. `src/app.tsx` doesn't import the database, so importing `app` in tests never creates a file (following Phase 1, decision 3). The connection is kept in `src/index.ts`, ready to be passed to the app in a later phase.
4. **Path override.** `DATABASE_PATH` overrides the default path, just as `PORT` overrides the port. Relative paths resolve from the working directory, so the server is started from the project root (as with `./public`).
5. **Zero setup.** If the database's parent directory doesn't exist, `openDatabase` creates it with `fs.mkdirSync(dirname(path), { recursive: true })`. A fresh checkout then works with no manual steps. `:memory:` skips this step.
6. **Foreign keys.** `openDatabase` runs `pragma foreign_keys = ON` on every connection (SQLite leaves it off by default, per connection), ready for the link tables in Phases 19 and 24.
7. **Fail fast.** If the database can't be opened (e.g. a path that can't be written to), startup throws and the server doesn't start. Errors aren't swallowed.
8. **Build.** better-sqlite3 is CommonJS; `import Database from 'better-sqlite3'` works under NodeNext ESM, both with tsx and from `dist/`. It installs a prebuilt native binary for the current Node version, so no compiler is needed.
9. **Git hygiene.** `/data` is added to `.gitignore`, which also covers SQLite's side files (such as `-journal`).
