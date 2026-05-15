'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Flavor } from './FlavorCard';
import TelegramButton from './TelegramButton';

interface Props {
  flavor: Flavor;
  open: boolean;
  onClose: () => void;
}

function useCountUp(target: number, durationMs = 900, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, active]);
  return value;
}

function useScanLoad(active: boolean) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (!active) {
      setPct(0);
      return;
    }
    const id = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(id);
          return 100;
        }
        return p + Math.floor(Math.random() * 8) + 4;
      });
    }, 40);
    return () => clearInterval(id);
  }, [active]);
  return Math.min(100, pct);
}

export default function FlavorModal({ flavor, open, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const pct = useScanLoad(open);
  const cafeina = useCountUp(7, 1100, open && flavor.series === 'kinetic');
  const acidez = useCountUp(2.4, 900, open);
  const cocción = useCountUp(150.2, 1100, open);
  const pureza = useCountUp(99.4, 1300, open);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const accent = flavor.series === 'kinetic' ? '#b87333' : flavor.series === 'fresca' ? '#2ddc8a' : flavor.candyColor;
  const isKinetic = flavor.series === 'kinetic';
  const filled = Math.floor(pct / 4);
  const bar = '█'.repeat(filled) + '░'.repeat(25 - filled);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-6 animate-[fadeIn_180ms_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Especificaciones TZAM Nº ${flavor.id} ${flavor.code}`}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl h-[100vh] sm:h-[88vh] bg-onyx border border-cotton/15 overflow-hidden flex flex-col animate-[modalIn_280ms_cubic-bezier(0.16,1,0.3,1)]"
        style={{ boxShadow: `0 0 120px -20px ${accent}33` }}
      >
        {/* HEADER scanline */}
        <div className="relative px-4 sm:px-6 py-3 border-b border-cotton/10 flex items-center justify-between mono text-[10px] sm:text-[11px] text-cotton/70 tracking-widest gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-kinetic shrink-0">●</span>
            <span className="truncate">INSPECCIONANDO Nº {flavor.id} // {flavor.code}</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-cotton/40 min-w-0">
            <span className="truncate">[ ESCANEO: <span style={{ color: accent }}>{bar}</span> {pct}% ]</span>
          </div>
          <button
            onClick={onClose}
            className="border border-cotton/20 px-2 py-1 hover:border-kinetic hover:text-kinetic shrink-0"
            aria-label="Cerrar"
          >
            [ESC] ✕
          </button>
        </div>

        {/* GRID */}
        <div className="flex-1 grid lg:grid-cols-[1fr_1fr] overflow-y-auto">
          {/* LADO IZQUIERDO: imagen + glow */}
          <div className="relative min-h-[40vh] lg:min-h-full border-b lg:border-b-0 lg:border-r border-cotton/10 overflow-hidden">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(ellipse at 50% 40%, ${accent}33, transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
              style={{
                background:
                  'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(245,243,238,0.05) 3px, rgba(245,243,238,0.05) 4px)',
              }}
            />
            {flavor.image ? (
              <Image
                src={flavor.image}
                alt={`TZAM Nº ${flavor.id} ${flavor.code}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-cotton/30 mono text-xs">
                [SIN_IMAGEN_DISPONIBLE]
              </div>
            )}
            {/* corner brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2" style={{ borderColor: accent }} />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2" style={{ borderColor: accent }} />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2" style={{ borderColor: accent }} />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2" style={{ borderColor: accent }} />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 mono text-[10px] tracking-widest" style={{ color: accent }}>
              [ OBJETIVO BLOQUEADO ]
            </div>
          </div>

          {/* LADO DERECHO: datos */}
          <div className="p-6 sm:p-10 flex flex-col gap-6 mono">
            <div>
              <div className="text-[11px] text-cotton/40 tracking-widest mb-2">
                MUESTRA · LOTE_00 · MX-SLP
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans" style={{ color: accent }}>
                {flavor.name}
              </h2>
              <div className="text-cotton/60 text-xs mt-2">Nº {flavor.id} // {flavor.code}</div>
            </div>

            {/* MÉTRICAS animadas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Metric label="pH" value={acidez.toFixed(1)} unit="±0.1" color={accent} />
              <Metric label="T_COCCIÓN" value={cocción.toFixed(1)} unit="°C" color={accent} />
              <Metric label="PUREZA_AE" value={pureza.toFixed(1)} unit="%" color={accent} />
              {isKinetic ? (
                <Metric label="CAFEÍNA" value={cafeina.toFixed(1)} unit="mg" color={accent} highlight />
              ) : (
                <Metric label="PESO" value="40" unit="g" color={accent} />
              )}
            </div>

            {/* TABLA */}
            <dl className="text-[11px] sm:text-xs text-cotton/80 border-t border-cotton/10">
              {[
                ['PERFIL', flavor.profile],
                ['ESTRUCTURA', flavor.structure],
                ['BASE', flavor.base],
                ['ACABADO', flavor.finish],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-3 py-2.5 border-b border-cotton/10">
                  <dt className="text-cotton/40">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            {/* MATRIZ MOLECULAR (kinetic only) */}
            {isKinetic && (
              <div className="border border-kinetic/30 bg-kinetic/5 p-4 text-[11px] leading-relaxed">
                <div className="text-kinetic tracking-widest mb-2">[ MATRIZ_ACTIVA ]</div>
                <div className="text-cotton/80">
                  C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub> · 7.0mg ± 0.5 · matriz sacarosa·glucosa
                </div>
                <div className="text-cotton/40 mt-2">
                  curva absorción 25–35min · vida media plasma 4–6h
                </div>
              </div>
            )}

            {flavor.warning && (
              <div className="text-[10px] sm:text-[11px] text-kinetic/90 border-l-2 border-kinetic/60 pl-3 py-1 leading-relaxed">
                ⚠ {flavor.warning}
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <div className="text-[10px] text-cotton/40 tracking-widest mb-1">PRECIO_UNITARIO</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-sans">
                  ${flavor.price}.00 <span className="text-cotton/40 text-base">MXN</span>
                </div>
              </div>
              <TelegramButton
                tipo={flavor.available ? 'PEDIDO' : 'INFO_GENERAL'}
                usuario="MODAL"
                idLote={`Nº_${flavor.id}_${flavor.code}`}
                className="text-[11px] tracking-widest border px-6 py-4 transition flex items-center justify-center"
              >
                {flavor.available ? '▶ INICIAR_PEDIDO_TG' : '▶ LISTA_DE_ESPERA_TG'}
              </TelegramButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  unit,
  color,
  highlight,
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        'border p-3 flex flex-col gap-1 ' +
        (highlight ? 'border-kinetic/50 bg-kinetic/5' : 'border-cotton/10')
      }
    >
      <div className="text-[9px] text-cotton/40 tracking-widest">{label}</div>
      <div className="text-xl font-bold font-sans tabular-nums" style={{ color: highlight ? '#e8ff00' : color }}>
        {value}
        <span className="text-[10px] text-cotton/40 ml-1 font-mono">{unit}</span>
      </div>
    </div>
  );
}
