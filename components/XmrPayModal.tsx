'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  XMR_ADDRESS,
  XMR_AMOUNT_PACK,
  XMR_AMOUNT_SINGLE,
  XMR_BATCH_LABEL,
  XMR_RATE_MXN,
  XMR_BATCH_OPENED_AT,
  XMR_BATCH_CLOSE_AFTER_DAYS,
  XMR_FINGERPRINT,
  PACK_PRICE,
  moneroUri,
  batchCloseInfo,
  TELEGRAM_CHANNEL,
  TELEGRAM_CHANNEL_URL,
  PGP_FINGERPRINT,
  PGP_PUBKEY_URL,
} from '@/lib/checkout';
import { composeSysMsg, telegramUrl } from '@/lib/telegram';

interface Props {
  open: boolean;
  onClose: () => void;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const FALLBACK_QR = `${basePath}/xmr-qr.svg`;

interface Order {
  id: string;
  amount: string;
  uri: string;
  createdAt: number;
}

function randomOrderId() {
  const bytes = new Uint8Array(3);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function uniqueAmount(base: string) {
  if (!base) return '';
  const baseNum = Number(base);
  if (!Number.isFinite(baseNum) || baseNum <= 0) return base;
  // Round base to 4 decimals, then add random suffix in [0.0001 .. 0.0099].
  // ~99 unique buckets per build, ≈ +0.4% max nominal overhead.
  const rounded = Math.round(baseNum * 1e4) / 1e4;
  const bytes = new Uint8Array(1);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    bytes[0] = Math.floor(Math.random() * 256);
  }
  const suffix = (bytes[0] % 99) + 1; // 1..99
  const unique = rounded + suffix / 1e4;
  return unique.toFixed(4);
}

function makeOrder(batchTag: string): Order {
  const id = randomOrderId();
  const amount = uniqueAmount(XMR_AMOUNT_PACK);
  const desc = `TZAM_${batchTag}_PACK_${id}`;
  return {
    id,
    amount,
    uri: moneroUri(XMR_ADDRESS, amount, desc),
    createdAt: Date.now(),
  };
}

export default function XmrPayModal({ open, onClose }: Props) {
  const [copied, setCopied] = useState<'addr' | 'amount' | 'id' | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(false);

  const batchTag = XMR_BATCH_LABEL || 'LOTE';

  const close = useMemo(
    () => batchCloseInfo(XMR_BATCH_OPENED_AT, XMR_BATCH_CLOSE_AFTER_DAYS),
    []
  );
  const isClosed = close ? Date.now() > close.closesAtMs : false;

  const regenerate = useCallback(() => {
    setOrder(makeOrder(batchTag));
  }, [batchTag]);

  useEffect(() => {
    if (!open) return;
    if (!order) regenerate();
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
  }, [open, onClose, order, regenerate]);

  useEffect(() => {
    if (!open || !order || isClosed) {
      setQrSvg(null);
      return;
    }
    let cancelled = false;
    setQrLoading(true);
    import('qrcode')
      .then(async (mod) => {
        const QRCode = mod.default ?? mod;
        let svg = await QRCode.toString(order.uri, {
          type: 'svg',
          errorCorrectionLevel: 'M',
          margin: 1,
          color: { dark: '#0a0a0a', light: '#f5f3ee' },
        });
        // Strip fixed width/height so the SVG scales to its container
        // (qrcode lib injects them even when omitted from options).
        svg = svg.replace(/\s(width|height)="[^"]*"/g, '');
        if (!cancelled) setQrSvg(svg);
      })
      .catch(() => {
        if (!cancelled) setQrSvg(null);
      })
      .finally(() => {
        if (!cancelled) setQrLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, order, isClosed]);

  if (!open) return null;

  async function copy(value: string, kind: 'addr' | 'amount' | 'id') {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      // noop
    }
  }

  function openTelegram() {
    const idLote = order ? `${batchTag}#${order.id}` : batchTag;
    const msg = composeSysMsg('PAGO_XMR', 'ANON', idLote, 'PORTAL_TZAM_WEB');
    const tail = order
      ? `\nORDER_ID: ${order.id}\nAMOUNT_XMR: ${order.amount}\nTX_PROOF: <pega aquí>\nENVIO: <dirección o punto de recogida>`
      : '';
    navigator.clipboard?.writeText(msg + tail).catch(() => {});
    window.open(telegramUrl(), '_blank', 'noopener,noreferrer');
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-0 backdrop-blur-md animate-[fadeIn_180ms_ease-out] sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Pagar con Monero (XMR)"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[100dvh] w-full max-w-3xl flex-col overflow-hidden border border-cotton/15 bg-onyx animate-[modalIn_280ms_cubic-bezier(0.16,1,0.3,1)] sm:h-auto sm:max-h-[90dvh]"
        style={{ boxShadow: '0 0 100px -28px #ff660055' }}
      >
        <div className="mono flex items-center justify-between gap-3 border-b border-cotton/10 px-4 py-3 text-[11px] tracking-wider text-cotton/70 sm:px-6 sm:tracking-widest">
          <div className="min-w-0 flex-1">
            <div className="truncate">
              TZAM · PAGO XMR · {batchTag}
              {XMR_FINGERPRINT && (
                <span className="ml-2 hidden text-cotton/40 sm:inline">· {XMR_FINGERPRINT}</span>
              )}
            </div>
            <div className="mt-0.5 truncate text-[10px] text-cotton/40 sm:hidden">
              {XMR_FINGERPRINT}
              {XMR_BATCH_OPENED_AT && ` · abre ${XMR_BATCH_OPENED_AT}`}
              {close && !isClosed && ` · cierra ${close.closesAt}`}
            </div>
            <div className="hidden sm:inline">
              {XMR_BATCH_OPENED_AT && (
                <span className="ml-2 text-cotton/40">· abierto {XMR_BATCH_OPENED_AT}</span>
              )}
              {close && !isClosed && (
                <span className="ml-2 text-cotton/40">· cierra {close.closesAt}</span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center border border-cotton/20 px-3 hover:border-kinetic hover:text-kinetic active:border-kinetic active:text-kinetic"
            aria-label="Cerrar pago XMR"
          >
            CERRAR
          </button>
        </div>

        {isClosed ? (
          <div className="flex flex-col gap-4 p-8 text-center">
            <div className="mono text-[11px] tracking-widest text-red-400">⚠ LOTE CERRADO</div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              {batchTag} ya no acepta pagos
            </h3>
            <p className="text-sm leading-relaxed text-cotton/70">
              Cerrado el {close?.closesAt}. La dirección Monero de este lote sigue activa
              técnicamente pero <span className="text-red-400">no envíes pagos</span> — quedarán
              sin asignar al próximo lote.
            </p>
            <p className="text-sm leading-relaxed text-cotton/70">
              Espera el anuncio del próximo lote o escríbenos por Telegram para coordinar.
            </p>
            <button
              onClick={openTelegram}
              className="mono mx-auto mt-2 border border-kinetic px-5 py-3 text-xs tracking-widest text-kinetic transition hover:bg-kinetic hover:text-onyx"
            >
              CONSULTAR PRÓXIMO LOTE →
            </button>
          </div>
        ) : (
          <div className="grid flex-1 overflow-y-auto md:grid-cols-[320px_1fr]">
            <div className="flex flex-col gap-4 border-b border-cotton/10 bg-onyx p-4 sm:p-6 md:border-b-0 md:border-r">
              <div className="mono text-center text-[10px] tracking-widest text-cotton/40 md:text-left">
                ESCANEA · O TAP &quot;ABRIR WALLET&quot;
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-sm bg-cotton p-3 sm:max-w-[260px] sm:p-4 md:max-w-none">
                {qrSvg ? (
                  <div
                    className="h-full w-full [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                    aria-label={`QR Monero para orden ${order?.id || ''}`}
                  />
                ) : (
                  <img
                    src={FALLBACK_QR}
                    alt={`QR Monero ${batchTag}`}
                    className="block h-full w-full"
                  />
                )}
                {qrLoading && (
                  <div className="mono absolute inset-0 flex items-center justify-center bg-cotton/80 text-[11px] tracking-widest text-onyx/60">
                    GENERANDO QR…
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href={order?.uri || moneroUri(XMR_ADDRESS, XMR_AMOUNT_PACK, `TZAM_${batchTag}_PACK`)}
                  className="mono inline-flex min-h-[48px] w-full items-center justify-center border border-kinetic bg-kinetic px-4 text-center text-xs tracking-widest text-onyx transition hover:bg-cotton active:bg-cotton"
                >
                  ABRIR WALLET →
                </a>
                <button
                  onClick={regenerate}
                  className="mono inline-flex min-h-[44px] w-full items-center justify-center border border-cotton/20 px-4 text-center text-[11px] tracking-widest text-cotton/70 transition hover:border-cotton hover:text-cotton active:border-cotton active:text-cotton"
                  aria-label="Generar nueva orden con monto único"
                >
                  ↻ NUEVA ORDEN
                </button>
              </div>
              <p className="mono text-[11px] leading-relaxed text-cotton/50">
                Wallets compatibles: <span className="text-cotton/80">Monero GUI · Cake · Feather · Mysu · Stack</span>
              </p>
              {TELEGRAM_CHANNEL && (
                <div className="mt-auto border-t border-cotton/10 pt-4">
                  <div className="mono mb-1 text-[10px] tracking-widest text-cotton/40">
                    ESTADO DE ENVÍOS
                  </div>
                  <a
                    href={TELEGRAM_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono inline-flex min-h-[44px] w-full items-center justify-center border border-cotton/20 px-4 text-center text-[11px] tracking-widest text-cotton/80 transition hover:border-kinetic hover:text-kinetic active:border-kinetic active:text-kinetic"
                  >
                    📢 @{TELEGRAM_CHANNEL}
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5 p-5 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-cotton/10 pb-3">
                <div className="min-w-0">
                  <div className="mono mb-1 text-[10px] tracking-widest text-cotton/40">
                    ORDER ID
                  </div>
                  <button
                    onClick={() => order && copy(order.id, 'id')}
                    className="mono text-xl font-extrabold tracking-widest text-kinetic hover:text-cotton"
                    aria-label="Copiar Order ID"
                  >
                    {order?.id || '—'}
                  </button>
                </div>
                {copied === 'id' && (
                  <div className="mono text-[10px] tracking-widest text-kinetic">✓ ID COPIADO</div>
                )}
              </div>

              <div>
                <div className="mono mb-1 text-[11px] tracking-widest text-cotton/40">
                  MONTO EXACTO PARA ESTA ORDEN
                </div>
                <div className="flex items-baseline gap-3">
                  <button
                    onClick={() => order && copy(order.amount, 'amount')}
                    className="mono text-3xl font-extrabold tracking-tight text-kinetic hover:text-cotton"
                    aria-label="Copiar monto exacto en XMR"
                  >
                    {order?.amount || '—'} <span className="text-base text-cotton/40">XMR</span>
                  </button>
                  {XMR_RATE_MXN && (
                    <span className="mono text-[11px] tracking-widest text-cotton/40">
                      ≈ ${PACK_PRICE} MXN · 1 XMR = ${XMR_RATE_MXN}
                    </span>
                  )}
                </div>
                {copied === 'amount' && (
                  <div className="mono mt-1 text-[10px] tracking-widest text-kinetic">
                    ✓ MONTO COPIADO
                  </div>
                )}
                <p className="mono mt-2 text-[10px] leading-relaxed tracking-wider text-cotton/40">
                  El monto incluye un sufijo único para identificar tu pago automáticamente.
                  Envía exactamente esta cantidad.
                </p>
                {XMR_AMOUNT_SINGLE && (
                  <div className="mono mt-3 text-[11px] tracking-widest text-cotton/40">
                    FRASCO INDIVIDUAL · {XMR_AMOUNT_SINGLE} XMR (consulta por Telegram)
                  </div>
                )}
              </div>

              <div>
                <div className="mono mb-1 text-[11px] tracking-widest text-cotton/40">
                  DIRECCIÓN ({batchTag})
                </div>
                <button
                  onClick={() => copy(XMR_ADDRESS, 'addr')}
                  className="mono w-full break-all border border-cotton/15 bg-onyx/60 p-3 text-left text-[13px] leading-relaxed text-cotton hover:border-kinetic active:border-kinetic sm:text-[11px]"
                  aria-label="Copiar dirección Monero"
                >
                  {XMR_ADDRESS}
                </button>
                {copied === 'addr' && (
                  <div className="mono mt-1 text-[10px] tracking-widest text-kinetic">
                    ✓ DIRECCIÓN COPIADA
                  </div>
                )}
                <p className="mono mt-2 text-[10px] leading-relaxed tracking-wider text-cotton/40">
                  Una dirección por lote · privacidad on-chain por RingCT + stealth addresses.
                </p>
              </div>

              <div className="border-t border-cotton/10 pt-4">
                <div className="mono mb-2 text-[11px] tracking-widest text-cotton/40">
                  CÓMO CONFIRMAR
                </div>
                <ol className="mono space-y-2 text-[11px] leading-relaxed text-cotton/75">
                  <li>
                    <span className="text-kinetic">1.</span> Envía el monto exacto desde tu wallet XMR (escanea QR o usa "Abrir wallet").
                  </li>
                  <li>
                    <span className="text-kinetic">2.</span> En tu wallet: <span className="text-cotton">Tools → Prove Transaction</span>, ingresa la dirección destino y copia el <span className="text-cotton">TX proof</span>.
                  </li>
                  <li>
                    <span className="text-kinetic">3.</span> Manda Order ID + TX proof + dirección de envío por Telegram (el botón pre-llena el formato).
                  </li>
                  {TELEGRAM_CHANNEL && (
                    <li>
                      <span className="text-kinetic">4.</span> Sigue <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-cotton underline decoration-cotton/40 hover:text-kinetic active:text-kinetic">@{TELEGRAM_CHANNEL}</a> — anunciamos cuándo enviamos tu Order ID. Si no quieres revelarlo en DM, tu Order ID es tu único identificador público.
                    </li>
                  )}
                </ol>
              </div>

              {PGP_FINGERPRINT && (
                <div className="border-t border-cotton/10 pt-4">
                  <div className="mono mb-1 text-[11px] tracking-widest text-cotton/40">
                    PGP (OPCIONAL)
                  </div>
                  <p className="mono text-[11px] leading-relaxed text-cotton/60">
                    Si prefieres cifrar el TX proof + envío, usa nuestra clave pública.
                  </p>
                  <div className="mono mt-2 break-all text-[11px] text-cotton/80">
                    {PGP_FINGERPRINT}
                  </div>
                  {PGP_PUBKEY_URL && (
                    <a
                      href={PGP_PUBKEY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono mt-2 inline-flex min-h-[40px] items-center text-[11px] tracking-widest text-cotton/70 underline decoration-cotton/30 hover:text-kinetic active:text-kinetic"
                    >
                      DESCARGAR PUBKEY →
                    </a>
                  )}
                </div>
              )}

              <button
                onClick={openTelegram}
                className="mono mt-auto inline-flex min-h-[48px] items-center justify-center border border-kinetic bg-kinetic px-5 py-3 text-xs tracking-widest text-onyx transition hover:bg-cotton active:bg-cotton"
              >
                ENVIAR TX PROOF POR TELEGRAM →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
