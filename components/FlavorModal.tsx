'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { PACK_NAME, PACK_PAYMENT_URL, PACK_PRICE } from '@/lib/checkout';
import { Flavor } from './FlavorCard';

interface Props {
  flavor: Flavor;
  open: boolean;
  onClose: () => void;
}

export default function FlavorModal({ flavor, open, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

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

  const accent =
    flavor.series === 'kinetic'
      ? '#b87333'
      : flavor.series === 'fresca'
      ? '#2ddc8a'
      : flavor.candyColor;
  const isKinetic = flavor.series === 'kinetic';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-0 backdrop-blur-md animate-[fadeIn_180ms_ease-out] sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de sabor TZAM ${flavor.name}`}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[100vh] w-full max-w-5xl flex-col overflow-hidden border border-cotton/15 bg-onyx animate-[modalIn_280ms_cubic-bezier(0.16,1,0.3,1)] sm:h-[84vh]"
        style={{ boxShadow: `0 0 100px -28px ${accent}55` }}
      >
        <div className="mono flex items-center justify-between gap-3 border-b border-cotton/10 px-4 py-3 text-[10px] tracking-widest text-cotton/70 sm:px-6 sm:text-[11px]">
          <div className="min-w-0 truncate">
            TZAM Nº {flavor.id} · {flavor.code}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 border border-cotton/20 px-2 py-1 hover:border-kinetic hover:text-kinetic"
            aria-label="Cerrar detalle de sabor"
          >
            CERRAR
          </button>
        </div>

        <div className="grid flex-1 overflow-y-auto lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[40vh] overflow-hidden border-b border-cotton/10 lg:min-h-full lg:border-b-0 lg:border-r">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(ellipse at 50% 40%, ${accent}33, transparent 70%)`,
              }}
            />
            {flavor.image ? (
              <Image
                src={flavor.image}
                alt={`Frasco TZAM ${flavor.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
                priority
              />
            ) : (
              <div className="mono absolute inset-0 flex items-center justify-center text-xs text-cotton/30">
                IMAGEN NO DISPONIBLE
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 p-6 sm:p-10">
            <div>
              <div className="mono mb-2 text-[11px] tracking-widest text-cotton/40">
                {isKinetic ? 'SABOR EN DESARROLLO' : 'SABOR DISPONIBLE EN PACK'}
              </div>
              <h2
                className="text-4xl font-extrabold tracking-tight sm:text-5xl"
                style={{ color: accent }}
              >
                {flavor.name}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-cotton/70">
                {flavor.profile}. Un perfil pensado para sentirse claro desde la primera
                pieza y mantenerse limpio hasta el final.
              </p>
            </div>

            <dl className="mono text-[11px] text-cotton/80 sm:text-xs">
              {[
                ['Formato', 'Frasco PET cristal · 40g · aprox. 20 piezas'],
                ['Base', flavor.base],
                ['Acabado', flavor.finish],
                ['Precio unitario', `$${flavor.price}.00 MXN de referencia`],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[125px_1fr] gap-3 border-b border-cotton/10 py-2.5">
                  <dt className="text-cotton/40">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            {isKinetic && flavor.warning && (
              <div className="border-l-2 border-kinetic/60 py-1 pl-3 text-[11px] leading-relaxed text-kinetic/90">
                {flavor.warning}
              </div>
            )}

            <div className="mt-auto flex flex-col gap-3 border-t border-cotton/10 pt-5 sm:flex-row sm:items-end">
              <div className="flex-1">
                <div className="mono mb-1 text-[10px] tracking-widest text-cotton/40">
                  COMPRA RECOMENDADA
                </div>
                <div className="text-2xl font-extrabold">
                  {PACK_NAME} · ${PACK_PRICE} <span className="text-base text-cotton/40">MXN</span>
                </div>
                <p className="mt-1 text-sm text-cotton/60">
                  Citrus + Mint + Cherry con envío nacional incluido.
                </p>
              </div>
              <a
                href={PACK_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mono flex items-center justify-center border border-kinetic px-6 py-4 text-[11px] tracking-widest text-kinetic transition hover:bg-kinetic hover:text-onyx"
                aria-label={`Comprar ${PACK_NAME} por Mercado Pago`}
              >
                COMPRAR PACK
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
