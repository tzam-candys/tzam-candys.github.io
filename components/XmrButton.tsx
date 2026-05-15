'use client';
import { useState } from 'react';
import XmrPayModal from './XmrPayModal';

interface Props {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export default function XmrButton({ className = '', children, ariaLabel }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-label={ariaLabel || 'Pagar con Monero XMR'}
      >
        {children}
      </button>
      <XmrPayModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
