# 12 — ARQUITECTURA TÉCNICA
## La Ingeniería de la Plataforma y Sus Decisiones para la Próxima Década

*Este documento define la arquitectura técnica completa de neilmeza.com. Está escrito para que un equipo senior de ingeniería pueda construir e implementar la plataforma directamente desde él. Cada decisión tecnológica tiene una justificación estratégica. La arquitectura sirve a la marca — no al revés.*

---

## I. LA FILOSOFÍA DE LA ARQUITECTURA

La arquitectura técnica de esta plataforma tiene que ser coherente con la misma tesis que la marca sostiene: que la infraestructura invisible bien diseñada hace posible lo que de otra manera no ocurriría. En términos de ingeniería, eso se traduce en tres principios que gobiernan todas las decisiones técnicas.

**Durabilidad por encima de modernidad.** Una plataforma diseñada para diez años no puede ser construida sobre abstracciones que estarán obsoletas en dieciocho meses. Cada decisión tecnológica se evalúa con la pregunta: ¿este componente estará activamente mantenido y será estable en 2030? Las tecnologías que están en la cima de su ciclo de adopción pero no tienen claridad sobre su evolución futura no entran en este stack.

**La complejidad como deuda, no como arquitectura.** La tendencia en ingeniería de software es agregar capas de abstracción, microservicios y sistemas distribuidos antes de que la escala lo requiera. Esta plataforma empieza con la arquitectura más simple que resuelve el problema real y solo escala la complejidad cuando la necesidad es demostrable. Un CMS de archivos en Git es suficiente para el lanzamiento. Un sistema de base de datos distribuida no lo es.

**El rendimiento es parte de la marca.** La experiencia de usuario define que la plataforma debe cargar instantáneamente. Eso no es una aspiración técnica — es un compromiso de marca. Una plataforma que tarda dos segundos en cargar comunica, antes de mostrar una sola palabra, que el equipo detrás de ella no se toma en serio los detalles. La arquitectura debe hacer de la velocidad una consecuencia estructural, no un esfuerzo constante de optimización.

---

## II. EL STACK TECNOLÓGICO

```
Framework:      Next.js 15+ (App Router)
Lenguaje:       TypeScript (strict mode)
Estilos:        CSS Modules + CSS Custom Properties
                (el design system de 08_DESIGN_SYSTEM.md)
Contenido:      MDX + Tina CMS (lanzamiento)
                → Sanity.io (cuando el equipo crezca)
Hosting:        Vercel
Email:          Resend
Imágenes:       next/image (WebP/AVIF automático)
Tipografía:     next/font (subconjunto optimizado)
Búsqueda:       Fuse.js (client-side, sin infraestructura adicional)
Formularios:    Next.js API Routes + Resend
Analytics:      Plausible Analytics (cookieless, GDPR-compliant)
CI/CD:          Vercel + GitHub Actions
Testing:        Vitest + Playwright + axe-core
Monitoreo:      Vercel Analytics + Sentry (errores)
```

**Por qué Next.js y no otras opciones:**

*Astro:* Excelente para sitios de contenido estático puro. Pero cuando la plataforma agregue componentes interactivos (formulario secuencial en móvil, búsqueda, eventual contenido personalizado), Astro requiere más configuración para la interactividad progresiva. Next.js maneja el espectro completo desde estático hasta dinámico sin cambiar el framework.

*Remix:* Enfocado en la experiencia del servidor y la mutación de datos. Para una plataforma predominantemente de lectura con un único formulario de contacto, la propuesta de valor de Remix es excesiva para las necesidades actuales.

*SvelteKit:* Excelente performance y DX. Ecosistema más pequeño que React/Next.js, lo que implica menos herramientas disponibles y menos desarrolladores familiarizados para el mantenimiento futuro.

*Next.js:* El único framework que combina SSG + ISR + API Routes + i18n + optimización de imágenes y tipografía en un sistema coherente, respaldado por Vercel (el proveedor de hosting), con un ecosistema masivo y una trayectoria de estabilidad demostrada.

---

## III. LA ARQUITECTURA FRONTEND

### Modo de renderizado

Esta plataforma usa **Static Site Generation (SSG)** como modo primario para todo el contenido editorial (homepage, casos de estudio, ensayos, sobre Neil). El contenido editorial cambia raramente — publicar un ensayo nuevo ocurre cuatro veces al año — y no requiere datos dinámicos en tiempo real.

