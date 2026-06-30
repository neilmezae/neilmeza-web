'use client'

import { useRef, useState } from 'react'
import ContactFormSuccess from './ContactFormSuccess'
import styles from './ContactForm.module.css'

interface FormFields {
  nombre: string
  organizacion: string
  email: string
  construyendo: string
  actores: string
  porQue: string
  comoEncontraste: string
}

type FieldErrors = Partial<Record<keyof FormFields, string>>
type FormState = 'idle' | 'submitting' | 'success' | 'error'

const INITIAL: FormFields = {
  nombre: '',
  organizacion: '',
  email: '',
  construyendo: '',
  actores: '',
  porQue: '',
  comoEncontraste: '',
}

const REQUIRED: Array<keyof FormFields> = [
  'nombre',
  'email',
  'construyendo',
  'actores',
  'porQue',
]

const ERROR_MESSAGES: Record<string, string> = {
  nombre:         'Necesito saber cómo llamarte.',
  email:          'Necesito un email para responderte.',
  construyendo:   'Esta pregunta es el centro de la conversación.',
  actores:        'Saber quiénes están involucrados es clave.',
  porQue:         'Esta es la pregunta más importante. Tómate un momento.',
}

function validate(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {}
  for (const key of REQUIRED) {
    if (!fields[key].trim()) {
      errors[key] = ERROR_MESSAGES[key] ?? 'Este campo es necesario.'
    }
  }
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'El formato del email no es válido.'
  }
  return errors
}

// Strategic contact form for /construyamos.
// Anti-spam: honeypot field + minimum time check (< 3s = bot).
// Sends to /api/contact → Resend → contact@neilmeza.com
export default function ContactForm() {
  const loadedAt = useRef<number>(Date.now())
  const [fields, setFields] = useState<FormFields>(INITIAL)
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<FormState>('idle')

  const update = (key: keyof FormFields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // ── Anti-spam: honeypot check ──────────────────────────────────
    // If the hidden "website" field is filled, this is likely a bot.
    // Silently succeed — don't reveal the check.
    if (honeypot) {
      setState('success')
      return
    }

    // ── Anti-spam: time check ──────────────────────────────────────
    // Real humans take more than 3 seconds to fill a form.
    const elapsed = Date.now() - loadedAt.current
    if (elapsed < 3000) {
      setState('success')
      return
    }

    // ── Client-side validation ─────────────────────────────────────
    const fieldErrors = validate(fields)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      const firstErrorKey = REQUIRED.find((k) => fieldErrors[k])
      if (firstErrorKey) {
        document.getElementById(firstErrorKey)?.focus()
      }
      return
    }

    // ── Submit ─────────────────────────────────────────────────────
    setState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, website: honeypot }),
      })

      if (!res.ok) {
        setState('error')
        return
      }

      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') return <ContactFormSuccess />

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={styles.form}
      aria-label="Formulario de contacto estratégico"
    >
      {/* ── HONEYPOT — hidden from real users ───────────────────── */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      {/* ── CONTACT FIELDS ────────────────────────────────────────── */}
      <fieldset className={styles.contactFields}>
        <legend className={styles.fieldsetLegend}>Tus datos</legend>

        <div className={styles.field}>
          <label htmlFor="nombre" className={styles.label}>
            Nombre <span className={styles.required} aria-hidden="true">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={fields.nombre}
            onChange={update('nombre')}
            className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
            autoComplete="name"
            aria-required="true"
            aria-describedby={errors.nombre ? 'nombre-error' : undefined}
          />
          {errors.nombre && (
            <p id="nombre-error" className={styles.error} role="alert">
              {errors.nombre}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="organizacion" className={styles.label}>
            Organización / Contexto
          </label>
          <input
            id="organizacion"
            name="organizacion"
            type="text"
            value={fields.organizacion}
            onChange={update('organizacion')}
            className={styles.input}
            autoComplete="organization"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email de contacto <span className={styles.required} aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={fields.email}
            onChange={update('email')}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            autoComplete="email"
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className={styles.error} role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </fieldset>

      {/* ── STRATEGIC QUESTIONS ───────────────────────────────────── */}
      <fieldset className={styles.questionFields}>
        <legend className={styles.fieldsetLegend}>Las preguntas</legend>

        <div className={styles.field}>
          <label htmlFor="construyendo" className={styles.questionLabel}>
            ¿Qué estás tratando de construir?{' '}
            <span className={styles.required} aria-hidden="true">*</span>
          </label>
          <textarea
            id="construyendo"
            name="construyendo"
            value={fields.construyendo}
            onChange={update('construyendo')}
            className={`${styles.textarea} ${errors.construyendo ? styles.inputError : ''}`}
            rows={5}
            aria-required="true"
            aria-describedby={errors.construyendo ? 'construyendo-error' : undefined}
          />
          {errors.construyendo && (
            <p id="construyendo-error" className={styles.error} role="alert">
              {errors.construyendo}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="actores" className={styles.questionLabel}>
            ¿Qué actores necesitas conectar para que eso ocurra?{' '}
            <span className={styles.required} aria-hidden="true">*</span>
          </label>
          <textarea
            id="actores"
            name="actores"
            value={fields.actores}
            onChange={update('actores')}
            className={`${styles.textarea} ${errors.actores ? styles.inputError : ''}`}
            rows={4}
            aria-required="true"
            aria-describedby={errors.actores ? 'actores-error' : undefined}
          />
          {errors.actores && (
            <p id="actores-error" className={styles.error} role="alert">
              {errors.actores}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="porQue" className={styles.questionLabel}>
            ¿Por qué no ha ocurrido todavía?{' '}
            <span className={styles.required} aria-hidden="true">*</span>
          </label>
          <textarea
            id="porQue"
            name="porQue"
            value={fields.porQue}
            onChange={update('porQue')}
            className={`${styles.textarea} ${errors.porQue ? styles.inputError : ''}`}
            rows={4}
            aria-required="true"
            aria-describedby={errors.porQue ? 'porQue-error' : undefined}
          />
          {errors.porQue && (
            <p id="porQue-error" className={styles.error} role="alert">
              {errors.porQue}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="comoEncontraste" className={styles.questionLabel}>
            ¿Cómo encontraste esta plataforma?
          </label>
          <input
            id="comoEncontraste"
            name="comoEncontraste"
            type="text"
            value={fields.comoEncontraste}
            onChange={update('comoEncontraste')}
            className={styles.input}
          />
        </div>
      </fieldset>

      {/* ── SUBMIT ────────────────────────────────────────────────── */}
      <div className={styles.submitRow}>
        <button
          type="submit"
          className={styles.submit}
          disabled={state === 'submitting'}
        >
          {state === 'submitting' ? 'Enviando…' : 'Empecemos'}
        </button>
        <p className={styles.requiredNote}>
          Los campos marcados con * son necesarios.
        </p>
      </div>

      {state === 'error' && (
        <p className={styles.sendError} role="alert">
          No pudimos enviar el mensaje en este momento.
          Inténtalo nuevamente en unos minutos.
        </p>
      )}
    </form>
  )
}
