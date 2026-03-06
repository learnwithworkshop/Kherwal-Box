import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/santhali.css'
import I18nProvider from '@/providers/I18nProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OTT Platform - Santhal Community',
  description: 'Experience Santhal culture through video streaming | ᱥᱟᱱᱛᱟᱞ ᱥᱟᱦᱮᱫ ᱠᱚ ᱧᱮᱞ ᱠᱟᱱᱟ',
  keywords: 'Santhal, OTT, streaming, culture, videos, ᱥᱟᱱᱛᱟᱞᱤ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1f2937" />
        {/* Open Sans for supporting Ol Chiki script */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Ol+Chiki:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}