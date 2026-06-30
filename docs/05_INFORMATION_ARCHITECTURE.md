# 05 — ARQUITECTURA DE INFORMACIÓN
## La Estructura Completa del Sitio y la Lógica que la Sustenta

*Este documento traduce la narrativa de los documentos anteriores en una arquitectura concreta de sitio web. Cada decisión estructural tiene una razón estratégica. Nada es arbitrario.*

---

## I. LOS PRINCIPIOS DE ARQUITECTURA

Antes de definir cualquier página o sección, estos principios deben guiar todas las decisiones estructurales. Cuando haya duda, se vuelve a ellos.

**El sitio es un argumento, no un menú.** Un menú ofrece opciones y deja que el visitante elija su propio camino. Un argumento tiene una secuencia que construye comprensión progresiva. Esta plataforma está diseñada como lo segundo: cada sección prepara al visitante para la siguiente. Quien la recorre completa llega a la invitación final habiendo pasado por la tesis, la prueba y la profundidad.

**Cada página tiene un único objetivo.** No existe una página que intente hacer varias cosas al mismo tiempo. El homepage no presenta a Neil Y muestra proyectos Y explica sus servicios. El homepage hace una sola cosa: establecer la tesis y generar el impulso de seguir. La fragmentación de objetivos produce fragmentación de atención.

**La fricción se diseña, no se elimina.** El objetivo no es que cualquier persona pueda llegar a cualquier lugar en un clic. El objetivo es que las personas correctas lleguen a los lugares correctos habiendo recorrido el camino que produce el estado mental adecuado para esa conversación. Un rector universitario que llega a la sección de contacto habiendo leído el caso de la UCN está en un estado de comprensión completamente distinto al que llega directamente desde Google.

**La escasez es un valor de diseño.** Menos páginas, menos secciones, menos elementos. Cada cosa que aparece en el sitio debe justificarse con una razón estratégica. Lo que no suma, no va.

**La arquitectura refleja la marca.** Un sitio cuya tesis es que la infraestructura invisible hace posible lo que parece imposible debe tener una arquitectura donde la complejidad del trabajo aparezca sin complejidad visual. La sofisticación es interna; la superficie es limpia.

---

## II. EL MAPA COMPLETO DEL SITIO

```
neilmeza.com
│
├── / (Home)
│   ├── Hero — La tesis en una imagen y una frase
│   ├── El argumento — Infraestructura colaborativa
│   ├── El trabajo — Tres casos seleccionados
│   ├── El pensamiento — Dos perspectivas destacadas
│   ├── La persona — Quién es y de dónde viene
│   └── La invitación — CTA principal
│
├── /trabajo (Trabajo)
│   ├── Índice de ecosistemas — Vista general
│   ├── /trabajo/global-youth-summit
│   ├── /trabajo/tedxantofagasta
│   ├── /trabajo/ucn
│   ├── /trabajo/shinsekai
│   └── /trabajo/kaizen-academy
│
├── /pensamiento (Pensamiento)
│   ├── Índice de ensayos y perspectivas
│   └── /pensamiento/[slug] — Cada pieza de contenido
│
├── /sobre (Sobre Neil)
│   ├── La historia
│   ├── La tesis
│   ├── La trayectoria
│   └── El origen — Antofagasta
│
└── /construyamos (Construyamos)
    ├── Qué tipo de colaboración
    ├── Con quiénes trabaja Neil
    └── Formulario de contacto estratégico
```

**Lo que no existe y por qué:**

No existe una página de "Servicios": comunicaría que Neil es un proveedor de servicios, no un socio estratégico. La plataforma invita a co-construir ecosistemas, no a contratar entregables.

No existe un "Blog": la palabra connota publicación casual y frecuente. El contenido de esta plataforma es denso, espaciado y de largo plazo. "Pensamiento" comunica esa diferencia.

No existe una página de "Currículum" ni "Habilidades": la trayectoria se comunica a través de los casos de estudio, no a través de una lista de competencias.

No existe una página de "Testimonios": el tipo de colaboración que esta plataforma promueve no se valida con testimonios — se valida con los ecosistemas documentados.

---

## III. LA NAVEGACIÓN

### Estructura principal

```
[neilmeza.com]          Trabajo · Pensamiento · Sobre Neil          [Construyamos →]
```

Cinco elementos. Logo a la izquierda. Tres links al centro. Un botón de CTA a la derecha. Sin dropdowns. Sin hamburger en desktop. En móvil, menú lateral limpio.

