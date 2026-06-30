/*
 * Root Layout — neilmeza.com
 *
 * FONTS — TODO: Set up next/font/local when licensed typefaces are available.
 *
 *   Target typefaces (docs/07_VISUAL_IDENTITY.md §III):
 *     Sans:  Söhne (Klim Type Foundry) — weights 300, 400, 500, 600, 700
 *     Serif: Tiempos Text (Klim Type Foundry) — weights 400, 400 italic
 *
 *   Steps when font files are ready:
 *     1. Place .woff2 files in /public/fonts/ (Latin subset, each < 50KB)
 *     2. Uncomment and configure the localFont imports below
 *     3. Apply font variables to <html> className
 *     4. Update --font-sans / --font-serif in tokens.css
 *
 *   Example (do not activate until files exist):
 *
 *   import localFont from 'next/font/local'
 *
 *   const sohne = localFont({
 *     src: [
 *       { path: '../../public/fonts/sohne-leicht.woff2',     weight: '300', style: 'normal' },
 *       { path: '../../public/fonts/sohne-buch.woff2',       weight: '400', style: 'normal' },
 *       { path: '../../public/fonts/sohne-kraftig.woff2',    weight: '500', style: 'normal' },
 *       { path: '../../public/fonts/sohne-halbfett.woff2',   weight: '600', style: 'normal' },
 *       { path: '../../public/fonts/sohne-dreiviertelfett.woff2', weight: '700', style: 'normal' },
 *     ],
 *     variable: '--font-sans',
 *     display: 'swap',
 *     preload: true,
 *   })
 *
 *   const tiemposText = localFont({
 *     src: [
 *       { path: '../../public/fonts/tiempos-text-regular.woff2',      weight: '400', style: 'normal' },
 *       { path: '../../public/fonts/tiempos-text-regular-italic.woff2', weight: '400', style: 'italic' },
 *     ],
 *     variable: '--font-serif',
 *     display: 'optional',
 *     preload: false,
 *   })
 */

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://neilmeza.com'),
  title: {
    default: 'Neil Meza — Infraestructura colaborativa',
    template: '%s — Neil Meza',
  },
  // TODO: Replace with final approved copy — docs/16_BUILD_BRIEF.md §XI
  description: 'TODO: Homepage meta description (max 155 chars)',
  openGraph: {
    siteName: 'Neil Meza',
    locale: 'es_CL',
    type: 'website',
    // TODO: Add OG image — /public/og/home.png (1200×630px)
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  // TODO: Add verification tokens when Search Console is configured
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    /*
     * TODO (fonts): Add font variable classNames here when next/font is configured.
     * e.g. className={`${sohne.variable} ${tiemposText.variable}`}
     */
    <html lang="es">
      <body>
        <NavBar />
        {children}
        <Footer />

        {/* Plausible Analytics — cookieless, GDPR-compliant, 1KB */}
        {process.env.NODE_ENV === 'production' && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'neilmeza.com'}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  )
}
