# Plan — Phase 2: `npm run dev` and a working `npm run build`

See `requirements.md` for scope and decisions, and `validation.md` for the definition of done.

## 1. Install tsx

1. `npm install -D tsx`
2. Confirm that `tsx` appears only under `devDependencies`.

## 2. Add the dev script

1. Add `"dev": "tsx watch src/index.ts"` to `package.json` scripts.
2. Run `npm run dev`, confirm the startup log, and stop it.

## 3. Add the build config

1. Create `tsconfig.build.json`:
   - `"extends": "./tsconfig.json"`
   - `"compilerOptions": { "rootDir": "src" }`
   - `"exclude": ["src/**/*.test.ts", "src/**/*.test.tsx"]`
2. Leave `tsconfig.json` unchanged.

## 4. Add the build script

1. Add `"build"`, which first deletes `dist/` with Node (`fs.rmSync('dist', { recursive: true, force: true })`) and then runs `tsc -p tsconfig.build.json`.
2. Run `npm run build`, and confirm that `dist/` has `index.js`, `app.js` and `views/*.js`, with no test files.

## 5. Add the start script

1. Add `"start": "node dist/index.js"`.
2. Run `npm run build && npm start` from the project root, and confirm that the page and `/styles.css` are served.

## 6. Add the typecheck script

1. Add `"typecheck": "tsc --noEmit"`.
2. Run it, and confirm that it passes and doesn't create `dist/`.

## 7. Git-ignore build output

1. Add `/dist` to `.gitignore`.
2. Run `npm run build`, and confirm that `git status` doesn't show `dist/`.

## 8. Verify

1. Run every check in `validation.md`, including the watch-mode reload and the responsive checks.
2. Fix any failures before moving on.

## 9. Commit and merge prep

1. Make sure `git status` shows only the intended files: `package.json`, `package-lock.json`, `tsconfig.build.json`, `.gitignore`, and this spec directory.
2. Mark Phase 2 as done in `specs/roadmap.md`, with a link to this spec.
3. Commit on `phase-02-dev-and-build`, then open a PR or merge once validation passes.
