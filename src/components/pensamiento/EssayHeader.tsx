import type { EssayFrontmatter } from '@/lib/content'
import styles from './EssayHeader.module.css'

interface EssayHeaderProps {
  essay: EssayFrontmatter
}

const TYPE_LABELS: Record<EssayFrontmatter['type'], string> = {
  ensayo: 'Ensayo de Perspectiva',
  nota:   'Nota de Ecosistema',
}

function formatDate(iso: string): string {
  const [year, month] = iso.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })
}

export default function EssayHeader({ essay }: EssayHeaderProps) {
  const { title, subtitle, type, publishedAt, updatedAt, readingTime, tags } = essay

  const displayDate = updatedAt ?? publishedAt

  return (
    <header className={styles.header}>
      <div className={styles.typeLine}>
        <span className={styles.typeLabel}>{TYPE_LABELS[type]}</span>
        <span className={styles.dot} aria-hidden="true">·</span>
        <span className={styles.readingTime}>{readingTime} min de lectura</span>
      </div>

      <h1 className={styles.title}>{title}</h1>

      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}

      <div className={styles.metaLine}>
        <time dateTime={displayDate} className={styles.date}>
          {formatDate(displayDate)}
        </time>
        {updatedAt && (
          <>
            <span className={styles.dot} aria-hidden="true">·</span>
            <span className={styles.updated}>
              Actualizado {formatDate(updatedAt)}
            </span>
          </>
        )}
      </div>

      {tags.length > 0 && (
        <ul className={styles.tags} aria-label="Etiquetas">
          {tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
