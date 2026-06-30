# 14 — SEO Y DESCUBRIBILIDAD
## El Handbook Oficial de Descubribilidad de la Plataforma

*Este documento no es una guía de optimización de palabras clave. Es la estrategia de descubribilidad a largo plazo de la plataforma — el sistema que hace que ideas originales con evidencia real sean encontradas por las personas que las necesitan. Descubribilidad como consecuencia natural de publicar trabajo que merece ser encontrado.*

---

## I. LA FILOSOFÍA DE DESCUBRIBILIDAD

Existe una distinción fundamental entre dos formas de pensar en la búsqueda orgánica:

**La lógica de la demanda:** Investigar qué busca la gente y producir contenido que responda esa demanda existente. Es la lógica de la mayoría del SEO tradicional — seguir la intención de búsqueda que los algoritmos identifican como más frecuente. Produce contenido que encuentra lo que ya se busca.

**La lógica de la oferta:** Publicar ideas originales que no se están buscando porque nadie las ha articulado aún, y construir la infraestructura de descubribilidad para que las personas correctas las encuentren cuando lleguen al punto en que las necesitan. Produce contenido que forma parte del ecosistema de ideas de un campo.

Esta plataforma opera desde la lógica de la oferta.

La tesis de Neil sobre la infraestructura colaborativa no está siendo buscada con esas palabras exactas por nadie hoy. Pero un rector universitario que está intentando entender por qué su programa de vinculación con empresas no funciona, un director de innovación que no puede articular por qué los proyectos mueren en la transición entre instituciones, o un inversionista de impacto que busca entender la estructura de los ecosistemas de innovación en territorios no-convencionales — todos ellos pueden llegar al contenido de esta plataforma como la articulación más precisa que han encontrado para el problema que están intentando resolver.

El SEO de esta plataforma no crea contenido para keywords. Elimina las fricciones que impiden que el contenido correcto llegue a las personas correctas en el momento en que lo necesitan.

**Lo que hace este documento:**
Define los sistemas técnicos, estructurales y editoriales que aseguran que las ideas de esta plataforma sean encontrables por los motores de búsqueda tradicionales (Google, Bing), por los sistemas de búsqueda con IA (Perplexity, SearchGPT, Gemini), por los modelos de lenguaje grande (Claude, GPT-4, Gemini), y por las redes de citación entre publicaciones y comunidades de práctica.

---

## II. LA ARQUITECTURA DE INFORMACIÓN PARA LA BÚSQUEDA

La arquitectura de información de la plataforma (definida en `05_INFORMATION_ARCHITECTURE.md`) tiene una coherencia natural con los principios de descubribilidad: una jerarquía clara, URLs limpias y permanentes, y una taxonomía de contenido que los motores de búsqueda pueden entender sin ambigüedad.

### La jerarquía de URLs como señal semántica

```
neilmeza.com/
├── trabajo/                    Sección: Casos de Estudio
│   └── [slug]/                 Caso individual
├── pensamiento/                Sección: Ensayos + Notas
│   ├── [slug]/                 Ensayo individual
│   └── notas/[slug]/           Nota individual
├── sobre/                      Página: Sobre Neil
└── construyamos/               Página: Contacto
```

La URL `neilmeza.com/pensamiento/la-infraestructura-que-no-se-ve` comunica tres cosas a un motor de búsqueda:
1. Que existe una sección de pensamiento
2. Que este contenido es conceptual (no un caso práctico)
3. Que el tema central es una infraestructura invisible

Esto es semántica de URL — la URL como argumento, no como identificador.

### La política de URLs permanentes

Las URLs de casos de estudio y ensayos son inmutables a partir de su publicación. Esta inmutabilidad es tanto una decisión de SEO como una postura de marca: los URLs son citas que otros pueden hacer. Cambiar una URL después de la publicación es romper todas las citas externas que se hayan hecho de ese contenido.

**El protocolo cuando el contenido cambia:**
Si el slug de un ensayo o caso debe cambiar por razones excepcionales, la URL original recibe una redirección 301 permanente hacia la nueva URL. La redirección se documenta con fecha y razón en `docs/url-changes.md`. Las redirecciones 301 no se eliminan — son promesas al web que se mantienen indefinidamente.

---

## III. LA ESTRATEGIA DE HTML SEMÁNTICO

El HTML semántico es la base de toda descubribilidad. Los motores de búsqueda y los modelos de IA entienden el significado de una página a partir de su estructura HTML — no solo de su contenido textual. Usar los elementos correctos elimina la ambigüedad sobre qué es cada parte del contenido.

### Estructura por tipo de página

**Páginas de ensayo:**
```html
<article>
  <header>
    <h1>[Título del ensayo — la afirmación]</h1>
    <p class="subtitle">[Expansión del argumento]</p>
    <div class="essay-meta">
      <address class="author">
        <a rel="author" href="/sobre">Neil Meza</a>
      </address>
      <time datetime="YYYY-MM-DD">Fecha publicación</time>
      <span class="reading-time">[N] minutos de lectura</span>
    </div>
  </header>

  <section aria-label="Contenido del ensayo">
    <!-- El cuerpo del ensayo en secciones con <h2>, <h3> -->
  </section>

  <footer>
    <section aria-labelledby="relacionados-titulo">
      <h2 id="relacionados-titulo">Trabajo relacionado</h2>
      <!-- Links internos a casos de estudio relacionados -->
    </section>
  </footer>
</article>
```

