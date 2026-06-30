# 08 — DESIGN SYSTEM
## El Sistema de Diseño de la Plataforma: De los Principios a la Implementación

*Este documento traduce todo lo establecido en `06_USER_EXPERIENCE.md` y `07_VISUAL_IDENTITY.md` en especificaciones técnicas concretas. Está escrito para que un equipo senior de diseño y desarrollo pueda construir la plataforma directamente desde él, sin necesidad de interpretar o inferir decisiones no documentadas.*

---

## I. LOS PRINCIPIOS DEL SISTEMA

Un design system no es una biblioteca de componentes. Es la codificación de una serie de decisiones — sobre valores, sobre jerarquías, sobre comportamientos — en estructuras reutilizables que hacen imposible construir algo inconsistente con la marca.

Este sistema tiene tres capas:

**La capa de tokens** — Los valores atómicos del sistema. No existen componentes ni decisiones de diseño que no estén expresadas, en última instancia, como una combinación de tokens. Cualquier cambio en un token primitivo se propaga automáticamente a todo lo que lo referencia.

**La capa de componentes** — Las piezas de interfaz construidas enteramente a partir de tokens. Ningún componente tiene valores codificados directamente (hardcoded). Un botón primario no tiene `color: #A0522D` — tiene `color: var(--color-accent)`. Esa decisión hace el sistema mantenible a diez años.

**La capa de patrones** — Las composiciones de componentes que resuelven problemas de UX recurrentes: un bloque de caso de estudio, un formulario completo, una sección de homepage. Los patrones documentan no solo cómo se ven, sino cuándo y por qué se usan.

**Lo que este sistema no hace:**
No intenta predecir todos los estados posibles de todos los componentes. No codifica reglas para componentes que no existen todavía. No añade abstracciones antes de que sean necesarias. El sistema crece con el producto.

---

## II. ARQUITECTURA DE TOKENS

Los tokens tienen tres niveles de abstracción. Este modelo, derivado del estándar de W3C Design Tokens, es el que usa Linear, Stripe y otros referentes del sistema:

```
Nivel 1 — Tokens Primitivos
  └── Valores crudos. No tienen semántica de uso.
      color-stone-0: #F9F8F6
      color-stone-900: #1C1917
      space-4: 4px

Nivel 2 — Tokens Semánticos
  └── Comunican USO, no valor. Mapean a primitivos.
      color-background: → color-stone-0
      color-text-primary: → color-stone-950
      space-section-gap: → space-96

Nivel 3 — Tokens de Componente
  └── Específicos de un componente. Mapean a semánticos.
      button-primary-background: → color-accent
      button-primary-text: → color-text-inverse
      nav-link-color: → color-text-secondary
```

**Por qué tres niveles:**
Si el token de acento cambia (el cobre pasa de un tono a otro), el cambio se hace en UN lugar (el primitivo). El token semántico `color-accent` sigue apuntando al mismo nombre primitivo. Todos los componentes que usan `--color-accent` se actualizan sin tocar una sola línea de CSS de componente. Eso es un sistema — no una hoja de estilos organizada.

---

## III. TOKENS PRIMITIVOS DE COLOR

```css
/* ─── ESCALA DE BLANCOS Y SUPERFICIES ─── */
--primitive-stone-0:   #F9F8F6;  /* Fondo principal — blanco cálido */
--primitive-stone-50:  #F2F1EE;  /* Fondo de superficies elevadas */
--primitive-stone-100: #E7E5E4;  /* Bordes sutiles */
--primitive-stone-200: #D6D3D1;  /* Bordes default */
--primitive-stone-300: #C2BEBC;  /* Bordes enfatizados */

/* ─── ESCALA DE GRISES MEDIOS ─── */
--primitive-stone-400: #A8A29E;  /* Texto terciario / metadatos */
--primitive-stone-500: #87837F;  /* Texto secundario enfatizado */
--primitive-stone-600: #57534E;  /* Texto secundario */
--primitive-stone-700: #44403C;  /* Texto secundario oscuro */

/* ─── ESCALA DE NEGROS ─── */
--primitive-stone-800: #292524;  /* Texto primario claro */
--primitive-stone-900: #1C1917;  /* Superficie inversa */
--primitive-stone-950: #0E0D0C;  /* Texto primario */

/* ─── ESCALA DE ACENTO — COBRE CÁLIDO ─── */
--primitive-copper-50:  #F8EDE7;  /* Tint muy claro para fondos de acento */
--primitive-copper-100: #F0D4C4;  /* Tint claro */
--primitive-copper-200: #DCA98C;  /* Tint medio */
--primitive-copper-500: #A0522D;  /* Acento principal */
--primitive-copper-600: #8A4726;  /* Acento hover */
--primitive-copper-700: #6D381D;  /* Acento pressed */
--primitive-copper-900: #3A1D0E;  /* Acento muy oscuro */
```

