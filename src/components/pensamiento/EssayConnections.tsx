import Link from 'next/link'
import styles from './EssayConnections.module.css'

interface EssayConnectionsProps {
  relatedCases: string[]
  nextEssaySlug?: string
  nextEssayTitle?: string
}

// Narrative connectors at the bottom of each essay.
// Related cases + next essay + CTA to /construyamos.
// Source: docs/05_INFORMATION_ARCHITECTURE.md §VIII
export default function EssayConnections({
  relatedCases,
  nextEssaySlug,
  nextEssayTitle,
}: EssayConnectionsProps) {
  const hasRelatedCases = relatedCases.length > 0
  const hasNext = Boolean(nextEssaySlug && nextEssayTitle)
  const hasConnections = hasRelatedCases || hasNext

  return (
    <aside className={styles.connections} aria-label="Lecturas relacionadas y continuación">
      <div className={styles.divider} />

      {hasConnections && (
        <div className={styles.grid}>
          {hasRelatedCases && (
            <div className={styles.connection}>
              <p className={styles.connectionLabel}>Esto se ve en acción en</p>
              <ul className={styles.caseList}>
                {relatedCases.map((slug) => (
                  <li key={slug}>
                    <Link href={`/trabajo/${slug}`} className={styles.connectionLink}>
                      {/* TODO: Resolve slug to case title — requires getCaseStudy(slug) in parent */}
                      /trabajo/{slug} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasNext && nextEssaySlug && nextEssayTitle && (
            <div className={styles.connection}>
              <p className={styles.connectionLabel}>Continúa leyendo</p>
              <Link href={`/pensamiento/${nextEssaySlug}`} className={styles.connectionLink}>
                {nextEssayTitle} →
              </Link>
            </div>
          )}
        </div>
      )}

      <div className={styles.cta}>
        <p className={styles.ctaText}>
          Si esto resonó, hay conversaciones más específicas que valen la pena tener.
        </p>
        <Link href="/construyamos" className={styles.ctaLink}>
          Construyamos algo →
        </Link>
      </div>
    </aside>
  )
}
