# Diseño — Sección Proyectos: filtro por categoría + páginas de caso de estudio

**Fecha:** 2026-06-13
**Proyecto:** Web TEF (Telecomunicaciones e Instalaciones Eléctricas)
**Autor:** Beñat (Benia Agency) con asistencia de Claude Code

## Objetivo

Mejorar la sección `#proyectos` ("Nuestros Trabajos") de la web de TEF para que:
1. Las tarjetas se puedan **filtrar por categoría** mediante chips.
2. La flecha ↗ (hoy inerte) **abra una página de caso de estudio** dedicada por proyecto.

Manteniendo la línea de estilo actual: fondo negro, azul eléctrico `#3B82F6`, texto blanco, partículas, estética tech.

## Decisiones tomadas (brainstorming)

- **Apertura del caso:** página HTML dedicada por proyecto (no modal). Mejor SEO y coherente con las páginas de servicio existentes.
- **Filtros:** una categoría principal por proyecto.
- **Alcance:** crear las 5 páginas de caso de los proyectos actuales (contenido real donde exista, marcadores `[COMPLETAR]` donde no).

## Categorización

| Proyecto | Categoría | Página de caso |
|---|---|---|
| Antenas TDT y Satélite | Telecom | `caso-antenas-tdt.html` |
| Red de Fibra Óptica | Telecom | `caso-fibra-optica.html` |
| Cuadros Industriales | Eléctrico | `caso-cuadros-industriales.html` |
| Sistemas de Domótica | Domótica | `caso-domotica.html` |
| Instalaciones Obra Nueva | Eléctrico | `caso-obra-nueva.html` |

- **Filtros visibles:** `Todos` · `Telecom` (2) · `Eléctrico` (2) · `Domótica` (1).
- **Seguridad** queda fuera por ahora (ningún proyecto actual encaja). Se añadirá cuando exista un caso de seguridad/videovigilancia.

## Componentes

### 1. Filtro por chips
- Fila de chips sobre `.works-grid`, reutilizando el patrón visual `service-chip` existente (azul eléctrico al activar).
- Estado: un solo chip activo a la vez; `Todos` activo por defecto.
- Comportamiento: al activar un chip, las tarjetas que no coinciden se ocultan con transición **fade + scale**; el resto se muestran.
- Móvil: los chips hacen scroll horizontal si no caben.
- Accesibilidad: chips como `<button>` con `aria-pressed`.

### 2. Tarjetas enlazables
- Cada `.work-card` se envuelve en un `<a href="caso-*.html">` (tarjeta entera clicable), con `aria-label` descriptivo.
- Se añade `data-category` con el slug de categoría (`telecom`, `electrico`, `domotica`) a cada tarjeta para el filtrado.

### 3. Páginas de caso de estudio (×5)
- Reutilizan la plantilla existente: mismo navbar, footer, sistema de estilos y partículas.
- Estructura de cada página:
  1. **Hero:** título del proyecto + badge de categoría + 1 métrica clave.
  2. **Reto** → **Solución** → **Resultado** (3 bloques).
  3. **Galería** de imágenes del proyecto (imágenes existentes en `/images`).
  4. **CTA final:** "¿Quieres un proyecto similar?" → enlaza a `index.html#contacto`.
- Contenido real donde exista (títulos/descripciones de las tarjetas actuales); resto con marcadores `[COMPLETAR: ...]` muy visibles.
- SEO: cada página con `<title>`, meta description y Open Graph propios.

## Flujo de datos / interacción

```
[Usuario en #proyectos]
   │
   ├─ clic en chip de categoría ──▶ script.js filtra tarjetas (data-category) ──▶ fade in/out
   │
   └─ clic en tarjeta ──▶ navega a caso-*.html (página dedicada)
                                   │
                                   └─ CTA ──▶ index.html#contacto
```

## Archivos afectados

- **`index.html`** — añadir fila de chips; añadir `data-category` y envoltura `<a>` en las 5 tarjetas.
- **`styles.css`** — estilos de chips de filtro, estado oculto (`.is-filtered-out`), y estilos de la página de caso de estudio.
- **`script.js`** — lógica del filtro por categoría.
- **Nuevos:** `caso-antenas-tdt.html`, `caso-fibra-optica.html`, `caso-cuadros-industriales.html`, `caso-domotica.html`, `caso-obra-nueva.html`.

## Manejo de errores / casos límite

- **Sin coincidencias:** no aplica (todas las categorías tienen ≥1 proyecto). Aun así, el filtro `Todos` siempre restaura la vista completa.
- **Contenido placeholder:** los marcadores `[COMPLETAR]` deben ser muy visibles para evitar publicar con relleno. Se avisará en la entrega.
- **Navegación de vuelta:** las páginas de caso incluyen el navbar con enlace a `index.html` y a `#proyectos`.

## Pruebas (verificación manual)

- Cada chip filtra correctamente y solo muestra los proyectos de su categoría.
- `Todos` restaura las 5 tarjetas.
- Clic en cada tarjeta abre su página de caso correcta.
- El CTA de cada caso lleva a `#contacto`.
- Responsive: chips y tarjetas se ven bien en móvil.
- Las 5 páginas de caso cargan navbar, footer y estilos sin romper.

## Fuera de alcance (YAGNI)

- Borde eléctrico animado (Opción 2) y métricas en tarjeta (Opción 1): descartadas para esta iteración.
- Categoría "Seguridad" y multi-categoría por proyecto.
- CMS / contenido dinámico: las páginas son estáticas.
