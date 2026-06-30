import type { Metadata } from 'next'
import { getCaseStudies } from '@/lib/content'
import Container from '@/components/layout/Container'
import CaseStudyIndex from '@/components/trabajo/CaseStudyIndex'

export const metadata: Metadata = {
  title: 'Trabajo',
  description:
    'Ecosistemas de innovación construidos desde territorios no convencionales. ' +
    'Casos documentados con evidencia de lo que permanece.',
  openGraph: {
    title: 'Trabajo — Neil Meza',
    description:
      'Ecosistemas de innovación construidos desde territorios no convencionales.',
    type: 'website',
    images: [{ url: '/og/trabajo.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trabajo — Neil Meza',
    description:
      'Ecosistemas de innovación construidos desde territorios no convencionales.',
    images: ['/og/trabajo.png'],
  },
}

export default async function TrabajoPage() {
  const cases = await getCaseStudies()

  return (
    <main>
      <Container>
        <CaseStudyIndex cases={cases} />
      </Container>
    </main>
  )
}
