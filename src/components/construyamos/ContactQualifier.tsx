import styles from './ContactQualifier.module.css'

// Static copy sections that qualify the conversation before the form.
// "Con quiénes" + "Qué no es esto" — filter and frame expectations.
// Source: docs/16_BUILD_BRIEF.md §II.5 [CONSTRUYAMOS_CON_QUIENES] + [CONSTRUYAMOS_QUE_NO]
export default function ContactQualifier() {
  return (
    <div className={styles.qualifier}>
      <div className={styles.block}>
        <p className={styles.blockLabel}>Con quiénes</p>
        <div className={styles.blockBody}>
          <p>
            {/*
             * TODO: [CONSTRUYAMOS_CON_QUIENES]
             * Párrafo descriptivo del tipo de conversaciones que tienen sentido.
             * Tipos de desafíos: ecosistemas de innovación, intersectorialidad,
             * colaboración entre actores con lógicas distintas.
             * Tipos de actores: rectores, directores de innovación, fundaciones,
             * gobiernos regionales, organizaciones internacionales.
             * Orientación al largo plazo — no proyectos puntuales.
             * Tono: selectivo pero no excluyente. Claro, no frío.
             */}
            Trabajo con personas e instituciones que están tratando de construir
            algo que ninguna podría construir sola — y que entienden que eso
            requiere tiempo, confianza y arquitectura.
          </p>
          <p>
            {/* TODO: [CONSTRUYAMOS_CON_QUIENES — continúa] Tipos de desafíos + actores específicos. */}
            Si el desafío que enfrentas requiere conectar actores con lógicas
            distintas — universidad, empresa, gobierno, comunidad — y tienes
            orientación al largo plazo, es probable que haya una conversación
            que vale la pena tener.
          </p>
        </div>
      </div>

      <div className={styles.block}>
        <p className={styles.blockLabel}>Qué no es esto</p>
        <div className={styles.blockBody}>
          <p>
            {/*
             * TODO: [CONSTRUYAMOS_QUE_NO]
             * 2–3 líneas de claridad. Tono: transparencia, no rechazo.
             * Ejemplos posibles: consultoría puntual con entregables en semanas,
             * charlas de motivación, proyectos sin visión de largo plazo,
             * trabajo por encargo sin involucración estratégica.
             */}
            Este espacio no produce consultoría de respuesta rápida con
            entregables en semanas, charlas de motivación, ni proyectos
            sin visión de continuidad.
          </p>
          <p>
            {/* TODO: [CONSTRUYAMOS_QUE_NO — segunda oración] */}
            Si lo que buscas es eso, hay personas excelentes que lo hacen bien.
            Aquí el trabajo es de otra naturaleza.
          </p>
        </div>
      </div>
    </div>
  )
}
