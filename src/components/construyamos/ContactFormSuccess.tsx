import styles from './ContactFormSuccess.module.css'

// Replaces the form in situ after successful submission.
// No redirect. No generic "thank you" page.
// Source: docs/16_BUILD_BRIEF.md §II.5
export default function ContactFormSuccess() {
  return (
    <div className={styles.success} role="status" aria-live="polite">
      <p className={styles.headline}>
        La conversación empieza ahora.
      </p>
      <p className={styles.body}>
        Neil revisará tu mensaje y estará en contacto.
      </p>
    </div>
  )
}