---

## IV. TOKENS SEMÁNTICOS

```css
/* ─── FONDOS ─── */
--color-background:         var(--primitive-stone-0);
--color-background-subtle:  var(--primitive-stone-50);
--color-background-inverse: var(--primitive-stone-900);
--color-background-accent:  var(--primitive-copper-50);

/* ─── TEXTOS ─── */
--color-text-primary:    var(--primitive-stone-950);
--color-text-secondary:  var(--primitive-stone-600);
--color-text-tertiary:   var(--primitive-stone-400);
--color-text-disabled:   var(--primitive-stone-300);
--color-text-inverse:    var(--primitive-stone-0);
--color-text-accent:     var(--primitive-copper-500);

/* ─── BORDES ─── */
--color-border-subtle:   var(--primitive-stone-100);
--color-border-default:  var(--primitive-stone-200);
--color-border-strong:   var(--primitive-stone-400);
--color-border-accent:   var(--primitive-copper-200);

/* ─── ACENTO ─── */
--color-accent:          var(--primitive-copper-500);
--color-accent-hover:    var(--primitive-copper-600);
--color-accent-active:   var(--primitive-copper-700);
--color-accent-subtle:   var(--primitive-copper-50);

/* ─── FOCO Y ESTADOS ─── */
--color-focus-ring:      var(--primitive-copper-500);
--color-focus-ring-offset: var(--primitive-stone-0);

/* ─── FEEDBACK ─── */
--color-success:   #2D6A4F;   /* Verde neutral, no vibrante */
--color-error:     #9B2C2C;   /* Rojo oscuro, no alarmante */
--color-warning:   #92400E;   /* Ámbar oscuro */
```

---

## V. TOKENS TIPOGRÁFICOS

```css
/* ─── FAMILIAS ─── */
--font-sans:   'Söhne', 'Neue Haas Grotesk', system-ui, sans-serif;
--font-serif:  'Tiempos Text', 'Georgia', serif;
--font-mono:   'JetBrains Mono', 'Fira Code', monospace;

/* ─── ESCALA DE TAMAÑOS ─── */
--font-size-xs:      0.75rem;    /* 12px */
--font-size-sm:      0.875rem;   /* 14px */
--font-size-base:    1rem;       /* 16px */
--font-size-essay:   1.125rem;   /* 18px */
--font-size-md:      1.3125rem;  /* 21px */
--font-size-lg:      1.75rem;    /* 28px */
--font-size-xl:      2.3125rem;  /* 37px */
--font-size-2xl:     3.125rem;   /* 50px */
--font-size-3xl:     4.1875rem;  /* 67px */
--font-size-display: clamp(4rem, 6vw, 6rem); /* 64–96px, fluido */

/* ─── PESOS ─── */
--font-weight-light:    300;
--font-weight-regular:  400;
--font-weight-medium:   500;
--font-weight-semibold: 600;
--font-weight-bold:     700;

/* ─── INTERLINEADO ─── */
--leading-none:     1;
--leading-tight:    1.05;    /* Display, titulares grandes */
--leading-snug:     1.2;     /* H1, H2 */
--leading-normal:   1.3;     /* H3, H4 */
--leading-relaxed:  1.65;    /* Cuerpo sans-serif */
--leading-loose:    1.75;    /* Cuerpo serif (ensayos) */

/* ─── TRACKING ─── */
--tracking-tight:   -0.025em;  /* Display y headings grandes */
--tracking-normal:   0em;      /* Cuerpo */
--tracking-wide:     0.04em;   /* Labels, metadatos */
--tracking-widest:   0.1em;    /* Uppercase labels */

/* ─── MEDIDA DE LÍNEA (column width) ─── */
--measure-narrow:  52ch;  /* Ensayos, lectura intensa */
--measure-default: 68ch;  /* Cuerpo de texto estándar */
--measure-wide:    85ch;  /* Introducciones, texto de apoyo */
```