**Páginas de caso de estudio:**
```html
<article itemscope itemtype="https://schema.org/Article">
  <header>
    <h1 itemprop="headline">[Afirmación del cambio]</h1>
    <div class="case-meta">
      <time itemprop="datePublished" datetime="YYYY-MM-DD">Fecha</time>
      <span itemprop="locationCreated">[Territorio]</span>
    </div>
  </header>
  <!-- ... -->
</article>
```

**La regla del H1:**
Cada página tiene exactamente un `<h1>`. Nunca cero — los motores de búsqueda lo usan como señal del tema central de la página. Nunca más de uno — la jerarquía de headings debe ser un árbol sin ambigüedad, no un bosque.

### Los elementos que comunican significado

| Elemento | Qué comunica | Dónde se usa en esta plataforma |
|----------|-------------|--------------------------------|
| `<article>` | Contenido independiente y redistribuible | Ensayos, casos de estudio |
| `<section>` | Parte de un contenido mayor | Secciones del homepage, partes de un ensayo |
| `<nav>` | Elementos de navegación | Barra principal, breadcrumbs |
| `<main>` | Contenido principal de la página | Todos las páginas — exactamente uno |
| `<aside>` | Contenido relacionado pero secundario | Notas al margen, lecturas relacionadas |
| `<address>` | Información de contacto del autor | Firmado de ensayos, footer |
| `<time>` | Fecha y hora | Fechas de publicación, actualizaciones |
| `<figure>` + `<figcaption>` | Imagen con descripción | Fotografías documentales en casos |
| `<blockquote>` + `<cite>` | Cita con fuente | Testimonios, citas de terceros en ensayos |

---

## IV. LA ESTRATEGIA DE DATOS ESTRUCTURADOS

Los datos estructurados (structured data) son la capa que transforma el contenido de esta plataforma en información que los motores de búsqueda y los sistemas de IA pueden leer como entidades relacionadas — no solo como texto. Es el puente entre el contenido publicado y el Knowledge Graph de Google.

### Por qué los datos estructurados son especialmente importantes aquí

Esta plataforma no tiene el beneficio de un dominio corporativo establecido, miles de backlinks de autoridad, o años de historial de indexación. Lo que sí tiene es contenido original con evidencia real y un autor con credenciales verificables.

Los datos estructurados aceleran el proceso por el cual Google entiende quién es Neil Meza como entidad, qué ideas le pertenecen como autor, y cómo su trabajo se relaciona con el campo de la innovación territorial. Sin datos estructurados, ese proceso tarda años. Con ellos, puede ocurrir en meses.

### El formato de implementación

Esta plataforma usa **JSON-LD** (JavaScript Object Notation for Linked Data) como formato de datos estructurados. Es el formato recomendado por Google y el único que permite incluir los datos en el `<head>` de la página sin mezclarlos con el HTML visible.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Neil Meza",
  ...
}
</script>
```

---

## V. IMPLEMENTACIÓN DE SCHEMA.ORG

### El schema Person — la entidad central

El schema más importante de esta plataforma. Define a Neil Meza como una entidad en el Knowledge Graph con atributos verificables:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Neil Meza",
  "url": "https://neilmeza.com",
  "image": "https://neilmeza.com/images/neil-meza.jpg",
  "jobTitle": "Arquitecto de Ecosistemas de Innovación",
  "description": "Diseñador de infraestructura colaborativa para ecosistemas de innovación en territorios no-convencionales. Basado en Antofagasta, Chile.",
  "email": "contact@neilmeza.com",
  "knowsAbout": [
    "Ecosistemas de innovación",
    "Infraestructura colaborativa",
    "Innovación territorial",
    "Articulación institucional",
    "Desierto de Atacama"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/neilmeza/",
    "[URL de perfil de Twitter/X si existe]",
    "[URL de Wikidata si se crea]"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Antofagasta",
    "addressRegion": "Región de Antofagasta",
    "addressCountry": "CL"
  }
}
```

Este schema se incluye en el `<head>` de todas las páginas, pero especialmente en `/sobre` donde es más semánticamente apropiado.

**El campo `sameAs` es crítico.** Conecta la entidad "Neil Meza en neilmeza.com" con las mismas entidades en otras plataformas (LinkedIn, Twitter, Wikidata). Google usa estas conexiones para construir un grafo de conocimiento más confiable y coherente. El número de plataformas donde Neil tiene presencia verificable determina qué tan rápido Google consolida la entidad.

