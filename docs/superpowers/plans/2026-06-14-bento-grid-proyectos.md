# Bento Grid — Sección Proyectos — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar el layout de la sección `#proyectos` de `index.html` con un Bento Grid: card hero a la izquierda (altura completa) + 4 cards en grid 2×2 a la derecha.

**Architecture:** 3 archivos afectados — HTML para la estructura del markup, CSS para el grid y los estilos hover, JS para el ajuste de layout cuando la hero card queda oculta por el filtro de categorías.

**Tech Stack:** HTML5, CSS Grid, vanilla JS (sin dependencias)

---

## Archivos afectados

| Archivo | Cambios |
|---------|---------|
| `index.html` | Renombrar clase hero, envolver 4 cards en `.works-grid__secondary`, eliminar `work-card--small` |
| `styles.css` | Reescribir bloque `WORKS GRID` (~líneas 1594–1750): nuevo grid, hero height, hover desc reveal, responsive, `--no-hero` |
| `script.js` | Añadir lógica `works-grid--no-hero` en el listener del filtro (~línea 288) |

---

## Task 1: HTML — Reestructurar el markup del works-grid

**Archivos:**
- Modify: `index.html:377–454`

- [ ] **Step 1: Reemplazar el bloque `.works-grid` completo**

Localiza las líneas 377–454 de `index.html` y sustitúyelas por:

```html
            <div class="works-grid">

                <!-- HERO -->
                <a class="work-card work-card--hero reveal" href="caso-antenas-tdt.html" data-category="telecom" aria-label="Ver caso de estudio: Instalación de Antenas TDT y Satélite">
                    <img src="images/instalacion-antenas-tv-tdt.jpeg" alt="Instalación de Antenas" loading="lazy" decoding="async">
                    <div class="work-card__overlay"></div>
                    <div class="work-card__body">
                        <div class="work-card__tags">
                            <span class="work-tag">Residencial</span>
                            <span class="work-tag">TV</span>
                        </div>
                        <div class="work-card__title">Instalación de Antenas TDT y Satélite</div>
                        <div class="work-card__desc">Sistemas de recepción TDT y satélite para comunidades de vecinos en Madrid. Medición, instalación y certificación incluidas.</div>
                    </div>
                    <div class="work-card__arrow">↗</div>
                </a>

                <!-- SECONDARY 2×2 -->
                <div class="works-grid__secondary">

                    <!-- Fibra Óptica -->
                    <a class="work-card reveal" href="caso-fibra-optica.html" data-category="telecom" aria-label="Ver caso de estudio: Red de Fibra Óptica">
                        <img src="images/instalacion-fibra-optica-telecomunicaciones.jpeg" alt="Red de Fibra Óptica" loading="lazy" decoding="async">
                        <div class="work-card__overlay"></div>
                        <div class="work-card__num">02</div>
                        <div class="work-card__body">
                            <div class="work-card__tags">
                                <span class="work-tag">Telecom</span>
                                <span class="work-tag">Empresas</span>
                            </div>
                            <div class="work-card__title">Red de Fibra Óptica</div>
                        </div>
                        <div class="work-card__arrow">↗</div>
                    </a>

                    <!-- Cuadros Industriales -->
                    <a class="work-card reveal" href="caso-cuadros-industriales.html" data-category="electrico" aria-label="Ver caso de estudio: Cuadros Industriales">
                        <img src="images/instalaciones-electricas-cuadros-industriales.jpeg" alt="Cuadros Industriales" loading="lazy" decoding="async">
                        <div class="work-card__overlay"></div>
                        <div class="work-card__num">03</div>
                        <div class="work-card__body">
                            <div class="work-card__tags">
                                <span class="work-tag">Industrial</span>
                                <span class="work-tag">Seguridad</span>
                            </div>
                            <div class="work-card__title">Cuadros Industriales</div>
                        </div>
                        <div class="work-card__arrow">↗</div>
                    </a>

                    <!-- Domótica -->
                    <a class="work-card reveal" href="caso-domotica.html" data-category="domotica" aria-label="Ver caso de estudio: Sistemas de Domótica">
                        <img src="images/instalacion-video-porteros-domotica.jpeg" alt="Sistemas de Domótica" loading="lazy" decoding="async">
                        <div class="work-card__overlay"></div>
                        <div class="work-card__num">04</div>
                        <div class="work-card__body">
                            <div class="work-card__tags">
                                <span class="work-tag">Domótica</span>
                                <span class="work-tag">Smart Home</span>
                            </div>
                            <div class="work-card__title">Sistemas de Domótica</div>
                        </div>
                        <div class="work-card__arrow">↗</div>
                    </a>

                    <!-- Obra Nueva -->
                    <a class="work-card reveal" href="caso-obra-nueva.html" data-category="electrico" aria-label="Ver caso de estudio: Instalaciones Obra Nueva">
                        <img src="images/empresa-instalaciones-electricas-obra-nueva.jpeg" alt="Instalaciones Obra Nueva" loading="lazy" decoding="async">
                        <div class="work-card__overlay"></div>
                        <div class="work-card__num">05</div>
                        <div class="work-card__body">
                            <div class="work-card__tags">
                                <span class="work-tag">Obra Nueva</span>
                                <span class="work-tag">Residencial</span>
                            </div>
                            <div class="work-card__title">Instalaciones Obra Nueva</div>
                        </div>
                        <div class="work-card__arrow">↗</div>
                    </a>

                </div><!-- /.works-grid__secondary -->

            </div><!-- /.works-grid -->
```

