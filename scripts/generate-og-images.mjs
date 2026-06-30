/**
 * OG Image Generator — neilmeza.com
 * Creates placeholder 1200×630 PNG files in public/og/.
 *
 * Uses Sharp + SVG rendering so no external services are needed.
 * Run: node scripts/generate-og-images.mjs
 *
 * Replace outputs with final designed images before launch.
 * Design brief: docs/07_VISUAL_IDENTITY.md §IV, docs/14_SEO.md §VII
 *
 * Spec: 1200×630 — standard OG image ratio (1.91:1)
 * Brand tokens used (from docs/08_DESIGN_SYSTEM.md):
 *   background:   #F9F8F6  (--primitive-stone-0)
 *   text-primary: #0E0D0C  (--primitive-stone-950)
 *   text-sec:     #57534E  (--primitive-stone-600)
 *   accent:       #A0522D  (--primitive-copper-500)
 *   border:       #E7E5E4  (--primitive-stone-100)
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'og')

const W = 1200
const H = 630

// Brand colors (match tokens.css primitives)
const BG        = '#F9F8F6'
const TEXT      = '#0E0D0C'
const TEXT_SEC  = '#57534E'
const TEXT_TER  = '#A8A29E'
const ACCENT    = '#A0522D'
const BORDER    = '#E7E5E4'

const PAGES = [
  {
    file: 'home.png',
    label: 'neilmeza.com',
    title: 'La innovación no falla por escasez de talento.\nFalla por ausencia\nde infraestructura.',
    subtitle: 'Arquitecto de infraestructura colaborativa — Antofagasta, Chile',
  },
  {
    file: 'trabajo.png',
    label: 'Trabajo — neilmeza.com',
    title: 'Ecosistemas\nconstruidos',
    subtitle: 'Casos documentados con evidencia de lo que permanece.',
  },
  {
    file: 'pensamiento.png',
    label: 'Pensamiento — neilmeza.com',
    title: 'Ideas\nen desarrollo',
    subtitle: 'Ensayos sobre innovación, colaboración y los sistemas que hacen posible lo que todavía no existe.',
  },
  {
    file: 'sobre.png',
    label: 'Sobre Neil — neilmeza.com',
    title: 'Neil Meza',
    subtitle: 'Arquitecto de infraestructura colaborativa basado en Antofagasta, Chile.',
  },
  {
    file: 'construyamos.png',
    label: 'Construyamos — neilmeza.com',
    title: 'Empieza aquí\nsi hay algo\nque construir.',
    subtitle: 'Cuatro preguntas para iniciar la conversación correcta.',
  },
]

function wrapLines(text, maxChars) {
  return text.split('\n').map((line) => {
    if (line.length <= maxChars) return [line]
    const words = line.split(' ')
    const lines = []
    let current = ''
    for (const word of words) {
      if ((current + ' ' + word).trim().length > maxChars) {
        if (current) lines.push(current)
        current = word
      } else {
        current = (current + ' ' + word).trim()
      }
    }
    if (current) lines.push(current)
    return lines
  }).flat()
}

function buildSvg({ label, title, subtitle }) {
  const titleLines = wrapLines(title, 28)
  const subtitleLines = wrapLines(subtitle, 58)

  const TITLE_SIZE = 72
  const TITLE_LINE_H = 82
  const SUB_SIZE = 26
  const SUB_LINE_H = 38

  const titleBlockH = titleLines.length * TITLE_LINE_H
  const subBlockH = subtitleLines.length * SUB_LINE_H

  // Vertical rhythm: accent bar → label → gap → title → gap → subtitle → bottom branding
  const MARGIN = 72
  const LABEL_Y = MARGIN + 16
  const TITLE_Y = LABEL_Y + 48
  const SUB_Y = TITLE_Y + titleBlockH + 28

  const BRAND_Y = H - MARGIN

  const titleSvg = titleLines
    .map((line, i) =>
      `<text x="${MARGIN}" y="${TITLE_Y + i * TITLE_LINE_H}"
        font-family="Georgia, serif"
        font-size="${TITLE_SIZE}"
        font-weight="700"
        fill="${TEXT}"
        letter-spacing="-1.5"
      >${escapeXml(line)}</text>`,
    )
    .join('\n    ')

  const subSvg = subtitleLines
    .map((line, i) =>
      `<text x="${MARGIN}" y="${SUB_Y + i * SUB_LINE_H}"
        font-family="Arial, sans-serif"
        font-size="${SUB_SIZE}"
        font-weight="400"
        fill="${TEXT_SEC}"
      >${escapeXml(line)}</text>`,
    )
    .join('\n    ')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <!-- background -->
  <rect width="${W}" height="${H}" fill="${BG}" />

  <!-- accent bar top -->
  <rect x="0" y="0" width="${W}" height="5" fill="${ACCENT}" />

  <!-- bottom border -->
  <line x1="${MARGIN}" y1="${BRAND_Y - 24}" x2="${W - MARGIN}" y2="${BRAND_Y - 24}"
    stroke="${BORDER}" stroke-width="1" />

  <!-- page label -->
  <text x="${MARGIN}" y="${LABEL_Y}"
    font-family="Arial, sans-serif"
    font-size="15"
    font-weight="500"
    fill="${TEXT_TER}"
    letter-spacing="2"
    text-transform="uppercase"
  >${escapeXml(label.toUpperCase())}</text>

  <!-- main title -->
  ${titleSvg}

  <!-- subtitle -->
  ${subSvg}

  <!-- bottom branding -->
  <text x="${MARGIN}" y="${BRAND_Y}"
    font-family="Arial, sans-serif"
    font-size="18"
    font-weight="600"
    fill="${TEXT}"
  >Neil Meza</text>
  <text x="${W - MARGIN}" y="${BRAND_Y}"
    font-family="Arial, sans-serif"
    font-size="15"
    fill="${TEXT_TER}"
    text-anchor="end"
  >neilmeza.com</text>
</svg>`
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

async function generate() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  for (const page of PAGES) {
    const svg = buildSvg(page)
    const outPath = path.join(OUT_DIR, page.file)

    await sharp(Buffer.from(svg))
      .resize(W, H)
      .png({ compressionLevel: 9 })
      .toFile(outPath)

    console.log(`✓ ${page.file}`)
  }

  console.log(`\nAll OG images written to public/og/`)
  console.log('Replace with final designed images before launch.')
}

generate().catch((err) => {
  console.error('Generation failed:', err)
  process.exit(1)
})