### El schema Article — para ensayos

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Título del ensayo]",
  "description": "[Meta description del ensayo]",
  "author": {
    "@type": "Person",
    "name": "Neil Meza",
    "url": "https://neilmeza.com/sobre"
  },
  "publisher": {
    "@type": "Person",
    "name": "Neil Meza",
    "url": "https://neilmeza.com"
  },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "url": "https://neilmeza.com/pensamiento/[slug]",
  "image": "https://neilmeza.com/images/og/[slug].jpg",
  "inLanguage": "es",
  "about": {
    "@type": "Thing",
    "name": "[El concepto central del ensayo]"
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "Neil Meza",
    "url": "https://neilmeza.com"
  }
}
```

### El schema para casos de estudio

Los casos de estudio son un tipo de contenido que no tiene un schema Schema.org exacto — son más específicos que un `Article` genérico pero no encajan en un `CaseStudy` tipificado (que no existe en Schema.org). La solución es un `Article` con el type adicional de `ScholarlyArticle` que implica rigor metodológico y evidencia:

```json
{
  "@context": "https://schema.org",
  "@type": ["Article", "ScholarlyArticle"],
  "headline": "[Afirmación del cambio]",
  "description": "[Meta description]",
  "author": {
    "@type": "Person",
    "name": "Neil Meza",
    "url": "https://neilmeza.com/sobre"
  },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "locationCreated": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "[Ciudad]",
      "addressCountry": "CL"
    }
  },
  "about": [
    {
      "@type": "Thing",
      "name": "Infraestructura colaborativa"
    },
    {
      "@type": "Place",
      "name": "[Territorio del caso]"
    }
  ]
}
```

### El schema WebSite — con SearchAction

En el homepage, el schema `WebSite` habilita el Rich Result de Sitelinks Search Box en Google cuando el sitio gana suficiente autoridad:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Neil Meza",
  "url": "https://neilmeza.com",
  "description": "Plataforma de pensamiento y práctica sobre infraestructura colaborativa para ecosistemas de innovación.",
  "inLanguage": ["es", "en"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://neilmeza.com/pensamiento?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### El schema BreadcrumbList — para páginas interiores

Cada página interior incluye un BreadcrumbList que comunica su posición en la jerarquía:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Neil Meza",
      "item": "https://neilmeza.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Pensamiento",
      "item": "https://neilmeza.com/pensamiento"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Título del ensayo]",
      "item": "https://neilmeza.com/pensamiento/[slug]"
    }
  ]
}
```

---

## VI. EL SISTEMA DE ENLAZADO INTERNO

Los enlaces internos son, en la lógica de los motores de búsqueda, la declaración de que un contenido está relacionado con otro. Son también la forma en que Google entiende cuáles son las páginas más importantes de un sitio (PageRank interno).

### La arquitectura de links internos de esta plataforma

Los links internos siguen el grafo conceptual del contenido — no se crean artificialmente para SEO. Pero sí se implementan de manera sistemática para que las relaciones naturales sean visibles:

**Ensayo → Casos de estudio:**
Al final de cada ensayo, en la sección "Trabajo relacionado", hay links a los casos de estudio donde las ideas del ensayo se pueden observar en práctica. Esto no es decorativo — es la demostración de que la teoría tiene evidencia.

**Caso de estudio → Ensayos:**
Al principio de cada caso, una nota introductoria referencia el ensayo o los ensayos que articulan el marco conceptual que el caso ilustra. El lector puede ir de la práctica a la teoría.

**Homepage → Las piezas más importantes:**
El homepage tiene links directos a los 2-3 casos de estudio más representativos y los 2-3 ensayos más importantes. Esto concentra el PageRank interno en las piezas que mejor demuestran la tesis de la plataforma.

**Notas de ecosistema → Ensayos relacionados:**
Las notas son el contenido más frecuente y oportuno. Cada nota tiene al menos un link a un ensayo o caso relacionado. Esto usa la frescura de las notas para mantener la autoridad de los ensayos — que se actualizan raramente pero son el contenido más importante.

### El anchor text como señal semántica

El anchor text (el texto visible del link) es una señal semántica importante. En esta plataforma:

```
✓ "el concepto de infraestructura colaborativa"
✓ "como documenta el caso de GYS"
✓ "sobre el papel de la confianza institucional"

✗ "haga clic aquí"
✗ "ver más"
✗ "este artículo"
```

El anchor text describe el destino, no la acción. Es una descripción, no una instrucción.

---

## VII. LA ESTRATEGIA DE CANONICAL

### Canonicals self-referencing

Todas las páginas incluyen un link canonical auto-referencial:

```html
<link rel="canonical" href="https://neilmeza.com/pensamiento/[slug]" />
```

Esto previene ambigüedad cuando el mismo contenido puede ser accesible por múltiples URLs (con o sin slash final, con parámetros de query, etc.). El canonical declara cuál es la URL oficial.

### Canonical y paginación

Las páginas de índice (/trabajo, /pensamiento) que eventualmente podrían paginar usan `rel="next"` y `rel="prev"` además de canonicals para comunicar la relación entre páginas.

### Canonical en contenido sindicado

