# Sección Proyectos: Filtro + Casos de Estudio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Añadir un filtro por categoría (chips) a la sección de proyectos de la web de TEF y convertir cada tarjeta en un enlace a su página de caso de estudio dedicada (5 páginas).

**Architecture:** Sitio estático HTML/CSS/JS sin build ni framework. Se reutiliza el sistema de estilos existente (`sp-*` para páginas internas, `service-chip`, partículas, `reveal`). El filtro es JS vanilla sobre `data-category`. Las páginas de caso reutilizan la plantilla de las páginas de servicio actuales (`fibra-optica.html` como referencia).

**Tech Stack:** HTML5, CSS3 (variables `--primary-500`, `--primary-rgb`), JavaScript vanilla (event listeners en `DOMContentLoaded`). Verificación manual con `python -m http.server`.

**Nota de testing:** No hay test runner en este proyecto. Cada tarea termina con una verificación manual en navegador (servidor local) + commit. No se inventan tests automáticos.

---

## Mapa de categorías y archivos

| Proyecto (título tarjeta) | `data-category` | Página de caso |
|---|---|---|
| Instalación de Antenas TDT y Satélite | `telecom` | `caso-antenas-tdt.html` |
| Red de Fibra Óptica | `telecom` | `caso-fibra-optica.html` |
| Cuadros Industriales | `electrico` | `caso-cuadros-industriales.html` |
| Sistemas de Domótica | `domotica` | `caso-domotica.html` |
| Instalaciones Obra Nueva | `electrico` | `caso-obra-nueva.html` |

Chips visibles: `Todos` · `Telecom` · `Eléctrico` · `Domótica`.

## File Structure

- `index.html` — añadir fila de chips en `#proyectos`; convertir las 5 `.work-card` (div) en `<a>` con `href` y `data-category`.
- `styles.css` — estilos de `.project-filter` / `.filter-chip`, estado `.work-card.is-hidden`, animación `cardIn`, y bloques de caso (`.cs-block`, `.cs-gallery`).
- `script.js` — añadir bloque "FILTRO DE PROYECTOS" dentro del `DOMContentLoaded` existente.
- Crear: `caso-antenas-tdt.html`, `caso-fibra-optica.html`, `caso-cuadros-industriales.html`, `caso-domotica.html`, `caso-obra-nueva.html`.

---

## Task 1: Chips de filtro + tarjetas enlazables en index.html

**Files:**
- Modify: `index.html` (sección `#proyectos`, aprox. líneas 364-450)

- [ ] **Step 1: Insertar la fila de chips tras el `section-header`**

En `index.html`, localiza el cierre del `div.section-header` (la línea `</div>` que sigue a `<p class="section-subtitle">...</p>`, justo antes de `<div class="works-grid">`). Inserta este bloque entre ese `</div>` y `<div class="works-grid">`:

```html
            <div class="project-filter reveal" role="tablist" aria-label="Filtrar proyectos por categoría">
                <button type="button" class="filter-chip active" data-filter="todos" aria-pressed="true">Todos</button>
                <button type="button" class="filter-chip" data-filter="telecom" aria-pressed="false">Telecom</button>
                <button type="button" class="filter-chip" data-filter="electrico" aria-pressed="false">Eléctrico</button>
                <button type="button" class="filter-chip" data-filter="domotica" aria-pressed="false">Domótica</button>
            </div>
```

- [ ] **Step 2: Convertir la tarjeta FEATURED (Antenas TDT) en enlace**

Reemplaza la apertura `<div class="work-card work-card--featured reveal">` por:

```html
                <a class="work-card work-card--featured reveal" href="caso-antenas-tdt.html" data-category="telecom" aria-label="Ver caso de estudio: Instalación de Antenas TDT y Satélite">
```

Y su `</div>` de cierre correspondiente (el que cierra esa tarjeta, tras `<div class="work-card__arrow">↗</div>`) por `</a>`.

- [ ] **Step 3: Convertir las 4 tarjetas pequeñas en enlaces**

Para cada tarjeta `work-card--small`, sustituye su `<div class="work-card work-card--small reveal">` de apertura y su `</div>` de cierre por `<a ...>` / `</a>` con estos valores:

