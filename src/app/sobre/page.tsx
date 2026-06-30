import type { Metadata } from 'next'
import AboutPage from '@/components/sobre/AboutPage'

export const metadata: Metadata = {
  title: 'Sobre Neil Meza',
  description:
    'Arquitecto de infraestructura colaborativa basado en Antofagasta, Chile. ' +
    'El origen, la tesis y el trabajo detrás de neilmeza.com.',
  openGraph: {
    title: 'Sobre Neil Meza',
    description:
      'El origen, la tesis y el trabajo detrás de la infraestructura colaborativa.',
    type: 'profile',
    images: [{ url: '/og/sobre.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Neil Meza',
    description:
      'El origen, la tesis y el trabajo detrás de la infraestructura colaborativa.',
    images: ['/og/sobre.png'],
  },
}

// JSON-LD Person schema — docs/16_BUILD_BRIEF.md §XI
// "En /sobre — Person schema completo"
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Neil Meza',
  url: 'https://neilmeza.com',
  email: 'contact@neilmeza.com',
  jobTitle: 'Arquitecto de infraestructura colaborativa',
  description:
    'Ecosistemas de innovación construidos desde territorios no convencionales.',
  knowsAbout: [
    'Ecosistemas de innovación',
    'Infraestructura colaborativa',
    'Desarrollo territorial',
    'Innovación intersectorial',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Antofagasta',
    addressRegion: 'Antofagasta',
    addressCountry: 'CL',
  },
  // TODO: Add when social profiles are confirmed:
  // sameAs: ['[LinkedIn URL]', '[Twitter/X URL]'],
  // TODO: Add when available:
  // alumniOf: [{ '@type': 'EducationalOrganization', name: '...' }],
  // memberOf: [{ '@type': 'Organization', name: '...' }],
}

export default function SobrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutPage />
    </>
  )
}
