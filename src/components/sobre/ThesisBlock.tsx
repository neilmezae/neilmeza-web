import styles from './ThesisBlock.module.css'

// Visually isolated definition of "infraestructura colaborativa."
// Citable and shareable — the core intellectual claim of the platform.
// Source: docs/16_BUILD_BRIEF.md §II.4 [SOBRE_TESIS] + [SOBRE_FRASES_MARCA]
export default function ThesisBlock() {
  return (
    <aside className={styles.block} aria-label="La tesis">
      <p className={styles.conceptLabel}>La tesis</p>

      <blockquote className={styles.definition}>
        <p>
          La infraestructura colaborativa es el conjunto de condiciones —
          relacionales, institucionales y culturales — que hacen posible que personas
          e instituciones distintas construyan algo que ninguna podría construir sola.
          No es metodología. Es arquitectura.
        </p>
        <p>
          Cuando está bien construida, los actores que nunca han trabajado juntos
          empiezan a hacerlo — y lo que producen persiste después de que quien los
          convocó ya no está en el centro. Eso es lo que la distingue de un proyecto:
          no termina cuando sus recursos se agotan; genera las condiciones para su
          propia continuidad.
        </p>
      </blockquote>

      <div className={styles.phrases}>
        <p className={styles.phrase}>
          "Mi visión nunca ha sido regional. Mi punto de partida sí lo es."
        </p>
        <p className={styles.phrase}>
          "Transformar la complejidad en colaboración y la colaboración en resultados."
        </p>
      </div>
    </aside>
  )
}
