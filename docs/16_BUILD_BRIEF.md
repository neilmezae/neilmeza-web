# 16 — BUILD BRIEF V1
## El Puente Entre la Estrategia y el Código

*Este documento traduce todos los documentos estratégicos previos en instrucciones concretas de implementación para la primera versión de neilmeza.com. No crea filosofía nueva — extrae las decisiones de los documentos 00–15 y las convierte en alcance, componentes, contenido requerido y criterios de lanzamiento. El equipo de desarrollo debe leer este documento como la fuente de verdad técnica y editorial para la V1.*

---

## I. ALCANCE DE LA V1

### Lo que la V1 resuelve

La V1 de neilmeza.com debe responder con precisión a la pregunta que un rector, director de innovación o líder de fundación haría después de leer la primera página: *¿quién es esta persona, qué ha construido, y por qué debería interesarme construir junto a ella?*

Nada más. Nada menos.

La V1 no es una plataforma completa — es la versión mínima que ya es verdad. Contiene exactamente lo que existe con rigor suficiente para publicarse, y excluye todo lo que aún no tiene la profundidad que la marca exige.

### Páginas incluidas en V1

```
/                    → Homepage
/trabajo             → Índice de casos de estudio
/trabajo/[slug]      → Página individual de cada caso (2–3 casos al launch)
/pensamiento         → Índice de ensayos y perspectivas
/pensamiento/[slug]  → Página individual de cada pieza (3–5 al launch)
/sobre               → Sobre Neil
/construyamos        → Formulario de contacto estratégico
/404                 → Página de error
```

### Stack técnico confirmado

```
Framework:        Next.js 15+ (App Router)
Lenguaje:         TypeScript — strict mode
Estilos:          CSS Modules + CSS Custom Properties (sin CSS-in-JS runtime)
Contenido:        MDX + Tina CMS (interfaz editorial)
Hosting:          Vercel (edge network)
Email:            Resend
Analytics:        Plausible Analytics (script de 1KB, cookieless)
Tipografías:      next/font — Söhne + Tiempos Text (self-hosted, subset Latin)
Imágenes:         next/image (WebP/AVIF automático)
Formulario:       sin reCAPTCHA — honeypot + verificación temporal + rate limiting
```

---

## II. PÁGINAS: SECCIONES, PROPÓSITO Y CONTENIDO REQUERIDO

### 1. HOMEPAGE — `/`

**Objetivo único:** Que el visitante entienda en treinta segundos que está ante algo distinto, y que quiera seguir.

---

#### Bloque 1 — HERO

**Propósito:** Primera impresión. Establece que la plataforma tiene una posición intelectual. No presenta a Neil — afirma algo sobre el mundo.

**Secciones:**
- Frase de apertura principal (display, 64–96px)
- Subtítulo (una línea que sitúa el concepto)
- Scroll indicator (no botón — indicador de continuación)

**Contenido requerido:**
- `[HERO_HEADLINE]` — La frase más precisa de la marca. Opciones candidatas en `10_COPYWRITING.md`. No es bienvenida, no es presentación. Es una afirmación.
- `[HERO_SUBTITLE]` — Una sola línea que nombra el concepto de infraestructura colaborativa en términos que el visitante de la audiencia primaria reconoce de inmediato.

