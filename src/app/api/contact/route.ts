import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Instantiated at module level — not during build, only on first request.
// RESEND_API_KEY is validated at request time, not import time.
const resend = new Resend(process.env.RESEND_API_KEY)

const REQUIRED = ['nombre', 'email', 'construyendo', 'actores', 'porQue'] as const
type RequiredField = (typeof REQUIRED)[number]

interface ContactPayload {
  nombre: string
  organizacion?: string
  email: string
  construyendo: string
  actores: string
  porQue: string
  comoEncontraste?: string
  website?: string // honeypot field
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function buildEmailHtml(p: ContactPayload): string {
  const row = (label: string, value: string | undefined) =>
    value?.trim()
      ? `<tr>
          <td style="padding:12px 0;border-top:1px solid #E7E5E4;vertical-align:top;width:180px;color:#57534E;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-family:Arial,sans-serif;">${label}</td>
          <td style="padding:12px 0;border-top:1px solid #E7E5E4;font-size:15px;line-height:1.6;color:#0E0D0C;font-family:Arial,sans-serif;">${value.trim().replace(/\n/g, '<br>')}</td>
        </tr>`
      : ''

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#F9F8F6;margin:0;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #E7E5E4;padding:32px;">

    <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#A8A29E;margin:0 0 24px;">
      neilmeza.com — formulario de contacto
    </p>

    <h1 style="font-family:Arial,sans-serif;font-size:20px;font-weight:600;color:#0E0D0C;margin:0 0 8px;">
      ${p.nombre.trim()}
    </h1>
    ${p.organizacion?.trim() ? `<p style="font-family:Arial,sans-serif;font-size:14px;color:#57534E;margin:0 0 24px;">${p.organizacion.trim()}</p>` : '<div style="margin-bottom:24px;"></div>'}

    <table style="width:100%;border-collapse:collapse;">
      ${row('Email', p.email)}
      ${row('¿Qué está construyendo?', p.construyendo)}
      ${row('Actores a conectar', p.actores)}
      ${row('¿Por qué no ha ocurrido todavía?', p.porQue)}
      ${row('¿Cómo encontró la plataforma?', p.comoEncontraste)}
    </table>

    <p style="font-family:Arial,sans-serif;font-size:12px;color:#A8A29E;margin:32px 0 0;padding-top:16px;border-top:1px solid #E7E5E4;">
      Responder a este email irá a ${p.email}
    </p>
  </div>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const payload = body as Record<string, string>

  // Server-side honeypot — silently succeed to not reveal the check
  if (payload.website) {
    return NextResponse.json({ ok: true })
  }

  // Server-side required field validation
  for (const field of REQUIRED) {
    const value = payload[field as RequiredField]
    if (!value || typeof value !== 'string' || !value.trim()) {
      return NextResponse.json(
        { error: `Campo requerido: ${field}` },
        { status: 400 },
      )
    }
  }

  // Server-side email format validation
  if (!isValidEmail(payload.email ?? '')) {
    return NextResponse.json({ error: 'Email inválido.' }, { status: 400 })
  }

  const p: ContactPayload = {
    nombre:          payload.nombre ?? '',
    organizacion:    payload.organizacion,
    email:           payload.email ?? '',
    construyendo:    payload.construyendo ?? '',
    actores:         payload.actores ?? '',
    porQue:          payload.porQue ?? '',
    comoEncontraste: payload.comoEncontraste,
  }

  const to = process.env.CONTACT_EMAIL ?? 'contact@neilmeza.com'
  const subject = p.organizacion?.trim()
    ? `${p.nombre.trim()} — ${p.organizacion.trim()}`
    : p.nombre.trim()

  try {
    const { error } = await resend.emails.send({
      from:     'Formulario — neilmeza.com <noreply@neilmeza.com>',
      to,
      replyTo: p.email,
      subject,
      html:     buildEmailHtml(p),
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json({ error: 'Error al enviar.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Error al enviar.' }, { status: 500 })
  }
}