El botón "Construyamos" está siempre visible porque es el objetivo final de la plataforma. Pero su peso visual es moderado — no agresivo. El visitante debe llegar a él habiendo recorrido el argumento, no antes.

### Comportamiento de la navegación

La barra de navegación es transparente sobre el hero del homepage y se vuelve sólida al hacer scroll. Es fija — siempre visible — para que el visitante pueda navegar desde cualquier punto sin perder el acceso a las secciones principales. En las páginas internas, el fondo de la barra es el color de superficie de la página.

El link activo en la navegación tiene un indicador sutil — no un subrayado grueso ni un cambio de color dramático. Suficiente para la orientación, invisible como elemento decorativo.

### Navegación secundaria

No existe en la mayoría de las páginas. En la sección de Trabajo, una navegación interna lateral (visible en desktop, oculta en móvil) permite saltar entre casos de estudio. En Pensamiento, un índice de entradas al inicio de la página.

---

## IV. LAS PÁGINAS Y SUS OBJETIVOS

### HOME — La tesis en movimiento

**Objetivo único:** Que el visitante entienda en los primeros treinta segundos que está ante algo distinto, y que quiera seguir.

El homepage es una experiencia de scroll único — no hay secciones que parezcan páginas separadas. El contenido fluye de manera continua, con transiciones que comunican continuidad narrativa.

**Bloque 1 — Hero**
Ocupa el 100% de la pantalla inicial. Una frase. Un concepto. Sin foto de perfil prominente, sin párrafo de bienvenida. La frase de apertura no explica — afirma. El visitante debe sentir que llegó a algo que tiene una posición intelectual clara.

Debajo de la frase, un subtítulo breve que sitúa el concepto: qué es la infraestructura colaborativa en una sola línea. Y un indicador de scroll — no un botón de "saber más".

**Bloque 2 — El argumento**
Tres a cuatro párrafos cortos que desarrollan la tesis. No una presentación de Neil — una proposición sobre cómo funciona la innovación y por qué falla. El visitante debe terminar este bloque pensando "esto es verdad, y nadie lo había dicho de esta manera". Neil aparece aquí como el constructor de la tesis, no como su autor declarado.

**Bloque 3 — El trabajo**
Tres casos de estudio seleccionados, presentados de manera que comuniquen escala y profundidad sin entrar en detalle. No son cards con foto + título + descripción. Son fragmentos de la historia de cada ecosistema — una imagen textural, una frase que captura lo que cambió, un link para quien quiera saber más.

**Bloque 4 — El pensamiento**
Dos perspectivas o ensayos destacados. Titulares fuertes. Un párrafo inicial. Un link para leer completo. Comunican que hay sustancia intelectual detrás de la práctica.

**Bloque 5 — La persona**
Un párrafo sobre Neil y Antofagasta. No una bio — una declaración de origen y propósito. Termina con un link a "Sobre Neil" para quien quiera el relato completo.

**Bloque 6 — La invitación**
El cierre del homepage es el CTA principal. No "contáctame" — una pregunta directa al lector: *¿Qué estás construyendo que requiere la infraestructura que aquí se describe?* Y un botón: "Hablemos".

---

### TRABAJO — La evidencia que sustenta la tesis

**Objetivo único:** Demostrar, con rigor y especificidad, que la infraestructura colaborativa ha sido construida en condiciones reales y ha producido resultados reales.

**Índice de ecosistemas**
No es una cuadrícula de proyectos con thumbnails. Es una lista curada con el nombre del ecosistema, una frase que captura su esencia, el territorio donde ocurrió y el rango temporal. El diseño comunica que estos son documentos de trabajo, no piezas de portafolio.

**Página individual de cada caso de estudio**
Cada caso es una página larga, inmersiva, que narra el ecosistema con la profundidad de un ensayo. Tiene:

- *El contexto:* qué existía antes, qué no existía, qué condiciones lo hacían difícil
- *Los actores:* quiénes eran y por qué no trabajaban juntos antes
- *La infraestructura construida:* qué hizo Neil específicamente — no en términos de tareas, sino en términos de las condiciones que diseñó
- *Lo que cambió:* resultados concretos, no solo logros declarados
- *Lo que permanece:* qué sigue funcionando sin la presencia directa de Neil

El tono no es el del informe de gestión ni el del portafolio creativo. Es el del ensayo que narra cómo algo que no existía llegó a existir.

