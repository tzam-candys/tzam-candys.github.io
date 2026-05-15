import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://tzam.mx';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'TZAM | Dulces premium de sabor intenso en SLP',
  description:
    'Dulces duros premium hechos en San Luis Potosí. Prueba Citrus, Mint y Cherry en un pack de 3 con envío nacional incluido.',
  openGraph: {
    title: 'TZAM | Dulces premium de sabor intenso',
    description:
      'Pack de 3 dulces duros premium hechos en San Luis Potosí, con envío nacional incluido.',
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
    title: 'TZAM | Dulces premium',
    description: 'Sabor intenso hecho en San Luis Potosí.',
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
