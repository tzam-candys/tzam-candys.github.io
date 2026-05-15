# TZAM // Landing

Confitería técnica · San Luis Potosí, México.
Next.js 15 (App Router) + static export + GitHub Pages.

## Dev local

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build estático

```bash
npm run build        # genera out/
```

`out/` es deployable a cualquier host estático (GH Pages, Netlify, Cloudflare Pages, S3, etc).

## Deploy a GitHub Pages (automático)

1. Crea repo en GitHub (puede llamarse `tzam` o `<usuario>.github.io`).
2. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push a `main`:

```bash
git init
git add .
git commit -m "init: tzam landing v1"
git branch -M main
git remote add origin git@github.com:<usuario>/<repo>.git
git push -u origin main
```

El workflow `.github/workflows/deploy.yml` detecta automáticamente si el repo es:
- `usuario.github.io` → publica en root (sin basePath)
- `cualquier-otro` → publica en `/cualquier-otro` (con basePath)

## Dominio custom (opcional)

Crea `public/CNAME` con tu dominio:

```bash
echo "tzam.mx" > public/CNAME
```

Y configura DNS apuntando a GitHub Pages.

## Estructura

```
app/
  layout.tsx         metadata global
  page.tsx           landing principal
  globals.css        tailwind + grid background + scanline
  verify/[hash]/     página oculta de autenticación de lote (QR)
components/
  Bottle.tsx         mockup SVG vectorial del frasco
  FlavorCard.tsx     card de sabor con specs
  LoadingBar.tsx     barra de carga animada "BATCH_00 processing"
  TerminalOverlay.tsx easter egg CLI (Ctrl+`)
data/
  batches.json       sabores + estado del batch (single source of truth)
lib/
  whatsapp.ts        builder de link WhatsApp con mensaje pre-formateado
.github/workflows/
  deploy.yml         CI/CD a GitHub Pages
```

## Configurar WhatsApp

Edita `lib/whatsapp.ts`:

```ts
export const WHATSAPP_NUMBER = '5214441234567'; // tu número con código país
```

## Mockups del frasco

`<Bottle />` es SVG inline — escala perfecto, cero peso, se puede exportar a PNG/JPG con cualquier herramienta. Para fotos reales, usa los prompts AI en `PROMPTS.md`.

## Branding

- Onyx `#0a0a0a` · Cotton `#f5f3ee` · Cobre `#b87333` · Kinetic Yellow `#e8ff00`
- Tipografía: Inter (logo/UI), JetBrains Mono (specs/CLI)
- Línea standard: $39 MXN · Línea Kinetic (cafeína): $42 MXN