---

## VI. ESCALA DE ESPACIADO

```css
/* ─── PRIMITIVOS ─── */
--space-0:   0;
--space-px:  1px;
--space-1:   0.25rem;   /* 4px  */
--space-2:   0.5rem;    /* 8px  */
--space-3:   0.75rem;   /* 12px */
--space-4:   1rem;      /* 16px */
--space-6:   1.5rem;    /* 24px */
--space-8:   2rem;      /* 32px */
--space-12:  3rem;      /* 48px */
--space-16:  4rem;      /* 64px */
--space-24:  6rem;      /* 96px */
--space-32:  8rem;      /* 128px */
--space-48:  12rem;     /* 192px */

/* ─── SEMÁNTICOS ─── */
--space-component-xs:   var(--space-2);   /* Padding interno de UI pequeña */
--space-component-sm:   var(--space-3);   /* Padding interno de UI estándar */
--space-component-md:   var(--space-4);   /* Padding interno de UI media */
--space-component-lg:   var(--space-6);   /* Padding interno de UI grande */

--space-section-gap:    var(--space-24);  /* Entre secciones del homepage */
--space-block-gap:      var(--space-16);  /* Entre bloques de contenido */
--space-element-gap:    var(--space-8);   /* Entre elementos dentro de un bloque */
--space-inline-gap:     var(--space-4);   /* Entre elementos inline */

--space-page-margin-sm: var(--space-4);   /* Margen lateral en móvil */
--space-page-margin-md: var(--space-8);   /* Margen lateral en tablet */
--space-page-margin-lg: var(--space-16);  /* Margen lateral en desktop */
```

---

## VII. TOKENS DE LAYOUT Y RETÍCULA

```css
/* ─── ANCHOS MÁXIMOS ─── */
--max-width-content:  75rem;    /* 1200px — contenedor principal */
--max-width-text:     45rem;    /* 720px — texto de sección */
--max-width-essay:    40rem;    /* 640px — columna de ensayo */
--max-width-narrow:   30rem;    /* 480px — componentes estrechos */

/* ─── PUNTOS DE QUIEBRE ─── */
--breakpoint-sm:  40rem;    /* 640px  */
--breakpoint-md:  48rem;    /* 768px  */
--breakpoint-lg:  64rem;    /* 1024px */
--breakpoint-xl:  80rem;    /* 1280px */
--breakpoint-2xl: 90rem;    /* 1440px */

/* ─── RETÍCULA ─── */
--grid-columns: 12;
--grid-gutter:  var(--space-6);   /* 24px */
--grid-gutter-lg: var(--space-8); /* 32px en desktop */
```

---

## VIII. TOKENS DE MOVIMIENTO

```css
/* ─── DURACIONES ─── */
--duration-instant:  100ms;   /* Microinteracciones imperceptibles */
--duration-fast:     150ms;   /* Hover states de color */
--duration-base:     200ms;   /* Transición estándar de UI */
--duration-enter:    200ms;   /* Elemento entrando a la vista */
--duration-exit:     150ms;   /* Elemento saliendo — ligeramente más rápido */
--duration-page:     180ms;   /* Transición entre páginas */
--duration-slow:     300ms;   /* Elementos de mayor peso visual */

/* ─── CURVAS ─── */
--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1.0);  /* Estándar para entradas */
--ease-in:     cubic-bezier(0.4, 0.0, 1.0, 1.0);  /* Estándar para salidas */
--ease-inout:  cubic-bezier(0.4, 0.0, 0.2, 1.0);  /* Para transiciones simétricas */

/* ─── TRANSFORMACIONES DE ENTRADA ─── */
--enter-translate-y: 8px;     /* Desplazamiento vertical de entrada */
--enter-opacity-start: 0;
--enter-opacity-end: 1;
```

