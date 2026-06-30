import Link from 'next/link'
import type { EssayFrontmatter } from '@/lib/content'
import styles from './EssayIndexItem.module.css'

interface EssayIndexItemProps {
  essay: EssayFrontmatter
}

const TYPE_LABELS: Record<EssayFrontmatter['type'], string> = {
  ensayo: 'Ensayo',
  nota:   'Nota',
}

function formatDate(iso: string): string {
  const [year, month] = iso.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })
}

export default function EssayIndexItem({ essay }: EssayIndexItemProps) {
  const { title, subtitle, slug, type, publishedAt, readingTime, tags } = essay

  return (
    <Link href={`/pensamiento/${slug}`} className={styles.item}>
      <div className={styles.main}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.meta}>
        <div className={styles.metaLine}>
          <time dateTime={publishedAt} className={styles.date}>
            {formatDate(publishedAt)}
          </time>
          <span className={styles.dot} aria-hidden="true">·</span>
          <span className={styles.readingTime}>{readingTime} min</span>
          <span className={styles.dot} aria-hidden="true">·</span>
          <span className={styles.typeLabel}>{TYPE_LABELS[type]}</span>
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
      </div>
    </Link>
  )
}
