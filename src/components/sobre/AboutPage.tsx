import Link from 'next/link'
import Container from '@/components/layout/Container'
import AboutSection from './AboutSection'
import ThesisBlock from './ThesisBlock'
import AboutCTA from './AboutCTA'
import styles from './AboutPage.module.css'

// Full layout for /sobre — one column, editorial, not a CV.
// Sections: Origen → Observación → Convicción → Trayectoria → Dirección → Tesis → CTA
// Source: docs/16_BUILD_BRIEF.md §II.4
export default function AboutPage() {
  return (
    <main>
      <Container variant="narrow">
        <article>

          {/* ──────────────────────────────────────
           * PAGE HEADER
           * Not a CV header. No title. No job title.
           * A statement that frames what follows.
           * ────────────────────────────────────── */}
          <header className={styles.header}>
            <span className={styles.pageLabel}>Sobre Neil</span>
            <p className={styles.intro}>
              {/*
               * TODO: [SOBRE_INTRO] — Una o dos oraciones que enmarcan
               * la página sin presentarlo como un CV. Debe sentirse como
               * el inicio de un argumento, no de una biográfica.
               * Ver voz en 10_COPYWRITING.md.
               */}
              Lo que sigue no es un currículum. Es una explicación de por qué
              alguien construye infraestructura colaborativa desde el desierto
              más árido del mundo, y qué ha aprendido haciéndolo.
            </p>
          </header>

          {/* ──────────────────────────────────────
           * EL ORIGEN
           * Antofagasta como decisión deliberada, no como circunstancia.
           * ────────────────────────────────────── */}
          <AboutSection label="El origen">
            <p>
              Nací y crecí en Antofagasta. El desierto no es una metáfora
              para mí — es la geografía que formó cómo pienso. En un lugar
              donde la escasez es estructural, aprendes temprano que las
              preguntas más útiles no son «¿qué nos falta?» sino «¿qué existe
              que todavía no hemos conectado?». Esa lógica, que parece
              específica del Norte Grande, resulta ser universal.
            </p>
            <p>
              En algún punto tuve que decidir si construiría desde donde los
              recursos y las redes ya estaban consolidados, o si seguiría
              desde donde había comenzado. Elegí quedarme. No por falta de
              opciones, sino porque irme habría contradicho la única premisa
              que me importaba demostrar: que la infraestructura colaborativa
              puede construirse desde cualquier territorio — incluyendo los que
              el mundo no tiene en el radar.
            </p>
            <p>
              Construir desde Antofagasta implica algo que construir desde una
              capital no implica: que no puedes dar nada por sentado. La
              densidad de redes informales, el capital relacional acumulado en
              ecosistemas de alta densidad — nada de eso existe por defecto
              aquí. Tienes que construirlo deliberadamente. Y esa necesidad,
              con el tiempo, se convierte en ventaja: aprendes exactamente
              cómo se hace.
            </p>
          </AboutSection>

          {/* ──────────────────────────────────────
           * LA OBSERVACIÓN
           * La incomodidad intelectual que inició la tesis.
           * ────────────────────────────────────── */}
          <AboutSection label="La observación">
            <p>
              Empecé a ver el mismo patrón en todos los contextos donde
              trabajé. Proyectos con todos los ingredientes — las personas
              correctas, los recursos suficientes, la voluntad evidente — que
              sin embargo no producían lo que deberían. La explicación estándar
              recurría a los actores: liderazgo débil, intereses desalineados,
              culturas institucionales incompatibles.
            </p>
            <p>
              Con el tiempo llegué a una explicación diferente. El problema no
              eran los actores. Era lo que no existía entre ellos: un espacio
              donde sus lenguajes distintos pudieran encontrarse, un propósito
              compartido que ningún sector podía definir solo, un mecanismo de
              coordinación que funcionara cuando nadie lideraba explícitamente.
              En otras palabras: infraestructura. Y nadie la había construido.
            </p>
            <p>
              Antofagasta hace esa ausencia especialmente visible. Una ciudad
              con capital humano extraordinario — investigadores, emprendedores,
              profesionales que resuelven problemas de escala global — donde
              las conversaciones entre sectores rara vez ocurren por inercia.
              Lo que en un ecosistema de alta densidad se atribuye a «cultura»
              o «química», aquí tiene que ser construido deliberadamente. Esa
              visibilidad de la causa estructural es, en retrospectiva, uno de
              los regalos del territorio.
            </p>
          </AboutSection>

          {/* ──────────────────────────────────────
           * LA CONVICCIÓN
           * La tesis en contexto biográfico — no definición técnica.
           * ────────────────────────────────────── */}
          <AboutSection label="La convicción">
            <p>
              La convicción que organiza el trabajo es esta: la innovación no
              falla por escasez de talento ni de recursos. Falla porque la
              infraestructura que conecta lo que ya existe no ha sido
              construida. Y esa infraestructura no emerge sola — requiere
              diseño, tiempo y alguien que no pertenezca a ninguno de los
              sectores involucrados pero que entienda el lenguaje de todos.
            </p>
            <p>
              La diferencia entre un proyecto exitoso y un ecosistema funcional
              no está en los resultados del proyecto. Está en qué ocurre cuando
              el proyecto termina. Un ecosistema funcional sigue generando
              colaboración y resultados después de que quien lo construyó se
              corrió del centro. Diseñar para esa autonomía futura — construir
              activamente las condiciones para que el propio rol sea
              prescindible — es el trabajo que más me interesa y el más difícil
              de hacer bien.
            </p>
          </AboutSection>

          {/* ──────────────────────────────────────
           * LA TRAYECTORIA
           * Proyectos como acumulación de evidencia — no lista de logros.
           * Links a /trabajo cuando los casos estén publicados.
           * ────────────────────────────────────── */}
          <AboutSection label="La trayectoria">
            <p>
              Cada proyecto en esta lista es un episodio de la misma prueba.
              No los enumero como logros — los enumero como evidencia de que la
              infraestructura colaborativa puede construirse en condiciones
              reales, con actores reales y en territorios reales.
            </p>

            <ul className={styles.projectList}>
              <li className={styles.project}>
                <strong className={styles.projectName}>Global Youth Summit</strong>
                <p className={styles.projectNarrative}>
                  {/*
                   * TODO: [TRAYECTORIA_GYS] Confirmar narrativa específica con Neil.
                   * Versión de referencia del storytelling doc:
                   * "conectando organizaciones que nunca habían compartido un propósito
                   * en el mismo espacio — y que siguieron haciéndolo."
                   */}
                  Conectó organizaciones de distintos sectores que nunca habían
                  compartido un propósito en el mismo espacio — y construyó la
                  red que hizo posible que siguieran haciéndolo.
                </p>
                {/* TODO: Descomentar cuando /trabajo/global-youth-summit esté publicado:
                <Link href="/trabajo/global-youth-summit" className={styles.projectLink}>
                  Ver caso completo →
                </Link>
                */}
              </li>

              <li className={styles.project}>
                <strong className={styles.projectName}>TEDxAntofagasta</strong>
                <p className={styles.projectNarrative}>
                  Una plataforma que hizo visible que Antofagasta produce ideas
                  de calibre internacional, y que construyó conexiones entre
                  actores locales que esas ideas necesitaban para existir.
                </p>
                {/* TODO: Descomentar cuando /trabajo/tedx-antofagasta esté publicado:
                <Link href="/trabajo/tedx-antofagasta" className={styles.projectLink}>
                  Ver caso completo →
                </Link>
                */}
              </li>

              <li className={styles.project}>
                <strong className={styles.projectName}>Universidad Católica del Norte</strong>
                <p className={styles.projectNarrative}>
                  Trabajo intersectorial que construyó puentes reales entre la
                  investigación académica y los actores del ecosistema que
                  podían usarla — dentro y fuera de la institución.
                </p>
              </li>

              <li className={styles.project}>
                <strong className={styles.projectName}>Shinsekai</strong>
                <p className={styles.projectNarrative}>
                  {/*
                   * TODO: [TRAYECTORIA_SHINSEKAI] Verificar descripción actual y estado con Neil.
                   */}
                  Co-fundado como un ecosistema donde el aprendizaje y la
                  colaboración se vuelven infraestructura permanente para
                  emprendedores y comunidades del Norte.
                </p>
              </li>
            </ul>

            <p>
              <Link href="/trabajo" className={styles.workLink}>
                Ver todos los casos documentados →
              </Link>
            </p>
          </AboutSection>

          {/* ──────────────────────────────────────
           * LA DIRECCIÓN
           * Hacia dónde va — orientación, no plan.
           * ────────────────────────────────────── */}
          <AboutSection label="La dirección">
            <p>
              El trabajo que me interesa ahora ocurre en el espacio más
              difícil: cuando los actores correctos ya están presentes pero
              las condiciones para que trabajen juntos no han sido diseñadas
              todavía. Eso ocurre en universidades que quieren vincularse con
              la industria sin perder su identidad académica. En empresas que
              quieren contribuir al desarrollo de sus territorios pero no
              tienen el lenguaje para hablar con las comunidades. En
              iniciativas de innovación que tienen financiamiento y talento
              pero ningún mecanismo que los conecte entre sí.
            </p>
            <p>
              No busco proyectos que necesiten ser definidos desde cero. Busco
              iniciativas que ya tienen todo lo demás y están en el momento en
              que la infraestructura es lo único que falta.
            </p>
          </AboutSection>

          {/* ──────────────────────────────────────
           * LA TESIS — bloque visual aislado
           * Definición citable de infraestructura colaborativa.
           * ────────────────────────────────────── */}
          <ThesisBlock />

          {/* ──────────────────────────────────────
           * CTA FINAL
           * Transición a /construyamos.
           * ────────────────────────────────────── */}
          <AboutCTA />

        </article>
      </Container>
    </main>
  )
}
