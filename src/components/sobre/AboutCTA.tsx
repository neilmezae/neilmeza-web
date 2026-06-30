import Link from 'next/link'
import styles from './AboutCTA.module.css'

// Final CTA of /sobre — narrative transition to /construyamos.
// Not a generic "contact me" — a specific invitation.
// Source: docs/16_BUILD_BRIEF.md §II.4
export default function AboutCTA() {
  return (
    <div className={styles.cta}>
      <p className={styles.lead}>
        Si lo que lees aquí resuena con lo que estás construyendo,
        la conversación vale la pena.
      </p>
      <Link href="/construyamos" className={styles.link}>
        Construyamos algo →
      </Link>
      <p className={styles.contact}>
        Para prensa y consultas directas:{' '}
        <a href="mailto:contact@neilmeza.com" className={styles.email}>
          contact@neilmeza.com
        </a>
      </p>
    </div>
  )
}
