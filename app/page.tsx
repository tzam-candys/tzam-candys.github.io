import Image from 'next/image';
import FlavorCard, { Flavor } from '@/components/FlavorCard';
import LoadingBar from '@/components/LoadingBar';
import TelegramButton from '@/components/TelegramButton';
import { PACK_FLAVORS, PACK_NAME, PACK_PAYMENT_URL, PACK_PRICE } from '@/lib/checkout';
import TerminalOverlay from '@/components/TerminalOverlay';
import data from '@/data/batches.json';

export default function Home() {
  const flavors = data.flavors as Flavor[];
  const batch = data.currentBatch;
  const packFlavors = flavors.filter((f) => PACK_FLAVORS.includes(f.code));

  return (
    <main className="relative min-h-screen pb-24 text-cotton sm:pb-0">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-cotton/10 bg-onyx/80 px-6 py-5 backdrop-blur-md sm:px-12">
        <a href="#inicio" className="flex items-center gap-3" aria-label="TZAM inicio">
          <span className="text-xl font-extrabold tracking-[0.4em]">TZAM</span>
          <span className="mono hidden text-[10px] tracking-widest text-cotton/40 sm:inline">
            DULCES PREMIUM · SLP
          </span>
        </a>
        <nav className="mono flex items-center gap-5 text-[11px] tracking-widest sm:gap-7">
          <a href="#pack" className="hover:text-kinetic">
            PACK
          </a>
          <a href="#sabores" className="hidden hover:text-kinetic sm:inline">
            SABORES
          </a>
          <a href="#envio" className="hidden hover:text-kinetic md:inline">
            ENVÍO
          </a>
          <a href="#faq" className="hidden hover:text-kinetic sm:inline">
            FAQ
          </a>
          <a
            href={PACK_PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-kinetic px-3 py-1.5 text-kinetic hover:bg-kinetic hover:text-onyx"
            aria-label={`Comprar ${PACK_NAME} por Mercado Pago`}
          >
            COMPRAR
          </a>
        </nav>
      </header>

      <section
        id="inicio"
        className="relative flex min-h-[88vh] items-end overflow-hidden border-b border-cotton/10"
      >
        <div className="absolute inset-0">
          <Image
            src="hero.png"
            alt="Frascos TZAM con sabores Citrus, Mint, Cherry y Kinetic"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/75 to-onyx/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-onyx/35" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:px-12 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="space-y-8">
            <div className="mono text-[11px] tracking-widest text-cotton/60">
              HECHOS EN SAN LUIS POTOSÍ · 50ML / 40G POR FRASCO
            </div>
            <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight drop-shadow-2xl sm:text-7xl lg:text-8xl">
              Dulces premium.<br />
              <span className="text-kinetic">Sabor intenso.</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-cotton/80 sm:text-lg">
              TZAM son dulces duros en frasco, creados para probar perfiles claros:
              Citrus, Mint y Cherry. El pack de entrada incluye los tres sabores y envío
              nacional.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={PACK_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mono border border-kinetic bg-kinetic px-5 py-3 text-xs tracking-widest text-onyx transition hover:bg-cotton"
                aria-label={`Comprar ${PACK_NAME} por ${PACK_PRICE} pesos en Mercado Pago`}
              >
                COMPRAR PACK · ${PACK_PRICE} MXN
              </a>
              <a
                href="#sabores"
                className="mono border border-cotton/30 bg-onyx/30 px-5 py-3 text-xs tracking-widest text-cotton/80 backdrop-blur-sm transition hover:border-cotton hover:text-cotton"
              >
                VER SABORES
              </a>
            </div>
          </div>

          <aside className="border border-cotton/15 bg-onyx/70 p-5 backdrop-blur-md lg:ml-auto lg:w-[420px]">
            <div className="mono mb-4 text-[11px] tracking-widest text-cotton/50">
              PACK RECOMENDADO
            </div>
            <div className="flex items-end justify-between gap-4 border-b border-cotton/10 pb-5">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">{PACK_NAME}</h2>
                <p className="mt-2 text-sm leading-relaxed text-cotton/60">
                  Tres frascos para probar la línea disponible.
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-extrabold">${PACK_PRICE}</div>
                <div className="mono text-[10px] tracking-widest text-cotton/40">MXN</div>
              </div>
            </div>
            <dl className="mono text-xs">
              {[
                ['INCLUYE', 'Citrus + Mint + Cherry'],
                ['ENVÍO', 'Nacional incluido'],
                ['CONTENIDO', '3 frascos · 40g c/u'],
                ['PAGO', 'Mercado Pago'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[90px_1fr] gap-3 border-b border-cotton/10 py-3">
                  <dt className="text-cotton/40">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href={PACK_PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mono mt-5 block border border-kinetic px-5 py-3 text-center text-xs tracking-widest text-kinetic transition hover:bg-kinetic hover:text-onyx"
              aria-label="Ir al checkout externo de Mercado Pago"
            >
              IR A PAGO SEGURO
            </a>
          </aside>
        </div>
      </section>

      <section id="pack" className="border-t border-cotton/10 px-6 py-20 sm:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-5">
            <div className="mono text-[11px] tracking-widest text-cotton/50">/pack-de-entrada</div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Una compra simple para probar TZAM.
            </h2>
            <p className="max-w-lg leading-relaxed text-cotton/70">
              El pack junta los tres sabores disponibles en una sola compra. Es la forma
              más fácil de conocer la marca, comparar perfiles y recibir todo en un solo
              envío.
            </p>
            <a
              href={PACK_PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mono inline-block border border-kinetic bg-kinetic px-6 py-3 text-xs tracking-widest text-onyx transition hover:bg-cotton"
              aria-label={`Comprar pack de tres TZAM por ${PACK_PRICE} pesos`}
            >
              COMPRAR PACK DE 3
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {packFlavors.map((f) => (
              <div key={f.id} className="border border-cotton/10 bg-onyx/40 p-5">
                <div className="relative mb-4 h-40">
                  {f.image && (
                    <Image
                      src={f.image}
                      alt={`Frasco TZAM ${f.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="mono text-[10px] tracking-widest text-cotton/40">
                  Nº {f.id} · {f.code}
                </div>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{f.name}</h3>
                <p className="mono mt-3 text-[11px] leading-relaxed text-cotton/60">{f.profile}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sabores" className="border-t border-cotton/10 px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mono mb-2 text-[11px] tracking-widest text-cotton/50">
                /sabores
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                Tres perfiles listos. Uno en desarrollo.
              </h2>
            </div>
            <div className="max-w-sm text-sm leading-relaxed text-cotton/50">
              Cada frasco trae alrededor de 20 piezas. Los precios unitarios sirven como
              referencia; el pack de 3 es la compra recomendada.
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {flavors.map((f) => (
              <FlavorCard key={f.id} f={f} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="envio"
        className="relative overflow-hidden border-t border-cotton/10 px-6 py-20 sm:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-cotton/10 bg-onyx/40">
            <Image
              src="shipping-tube.png"
              alt="Empaque TZAM para envío nacional"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="mono absolute left-3 top-3 text-[10px] tracking-widest text-cotton/60">
              ENVÍO NACIONAL
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <div className="mono mb-2 text-[11px] tracking-widest text-cotton/50">
                /como-comprar
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                Pagas en línea. Recibes el pack.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-cotton/70">
                El checkout se abre en Mercado Pago. Después del pago se prepara el pack
                y se envía a cualquier estado de México.
              </p>
            </div>
            <dl className="mono text-xs">
              {[
                ['1', 'Compra el pack de 3 en Mercado Pago'],
                ['2', 'Confirmamos datos de envío desde el checkout'],
                ['3', 'Recibes Citrus, Mint y Cherry en un solo paquete'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[40px_1fr] gap-4 border-b border-cotton/10 py-4">
                  <dt className="text-kinetic">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href={PACK_PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mono inline-block border border-kinetic px-6 py-3 text-xs tracking-widest text-kinetic transition hover:bg-kinetic hover:text-onyx"
              aria-label="Comprar pack con envío nacional incluido"
            >
              COMPRAR CON ENVÍO INCLUIDO
            </a>
          </div>
        </div>
      </section>

      <section id="lote" className="border-t border-cotton/10 bg-onyx/60 px-6 py-16 sm:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="mono mb-2 text-[11px] tracking-widest text-cotton/50">/lote</div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Hecho en lotes pequeños.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-cotton/70">
              La parte técnica se queda como sello de la marca: control de lote, empaque
              cuidado y trazabilidad sin complicar la compra.
            </p>
          </div>
          <div className="border border-cotton/15 bg-black/40 p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="mono text-[11px] tracking-widest text-cotton/50">{batch.id}</div>
              <div className="mono text-[11px] tracking-widest text-kinetic">EN PRODUCCIÓN</div>
            </div>
            <LoadingBar target={batch.progress} />
            <ul className="mono mt-6 space-y-1.5 text-xs text-cotton/80">
              {batch.logs.map((l) => (
                <li key={l.key} className="flex justify-between gap-4">
                  <span className="text-cotton/60">{l.key.replaceAll('_', ' ')}</span>
                  <span
                    className={
                      l.status === 'OK'
                        ? 'text-kinetic'
                        : l.status === 'EN_PROCESO'
                        ? 'text-yellow-400'
                        : 'text-cotton/40'
                    }
                  >
                    {l.status.replaceAll('_', ' ')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-cotton/10 px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mono mb-2 text-[11px] tracking-widest text-cotton/50">/faq</div>
          <h2 className="mb-10 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Preguntas antes de comprar.
          </h2>
          <div className="divide-y divide-cotton/10 border-y border-cotton/10">
            {[
              [
                '¿Qué es TZAM?',
                'Dulces duros premium en frasco, hechos en San Luis Potosí con perfiles de sabor intensos y definidos.',
              ],
              [
                '¿Qué incluye el pack de 3?',
                'Un frasco de Citrus, uno de Mint y uno de Cherry. Cada frasco contiene 40g, aproximadamente 20 piezas.',
              ],
              [
                '¿El envío está incluido?',
                `Sí. El pack cuesta $${PACK_PRICE} MXN e incluye envío nacional dentro de México.`,
              ],
              [
                '¿Puedo comprar un solo frasco?',
                'Los frascos individuales cuestan $39 MXN como referencia, pero la compra principal en esta versión es el pack de 3.',
              ],
              [
                '¿Qué pasa con Kinetic?',
                'Kinetic está en desarrollo. Contiene cafeína y se mostrará con advertencia antes de habilitar venta.',
              ],
            ].map(([question, answer]) => (
              <div key={question} className="grid gap-3 py-5 sm:grid-cols-[220px_1fr]">
                <h3 className="font-bold">{question}</h3>
                <p className="text-sm leading-relaxed text-cotton/70">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mono flex flex-wrap items-center justify-between gap-4 border-t border-cotton/10 px-6 py-12 text-[11px] text-cotton/50 sm:px-12">
        <div>TZAM · dulces premium hechos en San Luis Potosí · 2026</div>
        <div className="flex gap-5">
          <TelegramButton tipo="INFO_GENERAL" usuario="PIE" className="hover:text-kinetic">
            /soporte-telegram
          </TelegramButton>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-kinetic/30 bg-onyx/95 p-3 backdrop-blur-md sm:hidden">
        <a
          href={PACK_PAYMENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mono block border border-kinetic bg-kinetic px-5 py-3 text-center text-xs tracking-widest text-onyx"
          aria-label={`Comprar ${PACK_NAME} por ${PACK_PRICE} pesos`}
        >
          COMPRAR PACK · ${PACK_PRICE} MXN
        </a>
      </div>

      <TerminalOverlay />
    </main>
  );
}
