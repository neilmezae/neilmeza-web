import type { Metadata } from 'next'
import ContactPage from '@/components/construyamos/ContactPage'

export const metadata: Metadata = {
  title: 'Construyamos',
  description:
    'Empieza aquí si hay algo que construir. Cuatro preguntas para iniciar ' +
    'la conversación correcta con Neil Meza.',
  openGraph: {
    title: 'Construyamos — Neil Meza',
    description:
      'Cuatro preguntas para iniciar la conversación correcta.',
    type: 'website',
    images: [{ url: '/og/construyamos.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construyamos — Neil Meza',
    description:
      'Cuatro preguntas para iniciar la conversación correcta.',
    images: ['/og/construyamos.png'],
  },
  robots: {
    // Discourage indexing of the contact page to reduce spam surface.
    index: true,
    follow: true,
  },
}

export default function ConstruyamosPage() {
  return <ContactPage />
}
