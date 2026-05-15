import Image from 'next/image';
import FlavorCard, { Flavor } from '@/components/FlavorCard';
import LoadingBar from '@/components/LoadingBar';
import NotifyForm from '@/components/NotifyForm';
import TelegramButton from '@/components/TelegramButton';
import TerminalOverlay from '@/components/TerminalOverlay';
import data from '@/data/batches.json';

export default function Home() {
  const flavors = data.flavors as Flavor[];
  const batch = data.currentBatch;

  return (
    <main className="relative min-h-screen text-cotton">
      {/* ENCABEZADO */}
      <header className="border-b border-cotton/10 px-6 sm:px-12 py-5 flex items-center justify-between sticky top-0 z-30 bg-onyx/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-xl tracking-[0.4em]">TZAM</span>
          <span className="mono text-[10px] text-cotton/40 hidden sm:inline">
            v1.0 // SLP_MX
          </span>
        </div>
        <nav className="mono text-[11px] tracking-widest flex items-center gap-5 sm:gap-7">
          <a href="#componentes" className="hover:text-kinetic">
            COMPONENTES
          </a>
          <a href="#lote" className="hover:text-kinetic hidden sm:inline">
            LOTE
          </a>
          <a href="#envio" className="hover:text-kinetic hidden md:inline">
            ENVÍO
          </a>
          <a href="#ficha" className="hover:text-kinetic hidden sm:inline">
            FICHA
          </a>
          <TelegramButton
            tipo="INFO_GENERAL"
            usuario="ENCABEZADO"
            className="border border-cotton/20 px-3 py-1.5 hover:border-kinetic hover:text-kinetic"
          >
            CONTACTO_TG
          </TelegramButton>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden border-b border-cotton/10">
        <div className="absolute inset-0">
          <Image
            src="hero.png"
            alt="TZAM · familia de productos · Nº 01 CITRUS, Nº 02 MINT, Nº 03 CHERRY, Nº 04 KINETIC"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/70 to-onyx/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-onyx/40" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-end">
          <div className="space-y-8">
            <div className="mono text-[11px] text-cotton/60 tracking-widest">
              TZAM [50ml / 40g] · CONFITERÍA TÉCNICA
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.92] tracking-tight drop-shadow-2xl">
              ESTRUCTURA.<br />
              PUREZA.<br />
              <span className="text-kinetic">SIN DISTRACCIONES.</span>
            </h1>
            <div className="mono text-xs sm:text-sm text-cotton/80 space-y-1 leading-relaxed max-w-md">
              <div>
                <span className="text-cotton/40">CATEGORÍA:</span> confitería de alta
                concentración.
              </div>
              <div>
                <span className="text-cotton/40">ORIGEN:</span> San Luis Potosí, México.
              </div>
              <div>
                <span className="text-cotton/40">SISTEMA:</span> vaciado por gravedad.
              </div>
              <div>
                <span className="text-cotton/40">COMPONENTES:</span> sacarosa, glucosa,
                aceites esenciales.
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#componentes"
                className="mono text-xs tracking-widest border border-kinetic text-kinetic px-5 py-3 hover:bg-kinetic hover:text-onyx transition backdrop-blur-sm bg-onyx/30"
              >
                VER COMPONENTES →
              </a>
              <TelegramButton
                tipo="MAYOREO"
                usuario="HERO"
                className="mono text-xs tracking-widest border border-cotton/30 px-5 py-3 hover:border-cotton text-cotton/80 hover:text-cotton backdrop-blur-sm bg-onyx/30"
              >
                MAYOREO B2B
              </TelegramButton>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>

      {/* COMPONENTES */}
      <section id="componentes" className="px-6 sm:px-12 py-20 border-t border-cotton/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="mono text-[11px] text-cotton/50 tracking-widest mb-2">
                /componentes
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Desglose molecular
              </h2>
            </div>
            <div className="mono text-[11px] text-cotton/40 max-w-sm">
              Cada Nº es una fórmula independiente. Geometría domo · 1.5cm · disolución
              controlada. Click en cualquier tarjeta para inspección detallada.
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flavors.map((f) => (
              <FlavorCard key={f.id} f={f} />
            ))}
          </div>
        </div>
      </section>

      {/* ENVÍO */}
      <section id="envio" className="relative px-6 sm:px-12 py-20 border-t border-cotton/10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="relative aspect-[16/9] w-full border border-cotton/10 overflow-hidden bg-onyx/40">
            <Image
              src="shipping-tube.png"
              alt="Tubo industrial de cartón con tapas de hojalata · frascos TZAM Nº 04 KINETIC · tarjeta manual tzam con QR auth SHA-256"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute top-3 left-3 mono text-[10px] tracking-widest text-cotton/60">
              /envio · LOTE_00
            </div>
            <div className="absolute bottom-3 right-3 mono text-[10px] tracking-widest text-cotton/40">
              [ DESEMPAQUE ]
            </div>
          </div>
          <div className="space-y-6">
            <div className="mono text-[11px] text-cotton/50 tracking-widest">
              /envio
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Tubo industrial.<br />Sin desperdicio.
            </h2>
            <p className="mono text-xs sm:text-sm text-cotton/70 leading-relaxed max-w-md">
              Cartón kraft de alta densidad · tapas de hojalata · papel de seda negro
              interior. Cada envío incluye el manual tzam impreso en cianotipo con QR
              de autenticación SHA-256.
            </p>
            <dl className="mono text-xs border-t border-cotton/10">
              {[
                ['CONTINENTE', 'Cartón kraft 60mm Ø · tapas hojalata'],
                ['CAPACIDAD', '3–5 frascos verticales · paper buffer'],
                ['INSERTO', 'Tarjeta manual tzam · QR SHA-256'],
                ['COSTO ENVÍO', 'Incluido en pack ≥ 3 unidades'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[110px_1fr] gap-3 py-2.5 border-b border-cotton/10"
                >
                  <dt className="text-cotton/50">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <TelegramButton
              tipo="PEDIDO"
              usuario="ENVIO"
              className="inline-block border border-kinetic text-kinetic mono text-xs tracking-widest px-6 py-3 hover:bg-kinetic hover:text-onyx transition"
            >
              SOLICITAR TRI-PACK · TG →
            </TelegramButton>
          </div>
        </div>
      </section>

      {/* ESTADO DEL LOTE */}
      <section
        id="lote"
        className="px-6 sm:px-12 py-20 border-t border-cotton/10 bg-onyx/60"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <div className="mono text-[11px] text-cotton/50 tracking-widest mb-2">
              /estado
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {batch.id} en proceso.
            </h2>
          </div>
          <div className="border border-cotton/15 bg-black/40 p-6 sm:p-8">
            <LoadingBar target={batch.progress} />
            <ul className="mono text-xs text-cotton/80 mt-6 space-y-1.5">
              {batch.logs.map((l) => (
                <li key={l.key} className="flex justify-between">
                  <span className="text-cotton/60">{l.key}</span>
                  <span
                    className={
                      l.status === 'OK'
                        ? 'text-kinetic'
                        : l.status === 'EN_PROCESO'
                        ? 'text-yellow-400'
                        : 'text-cotton/40'
                    }
                  >
                    [{l.status}]
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <NotifyForm />
        </div>
      </section>

      {/* FICHA */}
      <section id="ficha" className="px-6 sm:px-12 py-20 border-t border-cotton/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <div className="mono text-[11px] text-cotton/50 tracking-widest mb-2">
              /ficha
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-8">
              Hoja técnica.
            </h2>
            <dl className="mono text-xs sm:text-sm border-t border-cotton/10">
              {[
                ['ENVASE', 'PET cristal cilíndrico 50ml'],
                ['CIERRE', 'Aluminio cepillado plata mate'],
                ['CONTENIDO', '40g netos · ~20 piezas'],
                ['GEOMETRÍA', 'Domo / media esfera · 1.5cm Ø'],
                ['COCCIÓN', 'Hard Crack · 149–152°C'],
                ['EMPAQUE ENVÍO', 'Tubo cartón industrial + tapas hojalata'],
                ['INSERTO', 'manual tzam · QR autenticación SHA-256'],
                ['PRODUCCIÓN', '212 frascos/día · SLP_MX'],
                ['CONTACTO', 'Telegram cifrado · @tzam_mx'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[130px_1fr] gap-4 py-3 border-b border-cotton/10"
                >
                  <dt className="text-cotton/50">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-6">
            <div className="border border-cotton/10 p-6 sm:p-8 bg-onyx/40">
              <div className="mono text-[11px] text-cotton/50 tracking-widest mb-3">
                $ manual tzam
              </div>
              <pre className="mono text-[11px] sm:text-xs text-cotton/80 leading-relaxed whitespace-pre-wrap">
{`NOMBRE
    tzam — sistema de entrega de sabor de alta ingeniería

SINOPSIS
    tzam [Nº_SABOR] [--volumen 50ml] [--kinetic]

DESCRIPCIÓN
    Micro-unidades de geometría domo para disolución
    controlada. No morder para evitar picos de acidez
    no lineales.

OPCIONES_KINETIC
    Nº 04 transporta carga activa de 7.0mg ± 0.5 de
    cafeína por unidad. El uso excesivo puede causar
    inestabilidad_sistema.

ENTORNO
    Diseñado y producido en San Luis Potosí, México.`}
              </pre>
            </div>
            <TelegramButton
              tipo="MAYOREO"
              usuario="FICHA"
              className="block w-full border border-kinetic text-kinetic mono text-xs tracking-widest text-center py-4 hover:bg-kinetic hover:text-onyx transition"
            >
              SOLICITAR ACCESO MAYORISTA · TG →
            </TelegramButton>
          </div>
        </div>
      </section>

      {/* PIE */}
      <footer className="px-6 sm:px-12 py-12 border-t border-cotton/10 mono text-[11px] text-cotton/50 flex flex-wrap items-center justify-between gap-4">
        <div>
          TZAM // LOTE_00 · 2026 · MX-SLP · todos los derechos en proceso.
        </div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-kinetic">/instagram</a>
          <a href="#" className="hover:text-kinetic">/tiktok</a>
          <TelegramButton
            tipo="INFO_GENERAL"
            usuario="PIE"
            className="hover:text-kinetic"
          >
            /telegram
          </TelegramButton>
        </div>
      </footer>

      <TerminalOverlay />
    </main>
  );
}
