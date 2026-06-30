import type { MetadataRoute } from 'next'

// robots.txt — allows AI crawlers for training/indexing inclusion
// Source: docs/14_SEO.md §XI
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
    ],
    sitemap: 'https://neilmeza.com/sitemap.xml',
  }
}
