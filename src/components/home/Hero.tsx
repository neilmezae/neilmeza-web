import Container from '@/components/layout/Container'
import styles from './Hero.module.css'

// Block 1 — HERO
// 100vh. Thesis headline + one-line subtitle + scroll indicator.
// No photo. No welcome paragraph. An intellectual claim, not a slogan.
// Copy source: docs/10_COPYWRITING.md §III — Bloque 1, Opción C
export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Presentación">
      <Container>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            La innovación no falla por escasez de talento.
            Falla por ausencia de infraestructura.
          </h1>
          <p className={styles.subtitle}>
            Neil Meza construye esa infraestructura — desde el desierto.
          </p>
        </div>
      </Container>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollArrow}>↓</span>
      </div>
    </section>
  )
}