Al final de cada caso, un enlace al siguiente caso y al ensayo de Pensamiento más relacionado con ese trabajo.

---

### PENSAMIENTO — La voz intelectual de la marca

**Objetivo único:** Establecer la profundidad del marco conceptual y crear razones para volver.

**Índice de perspectivas**
Una lista simple, ordenada inversamente por fecha. Título, subtítulo, fecha, tiempo estimado de lectura. Sin thumbnails, sin categorías en exceso. El diseño comunica que el contenido vale más que la presentación.

**Cada pieza de contenido**
Ensayos largos — mínimo 1.200 palabras. No posts de blog. No listas de consejos. Argumentos desarrollados sobre temas en la intersección de innovación, colaboración, territorio, tecnología y futuro de Chile y América Latina.

El formato tipográfico es generoso: columna de texto estrecha (65-70 caracteres por línea), interlineado amplio, sin sidebars, sin elementos que compitan con la lectura. La experiencia de leer en esta sección debe sentirse como leer en una publicación de calidad, no en un blog corporativo.

Al final de cada pieza: los casos de estudio relacionados y otras perspectivas que continúan la conversación.

---

### SOBRE NEIL — El origen de la convicción

**Objetivo único:** Que el visitante entienda de dónde viene la tesis, por qué Antofagasta importa y quién es la persona que construyó esto — sin que se sienta como un CV.

La página tiene una sola columna de texto con algunas imágenes contextuales. No hay timeline. No hay lista de logros. No hay foto de perfil corporativa al inicio.

Comienza con el origen: Antofagasta, la ciudad minera del desierto, la decisión de construir desde ahí. Luego la observación que incomoda — lo que Neil vio y que no encajaba con el relato dominante sobre la innovación. Luego la convicción — la tesis. Luego la trayectoria contada como la acumulación de evidencia de esa convicción: cada proyecto no como logro, sino como episodio de la prueba.

Termina con una declaración breve sobre lo que viene — la dirección de los próximos años — y un link a Construyamos.

**Una sección separada: La Tesis**
Un bloque visual que presenta el concepto de infraestructura colaborativa de manera aislada y clara. Una definición precisa. Las dos frases clave de la marca. Un elemento que el visitante pueda citar o compartir.

---

### CONSTRUYAMOS — La invitación específica

**Objetivo único:** Convertir el estado mental generado por el recorrido anterior en una conversación real con las personas correctas.

Esta página no es un formulario de contacto genérico. Está diseñada para filtrar y cualificar al mismo tiempo que invita.

**Bloque 1 — Con quiénes trabaja Neil**
Una descripción directa y honesta del tipo de alianzas que Neil construye. No una lista de servicios — una descripción de los tipos de desafíos y actores con los que trabaja. Quien lea esto debe poder identificarse o reconocer que este no es el espacio correcto para lo que busca.

**Bloque 2 — Qué no es esto**
Una línea o dos que aclaren qué tipo de conversación este espacio no produce: consultoría puntual con entregables en semanas, charlas de motivación, proyectos sin visión de largo plazo. No como rechazo — como claridad que ahorra tiempo a ambas partes.

**Bloque 3 — El formulario**
No tiene campos de "Nombre / Email / Mensaje". Tiene preguntas que obligan a pensar antes de enviar:

- *¿Qué estás tratando de construir?*
- *¿Qué actores necesitas conectar para que eso ocurra?*
- *¿Por qué no ha ocurrido todavía?*
- *¿Cómo encontraste esta plataforma?*

El formulario cualifica la conversación antes de que ocurra. Quienes lo completan con seriedad son exactamente el tipo de aliados que esta plataforma busca atraer.

---

## V. LOS RECORRIDOS DEL USUARIO

### Recorrido 1 — El líder universitario

Descubre a Neil por referencia directa de un colega → Llega al homepage → Lee el bloque del argumento, reconoce la tensión que vive en su institución → Navega a Trabajo, busca el caso UCN → Lee el caso completo → Va a Sobre Neil para entender al interlocutor → Llega a Construyamos con contexto suficiente para escribir una propuesta específica.

**Duración estimada de primera visita:** 15-25 minutos.
**Punto de conversión:** El formulario de Construyamos.

### Recorrido 2 — El periodista

