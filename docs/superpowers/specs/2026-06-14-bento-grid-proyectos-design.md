# Bento Grid — Sección Proyectos

**Fecha:** 2026-06-14  
**Scope:** Rediseño del layout de la sección `#proyectos` en `index.html` + estilos en `styles.css`  
**Aprobado por:** Beñat

---

## Problema

El layout actual (1 card featured ancho completo + 4 cards pequeñas en grid 2×2 debajo) se percibe desbalanceado y sin jerarquía visual clara. Las 4 cards pequeñas quedan aplastadas y homogéneas.

---

## Solución: Bento B — Hero izquierda + 2×2 derecha

```
┌──────────────────┬─────────┬────────┐
│                  │ Card 2  │ Card 3 │
│  Card 1 (Hero)   ├─────────┼────────┤
│                  │ Card 4  │ Card 5 │
└──────────────────┴─────────┴────────┘
```

- **Columna izquierda (50%):** card hero, ocupa toda la altura del bloque derecho.
- **Columna derecha (50%):** grid 2×2 con las 4 cards restantes.

---

## Cambios en HTML (`index.html`)

1. **Renombrar** clase `work-card--featured` → `work-card--hero` en la primera card.
2. **Envolver** las 4 cards pequeñas en un `<div class="works-grid__secondary">`.
3. Eliminar clases `work-card--small` (ya no hay distinción de tamaño explícita).

Estructura resultante:
```html
<div class="works-grid">
  <a class="work-card work-card--hero reveal" href="...">...</a>
  <div class="works-grid__secondary">
    <a class="work-card reveal" href="...">...</a>
    <a class="work-card reveal" href="...">...</a>
    <a class="work-card reveal" href="...">...</a>
    <a class="work-card reveal" href="...">...</a>
  </div>
</div>
```

---

## Cambios en CSS (`styles.css`)

### `.works-grid`
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 12px;
max-width: 1100px;
margin: 0 auto;
```

### `.works-grid__secondary`
```css
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr;
gap: 12px;
```

### `.work-card--hero img`
```css
height: 100%;
width: 100%;
object-fit: cover;
```

### `.work-card--hero`
```css
height: 100%;   /* hereda la altura del secondary grid */
```

### Cards del secondary (sin clase específica)
```css
.works-grid__secondary .work-card img { height: 220px; }
```

---

## Hover en la hero card

- **Estado por defecto:** título + tags visibles (overlay inferior, como ahora).
- **En hover:** la descripción se revela con una transición `translateY(6px) → 0` + `opacity: 0 → 1`.
- La descripción `.work-card__desc` NO se oculta con `display: none` en la hero. Se oculta con `opacity: 0; transform: translateY(6px); transition`.
- En hover: `opacity: 1; transform: translateY(0)`.

---

## Filtro de categorías (ajuste)

Cuando la hero card queda oculta por un filtro activo, el layout se quiebra (columna izquierda vacía).

**Solución JS:** en el listener del filtro, tras aplicar `.is-hidden`, comprobar si la hero está oculta y añadir clase `.works-grid--no-hero` al contenedor. En CSS:
```css
.works-grid--no-hero {
  grid-template-columns: 1fr;
}
.works-grid--no-hero .works-grid__secondary {
  grid-template-columns: 1fr 1fr 1fr 1fr; /* o 2fr 2fr */
}
```

---

## Responsive

- **< 768px:** `.works-grid` pasa a `grid-template-columns: 1fr` (hero arriba, secondary debajo en 2×2).
- **< 480px:** `.works-grid__secondary` pasa a `grid-template-columns: 1fr` (todas apiladas).

---

## Archivos afectados

| Archivo | Cambios |
|---------|---------|
| `index.html` | Renombrar clase hero, añadir wrapper `.works-grid__secondary` |
| `styles.css` | Reescribir bloque `WORKS GRID`, añadir estilos hover description, ajuste responsive |
| `script.js` | Añadir lógica `.works-grid--no-hero` en el listener del filtro |

---

## Fuera de scope

- Cambios en las páginas de caso de estudio (`caso-*.html`).
- Cambios en el sistema de filtro más allá del ajuste de layout.
