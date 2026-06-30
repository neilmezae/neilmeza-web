import type { Metadata } from 'next'
import { getEssays } from '@/lib/content'
import Container from '@/components/layout/Container'
import EssayIndex from '@/components/pensamiento/EssayIndex'

export const metadata: Metadata = {
  title: 'Pensamiento',
  description:
    'Ensayos y perspectivas sobre innovación colaborativa, territorios no convencionales ' +
    'y los sistemas que hacen posible lo que todavía no existe.',
  openGraph: {
    title: 'Pensamiento — Neil Meza',
    description:
      'Ensayos sobre innovación colaborativa y los sistemas que hacen posible lo que todavía no existe.',
    type: 'website',
    images: [{ url: '/og/pensamiento.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pensamiento — Neil Meza',
    description:
      'Ensayos sobre innovación colaborativa y los sistemas que hacen posible lo que todavía no existe.',
    images: ['/og/pensamiento.png'],
  },
}

export default async function PensamientoPage() {
  const essays = await getEssays()

  return (
    <main>
      <Container>
        <EssayIndex essays={essays} />
      </Container>
    </main>
  )
}
