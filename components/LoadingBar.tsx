'use client';
import { useEffect, useState } from 'react';

interface Props {
  target: number;
}

export default function LoadingBar({ target }: Props) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => (p < target ? p + 1 : p));
    }, 35);
    return () => clearInterval(id);
  }, [target]);

  const filled = Math.floor(pct / 5);
  const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);

  return (
    <div className="mono text-xs sm:text-sm text-cotton/80 leading-relaxed select-none">
      <div className="text-kinetic/90">{'>'} EJECUTAR INICIO_SISTEMA_TZAM</div>
      <div className="mt-2">[ESTADO: LOTE_00_EN_PROCESO]</div>
      <div>
        [ PROGRESO: <span className="text-kinetic">{bar}</span> {pct}% ]
      </div>
    </div>
  );
}
