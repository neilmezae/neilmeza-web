import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getEssays, getEssay } from '@/lib/content'
import EssayPage from '@/components/pensamiento/EssayPage'

// In Next.js 15, params is a Promise — always await it.
interface PageProps {
  params: Promise<{ slug: string }>
}

// Pre-render all published essays at build time.
// Returns [] when no essays are published — no pages generated.
export async function generateStaticParams() {
  const essays = await getEssays()
  return essays.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const essay = await getEssay(slug)

  if (!essay) return { title: 'Ensayo no encontrado' }

  return {
    title: essay.title,
    description: essay.metaDescription,
    openGraph: {
      title: `${essay.title} — Neil Meza`,
      description: essay.metaDescription,
      type: 'article',
      publishedTime: essay.publishedAt,
      modifiedTime: essay.updatedAt,
      // TODO: Add og:image when essay OG images are created — /public/og/pensamiento-[slug].png
    },
    other: {
      // TODO: Add JSON-LD Article schema — docs/16_BUILD_BRIEF.md §XI
    },
  }
}

export default async function EssaySlugPage({ params }: PageProps) {
  const { slug } = await params
  const essay = await getEssay(slug)

  if (!essay) notFound()

  return <EssayPage essay={essay} />
}
