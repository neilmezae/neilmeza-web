import Link from 'next/link'
import { getEssays } from '@/lib/content'
import Container from '@/components/layout/Container'
import styles from './ThoughtPreviewBlock.module.css'

// Block 4 — EL PENSAMIENTO
// Up to 2 published essays. No thumbnails. Hover: title weight increases.
// Copy source: docs/10_COPYWRITING.md §III — Bloque 4, §IX
export default async function ThoughtPreviewBlock() {
  const essays = await getEssays()
  const preview = essays.slice(0, 2)

  return (
    <section className={styles.section} aria-labelledby="pensamiento-home-heading">
      <Container>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>El pensamiento</span>
          <h2 id="pensamiento-home-heading" className={styles.heading}>
            El marco que sustenta el trabajo.
          </h2>
        </div>

        {preview.length === 0 ? (
          <div className={styles.empty} role="status">
            <p className={styles.emptyText}>
              No hay un calendario de publicación — hay un estándar de densidad.
              Lo que aparece aquí tomó el tiempo que necesitó.
              Lo que sigue aparecerá cuando esté listo.
            </p>
            <Link href="/pensamiento" className={styles.emptyLink}>
              Ver el índice →
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {preview.map((essay) => (
                <article key={essay.slug} className={styles.card}>
                  <Link href={`/pensamiento/${essay.slug}`} className={styles.cardLink}>
                    <div className={styles.cardMeta}>
                      <span className={styles.type}>
                        {essay.type === 'ensayo' ? 'Ensayo' : 'Nota'}
                      </span>
                      <span className={styles.metaDot} aria-hidden="true">·</span>
                      <span className={styles.readingTime}>
                        {essay.readingTime} min
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{essay.title}</h3>
                    {essay.subtitle && (
                      <p className={styles.cardSubtitle}>{essay.subtitle}</p>
                    )}
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.cta}>
              <Link href="/pensamiento" className={styles.ctaLink}>
                Lee las ideas →
              </Link>
            </div>
          </>
        )}
      </Container>
    </section>
  )
}