- Red de Fibra Óptica:
```html
                <a class="work-card work-card--small reveal" href="caso-fibra-optica.html" data-category="telecom" aria-label="Ver caso de estudio: Red de Fibra Óptica">
```
- Cuadros Industriales:
```html
                <a class="work-card work-card--small reveal" href="caso-cuadros-industriales.html" data-category="electrico" aria-label="Ver caso de estudio: Cuadros Industriales">
```
- Sistemas de Domótica:
```html
                <a class="work-card work-card--small reveal" href="caso-domotica.html" data-category="domotica" aria-label="Ver caso de estudio: Sistemas de Domótica">
```
- Instalaciones Obra Nueva:
```html
                <a class="work-card work-card--small reveal" href="caso-obra-nueva.html" data-category="electrico" aria-label="Ver caso de estudio: Instalaciones Obra Nueva">
```

- [ ] **Step 4: Verificar el HTML manualmente**

Run: `python -m http.server 8000` en el directorio del proyecto y abre `http://localhost:8000/#proyectos`.
Expected: se ven los 4 chips encima del grid; las tarjetas se ven igual que antes. (Aún sin estilos de chip ni filtro funcional — eso va en Tasks 2-3.) Los enlaces apuntan a páginas que aún no existen (404 al clicar es esperado hasta la Task 5+).

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat(proyectos): chips de filtro y tarjetas enlazables a casos"
```

---

## Task 2: Estilos del filtro y estado oculto

**Files:**
- Modify: `styles.css` (añadir al final del bloque de la sección `.works-grid`, tras la línea 1601 aprox., o al final del archivo)

- [ ] **Step 1: Añadir estilos de chips, estado oculto y animación**

Añade este bloque a `styles.css`:

```css
/* ===== FILTRO DE PROYECTOS ===== */
.project-filter {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 0 auto 28px;
}
.filter-chip {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 999px;
    padding: 8px 18px;
    color: var(--text-tertiary, #9ca3af);
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, color 0.2s;
    white-space: nowrap;
}
.filter-chip:hover {
    border-color: rgba(255,255,255,0.25);
    color: #fff;
}
.filter-chip.active {
    border-color: var(--primary-500);
    background: rgba(var(--primary-rgb), 0.12);
    color: #fff;
    box-shadow: 0 0 18px rgba(var(--primary-rgb), 0.25);
}
.work-card.is-hidden { display: none !important; }
@keyframes cardIn {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
}
.work-card.card-in { animation: cardIn 0.3s ease both; }

/* La tarjeta-enlace no debe parecer texto enlazado */
a.work-card { text-decoration: none; color: inherit; display: block; }

@media (max-width: 600px) {
    .project-filter {
        flex-wrap: nowrap;
        overflow-x: auto;
        justify-content: flex-start;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 4px;
    }
}
```

- [ ] **Step 2: Verificar visualmente**

Run: recarga `http://localhost:8000/#proyectos`.
Expected: el chip "Todos" se ve activo (azul eléctrico con glow); el resto en gris con borde tenue; al pasar el ratón se aclaran. En móvil (DevTools responsive) los chips hacen scroll horizontal.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "style(proyectos): estilos de chips de filtro y estado oculto"
```

---

## Task 3: Lógica del filtro en script.js

**Files:**
- Modify: `script.js` (añadir un bloque nuevo dentro del `DOMContentLoaded`, antes del cierre `});` final, junto al bloque de `service-chip` ~línea 270)

- [ ] **Step 1: Añadir el bloque de filtrado**

Inserta este bloque dentro del callback de `DOMContentLoaded` (por ejemplo, justo después del bloque "Chips de servicio en el formulario de contacto", tras la línea 270):

```javascript
    // =========================================================================
    // FILTRO DE PROYECTOS (sección #proyectos)
    // =========================================================================
    const filterChips = document.querySelectorAll('.project-filter .filter-chip');
    const workCards = document.querySelectorAll('.works-grid .work-card');
    if (filterChips.length && workCards.length) {
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
                        // reflow para reiniciar la animación
                        void card.offsetWidth;
                        card.classList.add('card-in');
                    }
                });
            });
        });
    }
