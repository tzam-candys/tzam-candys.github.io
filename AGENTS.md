# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router landing site configured for static export. Core routes and global styling live in `app/`: `app/page.tsx` is the main landing page, `app/layout.tsx` defines metadata, `app/globals.css` contains Tailwind imports and global visual effects, and `app/verify/[hash]/page.tsx` handles the hidden batch verification route.

Reusable UI belongs in `components/`, using PascalCase filenames such as `FlavorCard.tsx` and `TelegramButton.tsx`. Shared data lives in `data/batches.json`, helper logic in `lib/telegram.ts`, and static images/icons in `public/`. Deployment configuration is in `.github/workflows/deploy.yml`.

## Build, Test, and Development Commands

- `npm install` or `npm ci`: install dependencies; prefer `npm ci` in CI.
- `npm run dev`: start the local Next development server at `http://localhost:3000`.
- `npm run build`: build the static export into `out/`.
- `npm run lint`: run the configured Next lint command.

The app uses `output: 'export'` in `next.config.mjs`; deploy the generated `out/` directory to static hosting. The GitHub Pages workflow sets `NEXT_PUBLIC_BASE_PATH` automatically for project pages.

## Coding Style & Naming Conventions

Use TypeScript with `strict` mode and the `@/*` path alias. Follow the existing two-space indentation and single-quote style. React components should be PascalCase, functions and variables camelCase, and JSON fields stable because `data/batches.json` is used directly by UI components.

Prefer Tailwind utility classes and theme tokens from `tailwind.config.ts` (`onyx`, `cotton`, `copper`, `kinetic`) before introducing new colors. Add `'use client'` only for components that need state, events, `localStorage`, or browser-only APIs.

## Testing Guidelines

No dedicated test framework is currently configured. Before opening a PR, run `npm run build` and `npm run lint` to catch TypeScript, routing, and static export issues. When adding tests later, use clear colocated names such as `ComponentName.test.tsx` or route-focused tests under a `__tests__/` directory.

## Commit & Pull Request Guidelines

The current history uses concise conventional-style commits, for example `feat: TZAM landing v1.0`. Continue using prefixes such as `feat:`, `fix:`, `docs:`, and `chore:` with an imperative summary.

Pull requests should include a short description, verification commands run, linked issue if applicable, and screenshots or recordings for visual changes. Note any updates to `data/batches.json`, public assets, or deployment/base-path behavior explicitly.

## Security & Configuration Tips

Do not commit secrets or private contact tokens. Public contact configuration belongs in `lib/telegram.ts`; environment-dependent routing should stay in `next.config.mjs` and the GitHub Pages workflow.
