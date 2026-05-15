export const PACK_PAYMENT_URL =
  process.env.NEXT_PUBLIC_PACK_PAYMENT_URL ||
  'https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=REEMPLAZAR_POR_LINK_DEL_PACK_TZAM';

export const PACK_PRICE = 179;
export const PACK_NAME = 'Pack de 3';
export const PACK_FLAVORS = ['Citrus', 'Mint', 'Cherry'];

const MP_RAW = (process.env.NEXT_PUBLIC_MP_ENABLED || '').toLowerCase().trim();
export const MP_ENABLED = !(MP_RAW === 'false' || MP_RAW === '0' || MP_RAW === 'no' || MP_RAW === 'off');

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'tzam-candys@proton.me';

export function mailtoUrl(subject = 'Consulta TZAM', body = '') {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${CONTACT_EMAIL}${params.length ? `?${params.join('&')}` : ''}`;
}

const RAW_CHANNEL = (process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || '').trim().replace(/^@/, '');
export const TELEGRAM_CHANNEL = RAW_CHANNEL;
export const TELEGRAM_CHANNEL_URL = RAW_CHANNEL ? `https://t.me/${RAW_CHANNEL}` : '';

export const PGP_FINGERPRINT = (process.env.NEXT_PUBLIC_PGP_FINGERPRINT || '').trim();
export const PGP_PUBKEY_URL = (process.env.NEXT_PUBLIC_PGP_PUBKEY_URL || '').trim();

export const XMR_ADDRESS = process.env.NEXT_PUBLIC_XMR_ADDRESS || '';
export const XMR_AMOUNT_PACK = process.env.NEXT_PUBLIC_XMR_AMOUNT_PACK || '';
export const XMR_AMOUNT_SINGLE = process.env.NEXT_PUBLIC_XMR_AMOUNT_SINGLE || '';
export const XMR_BATCH_LABEL = process.env.NEXT_PUBLIC_XMR_BATCH_LABEL || '';
export const XMR_RATE_MXN = process.env.NEXT_PUBLIC_XMR_RATE_MXN || '';
export const XMR_BATCH_OPENED_AT = process.env.NEXT_PUBLIC_XMR_BATCH_OPENED_AT || '';
export const XMR_BATCH_CLOSE_AFTER_DAYS = process.env.NEXT_PUBLIC_XMR_BATCH_CLOSE_AFTER_DAYS || '';
export const XMR_ENABLED = XMR_ADDRESS.length > 0;
export const XMR_FINGERPRINT = XMR_ADDRESS
  ? `${XMR_ADDRESS.slice(0, 6)}…${XMR_ADDRESS.slice(-6)}`
  : '';

export function batchCloseInfo(openedAt: string, closeAfterDays: string) {
  if (!openedAt || !closeAfterDays) return null;
  const days = Number(closeAfterDays);
  if (!Number.isFinite(days) || days <= 0) return null;
  const opened = new Date(`${openedAt}T00:00:00Z`).getTime();
  if (!Number.isFinite(opened)) return null;
  const closeMs = opened + days * 86400000;
  return {
    closesAt: new Date(closeMs).toISOString().slice(0, 10),
    closesAtMs: closeMs,
  };
}

export function moneroUri(
  address: string,
  amount?: string,
  description?: string
) {
  if (!address) return '';
  const params: string[] = [];
  if (amount) params.push(`tx_amount=${encodeURIComponent(amount)}`);
  if (description) params.push(`tx_description=${encodeURIComponent(description)}`);
  return params.length ? `monero:${address}?${params.join('&')}` : `monero:${address}`;
}
