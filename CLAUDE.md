# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TZAM is a single-page landing site for an artisan candy brand (Confitería técnica, San Luis Potosí, México). Next.js 16 App Router + React 19 + Tailwind, configured for **static export** and deployed to GitHub Pages.

## Commands

```bash
npm install              # install deps (use `npm ci` in CI)
npm run dev              # dev server at http://localhost:3000
npm run build            # static export -> out/
npm run lint             # next lint
```

No test framework is configured. Pre-PR verification = `npm run build` + `npm run lint`.

## Architecture

### Static export model

`next.config.mjs` sets `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`. There is no Node server in production — every route must be statically generatable. Dynamic routes (`app/verify/[hash]/`) need `generateStaticParams` or they will fail at build. `next/image` works but only with `unoptimized: true`.

### basePath / assetPrefix

In production, both are driven by the `NEXT_PUBLIC_BASE_PATH` env var. The GitHub Pages workflow (`.github/workflows/deploy.yml`) resolves it automatically:
- repo named `<owner>.github.io` → empty base (root)
- any other repo → `/<repo-name>`

In dev, basePath stays empty regardless. When adding internal links or asset references, do not hardcode `/something` — rely on Next's routing and `next/image` so the base path is applied.

### Data flow

`data/batches.json` is the single source of truth for flavor catalog (`flavors[]`) and current production batch state (`currentBatch` — used by `LoadingBar`). Field names there are consumed directly by `FlavorCard`, `FlavorModal`, and `app/page.tsx`; keep keys stable when editing.

### Integrations (no backend)

- **Mercado Pago**: `lib/checkout.ts` exports `PACK_PAYMENT_URL` (defaulting to the live `mpago.la` short link, overridable via `NEXT_PUBLIC_PACK_PAYMENT_URL` GitHub Actions variable). All "COMPRAR" CTAs link out to that URL — there is no checkout API call from the site.
- **Telegram**: `lib/telegram.ts` exposes `TELEGRAM_USERNAME`, `telegramUrl()`, and `composeSysMsg(tipo, usuario, idLote, origen)` which produces the formatted `MSG_SIS: …` string used in pre-filled Telegram contact links. `TelegramButton` is the UI surface.

### Components

Reusable UI in `components/` (PascalCase). Server components by default; add `'use client'` only when a component uses state, events, browser APIs, or `localStorage`. `TerminalOverlay` is a hidden CLI easter egg toggled with `` Ctrl+` ``.

### Styling

Tailwind tokens are extended in `tailwind.config.ts`: `onyx` (`#0a0a0a`), `cotton` (`#f5f3ee`), `copper` (`#b87333`), `kinetic` (`#e8ff00`), `lab.*`. Custom animations: `scan`, `flicker`, `pulse_slow`. Fonts: Inter (sans), JetBrains Mono (mono), Geist (display). Prefer these tokens over ad-hoc colors.

## Conventions

- TypeScript strict, two-space indent, single quotes, `@/*` path alias.
- Commit prefixes: `feat:`, `fix:`, `docs:`, `chore:` (Conventional Commits, imperative summary).
- Do not commit secrets. Payment/contact endpoints belong in env vars or `lib/*.ts`.
- Routing or basePath changes must remain consistent across `next.config.mjs` and the Pages workflow.

## AI image/video prompts

`PROMPTS.md`, `PROMPTS_INDIVIDUALES.md`, `PROMPTS_EXTRAS.md`, `PROMPT_VIDEO.md`, `PROMPT_NANO_BANANA.md` contain prompt templates used to generate hero/flavor assets in `public/`. Treat them as content assets, not code.