Si algún ensayo se republica parcialmente en otra plataforma (Medium, un medio de comunicación, etc.), se exige que el contenido sindicado incluya:
1. Una atribución explícita a neilmeza.com como fuente original
2. Un link a la URL canónica del ensayo en neilmeza.com
3. (Preferiblemente) Un meta canonical en la copia que apunte a neilmeza.com

La sindicación es una decisión editorial — no un instrumento de SEO. Si ocurre, la protección del canonical es la salvaguarda técnica.

---

## VIII. SEO MULTILINGÜE

Cuando la plataforma active el contenido en inglés (según el criterio de 3 condiciones definido en `09_CONTENT_STRATEGY.md`), la arquitectura multilingüe de SEO entra en operación.

### El sistema hreflang

Para cada pieza de contenido que existe en ambos idiomas:

```html
<!-- En la versión en español -->
<link rel="alternate" hreflang="es" href="https://neilmeza.com/pensamiento/[slug-es]" />
<link rel="alternate" hreflang="en" href="https://neilmeza.com/en/thinking/[slug-en]" />
<link rel="alternate" hreflang="x-default" href="https://neilmeza.com/pensamiento/[slug-es]" />

<!-- En la versión en inglés -->
<link rel="alternate" hreflang="es" href="https://neilmeza.com/pensamiento/[slug-es]" />
<link rel="alternate" hreflang="en" href="https://neilmeza.com/en/thinking/[slug-en]" />
<link rel="alternate" hreflang="x-default" href="https://neilmeza.com/pensamiento/[slug-es]" />
```

`hreflang="x-default"` señala cuál es la versión predeterminada cuando ningún idioma específico está disponible. En esta plataforma, el español es el predeterminado.

### El slug en cada idioma

Los slugs de los contenidos en inglés son adaptaciones en inglés, no transliteraciones del español. Si un ensayo en español se titula "La infraestructura que no se ve", su versión en inglés puede tener un slug completamente distinto que refleje el título de la adaptación en inglés.

### El sitemap multilingüe

El sitemap incluye todas las variantes de idioma de cada URL:

```xml
<url>
  <loc>https://neilmeza.com/pensamiento/[slug]</loc>
  <xhtml:link rel="alternate" hreflang="es"
    href="https://neilmeza.com/pensamiento/[slug]"/>
  <xhtml:link rel="alternate" hreflang="en"
    href="https://neilmeza.com/en/thinking/[slug-en]"/>
  <lastmod>YYYY-MM-DD</lastmod>
</url>
```

---

## IX. SEO BASADO EN ENTIDADES

El SEO tradicional se centra en palabras clave. El SEO moderno — y el que durará la próxima década — se centra en entidades: personas, lugares, conceptos, organizaciones que Google entiende como nodos en un grafo de conocimiento.

Para esta plataforma, las entidades relevantes son:

### Las entidades que esta plataforma construye y refuerza

**La entidad Persona — Neil Meza:**
El objetivo a largo plazo es que Google tenga un Knowledge Panel para Neil Meza — la caja de información que aparece en el lado derecho de los resultados de búsqueda cuando se busca una persona o entidad bien establecida. El Knowledge Panel requiere:
- Un volumen suficiente de menciones en fuentes autorizadas
- Datos estructurados consistentes en la plataforma
- Presencia en directorios y plataformas que Google considera autoritativas
- Idealmente, una entrada en Wikipedia o Wikidata (ver Sección XV)

**La entidad Concepto — Infraestructura Colaborativa:**
El objetivo es que "infraestructura colaborativa" (o "collaborative infrastructure" en inglés) sea asociado como un concepto que Neil Meza articuló y exploró con profundidad. Esto se logra usando el término consistentemente como concepto central en múltiples piezas de contenido, definiendo el concepto explícitamente en al menos un ensayo fundacional, y siendo citado por terceros usando ese término.

**La entidad Lugar — Antofagasta / Desierto de Atacama:**
La asociación entre Neil Meza y el territorio del norte de Chile es un activo de entidad. Antofagasta es un lugar con presencia en el grafo de conocimiento de Google. La consistente localización del trabajo de Neil en ese territorio, reforzada por datos estructurados y menciones en fuentes externas, construye esa asociación.

### Las señales de entidad que se refuerzan activamente

1. **Consistencia del nombre en todas las plataformas.** "Neil Meza" — siempre el mismo formato. No "N. Meza", no "Neil M.", no variaciones.

2. **El `sameAs` en todos los datos estructurados.** Conectar la entidad en neilmeza.com con las entidades en LinkedIn, Twitter, y eventualmente Wikidata y Wikipedia.

3. **Menciones en fuentes externas con contexto consistente.** Cuando Neil es citado en medios, publicaciones o presentaciones, el contexto debe ser coherente: territorio, especialización, perspectiva.

4. **Links entrantes de entidades relacionadas.** Una universidad de Antofagasta que linkea al trabajo de Neil tiene más valor de entidad que diez blogs genéricos. La calidad de los backlinks importa más que la cantidad.

---

## X. LA AUTORIDAD TEMÁTICA