```

- [ ] **Step 2: Verificar el filtrado**

Run: recarga `http://localhost:8000/#proyectos` y pulsa cada chip.
Expected:
- "Telecom" → solo Antenas TDT + Fibra Óptica.
- "Eléctrico" → solo Cuadros Industriales + Obra Nueva.
- "Domótica" → solo Sistemas de Domótica.
- "Todos" → las 5 tarjetas, con una breve animación de aparición.
- El chip pulsado queda activo (azul) y el resto no.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat(proyectos): logica de filtro por categoria"
```

---

## Task 4: Estilos de los bloques de caso de estudio

**Files:**
- Modify: `styles.css` (añadir al final del archivo)

Las páginas de caso reutilizan las clases `sp-*` ya existentes (`sp-hero`, `sp-stats`, `sp-body`, `sp-section-label`, `sp-cta`, etc.). Solo se añaden dos piezas nuevas: bloques Reto/Solución/Resultado y galería.

- [ ] **Step 1: Añadir CSS de bloques de caso y galería**

Añade a `styles.css`:

```css
/* ===== PÁGINA DE CASO DE ESTUDIO ===== */
.cs-blocks {
    display: grid;
    gap: 18px;
    max-width: 900px;
    margin: 0 auto;
}
.cs-block {
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 24px;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));
}
.cs-block-label {
    font-size: 0.72rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--primary-500);
    font-weight: 700;
    margin-bottom: 10px;
}
.cs-block p { color: var(--text-secondary, #d1d5db); line-height: 1.7; }
.cs-gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    max-width: 900px;
    margin: 0 auto;
}
.cs-gallery img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.06);
    filter: brightness(0.85);
    transition: filter 0.3s, transform 0.3s;
}
.cs-gallery img:hover { filter: brightness(1); transform: scale(1.02); }
.cs-placeholder {
    color: #f59e0b;
    font-weight: 600;
    background: rgba(245,158,11,0.08);
    padding: 2px 6px;
    border-radius: 4px;
}
@media (max-width: 640px) {
    .cs-gallery { grid-template-columns: 1fr 1fr; }
}
```

> Nota: `.cs-placeholder` resalta en ámbar los marcadores `[COMPLETAR]` para que TEF los vea y no se publiquen por error.

- [ ] **Step 2: Verificar que no rompe estilos existentes**

Run: recarga `http://localhost:8000/fibra-optica.html`.
Expected: la página de servicio existente se ve igual que antes (no se ha tocado ninguna clase `sp-*`).

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "style(casos): bloques reto/solucion/resultado y galeria"
```

---

## Task 5: Plantilla de caso — caso-antenas-tdt.html

**Files:**
- Create: `caso-antenas-tdt.html`

- [ ] **Step 1: Crear el archivo con el contenido completo**

Crea `caso-antenas-tdt.html` con este contenido (esta es la PLANTILLA base; las Tasks 6-9 la reutilizan cambiando los campos marcados):

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Caso de estudio: Antenas TDT y Satélite en Madrid | TEF</title>
    <meta name="description" content="Caso real de instalación de antenas TDT y satélite para comunidades de vecinos en Madrid. Medición, instalación y certificación por TEF.">
    <meta property="og:title" content="Caso: Antenas TDT y Satélite | TEF">
    <meta property="og:description" content="Sistemas de recepción TDT y satélite para comunidades en Madrid.">
    <meta property="og:type" content="article">
    <meta property="og:image" content="images/instalacion-antenas-tv-tdt.jpeg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="particles-container" class="particles-container" aria-hidden="true"></div>

    <nav class="navbar pill-navbar" id="navbar" role="navigation" aria-label="Navegación principal">
        <div class="container nav-container">
            <a href="index.html" class="nav-logo"><img src="images/logofinaltef.png" alt="Logo TEF" class="logo-img"></a>
            <div class="nav-menu-inline" id="nav-menu-inline">
                <ul class="mobile-nav-links">
                    <li><a href="index.html" class="mobile-nav-link">Inicio</a></li>
                    <li><a href="index.html#servicios" class="mobile-nav-link">Servicios</a></li>
                    <li><a href="index.html#proyectos" class="mobile-nav-link">Proyectos</a></li>
                    <li><a href="chat.html" class="mobile-nav-link">Contacto</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="sp-hero">
        <img src="images/instalacion-antenas-tv-tdt.jpeg" alt="Instalación de antenas TDT y satélite por TEF en Madrid" class="sp-hero-img">
        <div class="sp-hero-overlay">
            <div class="sp-hero-text">
                <a href="index.html#proyectos" style="display:inline-flex;align-items:center;gap:6px;color:#6b7280;font-size:.8rem;font-weight:600;text-decoration:none;margin-bottom:16px;">← Volver a proyectos</a>
                <div class="hero-badge"><span class="badge-dot"></span>📺 Telecom · Madrid</div>
                <h1 class="sp-hero-title">Antenas TDT y Satélite<br><span>para comunidades de vecinos</span></h1>
                <p class="sp-hero-sub">Sistemas de recepción TDT y satélite en Madrid. Medición, instalación y certificación incluidas.</p>
            </div>
        </div>
        <a href="chat.html" class="sp-hero-float-btn">Pedir presupuesto →</a>
    </div>

    <div class="sp-stats">
        <div class="sp-stat"><div class="sp-stat-num">+300</div><div class="sp-stat-label">Viviendas conectadas</div></div>
        <div class="sp-stat"><div class="sp-stat-num"><span class="cs-placeholder">[COMPLETAR]</span></div><div class="sp-stat-label">Comunidades</div></div>
        <div class="sp-stat"><div class="sp-stat-num"><span class="cs-placeholder">[COMPLETAR]</span></div><div class="sp-stat-label">Días de obra</div></div>
        <div class="sp-stat"><div class="sp-stat-num">5★</div><div class="sp-stat-label">Valoración</div></div>
    </div>

    <div class="sp-body" style="display:block;">
        <div class="cs-blocks">
            <div class="cs-block">
                <div class="cs-block-label">El reto</div>
                <p><span class="cs-placeholder">[COMPLETAR: describe el problema del cliente — ej. comunidad con mala recepción TDT, señal deficiente en varias plantas, antena antigua sin certificar.]</span></p>
            </div>
            <div class="cs-block">
                <div class="cs-block-label">La solución</div>
                <p><span class="cs-placeholder">[COMPLETAR: qué hizo TEF — ej. medición de señal, instalación de antena nueva y amplificador, distribución a todas las viviendas, certificación.]</span></p>
            </div>
            <div class="cs-block">
                <div class="cs-block-label">El resultado</div>
                <p><span class="cs-placeholder">[COMPLETAR: resultado medible — ej. señal óptima en todas las viviendas, 0 incidencias posteriores, certificado entregado en X días.]</span></p>
            </div>
        </div>
    </div>

    <div class="sp-body" style="display:block;">
        <div class="sp-section-label" style="text-align:center;">Galería del proyecto</div>
        <div class="cs-gallery">
            <img src="images/instalacion-antenas-tv-tdt.jpeg" alt="Antena TDT instalada por TEF" loading="lazy">
            <img src="images/instalacion-antenas-tv-tdt.jpeg" alt="Detalle de la instalación de antena" loading="lazy">
            <img src="images/instalacion-antenas-tv-tdt.jpeg" alt="Trabajo finalizado de recepción TDT" loading="lazy">
        </div>
        <p style="text-align:center;margin-top:12px;font-size:.85rem;"><span class="cs-placeholder">[COMPLETAR: sustituir por fotos reales del proyecto.]</span></p>
    </div>

    <div class="sp-cta">
        <div class="sp-cta-title">¿Tu comunidad necesita mejorar la señal?</div>
        <div class="sp-cta-sub">Medición · Instalación · Certificación en Madrid</div>
        <a href="chat.html" class="sp-cta-btn">Hablar con un técnico →</a>
        <div class="sp-cta-note">Respondemos en menos de 2 horas · Lunes a viernes</div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar en navegador**

Run: abre `http://localhost:8000/caso-antenas-tdt.html`.
Expected: carga con navbar, partículas, hero con imagen, stats, bloques Reto/Solución/Resultado, galería y CTA. Los `[COMPLETAR]` aparecen resaltados en ámbar. El enlace "← Volver a proyectos" lleva a `index.html#proyectos`. El CTA y el botón flotante llevan a `chat.html`.