---

## IX. TOKENS DE RADIO Y BORDE

```css
/* ─── RADIO ─── */
--radius-none:  0;
--radius-sm:    2px;
--radius-base:  4px;    /* Componentes estándar — botones, inputs */
--radius-md:    6px;    /* Cards */
--radius-lg:    8px;    /* Elementos de mayor superficie */
--radius-full:  9999px; /* Pills, badges */

/* ─── GROSOR DE BORDE ─── */
--border-width-thin:    1px;   /* Default para todos los bordes */
--border-width-medium:  1.5px; /* Bordes de énfasis */
--border-width-thick:   2px;   /* Focus rings */

/* ─── SOMBRAS ─── */
/* Las sombras son mínimas — el diseño no usa profundidad Z para jerarquía */
--shadow-sm:   0 1px 2px 0 rgba(14, 13, 12, 0.05);
--shadow-base: 0 1px 3px 0 rgba(14, 13, 12, 0.08),
               0 1px 2px -1px rgba(14, 13, 12, 0.05);
--shadow-none: none;
```

---

## X. BIBLIOTECA DE COMPONENTES — BOTONES

Los botones de esta plataforma tienen exactamente tres variantes. No más.

### Botón Primario — Acción principal

El botón primario es el CTA de la plataforma. Se usa para las acciones más importantes: "Construyamos juntos", "Empecemos". Existe uno por vista — no dos.

```css
.btn-primary {
  /* Estructura */
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);

  /* Tipografía */
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-wide);
  white-space: nowrap;

  /* Visual */
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  border: var(--border-width-thin) solid transparent;
  border-radius: var(--radius-base);

  /* Transición */
  transition:
    background-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);

  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
}

.btn-primary:active {
  background-color: var(--color-accent-active);
  transform: translateY(1px);
}

.btn-primary:focus-visible {
  outline: var(--border-width-thick) solid var(--color-focus-ring);
  outline-offset: 3px;
}

.btn-primary:disabled {
  background-color: var(--color-border-default);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
  pointer-events: none;
}
```

### Botón Secundario — Acción complementaria

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);

  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-wide);

  background-color: transparent;
  color: var(--color-text-primary);
  border: var(--border-width-thin) solid var(--color-border-default);
  border-radius: var(--radius-base);

  transition:
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);

  cursor: pointer;
}

.btn-secondary:hover {
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
}

.btn-secondary:focus-visible {
  outline: var(--border-width-thick) solid var(--color-focus-ring);
  outline-offset: 3px;
}
```

### Botón Ghost — Navegación textual y CTAs de baja jerarquía

```css
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) 0;

  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-normal);

  background-color: transparent;
  color: var(--color-text-secondary);
  border: none;

  /* El subrayado reemplaza al borde */
  border-bottom: var(--border-width-thin) solid transparent;

  transition:
    color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);

  cursor: pointer;
}

.btn-ghost:hover {
  color: var(--color-text-primary);
  border-bottom-color: var(--color-border-default);
}

.btn-ghost:focus-visible {
  outline: var(--border-width-thick) solid var(--color-focus-ring);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
```

**Regla de uso:**
- `btn-primary`: Máximo uno visible en cada viewport. El CTA de mayor peso.
- `btn-secondary`: Para acciones complementarias que el visitante puede querer pero no son el objetivo principal del paso actual.
- `btn-ghost`: Para navegación textual (Ver más, Leer ensayo), links de baja jerarquía.

---

## XI. BIBLIOTECA DE COMPONENTES — FORMULARIOS

El formulario de Construyamos es el componente más crítico de la plataforma. La experiencia de llenarlo define si la primera conversación posible ocurre o no.

### Input de texto

```css
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
}

