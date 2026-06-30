import Link from 'next/link'
import { getCaseStudies } from '@/lib/content'
import Container from '@/components/layout/Container'
import styles from './WorkPreviewBlock.module.css'

// Block 3 — EL TRABAJO
// Up to 3 published cases. Editorial numbered list, not a portfolio grid.
// Hover: essence phrase transitions in.
// Copy source: docs/10_COPYWRITING.md §III — Bloque 3
export default async function WorkPreviewBlock() {
  const cases = await getCaseStudies()
  const preview = cases.slice(0, 3)

  return (
    <section className={styles.section} aria-labelledby="trabajo-home-heading">
      <Container>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>El trabajo</span>
          <h2 id="trabajo-home-heading" className={styles.heading}>
            La tesis demostrada.
          </h2>
        </div>

        {preview.length === 0 ? (
          <div className={styles.empty} role="status">
            <p className={styles.emptyText}>
              Los casos se documentan cuando el trabajo tiene la madurez suficiente
              para publicarse con rigor. La infraestructura ya existe.
              El texto que la describe está tomando la forma correcta.
            </p>
            <Link href="/trabajo" className={styles.emptyLink}>
              Ver el índice →
            </Link>
          </div>
        ) : (
          <>
            <ol className={styles.list}>
              {preview.map((c, i) => (
                <li key={c.slug} className={styles.item}>
                  <Link href={`/trabajo/${c.slug}`} className={styles.itemLink}>
                    <span className={styles.itemNumber}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={styles.itemBody}>
                      <h3 className={styles.itemTitle}>{c.title}</h3>
                      {c.essencePhrase && (
                        <p className={styles.itemEssence}>{c.essencePhrase}</p>
                      )}
                    </div>
                    <div className={styles.itemMeta}>
                      <span>{c.territory}</span>
                      <span className={styles.metaDot} aria-hidden="true">·</span>
                      <span>{c.period}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>

            <div className={styles.cta}>
              <Link href="/trabajo" className={styles.ctaLink}>
                Conoce el trabajo →
              </Link>
            </div>
          </>
        )}
      </Container>
    </section>
  )
}