- [ ] **Step 3: Verificar que el enlace de la tarjeta funciona**

Run: abre `http://localhost:8000/#proyectos` y haz clic en la tarjeta de Antenas TDT.
Expected: navega a `caso-antenas-tdt.html`.

- [ ] **Step 4: Commit**

```bash
git add caso-antenas-tdt.html
git commit -m "feat(casos): pagina de caso Antenas TDT"
```

---

## Task 6: caso-fibra-optica.html

**Files:**
- Create: `caso-fibra-optica.html`

- [ ] **Step 1: Copiar la plantilla de Task 5 y aplicar estos reemplazos exactos**

Crea `caso-fibra-optica.html` partiendo del contenido íntegro de `caso-antenas-tdt.html` (Task 5) y sustituye:

- `<title>` → `Caso de estudio: Red de Fibra Óptica en Madrid | TEF`
- `meta name="description"` content → `Caso real de instalación de red de fibra óptica y cableado estructurado para empresa en Madrid por TEF.`
- `og:title` → `Caso: Red de Fibra Óptica | TEF`
- `og:description` → `Red de fibra y cableado estructurado para empresa en Madrid.`
- `og:image` y las 4 `src` de imagen (hero + 3 galería) → `images/instalacion-fibra-optica-telecomunicaciones.jpeg`
- `alt` del hero → `Red de fibra óptica instalada por TEF en Madrid`
- Badge `📺 Telecom · Madrid` → `🌐 Telecom · Madrid`
- `<h1>` → `Red de Fibra Óptica<br><span>y cableado estructurado</span>`
- `sp-hero-sub` → `Instalación de fibra y redes de datos para empresas en Madrid. Racks, patch panels y certificación.`
- Stats: `+300 / Viviendas conectadas` → `[COMPLETAR] / Puestos de red`; mantener el resto con `[COMPLETAR]` salvo `5★ / Valoración`.
- Bloques Reto/Solución/Resultado: mantener los `[COMPLETAR]` (texto orientativo puede ajustarse a fibra).
- `sp-cta-title` → `¿Tu empresa necesita una red sólida?`
- `sp-cta-sub` → `Fibra · Cableado estructurado · Racks en Madrid`

