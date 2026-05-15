'use client';
import { useState } from 'react';
import { composeSysMsg, telegramUrl, TipoSolic } from '@/lib/telegram';

interface Props {
  tipo: TipoSolic;
  usuario?: string;
  idLote?: string;
  origen?: string;
  className?: string;
  children: React.ReactNode;
}

export default function TelegramButton({
  tipo,
  usuario,
  idLote,
  origen,
  className = '',
  children,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  async function onClick(e: React.MouseEvent) {
    e.preventDefault();
    const msg = composeSysMsg(tipo, usuario, idLote, origen);
    try {
      await navigator.clipboard.writeText(msg);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
    window.open(telegramUrl(), '_blank', 'noopener,noreferrer');
    setTimeout(() => setStatus('idle'), 2200);
  }

  return (
    <button onClick={onClick} className={className} aria-label="Abrir Telegram con mensaje copiado">
      {status === 'copied' ? '✓ MSG COPIADO · ABRIENDO TG…' : status === 'error' ? '⚠ COPIA MANUAL · ABRIENDO TG…' : children}
    </button>
  );
}
