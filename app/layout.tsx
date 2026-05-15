import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://tzam.mx';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'TZAM // CONFITERÍA DE ALTA INGENIERÍA',
  description:
    'TZAM [50ml / 40g]. Sistema de entrega de sabor de alta concentración. San Luis Potosí, México.',
  openGraph: {
    title: 'TZAM // Confitería técnica',
    description: 'Estructura. Pureza. Sin distracciones. SLP_MX 2026.',
    type: 'website',
    locale: 'es_MX',
    url: SITE,
    siteName: 'TZAM',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'TZAM · Nº 01 CITRUS · Nº 02 MINT · Nº 03 CHERRY · Nº 04 KINETIC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TZAM',
    description: 'Confitería técnica. SLP_MX 2026.',
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
