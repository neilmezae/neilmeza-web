import Link from 'next/link'
import Container from '@/components/layout/Container'
import styles from './PersonBlock.module.css'

// Block 5 — LA PERSONA
// One paragraph. Origin as argument, not biography. No CV. No photo.
// Copy source: docs/10_COPYWRITING.md §III — Bloque 5 (borrador de referencia)
export default function PersonBlock() {
  return (
    <section className={styles.section} aria-label="La persona">
      <Container>
        <div className={styles.body}>
          <span className={styles.sectionLabel}>La persona</span>
          <div className={styles.text}>
            <p className={styles.paragraph}>
              Neil Meza construye desde Antofagasta — no porque no haya podido
              construir desde otro lugar, sino porque elegir ese territorio es,
              en sí mismo, la prueba más honesta de lo que dice creer. Si la
              infraestructura colaborativa puede crearse en una ciudad minera del
              desierto a 1.300 kilómetros de la capital, puede crearse en cualquier parte.
            </p>
          </div>
          <Link href="/sobre" className={styles.link}>
            La historia completa →
          </Link>
        </div>
      </Container>
    </section>
  )
}
