# Plan — Phase 8: open the SQLite database on startup

See `requirements.md` for scope and decisions, and `validation.md` for the definition of done.

## 1. Install dependencies

1. `npm install better-sqlite3`
2. `npm install -D @types/better-sqlite3`
3. Confirm that the install used a prebuilt binary (no compiler output), and that `node -e "require('better-sqlite3')"` works.

## 2. Create the database module

1. Create `src/db/index.ts`.
2. Export `DEFAULT_DATABASE_PATH = 'data/agentclinic.db'`.
3. Export `openDatabase(path: string)`, which:
   - creates the parent directory with `fs.mkdirSync(dirname(path), { recursive: true })`, unless `path` is `:memory:`;
   - opens the database with `new Database(path)`;
   - runs `db.pragma('foreign_keys = ON')`;
   - returns the connection.

## 3. Open the database on startup

1. In `src/index.ts`, import `openDatabase` and `DEFAULT_DATABASE_PATH` from `./db/index.js`.
2. Before `serve()`, call `openDatabase(process.env.DATABASE_PATH ?? DEFAULT_DATABASE_PATH)` and keep the connection in a `db` constant.
3. Leave `src/app.tsx` unchanged.

## 4. Git-ignore the database

1. Add `/data` to `.gitignore`.
2. Start the server once, and confirm that `data/agentclinic.db` exists and `git status` doesn't list `data/`.

## 5. Add unit tests

1. Create `src/db/index.test.ts`, with tests that:
   - open a `:memory:` database and run `select 1`;
   - check that `pragma foreign_keys` returns `1`;
   - open a file database in a new temporary directory with a missing subfolder, and check that the subfolder and file are created (then clean up the temp directory).
2. Run `npm test`, and confirm that the tests never create `data/` in the project.

## 6. Check the build

1. Run `npm run build`, and confirm that `dist/db/index.js` exists and `dist/db/index.test.js` doesn't.
2. Run `npm start` from the project root, and confirm that the server starts and opens the database.

## 7. Verify

1. Run every check in `validation.md`.
2. Fix any failures before moving on.

## 8. Commit and merge prep

1. Make sure `git status` shows only the intended files: `package.json`, `package-lock.json`, `.gitignore`, `src/index.ts`, `src/db/`, `specs/roadmap.md`, and this spec directory.
2. Mark Phase 8 as done in `specs/roadmap.md`, with a link to this spec.
3. Commit on `phase-08-sqlite`, then open a PR or merge once validation passes.
