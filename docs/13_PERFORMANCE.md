# 13 — RENDIMIENTO
## La Filosofía de Rendimiento como Expresión de Calidad, Confianza y Artesanía

*Este documento no es un listado de optimizaciones. Es el handbook de ingeniería de rendimiento de la plataforma — el sistema de principios, presupuestos y decisiones que asegura que la velocidad de la plataforma sea, como su diseño, una demostración de la marca y no una consideración técnica secundaria.*

---

## I. LA FILOSOFÍA DE RENDIMIENTO

El rendimiento de una plataforma digital es una forma de respeto. Cada milisegundo de latencia innecesaria le dice al visitante, antes de que pueda leer una sola palabra, que el equipo detrás de la plataforma no valora su tiempo tanto como el tiempo que le pide prestar atención.

Para una plataforma cuya tesis es que la infraestructura invisible bien diseñada hace posible lo que de otra manera no ocurriría, una infraestructura técnica lenta es una contradicción en los términos. El visitante que llega a leer sobre la construcción de ecosistemas colaborativos de clase mundial y espera cuatro segundos para que cargue la primera pantalla ya ha recibido un mensaje sobre el estándar que esta plataforma aplica a sus propios sistemas.

El rendimiento en este proyecto no es una optimización que ocurre después de que el producto está construido. Es una dimensión de diseño que está presente desde las primeras decisiones de arquitectura y que se mantiene como una restricción activa a lo largo de toda la vida de la plataforma.

**El principio rector:** Una plataforma que promete construir infraestructura que no se ve pero cuya ausencia se siente debe ser, ella misma, una infraestructura que no se ve pero cuya ausencia se siente. El rendimiento es correcto cuando el visitante no lo nota. Es incorrecto cuando el visitante lo percibe como espera.

**La distinción que orienta todas las decisiones:**
El rendimiento medido (las métricas de laboratorio que Lighthouse reporta) y el rendimiento percibido (lo que el visitante experimenta) son distintos. Un sitio puede tener métricas de laboratorio excelentes y aun así sentirse lento. Un sitio puede tener métricas moderadas y sentirse rápido. El objetivo de este handbook es alcanzar ambos — pero cuando hay que elegir entre optimizar una métrica de laboratorio y mejorar la percepción del visitante real, el visitante real gana.

---

## II. LA PSICOLOGÍA DE LA CARGA

Antes de definir presupuestos y objetivos, es necesario entender qué produce la experiencia de velocidad en el cerebro humano. La psicología de la espera en interfaces digitales está bien documentada y tiene implicaciones concretas para las decisiones de ingeniería.

**Los umbrales de percepción:**

*0–100 ms.* El cerebro humano percibe esta velocidad como instantánea. Cualquier respuesta dentro de este rango se experimenta como causa directa de la acción del usuario — sin brecha perceptible entre el clic y el resultado.

*100–300 ms.* Rápido. El usuario nota que hay una pequeña demora pero la acepta sin frustración. Es el rango de las transiciones de UI, los hover states y las respuestas de formulario. Las microinteracciones de esta plataforma operan en este rango.

*300 ms–1 s.* El usuario comienza a perder el hilo de pensamiento que tenía cuando tomó la acción. No abandona — pero está esperando activamente. Las navegaciones de página a página deben resolverse dentro de este rango.

*1–3 s.* El rango donde los estudios muestran tasas de abandono crecientes. El usuario comienza a dudar de si su acción registró. Sin un indicador visual de progreso, la probabilidad de que el usuario abandone o repita la acción por error aumenta significativamente.

*> 3 s.* Abandono activo. Para esta plataforma, este tiempo de carga nunca es aceptable en ninguna condición de red razonable.

**El efecto del feedback inmediato:**
La investigación en psicología de la espera demuestra consistentemente que el tiempo percibido es significativamente menor cuando el sistema da feedback inmediato sobre qué está pasando. Un skeleton screen (estructura visible antes de que el contenido cargue) hace que una carga de 2 segundos se perciba como más corta que una pantalla en blanco durante 1 segundo. La plataforma usa este principio sistemáticamente: algo visualmente presente antes de que el contenido esté disponible.

**El efecto de la incertidumbre:**
La incertidumbre amplifica la percepción del tiempo. Un indicador que muestra que algo está ocurriendo — aunque no diga exactamente cuánto tiempo tomará — reduce la percepción de espera más que cualquier optimización de velocidad real por debajo de cierto umbral. Las páginas de esta plataforma nunca muestran una pantalla en blanco durante una transición.

---

## III. RENDIMIENTO PERCIBIDO

El rendimiento percibido es la suma de las decisiones de diseño e ingeniería que hacen que la plataforma parezca más rápida de lo que los números absolutos indicarían. Estas son las técnicas estructurales que lo producen.

**Contenido antes que chrome.**
El contenido que el visitante vino a consumir (el titular, el primer párrafo, la imagen de apertura) carga antes que los elementos de navegación, footer y elementos secundarios. La arquitectura de Next.js App Router favorece esto por diseño — pero debe ser verificada activamente para cada página.

**El texto primero.**
En todas las páginas, el texto carga antes que las imágenes. El cerebro procesa el texto antes que la imagen para construir comprensión — y el texto es significativamente más ligero que las imágenes. Un visitante que puede leer el primer párrafo mientras la imagen carga percibe la página como disponible, no como incompleta.