La autoridad temática es la señal que Google usa para determinar si un sitio es una fuente confiable para un campo específico. No se construye con un artículo que menciona muchos términos del campo — se construye con profundidad sostenida sobre un conjunto coherente de temas durante un período largo.

### El campo temático de esta plataforma

El universo temático de neilmeza.com es específico y coherente:

```
Temas centrales (máxima autoridad):
- Infraestructura colaborativa
- Ecosistemas de innovación
- Innovación territorial
- Articulación institucional

Temas secundarios (profundidad de contexto):
- Innovación en América Latina
- Desarrollo económico territorial
- Construcción de capacidades
- Desierto de Atacama / Norte de Chile

Temas adyacentes (referencias ocasionales):
- Gestión del conocimiento
- Política pública de innovación
- Educación y ecosistemas
```

### La profundidad como señal de autoridad

Un sitio que tiene 50 artículos sobre "innovación" tiene menos autoridad temática que un sitio que tiene 15 artículos que exploran "infraestructura colaborativa" desde ángulos distintos y con evidencia específica. La amplitud superficial no construye autoridad — la profundidad específica sí.

Esta plataforma construye autoridad al explorar su tema central desde múltiples dimensiones:
- El ensayo que articula la teoría
- El caso que muestra la práctica
- La nota que conecta el concepto con un evento o desarrollo reciente
- El ensayo de respuesta que refina la posición ante las objeciones

### Lo que define los límites temáticos

Los límites del campo temático importan tanto como su centro. Si neilmeza.com publica un ensayo sobre gestión de proyectos genérica, finanzas personales, o tendencias del diseño gráfico, diluye la señal de autoridad temática. Cada pieza de contenido que no está dentro del campo temático definido reduce, marginalmente, la autoridad dentro del campo.

La disciplina editorial de este campo es también, por tanto, una decisión de SEO de largo plazo.

---

## XI. OPTIMIZACIÓN PARA BÚSQUEDA CON IA

La búsqueda está cambiando de manera estructural. Los motores de búsqueda tradicionales (10 blue links) están siendo complementados y en algunos casos reemplazados por sistemas de respuesta directa basados en IA: Perplexity, SearchGPT, Google AI Overviews, y Claude.

Esta transformación favorece estructuralmente el tipo de contenido que esta plataforma publica — y requiere ajustes específicos para maximizar la descubribilidad en estos nuevos sistemas.

### Por qué el contenido original con evidencia específica funciona mejor en búsqueda con IA

Los LLMs que alimentan los sistemas de búsqueda con IA tienen una preferencia estructural por:

1. **Afirmaciones específicas y verificables.** "La infraestructura colaborativa reduce el tiempo de articulación institucional" es más citable que "la colaboración es importante para la innovación." Los LLMs prefieren afirmaciones que pueden citar en una respuesta.

2. **Evidencia localizada y específica.** Un caso documentado en Antofagasta con métricas específicas es más útil para un LLM que está construyendo una respuesta sobre ecosistemas de innovación en territorios no-convencionales que un ensayo genérico sobre innovación.

3. **Estructura semántica clara.** Headings que son resúmenes del contenido que les sigue, párrafos con una idea central, oraciones de apertura que enuncian el argumento. El contenido bien estructurado es más fácil de citar con precisión.

4. **Fuentes cruzadas consistentes.** Cuando múltiples fuentes referencian el mismo concepto asociado al mismo autor, la confianza del LLM en la atribución aumenta.

### Adaptaciones específicas para optimización de IA

**Las oraciones de apertura como respuestas directas:**
El primer párrafo de cada sección debe poder funcionar como una respuesta directa a una pregunta implícita. Un LLM que recibe la pregunta "¿Qué es la infraestructura colaborativa?" debería poder citar el primer párrafo del ensayo fundacional de la plataforma sobre ese concepto.

**Los headings como preguntas respondidas:**
Los headings de los ensayos son más útiles para la búsqueda con IA cuando describen la conclusión, no el tema:

```
✓ "Por qué la confianza no se puede diseñar — solo facilitar"
✓ "El momento en que un ecosistema pasa de coordinación a colaboración"

✗ "El papel de la confianza"
✗ "Fases del ecosistema"
```

**Las definiciones explícitas:**
En el ensayo fundacional de cada concepto central, incluir una definición explícita del término:

```markdown
La **infraestructura colaborativa** es el conjunto de condiciones,
relaciones y acuerdos implícitos que hacen posible la cooperación
sostenida entre actores institucionalmente distintos, sin que
esa cooperación requiera supervisión constante para mantenerse.
```

Un LLM puede citar esta definición directamente.

**Las listas de implicaciones:**
Después de un argumento complejo, una lista explícita de sus implicaciones facilita la citación:

```markdown
Esto tiene tres consecuencias directas:
1. Los proyectos de innovación que no construyen confianza entre actores...
2. Los programas de vinculación que solo crean estructuras formales...
3. Las universidades que miden impacto en el corto plazo...
```

---

## XII. DESCUBRIBILIDAD EN GOOGLE, BING Y LLMs

### Google — la plataforma principal

**Los factores de ranking que más impactan en esta plataforma:**

