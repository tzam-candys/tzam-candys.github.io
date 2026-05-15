#!/usr/bin/env node
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'public');
const OUT_FILE = resolve(OUT_DIR, 'xmr-qr.svg');
const META_FILE = resolve(OUT_DIR, 'xmr-meta.json');

// MXN reference prices (must match lib/checkout.ts / data/batches.json).
const PRICE_MXN_PACK = 179;
const PRICE_MXN_SINGLE = 39;

const address = (process.env.NEXT_PUBLIC_XMR_ADDRESS || '').trim();
let amountPack = (process.env.NEXT_PUBLIC_XMR_AMOUNT_PACK || '').trim();
let amountSingle = (process.env.NEXT_PUBLIC_XMR_AMOUNT_SINGLE || '').trim();
const batchLabel = (process.env.NEXT_PUBLIC_XMR_BATCH_LABEL || '').trim();
let rateMxn = (process.env.NEXT_PUBLIC_XMR_RATE_MXN || '').trim();
const openedAt = (process.env.NEXT_PUBLIC_XMR_BATCH_OPENED_AT || '').trim();
const closeAfterDays = (process.env.NEXT_PUBLIC_XMR_BATCH_CLOSE_AFTER_DAYS || '').trim();

const DERIVE = process.env.XMR_DERIVE_AMOUNTS === '1';
const OFFLINE = process.env.XMR_OFFLINE === '1';
const STRICT = process.env.XMR_BUILD_STRICT === '1';

if (!address) {
  console.log('[xmr] NEXT_PUBLIC_XMR_ADDRESS unset — XMR pay disabled in this build.');
  process.exit(0);
}

const ADDR_BASE58 = /^[1-9A-HJ-NP-Za-km-z]+$/;
function validateAddress(a) {
  const len = a.length;
  if (len !== 95 && len !== 106) return `length ${len}, expected 95 or 106`;
  if (!/^[48]/.test(a)) return `prefix '${a[0]}' — expected 4 (main/integrated) or 8 (subaddress)`;
  if (!ADDR_BASE58.test(a)) return 'contains non-Base58 characters';
  return null;
}

const addrError = validateAddress(address);
if (addrError) {
  console.error(`[xmr] ❌ NEXT_PUBLIC_XMR_ADDRESS invalid: ${addrError}`);
  console.error(`[xmr]    value (truncated): ${address.slice(0, 12)}…${address.slice(-6)}`);
  process.exit(1);
}

function validateAmount(name, v) {
  if (!v) return null;
  if (!/^\d+(\.\d{1,12})?$/.test(v)) return `${name} not a positive decimal: '${v}'`;
  if (Number(v) <= 0) return `${name} must be > 0`;
  return null;
}

for (const [k, v] of [
  ['NEXT_PUBLIC_XMR_AMOUNT_PACK', amountPack],
  ['NEXT_PUBLIC_XMR_AMOUNT_SINGLE', amountSingle],
  ['NEXT_PUBLIC_XMR_RATE_MXN', rateMxn],
]) {
  const err = validateAmount(k, v);
  if (err) {
    console.error(`[xmr] ❌ ${err}`);
    process.exit(1);
  }
}

let rateSource = rateMxn ? 'env' : null;
let rateAt = null;

if (!rateMxn && !OFFLINE) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 7000);
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=mxn',
      { signal: ctrl.signal, headers: { Accept: 'application/json' } }
    );
    clearTimeout(timer);
    if (res.ok) {
      const json = await res.json();
      const v = json?.monero?.mxn;
      if (typeof v === 'number' && v > 0) {
        rateMxn = v.toFixed(2);
        rateSource = 'coingecko';
        rateAt = new Date().toISOString();
        console.log(`[xmr] rate fetched: 1 XMR = ${rateMxn} MXN (coingecko)`);
      }
    } else {
      console.warn(`[xmr] rate fetch HTTP ${res.status} — continuing without rate`);
    }
  } catch (e) {
    console.warn(`[xmr] rate fetch failed: ${e.message} — continuing without rate`);
  }
}

if (DERIVE && rateMxn) {
  const r = Number(rateMxn);
  const round = (mxn) => (mxn / r).toFixed(4);
  if (!amountPack) {
    amountPack = round(PRICE_MXN_PACK);
    console.log(`[xmr] derived amountPack=${amountPack} XMR from ${PRICE_MXN_PACK} MXN`);
  }
  if (!amountSingle) {
    amountSingle = round(PRICE_MXN_SINGLE);
    console.log(`[xmr] derived amountSingle=${amountSingle} XMR from ${PRICE_MXN_SINGLE} MXN`);
  }
}

