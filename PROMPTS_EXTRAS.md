# Prompts Extras · OG Image + Tubo de Envío

Mismo lenguaje dark lab que la línea de frascos. Texto forzado con `spelled exactly`.

---

## OG IMAGE · 1200×630 · meta tags sociales

Ratio crítico para WhatsApp, Telegram, Twitter/X, Discord, LinkedIn.

Naming archivo cuando bajes: `og.png` o `og.jpg` → `~/tzam/public/og.png`.

```
Cinematic editorial commercial product photography, ultra-photorealistic 8K, ultra-wide horizontal banner composition. Four 50ml clear cylindrical PET TZAM bottles arranged in a tight row, slightly offset in depth, all with brushed silver matte aluminum screw caps with ridged texture.

Left to right exactly:

(1) Bottle with matte cotton-white label, "TZAM" wordmark in bold black sans-serif uppercase, monospace text reading exactly "Nº 01 // CITRUS", filled with bright translucent yellow dome candies.

(2) Bottle with matte onyx black label, "TZAM" wordmark in bold white sans-serif uppercase, monospace text reading exactly "Nº 02 // MINT", filled with emerald green dome candies.

(3) Bottle with matte cotton-white label, "TZAM" wordmark in bold black sans-serif uppercase, monospace text reading exactly "Nº 03 // CHERRY", filled with deep carmine red dome candies.

(4) Bottle with matte onyx black label, "TZAM" wordmark in metallic copper hot-stamping foil, thin diagonal neon yellow stripe across label, copper monospace text reading exactly "Nº 04 // KINETIC // CAFFEINE 7mg", filled with glowing acid yellow-green dome candies, faint vapor at the base.

All four bottles stand on a polished dark grey concrete floor in a dark laboratory environment. Four dramatic narrow spot lights from directly above, one per bottle, each light tinted to match the candy color: warm golden-yellow over Nº 01, cool white-green over Nº 02, deep crimson over Nº 03, copper-orange over Nº 04. Soft fog drifting at the base of all bottles. Background completely dark with subtle vertical depth.

Plenty of negative space on the right side of the frame for typography overlay later. Cinematic Aesop x A24 mood, niche perfumery aesthetic, editorial minimalism, zero ornaments. Sharp typography on labels with no spelling errors, no garbled characters. Photographic only.

Aspect ratio 1200:630 (wide horizontal banner).
```

---

## TUBO DE ENVÍO + MAN CARD · sección de envío

Naming sugerido: `shipping-tube.png` → `~/tzam/public/shipping-tube.png`.

Mismo dark lab consistent con los frascos.

```
Cinematic editorial commercial product photography, ultra-photorealistic 8K, horizontal composition. A sturdy industrial kraft cardboard mailing tube, 15cm long and 6cm diameter, with brushed steel end caps that match the bottle caps. The tube lies horizontally on a polished dark grey concrete floor, one steel end cap removed and standing upright beside it.

Inside the open tube, three 50ml clear cylindrical TZAM bottles are visible, nestled in black tissue paper. The closest visible bottle has a matte onyx black label with "TZAM" wordmark in metallic copper hot-stamping foil, a thin diagonal neon yellow stripe, and copper monospace text reading exactly "Nº 04 // KINETIC". Brushed silver aluminum cap visible.

In front of the tube, a folded matte blueprint-grey technical card, partially visible at an angle, printed in clean black monospace text reading exactly across multiple lines:

  manual tzam
  NOMBRE: tzam — sistema de entrega de sabor de alta ingeniería
  SINOPSIS: tzam [Nº] [--kinetic]
  ENTORNO: SLP_MX

A small precisely rendered black QR code is printed in the bottom-right corner of the card, with the label "AUTH_SHA256" beside it in tiny monospace text.

Dramatic single warm side light from the left casting long sharp shadows across the concrete floor, faint smoke drifting near the tube. Dark laboratory atmosphere, deep shadows, copper highlights on the steel caps. Niche perfumery aesthetic, editorial minimalism, zero ornaments. Crisp typography with no spelling errors, no garbled characters.

Aspect ratio 16:9.
```

---

## HERO ALTERNATIVO · 16:9 cinematic landscape

Por si quieres regenerar el hero principal con mismo lenguaje dark lab (ahora mismo usas el bodegón v2 con manos sobre marble).

Naming: `hero-dark.png`.

```
Cinematic editorial commercial product photography, ultra-photorealistic 8K, wide horizontal hero composition. Four 50ml clear cylindrical PET TZAM bottles arranged at slightly varying heights on minimalist tiered pedestals of matte grey concrete, brushed steel, frosted glass and polished black acrylic. All bottles share identical brushed silver matte aluminum screw caps with ridged texture and identical cylinder geometry.

Left to right exactly:
(1) Matte cotton-white label · "TZAM" bold black sans-serif · "Nº 01 // CITRUS" · yellow dome candies.
(2) Matte onyx black label · "TZAM" bold white sans-serif · "Nº 02 // MINT" · emerald green dome candies.
(3) Matte cotton-white label · "TZAM" bold black sans-serif · "Nº 03 // CHERRY" · deep red dome candies.
(4) Matte onyx black label · "TZAM" in metallic copper hot-stamping · thin diagonal neon yellow stripe · copper monospace "Nº 04 // KINETIC // CAFFEINE 7mg" · glowing acid yellow-green dome candies.

Dark laboratory environment. Four narrow spotlights from above tinting each bottle in its candy color (warm golden, cool white-green, deep crimson, copper-orange). Soft fog drifting along the pedestals at the base. Floor in polished dark grey concrete reflecting subtle color glows. Background completely dark with vertical depth.

Cinematic Aesop x A24 mood, niche perfumery aesthetic, editorial minimalism, zero ornaments, zero candy-commercial clichés. Crisp typography with no spelling errors on any label, no garbled characters.

Aspect ratio 16:9.
```

---

## Cómo integrar al landing

Cuando bajes los archivos:

```bash
cp <ruta-imagen-og>     ~/tzam/public/og.png
cp <ruta-tubo>          ~/tzam/public/shipping-tube.png
cp <ruta-hero-dark>     ~/tzam/public/hero.png   # reemplaza si quieres dark consistent
```

Para OG meta tags, editar `app/layout.tsx`:

```ts
openGraph: {
  title: 'TZAM',
  description: '...',
  type: 'website',
  images: [{ url: '/og.png', width: 1200, height: 630 }],
},
twitter: {
  card: 'summary_large_image',
  images: ['/og.png'],
},
```

Para tubo en sección de envío: avísame y agrego una nueva `<section>` con la imagen + specs del empaque.