**Las transiciones como gestión del tiempo.**
Las transiciones de página en esta plataforma (fade de 180ms) no son decorativas — son instrumentos de gestión temporal. Un corte abrupto entre páginas hace que el cerebro registre el tiempo de carga como espera. Una transición suave convierte ese mismo tiempo en un momento de transición intencional. El tiempo objetivamente es el mismo; la percepción es distinta.

**Los estados de carga como comunicación.**
Cuando algo tarda más de 300ms, el sistema comunica qué está pasando. No con un spinner genérico — con un skeleton que refleja la estructura del contenido que está cargando. El visitante ve que algo específico está en camino, no que el sistema está ocupado en algo desconocido.

---

## IV. LOS PRESUPUESTOS DE RENDIMIENTO

Los presupuestos de rendimiento son los límites cuantitativos que definen el rango aceptable de cada recurso. No son objetivos a aspirar — son restricciones activas que, si se superan, detienen el despliegue.

### Presupuesto de JavaScript

```
Bundle total (gzipped):             < 80 KB
Bundle de la ruta principal:        < 40 KB
Cada chunk adicional por ruta:      < 30 KB
Tiempo de parsing en CPU lenta:     < 50ms
Bloqueo del hilo principal:         0 ms (no blocking)
```

**Lo que está incluido en el presupuesto:**
- React + React DOM: ~40KB gzipped (inevitable — es el framework)
- El código de la aplicación: < 40KB gzipped objetivo

**Lo que nunca entra en el bundle:**
- jQuery (no existe una razón para incluirlo)
- Lodash completo (usar importaciones específicas o alternativas nativas)
- Moment.js (usar Intl API nativa o date-fns con tree-shaking)
- Cualquier librería de componentes de UI que no sea del propio design system

**La regla del tercero:**
Antes de agregar cualquier dependencia de npm, se evalúa su costo con bundlephobia.com. Una librería que agrega más de 5KB gzipped requiere justificación explícita documentada en el PR. Una que agrega más de 15KB requiere aprobación del equipo técnico.

### Presupuesto de CSS

```
CSS total (gzipped):                < 40 KB
CSS crítico (inlined en <head>):    < 10 KB
CSS por ruta adicional:             < 15 KB
CSS no utilizado:                   0% (por diseño estructural)
```

El presupuesto de CSS de 0% no utilizado no se logra con herramientas de purga post-build — se logra con CSS Modules, que por definición solo incluyen los estilos que los componentes activos referencian. No hay hoja de estilos global de 300KB de la que se purgan clases.

### Presupuesto de imágenes

```
Imagen hero (above the fold):       < 150 KB (WebP/AVIF)
Imágenes de cuerpo (essay, casos):  < 100 KB cada una
Fotografía documental full-width:   < 200 KB
Thumbnails / previews:              < 30 KB
Favicon:                            < 5 KB
OG images:                          < 100 KB
```

Estos presupuestos aplican después de la optimización automática de `next/image`. Las imágenes fuente pueden ser más grandes — el sistema las convierte al tamaño y formato correctos para cada viewport.

### Presupuesto de tipografía

```
Archivo de fuente principal (woff2): < 50 KB por weight
Fuente display (solo usado en hero): < 30 KB subset
Tiempo de carga de fuente:          < 500ms (primer render)
FOUT visible:                       0ms (font-display: optional para secund.)
```

### Presupuesto de terceros

```
Scripts de terceros en producción:  ≤ 1 (Plausible Analytics)
Tamaño del script de analytics:     < 2 KB
Impacto en INP del script externo:  0 ms (strategy="afterInteractive")
```

**La política de terceros:**
Cada nuevo script o recurso de terceros que se agrega a la plataforma requiere:
1. Documentación del propósito exacto
2. Análisis del impacto en el performance budget
3. Verificación de que no introduce cookies sin consentimiento
4. Confirmación de que puede cargarse de manera asíncrona y diferida

---

## V. LA ESTRATEGIA DE CORE WEB VITALS

### LCP — Largest Contentful Paint: < 1.5s (objetivo: < 1.2s)

El LCP mide cuándo el elemento más grande visible en la pantalla termina de renderizarse. En esta plataforma, ese elemento es casi siempre el titular display en el homepage o el titular H1 de cada página interior.

**La estrategia:**
El texto es el LCP más eficiente posible — es bytes de texto plano, no imágenes. Para que el LCP sea el texto y no una imagen potencialmente más pesada, el hero del homepage no tiene una imagen de fondo grande que compita con el titular como LCP. Las decisiones de diseño y las decisiones de performance están alineadas.

Cuando el LCP es texto, lo que más lo afecta es la carga de la fuente. Si la fuente no está disponible cuando el navegador necesita pintar el texto, ocurre FOUT (Flash of Unstyled Text) o el texto simplemente no aparece hasta que la fuente carga, retrasando el LCP.

**La solución:** Las fuentes se auto-hospedan vía `next/font`. El navegador hace la solicitud al mismo origen que la página, eliminando el RTT adicional hacia un CDN de fuentes externo. La fuente principal (Söhne Regular) se precarga en el `<head>` con `<link rel="preload">`.

**Lo que se mide:** El LCP se monitorea en el laboratorio (Lighthouse) y en el campo (CrUX data de Search Console). Un LCP mayor a 1.8s en el campo activa una investigación.

### CLS — Cumulative Layout Shift: < 0.1 (objetivo: < 0.05)

El CLS mide cuánto se mueven los elementos de la página mientras carga. Un CLS alto es visualmente perturbador y refleja descuido en la implementación — el opuesto de lo que esta plataforma comunica.

