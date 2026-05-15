import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

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
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="format-detection" content="telephone=no, email=no, address=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TZAM" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