*Core Web Vitals:* Medidos por Google desde páginas reales de usuarios. La arquitectura de performance definida en `13_PERFORMANCE.md` hace que este factor sea positivo por diseño estructural.

*E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness):* El sistema de evaluación de calidad de Google. Para una plataforma de marca personal, E-E-A-T se demuestra con:
- Experiencia: Casos de estudio con evidencia específica de participación directa
- Expertise: Profundidad conceptual de los ensayos
- Authoritativeness: Menciones en fuentes externas autoritativas
- Trustworthiness: Datos verificables, fuentes citadas, política editorial transparente

*Backlinks de autoridad:* Los links entrantes de universidades, medios de comunicación especializados, organizaciones del sector, y plataformas reconocidas aumentan la autoridad del dominio. No son la única señal — pero siguen siendo importantes.

**El Search Console como fuente primaria de datos:**
Google Search Console provee datos que ninguna otra herramienta tiene: las queries exactas por las que la plataforma aparece en resultados, las páginas que tienen impresiones pero baja tasa de click, y las métricas de Core Web Vitals de usuarios reales de Chrome.

Las métricas de Search Console se revisan mensualmente con énfasis en:
- Queries de alta impresión y bajo CTR (indicadores de meta descriptions mejorables)
- Páginas indexadas vs. no indexadas (detectar problemas de crawlability)
- Core Web Vitals: URLs con issues a resolver

### Bing — el segundo motor relevante

Bing tiene aproximadamente 10-15% del tráfico de búsqueda global, con mayor proporción en Windows (donde es el motor predeterminado) y en Enterprise (donde Bing alimenta Microsoft Copilot).

**Por qué Bing importa específicamente:**
Microsoft Copilot usa Bing como fuente de datos en tiempo real. Contenido bien posicionado en Bing aparece en las respuestas de Copilot — que es el asistente de IA integrado en Windows 11, Microsoft 365, y GitHub Copilot Enterprise.

**Las diferencias de Bing que requieren adaptación:**
- Bing tiende a dar Knowledge Panels a individuos más fácilmente que Google
- Bing valora más las señales de redes sociales (Twitter/X, LinkedIn)
- Bing Webmaster Tools tiene herramientas de diagnóstico específicas que complementan Search Console

**El Bing Webmaster Tools:**
Además de Google Search Console, la plataforma verifica propiedad en Bing Webmaster Tools y envía el sitemap. El esfuerzo marginal es bajo y el beneficio de visibilidad en Copilot es significativo.

### Perplexity y los AI Overviews

Perplexity es actualmente el sistema de búsqueda con IA más popular entre audiencias técnicas y académicas — exactamente el perfil del lector de esta plataforma. Sus citas priorizan contenido con:
- URLs permanentes y canónicas (las páginas efímeras se citan menos)
- Autorías identificadas (el schema Person ayuda)
- Contenido largo con estructura clara
- Fuentes externas citadas dentro del contenido

**Google AI Overviews** sigue un modelo similar pero con acceso a todo el índice de Google y sus señales de autoridad adicionales.

**La regla del robots.txt para IA:**
Los scrapeadores de datos de entrenamiento de LLMs (GPTBot, Anthropic-AI, etc.) están permitidos en esta plataforma por defecto. Bloquearlos impediría que el contenido sea incluido en los conjuntos de datos de entrenamiento — reduciendo la probabilidad de que el contenido sea referenciado en respuestas de LLMs.

```
# robots.txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: anthropic-ai
Allow: /

Sitemap: https://neilmeza.com/sitemap.xml
```

---

## XIII. LA FRESCURA DEL CONTENIDO

Los motores de búsqueda tienen señales de frescura que afectan el ranking para ciertos tipos de consultas. Pero la estrategia de frescura de esta plataforma no consiste en publicar más frecuentemente — consiste en actualizar el contenido existente de manera significativa.

### Los tres tipos de actualización

**Actualización de versión (ensayos):**
Cuando un ensayo se actualiza para reflejar nueva evidencia, nueva perspectiva, o correcciones, se documenta explícitamente:

```markdown
---
publishedAt: "2024-03-15"
updatedAt: "2025-11-20"
updateNote: "Actualizado para incorporar los hallazgos del caso X,
             que refina la hipótesis del párrafo 4."
---
```

El `dateModified` en el schema Article se actualiza. El `<time>` visible en la página también. Google interpreta esto como una actualización de contenido, no como contenido nuevo.

**Actualización longitudinal (casos de estudio):**
Los casos se actualizan sistemáticamente a T+12, T+36, y T+60 meses según la metodología de `11_CASE_STUDIES.md`. Cada actualización es una señal de frescura significativa — el contenido no solo se publicó, sino que se mantiene activo.

**Las notas de ecosistema como señal de actividad:**
Las Notas de Ecosistema son el contenido más oportuno de la plataforma. Su frecuencia de publicación (sin cadencia fija, pero por su naturaleza más frecuente que los ensayos) mantiene la señal de actividad del dominio — indica a los motores de búsqueda que el sitio sigue siendo activo y relevante.