- [ ] **Step 2: Verificar**

Run: abre `http://localhost:8000/caso-fibra-optica.html` y, desde `#proyectos`, clic en la tarjeta de Fibra Óptica.
Expected: la página carga con la imagen de fibra, textos de fibra, y la tarjeta enlaza correctamente.

- [ ] **Step 3: Commit**

```bash
git add caso-fibra-optica.html
git commit -m "feat(casos): pagina de caso Fibra Optica"
```

---

## Task 7: caso-cuadros-industriales.html

**Files:**
- Create: `caso-cuadros-industriales.html`

- [ ] **Step 1: Copiar la plantilla de Task 5 y aplicar estos reemplazos exactos**

- `<title>` → `Caso de estudio: Cuadros Eléctricos Industriales en Madrid | TEF`
- `meta description` → `Caso real de montaje y legalización de cuadros eléctricos industriales en Madrid por TEF.`
- `og:title` → `Caso: Cuadros Industriales | TEF`
- `og:description` → `Montaje y legalización de cuadros eléctricos industriales en Madrid.`
- `og:image` y las 4 `src` de imagen → `images/instalaciones-electricas-cuadros-industriales.jpeg`
- `alt` hero → `Cuadro eléctrico industrial montado por TEF`
- Badge → `⚡ Eléctrico · Madrid`
- `<h1>` → `Cuadros Eléctricos<br><span>Industriales</span>`
- `sp-hero-sub` → `Diseño, montaje y legalización de cuadros eléctricos para naves e industria en Madrid.`
- Stats: primer stat → `[COMPLETAR] / Cuadros montados`; resto `[COMPLETAR]` salvo `5★`.
- `sp-cta-title` → `¿Necesitas un cuadro industrial a medida?`
- `sp-cta-sub` → `Diseño · Montaje · Legalización en Madrid`

- [ ] **Step 2: Verificar**

Run: abre `http://localhost:8000/caso-cuadros-industriales.html` y comprueba el enlace desde `#proyectos`.
Expected: página correcta con imagen y textos de cuadros industriales.

- [ ] **Step 3: Commit**

```bash
git add caso-cuadros-industriales.html
git commit -m "feat(casos): pagina de caso Cuadros Industriales"
```

---

## Task 8: caso-domotica.html

**Files:**
- Create: `caso-domotica.html`

- [ ] **Step 1: Copiar la plantilla de Task 5 y aplicar estos reemplazos exactos**

- `<title>` → `Caso de estudio: Domótica y Smart Home en Madrid | TEF`
- `meta description` → `Caso real de instalación de domótica y videoporteros para vivienda en Madrid por TEF.`
- `og:title` → `Caso: Sistemas de Domótica | TEF`
- `og:description` → `Domótica, videoporteros y smart home en Madrid.`
- `og:image` y las 4 `src` de imagen → `images/instalacion-video-porteros-domotica.jpeg`
- `alt` hero → `Sistema de domótica y videoportero instalado por TEF`
- Badge → `🏠 Domótica · Madrid`
- `<h1>` → `Domótica y<br><span>Smart Home</span>`
- `sp-hero-sub` → `Automatización del hogar, videoporteros y control inteligente en Madrid.`
- Stats: primer stat → `[COMPLETAR] / Viviendas automatizadas`; resto `[COMPLETAR]` salvo `5★`.
- `sp-cta-title` → `¿Quieres automatizar tu hogar?`
- `sp-cta-sub` → `Domótica · Videoporteros · Smart Home en Madrid`