**Las causas de CLS y cómo se previenen estructuralmente:**

*Imágenes sin dimensiones:* Todo elemento `<img>` en el código tiene `width` y `height` definidos. `next/image` lo exige — si se omiten, el build falla. El navegador reserva el espacio correcto antes de que la imagen cargue.

*Fuentes que cambian el layout:* Con `font-display: optional` para las fuentes secundarias, si la fuente personalizada no carga en el tiempo de render inicial, el navegador usa la fuente de fallback y no cambia cuando la fuente real llega. Esto sacrifica la fuente perfecta en conexiones lentas a cambio de cero CLS.

*Contenido dinámico insertado sobre contenido existente:* Ningún componente inserta contenido sobre contenido ya visible sin que el espacio haya sido reservado. Los banners, notificaciones y estados de formulario aparecen en espacios predefinidos del layout.

*Skeleton screens:* Cuando se carga contenido asíncronamente, los skeleton screens tienen exactamente las mismas dimensiones que el contenido que van a reemplazar. No hay "salto" cuando el contenido real llega.

### INP — Interaction to Next Paint: < 200ms (objetivo: < 100ms)

El INP reemplazó a FID en 2024 como la métrica de responsividad. Mide el tiempo entre cualquier interacción del usuario (click, tap, teclado) y el siguiente paint que refleja esa interacción.

**Las fuentes de INP alto y cómo se previenen:**

*JavaScript en el hilo principal:* Todo el procesamiento de JavaScript debe completarse en menos de 50ms antes de devolver el control al navegador. Si un handler de evento necesita hacer trabajo pesado, ese trabajo va a un Web Worker.

*Efectos de layout caros en hover:* Los estados de hover que cambian propiedades como `width`, `height`, `margin` o `padding` disparan recálculos de layout (reflow) que son costosos. Las microinteracciones de esta plataforma solo cambian `transform` y `opacity` — propiedades que el GPU maneja sin recalcular el layout.

*Render bloqueante en interacciones:* Si un click desencadena la carga de un módulo JavaScript que no estaba cargado (un dynamic import que no fue precargado), hay latencia perceptible. Los componentes que se activan por interacción del usuario tienen sus módulos pre-cargados en el tiempo de idle con `prefetch`.

### TTFB — Time to First Byte: < 200ms (objetivo: < 50ms en edge)

El TTFB mide cuánto tarda el servidor en responder con el primer byte. Con páginas estáticas servidas desde el edge de Vercel, el TTFB objetivo es < 50ms desde cualquier ubicación con acceso a Internet razonable — porque la respuesta viene de un nodo de edge geográficamente cercano, no de un servidor de origen.

Un TTFB superior a 200ms indica que la página no está siendo servida desde el cache del edge. Esto es un problema de configuración de cache — no de velocidad del servidor.

---

## VI. LA ESTRATEGIA DE IMÁGENES

Las imágenes son el recurso más pesado de la plataforma y el que más impacta el rendimiento cuando no se gestiona correctamente. Esta estrategia elimina el peso innecesario de manera estructural, no caso por caso.

### Formatos

La plataforma sirve imágenes en AVIF (cuando el navegador lo soporta) o WebP (fallback para navegadores más viejos), nunca en JPEG o PNG para imágenes de contenido. `next/image` maneja esta decisión automáticamente — el equipo de contenido puede subir archivos JPEG de alta resolución y el sistema entregará el formato óptimo al visitante.

**El ahorro de tamaño:**
- AVIF vs. JPEG: 40-60% menos bytes para calidad visual equivalente
- WebP vs. JPEG: 25-35% menos bytes

### Imágenes responsivas

Cada imagen tiene un conjunto de `srcset` definido que sirve el tamaño correcto para el viewport del visitante. Una imagen que aparece a 400px de ancho en móvil no carga el archivo de 1200px de ancho que se usa en desktop.

```typescript
// next/image maneja esto automáticamente con sizes prop
<Image
  src="/images/caso-gys-apertura.jpg"
  alt="[descripción contextual]"
  width={1200}
  height={675}
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 80vw,
         60vw"
  priority={esAboveFold}
/>
```

### Carga diferida

Las imágenes debajo del fold se cargan lazy — solo cuando el visitante se acerca a su posición en el scroll. `next/image` implementa esto con `loading="lazy"` por defecto.

Las imágenes above the fold (el hero del homepage, la imagen de apertura de un caso de estudio) reciben `priority={true}` — se precargan en el `<head>` con `<link rel="preload">` para que estén disponibles antes de que el navegador llegue a renderizarlas.

### Comprensión y calidad

Los objetivos de compresión por tipo de imagen:

```
Fotografía documental (full-width): 70-80% calidad AVIF → ~100-180KB
Fotografía de cuerpo de texto:     80% calidad AVIF → ~60-100KB
Thumbnails y previews:             75% calidad WebP → ~15-30KB
Fotografía textural (monocromática): 85% calidad WebP → ~20-40KB
OG Images (1200×630):              80% calidad WebP → ~60-100KB
```

Los archivos fuente que el equipo de contenido sube no tienen restricción de tamaño — el pipeline de `next/image` los comprime automáticamente. Pero el equipo debe entregar archivos que representen la resolución máxima necesaria: fotografías de 3000px de ancho son suficientes para todos los usos en la plataforma; no es necesario subir archivos RAW de 50MB.

---

## VII. LA ESTRATEGIA DE TIPOGRAFÍA

