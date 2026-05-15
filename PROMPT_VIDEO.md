# Prompts de Video · TZAM v1.0

Optimizados para **Veo 3** (Gemini), **Sora 2**, **Kling 2.5**, **Runway Gen-3/4**.
Estilo: **Leak Series** — Spy-Cam B/N granulado + Macro alta velocidad.
Sin música, audio ASMR industrial nativo del modelo.

---

## 1. PROMPT ÚNICO MAESTRO (Hero Reel · 12s)

Un solo clip que mezcla spy-cam + macro + brand drop. Ideal para landing y feed pinned.

```
12-second cinematic product reveal video, ultra-photorealistic 8K, two cuts:

(00:00–00:05) SPY-CAM SHOT: black-and-white grainy surveillance footage with timestamp overlay "REC ● 2026-05-15 03:42:18 SLP_MX" and faint CCTV scanlines. Overhead static angle of a stainless steel laboratory table. A pair of black-gloved hands slowly opens a matte black tactical case revealing four 50ml clear cylindrical PET bottles with brushed silver aluminum caps nestled in foam inserts. The center bottle has a black label with the word "TZAM" in metallic copper hot-stamping and a thin diagonal neon yellow stripe — it glows faintly with acid yellow-green translucent candies inside. Subtle camera vibration. Industrial ambient hum, distant metal clinks, brief radio interference.

(00:05–00:08) HARD CUT to MACRO SLOW-MOTION at 240fps: extreme close-up of a single TZAM dome candy falling onto a black acrylic surface and bouncing once. Hard rim light catches the translucent yellow refraction. Sharp "clink" sound on impact, deep sub-bass woosh trailing. Background completely black.

(00:08–00:12) BRAND END CARD: clean cut to black. White monospace text types itself line by line in center frame:
> TZAM
> Nº 04 // KINETIC
> COMING SOON · SLP_MX

Final frame holds with the typing cursor blinking. Industrial silence with faint laboratory hum.

Style: Aesop x A24 x Christopher Nolan industrial aesthetic. Niche perfumery meets surveillance leak. Zero music, zero voiceover, only diegetic ASMR sound: gloves, metal cap rotation, candy clink, sub-bass. Sharp focus, no motion blur except in the macro impact. Aspect ratio 9:16 (vertical for Instagram/TikTok). 24fps base, 240fps slow-mo segment.
```

---

## 2. SPY-CAM (5s · Surveillance Leak)

Para teaser, story, transición.

```
5-second surveillance camera footage, black and white with heavy film grain and CRT scanlines, "REC ●" timestamp overlay flickering in top-right corner reading "SLP_MX // 2026-05-15 03:42:18". Static overhead wide angle on a brushed steel laboratory bench. A pair of black-gloved hands carefully places four 50ml clear cylindrical TZAM candy bottles into a matte black foam-lined tactical case. Subtle camera shake and occasional digital glitch frames. Diegetic audio only: the soft thunk of bottles against foam, faint industrial hum, distant radio static. No music. No voiceover. Aspect 9:16.
```

## 3. MACRO HIGH-SPEED (4s · The Structure)

Para feed, ads.

```
4-second ultra-high-speed macro photography video at 480fps, extreme close-up of a single bright yellow translucent half-sphere TZAM candy falling against a glossy black acrylic surface, bouncing once, light refracting through the dome catching hard rim studio light. Tiny sugar crystals visible on the polished surface. The bottom of a clear bottle with a minimalist white "TZAM" label drifts softly out of focus in background. Audio: deep sub-bass woosh during the fall, sharp crystalline "clink" on impact, no music. Hyper-realistic 8K, shallow depth of field, advertising commercial style. Aspect 4:5.
```

## 4. BOTTLE 360° (6s · Product Showcase)

Para página de producto, landing hero.

```
6-second slow rotating product video, single 50ml clear cylindrical PET TZAM bottle floating in the center of frame, rotating 360 degrees on its vertical axis. Bottle has matte onyx black label with "TZAM" wordmark in metallic copper hot-stamping foil and a thin diagonal neon yellow stripe across the label. Below, copper monospace text reads "Nº 04 // KINETIC // CAFFEINE 7mg". Brushed silver aluminum cap with ridged texture catches dramatic spot light from above. Bottle is filled with intensely glowing acid yellow-green translucent dome candies. Pure black background, single hard top light, faint vapor or smoke trailing at the base. Audio: deep ambient laboratory hum, subtle metallic resonance as cap catches light. Cinematic, 8K, ultra-photorealistic. Aspect 9:16.
```

## 5. EXHIBIDOR DROP (8s · B2B Reveal)

Para anuncio de "Punto de Control" en SLP.

```
8-second cinematic shot: hand-held camera approaches a polished marble café counter in soft warm afternoon light. On the counter sits a matte black acrylic stepped display stand with three tiers holding fifteen TZAM bottles in alternating black and white labels. Camera dollies in slowly, depth of field shifting from the blurred coffee machine in background to sharp focus on the TZAM logo subtly engraved on the top crown of the display. Final 2 seconds: camera pulls back slightly, a hand reaches in and lifts one Nº 04 KINETIC bottle from the top tier, condensation visible on the silver cap. Audio: ambient café murmur, distant espresso machine, subtle clink of the bottle being lifted. No music. Aspect 9:16.
```

## 6. TERMINAL LOADING (10s · Landing Page Background)

Loop sutil para background del coming-soon en la landing.

```
10-second seamless loop, dark terminal interface filling the screen. Black background with subtle CRT scanlines. Green-phosphor monospace text types itself line by line in the center:
> RUN TZAM_SYSTEM_INITIALIZATION
> [STATUS: BATCH_00_PROCESSING]
> [ PROGRESS: ████████████░░░░░░░░ 62% ]
> CAFFEINE_MATRIX_STABILIZED... [OK]
> ACID_KICK_CALIBRATION... [IN_PROGRESS]
The progress bar slowly advances by 1% over the duration. Subtle text glitches and cursor blinks. Audio: low-frequency laboratory hum, occasional mechanical relay click, soft keyboard tap on each typed character. No music. Aspect 16:9 for web, loop seamlessly.
```

---

## Tips por modelo

- **Veo 3 / Veo 3.1**: respeta los tiempos exactos (00:00–00:05). Acepta diegetic audio natural. Acepta texto en frame si lo describes en comillas.
- **Sora 2**: prefiere oraciones cortas. Divide los cortes en párrafos separados.
- **Kling 2.5**: brillante para macro slow-mo. Pídele explícitamente `240fps` o `480fps`.
- **Runway Gen-4**: bueno para spy-cam y grain. Sube referencia visual de CCTV para `style ref`.

## Specs técnicos comunes

- Aspect ratio: **9:16** para Reels/TikTok/Stories · **16:9** para landing/YouTube · **4:5** para feed IG
- Sin música: el audio ASMR diegético es la firma sonora de TZAM
- Sin voiceover ni copy hablado: todo es texto en pantalla
- Duración máxima por clip: 12s (los modelos actuales lo soportan)

## Sonidos clave (para post-producción si el modelo no los genera)

| Sonido | Cuándo | Buscar en (Splice/Soundsnap) |
|--------|--------|-------------------------------|
| Clink cristalino | Impacto del dulce | `glass clink high pitched` |
| Zic metálico | Tapa girando | `aluminum cap twist off` |
| Rattle frasco | Agitar producto | `pill bottle shake close mic` |
| Sub-bass woosh | Transiciones | `cinematic sub bass impact` |
| Hum industrial | Background | `laboratory ambient drone` |
