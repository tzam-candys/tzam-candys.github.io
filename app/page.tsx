import Image from 'next/image';
import FlavorCard, { Flavor } from '@/components/FlavorCard';
import LoadingBar from '@/components/LoadingBar';
import TelegramButton from '@/components/TelegramButton';
import XmrButton from '@/components/XmrButton';
import {
  PACK_FLAVORS,
  PACK_NAME,
  PACK_PAYMENT_URL,
  PACK_PRICE,
  MP_ENABLED,
  XMR_ENABLED,
  XMR_FINGERPRINT,
  XMR_BATCH_LABEL,
  XMR_BATCH_OPENED_AT,
  CONTACT_EMAIL,
  mailtoUrl,
  TELEGRAM_CHANNEL,
  TELEGRAM_CHANNEL_URL,
  PGP_FINGERPRINT,
  PGP_PUBKEY_URL,
} from '@/lib/checkout';
import TerminalOverlay from '@/components/TerminalOverlay';
import data from '@/data/batches.json';

export default function Home() {
  const flavors = data.flavors as Flavor[];
  const batch = data.currentBatch;
  const packFlavors = flavors.filter((f) => PACK_FLAVORS.includes(f.code));
  const HAS_PURCHASE = MP_ENABLED || XMR_ENABLED;
  const emailHref = mailtoUrl(
    'TZAM · consulta de pack',
    'Hola, me interesa el pack TZAM. ¿Cómo puedo coordinarlo?',
  );

  return (
    <main className="relative min-h-screen pb-[calc(env(safe-area-inset-bottom)+8rem)] text-cotton sm:pb-0">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-cotton/10 bg-onyx/80 px-4 py-3 backdrop-blur-md sm:px-12 sm:py-5">
        <a href="#inicio" className="flex min-h-[44px] items-center gap-3" aria-label="TZAM inicio">
          <span className="text-xl font-extrabold tracking-[0.4em] sm:text-xl">TZAM</span>
          <span className="mono hidden text-[10px] tracking-widest text-cotton/40 sm:inline">
            DULCES PREMIUM · SLP
          </span>
        </a>
        <nav className="mono flex items-center gap-2 text-[11px] tracking-widest sm:gap-7">
          <a href="#pack" className="hidden min-h-[44px] items-center hover:text-kinetic active:text-kinetic sm:inline-flex">
            PACK
          </a>
          <a href="#sabores" className="hidden min-h-[44px] items-center hover:text-kinetic active:text-kinetic sm:inline-flex">
            SABORES
          </a>
          <a href="#envio" className="hidden min-h-[44px] items-center hover:text-kinetic active:text-kinetic md:inline-flex">
            ENVÍO
          </a>
          <a href="#faq" className="hidden min-h-[44px] items-center hover:text-kinetic active:text-kinetic sm:inline-flex">
            FAQ
          </a>
          {MP_ENABLED && (
            <a
              href={PACK_PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center border border-kinetic px-3 py-2 text-kinetic hover:bg-kinetic hover:text-onyx active:bg-kinetic active:text-onyx"
              aria-label={`Comprar ${PACK_NAME} por Mercado Pago`}
            >
              COMPRAR
            </a>
          )}
          {XMR_ENABLED && (
            <XmrButton
              className={
                'inline-flex min-h-[44px] items-center px-3 py-2 ' +
                (MP_ENABLED
                  ? 'border border-cotton/30 text-cotton/80 hover:border-kinetic hover:text-kinetic active:border-kinetic active:text-kinetic'
                  : 'border border-kinetic text-kinetic hover:bg-kinetic hover:text-onyx active:bg-kinetic active:text-onyx')
              }
              ariaLabel="Pagar pack TZAM con Monero (XMR)"
            >
              {MP_ENABLED ? 'XMR' : 'PAGAR XMR'}
            </XmrButton>
          )}
        </nav>
      </header>

      <section
        id="inicio"
        className="relative flex min-h-[calc(100dvh-9rem)] items-end overflow-hidden border-b border-cotton/10 sm:min-h-[88vh]"
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
            <h1 className="max-w-4xl text-[2.75rem] font-extrabold leading-[0.95] tracking-tight drop-shadow-2xl sm:text-7xl lg:text-8xl">
              Dulces premium.<br />
              <span className="text-kinetic">Sabor intenso.</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-cotton/80 sm:text-lg">
              TZAM son dulces duros en frasco, creados para probar perfiles claros:
              Citrus, Mint y Cherry. El pack de entrada incluye los tres sabores y envío
              nacional.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {MP_ENABLED && (
                <a
                  href={PACK_PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono inline-flex min-h-[44px] items-center border border-kinetic bg-kinetic px-5 py-3 text-xs tracking-widest text-onyx transition hover:bg-cotton active:bg-cotton"
                  aria-label={`Comprar ${PACK_NAME} por ${PACK_PRICE} pesos en Mercado Pago`}
                >
                  COMPRAR PACK · ${PACK_PRICE} MXN
                </a>
              )}
              {XMR_ENABLED && (
                <XmrButton
                  className={
                    'mono inline-flex min-h-[44px] items-center px-5 py-3 text-xs tracking-widest backdrop-blur-sm transition ' +
                    (MP_ENABLED
                      ? 'border border-cotton/30 bg-onyx/30 text-cotton/80 hover:border-kinetic hover:text-kinetic active:border-kinetic active:text-kinetic'
                      : 'border border-kinetic bg-kinetic text-onyx hover:bg-cotton active:bg-cotton')
                  }
                  ariaLabel="Pagar pack con Monero XMR de forma privada"
                >
                  {MP_ENABLED ? 'PAGAR CON XMR' : `PAGAR CON XMR · ${PACK_PRICE} MXN`}
                </XmrButton>
              )}
              <a
                href="#sabores"
                className="mono inline-flex min-h-[44px] items-center border border-cotton/30 bg-onyx/30 px-5 py-3 text-xs tracking-widest text-cotton/80 backdrop-blur-sm transition hover:border-cotton hover:text-cotton active:border-cotton active:text-cotton"
              >
                VER SABORES
              </a>
              {!HAS_PURCHASE && (
                <a
                  href={emailHref}
                  className="mono inline-flex min-h-[44px] items-center border border-kinetic bg-kinetic px-5 py-3 text-xs tracking-widest text-onyx transition hover:bg-cotton active:bg-cotton"
                  aria-label={`Escribir a ${CONTACT_EMAIL}`}
                >
                  ESCRIBIR · {CONTACT_EMAIL}
                </a>
              )}
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
                [
                  'PAGO',
                  MP_ENABLED && XMR_ENABLED
                    ? 'Mercado Pago · XMR'
                    : MP_ENABLED
                    ? 'Mercado Pago'
                    : XMR_ENABLED
                    ? 'Monero (XMR)'
                    : 'Por email',
                ],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[90px_1fr] gap-3 border-b border-cotton/10 py-3">
                  <dt className="text-cotton/40">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            {MP_ENABLED && (
              <a
                href={PACK_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mono mt-5 inline-flex min-h-[44px] w-full items-center justify-center border border-kinetic px-5 py-3 text-center text-xs tracking-widest text-kinetic transition hover:bg-kinetic hover:text-onyx active:bg-kinetic active:text-onyx"
                aria-label="Ir al checkout externo de Mercado Pago"
              >
                IR A PAGO SEGURO
              </a>
            )}
            {XMR_ENABLED && (
              <XmrButton
                className={
                  'mono inline-flex min-h-[44px] w-full items-center justify-center px-5 py-3 text-center text-xs tracking-widest transition ' +
                  (MP_ENABLED
                    ? 'mt-2 border border-cotton/30 text-cotton/80 hover:border-kinetic hover:text-kinetic active:border-kinetic active:text-kinetic'
                    : 'mt-5 border border-kinetic text-kinetic hover:bg-kinetic hover:text-onyx active:bg-kinetic active:text-onyx')
                }
                ariaLabel="Pagar pack con Monero XMR (privado)"
              >
                PAGAR CON XMR · PRIVADO
              </XmrButton>
            )}
            {!HAS_PURCHASE && (
              <a
                href={emailHref}
                className="mono mt-5 inline-flex min-h-[44px] w-full items-center justify-center border border-kinetic px-5 py-3 text-center text-xs tracking-widest text-kinetic transition hover:bg-kinetic hover:text-onyx active:bg-kinetic active:text-onyx"
                aria-label={`Escribir a ${CONTACT_EMAIL}`}
              >
                ESCRIBIR · {CONTACT_EMAIL}
              </a>
            )}
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
            <div className="flex flex-wrap gap-3">
              {MP_ENABLED && (
                <a
                  href={PACK_PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono inline-flex min-h-[44px] items-center border border-kinetic bg-kinetic px-6 py-3 text-xs tracking-widest text-onyx transition hover:bg-cotton active:bg-cotton"
                  aria-label={`Comprar pack de tres TZAM por ${PACK_PRICE} pesos`}
                >
                  COMPRAR PACK DE 3
                </a>
              )}
              {XMR_ENABLED && (
                <XmrButton
                  className={
                    'mono inline-flex min-h-[44px] items-center px-6 py-3 text-xs tracking-widest transition ' +
                    (MP_ENABLED
                      ? 'border border-cotton/30 text-cotton/80 hover:border-kinetic hover:text-kinetic active:border-kinetic active:text-kinetic'
                      : 'border border-kinetic bg-kinetic text-onyx hover:bg-cotton active:bg-cotton')
                  }
                  ariaLabel="Pagar pack con Monero XMR de forma privada"
                >
                  {MP_ENABLED ? 'PAGAR CON XMR' : 'PAGAR PACK CON XMR'}
                </XmrButton>
              )}
              {!HAS_PURCHASE && (
                <a
                  href={emailHref}
                  className="mono inline-flex min-h-[44px] items-center border border-kinetic bg-kinetic px-6 py-3 text-xs tracking-widest text-onyx transition hover:bg-cotton active:bg-cotton"
                  aria-label={`Escribir a ${CONTACT_EMAIL}`}
                >
                  ESCRIBIR · {CONTACT_EMAIL}
                </a>
              )}
            </div>
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
                {MP_ENABLED
                  ? 'El checkout se abre en Mercado Pago. Después del pago se prepara el pack y se envía a cualquier estado de México.'
                  : XMR_ENABLED
                  ? 'Pago en Monero (XMR) — confirmación por Telegram con TX proof. Después se prepara el pack y se envía a cualquier estado de México.'
                  : `Escríbenos a ${CONTACT_EMAIL} para coordinar pago y envío a cualquier estado de México.`}
              </p>
            </div>
            <dl className="mono text-xs">
              {(MP_ENABLED
                ? [
                    ['1', 'Compra el pack de 3 en Mercado Pago'],
                    ['2', 'Confirmamos datos de envío desde el checkout'],
                    ['3', 'Recibes Citrus, Mint y Cherry en un solo paquete'],
                  ]
                : XMR_ENABLED
                ? [
                    ['1', 'Pagas en Monero al monto único de tu orden'],
                    ['2', 'Mandas TX proof + envío por Telegram'],
                    ['3', 'Recibes Citrus, Mint y Cherry en un solo paquete'],
                    ...(TELEGRAM_CHANNEL
                      ? [
                          [
                            '4',
                            `Anunciamos el envío en @${TELEGRAM_CHANNEL} con tu Order ID — sin DM extra.`,
                          ] as [string, string],
                        ]
                      : []),
                  ]
                : [
                    ['1', `Nos escribes a ${CONTACT_EMAIL}`],
                    ['2', 'Coordinamos pago y datos de envío'],
                    ['3', 'Recibes el pack'],
                  ]
              ).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[40px_1fr] gap-4 border-b border-cotton/10 py-4">
                  <dt className="text-kinetic">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            {MP_ENABLED ? (
              <a
                href={PACK_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mono inline-flex min-h-[44px] items-center border border-kinetic px-6 py-3 text-xs tracking-widest text-kinetic transition hover:bg-kinetic hover:text-onyx active:bg-kinetic active:text-onyx"
                aria-label="Comprar pack con envío nacional incluido"
              >
                COMPRAR CON ENVÍO INCLUIDO
              </a>
            ) : XMR_ENABLED ? (
              <XmrButton
                className="mono inline-flex min-h-[44px] items-center border border-kinetic px-6 py-3 text-xs tracking-widest text-kinetic transition hover:bg-kinetic hover:text-onyx active:bg-kinetic active:text-onyx"
                ariaLabel="Pagar pack con XMR (envío incluido)"
              >
                PAGAR XMR · ENVÍO INCLUIDO
              </XmrButton>
            ) : (
              <a
                href={emailHref}
                className="mono inline-flex min-h-[44px] items-center border border-kinetic px-6 py-3 text-xs tracking-widest text-kinetic transition hover:bg-kinetic hover:text-onyx active:bg-kinetic active:text-onyx"
                aria-label={`Escribir a ${CONTACT_EMAIL}`}
              >
                ESCRIBIR · {CONTACT_EMAIL}
              </a>
            )}
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
            {XMR_ENABLED && (
              <div className="mono mt-5 grid gap-1.5 border-t border-cotton/10 pt-4 text-[10px] tracking-widest text-cotton/50">
                <div className="flex justify-between gap-3">
                  <span>XMR LOTE</span>
                  <span className="text-cotton/80">{XMR_BATCH_LABEL || batch.id}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>FINGERPRINT</span>
                  <span className="text-kinetic">{XMR_FINGERPRINT}</span>
                </div>
                {XMR_BATCH_OPENED_AT && (
                  <div className="flex justify-between gap-3">
                    <span>ABIERTO</span>
                    <span className="text-cotton/80">{XMR_BATCH_OPENED_AT}</span>
                  </div>
                )}
              </div>
            )}
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
                MP_ENABLED
                  ? `Sí. El pack cuesta $${PACK_PRICE} MXN e incluye envío nacional dentro de México.`
                  : XMR_ENABLED
                  ? `Sí. El pack cuesta $${PACK_PRICE} MXN (≈ XMR equivalente) e incluye envío nacional dentro de México.`
                  : `Sí. El pack cuesta $${PACK_PRICE} MXN e incluye envío nacional. Coordinamos por email a ${CONTACT_EMAIL}.`,
              ],
              [
                '¿Puedo comprar un solo frasco?',
                'Los frascos individuales cuestan $39 MXN como referencia, pero la compra principal en esta versión es el pack de 3.',
              ],
              [
                '¿Qué pasa con Kinetic?',
                'Kinetic está en desarrollo. Contiene cafeína y se mostrará con advertencia antes de habilitar venta.',
              ],
              ...(TELEGRAM_CHANNEL && XMR_ENABLED
                ? [
                    [
                      '¿Cómo sé que mi pack salió?',
                      `Anunciamos cada envío en el canal público @${TELEGRAM_CHANNEL} con tu Order ID. Solo tú reconoces tu ID porque sólo tú lo guardaste al pagar. Si quieres tracking exacto, escríbenos por Telegram con tu Order ID.`,
                    ] as [string, string],
                  ]
                : []),
              ...(PGP_FINGERPRINT
                ? [
                    [
                      '¿Aceptan comunicación cifrada con PGP?',
                      `Sí. Cifra el TX proof + dirección con nuestra clave pública (fingerprint en el footer) y mándalo por Telegram o email. Recomendado para clientes que ya manejan PGP.`,
                    ] as [string, string],
                  ]
                : []),
            ].map(([question, answer]) => (
              <div key={question} className="grid gap-3 py-5 sm:grid-cols-[220px_1fr]">
                <h3 className="font-bold">{question}</h3>
                <p className="text-sm leading-relaxed text-cotton/70">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mono flex flex-col gap-6 border-t border-cotton/10 px-6 py-12 text-[11px] text-cotton/50 sm:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>TZAM · dulces premium hechos en San Luis Potosí · 2026</div>
          <div className="flex flex-wrap gap-5">
            {XMR_ENABLED && (
              <TelegramButton
                tipo="INFO_GENERAL"
                usuario="PIE"
                className="inline-flex min-h-[44px] items-center hover:text-kinetic active:text-kinetic"
              >
                /soporte-telegram
              </TelegramButton>
            )}
            {TELEGRAM_CHANNEL && (
              <a
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center hover:text-kinetic active:text-kinetic"
                aria-label={`Canal Telegram @${TELEGRAM_CHANNEL}`}
              >
                /@{TELEGRAM_CHANNEL}
              </a>
            )}
            <a
              href={emailHref}
              className="inline-flex min-h-[44px] items-center hover:text-kinetic active:text-kinetic"
              aria-label={`Escribir a ${CONTACT_EMAIL}`}
            >
              /{CONTACT_EMAIL}
            </a>
          </div>
        </div>
        {PGP_FINGERPRINT && (
          <div className="flex flex-wrap items-center gap-3 border-t border-cotton/10 pt-4 text-[10px] tracking-widest text-cotton/40">
            <span>PGP</span>
            <span className="break-all text-cotton/70">{PGP_FINGERPRINT}</span>
            {PGP_PUBKEY_URL && (
              <a
                href={PGP_PUBKEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center hover:text-kinetic active:text-kinetic"
                aria-label="Descargar clave pública PGP"
              >
                /pubkey
              </a>
            )}
          </div>
        )}
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-2 border-t border-kinetic/30 bg-onyx/95 px-3 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur-md sm:hidden">
        {MP_ENABLED && (
          <a
            href={PACK_PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mono flex min-h-[48px] items-center justify-center border border-kinetic bg-kinetic px-5 text-center text-xs tracking-widest text-onyx active:bg-cotton"
            aria-label={`Comprar ${PACK_NAME} por ${PACK_PRICE} pesos`}
          >
            COMPRAR PACK · ${PACK_PRICE} MXN
          </a>
        )}
        {XMR_ENABLED && (
          <XmrButton
            className={
              'mono flex min-h-[48px] w-full items-center justify-center px-5 text-center tracking-widest ' +
              (MP_ENABLED
                ? 'border border-cotton/30 text-[11px] text-cotton/80 active:border-kinetic active:text-kinetic'
                : 'border border-kinetic bg-kinetic text-xs text-onyx active:bg-cotton')
            }
            ariaLabel="Pagar con Monero XMR de forma privada"
          >
            {MP_ENABLED ? 'O PAGAR CON XMR · PRIVADO' : `PAGAR PACK XMR · ${PACK_PRICE} MXN`}
          </XmrButton>
        )}
        {!HAS_PURCHASE && (
          <a
            href={emailHref}
            className="mono flex min-h-[48px] items-center justify-center border border-kinetic bg-kinetic px-5 text-center text-xs tracking-widest text-onyx active:bg-cotton"
            aria-label={`Escribir a ${CONTACT_EMAIL}`}
          >
            ESCRIBIR · {CONTACT_EMAIL}
          </a>
        )}
      </div>

      <TerminalOverlay />
    </main>
  );
}