Las únicas excepciones al SSG son:
- La API Route del formulario de contacto (server-side, no static)
- Futuras funcionalidades que requieran datos en tiempo real (cuando existan)

**La ventaja del SSG para esta plataforma:** Las páginas estáticas sirven desde el edge de Vercel, con tiempos de respuesta de 20-50ms globalmente. No hay cálculo de servidor en tiempo de solicitud. No hay base de datos que consultar. La velocidad es estructural.

### Estructura de directorios (App Router)

```
src/
├── app/
│   ├── layout.tsx              # Root layout — nav, footer, fonts
│   ├── page.tsx                # Homepage
│   ├── trabajo/
│   │   ├── page.tsx            # Índice de casos
│   │   └── [slug]/
│   │       └── page.tsx        # Caso individual
│   ├── pensamiento/
│   │   ├── page.tsx            # Índice de ensayos
│   │   └── [slug]/
│   │       └── page.tsx        # Ensayo individual
│   ├── sobre/
│   │   └── page.tsx
│   ├── construyamos/
│   │   └── page.tsx
│   └── api/
│       └── contact/
│           └── route.ts        # Formulario de contacto
├── components/
│   ├── ui/                     # Design system components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Form/
│   │   └── Nav/
│   └── content/                # Content-specific components
│       ├── CaseStudy/
│       ├── Essay/
│       └── Homepage/
├── lib/
│   ├── content.ts              # MDX/content utilities
│   ├── metadata.ts             # SEO metadata helpers
│   └── analytics.ts            # Analytics event helpers
├── content/
│   ├── casos/                  # MDX case studies
│   │   └── [slug].mdx
│   ├── ensayos/                # MDX essays
│   │   └── [slug].mdx
│   └── notas/                  # MDX ecosystem notes
│       └── [slug].mdx
├── styles/
│   ├── tokens.css              # Design tokens (08_DESIGN_SYSTEM.md)
│   ├── base.css                # Reset + global base
│   └── typography.css          # Typographic base
└── public/
    ├── images/                 # Static images
    └── fonts/                  # Self-hosted font files
```

### El Layout Root

El layout root define los elementos presentes en todas las páginas: la barra de navegación, el footer mínimo, la carga de tipografía, y los metadatos base. Es el único lugar donde se importan los estilos globales.

```typescript
// app/layout.tsx (estructura, no código final)
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### El sistema de componentes

Los componentes siguen la jerarquía del design system: tokens → UI primitivos → componentes de contenido → patrones de página. Ningún componente tiene valores hardcoded — todos referencian CSS Custom Properties definidas en `tokens.css`.

Los componentes UI son framework-agnostic en su lógica: las decisiones visuales están en CSS, no en JavaScript. Un botón primario es un elemento `<button>` con la clase `.btn-primary` y los tokens del design system — no un componente con 15 props de configuración.

---

## IV. EL MODELO DE CONTENIDO

El modelo de contenido refleja los tres tipos definidos en `09_CONTENT_STRATEGY.md`. Cada tipo tiene un esquema de frontmatter propio.

### Ensayo de Perspectiva

```typescript
// types/content.ts
interface Essay {
  // Identidad
  title: string           // La afirmación — no el tema
  subtitle: string        // Expansión del argumento
  slug: string

  // Publicación
  publishedAt: string     // ISO date
  updatedAt?: string      // ISO date (si hay actualización)
  status: 'published' | 'draft'
  readingTime: number     // Calculado automáticamente

  // Clasificación
  tags: string[]          // Máximo 3, conceptos no keywords
  relatedCases: string[]  // Slugs de casos relacionados

  // SEO
  metaDescription: string // Máximo 155 caracteres
  ogImage?: string        // Path relativo a /public/images
}
```

### Caso de Estudio

```typescript
interface CaseStudy {
  // Identidad
  title: string           // La afirmación del cambio — no el nombre del proyecto
  subtitle?: string
  slug: string
  projectName: string     // El nombre oficial del proyecto (para referencias)

  // Contexto
  territory: string       // Ciudad, región
  period: string          // "2022–2023" o "2022–presente"
  sectors: string[]       // Universidad, Empresa, Gobierno, etc.
  actors: string          // Descripción general sin nombres propios sensibles