---

## XIV. LA ESTRATEGIA DE INDEXACIÓN

### El sitemap

El sitemap se genera automáticamente en cada build de Next.js. Incluye:
- Todas las páginas públicas en orden de prioridad
- Las fechas de última modificación (tomadas del frontmatter del contenido)
- Las variantes de idioma cuando existen (con `hreflang`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>https://neilmeza.com/</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://neilmeza.com/trabajo</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://neilmeza.com/pensamiento</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Ensayos individuales: priority 0.8 -->
  <!-- Casos individuales: priority 0.8 -->
  <!-- Notas individuales: priority 0.6 -->
  <!-- /sobre, /construyamos: priority 0.7 -->
</urlset>
```

### Las páginas que no se indexan

```
/api/*           (API Routes — no son páginas de contenido)
/construyamos    (se indexa pero no se prioriza — es funcional, no editorial)
```

No hay razón para excluir otras páginas. Las páginas de índice (/trabajo, /pensamiento) son valiosas para la indexación — son las páginas desde las que Google puede descubrir el contenido individual.

### El crawl budget y la priorización

En un sitio pequeño (< 200 URLs), el crawl budget no es una preocupación crítica — los bots de Google tienen capacidad suficiente para crawlear todo el sitio en cada visita. Las políticas de crawl budget se vuelven relevantes cuando el sitio tiene miles de páginas.

Lo que sí se gestiona es la señal de prioridad en el sitemap y en la navegación interna: los ensayos y casos de estudio tienen más links internos apuntando hacia ellos, lo que los identifica como las páginas más importantes del sitio.

---

## XV. OPORTUNIDADES DEL KNOWLEDGE GRAPH

El Knowledge Graph de Google es el grafo de entidades sobre el que el motor de búsqueda razona para responder preguntas. Estar en el Knowledge Graph no garantiza visibilidad — pero no estar en él limita el tipo de visibilidad disponible.

### Wikidata como puerta de entrada

Wikidata es la base de datos de entidades del ecosistema Wikimedia (que incluye Wikipedia). Una entrada en Wikidata, aunque sea mínima, le da a Google una fuente estructurada para construir la entidad "Neil Meza" en su Knowledge Graph.

**El criterio de notabilidad de Wikidata es más bajo que Wikipedia.** No requiere que Neil sea famoso globalmente — requiere que sea verificablemente real y que tenga fuentes externas que lo documenten. Menciones en medios de comunicación, publicaciones en instituciones, o participación documentada en eventos son suficientes.

**Cuándo crear la entrada en Wikidata:**
Cuando la plataforma tenga suficientes fuentes externas verificables para que la entrada sea sostenible (aproximadamente 5-10 menciones en fuentes no-autopublicadas). Crear una entrada antes de ese punto puede resultar en que sea eliminada por no cumplir el criterio de notabilidad.

### LinkedIn como señal de autoridad

El perfil de LinkedIn de Neil es parte del grafo de conocimiento. Google indexa los perfiles de LinkedIn con alta confianza — son fuentes de datos estructurados sobre personas. El perfil de LinkedIn debe ser coherente con el schema Person de la plataforma:
- Mismo nombre exacto
- Misma descripción de rol (adaptada al formato de LinkedIn)
- Link a neilmeza.com en la sección de websites
- Experiencia documentada coherente con los casos de la plataforma

### La presencia en medios como señal de autoridad de entidad

Cada mención en medios de comunicación reconocibles (universidades, prensa regional o nacional, publicaciones del sector) es una señal de autoridad de entidad. No porque los backlinks de medios mejoren el PageRank directamente (aunque lo hacen), sino porque Google usa las menciones en medios como confirmación de que la entidad "Neil Meza" existe y es relevante en su campo.

La estrategia de relaciones con medios está desarrollada a través de `09_CONTENT_STRATEGY.md` (el sistema editorial que produce el contenido que los medios citan), `10_COPYWRITING.md` (la voz que hace que esas citas sean precisas y atribuibles), y `15_ROADMAP.md` (la evolución de la presencia en medios por fase). Desde la perspectiva de SEO, el objetivo mínimo es 3-5 menciones verificables en fuentes externas antes de intentar crear una entrada en Wikidata.

---

## XVI. METADATA Y OPEN GRAPH

### El sistema de metadata por tipo de página

Cada página genera metadata específica para su tipo de contenido. La generación es automática a partir del frontmatter del archivo MDX — el equipo de contenido no configura metadata manualmente.

**Ensayo individual:**
```typescript
// Generado automáticamente por lib/metadata.ts
export const metadata: Metadata = {
  title: `${essay.title} — Neil Meza`,
  description: essay.metaDescription,  // Máximo 155 caracteres
  openGraph: {
    type: 'article',
    title: essay.title,
    description: essay.metaDescription,
    images: [{
      url: essay.ogImage ?? '/images/og/default.jpg',
      width: 1200,
      height: 630,
      alt: essay.title,
    }],
    publishedTime: essay.publishedAt,
    modifiedTime: essay.updatedAt,
    authors: ['https://neilmeza.com/sobre'],
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: essay.title,
    description: essay.metaDescription,
    images: [essay.ogImage ?? '/images/og/default.jpg'],
    creator: '@[handle de Neil]',
  },
}
```

### Las Open Graph Images

Las OG images son lo que se muestra cuando alguien comparte un link en redes sociales, en apps de mensajería, o en Slack. Son la primera impresión visual de la plataforma en contextos donde el diseño no puede controlarse directamente.

**La OG image predeterminada** es una imagen estática que refleja el design system de la plataforma: fondo en `--primitive-stone-0`, logotipo o nombre en `--primitive-stone-950`, acento en `--primitive-copper-500`.

**Las OG images de contenido** se generan dinámicamente para cada ensayo y caso de estudio con el título del contenido. Se pueden generar en tiempo de build con `@vercel/og` o similares, usando los tokens del design system para mantener coherencia visual.

**Las dimensiones estándar:** 1200×630px para Open Graph (Facebook, LinkedIn), 1200×600px para Twitter Cards.

### La meta description como CTA de búsqueda

La meta description no mejora directamente el ranking — pero determina el CTR (click-through rate) en los resultados de búsqueda. El texto que Google muestra debajo del título en el resultado es la meta description.

**Las reglas de la meta description en esta plataforma:**
- Máximo 155 caracteres (Google trunca después de ese punto)
- Contiene la afirmación central del contenido, no una descripción genérica
- No termina en "..." si se puede evitar
- Es única para cada página — nunca la misma descripción en dos páginas

---

## XVII. LA GOBERNANZA DE BÚSQUEDA A LARGO PLAZO

### El inventario de URLs

Se mantiene un documento interno (`docs/url-inventory.md`) con el listado de todas las URLs canónicas publicadas, su fecha de publicación, y su estado (activa, redirigida, eliminada):

```markdown
| URL | Slug | Publicación | Estado | Redirecciona a |
|-----|------|-------------|--------|----------------|
| /pensamiento/[slug] | ... | YYYY-MM-DD | activa | — |
```

Este inventario es la fuente de verdad para cualquier decisión que afecte URLs existentes. Antes de cambiar cualquier URL, se consulta el inventario.

### La auditoría anual de búsqueda

Una vez al año, el equipo realiza una auditoría completa del estado de búsqueda de la plataforma:

1. **Cobertura en Search Console:** ¿Cuántas URLs están indexadas? ¿Hay páginas con errores de indexación?

2. **Performance de keywords:** ¿Para qué consultas aparece la plataforma? ¿Cuál es el CTR promedio?

3. **Backlinks entrantes:** ¿Qué sitios han linkeado a la plataforma? ¿Son fuentes relevantes?

4. **Core Web Vitals:** ¿Todas las páginas están en zona verde según los datos de campo de CrUX?

5. **Datos estructurados:** ¿Hay errores en el Rich Results Test de Google?

6. **Oportunidades nuevas:** ¿Hay queries de alta impresión y bajo CTR que sugieran meta descriptions mejorables? ¿Hay contenido de otras plataformas que esté rankeando para queries donde deberíamos rankear nosotros?

### El proceso de publicación como proceso de SEO

La descubribilidad de un nuevo contenido no empieza después de publicarlo — empieza en el proceso de su creación. La lista de verificación de publicación de `09_CONTENT_STRATEGY.md` incluye los items de SEO:

```
□ El title tag es la afirmación del contenido, no el topic
□ La meta description está dentro de 155 caracteres
□ El slug está en minúsculas, con guiones, sin stopwords innecesarios
□ La OG image está generada y es coherente con el design system
□ El schema Article/ScholarlyArticle está implementado y validado
□ El sitemap incluye la nueva URL
□ Los links internos hacia este contenido están añadidos desde piezas relacionadas
□ El contenido ha sido compartido en los canales donde la audiencia lo puede descubrir
```

### El principio de no intervención prematura

Una de las razones más comunes por las que las estrategias de SEO fallan es la intervención prematura: cambiar URLs que están rankeando, eliminar contenido que parece "viejo", reescribir títulos que están funcionando.

La posición de esta plataforma es de no intervención sobre lo que funciona. Si una URL rankea bien, no se toca. Si un contenido trae tráfico orgánico, no se elimina aunque sea "viejo" — se actualiza si tiene información desactualizada, pero no se borra.

La energía del equipo en SEO va hacia crear nuevo contenido de calidad y asegurar que el existente esté correctamente indexado y vinculado — no hacia optimizaciones tácticas de lo que ya funciona.

---

*Documento parte de la arquitectura estratégica de neilmeza.com. La descubribilidad no es una capa que se añade encima del contenido — es una consecuencia de contenido que merece ser encontrado, presentado con la claridad técnica que permite que los sistemas de búsqueda lo lean sin fricción. Leer en conjunto con `09_CONTENT_STRATEGY.md` (el contenido que hace posible la descubribilidad) y `12_TECHNICAL_ARCHITECTURE.md` (la infraestructura que lo soporta).*
