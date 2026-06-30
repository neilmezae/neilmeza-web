import type { CaseStudyFrontmatter } from '@/lib/content'
import styles from './CaseStudyHeader.module.css'

interface CaseStudyHeaderProps {
  caseStudy: CaseStudyFrontmatter
}

const VERSION_LABELS: Record<CaseStudyFrontmatter['documentationVersion'], string> = {
  'initial':      'Documentación inicial',
  'update-12m':   'Actualización 12 meses',
  'update-36m':   'Actualización 36 meses',
  'update-60m':   'Actualización 60 meses',
}

function formatDate(iso: string): string {
  const [year, month] = iso.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })
}

export default function CaseStudyHeader({ caseStudy }: CaseStudyHeaderProps) {
  const {
    title,
    territory,
    period,
    sectors,
    documentationVersion,
    publishedAt,
    updatedAt,
  } = caseStudy

  const displayDate = updatedAt ?? publishedAt

  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        <span className={styles.sectionLabel}>Trabajo</span>
      </div>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.metaRow}>
        <span className={styles.metaItem}>
          <span className={styles.metaLabel}>Territorio</span>
          <span className={styles.metaValue}>{territory}</span>
        </span>

        <span className={styles.metaDivider} aria-hidden="true" />

        <span className={styles.metaItem}>
          <span className={styles.metaLabel}>Período</span>
          <span className={styles.metaValue}>{period}</span>
        </span>

        <span className={styles.metaDivider} aria-hidden="true" />

        <span className={styles.metaItem}>
          <span className={styles.metaLabel}>Versión</span>
          <span className={styles.metaValue}>{VERSION_LABELS[documentationVersion]}</span>
        </span>
      </div>

      {sectors.length > 0 && (
        <ul className={styles.sectors} aria-label="Sectores">
          {sectors.map((sector) => (
            <li key={sector} className={styles.sector}>
              {sector}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.dateLine}>
        <time dateTime={displayDate} className={styles.date}>
          Publicado {formatDate(displayDate)}
        </time>
        {updatedAt && (
          <time dateTime={updatedAt} className={styles.date}>
            · Actualizado {formatDate(updatedAt)}
          </time>
        )}
      </div>
    </header>
  )
}