La tipografía es el activo más importante de esta plataforma. La estrategia de carga de tipografía es, por tanto, crítica para el rendimiento percibido.

### Auto-hospedaje con next/font

Las fuentes no se cargan desde Google Fonts ni desde el CDN del foundry tipográfico. Se auto-hospedan con `next/font`, que:
1. Descarga los archivos de fuente en tiempo de build
2. Los añade a la carpeta estática del proyecto
3. Los sirve desde el mismo origen que la aplicación
4. Genera automáticamente el CSS de `@font-face`
5. Añade los atributos de preload correctos al `<head>`

El beneficio: elimina el round-trip de red adicional hacia un servidor de fuentes externo. En conexiones lentas, este round-trip puede ser de 200-500ms — tiempo que con el auto-hospedaje se elimina completamente.

### Subsetting

Las fuentes tipográficas completas incluyen soporte para docenas de idiomas y cientos de caracteres especiales que esta plataforma nunca usará. Con subsetting, se genera un archivo de fuente que solo incluye los caracteres necesarios.

Para esta plataforma en español (y eventualmente inglés):
- Caracteres del alfabeto latino básico y extendido
- Caracteres especiales del español (á, é, í, ó, ú, ñ, ü, ¡, ¿)
- Números y puntuación estándar
- Sin caracteres cirílicos, chinos, árabe, etc.

El resultado: archivos de fuente de 20-40KB en lugar de 80-120KB para archivos completos.

### Font Display Strategy

```css
/* Fuente primaria (Söhne / grotesca humanista) */
font-display: swap;
/*
  Si la fuente no carga en 100ms, usa el fallback.
  Cuando la fuente carga, la aplica (FOUT aceptable
  porque la fuente de fallback está calibrada para
  minimizar el salto).
*/

/* Fuente serif editorial (Tiempos Text) */
font-display: optional;
/*
  Si la fuente no carga antes del primer render,
  usa el fallback permanentemente para esa sesión.
  Sin FOUT. Sacrifica la fuente perfecta en conexiones
  lentas a cambio de cero CLS.
  Justificación: la serif solo aparece en ensayos largos
  — si el visitante llega a leerlos, la conexión es
  probable que soporte la carga de la fuente.
*/
```

### Fuente de fallback calibrada

El FOUT (Flash of Unstyled Text) ocurre cuando el navegador usa una fuente de sistema antes de que cargue la fuente personalizada, y luego la reemplaza. El salto visual es proporcional a qué tan diferentes son las métricas de la fuente personalizada y la fuente de sistema.

La solución es calibrar la fuente de fallback con `size-adjust`, `ascent-override` y `descent-override` para que sus dimensiones sean lo más cercanas posible a la fuente personalizada. `next/font` hace esto automáticamente para las fuentes de Google Fonts. Para fuentes autohospedadas, se calculan manualmente o con herramientas como Font Style Matcher.

---

## VIII. EL PRESUPUESTO DE ANIMACIONES

Las animaciones tienen costo técnico real: ocupan tiempo del CPU o del GPU, y si no están implementadas correctamente, producen janks (saltos en la animación) que son visualmente perturbadores y reducen el INP.

### Las propiedades animables sin costo de layout

Solo dos propiedades CSS pueden animarse sin disparar un recálculo de layout:
- `transform` (translate, scale, rotate)
- `opacity`

Todo lo demás — `width`, `height`, `margin`, `padding`, `top`, `left`, `border` — dispara un reflow que el browser debe recalcular para toda la página. En pantallas de alta densidad con múltiples elementos, un reflow tarda entre 50 y 200ms — lo suficiente para hacer la animación perceptiblemente choppy.

**La regla absoluta:** Ninguna animación de esta plataforma anima propiedades que no sean `transform` u `opacity`.

### Los límites cuantitativos

```
Duración máxima de animación UI:          300ms
Duración máxima de transición de página:  250ms
Duración máxima de animación de contenido: 400ms (first paint de secciones)
Animaciones concurrentes máximas:         3 por viewport
FPS objetivo para todas las animaciones:  60fps (16.67ms por frame)
```

**La regla de las animaciones concurrentes:**
Si más de tres elementos están animando simultáneamente en el mismo viewport, el usuario no percibe las tres animaciones — percibe movimiento genérico que compite por atención. Más de tres animaciones simultáneas es siempre una decisión de diseño incorrecta, no un problema de performance.

### GPU Acceleration explícita

Para animaciones críticas donde el performance es importante, se usa `will-change: transform` con moderación:

```css
/*
  Solo en elementos que definitivamente van a animarse.
  will-change en demasiados elementos causa más overhead
  que el que previene — el GPU reserva memoria por adelantado.
*/
.nav {
  will-change: background-color; /* La transición de scroll */
}
```

### El presupuesto de prefers-reduced-motion