if (STRICT) {
  const missing = [];
  if (!amountPack) missing.push('NEXT_PUBLIC_XMR_AMOUNT_PACK');
  if (!batchLabel) missing.push('NEXT_PUBLIC_XMR_BATCH_LABEL');
  if (missing.length) {
    console.error(`[xmr] ❌ STRICT mode missing: ${missing.join(', ')}`);
    process.exit(1);
  }
}

// Auto-close horizon for logging only (UI computes from same env vars).
let closed = false;
let closesAt = null;
if (openedAt && closeAfterDays) {
  const days = Number(closeAfterDays);
  if (Number.isFinite(days) && days > 0) {
    const opened = new Date(openedAt + 'T00:00:00Z').getTime();
    if (Number.isFinite(opened)) {
      const close = opened + days * 86400000;
      closesAt = new Date(close).toISOString().slice(0, 10);
      closed = Date.now() > close;
    }
  }
}

const safeBatch = batchLabel || 'LOTE';
const uri = amountPack
  ? `monero:${address}?tx_amount=${amountPack}&tx_description=TZAM_${safeBatch}_PACK`
  : `monero:${address}`;

await mkdir(OUT_DIR, { recursive: true });

const svg = await QRCode.toString(uri, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 1,
  color: { dark: '#0a0a0a', light: '#f5f3ee' },
  width: 512,
});

await writeFile(OUT_FILE, svg, 'utf8');

const fingerprint = `${address.slice(0, 6)}…${address.slice(-6)}`;
const meta = {
  batchLabel: safeBatch,
  fingerprint,
  amountPack: amountPack || null,
  amountSingle: amountSingle || null,
  rateMxn: rateMxn || null,
  rateSource,
  rateAt,
  openedAt: openedAt || null,
  closeAfterDays: closeAfterDays ? Number(closeAfterDays) : null,
  closesAt,
  closed,
  generatedAt: new Date().toISOString(),
};
await writeFile(META_FILE, JSON.stringify(meta, null, 2) + '\n', 'utf8');

// Propagate derived values to `next build` (separate child process) via
// .env.production.local — Next reads this file at build time and inlines
// NEXT_PUBLIC_* vars into the client bundle.
{
  const ENV_FILE = resolve(ROOT, '.env.production.local');
  const lines = [
    '# Generated by scripts/gen-xmr-qr.mjs — do not edit, do not commit.',
    `NEXT_PUBLIC_XMR_ADDRESS=${address}`,
    `NEXT_PUBLIC_XMR_AMOUNT_PACK=${amountPack || ''}`,
    `NEXT_PUBLIC_XMR_AMOUNT_SINGLE=${amountSingle || ''}`,
    `NEXT_PUBLIC_XMR_BATCH_LABEL=${safeBatch}`,
    `NEXT_PUBLIC_XMR_RATE_MXN=${rateMxn || ''}`,
    `NEXT_PUBLIC_XMR_BATCH_OPENED_AT=${openedAt || ''}`,
    `NEXT_PUBLIC_XMR_BATCH_CLOSE_AFTER_DAYS=${closeAfterDays || ''}`,
  ];
  await writeFile(ENV_FILE, lines.join('\n') + '\n', 'utf8');
}

console.log(
  `[xmr] ✓ ${safeBatch} · ${fingerprint} · pack=${amountPack || '—'} XMR · rate=${rateMxn || '—'}` +
    (closesAt ? ` · cierra=${closesAt}${closed ? ' [CLOSED]' : ''}` : '')
);

// Export resolved values for downstream workflow steps.
if (process.env.GITHUB_OUTPUT) {
  const { appendFile } = await import('node:fs/promises');
  const lines = [
    `xmr_batch_label=${safeBatch}`,
    `xmr_fingerprint=${fingerprint}`,
    `xmr_amount_pack=${amountPack || ''}`,
    `xmr_amount_single=${amountSingle || ''}`,
    `xmr_rate_mxn=${rateMxn || ''}`,
    `xmr_opened_at=${openedAt || ''}`,
    `xmr_closes_at=${closesAt || ''}`,
    `xmr_closed=${closed ? '1' : ''}`,
  ];
  await appendFile(process.env.GITHUB_OUTPUT, lines.join('\n') + '\n');
}