/* Cuando el campo está activo, el label gana peso */
.form-field:focus-within .form-label {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  transition: color var(--duration-base) var(--ease-out),
              font-weight var(--duration-base) var(--ease-out);
}

.form-question {
  font-family: var(--font-sans);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-light);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-3);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: var(--space-3) var(--space-4);

  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
  line-height: var(--leading-relaxed);

  background-color: var(--color-background);
  border: var(--border-width-thin) solid var(--color-border-default);
  border-radius: var(--radius-base);

  transition:
    border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);

  -webkit-appearance: none;
  appearance: none;
}

.form-input:hover,
.form-textarea:hover {
  border-color: var(--color-border-strong);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-subtle);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* Estado de error */
.form-input[aria-invalid="true"],
.form-textarea[aria-invalid="true"] {
  border-color: var(--color-error);
}

.form-error-message {
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin-top: var(--space-1);
}

/* Placeholder */
.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-light);
}
```

### Comportamiento del formulario de Construyamos

En móvil, las preguntas del formulario se presentan de una en una (flujo secuencial). En desktop, todas las preguntas son visibles simultáneamente pero con énfasis visual en la pregunta activa: las inactivas tienen opacity 0.5 y font-size ligeramente reducido.

```css
/* Desktop: campo activo vs inactivos */
.form-field {
  transition: opacity var(--duration-base) var(--ease-out);
}

.form-field.is-inactive {
  opacity: 0.45;
}

.form-field:focus-within {
  opacity: 1;
}
```

---

## XII. BIBLIOTECA DE COMPONENTES — TARJETAS

Las tarjetas de esta plataforma no tienen la estética de las tarjetas tradicionales (sombra pronunciada, elevación visual, imagen de cabecera). Son fragmentos de contenido en el continuo del sitio — delimitados, no enmarcados.

### Tarjeta de Caso de Estudio (homepage)

```css
.card-case-study {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  padding: var(--space-8) 0;
  border-top: var(--border-width-thin) solid var(--color-border-subtle);

  /* Sin fondo, sin sombra — el separador es suficiente */
}

.card-case-study__tag {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.card-case-study__title {
  font-family: var(--font-sans);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
}

/* La frase clave aparece al hacer hover — oculta por defecto */
.card-case-study__excerpt {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--duration-slow) var(--ease-out),
              opacity var(--duration-slow) var(--ease-out);
  opacity: 0;
}

.card-case-study:hover .card-case-study__excerpt {
  max-height: 100px;
  opacity: 1;
}

.card-case-study__link {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-accent);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
```

### Tarjeta de Ensayo (Pensamiento)

```css
.card-essay {
  padding: var(--space-8) 0;
  border-top: var(--border-width-thin) solid var(--color-border-subtle);
  display: grid;
  gap: var(--space-3);
}

.card-essay__meta {
  display: flex;
  gap: var(--space-4);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  letter-spacing: var(--tracking-wide);
}

.card-essay__title {
  font-family: var(--font-sans);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  transition: color var(--duration-fast) var(--ease-out);
}

.card-essay:hover .card-essay__title {
  color: var(--color-text-accent);
}

.card-essay__intro {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  max-width: var(--measure-default);
}
```

---

## XIII. BIBLIOTECA DE COMPONENTES — NAVEGACIÓN

### Desktop

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-4) var(--space-page-margin-lg);
  max-width: var(--max-width-content);
  margin-inline: auto;

  /* Transición de transparente a opaco con el scroll */
  background-color: transparent;
  transition: background-color var(--duration-base) var(--ease-out),
              backdrop-filter var(--duration-base) var(--ease-out);
}

.nav.is-scrolled {
  background-color: rgba(249, 248, 246, 0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: var(--border-width-thin) solid var(--color-border-subtle);
}

.nav__logo {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-decoration: none;
  letter-spacing: var(--tracking-wide);
}

.nav__links {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__link {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  text-decoration: none;
  letter-spacing: var(--tracking-wide);
  transition: color var(--duration-fast) var(--ease-out);
  position: relative;
  padding-bottom: 2px;
}

.nav__link:hover {
  color: var(--color-text-primary);
}

/* Indicador de link activo: línea inferior precisa */
.nav__link[aria-current="page"] {
  color: var(--color-text-primary);
}

.nav__link[aria-current="page"]::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--color-text-primary);
}

.nav__cta {
  /* Hereda de .btn-primary con variante compacta */
  padding: var(--space-2) var(--space-4);
}
```

