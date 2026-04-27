import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '3J Interior | Gudang WPC, Wall Panel, Wallboard Harga Grosir Jakarta',
  description: 'Supplier dan distributor WPC wall panel, wallboard, decking, UV marmer, holo, dan list alumunium berkualitas. Harga grosir langsung gudang, melayani seluruh Indonesia.',
  keywords: 'WPC wall panel, wallboard, decking, UV marmer, holo alumunium, material interior, harga grosir, Jakarta, 3J Interior',
  openGraph: {
    title: '3J Interior | Material Interior WPC Premium Harga Grosir',
    description: 'Gudang WPC, Wall Panel, Wallboard, Decking, UV Marmer - Harga Import, Grosir dan Murah',
    url: 'https://3jinterior.com',
    siteName: '3J Interior',
    locale: 'id_ID',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://3jinterior.com' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