- [ ] **Step 2: Verificar en navegador**

Abre `index.html` en el navegador (doble clic o `file://...`). Ve a `#proyectos`. Esperado: 5 cards visibles pero SIN estilos correctos todavía — es normal. Las cards estarán apiladas verticalmente hasta que apliques el CSS del Task 2.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: restructure works-grid markup for bento layout"
```

---

## Task 2: CSS — Reescribir el bloque WORKS GRID

**Archivos:**
- Modify: `styles.css` (bloque `/* ===== WORKS GRID ... =====*/`, ~líneas 1594–1750)

- [ ] **Step 1: Reemplazar el bloque CSS completo de WORKS GRID**

Localiza el comentario `/* ===== WORKS GRID (Nuestros Trabajos) ===== */` en `styles.css` (≈línea 1594) y reemplaza todo el bloque hasta el `@media (max-width: 640px)` que cierra el bloque (≈línea 1750) por el siguiente CSS:

**Bloque OLD a reemplazar** (desde `/* ===== WORKS GRID` hasta el cierre de `@media (max-width: 640px)` que tiene `.work-card--small img { height: 180px; }`):

```css
/* ===== WORKS GRID (Nuestros Trabajos) ===== */
.works-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    max-width: 1000px;
    margin: 0 auto;
}

.work-card--featured {
    grid-column: 1 / -1;
}
```

**Bloque NEW completo** (pega esto en su lugar, mantén el resto de `.work-card` intacto hasta `.work-card__num`):

```css
/* ===== WORKS GRID (Nuestros Trabajos) ===== */
.works-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    max-width: 1100px;
    margin: 0 auto;
}

.works-grid__secondary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 12px;
}
```

- [ ] **Step 2: Reemplazar alturas de imagen hero y small**

Localiza y reemplaza las dos líneas:
```css
.work-card--featured img { height: 380px; }
.work-card--small   img  { height: 220px; }
```
Por:
```css
.work-card--hero { height: 100%; }
.work-card--hero img { height: 100%; min-height: 420px; }
.works-grid__secondary .work-card img { height: 210px; }
```

- [ ] **Step 3: Reemplazar `.work-card--featured` por `.work-card--hero` en los bloques restantes**

Hay 3 bloques con `work-card--featured` en el CSS. Reemplaza todos:

| Old | New |
|-----|-----|
| `.work-card--featured::after` | `.work-card--hero::after` |
| `.work-card--featured:hover::after` | `.work-card--hero:hover::after` |
| `.work-card--featured .work-card__title` | `.work-card--hero .work-card__title` |

- [ ] **Step 4: Eliminar la regla `work-card--small .work-card__desc`**

Localiza y elimina esta línea:
```css
.work-card--small .work-card__desc { display: none; }
```

- [ ] **Step 5: Verificar en navegador**

Abre `index.html` → sección `#proyectos`. Esperado:
- Card de Antenas TDT a la izquierda, alta.
- Grid 2×2 a la derecha con las 4 cards.
- Alturas equilibradas entre hero y secondary.

- [ ] **Step 6: Commit**

```bash
git add styles.css
git commit -m "feat: apply bento grid CSS layout to works-grid"
```

---

## Task 3: CSS — Hover reveal de descripción en la hero card

**Archivos:**
- Modify: `styles.css` (añadir a continuación del bloque WORKS GRID)

- [ ] **Step 1: Añadir estilos de transición para la descripción**

Justo después del bloque `/* ===== WORKS GRID ===== */`, añade:

```css
/* Hero card: descripción oculta por defecto, se revela en hover */
.work-card--hero .work-card__desc {
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.35s ease, transform 0.35s ease;
}

.work-card--hero:hover .work-card__desc {
    opacity: 1;
    transform: translateY(0);
}
```

- [ ] **Step 2: Verificar hover en navegador**

Pasa el ratón por la card hero (Antenas TDT). Esperado: la descripción aparece con fade-in + ligero slide hacia arriba.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: reveal description on hero card hover"
```

---

## Task 4: CSS — Responsive breakpoints

**Archivos:**
- Modify: `styles.css` (reemplazar `@media (max-width: 640px)` del bloque WORKS GRID)

- [ ] **Step 1: Reemplazar el media query antiguo por los nuevos**

Localiza el bloque:
```css
@media (max-width: 640px) {
    .works-grid { grid-template-columns: 1fr; }
    .work-card--featured img { height: 260px; }
    .work-card--small   img  { height: 180px; }
}
```

Reemplázalo por:
```css
@media (max-width: 768px) {
    .works-grid {
        grid-template-columns: 1fr;
    }
    .work-card--hero img {
        height: 300px;
        min-height: unset;
    }
}

