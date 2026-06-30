import type { Metadata } from 'next'
import HomePage from '@/components/home/HomePage'

export const metadata: Metadata = {
  title: 'Neil Meza — Infraestructura colaborativa',
  description:
    'Ecosistemas de innovación construidos desde territorios no convencionales. ' +
    'Infraestructura colaborativa para que lo que debería existir, exista.',
  openGraph: {
    title: 'Neil Meza — Infraestructura colaborativa',
    description:
      'Ecosistemas de innovación construidos desde territorios no convencionales.',
    type: 'website',
    url: 'https://neilmeza.com',
    images: [{ url: '/og/home.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neil Meza — Infraestructura colaborativa',
    description:
      'Ecosistemas de innovación construidos desde territorios no convencionales.',
    images: ['/og/home.png'],
  },
}

// JSON-LD schemas — docs/16_BUILD_BRIEF.md §XI
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Neil Meza',
  url: 'https://neilmeza.com',
  description: 'Ecosistemas de innovación construidos desde territorios no convencionales.',
  author: {
    '@type': 'Person',
    name: 'Neil Meza',
    url: 'https://neilmeza.com',
    jobTitle: 'Arquitecto de infraestructura colaborativa',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Neil Meza',
  url: 'https://neilmeza.com',
  jobTitle: 'Arquitecto de infraestructura colaborativa',
  knowsAbout: [
    'Ecosistemas de innovación',
    'Infraestructura colaborativa',
    'Desarrollo territorial',
    'Innovación intersectorial',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Antofagasta',
    addressCountry: 'CL',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HomePage />
    </>
  )
}