  // Documentación
  publishedAt: string
  documentationVersion: 'initial' | 'update-12m' | 'update-36m' | 'update-60m'
  lastReviewedAt: string
  status: 'published' | 'in-preparation' | 'draft'

  // Relaciones
  relatedEssays: string[] // Slugs de ensayos relacionados

  // SEO
  metaDescription: string
  ogImage?: string
}
```

### Nota de Ecosistema

```typescript
interface EcosystemNote {
  title: string
  slug: string
  publishedAt: string
  status: 'published' | 'draft'
  metaDescription: string
}
```

### La validación del esquema

Todos los archivos MDX se validan contra su esquema en tiempo de build. Si un campo requerido está ausente o tiene el tipo incorrecto, el build falla con un mensaje de error claro. Esto evita publicar accidentalmente contenido con metadata incompleta.

```typescript
// lib/content.ts
import { z } from 'zod'

const EssaySchema = z.object({
  title: z.string().min(10).max(120),
  subtitle: z.string().min(20).max(200),
  publishedAt: z.string().datetime(),
  readingTime: z.number().positive(),
  metaDescription: z.string().max(155),
  // ...
})
```

---

## V. LA ESTRATEGIA DE CMS

### Lanzamiento: MDX + Tina CMS

Para el lanzamiento, el contenido vive como archivos MDX en el repositorio. Esta es la arquitectura más simple y más durable:

- **Durabilidad:** Los archivos de texto en un repositorio Git son independientes de cualquier servicio de terceros. Pueden leerse, editarse y migrarse sin depender de que un proveedor de CMS siga existiendo.
- **Control de versiones:** Todo el historial editorial vive en Git — quién cambió qué, cuándo, por qué (si el commit message lo documenta).
- **Performance:** No hay llamada a una API externa en tiempo de build. El contenido ya está en el repositorio.

**Tina CMS** proporciona una interfaz visual para editar los archivos MDX sin necesidad de tocar el código directamente. Funciona como una capa por encima de Git — guarda los cambios como commits en el repositorio. Su interfaz es significativamente mejor que editar MDX directamente, pero no añade dependencia de infraestructura adicional en producción.

### Evolución: Sanity.io (cuando el equipo crezca)

Cuando la plataforma escale a un punto donde haya múltiples personas contribuyendo contenido regularmente (un editor, colaboradores eventuales), la migración a **Sanity.io** es el paso natural:

- Interfaz editorial más potente para múltiples editores
- Previsualizaciones en tiempo real
- Flujos de aprobación de contenido
- API para contenido dinámico si se necesita
- GROQ como lenguaje de consulta es preciso y eficiente

La migración de MDX a Sanity.io está diseñada para ser no destructiva: el schema de Sanity se define para espejear el modelo de contenido de los archivos MDX, y la migración es una importación única de los archivos existentes.

**Lo que no se usa:**

*WordPress:* No porque sea mala tecnología, sino porque introduce una superficie de ataque de seguridad significativa, un modelo de despliegue más complejo, y un paradigma de desarrollo que no es coherente con el stack moderno definido aquí.

*Contentful:* Vendor lock-in más pronunciado que Sanity. Más caro a escala. La experiencia de desarrollo es inferior.

*Notion como CMS:* La API de Notion es inestable y no está diseñada para producción de alto tráfico. No es el lugar correcto para el contenido de una plataforma que promete durabilidad.

---

## VI. EL SISTEMA DE RUTAS

```
/                           Homepage
/trabajo                    Índice de casos de estudio
/trabajo/[slug]             Caso individual
/pensamiento                Índice de ensayos
/pensamiento/[slug]         Ensayo individual
/pensamiento/notas/[slug]   Nota de ecosistema
/sobre                      Sobre Neil
/construyamos               Formulario de contacto
/prensa                     Kit de prensa (futuro)

