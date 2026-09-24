# Requirements — Phase 2: `npm run dev` and a working `npm run build`

## Context

This is roadmap Phase 2 (Foundation). Phase 1 left the app runnable only with `npx tsx src/index.ts`, and with just a `test` script. This phase adds the everyday scripts: a watch-mode dev server for live demos, and a real build that produces runnable JavaScript in `dist/`. See `specs/mission.md`, principle 5 (*Small steps*), and the Tooling section of `specs/tech-stack.md` (tsx for development, tsc for builds).

There's no visible UI change in this phase. The page from Phase 1 must look and behave exactly the same, including the responsive rules in `specs/tech-stack.md`, whether it's served by `npm run dev` or `npm start`.

## Scope

In scope:

- `tsx` as a dev dependency.
- Four new `package.json` scripts, alongside the existing `test`:
  - `dev`: `tsx watch src/index.ts`
  - `build`: clean `dist/`, then `tsc -p tsconfig.build.json`
  - `start`: `node dist/index.js`
  - `typecheck`: `tsc --noEmit`
- `tsconfig.build.json`, a build-only config that excludes test files.
- Git-ignoring `dist/`.

Out of scope:

- Bundling or minifying (not needed: the server runs plain `tsc` output).
- Copying `public/` into `dist/`. The server keeps serving `./public` from the project root.
- Watching CSS for reloads. `public/styles.css` is read from disk on each request, so a browser refresh already shows CSS changes.
- Header nav links (the rest of Phase 6), and any other UI change.
- A production process manager, Docker, or deployment.

## Decisions

1. **Dev server.** `npm run dev` runs `tsx watch src/index.ts`. tsx restarts the server when any imported file in `src/` changes. It honors `PORT` like `npx tsx src/index.ts` does.
2. **Build config.** `tsconfig.build.json` extends `./tsconfig.json`, sets `rootDir: "src"` (so the output is `dist/index.js`, not `dist/src/index.js`), and excludes `src/**/*.test.ts` and `src/**/*.test.tsx`. The main `tsconfig.json` is unchanged, so editors and `npm run typecheck` still cover the tests.
3. **Clean builds.** `build` deletes `dist/` before compiling, so renamed or deleted source files (like the old `app.ts`) never leave stale output behind. The delete uses Node (`fs.rmSync` with `recursive` and `force`) rather than `rm -rf`, so it works on any OS.
4. **Build output.** `tsc` emits ES2022 ESM JavaScript. JSX compiles to `hono/jsx/jsx-runtime` imports, so `dist/` runs on plain Node with only the runtime `dependencies` installed.
5. **Start.** `npm start` runs `node dist/index.js`. Like the dev server, it must be run from the project root so that `./public` resolves (see Phase 1, decision 10). It honors `PORT`, defaulting to `3000`.
6. **Typecheck.** `npm run typecheck` runs `tsc --noEmit` with the main config, covering app and test files. It never writes to `dist/`.
7. **Git hygiene.** `/dist` is added to `.gitignore`, so build output is never committed.
8. **Dependencies.** `tsx` is the only new dev dependency. Runtime `dependencies` stay `hono` and `@hono/node-server`.
