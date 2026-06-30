import type { ReactNode } from 'react'
import styles from './AboutSection.module.css'

interface AboutSectionProps {
  label: string
  children: ReactNode
}

// Reusable narrative section for /sobre.
// Label (uppercase, tertiary) + editorial body content.
// Source: docs/16_BUILD_BRIEF.md §II.4
export default function AboutSection({ label, children }: AboutSectionProps) {
  return (
    <section className={styles.section} aria-labelledby={undefined}>
      <span className={styles.label} aria-hidden="true">
        {label}
      </span>
      <div className={styles.body}>{children}</div>
    </section>
  )
}
