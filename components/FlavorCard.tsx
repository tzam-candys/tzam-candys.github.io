'use client';
import { useState } from 'react';
import Image from 'next/image';
import Bottle from './Bottle';
import FlavorModal from './FlavorModal';

export interface Flavor {
  id: string;
  code: string;
  name: string;
  series: 'frutal' | 'fresca' | 'kinetic';
  candyColor: string;
  profile: string;
  structure: string;
  base: string;
  finish: string;
  price: number;
  available: boolean;
  comingSoon?: boolean;
  warning?: string;
  image?: string;
}

export default function FlavorCard({ f }: { f: Flavor }) {
  const [open, setOpen] = useState(false);
  const isKinetic = f.series === 'kinetic';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group text-left border border-cotton/10 hover:border-cotton/40 transition bg-onyx/40 backdrop-blur-sm p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden cursor-pointer focus:outline-none focus:border-kinetic"
        aria-haspopup="dialog"
        aria-label={`Ver especificaciones de TZAM Nº ${f.id} ${f.code}`}
      >
        {isKinetic && (
          <div className="absolute top-0 right-0 mono text-[10px] tracking-widest text-kinetic px-2 py-1 border-l border-b border-kinetic/40 z-10">
            KINETIC // COBRE
          </div>
        )}

        <div className="absolute top-2 left-2 mono text-[10px] text-cotton/30 tracking-widest opacity-0 group-hover:opacity-100 transition">
          [ INSPECCIONAR ]
        </div>

        <div className="flex items-center justify-center py-4 relative h-56 sm:h-64 transition-transform group-hover:scale-[1.03]">
          {f.image ? (
            <Image
              src={f.image}
              alt={`TZAM Nº ${f.id} ${f.code}`}
              fill
              sizes="(max-width: 640px) 100vw, 25vw"
              className="object-contain"
            />
          ) : (
            <Bottle
              code={f.code}
              number={f.id}
              series={f.series}
              candyColor={f.candyColor}
              width={140}
            />
          )}
        </div>

        <div className="mono text-[11px] text-cotton/50 tracking-widest">
          Nº {f.id} // {f.code}
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{f.name}</h3>

        <dl className="mono text-[11px] text-cotton/70 space-y-2 leading-relaxed">
          <div className="grid grid-cols-[90px_1fr] gap-2">
            <dt className="text-cotton/40">PERFIL</dt>
            <dd>{f.profile}</dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-2">
            <dt className="text-cotton/40">BASE</dt>
            <dd>{f.base}</dd>
          </div>
        </dl>

        <div className="flex items-center justify-between pt-4 border-t border-cotton/10">
          <span className="mono text-sm">
            ${f.price}.00 <span className="text-cotton/40">MXN</span>
          </span>
          <span
            className={
              'mono text-[10px] tracking-widest transition ' +
              (f.available ? 'text-kinetic' : 'text-cotton/40')
            }
          >
            {f.available ? '[ DISPONIBLE ]' : '[ PRÓXIMAMENTE ]'}
          </span>
        </div>
      </button>

      <FlavorModal flavor={f} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