@media (max-width: 480px) {
    .works-grid__secondary {
        grid-template-columns: 1fr;
    }
    .works-grid__secondary .work-card img {
        height: 180px;
    }
}
```

- [ ] **Step 2: Verificar responsive**

Redimensiona el navegador a < 768px. Esperado: hero arriba en columna completa, secondary debajo en 2×2. A < 480px: todo en columna única.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: responsive breakpoints for bento grid"
```

---

## Task 5: CSS + JS — Layout cuando la hero card está oculta por el filtro

**Archivos:**
- Modify: `styles.css` (añadir al final del bloque WORKS GRID)
- Modify: `script.js:288–299` (dentro del listener del filtro de categorías)

- [ ] **Step 1: Añadir CSS para `.works-grid--no-hero`**

Añade al final del bloque WORKS GRID en `styles.css`:

```css
/* Cuando la hero card está oculta por el filtro */
.works-grid--no-hero {
    grid-template-columns: 1fr;
}

.works-grid--no-hero .works-grid__secondary {
    grid-template-columns: 1fr 1fr;
}
```

- [ ] **Step 2: Añadir lógica JS en el listener del filtro**

Localiza en `script.js` el bloque del filtro de proyectos (≈línea 275). Dentro del `chip.addEventListener('click', ...)`, DESPUÉS del `workCards.forEach(...)`, añade:

```javascript
// Ajustar layout cuando la hero card queda oculta por el filtro
const heroCard = document.querySelector('.work-card--hero');
const worksGridEl = document.querySelector('.works-grid');
if (heroCard && worksGridEl) {
    worksGridEl.classList.toggle(
        'works-grid--no-hero',
        heroCard.classList.contains('is-hidden')
    );
}
```

El bloque completo del listener debe quedar así:
```javascript
filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;

        filterChips.forEach(c => {
            const isActive = c === chip;
            c.classList.toggle('active', isActive);
            c.setAttribute('aria-pressed', String(isActive));
        });

        workCards.forEach(card => {
            const match = filter === 'todos' || card.dataset.category === filter;
            card.classList.toggle('is-hidden', !match);
            if (match) {
                card.classList.remove('card-in');
                void card.offsetWidth;
                card.classList.add('card-in');
            }
        });

        // Ajustar layout cuando la hero card queda oculta por el filtro
        const heroCard = document.querySelector('.work-card--hero');
        const worksGridEl = document.querySelector('.works-grid');
        if (heroCard && worksGridEl) {
            worksGridEl.classList.toggle(
                'works-grid--no-hero',
                heroCard.classList.contains('is-hidden')
            );
        }
    });
});
```

- [ ] **Step 3: Verificar filtro**

En el navegador, haz clic en los chips del filtro y verifica:
- **Todos:** hero izquierda + 4 cards 2×2 derecha. ✓
- **Telecom:** hero visible + fibra óptica visible en secondary. ✓
- **Eléctrico:** hero oculta → secondary se expande a ancho completo con cuadros industriales + obra nueva. ✓
- **Domótica:** hero oculta → secondary con solo domótica visible. ✓

- [ ] **Step 4: Commit**

```bash
git add styles.css script.js
git commit -m "feat: adjust bento layout when hero card is filtered out"
```

---

## Task 6: Push y verificación final

- [ ] **Step 1: Verificación visual completa**

Abre `index.html` en el navegador y comprueba:
- [ ] Layout bento: hero izquierda, 2×2 derecha.
- [ ] Hover hero: descripción se revela con transición.
- [ ] Hover cards secondary: zoom de imagen + flecha azul.
- [ ] Filtro "Telecom": hero + fibra visibles, resto oculto.
- [ ] Filtro "Eléctrico": hero oculta, layout se ajusta, cuadros + obra nueva visibles.
- [ ] Filtro "Domótica": hero oculta, layout se ajusta, solo domótica visible.
- [ ] Responsive < 768px: columna única, hero arriba.
- [ ] Responsive < 480px: todo apilado.

- [ ] **Step 2: Push a GitHub**

```bash
git push origin main
```

---

## Notas de implementación

- El selector `'.works-grid .work-card'` en `script.js` ya encuentra las cards dentro de `.works-grid__secondary` (selector descendiente), sin cambios adicionales.
- `.works-grid__secondary` es un `<div>`, no un `<a>`, por lo que la regla `a.work-card { display: block; }` no le afecta.
- Si la hero card y todas las secondary están ocultas a la vez (imposible con los datos actuales, pero posible si se añaden más categorías), el grid se colapsa correctamente a altura 0.
