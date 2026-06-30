import type { EssayFrontmatter } from '@/lib/content'
import EssayIndexItem from './EssayIndexItem'
import EssayEmptyState from './EssayEmptyState'
import styles from './EssayIndex.module.css'

interface EssayIndexProps {
  essays: EssayFrontmatter[]
}

export default function EssayIndex({ essays }: EssayIndexProps) {
  return (
    <section className={styles.section} aria-labelledby="pensamiento-heading">
      <header className={styles.header}>
        <span className={styles.sectionLabel}>Pensamiento</span>
        <h1 id="pensamiento-heading" className={styles.heading}>
          Ideas en desarrollo
        </h1>
        <p className={styles.intro}>
          Ensayos y perspectivas sobre innovación, colaboración y los sistemas
          que hacen posible lo que todavía no existe. Argumentos, no publicaciones.
        </p>
      </header>

      {essays.length === 0 ? (
        <EssayEmptyState />
      ) : (
        <ol className={styles.list} aria-label="Lista de ensayos y perspectivas">
          {essays.map((essay) => (
            <li key={essay.slug} className={styles.listItem}>
              <EssayIndexItem essay={essay} />
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
