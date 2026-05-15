'use client';
import { useState } from 'react';

export default function NotifyForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    try {
      const list = JSON.parse(localStorage.getItem('tzam_waitlist') || '[]');
      list.push({ email, at: new Date().toISOString() });
      localStorage.setItem('tzam_waitlist', JSON.stringify(list));
    } catch {}
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mono text-xs text-kinetic border border-kinetic/40 bg-kinetic/5 px-4 py-3">
        ✓ Sistema notificará al activarse LOTE_00.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 mono text-xs">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="_email para activación de sistema"
        className="flex-1 bg-transparent border border-cotton/20 px-4 py-3 focus:border-kinetic outline-none placeholder:text-cotton/30"
      />
      <button
        type="submit"
        className="border border-kinetic text-kinetic px-6 py-3 tracking-widest hover:bg-kinetic hover:text-onyx transition"
      >
        NOTIFICAR
      </button>
    </form>
  );
}