### Móvil

```css
@media (max-width: 768px) {
  .nav__links {
    display: none;  /* Oculto — reemplazado por el drawer */
  }

  .nav__mobile-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text-primary);
  }
}

/* Drawer móvil — emerge desde abajo */
.nav-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;

  background-color: var(--color-background);
  border-top: var(--border-width-thin) solid var(--color-border-subtle);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;

  padding: var(--space-8) var(--space-6) var(--space-12);

  /* Animación de entrada desde abajo */
  transform: translateY(100%);
  transition: transform var(--duration-base) var(--ease-out);
}

.nav-drawer.is-open {
  transform: translateY(0);
}

.nav-drawer__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-drawer__link {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-decoration: none;
  letter-spacing: var(--tracking-tight);
}
```

---

## XIV. JERARQUÍA TIPOGRÁFICA APLICADA

```css
/* ─── DISPLAY — Homepage hero ─── */
.text-display {
  font-family: var(--font-sans);
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
}

/* ─── H1 — Títulos de página ─── */
.text-h1 {
  font-family: var(--font-sans);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
}

/* ─── H2 — Títulos de sección ─── */
.text-h2 {
  font-family: var(--font-sans);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
}

/* ─── H3 ─── */
.text-h3 {
  font-family: var(--font-sans);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-normal);
  color: var(--color-text-primary);
}

/* ─── Body — Texto de secciones generales ─── */
.text-body {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  max-width: var(--measure-default);
}

/* ─── Essay — Texto de ensayos en Pensamiento ─── */
.text-essay {
  font-family: var(--font-serif);
  font-size: var(--font-size-essay);
  font-weight: var(--font-weight-regular);
  line-height: var(--leading-loose);
  color: var(--color-text-primary);
  max-width: var(--measure-narrow);
}

/* ─── Lead — Párrafo introductorio ─── */
.text-lead {
  font-family: var(--font-sans);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-light);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  max-width: var(--measure-wide);
}

/* ─── Caption / Label — Metadatos ─── */
.text-caption {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}
```

---

## XV. ESTADOS DE INTERACCIÓN — ESPECIFICACIÓN COMPLETA

Cada componente interactivo tiene exactamente cinco estados posibles. Todos deben estar diseñados antes de que el componente se considere completo.

| Estado | Cuándo | Qué comunica | Señal visual |
|---|---|---|---|
| **Default** | Sin interacción | Estado de reposo | Color base, sin énfasis adicional |
| **Hover** | Cursor sobre el elemento | "Esto es interactivo" | Cambio de color de 150ms, ease-out |
| **Active / Pressed** | Durante el click/tap | "Estoy respondiendo" | Ligero desplazamiento Y+1px, color más oscuro |
| **Focus** | Navegación por teclado | "Estoy aquí" | Outline de 2px en color acento, offset 3px |
| **Disabled** | No disponible | "No puedes hacer esto ahora" | Opacity 0.4, cursor not-allowed |

**Regla crítica de focus:** El estado focus-visible nunca se oculta. No existe `.btn:focus { outline: none }` sin un reemplazo diseñado. El estado de focus es parte del diseño — no un bug que se suprime.

---

## XVI. COMPORTAMIENTO RESPONSIVO

### El contenido primero, el layout después

En el modelo responsivo de esta plataforma, el orden de prioridad es: el contenido nunca se trunca ni se esconde en ningún breakpoint. El layout se adapta; el contenido permanece.