**Especificaciones:**
- 100vh en todos los viewports
- Fondo: `--color-background` (#F9F8F6)
- Nav: transparente sobre el hero, se vuelve sólida al primer scroll (transición 200ms)
- Sin foto de perfil en este bloque
- Sin párrafo de bienvenida

---

#### Bloque 2 — EL ARGUMENTO

**Propósito:** Articular la tesis de la infraestructura colaborativa. El visitante debe terminar este bloque pensando "esto es verdad, y nadie lo había dicho de esta manera."

**Secciones:**
- 3–4 párrafos cortos que desarrollan la tesis
- No es presentación de Neil — es una proposición sobre cómo funciona la innovación y por qué falla

**Contenido requerido:**
- `[ARGUMENTO_P1]` — El problema: por qué los ecosistemas de innovación fracasan incluso con todos los ingredientes.
- `[ARGUMENTO_P2]` — La idea: la infraestructura invisible que hace posible la colaboración.
- `[ARGUMENTO_P3]` — La prueba: que esto no es teoría — ha sido construido.
- `[ARGUMENTO_P4]` — La invitación implícita: lo que esto significa para quien lee.

**Especificaciones:**
- Columna de texto: max-width 68ch
- Tipografía: Söhne Regular, 18–21px, leading 1.65
- Sin imágenes en este bloque
- Neil aparece como constructor de la tesis, no como autor declarado

---

#### Bloque 3 — EL TRABAJO

**Propósito:** Demostrar, brevemente, que la tesis ha sido construida. Llevar al visitante de la proposición a la evidencia.

**Secciones:**
- 3 casos de estudio seleccionados (los de mayor representatividad, no los más recientes)
- Cada uno: imagen textural o contextual + frase que captura lo que cambió + link al caso completo

**Contenido requerido:**
- `[TRABAJO_CASO_1]` → Caso más representativo (sugerido: Global Youth Summit o TEDxAntofagasta)
- `[TRABAJO_CASO_2]` → Segundo caso (sugerido: UCN o Shinsekai)
- `[TRABAJO_CASO_3]` → Tercer caso
- Para cada caso: una frase de 12–18 palabras que captura lo que cambió (no descripción del proyecto)
- CTA secundario: "Conoce el trabajo" → /trabajo

**Especificaciones:**
- No son cards con thumbnails estándar — diseño editorial, no portfolio
- En desktop: hover revela una frase clave del caso (reemplaza el subtítulo genérico)
- Imagen: contextual, no ilustrativa; si no existe imagen correcta, solo texto

---

#### Bloque 4 — EL PENSAMIENTO

**Propósito:** Demostrar que hay sustancia intelectual detrás de la práctica. Dar razón para volver.

**Secciones:**
- 2 ensayos o perspectivas destacadas
- Cada uno: titular fuerte + párrafo inicial + link para leer completo

**Contenido requerido:**
- `[PENSAMIENTO_PIEZA_1]` → El ensayo fundacional (el primero a escribir)
- `[PENSAMIENTO_PIEZA_2]` → Segunda pieza de mayor relevancia
- Para cada uno: titular + primer párrafo (del ensayo real, no texto de presentación)
- CTA terciario: "Lee las ideas" → /pensamiento

**Especificaciones:**
- Titulares en Söhne Bold (600), no menor a 28px
- Sin thumbnails ni imágenes de portada
- En desktop: hover sobre titular aumenta peso tipográfico levemente

---

#### Bloque 5 — LA PERSONA

**Propósito:** Situar a Neil sin que se sienta como una bio. El origen y el propósito, no los logros.

**Secciones:**
- Un párrafo sobre Neil y Antofagasta (origen y decisión deliberada)
- Link a "Sobre Neil" para quien quiera el relato completo

**Contenido requerido:**
- `[PERSONA_PARRAFO]` — No es bio. No lista logros. Es la declaración de de dónde viene la convicción y por qué Antofagasta importa. Ver `10_COPYWRITING.md` para el tono exacto.

**Especificaciones:**
- Columna estrecha, 52ch máximo
- Sin foto de perfil corporativa
- Link a /sobre: texto simple "Sobre Neil →"

---

#### Bloque 6 — LA INVITACIÓN

**Propósito:** El cierre del homepage. Convertir el estado mental generado por el recorrido en el primer paso hacia una conversación.

**Secciones:**
- Pregunta directa al lector
- CTA primario: "Construyamos" → /construyamos

**Contenido requerido:**
- `[INVITACION_PREGUNTA]` — No "contáctame". Una pregunta directa: ¿Qué estás construyendo que requiere la infraestructura que aquí se describe?
- `[INVITACION_CTA]` — Texto del botón: "Hablemos" o "Construyamos juntos"

**Especificaciones:**
- Fondo: `--color-background-subtle` (#F2F1EE) para distinguir del resto
- Pregunta en tipografía display, no como párrafo de cuerpo
- Botón: primario, acento cobre

---

### 2. TRABAJO — `/trabajo`

**Objetivo único:** Demostrar, con rigor y especificidad, que la infraestructura colaborativa ha sido construida en condiciones reales.

---

#### Página índice — `/trabajo`

**Propósito:** Vista general de todos los ecosistemas documentados. Diseño que comunica que son documentos de trabajo, no piezas de portfolio.

**Secciones:**
- Título de sección ("Trabajo" o "Ecosistemas")
- Lista curada de casos: nombre del ecosistema + frase esencia + territorio + rango temporal

**Contenido requerido:**
- Para cada caso en el índice: nombre oficial + territorio (ciudad, región) + período (ej. "2018–2022") + frase de 10–15 palabras que captura la esencia del caso

**Especificaciones:**
- Lista, no grid. No thumbnails en el índice.
- Ordenada por relevancia estratégica, no cronología
- Navegación lateral en desktop (permite saltar entre casos sin volver al índice)

---

#### Página individual — `/trabajo/[slug]`

**Propósito:** Narrar cada ecosistema con la profundidad de un ensayo. La evidencia que sustenta la tesis.

**Secciones por caso:**

| Sección | Propósito | Contenido requerido |
|---|---|---|
| Contexto | Qué existía antes, qué no existía, qué condiciones lo hacían difícil | 3–5 párrafos. Condiciones iniciales verificables. |
| Los actores | Quiénes eran y por qué no colaboraban antes | Descripción de sectores/instituciones. Sin nombres completos si son sensibles. |
| La infraestructura construida | Qué diseñó Neil específicamente — las condiciones, no las tareas | El corazón del caso. Qué hizo que no existía. Cómo lo construyó. |
| Lo que cambió | Resultados concretos, verificables | Evidencia Tipo A (directa) y Tipo B (citada). Sin declaraciones sin respaldo. |
| Lo que permanece | Qué sigue funcionando sin la presencia directa de Neil | Evidencia de permanencia. El criterio más exigente del documento. |
| Conector narrativo | Llevar al visitante al siguiente paso lógico | Link al ensayo de Pensamiento relacionado + link al siguiente caso |

**Casos a publicar en V1 (mínimo 2, ideal 3):**
- Global Youth Summit Chile
- TEDxAntofagasta
- UCN (o Shinsekai o Kaizen Academy)

**Especificaciones:**
- Formato MDX
- Mínimo de madurez: 6+ meses post-involucración (criterio de `11_CASE_STUDIES.md`)
- Al final: "CTA primario" → /construyamos
- Al final: link al ensayo relacionado

---

### 3. PENSAMIENTO — `/pensamiento`

**Objetivo único:** Establecer la profundidad del marco conceptual y crear razones para volver.

---

#### Página índice — `/pensamiento`

**Propósito:** Entrada al corpus intelectual. Diseño que comunica que el contenido vale más que la presentación.

**Secciones:**
- Título ("Pensamiento")
- Lista de piezas publicadas (ordenadas inversamente por fecha)
- Estado vacío honesto si hay pocas piezas al lanzamiento

**Contenido requerido:**
- Para cada pieza en el índice: título + subtítulo + fecha de publicación + tiempo de lectura estimado
- Estado vacío (si hay menos de 4 piezas): texto que contextualiza la escasez: "Lo que aparece aquí es lo que ha valido la pena escribir, no lo que ha sido posible publicar rápido."

**Especificaciones:**
- Lista simple. Sin thumbnails, sin categorías innecesarias.
- Fecha en formato: "Enero 2026" (no numérico)
- Tiempo de lectura: calculado automáticamente desde el MDX (palabras / 250)

---

#### Página individual — `/pensamiento/[slug]`

**Propósito:** La experiencia de lectura de largo aliento. La sección más importante de la plataforma en mobile.

**Secciones:**

| Sección | Propósito | Contenido requerido |
|---|---|---|
| Cabecera del ensayo | Situar la pieza antes de leer | Título + subtítulo + fecha + tiempo de lectura + etiquetas temáticas |
| Cuerpo del ensayo | El argumento completo | MDX. Mínimo 1.500 palabras. Sin listas de consejos. Sin H2 innecesarios que fragmenten el argumento. |
| Conexiones | Llevar al lector a la evidencia o profundidad relacionada | Casos de estudio que sustentan el argumento + otras piezas de Pensamiento relacionadas |
| CTA final | Iniciar conversación si el argumento resonó | Conector narrativo + "Construyamos" → /construyamos |

**Tres tipos de piezas (del `09_CONTENT_STRATEGY.md`):**
- **Ensayos de Perspectiva:** 1.500–4.000 palabras. Argumento desarrollado. Cuerpo en Tiempos Text (serif).
- **Casos de Pensamiento:** pueden coexistir en el índice pero son estructuralmente diferentes (→ /trabajo).
- **Notas de Ecosistema:** 400–800 palabras. Observación o reflexión concreta. Mismo índice, etiqueta diferente.

**Especificaciones:**
- Cuerpo de ensayo: Tiempos Text 18px, leading 1.75, max-width 52ch
- Sin sidebar. Sin elementos que compitan con la lectura.
- Barra de progreso de lectura: sutil, en la parte superior de la ventana
- Al llegar al final: conector narrativo "Esto continúa en..." (no "También te puede interesar")

---

### 4. SOBRE NEIL — `/sobre`

**Objetivo único:** Que el visitante entienda de dónde viene la tesis, por qué Antofagasta importa, y quién es la persona — sin que se sienta como un CV.

---

**Secciones:**

| Sección | Propósito | Contenido requerido |
|---|---|---|
| El origen | Antofagasta como decisión deliberada, no como circunstancia | Párrafo(s) sobre la ciudad, el desierto, la decisión de construir desde ahí. Tono: primera persona, no biográfico. |
| La observación | Lo que Neil vio que no encajaba con el relato dominante | La incomodidad intelectual que inició la tesis. Sin grandilocuencia. |
| La convicción | La tesis articulada en este contexto biográfico | No definición técnica — la versión que emerge de la historia. |
| La trayectoria | Los proyectos contados como acumulación de evidencia | No lista de logros. Cada proyecto como episodio de la prueba. Links a casos en /trabajo. |
| La dirección | Hacia dónde va en los próximos años | Breve. Sin promesas de proyecto. La orientación, no el plan. |
| Bloque "La Tesis" | Definición aislada del concepto, citable y compartible | Definición precisa de infraestructura colaborativa + las dos frases clave de la marca. Diseño destacado. |
| CTA final | Transición a la conversación | "Si lo que lees aquí resuena con lo que estás construyendo..." → /construyamos |

**Contenido requerido:**
- `[SOBRE_ORIGEN]` — El texto completo de la historia de origen. Mínimo 400 palabras. Ver voz definida en `10_COPYWRITING.md`.
- `[SOBRE_TRAYECTORIA]` — Lista narrativa de proyectos con links a sus casos. No fechas solas — frases que describen qué cambió.
- `[SOBRE_TESIS]` — Definición precisa (2–3 oraciones) de infraestructura colaborativa para el bloque visual destacado.
- `[SOBRE_FRASES_MARCA]` — Las dos frases clave: "Mi visión nunca ha sido regional. Mi punto de partida sí lo es." y "Transformar la complejidad en colaboración y la colaboración en resultados."
- `[SOBRE_DIRECCION]` — 1–2 párrafos sobre la dirección de los próximos años.

**Especificaciones:**
- Una sola columna de texto en desktop
- Sin timeline visual. Sin lista de habilidades. Sin foto corporativa al inicio.
- Imágenes contextuales opcionales (de los proyectos reales)
- Email de contacto directo visible en esta página (para periodistas): `contact@neilmeza.com`
- JSON-LD Person schema en esta página (más completo que en las demás)

---

### 5. CONSTRUYAMOS — `/construyamos`

**Objetivo único:** Convertir el estado mental generado por el recorrido anterior en una conversación real con las personas correctas.

---

**Secciones:**

| Sección | Propósito | Contenido requerido |
|---|---|---|
| Con quiénes trabaja Neil | Cualificar y filtrar con claridad | Descripción directa del tipo de alianzas — desafíos, actores, orientación de largo plazo. No lista de servicios. |
| Qué no es esto | Ahorrar tiempo a ambas partes | 2–3 líneas que aclaran qué tipo de conversación este espacio NO produce. Tono: claridad, no rechazo. |
| El formulario estratégico | Iniciar la conversación correcta | 4 preguntas que obligan a pensar antes de enviar |

**Las 4 preguntas del formulario:**
1. *¿Qué estás tratando de construir?*
2. *¿Qué actores necesitas conectar para que eso ocurra?*
3. *¿Por qué no ha ocurrido todavía?*
4. *¿Cómo encontraste esta plataforma?*

**Campos adicionales del formulario (no preguntas):**
- Nombre
- Organización / Contexto
- Email de contacto

**Botón de envío:** No dice "Enviar" — dice "Empecemos"

**Estado post-envío:** "La conversación empieza ahora. Neil revisará tu mensaje y estará en contacto." (sin redirigir a una página de gracias genérica — el estado de confirmación reemplaza el formulario in situ)

**Contenido requerido:**
- `[CONSTRUYAMOS_CON_QUIENES]` — Párrafo descriptivo. Tipos de desafíos. Tipos de actores. Orientación al largo plazo.
- `[CONSTRUYAMOS_QUE_NO]` — 2–3 líneas de claridad: consultoría puntual con entregables en semanas, charlas de motivación, proyectos sin visión de largo plazo.
- Texto de confirmación post-envío

**Especificaciones:**
- En mobile: el formulario presenta las preguntas de a una (wizard de 4 pasos). No todas visibles simultáneamente.
- Anti-spam: honeypot field + verificación de tiempo mínimo de llenado (< 3 segundos = bot) + rate limiting en el endpoint de Resend
- Sin reCAPTCHA
- Envío via Resend a `contact@neilmeza.com`

---

### 6. PÁGINA 404

**Propósito:** Mantener la voz de la marca incluso en el error. No romper la experiencia con un error técnico genérico.

**Contenido requerido:**
- `[404_TEXTO]` — En la voz de la marca: *"Parece que ese camino no existe todavía. Desde aquí puedes empezar desde el principio."*
- Link al homepage

---

## III. ACTIVOS REQUERIDOS

### Tipografías

| Fuente | Pesos | Uso | Formato |
|---|---|---|---|
| Söhne | 300, 400, 500, 600, 700 | UI, navegación, titulares, cuerpo general | woff2, self-hosted, subset Latin |
| Tiempos Text | 400, 400 italic | Cuerpo de ensayos (serif) | woff2, self-hosted, subset Latin |

**Carga:** via `next/font` — preload automático, sin FOUT, `font-display: swap` para Söhne, `font-display: optional` para Tiempos Text. Cada archivo woff2 < 50KB.

**Alternativa si las licencias no están disponibles al inicio del build:** usar la variable local de Söhne o Neue Haas Grotesk como placeholder, pero el design system asume estas fuentes para todos los cálculos de línea y medida.

---

### Imágenes

**Foto de Neil (para /sobre y OG images):**
- Al menos 2 fotos editoriales (no corporativas, no de stock)
- Resolución mínima: 2400×1600px
- Contexto sugerido: exterior, en el territorio, no en sala de conferencias con traje formal

**Imágenes contextuales de proyectos:**
- Para cada caso de estudio: 1–3 imágenes del trabajo real (no logos de organización)
- Si no existen imágenes adecuadas: el caso se publica sin imagen. No se usa stock.
- Formato de entrega: JPEG/PNG, el pipeline convierte a WebP/AVIF via `next/image`

**OG Images (Open Graph):**
- Una imagen por página principal (/, /trabajo, /pensamiento, /sobre, /construyamos)
- Una imagen por caso de estudio publicado
- Una imagen por ensayo publicado
- Dimensiones: 1200×630px
- Diseño: coherente con la identidad visual, texto legible, fondo sólido (no foto de fondo compleja)
- Generación: diseñadas, no auto-generadas con texto genérico

**Favicon:**
- .ico (16×16, 32×32)
- SVG favicon para navegadores modernos
- Reconocible a 16×16px

---

### Contenido MDX

- Mínimo 2 casos de estudio completos (formato `11_CASE_STUDIES.md`)
- Mínimo 1 ensayo fundacional completo
- Mínimo 2 ensayos adicionales
- Todos con frontmatter completo (ver modelo de datos abajo)

---

## IV. MODELO DE DATOS MDX

### Frontmatter — Caso de Estudio

```typescript
interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  projectName: string;
  territory: string;              // "Antofagasta, Chile"
  period: string;                 // "2018–2022"
  sectors: string[];              // ["Educación", "Sector privado", "Gobierno local"]
  publishedAt: string;            // ISO 8601
  updatedAt?: string;
  documentationVersion: 'initial' | 'update-12m' | 'update-36m' | 'update-60m';
  status: 'published' | 'draft';
  metaDescription: string;        // máx 155 caracteres
  ogImage?: string;
  relatedEssays: string[];        // slugs de /pensamiento
}
```

### Frontmatter — Ensayo / Pieza de Pensamiento

```typescript
interface EssayFrontmatter {
  title: string;
  subtitle: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  status: 'published' | 'draft';
  type: 'ensayo' | 'nota';        // Determina tipografía (serif/sans) y longitud esperada
  readingTime: number;            // minutos, calculado automáticamente si se omite
  tags: string[];
  relatedCases: string[];         // slugs de /trabajo
  metaDescription: string;
  ogImage?: string;
}
```

---

## V. COMPONENTES A CONSTRUIR

### Componentes de Layout

| Componente | Descripción | Notas |
|---|---|---|
| `NavBar` | Barra de navegación fija. Logo + 3 links + botón CTA | Transparente sobre hero, sólida al scroll (200ms). Menú móvil desde la parte inferior. |
| `Footer` | Pie de página mínimo | Logo + links secundarios (Legal, /prensa placeholder) + email de contacto. Sin iconos de redes sociales prominentes. |
| `PageWrapper` | Wrapper de transición entre páginas | Fade (180ms) + translate-y 8px→0 en cada carga. Todos los links internos usan `<Link>` de Next.js. |
| `Container` | Contenedor centrado con max-width | `--max-width-content: 75rem`. Variante narrow para texto: `--max-width-text: 45rem`. |

---

### Componentes del Homepage

| Componente | Descripción | Notas |
|---|---|---|
| `Hero` | Bloque hero de 100vh | Frase display + subtítulo + scroll indicator. Sin imagen de fondo. |
| `ArgumentBlock` | Bloque del argumento | 3–4 párrafos en columna centrada. `max-width: 68ch`. |
| `WorkPreviewBlock` | Bloque de trabajo en homepage | 3 `CaseStudyPreviewCard` + CTA secundario. |
| `CaseStudyPreviewCard` | Card de caso en homepage | Imagen contextual (opcional) + frase de cambio + link. Hover: revela frase clave del caso. |
| `ThoughtPreviewBlock` | Bloque de pensamiento en homepage | 2 `EssayPreviewCard` + CTA terciario. |
| `EssayPreviewCard` | Card de ensayo en homepage | Titular + primer párrafo + link. Hover: aumenta peso tipográfico del titular. |
| `PersonBlock` | Bloque de la persona | Párrafo de origen + link a /sobre. `max-width: 52ch`. |
| `InvitationBlock` | Bloque de invitación final | Pregunta display + botón CTA primario. Fondo `--color-background-subtle`. |

---

### Componentes de Trabajo

| Componente | Descripción | Notas |
|---|---|---|
| `CaseStudyIndex` | Lista curada de casos | Nombre + frase esencia + territorio + período. No thumbnails. |
| `CaseStudyIndexItem` | Ítem de la lista de casos | Texto solo. Hover: fondo sutil. |
| `CaseStudySidebar` | Navegación lateral entre casos (desktop) | Sticky. Lista de casos con indicador de activo. Oculta en móvil. |
| `CaseStudyPage` | Layout completo de un caso | Cabecera + cuerpo MDX + sección de conexiones + CTA. |
| `CaseStudyHeader` | Cabecera del caso | Título + territorio + período + sectores como etiquetas. |
| `CaseStudyConnections` | Conexiones al final del caso | Ensayo relacionado + siguiente caso. Conector narrativo, no "Ver también". |

---

### Componentes de Pensamiento

| Componente | Descripción | Notas |
|---|---|---|
| `EssayIndex` | Lista de ensayos | Título + subtítulo + fecha + tiempo de lectura. Estado vacío honesto. |
| `EssayIndexItem` | Ítem de la lista | Texto solo. Sin thumbnails. |
| `EssayPage` | Layout completo de un ensayo | Cabecera + cuerpo MDX en serif + conexiones + CTA. |
| `EssayHeader` | Cabecera del ensayo | Título + subtítulo + fecha + tiempo de lectura + etiquetas. |
| `ReadingProgress` | Barra de progreso de lectura | Sutil, en la parte superior. Solo en `/pensamiento/[slug]`. |
| `EssayConnections` | Conexiones al final del ensayo | "Esto continúa en..." + casos de estudio relacionados. |
| `EssayEmptyState` | Estado vacío del índice | Texto honesto sobre la escasez intencional. Solo visible si < 4 piezas. |

---

### Componentes de /sobre

| Componente | Descripción | Notas |
|---|---|---|
| `AboutPage` | Layout de la página /sobre | Una sola columna. Sin sidebar. |
| `ThesisBlock` | Bloque visual de la tesis | Definición en tipografía destacada. Visualmente separado del texto narrativo. |

---

### Componentes de /construyamos

| Componente | Descripción | Notas |
|---|---|---|
| `ContactQualifier` | Sección "Con quiénes / Qué no" | Texto narrativo de cualificación antes del formulario. |
| `ContactForm` | Formulario estratégico | 4 preguntas + nombre + organización + email. En mobile: una pregunta a la vez (wizard). |
| `ContactFormSuccess` | Estado post-envío | Reemplaza el formulario in situ. Mensaje en voz de la marca. |

---

### Componentes de Sistema

| Componente | Descripción | Notas |
|---|---|---|
| `Button` | Botón primario / secundario / ghost | 3 variantes. Acento cobre para primario. Sin border-radius exagerado (`--radius-base: 4px`). |
| `Link` (internal) | Link interno con prefetch de Next.js | `font-display: swap` implícito. Subrayado en hover, no en reposo. |
| `Tag` | Etiqueta de categoría/sector | Pequeña, sin fondo intenso. `--font-size-xs`, `--tracking-widest`. |
| `ErrorPage` | Layout de páginas de error | Para /404. Voz de la marca, link al homepage. |
| `PlausibleScript` | Script de analytics | Cargado en `<head>` solo en producción. `defer`, sin bloquear render. |

---

## VI. CONTENIDO QUE DEBE ESTAR ESCRITO ANTES DEL DESARROLLO

El desarrollo no puede comenzar si este contenido no existe. No porque la plataforma no pueda renderizarse — sino porque sin este contenido no se puede evaluar si el diseño funciona. El contenido no se escribe después del diseño — el diseño sirve al contenido.

### Contenido bloqueante (sin esto, no se puede desarrollar ni revisar)

- **El ensayo fundacional completo.** La pieza más importante de la plataforma. Mínimo 2.500 palabras. Debe poder publicarse al estándar de `09_CONTENT_STRATEGY.md`.
- **2 casos de estudio completos.** Con todas las secciones definidas en `11_CASE_STUDIES.md`. Con madurez verificable (6+ meses post-involucración). Con evidencia Tipo A y/o Tipo B.
- **Copy del homepage.** Todas las secciones: hero headline + subtítulo + argumento (4 párrafos) + frases de los 3 casos seleccionados + párrafo de la persona + pregunta de la invitación.
- **Texto completo de /sobre.** El relato de origen, la tesis en bloque visual, la trayectoria narrativa, la dirección.
- **Texto completo de /construyamos.** Con quiénes / Qué no / Etiquetas del formulario / Mensaje de confirmación.

### Contenido necesario antes del lanzamiento (puede escribirse durante el desarrollo)

- 2 ensayos adicionales (para no lanzar con solo 1 pieza en /pensamiento)
- Meta descriptions para las 5 páginas principales
- OG images diseñadas (no auto-generadas)
- Favicon
- Texto del estado vacío de /pensamiento si se lanza con pocas piezas

### Contenido que puede agregarse post-lanzamiento

- Casos de estudio adicionales (cuando alcancen madurez)
- Notas de ecosistema
- Actualizaciones de casos existentes (T+12, T+36 meses)

---

## VII. LO QUE NO SE CONSTRUYE EN V1

Las siguientes funcionalidades están estratégicamente excluidas de V1. No son omisiones — son decisiones. Construirlas antes de que su necesidad sea real añade deuda técnica y complejidad operacional sin valor para el usuario.

| Funcionalidad | Razón de exclusión | Referencia |
|---|---|---|
| Newsletter / suscripción | El volumen de contenido al launch no justifica suscripción. El modelo de crecimiento no es de audiencia masiva. | `05_INFORMATION_ARCHITECTURE.md` §IX |
| Búsqueda | Menos de 10 piezas de contenido al launch. El visitante puede leer el índice completo. | `12_TECHNICAL_ARCHITECTURE.md` §Search |
| Internacionalización (contenido en inglés) | La arquitectura soporta i18n desde el día uno — el contenido no existe todavía. Activar el switch de idioma sin contenido es un error. | `15_ROADMAP.md` §Fase 3 |
| Comunidad / `/comunidad` | Requiere una red de práctica que no existe todavía. Construirla ahora produce una sección vacía. | `15_ROADMAP.md` §VIII |
| Página `/prensa` | Útil en Fase 2, no en Fase 1. Puede existir como placeholder en el footer pero no es una página construida. | `05_INFORMATION_ARCHITECTURE.md` §IX |
| AI / Recomendaciones semánticas | La voz editorial debe estar suficientemente establecida antes de que cualquier IA la amplifique. | `12_TECHNICAL_ARCHITECTURE.md` §AI Roadmap (Fase 1) |
| Chatbot / asistente virtual | Mismo criterio. Sin corpus, el asistente produce respuestas genéricas. | `15_ROADMAP.md` §XIV |
| Comentarios / sistema social | Esta plataforma no construye comunidad por volumen de interacciones. | `04_AUDIENCES.md`, `15_ROADMAP.md` §VIII |
| Video autoplay | Viola el principio de respeto por el tiempo del visitante y las metas de performance. | `06_USER_EXPERIENCE.md` §V |
| Pop-ups de cualquier tipo | Sin excepción. Ni de newsletter, ni de cookies (Plausible es cookieless). | `05_INFORMATION_ARCHITECTURE.md` §VI |
| Iconos de redes sociales en header | No son el objetivo de la plataforma. Pueden existir en el footer, discretamente, si se considera necesario. | `05_INFORMATION_ARCHITECTURE.md` §III |
| Contador de visitas visible | Contradice el modelo de autoridad por selección, no por volumen. | `01_PERSONAL_BRAND.md` |
| Testimonios | La credibilidad de esta plataforma se construye con evidencia documentada, no con citas de terceros. | `05_INFORMATION_ARCHITECTURE.md` §II |

---

## VIII. BACKLOG V2

Funcionalidades confirmadas para la iteración siguiente, ordenadas por prioridad estratégica:

| Prioridad | Funcionalidad | Condición de activación |
|---|---|---|
| 1 | **Búsqueda (Fuse.js)** | Cuando el corpus supere 10 piezas de contenido |
| 2 | **Newsletter / suscripción** | Cuando haya suficiente cadencia de publicación para justificar expectativa en el lector |
| 3 | **Página `/prensa`** | Cuando haya demanda activa de periodistas o medios |
| 4 | **Activación de inglés** | Cuando exista el primer lote de contenido adaptado (mínimo 5 piezas) |
| 5 | **Recomendaciones semánticas (IA)** | Cuando el corpus supere 20 piezas — ver `12_TECHNICAL_ARCHITECTURE.md` Fase 2 |
| 6 | **Actualizaciones longitudinales de casos** | A los 12 meses del primer caso publicado |
| 7 | **Migración a Sanity.io** | Cuando la gestión de contenido en Tina supere 2 hrs semanales de overhead editorial |
| 8 | **Open Graph dinámico** | Con `@vercel/og` para generar OG images personalizadas por pieza |
| 9 | **Sitemap dinámico** | Ya puede generarse en V1, pero la prioridad de indexación por página puede refinarse en V2 |
| 10 | **Algolia** | Cuando el corpus supere 500 ítems — reemplaza Fuse.js |

---

## IX. PRIORIDADES DE DISEÑO

Estas son las decisiones de diseño que más impacto tienen sobre la primera impresión y que, si se implementan mal, ningún contenido puede compensar.

### Prioridad 1 — La tipografía

La tipografía es el 80% de la percepción de calidad de esta plataforma. Antes de construir cualquier componente complejo, la escala tipográfica debe funcionar perfectamente.

**Criterio de aceptación tipográfico:**
- Söhne y Tiempos Text cargadas sin FOUT
- Escala implementada exactamente como en `08_DESIGN_SYSTEM.md` §V
- `font-size-base: 16px` como raíz, nunca por debajo
- `--measure-narrow: 52ch` para ensayos — verificado en desktop y mobile
- `leading-loose: 1.75` para serif (Tiempos Text) en ensayos

### Prioridad 2 — Los tokens CSS

Todo el sistema visual debe construirse sobre los CSS Custom Properties definidos en `08_DESIGN_SYSTEM.md`. Ningún valor de color, espaciado, radio o movimiento debe estar hardcodeado en un componente.

**Regla estricta:** Si un componente tiene `color: #A0522D` en lugar de `color: var(--color-accent)`, el componente está mal construido.

### Prioridad 3 — El sistema de espaciado

El espaciado usa múltiplos de 4px (`--space-1: 4px`) como unidad base. Nada está "aproximadamente alineado". La consistencia del espaciado es uno de los indicadores más directos de calidad percibida.

**Implementación:** `--space-section-gap: var(--space-24)` entre secciones del homepage. `--space-block-gap: var(--space-16)` entre bloques de contenido.

### Prioridad 4 — Las transiciones de página

Una sola transición en toda la plataforma: fade (180ms, `--ease-out`) combinado con translate-y de 8px→0. Todos los links internos usan `<Link>` de Next.js con el mismo wrapper de transición. Sin excepciones. La consistencia de las transiciones produce la sensación de que el visitante está dentro de una experiencia única, no en páginas separadas.

### Prioridad 5 — La navegación transparente→sólida

La barra de navegación comienza transparente sobre el hero (100vh). Al primer scroll, gana fondo sólido (`--color-background`) con la transición `--duration-base: 200ms`. Siempre fija (`position: sticky` o `fixed`). Este comportamiento debe funcionar correctamente en mobile y no causar CLS (desplazamiento de contenido).

### Prioridad 6 — El formulario de /construyamos en mobile

Las 4 preguntas del formulario se presentan de a una en mobile (wizard). El campo activo gana presencia visual; los otros se reducen. El botón dice "Empecemos", no "Enviar". El estado de confirmación reemplaza el formulario in situ sin redirección. Este es el componente de mayor complejidad de interacción en V1.

### Prioridad 7 — Los estados hover

Tres hover states críticos a implementar exactamente como se describen en `06_USER_EXPERIENCE.md` §VI:
1. Links de texto: sin subrayado en reposo, subrayado fino en color acento al hover
2. `CaseStudyPreviewCard` en homepage: frase clave del caso aparece en lugar del subtítulo genérico
3. `EssayIndexItem`: el titular gana peso tipográfico (de 400 a 500) al hover

---

## X. PRIORIDADES TÉCNICAS

### 1. Next.js App Router — estructura de directorios

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — fonts, analytics, metadata base
│   ├── page.tsx                    # Homepage
│   ├── trabajo/
│   │   ├── page.tsx                # /trabajo — índice
│   │   └── [slug]/
│   │       └── page.tsx            # /trabajo/[slug] — caso individual
│   ├── pensamiento/
│   │   ├── page.tsx                # /pensamiento — índice
│   │   └── [slug]/
│   │       └── page.tsx            # /pensamiento/[slug] — ensayo individual
│   ├── sobre/
│   │   └── page.tsx                # /sobre
│   ├── construyamos/
│   │   └── page.tsx                # /construyamos
│   └── not-found.tsx               # 404
├── components/                     # Todos los componentes (subcarpetas por dominio)
├── content/
│   ├── trabajo/                    # .mdx de casos de estudio
│   └── pensamiento/                # .mdx de ensayos
├── lib/
│   ├── mdx.ts                      # Parseo y tipado de MDX
│   └── content.ts                  # Helpers para leer contenido
└── styles/
    ├── tokens.css                  # Todos los CSS Custom Properties
    ├── globals.css                 # Reset + estilos de base
    └── typography.css              # Escala tipográfica global
```

### 2. Rendering strategy

| Ruta | Estrategia | Razón |
|---|---|---|
| `/` | SSG (Static) | Sin datos dinámicos. Regenerar en cada deploy. |
| `/trabajo` | SSG | Lista de casos estática. |
| `/trabajo/[slug]` | SSG + `generateStaticParams` | Un archivo por caso. Build time. |
| `/pensamiento` | SSG | Lista de ensayos estática. |
| `/pensamiento/[slug]` | SSG + `generateStaticParams` | Un archivo por ensayo. Build time. |
| `/sobre` | SSG | Página estática. |
| `/construyamos` | SSG | El formulario es client-side. La página se sirve estática. |

**Resultado:** todo el sitio es estático. No hay SSR en V1. El único endpoint dinámico es la API route de envío del formulario (`/api/contact` → Resend).

### 3. Variables de entorno

```
RESEND_API_KEY=            # Clave de Resend para envío de formulario
CONTACT_EMAIL=             # contact@neilmeza.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=  # neilmeza.com
```

### 4. Seguridad del formulario

```typescript
// Anti-spam sin reCAPTCHA:
// 1. Honeypot: campo oculto que solo los bots completan
// 2. Verificación temporal: envío antes de 3 segundos = bot
// 3. Rate limiting: máximo 3 envíos por IP por hora

// Headers de seguridad (vercel.json o next.config.js):
// Content-Security-Policy
// X-Frame-Options: DENY
// X-Content-Type-Options: nosniff
// Referrer-Policy: strict-origin-when-cross-origin
// Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 5. Configuración de caché (vercel.json)

```json
{
  "headers": [
    {
      "source": "/_next/static/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, s-maxage=60, stale-while-revalidate=3600" }]
    }
  ]
}
```

---

## XI. PRIORIDADES SEO

### 1. JSON-LD — Schema.org

**En todas las páginas — Person schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Neil Meza",
  "url": "https://neilmeza.com",
  "jobTitle": "Arquitecto de infraestructura colaborativa",
  "knowsAbout": [
    "Ecosistemas de innovación",
    "Infraestructura colaborativa",
    "Desarrollo territorial",
    "Innovación intersectorial"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Antofagasta",
    "addressCountry": "CL"
  },
  "sameAs": ["[LinkedIn URL]", "[Twitter/X URL]"]
}
```

**En /sobre — Person schema completo** (más propiedades: `alumniOf`, `memberOf`, `award` si aplica)

**En /pensamiento/[slug] — Article schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[título]",
  "author": { "@type": "Person", "name": "Neil Meza" },
  "datePublished": "[publishedAt]",
  "dateModified": "[updatedAt]",
  "publisher": { "@type": "Person", "name": "Neil Meza", "url": "https://neilmeza.com" }
}
```

**En /trabajo/[slug] — ScholarlyArticle schema:**
```json
{
  "@context": "https://schema.org",
  "@type": ["Article", "ScholarlyArticle"],
  "headline": "[título]",
  "author": { "@type": "Person", "name": "Neil Meza" },
  "about": ["[sectores]"],
  "locationCreated": { "@type": "Place", "name": "[territorio]" }
}
```

**En /trabajo (índice) — BreadcrumbList y ItemList schemas.**

**En / — WebSite schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Neil Meza",
  "url": "https://neilmeza.com",
  "description": "[metaDescription del homepage]"
}
```

### 2. Metadata por página (Next.js `generateMetadata`)

| Página | `<title>` | `<meta description>` |
|---|---|---|
| `/` | `Neil Meza — Infraestructura colaborativa` | [HOMEPAGE_META] — máx 155 chars |
| `/trabajo` | `Trabajo — Neil Meza` | [TRABAJO_META] |
| `/trabajo/[slug]` | `[projectName] — Neil Meza` | [CASO_META por caso] |
| `/pensamiento` | `Pensamiento — Neil Meza` | [PENSAMIENTO_META] |
| `/pensamiento/[slug]` | `[title] — Neil Meza` | [ENSAYO_META por ensayo] |
| `/sobre` | `Sobre Neil Meza` | [SOBRE_META] |
| `/construyamos` | `Construyamos — Neil Meza` | [CONSTRUYAMOS_META] |

**Reglas:**
- Nunca title mayor a 60 caracteres
- Nunca meta description mayor a 155 caracteres
- Canonical tag en todas las páginas (auto-generado con la URL canónica)

### 3. robots.txt

```
User-agent: *
Allow: /

