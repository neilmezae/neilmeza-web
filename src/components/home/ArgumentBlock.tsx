import Container from '@/components/layout/Container'
import styles from './ArgumentBlock.module.css'

// Block 2 — EL ARGUMENTO
// The thesis of collaborative infrastructure in 4 paragraphs.
// Neil appears as the builder of the thesis, not as its subject.
// Copy source: docs/10_COPYWRITING.md §III — Bloque 2 (borrador de referencia)
export default function ArgumentBlock() {
  return (
    <section className={styles.section} aria-label="El argumento">
      <Container>
        <div className={styles.body}>
          <p className={styles.paragraph}>
            La mayoría de los ecosistemas de innovación fallan por la misma razón:
            los actores correctos existen, las ideas existen, los recursos existen.
            Lo que no existe es la infraestructura que los conecta.
          </p>

          <p className={styles.paragraph}>
            Esa infraestructura no es tecnología ni capital. Es la red de confianzas,
            los espacios de diálogo y los propósitos compartidos que permiten que
            organizaciones que nunca han trabajado juntas comiencen a hacerlo —
            y que lo que construyen persista cuando quien las unió ya no está
            en el centro.
          </p>

          <p className={styles.paragraph}>
            Construir esa infraestructura es un trabajo específico. Requiere alguien
            que no pertenezca a ninguno de los sectores involucrados pero que entienda
            el lenguaje de todos. Alguien que diseñe las condiciones antes de que
            los actores lleguen a ellas.
          </p>

          <p className={styles.paragraph}>
            Eso es lo que hace Neil. Y lo ha demostrado desde donde la mayoría dice
            que no puede demostrarse.
          </p>
        </div>
      </Container>
    </section>
  )
}