### Breakpoints y comportamientos

**< 640px (móvil pequeño)**
- Una columna para todo el contenido
- Tipografía display reducida: `clamp(2.5rem, 8vw, 3.5rem)`
- Navegación: solo logo + trigger para drawer
- Formulario: preguntas secuenciales
- Imágenes: full-width, aspect-ratio fijo

**640px – 1024px (tablet y móvil grande)**
- Una columna dominante, con dos columnas para secciones de lista
- Tipografía display: `clamp(3rem, 6vw, 4rem)`
- Navegación: logo + links abreviados + CTA
- Formulario: todas las preguntas visibles en scroll

**1024px – 1280px (desktop estándar)**
- Retícula de 12 columnas activa
- Contenido en 8/12 (texto), 10/12 (casos), 6/12 (ensayos)
- Navegación: completa
- El texto display alcanza su tamaño máximo

**> 1280px (pantallas grandes)**
- El contenido permanece en `max-width: 1200px`, centrado
- El fondo se extiende pero el contenido no
- Márgenes laterales amplios comunican que el espacio es intencional

### El texto fluido

Los titulares principales usan `clamp()` para escalar de manera fluida entre breakpoints, sin saltos abruptos:

```css
.text-display {
  font-size: clamp(2.5rem, 5vw + 1rem, 6rem);
}

.text-h1 {
  font-size: clamp(2rem, 3.5vw + 0.5rem, 3.125rem);
}
```

---

## XVII. FILOSOFÍA DEL MODO OSCURO

Esta plataforma tiene **una sola paleta visual**: la paleta cálida-clara definida en `07_VISUAL_IDENTITY.md`. No existe un modo oscuro de sistema completo.

**La razón:**

El modo oscuro de sistema altera la percepción del color de acento y modifica la temperatura del blanco. Para una plataforma donde la precisión cromática es parte de la identidad de marca, soportar dos versiones completas de la paleta — manteniendo la misma calidad en ambas — requeriría un esfuerzo que duplicaría el trabajo de diseño sin agregar valor estratégico.

**Lo que SÍ existe:**

Las secciones de inversión de paleta — el CTA final del homepage, ciertas transiciones — son superficies oscuras deliberadas. Estas superficies son oscuras en todos los contextos, independientemente de la preferencia del sistema del usuario. No son "modo oscuro" — son secciones de énfasis.

**Lo que se respeta:**

`prefers-color-scheme: dark` se detecta y se aplica a los meta elements: el color del sistema operativo alrededor del sitio, el color de la barra de herramientas del navegador, el icono de favicon en contextos oscuros. El sitio en sí no cambia.

**Si en el futuro se decide implementar modo oscuro completo**, debe tratarse como un tema separado — con sus propios tokens semánticos sobreescritos, su propio set de fotografías tratadas para contexto oscuro, y su propio proceso de QA visual. No es un `prefers-color-scheme: dark { filter: invert(90%) }`.

---

## XVIII. REGLAS DE IMPLEMENTACIÓN

**1. Los tokens son la fuente de verdad.**
Ningún valor numérico aparece en el CSS de componentes. Si un valor no existe como token, se crea el token antes de usarlo. El CSS de componente solo referencia variables (`var(--)`).

**2. Los componentes no conocen su contexto.**
Un `.card-essay` no sabe si está dentro del homepage o de la sección Pensamiento. Sus estilos son intrínsecos. El espaciado contextual (qué tan lejos está el componente del siguiente elemento) lo define el padre, no el componente.

**3. JavaScript mejora, no habilita.**
Todos los componentes funcionan en un estado base sin JavaScript. Los estados de hover, focus y active son CSS puro. JavaScript añade comportamiento complejo (drawer de móvil, transición de página, formulario secuencial en móvil), pero sin él el contenido es accesible y legible.

**4. Accesibilidad no es opcional.**
Cada componente es completamente funcional via teclado antes de considerarse completo. Los colores cumplen WCAG AA como mínimo (relación de contraste 4.5:1 para texto, 3:1 para elementos de UI). El texto primario sobre fondo principal apunta a AAA (7:1). Los estados de focus nunca se suprimen sin reemplazo.

