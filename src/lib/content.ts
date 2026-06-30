/**
 * Content utilities — neilmeza.com
 *
 * Server-only. Never import this in Client Components.
 * Reads MDX files from /content/trabajo/ and /content/pensamiento/.
 * Uses gray-matter for frontmatter parsing.
 *
 * Data model: docs/16_BUILD_BRIEF.md §IV
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'

// ─────────────────────────────────────────────
// PATHS
// ─────────────────────────────────────────────

const CONTENT_DIR   = path.join(process.cwd(), 'content')
const TRABAJO_DIR   = path.join(CONTENT_DIR, 'trabajo')
const PENSAMIENTO_DIR = path.join(CONTENT_DIR, 'pensamiento')

// ─────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────

export interface CaseStudyFrontmatter {
  title: string
  slug: string
  projectName: string
  territory: string                   // e.g. "Antofagasta, Chile"
  period: string                      // e.g. "2018–2022"
  essencePhrase?: string              // 10–15 words for the index listing (docs/16_BUILD_BRIEF.md §II.2)
  sectors: string[]
  publishedAt: string                 // ISO 8601 date string
  updatedAt?: string
  documentationVersion: 'initial' | 'update-12m' | 'update-36m' | 'update-60m'
  status: 'published' | 'draft'
  metaDescription: string             // max 155 characters — SEO only
  ogImage?: string
  relatedEssays: string[]             // slugs from /pensamiento
}

export interface EssayFrontmatter {
  title: string
  subtitle: string
  slug: string
  publishedAt: string                 // ISO 8601 date string
  updatedAt?: string
  status: 'published' | 'draft'
  type: 'ensayo' | 'nota'             // determines typography + expected length
  readingTime: number                 // minutes; auto-calculated if missing in frontmatter
  tags: string[]
  relatedCases: string[]              // slugs from /trabajo
  metaDescription: string             // max 155 characters
  ogImage?: string
}

export interface CaseStudy extends CaseStudyFrontmatter {
  content: string                     // raw MDX body (after frontmatter)
}

export interface Essay extends EssayFrontmatter {
  content: string                     // raw MDX body (after frontmatter)
}

// ─────────────────────────────────────────────
// READING TIME
// ─────────────────────────────────────────────

const WORDS_PER_MINUTE = 250

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean)
  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE))
}

// ─────────────────────────────────────────────
// INTERNAL HELPERS
// ─────────────────────────────────────────────

/** gray-matter auto-parses YAML dates as JS Date objects. Convert to ISO string. */
function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().split('T')[0] ?? ''
  if (typeof value === 'string' && value.length > 0) return value
  return ''
}

/** List .mdx files in a directory. Returns [] if directory is missing or empty. */
function listMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => path.join(dir, f))
}

/** Read and parse a single MDX file. Returns null + logs warning on any failure. */
function parseMdxFile(filepath: string): { data: Record<string, unknown>; content: string } | null {
  try {
    const raw = fs.readFileSync(filepath, 'utf-8')
    const { data, content } = matter(raw)
    return { data, content }
  } catch (err) {
    console.warn(`[content] Failed to read or parse "${filepath}":`, err)
    return null
  }
}

// ─────────────────────────────────────────────
// FRONTMATTER VALIDATION
// ─────────────────────────────────────────────

const VALID_VERSIONS = new Set<string>(['initial', 'update-12m', 'update-36m', 'update-60m'])
const VALID_STATUSES = new Set<string>(['published', 'draft'])
const VALID_TYPES    = new Set<string>(['ensayo', 'nota'])

function validateCaseStudy(
  data: Record<string, unknown>,
  filepath: string,
): CaseStudyFrontmatter | null {
  const requiredStrings = [
    'title', 'slug', 'projectName', 'territory',
    'period', 'metaDescription',
  ] as const

  for (const field of requiredStrings) {
    if (typeof data[field] !== 'string' || !(data[field] as string).trim()) {
      console.warn(`[content] Missing or empty required field "${field}" in "${filepath}"`)
      return null
    }
  }

  const publishedAt = toDateString(data['publishedAt'])
  if (!publishedAt) {
    console.warn(`[content] Missing or invalid "publishedAt" in "${filepath}"`)
    return null
  }

  const docVersion = data['documentationVersion'] as string | undefined
  if (!docVersion || !VALID_VERSIONS.has(docVersion)) {
    console.warn(
      `[content] Invalid "documentationVersion" "${docVersion}" in "${filepath}". ` +
      `Must be one of: ${[...VALID_VERSIONS].join(', ')}`
    )
    return null
  }

  const status = data['status'] as string | undefined
  if (!status || !VALID_STATUSES.has(status)) {
    console.warn(
      `[content] Invalid "status" "${status}" in "${filepath}". ` +
      `Must be "published" or "draft"`
    )
    return null
  }

  return {
    title:                data['title'] as string,
    slug:                 data['slug'] as string,
    projectName:          data['projectName'] as string,
    territory:            data['territory'] as string,
    period:               data['period'] as string,
    essencePhrase:        typeof data['essencePhrase'] === 'string' ? data['essencePhrase'] : undefined,
    sectors:              Array.isArray(data['sectors']) ? (data['sectors'] as string[]) : [],
    publishedAt,
    updatedAt:            toDateString(data['updatedAt']) || undefined,
    documentationVersion: docVersion as CaseStudyFrontmatter['documentationVersion'],
    status:               status as 'published' | 'draft',
    metaDescription:      data['metaDescription'] as string,
    ogImage:              typeof data['ogImage'] === 'string' ? data['ogImage'] : undefined,
    relatedEssays:        Array.isArray(data['relatedEssays']) ? (data['relatedEssays'] as string[]) : [],
  }
}