# Internacionalización (futuro)
/en                         Homepage en inglés
/en/work/[slug]             Caso individual en inglés
/en/thinking/[slug]         Ensayo en inglés
/en/about                   Sobre Neil en inglés
/en/build                   Formulario en inglés
```

**Reglas de routing:**

Las URLs son limpias y descriptivas, en español para la versión española. No hay `/pages/`, no hay números de ID, no hay parámetros de query para el contenido principal. Un ensayo publicado tiene la URL `/pensamiento/la-colaboracion-no-es-un-valor-es-una-infraestructura` — descriptiva, memorable, y permanente.

**Permanencia de URLs:** Las URLs de casos de estudio y ensayos nunca cambian después de publicación. Si el título de un ensayo cambia, el slug original permanece con una redirección 301 hacia el nuevo si el slug también cambiara (lo que debe evitarse). Los slugs se asignan en el momento de publicación y se consideran permanentes.

**Las redirecciones:**
Un archivo `redirects.ts` documenta todas las redirecciones activas con su razón y fecha de creación. Las redirecciones no documentadas acumulan deuda de mantenimiento.

---

## VII. LA INTERNACIONALIZACIÓN

### Arquitectura i18n

Next.js 15 tiene soporte nativo de i18n. La configuración inicial:

```typescript
// next.config.ts
const nextConfig = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localeDetection: false  // Manual — no automático
  }
}
```

`localeDetection: false` es intencional: la plataforma no redirige automáticamente al inglés a un visitante con un navegador en inglés. El cambio de idioma es una decisión explícita del visitante, activada por el selector de idioma en la navegación (cuando el inglés esté disponible).

### El modelo de contenido bilingüe

Los contenidos en español e inglés son adaptaciones, no traducciones (según `10_COPYWRITING.md`). Por lo tanto, se mantienen como archivos independientes — no como traducciones derivadas del español.

```
content/
├── ensayos/
│   ├── es/
│   │   └── [slug].mdx      # Versión en español
│   └── en/
│       └── [slug].mdx      # Adaptación en inglés (archivo separado)
└── casos/
    ├── es/
    │   └── [slug].mdx
    └── en/
        └── [slug].mdx
```

El sistema registra qué contenidos tienen versión en inglés y cuáles no. Los que no tienen versión en inglés muestran solo la versión en español, con una nota de que la adaptación al inglés está en proceso.

### Los textos de UI (microcopy)

Los textos de interfaz (navegación, botones, mensajes de formulario, errores) se gestionan con un sistema de traducciones ligero:

```typescript
// lib/i18n/es.ts
export const messages = {
  nav: {
    work: 'Trabajo',
    thinking: 'Pensamiento',
    about: 'Sobre Neil',
    cta: 'Construyamos',
  },
  contact: {
    submit: 'Construyamos →',
    success: 'La conversación empieza ahora.',
  }
}
```

No se usa una librería pesada de i18n (como next-intl o react-i18next) en el lanzamiento — el volumen de textos de UI es manejable con un archivo de constantes tipado. Si la complejidad crece, se migra a next-intl.

---

## VIII. LA BÚSQUEDA

Para el volumen de contenido esperado (máximo 100-150 piezas en los primeros tres años), la búsqueda client-side con **Fuse.js** es suficiente y no requiere infraestructura adicional.

### Implementación

En tiempo de build, se genera un índice de búsqueda JSON con todos los contenidos:

```typescript
// lib/search-index.ts
interface SearchItem {
  title: string
  subtitle: string
  slug: string
  type: 'essay' | 'case-study' | 'note'
  excerpt: string         // Primeros 200 caracteres del contenido
  tags: string[]
}
```

Este índice se sirve como un archivo estático y se carga en el cliente solo cuando el usuario activa la búsqueda. Fuse.js hace la búsqueda fuzzy sobre el índice en memoria.

### Cuándo migrar a Algolia

Cuando el índice supere las 500 piezas de contenido o cuando el tiempo de carga del índice JSON impacte la performance, se migra a **Algolia** (con su tier gratuito para volúmenes moderados). La API de Algolia es lo suficientemente simple como para que la migración no requiera reescribir la lógica de búsqueda.

---

## IX. EL FORMULARIO DE CONTACTO

El formulario de Construyamos tiene la siguiente arquitectura:

### Client-side (React)

```
FormContact (componente)
├── Validación: Zod schema (mismo que el server-side)
├── Estado: useReducer (campo activo, completado, enviado, error)
├── Comportamiento móvil: preguntas secuenciales
├── Comportamiento desktop: todas visibles, énfasis en activo
└── Envío: fetch() a /api/contact
```

### Server-side (API Route)

```typescript
// app/api/contact/route.ts
// 1. Validar con Zod (misma definición que el client)
// 2. Rate limiting: máximo 3 envíos por IP en 24 horas
// 3. Honeypot: campo oculto para detección de bots
// 4. Enviar email via Resend
// 5. Log del envío (fecha, estado, no el contenido sensible)
// 6. Responder 200 o error con mensaje específico
```

### Anti-spam

La estrategia de anti-spam usa tres capas sin dependencia de reCAPTCHA (que añade tracking):

1. **Honeypot field:** Un campo oculto con CSS que los bots llenan y los humanos no ven. Si viene relleno, el envío se descarta silenciosamente.

2. **Time-based check:** El formulario incluye un timestamp de cuándo se cargó. Envíos completados en menos de 3 segundos son probablemente bots.

3. **Rate limiting por IP:** Máximo 3 envíos por IP en 24 horas (implementado con Vercel KV o un middleware simple en Edge).

**Cloudflare Turnstile** es la alternativa si el spam resulta ser un problema significativo — es el sistema más respetuoso de la privacidad entre las opciones de CAPTCHA, no requiere interacción del usuario en la mayoría de los casos, y no usa cookies de tracking.

### Almacenamiento de envíos

Los envíos del formulario se registran en una base de datos ligera (Vercel KV, Supabase en su tier gratuito, o simplemente Notion API como inbox) además de enviarse por email. Esta redundancia asegura que ningún envío se pierda si el email falla.

---

## X. EL SISTEMA DE ANALYTICS

**Plausible Analytics** como sistema primario. Las razones técnicas y estratégicas:

*Técnicas:* Script de 1KB (versus 45KB+ de Google Analytics 4). Sin cookies. Sin datos en el cliente. Sin impacto en los Core Web Vitals. Compatible con browsers que bloquean trackers.

*Estratégicas:* La plataforma hace una promesa implícita de respeto a la privacidad del visitante. Usar Google Analytics para rastrear el comportamiento de los mismos líderes que confían sus datos al formulario de contacto es inconsistente con esa promesa.

### Las métricas que importan

```
Métricas de contenido:
- Pageviews por caso de estudio y ensayo
- Scroll depth en ensayos (¿están leyendo completo?)
- Tiempo en página para contenido de lectura larga