**5. El orden del DOM refleja el orden de lectura.**
Los elementos en el HTML aparecen en el orden en que deben ser leídos por un screen reader. El CSS puede reordenarlos visualmente (grid, flexbox, order), pero el DOM mantiene la secuencia lógica.

**6. Sin !important.**
Si el sistema requiere `!important` para funcionar, el sistema tiene un problema de arquitectura. La especificidad se gestiona con la estructura del selector, no con fuerza bruta.

---

## XIX. ORGANIZACIÓN EN FIGMA

El archivo de Figma tiene cinco páginas. No más.

```
📄 Figma: neilmeza.com Design System

├── 🎨 Foundations
│   ├── Color tokens (primitivos + semánticos)
│   ├── Typography scale
│   ├── Spacing scale
│   ├── Grid + layout
│   ├── Motion tokens
│   └── Border + shadow tokens

├── 🧩 Components
│   ├── Buttons (Primary / Secondary / Ghost) — todos los estados
│   ├── Forms (Input, Textarea, Field) — todos los estados
│   ├── Navigation (Desktop / Mobile / Drawer)
│   ├── Cards (Case Study / Essay)
│   ├── Typography components (Display, H1-H4, Body, Essay, Lead, Caption)
│   └── Icons

├── 📐 Patterns
│   ├── Homepage sections (Hero, Argument, Work, Thinking, Person, Invitation)
│   ├── Case study layout
│   ├── Essay layout
│   ├── About layout
│   └── Contact form layout

├── 📱 Pages
│   ├── Homepage (Desktop + Mobile)
│   ├── Trabajo / index + caso individual
│   ├── Pensamiento / index + ensayo individual
│   ├── Sobre Neil
│   └── Construyamos

└── 🗂 Archive
    └── Explorations, rejected concepts, version history
```

**Convenciones de Figma:**

- Todos los estilos de color son Variables locales, no Styles clásicos
- Todos los textos usan Text Styles que mapean directamente a tokens tipográficos
- Todos los componentes usan Auto Layout
- Los estados de componente se crean como Variants con nombres que siguen el patrón `Type/State` (Primary/Default, Primary/Hover, etc.)
- Las instancias de componente nunca tienen overrides de color directos — siempre se cambia a través de la variable del token

---

## XX. CONVENCIONES DE NOMENCLATURA

### CSS Custom Properties

Patrón: `--[categoría]-[calificador]-[variante]`

```
--color-text-primary       ✓
--color-background-subtle  ✓
--font-size-lg             ✓
--space-section-gap        ✓
--duration-base            ✓

--textPrimary              ✗  (camelCase no es CSS)
--primary-color            ✗  (categoría después del calificador)
--big-font                 ✗  (describe apariencia, no semántica)
```

### Clases de componente

Patrón BEM: `[bloque]__[elemento]--[modificador]`

```
.btn-primary               — bloque standalone
.card-essay                — bloque
.card-essay__title         — elemento
.card-essay__title--large  — modificador
.nav__link[aria-current]   — estado via atributo ARIA (preferido sobre --active)
```

### Nombres de variantes en Figma

Patrón: `Categoría/Tipo/Estado`

```
Button/Primary/Default    ✓
Button/Primary/Hover      ✓
Card/Essay/Default        ✓
Typography/H1/Default     ✓
```

### Tokens en código vs. Figma

Los nombres de tokens son idénticos en ambos contextos, excepto por el prefijo de CSS:

```
CSS:    --color-text-primary
Figma:  color/text/primary
```

La barra `/` en Figma equivale al `-` en CSS para todos los propósitos de organización.

---

*Documento parte de la arquitectura estratégica de neilmeza.com. Leer en conjunto con `07_VISUAL_IDENTITY.md`. Alimenta directamente la fase de desarrollo frontend — `14_PERFORMANCE.md` define las especificaciones técnicas adicionales que este sistema debe cumplir.*