- [ ] **Step 2: Verificar**

Run: abre `http://localhost:8000/caso-domotica.html` y comprueba el enlace desde `#proyectos`.
Expected: página correcta con imagen y textos de domótica.

- [ ] **Step 3: Commit**

```bash
git add caso-domotica.html
git commit -m "feat(casos): pagina de caso Domotica"
```

---

## Task 9: caso-obra-nueva.html

**Files:**
- Create: `caso-obra-nueva.html`

- [ ] **Step 1: Copiar la plantilla de Task 5 y aplicar estos reemplazos exactos**

- `<title>` → `Caso de estudio: Instalación Eléctrica en Obra Nueva en Madrid | TEF`
- `meta description` → `Caso real de instalación eléctrica completa en obra nueva en Madrid, hasta el boletín, por TEF.`
- `og:title` → `Caso: Instalaciones Obra Nueva | TEF`
- `og:description` → `Instalación eléctrica completa en obra nueva en Madrid, hasta el boletín.`
- `og:image` y las 4 `src` de imagen → `images/empresa-instalaciones-electricas-obra-nueva.jpeg`
- `alt` hero → `Instalación eléctrica de obra nueva realizada por TEF`
- Badge → `⚡ Eléctrico · Madrid`
- `<h1>` → `Instalación Eléctrica<br><span>en Obra Nueva</span>`
- `sp-hero-sub` → `Proyecto eléctrico completo para constructoras y particulares en Madrid, hasta el boletín.`
- Stats: primer stat → `[COMPLETAR] / Viviendas` ; resto `[COMPLETAR]` salvo `5★`.
- `sp-cta-title` → `¿Construyes y necesitas la instalación eléctrica?`
- `sp-cta-sub` → `Proyecto · Instalación · Boletín en Madrid`

- [ ] **Step 2: Verificar**

Run: abre `http://localhost:8000/caso-obra-nueva.html` y comprueba el enlace desde `#proyectos`.
Expected: página correcta con imagen y textos de obra nueva.

- [ ] **Step 3: Commit**

```bash
git add caso-obra-nueva.html
git commit -m "feat(casos): pagina de caso Obra Nueva"
```

---

## Task 10: Verificación final integral

**Files:** (ninguno — solo verificación)

- [ ] **Step 1: Recorrido completo en navegador**

Run: `python -m http.server 8000`, abre `http://localhost:8000/#proyectos`.
Expected, comprueba todo:
- Los 4 chips filtran correctamente (Telecom=2, Eléctrico=2, Domótica=1, Todos=5).
- Las 5 tarjetas enlazan a su caso correcto.
- Cada caso carga navbar, partículas, hero, stats, bloques, galería y CTA.
- Cada "← Volver a proyectos" vuelve a `index.html#proyectos`.
- Cada CTA lleva a `chat.html`.
- Todos los `[COMPLETAR]` se ven resaltados en ámbar (recordatorio para TEF).
- Responsive (móvil): chips con scroll horizontal, galería en 2 columnas.

- [ ] **Step 2: Confirmar que no quedó nada roto**

Run: abre `index.html` completa y revisa que servicios, testimonios, formulario y footer siguen igual.
Expected: ninguna regresión visual.

- [ ] **Step 3: Commit final (si hubo ajustes)**

```bash
git add -A
git commit -m "chore(proyectos): verificacion final filtro + casos"
```

---

## Self-Review (cobertura del spec)

- Filtro por chips (1 categoría/proyecto) → Tasks 1, 2, 3 ✓
- Tarjetas enlazables → Task 1 ✓
- 5 páginas de caso reutilizando plantilla → Tasks 5-9 ✓
- Estructura Hero/Reto/Solución/Resultado/Galería/CTA → Task 5 (plantilla) ✓
- SEO (title, description, OG por página) → Tasks 5-9 ✓
- Accesibilidad (chips `aria-pressed`, tarjetas `aria-label`) → Tasks 1 ✓
- Marcadores `[COMPLETAR]` visibles → Task 4 (`.cs-placeholder`) + Tasks 5-9 ✓
- "Seguridad" fuera de alcance → no se añade chip ✓
- Responsive → Tasks 2, 4, 10 ✓