Llega desde una búsqueda o referencia editorial → Landing en homepage → Lee el bloque del argumento, identifica el ángulo editorial → Va a Pensamiento para encontrar citas y perspectivas → Revisa el índice de Trabajo para verificar credenciales → Va a Sobre Neil para el material biográfico → Contacta con un ángulo específico de historia.

**Duración estimada:** 10-15 minutos.
**Punto de conversión:** El botón de Construyamos o el email directo visible en Sobre Neil.

### Recorrido 3 — El fundador o emprendedor

Llega desde redes sociales o un evento → Homepage → Se identifica con la tesis → Va a Sobre Neil, busca el punto de origen → Lee un ensayo en Pensamiento → Revisa el trabajo → Vuelve periódicamente a medida que publica nuevo contenido.

**Duración de primera visita:** 8-12 minutos.
**Comportamiento característico:** Múltiples visitas antes de contactar.
**Punto de conversión:** Formulario de Construyamos o suscripción al contenido (cuando exista).

### Recorrido 4 — La organización internacional

Llega por referencia de un socio → Homepage en modo evaluación rápida → Va directamente a Trabajo → Evalúa dos o tres casos → Revisa Sobre Neil → Va a Construyamos con una propuesta ya articulada.

**Duración estimada:** 20-30 minutos.
**Comportamiento característico:** Evaluación deliberada, no exploración. Busca verificar, no descubrir.
**Punto de conversión:** El formulario, con un mensaje detallado desde el inicio.

### Recorrido 5 — El socio estratégico potencial

Llega por múltiples vías a lo largo del tiempo → Lee ensayos en Pensamiento de manera recurrente → Sigue el trabajo que se documenta → Se convierte en lector habitual antes de contactar → Cuando contacta, trae una propuesta co-construida.

**Duración del ciclo:** Semanas o meses.
**Punto de conversión:** Contacto directo o respuesta a contenido que demuestra alineamiento intelectual.

---

## VI. LOS LLAMADOS A LA ACCIÓN

Esta plataforma tiene exactamente tres CTAs activos. No más. Cada uno tiene un nivel distinto de compromiso y un momento distinto en el recorrido.

**CTA Primario — "Construyamos juntos"**
Aparece en: la barra de navegación (siempre), el bloque de invitación del homepage, el final de Sobre Neil, el final de cada caso de estudio.
Objetivo: iniciar una conversación de colaboración.
Tono: invitación entre pares, no solicitud de servicio.

**CTA Secundario — "Conoce el trabajo"**
Aparece en: el bloque 3 del homepage, textos donde se menciona la evidencia.
Objetivo: llevar al visitante de la tesis a la prueba.
Tono: directo, sin presión.

**CTA Terciario — "Lee las ideas"**
Aparece en: el bloque 4 del homepage, final de páginas de casos de estudio.
Objetivo: llevar al visitante de la práctica a la profundidad intelectual.
Tono: una invitación a continuar la conversación.

**Lo que no existe:**
No hay CTA de newsletter en ningún lugar del homepage en el lanzamiento inicial. No hay pop-ups. No hay banners de cookies con diseño agresivo. No hay "sígueme en LinkedIn" prominente en el header. La plataforma no pide la atención del visitante — la gana.

---

## VII. LAS TRANSICIONES Y LA CONTINUIDAD NARRATIVA

La arquitectura narrativa establecida en `03_STORYTELLING.md` debe ser perceptible en la experiencia de navegación, no solo en el contenido.

**Dentro del homepage:**
Las transiciones entre bloques no son cortes abruptos. Hay un ritmo en el scroll — bloques que se revelan con suavidad, sin animaciones complejas que distraigan del contenido. El objetivo es que el visitante no sienta que "cambió de sección" sino que "el argumento continuó".

**Entre páginas:**
Las transiciones de página son rápidas y limpias. Sin loading screens elaboradas. La continuidad visual entre páginas — misma tipografía, misma paleta, mismo uso del espacio — comunica que el visitante sigue dentro de la misma experiencia, no que navegó a un sitio diferente.

**Los conectores narrativos:**
Al final de cada página (excepto Construyamos), hay un elemento de transición que lleva al siguiente paso lógico en el recorrido. No un menú de "Ver también" genérico — una sugerencia específica que emerge del contenido de esa página.

Ejemplo: Al final de la página del caso Global Youth Summit, el conector dice: *"Este proyecto hizo visible algo que Neil ha aplicado en cada ecosistema que ha construido. Lee cómo lo piensa."* → Link a Pensamiento.

---