Métricas de conversion:
- Vistas de página /construyamos
- Tasa de inicio del formulario (campo 1 interactuado)
- Tasa de completación del formulario
- Origen del tráfico que convierte

Métricas de distribución:
- Fuentes de tráfico (qué referrers traen visitas de calidad)
- Dispositivos (desktop vs. mobile — afecta prioridades de UX)
- Países (cuando el inglés se active, qué geografías visitan)
```

### Lo que NO se rastrea

- Identidad del visitante
- Comportamiento cross-site
- Datos demográficos
- Historial de búsqueda

---

## XI. LA SEGURIDAD

### Headers HTTP

Todos los headers de seguridad se configuran en `next.config.ts` y se aplican a todas las respuestas:

```typescript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: buildCSP()  // Función que construye la CSP estricta
  }
]
```

### Content Security Policy

La CSP es estricta y permite solo los orígenes explícitamente necesarios:

```
default-src 'self';
script-src 'self' 'nonce-[NONCE]' plausible.io;
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self';
connect-src 'self' plausible.io;
frame-ancestors 'none';
```

La CSP se revisa cada vez que se agrega una nueva integración de terceros.

### Dependencias y supply chain

- Todas las dependencias tienen un `package-lock.json` con versiones exactas (`npm ci` en producción, nunca `npm install`)
- Auditoría de dependencias en cada PR (`npm audit`)
- Dependabot activo para actualizaciones de seguridad automáticas
- Mínimo de dependencias de terceros: cada nueva dependencia requiere justificación explícita

### Datos sensibles

El formulario de contacto recibe información que puede ser confidencial. Las reglas:

- Los datos de formulario nunca se loguean en texto claro
- El almacenamiento de envíos usa el mínimo de datos necesarios (fecha, estado, referencia — no el contenido completo del mensaje si hay riesgos de privacidad)
- Los datos de envíos se eliminan automáticamente después de 90 días (configurable)

---

## XII. EL HOSTING Y EL DESPLIEGUE

### Vercel como plataforma principal

**Por qué Vercel:**

Vercel es la única plataforma que combina deployment nativo de Next.js (mismo equipo), Edge Network global con presencia en múltiples regiones de América Latina, preview deployments automáticos por PR, y un modelo de pricing que escala limpiamente desde el tier gratuito.

Para una plataforma de este perfil (contenido principalmente estático, un formulario de contacto, analytics ligeros), el tier gratuito de Vercel es suficiente por años. El escalado a planes pagos ocurre cuando el tráfico supera límites que esta plataforma tardará mucho en alcanzar.

### El flujo de despliegue

```
feature-branch → PR → Preview Deployment (URL única)
                     ↓
               Code Review + Preview Testing
                     ↓
