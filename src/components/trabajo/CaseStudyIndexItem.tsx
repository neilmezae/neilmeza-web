import Link from 'next/link'
import type { CaseStudyFrontmatter } from '@/lib/content'
import styles from './CaseStudyIndexItem.module.css'

interface CaseStudyIndexItemProps {
  caseStudy: CaseStudyFrontmatter
}

export default function CaseStudyIndexItem({ caseStudy }: CaseStudyIndexItemProps) {
  const { title, slug, essencePhrase, territory, period, sectors } = caseStudy

  return (
    <Link href={`/trabajo/${slug}`} className={styles.item}>
      <div className={styles.main}>
        <h2 className={styles.title}>{title}</h2>
        {essencePhrase && (
          <p className={styles.essence}>{essencePhrase}</p>
        )}
      </div>

      <div className={styles.meta}>
        <span className={styles.location}>
          <span className={styles.territory}>{territory}</span>
          <span className={styles.separator} aria-hidden="true">·</span>
          <span className={styles.period}>{period}</span>
        </span>

        {sectors.length > 0 && (
          <ul className={styles.sectors} aria-label="Sectores">
            {sectors.map((sector) => (
              <li key={sector} className={styles.sector}>
                {sector}
              </li>
            ))}
          </ul>
        )}
      </div>

      <span className={styles.arrow} aria-hidden="true">→</span>
    </Link>
  )
}
