import Link from 'next/link'
import Container from '@/components/layout/Container'
import styles from './InvitationBlock.module.css'

// Block 6 — LA INVITACIÓN
// Display question + support paragraph + primary CTA to /construyamos.
// Background: --color-background-subtle.
// Copy source: docs/10_COPYWRITING.md §III — Bloque 6
export default function InvitationBlock() {
  return (
    <section className={styles.section} aria-label="La invitación">
      <Container>
        <div className={styles.inner}>
          <p className={styles.question}>
            ¿Qué estás construyendo que requiere la infraestructura que aquí se describe?
          </p>
          <p className={styles.support}>
            Neil no acepta proyectos — acepta conversaciones sobre lo que falta
            en iniciativas que ya tienen todo lo demás. Si estás en ese momento,
            este es el lugar.
          </p>
          <Link href="/construyamos" className={styles.cta}>
            Construyamos juntos
          </Link>
        </div>
      </Container>
    </section>
  )
}