Todos los elementos animados tienen una versión reducida que respeta `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Esta regla se aplica globalmente — no hay componente que requiera overrides individuales para respetar la preferencia del sistema.

---

## IX. EL PRESUPUESTO DE JAVASCRIPT

JavaScript es el recurso más costoso que puede cargar una página web. No solo pesa bytes — también requiere parsing, compilación, y ejecución, todos en el hilo principal que también maneja las interacciones del usuario. Un bundle de JavaScript grande es la causa más común de INP alto y de experiencias lentas en dispositivos de gama media.

### Los principios de JavaScript en esta plataforma

**No-JS first.** Si algo puede hacerse con HTML y CSS, no hay JavaScript. Los estados de hover, los estilos de focus, las transiciones de color, el diseño responsivo — todo HTML y CSS. JavaScript entra cuando la interactividad genuinamente requiere lógica de estado que HTML y CSS no pueden manejar.

**El JavaScript de las páginas de contenido es cercano a cero.** Las páginas de ensayos, los casos de estudio, la página Sobre Neil — son documentos. Renderizados en el servidor en tiempo de build. El cliente recibe HTML y CSS. React se inicializa (hydration) pero no hace nada significativo en estas páginas.

**El JavaScript que existe es específico del componente.** La navegación móvil (el drawer), el formulario de Construyamos, la búsqueda — cada uno es un módulo separado que se carga solo cuando el componente está en la página. La página de un ensayo no carga el JavaScript del formulario de contacto.

### El modelo de carga de JavaScript

```
Estrategia por tipo de página:

Páginas de contenido (ensayos, casos, sobre):
→ 0 KB de JavaScript adicional después de React
→ React se hidrata pero no añade interactividad

Páginas interactivas (construyamos):
→ +25KB máximo para la lógica del formulario

Página de índices (trabajo, pensamiento):
→ +10KB para el sistema de filtrado/búsqueda básica
```

### La regla del dynamic import

Los componentes que solo se necesitan en ciertas condiciones se importan dinámicamente:

```typescript
// El formulario de búsqueda solo se importa cuando
// el usuario activa la búsqueda — no en la carga inicial
const SearchDialog = dynamic(
  () => import('./SearchDialog'),
  {
    loading: () => <SearchSkeleton />,
    ssr: false  // No necesita SSR — es una interacción del usuario
  }
)
```

---

## X. LA ARQUITECTURA CSS

### Sin CSS-in-JS de runtime

Las librerías de CSS-in-JS como styled-components y Emotion tienen un costo de runtime: generan el CSS en el navegador en cada render, lo que agrega procesamiento al hilo principal. Para una plataforma donde el CSS es estático y conocido en tiempo de build, ese costo es innecesario.

Esta plataforma usa:
- **CSS Modules** para el scoping de componentes (sin runtime)
- **CSS Custom Properties** para todos los tokens del design system (calculado por el navegador nativamente, no por JavaScript)

El resultado: todo el CSS existe como archivos estáticos en el servidor antes de que cualquier visitante llegue. No hay CSS generado en el cliente.

### CSS Crítico

El CSS crítico es el mínimo necesario para renderizar el above-the-fold de la página sin FOUC (Flash of Unstyled Content). En esta plataforma, el CSS crítico incluye:
- Los tokens del design system (variables CSS)
- Los estilos base del body y del layout root
- Los estilos de la barra de navegación
- Los estilos del texto display y el titular H1

Este CSS crítico (< 10KB) se incluye inline en el `<head>` de cada página. El resto de los estilos se carga de forma asíncrona.

### @layer para gestión de especificidad

```css
@layer reset, base, tokens, components, utilities;

@layer reset {
  /* Normalize / reset */
}

@layer tokens {
  /* CSS Custom Properties del design system */
}

@layer components {
  /* Estilos de componentes */
}

@layer utilities {
  /* Overrides específicos de contexto */
}
```

Con `@layer`, la especificidad está gestionada por la cascada de layers, no por el orden de los selectores ni por `!important`. Un override en el layer `utilities` siempre gana sobre `components`, independientemente de la especificidad del selector.

---

## XI. LA ESTRATEGIA DE RED

### HTTP/3 y QUIC

Vercel soporta HTTP/3 automáticamente para los navegadores que lo soportan. HTTP/3 usa QUIC (UDP) en lugar de TCP, lo que elimina el head-of-line blocking — en conexiones con pérdida de paquetes (WiFi congestionado, conexiones móviles), HTTP/3 es significativamente más rápido que HTTP/2.

El equipo de ingeniería no tiene que hacer nada para activar HTTP/3 — es una característica de la plataforma de hosting. Pero es importante verificar que las configuraciones de cache y los headers permiten que HTTP/3 funcione correctamente.

### Resource Hints

```html
<!-- Solo las conexiones externas absolutamente necesarias -->
<link rel="preconnect" href="https://plausible.io" />
<link rel="dns-prefetch" href="https://plausible.io" />

<!-- Preload de fuentes críticas -->
<link
  rel="preload"
  href="/fonts/sohne-regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>