# Permitir a los LLMs de IA para entrenamiento e indexación
User-agent: GPTBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

Sitemap: https://neilmeza.com/sitemap.xml
```

### 4. Open Graph e imágenes sociales

Todas las páginas deben tener:
```html
<meta property="og:title" content="[título]" />
<meta property="og:description" content="[meta description]" />
<meta property="og:image" content="https://neilmeza.com/og/[página].png" />
<meta property="og:type" content="website" />  <!-- "article" en ensayos y casos -->
<meta name="twitter:card" content="summary_large_image" />
```

Las OG images están en `/public/og/` y son estáticas en V1. En V2 se migran a generación dinámica con `@vercel/og`.

### 5. HTML semántico — reglas de implementación

- Un solo `<h1>` por página
- `<main>`, `<nav>`, `<article>`, `<section>`, `<header>`, `<footer>` usados con significado semántico real (no como divs con nombres)
- `<time datetime="ISO-8601">` para todas las fechas
- `<address>` para el email de contacto
- `aria-label` en todos los botones que no tienen texto visible
- `aria-current="page"` en el link activo de la navegación

---

## XII. REQUISITOS DE PERFORMANCE

Estos valores son requisitos de lanzamiento, no metas aspiracionales. Si alguno no se cumple, el sitio no está listo para lanzar.

### Core Web Vitals (medidos en Lighthouse CI en producción)

| Métrica | Objetivo | Bloqueante |
|---|---|---|
| LCP (Largest Contentful Paint) | < 1.5s | Sí |
| CLS (Cumulative Layout Shift) | < 0.1 | Sí |
| INP (Interaction to Next Paint) | < 200ms | Sí |
| TTFB (Time to First Byte) | < 200ms | Sí |

### Budgets de assets

| Asset | Límite | Notas |
|---|---|---|
| JavaScript total (gzipped) | < 80 KB | Todo JS de la ruta, incluyendo Next.js runtime |
| JavaScript por ruta principal | < 40 KB | No cargar JS de otras secciones en el homepage |
| CSS total (gzipped) | < 40 KB | Incluye todas las hojas de estilo |
| CSS crítico (inlineado) | < 10 KB | El CSS above-the-fold inlineado en `<head>` |
| Hero image | < 150 KB | Formato WebP/AVIF via next/image |
| Tipografía (por woff2) | < 50 KB | Söhne y Tiempos Text subsetted a Latin |
| Scripts de terceros | ≤ 1 | Solo Plausible Analytics (1KB) |

### Reglas de implementación de performance

- **Imágenes:** siempre via `next/image`. Nunca `<img>` directa. `priority={true}` solo en la imagen above-the-fold del hero.
- **Fuentes:** via `next/font`. Preload automático. `display: swap` para Söhne, `display: optional` para Tiempos Text. Subset Latin explícito.
- **Animaciones:** solo `transform` y `opacity`. Nunca animar `width`, `height`, `margin`, `padding`, `top`, `left`. Respetar `prefers-reduced-motion`.
- **JavaScript:** ningún bundle de terceros excepto Plausible. Carga de Plausible con `defer` para no bloquear render. No hay jQuery, no hay Bootstrap, no hay librerías de animación pesadas.
- **CSS:** sin CSS-in-JS runtime. Solo CSS Modules + CSS Custom Properties. Critical CSS inlineado en `<head>` por Next.js automáticamente.
- **Fonts:** no usar `@import` de Google Fonts. Todo self-hosted.

---

## XIII. CHECKLIST DE LANZAMIENTO

La plataforma está lista para lanzar cuando todos los ítems de esta lista están marcados. No antes.

### Contenido

- [ ] El ensayo fundacional está publicado al estándar de `09_CONTENT_STRATEGY.md` (incluye los 7 tests de calidad)
- [ ] Al menos 2 casos de estudio están publicados con madurez verificable (6+ meses post-involucración)
- [ ] Al menos 2 ensayos adicionales están publicados
- [ ] Todo el copy del homepage está escrito y aprobado (headline, argumento, frases de casos, persona, invitación)
- [ ] El texto completo de /sobre está escrito y aprobado
- [ ] El texto de /construyamos está escrito y aprobado (incluido el mensaje de confirmación)
- [ ] Las meta descriptions de las 5 páginas principales están escritas (máx 155 chars cada una)
- [ ] Las OG images de las 5 páginas principales están diseñadas (1200×630px)
- [ ] Las OG images de cada caso y ensayo publicado están diseñadas

### Diseño y UX

- [ ] Söhne y Tiempos Text renderizan correctamente — sin FOUT visible
- [ ] La escala tipográfica es correcta en desktop y mobile
- [ ] Los tres hover states críticos funcionan (links, case cards, essay items)
- [ ] La navegación transparente→sólida funciona correctamente sin CLS
- [ ] Las transiciones de página (fade 180ms + translate-y) están implementadas en todos los links internos
- [ ] El formulario de /construyamos funciona en modo wizard en mobile
- [ ] El estado de confirmación del formulario reemplaza el form in situ (sin redirección)
- [ ] El conector narrativo al final de ensayos y casos usa texto específico, no "Ver también"
- [ ] El estado vacío de /pensamiento muestra el texto honesto (si aplica)
- [ ] La página 404 está en la voz de la marca
- [ ] El favicon es legible a 16×16px

### Técnico

- [ ] Todos los Core Web Vitals en verde en Lighthouse CI en producción (LCP < 1.5s, CLS < 0.1, INP < 200ms)
- [ ] Ningún error en la consola del navegador
- [ ] Ningún error de TypeScript en modo strict
- [ ] El formulario de /construyamos envía correctamente a `contact@neilmeza.com` via Resend
- [ ] El anti-spam del formulario está activo (honeypot + verificación temporal)
- [ ] Los headers de seguridad están configurados (CSP, X-Frame-Options, etc.)
- [ ] `robots.txt` configurado (GPTBot y anthropic-ai permitidos)
- [ ] `sitemap.xml` generado y accesible en `https://neilmeza.com/sitemap.xml`
- [ ] Google Search Console configurado y sitemap enviado
- [ ] Plausible Analytics activo y registrando visitas
- [ ] Todos los JSON-LD schemas pasan el validador de Google Rich Results Test
- [ ] Las canonical URLs son correctas en todas las páginas
- [ ] No hay imágenes `<img>` directas — todas via `next/image`
- [ ] No hay fuentes cargadas via `@import` de servicios externos

### Revisión final pre-lanzamiento

- [ ] Revisión completa en mobile (iOS Safari + Android Chrome) — todos los breakpoints
- [ ] Revisión del recorrido del usuario primario completo: homepage → trabajo → caso → sobre → construyamos → envío del formulario
- [ ] El formulario fue enviado y el email llegó correctamente a `contact@neilmeza.com`
- [ ] El mensaje de respuesta del formulario (`La conversación empieza ahora...`) se ve correctamente post-envío
- [ ] Lighthouse score en producción: ≥ 95 en Performance, ≥ 90 en Accessibility, 100 en Best Practices, 100 en SEO

---

*Este documento es el puente entre los documentos estratégicos 00–15 y el código. Cualquier decisión de implementación no cubierta aquí debe resolverse volviendo al documento estratégico correspondiente, no inventando una solución nueva. La coherencia entre la estrategia y la implementación es parte de lo que la plataforma promete ser.*
