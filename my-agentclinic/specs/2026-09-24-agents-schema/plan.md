# Plan — Phase 9: apply a SQL schema file on startup

See `requirements.md` for scope and decisions, and `validation.md` for the definition of done.

## 1. Write the schema file

1. Create `src/db/schema.sql` with the `agents` table from `requirements.md` (decision 2), using `create table if not exists`.
2. Check it on its own: `sqlite3 :memory: < src/db/schema.sql` (or with better-sqlite3) runs with no errors.

## 2. Apply the schema in openDatabase()

1. In `src/db/index.ts`, read the schema with `readFileSync(new URL('./schema.sql', import.meta.url), 'utf8')`.
2. After `db.pragma('foreign_keys = ON')`, run `db.exec(schema)`.
3. Leave `src/index.ts` and `src/app.tsx` unchanged.

## 3. Copy the schema on build

1. Extend the `build` script: after `tsc -p tsconfig.build.json`, copy `src/db/schema.sql` to `dist/db/schema.sql` with `fs.cpSync`.
2. Run `npm run build`, and confirm that `dist/db/schema.sql` exists and matches the source.

## 4. Add unit tests

1. In `src/db/index.test.ts`, add tests that:
   - check that `agents` exists with the columns `id`, `name`, `model`, `bio`, `created_at` (via `pragma table_info(agents)`);
   - check that `agents` starts empty;
   - check that `name` is required, and that `id` and `created_at` are filled in automatically;
   - open the same file database twice and check that a row inserted the first time is still there (the schema is safe to re-run).
2. Run `npm test`.

## 5. Check startup

1. Run `npm run dev`, then inspect `data/agentclinic.db` and confirm that the `agents` table exists and is empty.
2. Run `npm run build && npm start` from the project root, and confirm the same.
3. Run `npm start` from a different working directory (with `DATABASE_PATH` set), and confirm that the schema is still found.

## 6. Verify

1. Run every check in `validation.md`.
2. Fix any failures before moving on.

## 7. Commit and merge prep

1. Make sure `git status` shows only the intended files: `package.json`, `src/db/`, `specs/roadmap.md`, and this spec directory.
2. Mark Phase 9 as done in `specs/roadmap.md`, with a link to this spec.
3. Commit on `phase-09-schema`, then open a PR or merge once validation passes.