function validateEssay(
  data: Record<string, unknown>,
  content: string,
  filepath: string,
): EssayFrontmatter | null {
  const requiredStrings = ['title', 'subtitle', 'slug', 'metaDescription'] as const

  for (const field of requiredStrings) {
    if (typeof data[field] !== 'string' || !(data[field] as string).trim()) {
      console.warn(`[content] Missing or empty required field "${field}" in "${filepath}"`)
      return null
    }
  }

  const publishedAt = toDateString(data['publishedAt'])
  if (!publishedAt) {
    console.warn(`[content] Missing or invalid "publishedAt" in "${filepath}"`)
    return null
  }

  const status = data['status'] as string | undefined
  if (!status || !VALID_STATUSES.has(status)) {
    console.warn(
      `[content] Invalid "status" "${status}" in "${filepath}". ` +
      `Must be "published" or "draft"`
    )
    return null
  }

  const type = data['type'] as string | undefined
  if (!type || !VALID_TYPES.has(type)) {
    console.warn(
      `[content] Invalid "type" "${type}" in "${filepath}". ` +
      `Must be "ensayo" or "nota"`
    )
    return null
  }

  // Use frontmatter value if provided and valid; otherwise calculate from content
  const frontmatterRT = Number(data['readingTime'])
  const readingTime = Number.isFinite(frontmatterRT) && frontmatterRT > 0
    ? frontmatterRT
    : calculateReadingTime(content)

  return {
    title:        data['title'] as string,
    subtitle:     data['subtitle'] as string,
    slug:         data['slug'] as string,
    publishedAt,
    updatedAt:    toDateString(data['updatedAt']) || undefined,
    status:       status as 'published' | 'draft',
    type:         type as 'ensayo' | 'nota',
    readingTime,
    tags:         Array.isArray(data['tags']) ? (data['tags'] as string[]) : [],
    relatedCases: Array.isArray(data['relatedCases']) ? (data['relatedCases'] as string[]) : [],
    metaDescription: data['metaDescription'] as string,
    ogImage:      typeof data['ogImage'] === 'string' ? data['ogImage'] : undefined,
  }
}

// ─────────────────────────────────────────────
// SORTING
// ─────────────────────────────────────────────

function sortByPublishedDesc<T extends { publishedAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

// ─────────────────────────────────────────────
// LOADERS — cached per request via React cache()
// cache() deduplicates calls within a single server render pass.
// ─────────────────────────────────────────────

/**
 * Returns all PUBLISHED case studies, sorted by publishedAt descending.
 * Files with invalid or missing required frontmatter fields are skipped with a warning.
 */
export const getCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  const files = listMdxFiles(TRABAJO_DIR)

  const results: CaseStudy[] = []

  for (const filepath of files) {
    const parsed = parseMdxFile(filepath)
    if (!parsed) continue

    const frontmatter = validateCaseStudy(parsed.data, filepath)
    if (!frontmatter) continue

    if (frontmatter.status !== 'published') continue

    results.push({ ...frontmatter, content: parsed.content })
  }

  return sortByPublishedDesc(results)
})

/**
 * Returns a single published case study by slug, or null if not found.
 */
export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  if (!slug || typeof slug !== 'string') return null

  const all = await getCaseStudies()
  return all.find(c => c.slug === slug) ?? null
}

/**
 * Returns all PUBLISHED essays, sorted by publishedAt descending.
 * Files with invalid or missing required frontmatter fields are skipped with a warning.
 */
export const getEssays = cache(async (): Promise<Essay[]> => {
  const files = listMdxFiles(PENSAMIENTO_DIR)

  const results: Essay[] = []

  for (const filepath of files) {
    const parsed = parseMdxFile(filepath)
    if (!parsed) continue

    const frontmatter = validateEssay(parsed.data, parsed.content, filepath)
    if (!frontmatter) continue

    if (frontmatter.status !== 'published') continue

    results.push({ ...frontmatter, content: parsed.content })
  }

  return sortByPublishedDesc(results)
})

/**
 * Returns a single published essay by slug, or null if not found.
 */
export async function getEssay(slug: string): Promise<Essay | null> {
  if (!slug || typeof slug !== 'string') return null

  const all = await getEssays()
  return all.find(e => e.slug === slug) ?? null
}