main branch ← Merge → Production Deployment (automático)
                     ↓
               neilmeza.com (live en ~30 segundos)
```

**Las tres reglas del despliegue:**

1. **`main` es siempre desplegable.** No existe contenido a medio hacer en `main`. Si un cambio no está listo para producción, vive en una feature branch.

2. **Todo despliegue en producción tiene un preview aprobado.** Nadie hace push directo a `main`. Los cambios llegan por PR.

3. **Los rollbacks son instantáneos.** Vercel guarda los últimos 20 despliegues. Un rollback es un click — no un proceso de recuperación de emergencia.

### El dominio y el DNS

- Dominio primario: `neilmeza.com` (con redirect de `www`)
- DNS: Cloudflare (mejor tiempo de propagación global que el DNS de Vercel)
- Certificado SSL: Let's Encrypt vía Vercel, renovación automática
- Email: `contact@neilmeza.com` via Resend (o Proton Mail + alias)

---

## XIII. LA PERFORMANCE

Los objetivos de Core Web Vitals son parte de la definición de "completado" para cualquier página o feature:

```
LCP (Largest Contentful Paint):  < 1.5s  (objetivo: < 1.2s)
CLS (Cumulative Layout Shift):   < 0.1   (objetivo: < 0.05)
INP (Interaction to Next Paint): < 200ms (objetivo: < 100ms)
FCP (First Contentful Paint):    < 1.0s
TTFB (Time to First Byte):       < 200ms (edge cache)
```

### Las estrategias de performance estructural

**Imágenes:** `next/image` convierte todas las imágenes a WebP/AVIF automáticamente y sirve el formato óptimo por navegador. Todos los elementos `<img>` tienen `width` y `height` definidos para evitar CLS. Las imágenes above the fold tienen `priority={true}` para precargarse.

**Tipografía:** `next/font` descarga y auto-aloja las fuentes tipográficas, eliminando la request externa a Google Fonts o al CDN del foundry. La propiedad `font-display: optional` previene el Flash of Unstyled Text (FOUT) en fuentes secundarias.

**JavaScript:** El App Router de Next.js ya elimina el JavaScript no necesario de las páginas estáticas. Los componentes que solo son necesarios en el cliente (el formulario de contacto, la búsqueda) usan dynamic imports con `{ ssr: false }` para no bloquear la carga inicial.

**CSS:** Los estilos críticos (tokens, base, tipografía) se incluyen en el `<head>`. Los estilos de componentes específicos se cargan de manera lazy con CSS Modules. No hay un archivo CSS global de 500KB — hay múltiples archivos pequeños cargados solo cuando el componente se usa.

**Third-party scripts:** El script de Plausible se carga con `strategy="afterInteractive"` — nunca bloquea el render inicial. No hay otros scripts de terceros en el lanzamiento.

### Performance Budget

Antes de cada despliegue a producción, Lighthouse CI verifica que la performance no haya regresado:

```yaml
# .github/workflows/lighthouse.yml
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100
```

Un PR que hace caer cualquiera de estos scores por debajo del mínimo no puede hacer merge sin revisión explícita.

---

## XIV. LA ESCALABILIDAD

La arquitectura actual es suficiente para los primeros tres a cinco años de la plataforma. Estas son las rutas de escalado cuando sean necesarias:

**Cuando el contenido supere las 200 piezas:**
Migrar el CMS de archivos MDX a Sanity.io. La estructura del contenido (los tipos definidos en la Sección IV) no cambia — solo el origen de los datos.

**Cuando el tráfico supere las 100.000 visitas mensuales:**
Activar Vercel's Edge Config para configuración sin redeploy. Considerar ISR (Incremental Static Regeneration) para las páginas de índice si tienen alta demanda de actualización.

**Cuando la búsqueda necesite más capacidad:**
Migrar de Fuse.js a Algolia. La interfaz de búsqueda del usuario no cambia — solo la fuente de datos detrás de ella.

**Cuando se agregue contenido de comunidad o personalizado:**
La única adición que requeriría un cambio arquitectónico significativo es contenido que dependa de autenticación de usuario (contenido privado, comunidad). Para eso, se evaluaría Clerk como sistema de autenticación y Supabase como base de datos. Pero este escenario es Fase 4+ del roadmap — no una consideración para el lanzamiento.

**Cuando se active el inglés:**
La arquitectura i18n ya está configurada para soportar el inglés desde el día uno. La activación requiere: crear los archivos de contenido en inglés, agregar los mensajes de UI en inglés, y activar el selector de idioma en la navegación. No hay cambio arquitectónico.

---

## XV. EL ROADMAP DE INTEGRACIÓN DE IA

La inteligencia artificial tiene un lugar en esta plataforma — pero el lugar correcto, en el momento correcto.

### Fase 1 — Lanzamiento (sin IA visible)

La plataforma se lanza sin funcionalidades de IA en la interfaz pública. La IA se usa como herramienta interna para el proceso editorial (según `09_CONTENT_STRATEGY.md`), pero no es parte de la experiencia del visitante.

*Razón:* La plataforma necesita establecer primero su voz editorial como auténtica y específica. Introducir IA en la experiencia pública antes de establecer esa autenticidad crea el riesgo de que el contenido parezca generado, lo que erosiona el principal activo de la marca.

### Fase 2 — Recomendaciones de contenido (18-24 meses)

Cuando el corpus de contenido tenga suficiente densidad (15+ ensayos, 5+ casos), se puede implementar un sistema de recomendaciones basado en similitud semántica:

- Al final de cada ensayo: "Ensayos relacionados" calculados por similitud de embeddings, no por tags manuales
- Al final de cada caso: "El ensayo que este caso informó" — conexión automática por relevancia semántica

*Implementación:* Embeddings generados en build time con la API de OpenAI o un modelo open-source. Los vectores se almacenan como archivos estáticos. La búsqueda de similitud ocurre en el cliente o en un Edge Function ligero.

### Fase 3 — Interfaz conversacional (36-48 meses)

Una interfaz opcional para explorar el contenido de la plataforma de manera conversacional. No un chatbot genérico — un sistema que usa el corpus de contenido de la plataforma como su única fuente de conocimiento (RAG sobre el contenido publicado).

El visitante puede preguntar: "¿Cómo describe Neil el problema de la innovación en territorios no-convencionales?" y recibir una respuesta con citas exactas y links a las piezas de contenido originales.

*Restricciones de diseño:* El sistema nunca genera contenido nuevo — solo cita y sintetiza el contenido existente. Todas las respuestas incluyen referencias verificables.

### Fase 4 — Personalización de acceso (futuro)

Cuando la plataforma tenga una capa de comunidad, la IA puede ayudar a conectar visitantes con el contenido más relevante para su contexto específico. Este escenario requiere la infraestructura de autenticación mencionada en la Sección XIV.

---

## XVI. LA FILOSOFÍA DE MANTENIMIENTO

Una plataforma que promete diez años de duración necesita una filosofía de mantenimiento que haga que el costo de mantenerla se mantenga bajo y predecible.

**El calendario de mantenimiento:**

*Semanal (10 minutos):* Revisar alertas de Sentry. Verificar que el formulario de contacto sigue funcionando. Verificar que los últimos contenidos publicados se renderizan correctamente.

*Mensual (1 hora):* Revisar el dashboard de Plausible para anomalías. Revisar Dependabot PRs y mergear actualizaciones de seguridad.

*Trimestral (2-3 horas):* Auditoría de performance con Lighthouse. Revisar Core Web Vitals en Search Console. Actualizar dependencias mayores. Verificar que los redirects siguen siendo correctos.

*Anual (medio día):* Revisar la versión de Next.js y migrar si hay una versión LTS nueva disponible. Revisar el stack completo contra el estado del arte.

**Las dependencias que nunca se actualizan precipitadamente:**

La regla es esperar al menos 30 días antes de actualizar una dependencia major (cambio de versión 1.x → 2.x). Los cambios rompedores en dependencias mayores son la fuente principal de regresiones no esperadas.

**El registro de decisiones arquitectónicas (ADR):**

Cada decisión técnica no obvia se documenta en un Architecture Decision Record:

```markdown
# ADR-001: Uso de MDX sobre Sanity.io para el lanzamiento