## VIII. LAS RELACIONES ENTRE CONTENIDOS

El sitio no es una colección de páginas independientes. Es una red de contenidos con relaciones semánticas que se hacen visibles en la navegación.

**Casos de estudio ↔ Ensayos de Pensamiento**
Cada caso de estudio tiene al menos un ensayo de Pensamiento relacionado — la reflexión intelectual que ese caso generó. Y cada ensayo referencia los casos que le dan evidencia. Esta relación bidireccional es visible en la interfaz: al pie de cada caso, el ensayo relacionado; al pie de cada ensayo, los casos que lo sustentan.

**Sobre Neil ↔ Casos de estudio**
La narrativa de Sobre Neil hace referencia directa a los casos que prueban cada etapa de la historia. El visitante puede seguir los links y profundizar en la evidencia de cada momento que la historia menciona.

**Homepage ↔ Todo**
El homepage no es una puerta de entrada genérica — es un mapa del argumento completo, con links a los puntos más densos de cada sección. Quien quiera ir al nivel más profundo de cualquier dimensión puede hacerlo desde el homepage.

**El grafo de contenidos (visible para el equipo, invisible para el visitante):**

```
Homepage
    ↓ argumenta con →  Infraestructura Colaborativa (concepto en Sobre Neil)
    ↓ prueba con →     Trabajo (casos de estudio)
    ↓ profundiza con → Pensamiento (ensayos)
    ↓ narra con →      Sobre Neil (historia y origen)
    ↓ invita a →       Construyamos

Trabajo/[caso]
    → relacionado con → Pensamiento/[ensayo]
    → continúa con →   Trabajo/[caso siguiente]
    → converge en →    Construyamos

Pensamiento/[ensayo]
    → sustentado por → Trabajo/[caso]
    → profundiza →     Pensamiento/[ensayo relacionado]
    → converge en →    Construyamos
```

---

## IX. ESCALABILIDAD FUTURA

La arquitectura está diseñada para crecer sin necesidad de rediseño estructural. Las extensiones naturales del sitio, cuando el proyecto lo requiera, son:

**Comunidad** — Una sección `/comunidad` que reúna a los actores de los ecosistemas que Neil ha construido y a quienes quieren participar en los que está construyendo. No una red social — un espacio curado con acceso controlado.

**Programa** — Una sección `/programa` si Neil desarrolla ofertas educativas o de mentoría estructurada. Separada del resto del sitio en tono y objetivo, pero conectada en identidad visual y narrativa.

**Versión en inglés** — La arquitectura actual soporta internacionalización sin cambio estructural. Cada URL en español tiene un equivalente en inglés (`/en/work`, `/en/thinking`, etc.). El switch de idioma aparece en la navegación cuando la versión en inglés esté disponible.

**Publicaciones largas / Informes** — El sistema de Pensamiento puede albergar documentos más extensos — informes, papers, publicaciones de investigación — sin requerir una nueva sección. Se distinguen tipológicamente dentro del mismo índice.

**Newsletter** — Cuando el volumen de contenido lo justifique, un sistema de suscripción se integra en la sección de Pensamiento y al final de cada pieza de contenido. No en el homepage — quien llegue al homepage ya debería querer algo más que un newsletter.

**Prensa / Press Kit** — Una página `/prensa` con materiales para medios: bio oficial, fotos de alta resolución, casos documentados, datos de contacto para periodistas. Vinculada desde el footer pero no desde la navegación principal.

---

## X. LO QUE ESTE SITIO NO TIENE EN SU LANZAMIENTO

La claridad sobre lo que se excluye en el lanzamiento inicial es tan importante como lo que se incluye.

No tiene contador de seguidores ni métricas de visitas visibles. No tiene integración de redes sociales prominente en el header o footer. No tiene chatbot ni asistente virtual. No tiene sección de "Preguntas frecuentes". No tiene página de precios. No tiene testimoniales en slider. No tiene video de introducción auto-play.

Todo lo que no está es una decisión, no una omisión. Lo que el sitio tiene debe ser tan bueno que lo que le falta no se eche de menos.

---

*Documento parte de la arquitectura estratégica de neilmeza.com. Leer en conjunto con `03_STORYTELLING.md` y `04_AUDIENCES.md`. Alimenta directamente `06_USER_EXPERIENCE.md`, `07_VISUAL_IDENTITY.md`, `10_COPYWRITING.md` y `11_CASE_STUDIES.md`.*