<!-- Prefetch de rutas probables desde el homepage -->
<link rel="prefetch" href="/trabajo" />
<link rel="prefetch" href="/pensamiento" />
```

El `prefetch` de rutas permite que el navegador descargue el HTML de las páginas más probablemente visitadas a continuación, en background, durante el tiempo de idle. Cuando el visitante navega, la página ya está en el cache del navegador.

### Compresión

Todos los assets de texto (HTML, CSS, JavaScript, JSON, SVG) se sirven con compresión Brotli. Brotli produce archivos 15-25% más pequeños que gzip para los mismos archivos de texto. Vercel activa Brotli automáticamente.

---

## XII. LA FILOSOFÍA DE CACHÉ

Distintos tipos de recursos tienen distintas necesidades de caché. La estrategia de caché de esta plataforma diferencia entre lo que cambia raramente y lo que cambia con frecuencia.

### Assets inmutables — caché máximo

```
Cache-Control: public, max-age=31536000, immutable
```

Todo asset que tiene un hash de contenido en su nombre de archivo (todos los archivos JS y CSS generados por Next.js, todos los archivos de fuente) puede ser cacheado por un año completo. Si el contenido cambia, el nombre del archivo cambia — no hay riesgo de servir una versión desactualizada.

### Páginas HTML — caché corto con revalidación

```
Cache-Control: public, s-maxage=60, stale-while-revalidate=3600
```

Las páginas HTML cambian cuando se publica contenido nuevo. Con `s-maxage=60`, el edge de Vercel sirve la versión cacheada por 60 segundos. Con `stale-while-revalidate=3600`, durante la siguiente hora después de que el caché expire, puede servir la versión vieja mientras regenera la nueva en background. El visitante nunca espera una regeneración — pero el contenido nuevo llega dentro de un minuto de publicarse.

### Respuestas de API — sin caché

```
Cache-Control: no-store
```

La API Route del formulario de contacto no tiene caché. Cada solicitud es única y debe procesarse en tiempo real.

### La estrategia de invalidación de caché

Con el modelo de deployment de Vercel, un nuevo deployment invalida automáticamente el caché de las páginas HTML. No es necesaria una estrategia de invalidación manual — cada vez que hay un nuevo despliegue, el edge sirve las páginas del nuevo build.

---

## XIII. LA ESTRATEGIA DE CDN

### El edge de Vercel como CDN primario

Los assets estáticos de esta plataforma son servidos desde más de 80 nodos de edge de Vercel distribuidos globalmente. Para un visitante en México, Brasil, España o Colombia, la respuesta viene de un nodo en la misma región — no del servidor de origen.

**La latencia promedio de red para assets en edge:** 5-20ms. La latencia de un servidor de origen en una sola región: 50-250ms dependiendo de la ubicación del visitante.

### Las reglas del CDN

**Todo lo que puede estar en el edge, está en el edge.**
Las páginas HTML, JavaScript, CSS, imágenes, fuentes, el índice de búsqueda JSON — todos viven en el edge. La única excepción es la API Route del formulario de contacto, que debe ejecutarse en el servidor para aplicar rate limiting y enviar el email.

**Los assets inmutables tienen headers que permiten el cache en el cliente.**
El navegador del visitante cachea los assets con hash durante un año. La segunda visita carga los assets desde el caché local — sin hacer ninguna solicitud de red para esos recursos.

**El edge de Vercel vs. Cloudflare para el DNS:**
El DNS usa Cloudflare (como se define en `12_TECHNICAL_ARCHITECTURE.md`). Los assets usan el CDN de Vercel. Esta separación es intencional: Cloudflare ofrece mejor tiempo de propagación de DNS y protección DDoS; el CDN de Vercel está optimizado para Next.js y ofrece mejor integración con el sistema de build.

---

## XIV. LOS OBJETIVOS DE LIGHTHOUSE

Lighthouse es un instrumento de orientación, no el objetivo. Optimizar para Lighthouse en lugar de para el usuario real es uno de los errores más comunes en el rendimiento web — produce sitios que puntúan bien en laboratorio y se sienten lentos en el mundo real.

### Los scores mínimos para merge a producción

```
Performance:      90+ (objetivo: 95+)
Accessibility:    95+ (objetivo: 100)
Best Practices:   95+ (objetivo: 100)
SEO:              100
```

Estos son los valores que Lighthouse CI verifica en cada PR. Un PR que baja cualquier score por debajo del mínimo requiere revisión explícita del equipo técnico antes de poder hacer merge.

### La relación correcta con Lighthouse

Lighthouse mide el comportamiento en condiciones de laboratorio controladas: un dispositivo de potencia media simulada, una conexión de red emulada, sin plugins del navegador. Estas condiciones no reflejan la variedad de condiciones reales.

Por eso, los scores de Lighthouse son un proxy — útil para detectar regresiones pero no suficiente como única métrica. Se complementan con:

*Datos CrUX (Chrome User Experience Report):* Métricas de Core Web Vitals basadas en usuarios reales de Chrome. Disponible en Google Search Console. Tarda 28 días en tener suficiente volumen de datos para ser confiable — se revisa mensualmente.

*Mediciones en dispositivos reales:* Periódicamente (trimestral mínimo), el equipo mide la performance en un dispositivo de gama media real con una conexión móvil real. La diferencia con el laboratorio puede ser reveladora.

---

## XV. LA OBSERVABILIDAD DE RENDIMIENTO

### Real User Monitoring (RUM)

**Vercel Analytics** proporciona datos de Core Web Vitals de usuarios reales de la plataforma. A diferencia de los datos de CrUX (que son agregados de todos los usuarios de Chrome), los datos de Vercel Analytics son específicos de este sitio y están disponibles en tiempo casi real.

Las métricas que se monitoran activamente:
```
LCP por ruta:        ¿Cuál ruta tiene el peor LCP?
CLS por ruta:        ¿Hay alguna ruta con layout shifts inesperados?
INP por tipo de página: ¿Las interactivas responden dentro del presupuesto?
TTFB por región:     ¿Hay regiones donde el edge no está funcionando?
```

### Monitoreo sintético

**Lighthouse CI en GitHub Actions** corre en cada PR. Adicionalmente, un workflow de GitHub Actions corre Lighthouse contra producción cada semana — no solo en los PRs. Esto detecta regresiones que podrían ocurrir por cambios en el entorno (una nueva versión de un script de tercero, un cambio en el CDN de Vercel).

### Monitoreo de errores con Sentry

**Sentry** captura errores de JavaScript en producción. Los errores de performance (long tasks, interacciones lentas) se configuran como eventos de monitoreo además de los errores tradicionales.

El Sentry performance budget alert: si una transacción (page load, form submit) supera consistentemente su tiempo esperado, Sentry envía una alerta antes de que los usuarios lo reporten.

### El dashboard de rendimiento

Un documento interno (actualizable, no publicado) registra las métricas de rendimiento actuales y su evolución histórica:

```
| Métrica | Objetivo | Actual | Tendencia | Última medición |
|---------|----------|--------|-----------|-----------------|
| LCP     | <1.5s    | 1.2s   | ↓ mejorando | [fecha] |
| CLS     | <0.1     | 0.04   | → estable | [fecha] |
| INP     | <200ms   | 85ms   | ↓ mejorando | [fecha] |
| TTFB    | <200ms   | 45ms   | → estable | [fecha] |
```

---

## XVI. LA PREVENCIÓN DE REGRESIONES

Las regresiones de rendimiento raramente son eventos únicos y grandes — son la acumulación de pequeñas decisiones que cada una parece razonable en el momento pero que juntas producen un sitio significativamente más lento que el anterior.

### Los gates de CI que previenen regresiones

**Lighthouse CI en cada PR:**
No se puede hacer merge si la performance cae por debajo del mínimo. El costo de investigar y corregir la regresión recae en el PR que la introdujo — cuando el contexto aún está fresco.

**Bundle size analysis en cada PR:**
La herramienta `size-limit` analiza el tamaño del bundle JavaScript de cada PR y lo compara con el baseline:
```
# .size-limit.json
[
  {
    "name": "Main bundle",
    "path": ".next/static/chunks/*.js",
    "limit": "80 KB"
  }
]
```
Si el bundle supera el límite, el CI falla con un mensaje que indica exactamente qué aumentó y cuánto.

**Import cost tracking:**
En el editor (VS Code), el plugin "Import Cost" muestra en tiempo real cuánto pesa cada import. Esto hace visible el costo de una dependencia en el momento de agregarla — no después.

### El proceso de investigación de regresiones

Cuando una regresión es detectada (por CI, por monitoreo de producción, o por un reporte), el proceso es:

1. Reproducir localmente con Lighthouse y con el DevTools de Chrome
2. Identificar qué PR introdujo la regresión con `git bisect` o comparando los bundles
3. Entender la causa raíz — no el síntoma
4. Corregir la causa raíz, no workarounds
5. Verificar que la corrección restaura la métrica al baseline
6. Documentar en el PR la causa y la corrección para futuras referencias

---

## XVII. LA GOBERNANZA DE RENDIMIENTO

### Quién es responsable de qué

La gobernanza de rendimiento en este proyecto sigue el principio de que la performance es responsabilidad de todos — pero con áreas de responsabilidad específicas:

**El equipo de ingeniería:**
Owns el JavaScript budget, la arquitectura CSS, el pipeline de build, los gates de CI, y las decisiones de infraestructura. Cualquier dependencia que se agrega pasa por su análisis de impacto.

**El equipo de diseño:**
Owns las decisiones que tienen impacto de rendimiento en el diseño: la complejidad de las animaciones, el número de fuentes y weights utilizados, el tamaño de los elementos above-the-fold. Cada cambio de diseño significativo incluye una conversación sobre su impacto de rendimiento.

**El editor de contenido (Neil):**
Owns la calidad y el tamaño de las imágenes que sube. Recibe guías claras sobre los formatos y tamaños aceptables. El pipeline automatiza la optimización, pero un archivo de 50MB cargado innecesariamente es un problema de flujo de trabajo, no de optimización automática.

### La revisión trimestral de performance

Una vez por trimestre, el equipo de ingeniería hace una revisión formal del estado del rendimiento de la plataforma:

1. Comparar las métricas actuales con el baseline de tres meses atrás
2. Revisar el tamaño del bundle y las dependencias nuevas
3. Revisar los datos de CrUX del período
4. Identificar las regresiones pendientes y las oportunidades de mejora
5. Actualizar el documento de métricas
6. Decidir si hay algún cambio arquitectónico necesario

---

## XVIII. EL EQUILIBRIO ACCESIBILIDAD-RENDIMIENTO

La accesibilidad y el rendimiento a veces crean tensiones técnicas. La posición de esta plataforma es inequívoca: la accesibilidad nunca se sacrifica por rendimiento. Pero la implementación de la accesibilidad sí puede — y debe — ser consciente del rendimiento.

### Los casos de tensión y su resolución

**Focus management en el drawer de navegación móvil:**
El drawer requiere focus trapping — cuando está abierto, el foco del teclado debe quedarse dentro del drawer. La implementación naive usa una librería de 30KB para focus trapping. La alternativa de rendimiento: una implementación específica de menos de 2KB que hace exactamente lo que se necesita y nada más.

**Anuncios de screen reader para transiciones de ruta:**
Cuando el usuario navega entre páginas, los screen readers deben anunciar el nuevo contenido. La solución correcta (desde la perspectiva de accesibilidad) es un `aria-live` region que anuncia el nuevo título de página. Su costo de rendimiento es cero — es HTML puro, sin JavaScript.

**Contraste de color y CSS:**
Mantener ratios de contraste WCAG AA/AAA no tiene impacto de rendimiento. Es una decisión de valor de color, no de carga técnica.

**Keyboard navigation y JavaScript:**
La navegación por teclado se implementa preferentemente con HTML semántico y CSS (`:focus`, `:focus-visible`). JavaScript se usa solo cuando HTML genuinamente no puede proveer la funcionalidad — por ejemplo, el manejo del Escape para cerrar el drawer.

---

## XIX. LA SOSTENIBILIDAD AMBIENTAL

Una plataforma digital consume energía: en los servidores que la sirven, en las redes que la transmiten, y en los dispositivos que la renderizan. La eficiencia técnica de la plataforma tiene un correlato ambiental directo.

**El argumento de la sostenibilidad:**

Para una plataforma cuya tesis incluye la construcción responsable de ecosistemas, la huella ambiental de su propia infraestructura técnica es relevante. No como declaración de marketing — como coherencia interna.

**Lo que la arquitectura de esta plataforma hace bien por defecto:**

*Generación estática:* Un sitio estático consume significativamente menos energía de servidor que un sitio renderizado dinámicamente en cada solicitud. La CPU del servidor no se activa para cada visita — solo para cada nuevo deployment.

*CDN edge serving:* Servir desde el nodo geográficamente más cercano reduce los kilómetros que los datos viajan por la red. Menos distancia = menos energía en la transmisión.

*Formatos de imagen modernos:* AVIF y WebP transfieren 40-60% menos datos que JPEG para la misma calidad visual. Menos bytes transferidos = menos energía de red.

*JavaScript mínimo:* Menos JavaScript significa menos procesamiento en el dispositivo del visitante. En dispositivos de gama media, un JS bundle grande aumenta el consumo de batería perceptiblemente.

**Los objetivos de sostenibilidad medibles:**

```
Website Carbon Calculator rating: A+ (< 0.1g CO2 por visita)
Tamaño de página total:           < 500 KB por página (sin video)
```

El Website Carbon Calculator (websitecarbon.com) provee una estimación del CO2 generado por cada visita. El objetivo de < 0.1g CO2 por visita coloca a esta plataforma en el percentil más eficiente de la web.

---

## XX. EL RENDIMIENTO A DIEZ AÑOS

Una plataforma diseñada para durar una década enfrenta una realidad técnica: el panorama del rendimiento web cambia. Lo que hoy es una práctica estándar puede ser obsoleto en cinco años. Lo que hoy es una tecnología emergente puede ser el estándar en tres.

### Los principios que no cambian

Lo que sí es estable en el horizonte de diez años:
- El contenido que carga más rápido siempre produce mejor experiencia que el que carga más lento
- El JavaScript tiene siempre un costo — su impacto puede reducirse pero no eliminarse
- La percepción del usuario importa más que las métricas de laboratorio
- Los estándares web tienden a crecer en eficiencia, no a retroceder

### La evolución técnica a observar

*View Transitions API:* La API nativa del navegador para transiciones de página. Actualmente en stage experimental — en 2027 es probable que sea el estándar para las transiciones que hoy se implementan con JavaScript. El plan es migrar cuando la adoption de navegadores supere el 80%.

*Container Queries:* Ya disponibles en todos los navegadores modernos. Permiten queries de CSS basados en el tamaño del contenedor, no del viewport — más precisas y menos JavaScript necesario para layouts responsivos complejos.

*HTTP/3 universalización:* HTTP/3 ya está disponible en la mayoría de los navegadores y CDNs. En el horizonte de cinco años, será el protocolo universal y los beneficios de latencia reducida llegarán a todos los visitantes sin configuración adicional.

*Módulos de WebAssembly:* Para cálculos intensivos (como el vector similarity search para recomendaciones de contenido), WebAssembly puede proveer el rendimiento de C/C++ en el navegador. Relevante para las Fases 2 y 3 del roadmap de IA.

### El proceso de evaluación de nuevas tecnologías

Antes de adoptar cualquier nueva tecnología de rendimiento:

1. ¿Está disponible sin prefix en los 4 motores principales (V8, SpiderMonkey, JavaScriptCore, Blink)?
2. ¿Tiene soporte en más del 85% de los navegadores según caniuse.com?
3. ¿El costo de adopción (cambio de código, riesgo de regresiones) está justificado por el beneficio demostrado?
4. ¿Hay un path de degradación graceful para los navegadores que no la soportan?

Si la respuesta a las cuatro preguntas es sí, la tecnología entra en el roadmap de adopción con una fecha estimada.

### El compromiso de rendimiento permanente

El rendimiento no es un estado que se alcanza — es una práctica que se mantiene. La arquitectura de esta plataforma está diseñada para que el rendimiento sea una consecuencia estructural de las decisiones técnicas, no una optimización que requiere esfuerzo constante. Pero ese diseño requiere ser defendido activamente contra la entropía natural de los sistemas de software: la tendencia a acumular dependencias, código no usado, y decisiones que tenían sentido en su contexto pero que perdieron relevancia.

La gobernanza trimestral, los gates de CI, los presupuestos explícitos y la filosofía de "complejidad como deuda" son los instrumentos que mantienen ese compromiso activo a lo largo del tiempo. El rendimiento es parte de la marca. Y las marcas de largo plazo requieren trabajo de largo plazo para mantenerse.

---

*Documento parte de la arquitectura estratégica de neilmeza.com. Leer en conjunto con `12_TECHNICAL_ARCHITECTURE.md` y `08_DESIGN_SYSTEM.md`. El rendimiento, la arquitectura y el diseño son dimensiones inseparables de la misma decisión: construir una plataforma que funcione tan bien como promete.*
