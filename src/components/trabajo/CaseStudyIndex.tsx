import type { CaseStudyFrontmatter } from '@/lib/content'
import CaseStudyIndexItem from './CaseStudyIndexItem'
import styles from './CaseStudyIndex.module.css'

interface CaseStudyIndexProps {
  cases: CaseStudyFrontmatter[]
}

export default function CaseStudyIndex({ cases }: CaseStudyIndexProps) {
  return (
    <section className={styles.section} aria-labelledby="trabajo-heading">
      <header className={styles.header}>
        <span className={styles.sectionLabel}>Trabajo</span>
        <h1 id="trabajo-heading" className={styles.heading}>
          Ecosistemas construidos
        </h1>
        <p className={styles.intro}>
          Cada caso es un ecosistema real — actores que no colaboraban antes, condiciones
          que no existían, resultados que permanecen sin la presencia continua de quien los diseñó.
        </p>
      </header>

      {cases.length === 0 ? (
        <EmptyState />
      ) : (
        <ol className={styles.list} aria-label="Lista de casos de estudio">
          {cases.map((caseStudy) => (
            <li key={caseStudy.slug} className={styles.listItem}>
              <CaseStudyIndexItem caseStudy={caseStudy} />
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

function EmptyState() {
  return (
    <div className={styles.emptyState} role="status">
      <p className={styles.emptyText}>
        Los casos de estudio se publican cuando el trabajo tiene la madurez suficiente
        para documentarse con rigor. Lo que aparecerá aquí no es lo que fue posible
        publicar rápido — es lo que puede sostenerse con evidencia.
      </p>
    </div>
  )
}
