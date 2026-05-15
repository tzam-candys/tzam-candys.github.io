export const dynamicParams = false;

export function generateStaticParams() {
  return [{ hash: 'demo' }];
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;

  return (
    <main className="min-h-screen px-6 sm:px-12 py-16 text-cotton">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="mono text-[11px] text-cotton/50 tracking-widest">
          /verify/{hash}
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          [ AUTENTICIDAD_VERIFICADA ]
        </h1>
        <div className="border border-kinetic/40 bg-kinetic/5 px-6 py-4 mono text-xs text-kinetic">
          ✓ Hash reconocido. Lote producido en San Luis Potosí.
        </div>

        <section className="border border-cotton/10 p-6 sm:p-8 mono text-xs sm:text-sm space-y-3">
          <div className="text-cotton/50 tracking-widest mb-4">REPORTE_DE_LABORATORIO</div>
          {[
            ['ID_LOTE', `LOTE_00_${hash.slice(0, 6).toUpperCase()}`],
            ['pH', '2.4 ± 0.1'],
            ['T_FINAL_COCCIÓN', '150.2°C'],
            ['HUMEDAD_RESIDUAL', '0.8%'],
            ['PUREZA_ACEITE_ESENCIAL', '99.4%'],
            ['CAFEÍNA_POR_PIEZA', '7.0mg ± 0.5 (solo Nº 04)'],
            ['FECHA_PRODUCCIÓN', '2026-05-15T10:32:00-06:00'],
            ['SHA-256', hash],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[180px_1fr] gap-3 border-b border-cotton/10 py-2">
              <span className="text-cotton/50">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </section>

        <div className="mono text-[10px] text-cotton/30">
          {'// sorpresa_digital: revisa el comentario en el index.html para tu siguiente lote.'}
        </div>

        <a
          href="../../"
          className="inline-block mono text-xs tracking-widest border border-cotton/30 px-5 py-3 hover:border-kinetic hover:text-kinetic"
        >
          ← VOLVER AL SISTEMA
        </a>
      </div>
    </main>
  );
}
