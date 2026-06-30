import type { MetadataRoute } from 'next'
import { getCaseStudies, getEssays } from '@/lib/content'

// Sitemap — auto-generated from content directory
// Source: docs/14_SEO.md, docs/16_BUILD_BRIEF.md §XI
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://neilmeza.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl,                  priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/trabajo`,     priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/pensamiento`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/sobre`,       priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/construyamos`, priority: 0.7, changeFrequency: 'yearly' },
  ]

  const [caseStudies, essays] = await Promise.all([
    getCaseStudies(),
    getEssays(),
  ])

  const caseRoutes: MetadataRoute.Sitemap = caseStudies.map(c => ({
    url: `${baseUrl}/trabajo/${c.slug}`,
    lastModified: c.updatedAt ?? c.publishedAt,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }))

  const essayRoutes: MetadataRoute.Sitemap = essays.map(e => ({
    url: `${baseUrl}/pensamiento/${e.slug}`,
    lastModified: e.updatedAt ?? e.publishedAt,
    priority: e.type === 'ensayo' ? 0.8 : 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticRoutes, ...caseRoutes, ...essayRoutes]
}
