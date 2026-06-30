import styles from './EssayEmptyState.module.css'

// Honest empty state — in the voice of the brand.
// Source: docs/06_USER_EXPERIENCE.md §VIII
// "Lo que aparece aquí es lo que ha valido la pena escribir, no lo que ha sido posible publicar rápido."
export default function EssayEmptyState() {
  return (
    <div className={styles.state} role="status">
      <p className={styles.text}>
        Lo que aparece aquí es lo que ha valido la pena escribir,
        no lo que ha sido posible publicar rápido.
      </p>
      <p className={styles.subtext}>
        Los ensayos se publican cuando el argumento está completo y la evidencia
        que lo sustenta es verificable. Vuelve pronto.
      </p>
    </div>
  )
}
