'use client';
import { useEffect, useState, useRef } from 'react';
import { composeSysMsg, telegramUrl } from '@/lib/telegram';

type Line = { kind: 'in' | 'out' | 'err'; text: string };

const AYUDA = [
  'TZAM CLI v1.0 — comandos disponibles:',
  '  ayuda                ver esta ayuda',
  '  listar lotes         listar sabores disponibles',
  '  leer manual.tzam     página de manual',
  '  comprar <nº>         iniciar compra (telegram)',
  '  estado               estado del lote actual',
  '  quiensoy             identidad de sistema',
  '  limpiar              limpiar consola',
  '  salir                cerrar terminal (Esc)',
];

const SABORES = [
  'Nº 01 CITRUS    [FRUTAL]  $39  ACTIVO',
  'Nº 02 MINT      [FRESCA]  $39  ACTIVO',
  'Nº 03 CHERRY    [FRUTAL]  $39  ACTIVO',
  'Nº 04 KINETIC   [ENERGÍA] $42  PRÓXIMAMENTE',
];

const MANUAL = [
  'NOMBRE',
  '    tzam — sistema de entrega de sabor de alta ingeniería',
  '',
  'SINOPSIS',
  '    tzam [Nº_SABOR] [--volumen 50ml] [--kinetic]',
  '',
  'DESCRIPCIÓN',
  '    Micro-unidades de geometría domo para disolución controlada.',
  '    No morder para evitar picos de acidez no lineales.',
  '',
  'OPCIONES_KINETIC',
  '    Nº 04 transporta carga activa de 7.0mg ± 0.5 de cafeína por unidad.',
  '    El uso excesivo puede causar inestabilidad_sistema.',
  '',
  'ENTORNO',
  '    Diseñado y producido en San Luis Potosí, México.',
];

export default function TerminalOverlay() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<Line[]>([
    { kind: 'out', text: 'Terminal TZAM // tip: escribe `ayuda`' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const next: Line[] = [...history, { kind: 'in', text: `$ ${raw}` }];
    const parts = cmd.split(/\s+/);
    const head = parts[0];
    const rest = parts.slice(1);

    const push = (lines: string[]) =>
      lines.forEach((l) => next.push({ kind: 'out', text: l }));

    switch (head) {
      case 'ayuda':
      case 'help':
        push(AYUDA);
        break;
      case 'listar':
      case 'ls':
        if (rest[0] === 'lotes' || rest[0] === 'batches' || !rest[0]) push(SABORES);
        else next.push({ kind: 'err', text: 'uso: listar lotes' });
        break;
      case 'leer':
      case 'cat':
        if (rest[0] === 'manual.tzam' || rest[0] === 'man.tzam') push(MANUAL);
        else next.push({ kind: 'err', text: `no existe: ${rest[0] ?? ''}` });
        break;
      case 'estado':
      case 'status':
        push([
          'LOTE_00 // EN_PROCESO',
          'MATRIZ_CAFEÍNA_ESTABILIZADA       [OK]',
          'CALIBRACIÓN_PERFIL_ÁCIDO          [EN_PROCESO]',
          'GEOMETRÍA_EMPAQUE_VERIFICADA      [OK]',
        ]);
        break;
      case 'quiensoy':
      case 'whoami':
        push(['anon@tzam.mx']);
        break;
      case 'comprar':
      case 'buy': {
        const n = rest[0];
        if (!n) {
          next.push({ kind: 'err', text: 'uso: comprar <nº> (ej: comprar 01)' });
        } else {
          const msg = composeSysMsg('PEDIDO', 'CLI', `Nº_${n}`);
          try {
            void navigator.clipboard.writeText(msg);
          } catch {}
          next.push({ kind: 'out', text: `mensaje copiado · abriendo Telegram para Nº ${n}...` });
          window.open(telegramUrl(), '_blank', 'noopener,noreferrer');
        }
        break;
      }
      case 'limpiar':
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'salir':
      case 'exit':
        setOpen(false);
        setInput('');
        return;
      default:
        next.push({ kind: 'err', text: `tzam: comando no encontrado: ${head}` });
    }

    setHistory(next);
    setInput('');
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 mono text-[10px] tracking-widest px-3 py-2 border border-cotton/20 hover:border-kinetic hover:text-kinetic transition text-cotton/70"
        aria-label="Abrir terminal"
      >
        [ ABRIR TERMINAL ] · ⌃`
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full sm:max-w-2xl bg-onyx border border-cotton/15 mono text-xs sm:text-sm flex flex-col h-[70vh] sm:h-[60vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2 border-b border-cotton/10 flex items-center justify-between text-cotton/60">
              <span>tzam@portal:~</span>
              <button
                onClick={() => setOpen(false)}
                className="text-cotton/40 hover:text-kinetic"
              >
                [esc]
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-2 leading-relaxed">
              {history.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.kind === 'err'
                      ? 'text-red-400'
                      : l.kind === 'in'
                      ? 'text-kinetic'
                      : 'text-cotton/80'
                  }
                >
                  {l.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
              }}
              className="flex items-center gap-2 px-3 py-2 border-t border-cotton/10"
            >
              <span className="text-kinetic">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-cotton placeholder:text-cotton/30"
                placeholder="ayuda"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
