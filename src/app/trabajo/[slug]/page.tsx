import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCaseStudies, getCaseStudy } from '@/lib/content'
import CaseStudyPage from '@/components/trabajo/CaseStudyPage'

// In Next.js 15, params is a Promise — always await it.
interface PageProps {
  params: Promise<{ slug: string }>
}

// Pre-render all published case studies at build time.
// Returns [] when no content is published — no pages generated.
export async function generateStaticParams() {
  const cases = await getCaseStudies()
  return cases.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) return { title: 'Caso no encontrado' }

  return {
    title: caseStudy.title,
    description: caseStudy.metaDescription,
    openGraph: {
      title: `${caseStudy.title} — Neil Meza`,
      description: caseStudy.metaDescription,
      type: 'article',
      publishedTime: caseStudy.publishedAt,
      modifiedTime: caseStudy.updatedAt,
      // TODO: Add og:image when case OG images are created — /public/og/trabajo-[slug].png
    },
    other: {
      // TODO: Add JSON-LD ScholarlyArticle schema — docs/16_BUILD_BRIEF.md §XI
    },
  }
}

export default async function CaseStudySlugPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) notFound()

  return <CaseStudyPage caseStudy={caseStudy} />
}
