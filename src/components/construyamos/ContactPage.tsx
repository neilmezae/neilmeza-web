import Container from '@/components/layout/Container'
import ContactQualifier from './ContactQualifier'
import ContactForm from './ContactForm'
import styles from './ContactPage.module.css'

// Full layout for /construyamos — strategic contact page.
// Qualifier sections → form. One column, editorial tone.
// Source: docs/16_BUILD_BRIEF.md §II.5
export default function ContactPage() {
  return (
    <main>
      <Container variant="narrow">
        <div className={styles.page}>

          <header className={styles.header}>
            <span className={styles.pageLabel}>Construyamos</span>
            <h1 className={styles.heading}>
              {/*
               * TODO: [CONSTRUYAMOS_HEADING]
               * Un titular que invita sin vender.
               * Debe recoger el estado mental del visitante después del recorrido.
               * Ver docs/10_COPYWRITING.md §IV.
               */}
              Empieza aquí si hay algo que construir.
            </h1>
            <p className={styles.intro}>
              {/*
               * TODO: [CONSTRUYAMOS_INTRO]
               * 1–2 oraciones. La naturaleza de la conversación que este espacio produce.
               * No es un formulario de contacto — es el inicio de una colaboración.
               */}
              Las conversaciones que importan empiezan con preguntas precisas.
              Estas cuatro están aquí para ayudarte a formularlas.
            </p>
          </header>

          <ContactQualifier />

          <section className={styles.formSection} aria-labelledby="form-heading">
            <h2 id="form-heading" className={styles.formHeading}>
              El formulario
            </h2>
            <ContactForm />
          </section>

        </div>
      </Container>
    </main>
  )
}
