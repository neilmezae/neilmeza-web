import Link from 'next/link'
import styles from './CaseStudyConnections.module.css'

interface CaseStudyConnectionsProps {
  relatedEssays: string[]     // slugs from /pensamiento
  nextCaseSlug?: string       // slug of next case study for sequential navigation
  nextCaseTitle?: string
}

// Narrative connectors at the bottom of each case study.
// Source: docs/05_INFORMATION_ARCHITECTURE.md §VIII
// "Al final de cada caso, un enlace al siguiente caso y al ensayo de Pensamiento más relacionado."
// "Not a generic 'Ver también' — a specific narrative connector."
export default function CaseStudyConnections({
  relatedEssays,
  nextCaseSlug,
  nextCaseTitle,
}: CaseStudyConnectionsProps) {
  const hasConnections = relatedEssays.length > 0 || nextCaseSlug

  if (!hasConnections) return null

  return (
    <aside className={styles.connections} aria-label="Contenido relacionado">
      <div className={styles.divider} />

      <div className={styles.grid}>
        {relatedEssays.length > 0 && (
          <div className={styles.connection}>
            <span className={styles.connectionLabel}>El argumento detrás de este caso</span>
            <ul className={styles.essayList}>
              {relatedEssays.map((essaySlug) => (
                <li key={essaySlug}>
                  <Link
                    href={`/pensamiento/${essaySlug}`}
                    className={styles.connectionLink}
                  >
                    {/* TODO: Resolve essay title from slug — requires getEssay() lookup */}
                    Leer el ensayo relacionado →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {nextCaseSlug && (
          <div className={styles.connection}>
            <span className={styles.connectionLabel}>Siguiente caso</span>
            <Link
              href={`/trabajo/${nextCaseSlug}`}
              className={styles.connectionLink}
            >
              {nextCaseTitle ?? nextCaseSlug} →
            </Link>
          </div>
        )}
      </div>

      {/* Primary CTA */}
      <div className={styles.cta}>
        <p className={styles.ctaText}>
          Si lo que documenta este caso resuena con lo que estás construyendo —
        </p>
        <Link href="/construyamos" className={styles.ctaLink}>
          Hablemos →
        </Link>
      </div>
    </aside>
  )
}