**Estado:** Aceptado
**Fecha:** [fecha]
**Contexto:** [Por qué se tomó esta decisión]
**Decisión:** [Qué se decidió]
**Consecuencias:** [Ventajas y desventajas]
**Revisión:** [Cuándo y bajo qué condiciones se debería reconsiderar]
```

Estos registros viven en `docs/adr/` en el repositorio.

---

## XVII. LA ESTRATEGIA DE TESTING

### Los niveles de testing y sus objetivos

**Tests unitarios (Vitest)**
Para las funciones de utilidad que tienen lógica que puede fallar: la generación del índice de búsqueda, la validación de schemas de contenido, los helpers de metadata SEO, los cálculos de tiempo de lectura. No para los componentes UI — los componentes UI se prueban con tests de integración visual.

```
Cobertura objetivo: 80% en lib/ y utils/
Herramienta: Vitest (más rápido que Jest, API compatible)
Cuándo se ejecutan: Pre-commit hook + CI
```

**Tests de integración de formulario**
El flujo crítico de la plataforma (usuario completa el formulario → API Route lo procesa → email se envía) se prueba con un test de integración que verifica cada paso:

```
- La validación client-side rechaza formularios incompletos
- La validación server-side es independiente de la client-side
- El rate limiting funciona correctamente
- El email se envía o el error se maneja gracefully
```

**Tests end-to-end (Playwright)**
Los journeys de usuario críticos se prueban como flujos completos:

```
Journey 1: Homepage → Caso de estudio → Volver a homepage
Journey 2: Homepage → Pensamiento → Leer ensayo completo
Journey 3: Homepage → Construyamos → Completar y enviar formulario
Journey 4: Buscar contenido y navegar al resultado
```

Playwright ejecuta estos tests contra el preview deployment antes de que cualquier PR pueda hacer merge a `main`.

**Tests de accesibilidad (axe-core)**
Integrado en los tests de Playwright: cada página crítica se evalúa con axe-core durante el test e2e. Un error de accesibilidad que no existía antes del PR rompe el CI.

**Tests de performance (Lighthouse CI)**
Como se define en la Sección XIII: Lighthouse CI corre en cada PR y verifica que los scores no regresen.

**Tests de regresión visual (Chromatic o Percy)**
Para los componentes del design system: se captura un screenshot de cada estado de cada componente y se compara con el baseline. Diferencias visuales requieren aprobación explícita.

---

## XVIII. LA DOCUMENTACIÓN TÉCNICA

La documentación técnica de esta plataforma vive en el repositorio — nunca en wikis externas que se dessincronizan del código.

**`README.md` en la raíz:**
La documentación de arranque del proyecto: cómo instalar, cómo correr en local, cómo correr los tests, cómo desplegar. Esta documentación debe estar siempre actualizada — si no lo está, el primer día de un nuevo desarrollador es más difícil de lo necesario.

**`docs/adr/`:**
Los Architecture Decision Records de todas las decisiones técnicas no obvias.

**`docs/content-guide.md`:**
Cómo crear un nuevo ensayo o caso de estudio: la estructura de los archivos MDX, los campos requeridos, cómo previsualizar en local, cómo publicar.

**Los comentarios en el código:**
Siguiendo el principio de `09_CONTENT_STRATEGY.md` aplicado al código: los comentarios explican el POR QUÉ, no el QUÉ. El código bien escrito explica qué hace. Los comentarios explican por qué una decisión no obvia fue tomada.

```typescript
// Rate limiting deliberadamente conservador: 3 envíos en 24h.
// La audiencia objetivo (líderes institucionales) nunca necesita
// más — y los bots sí. Ajustar solo si hay evidencia de false positives.
const RATE_LIMIT = { requests: 3, window: '24h' }
```

---

*Documento parte de la arquitectura estratégica de neilmeza.com. Leer en conjunto con `08_DESIGN_SYSTEM.md` y `14_PERFORMANCE.md`. Las decisiones de performance y de diseño son inseparables de las decisiones de arquitectura — estos tres documentos forman una unidad técnica coherente.*
