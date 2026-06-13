# Subpáginas de Servicios TEF — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rediseñar las 6 subpáginas de servicios de TEF con layout C+B (hero visual + ticker + stats + subcards + FAQ + marcas + CTA), contenido en Madrid, e imágenes IA ya generadas.

**Architecture:** Template HTML compartido para las 6 páginas reutilizando navbar/script.js/styles.css existentes. CSS nuevo con prefijo `.sp-` añadido a styles.css. Cada subpágina es un HTML independiente que solo varía en contenido.

**Tech Stack:** HTML5, CSS3 (variables CSS existentes), JS (script.js existente — partículas y navbar)

---

### Task 1: Añadir CSS `.sp-*` a styles.css

**Files:**
- Modify: `styles.css` (al final, antes del último `}` si lo hay)

- [ ] Añadir bloque de CSS al final de styles.css:

```css
/* ===== SUBPAGE SERVICES TEMPLATE ===== */
.sp-hero {
    position: relative;
    height: 460px;
    overflow: hidden;
}
.sp-hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.55;
    transition: transform 8s ease;
}
.sp-hero:hover .sp-hero-img { transform: scale(1.04); }
.sp-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(0,0,0,.9) 0%, rgba(0,0,0,.55) 55%, rgba(0,0,0,.1) 100%);
    display: flex;
    align-items: center;
    padding: 0 var(--container-padding, 48px);
}
.sp-hero-text { max-width: 580px; }
.sp-hero-title {
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    font-weight: 900;
    line-height: 1.1;
    color: #fff;
    letter-spacing: -0.03em;
    margin: 10px 0 12px;
}
.sp-hero-title span { color: var(--primary-400); }
.sp-hero-sub {
    font-size: 1rem;
    color: #9ca3af;
    max-width: 460px;
    line-height: 1.6;
}
.sp-hero-float-btn {
    position: absolute;
    top: 50%;
    right: 48px;
    transform: translateY(-50%);
    background: var(--primary-500);
    color: #fff;
    font-size: .9rem;
    font-weight: 700;
    padding: 14px 24px;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 4px 24px rgba(var(--primary-rgb), .4);
    transition: background .2s, transform .2s;
    white-space: nowrap;
}
.sp-hero-float-btn:hover {
    background: var(--primary-600);
    transform: translateY(calc(-50% - 2px));
}

/* Ticker */
.sp-ticker {
    background: var(--primary-500);
    padding: 10px 0;
    overflow: hidden;
}
.sp-ticker-track {
    display: flex;
    gap: 28px;
    animation: spTicker 16s linear infinite;
    white-space: nowrap;
}
.sp-ticker-track span {
    font-size: .72rem;
    font-weight: 700;
    color: rgba(255,255,255,.9);
    flex-shrink: 0;
}
.sp-ticker-dot { color: rgba(255,255,255,.4); }
@keyframes spTicker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

/* Stats */
.sp-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border-subtle, #1f2937);
    border-top: 1px solid var(--border-subtle, #1f2937);
    border-bottom: 1px solid var(--border-subtle, #1f2937);
}
.sp-stat {
    background: var(--bg-primary);
    padding: 24px 16px;
    text-align: center;
}
.sp-stat-num {
    font-size: 2rem;
    font-weight: 900;
    color: var(--primary-400);
    line-height: 1;
}
.sp-stat-label {
    font-size: .68rem;
    color: var(--text-tertiary);
    margin-top: 6px;
    font-weight: 500;
}

/* Body 2-col */
.sp-body {
    max-width: 1040px;
    margin: 0 auto;
    padding: 64px 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
}
.sp-section-label {
    font-size: .65rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--primary-400);
    font-weight: 700;
    margin-bottom: 18px;
}

/* Sub-cards */
.sp-subcards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}
.sp-subcard {
    background: var(--surface-1, #111827);
    border: 1px solid var(--border-subtle, #1f2937);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color .2s, transform .2s;
}
.sp-subcard:hover {
    border-color: rgba(var(--primary-rgb), .4);
    transform: translateY(-2px);
}
.sp-subcard-thumb {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.9rem;
}
.sp-subcard-body { padding: 12px 14px 16px; }
.sp-subcard-title {
    font-size: .85rem;
    font-weight: 700;
    color: var(--text-primary);
}
.sp-subcard-text {
    font-size: .7rem;
    color: var(--text-tertiary);
    margin-top: 3px;
    line-height: 1.45;
}

/* FAQ */
.sp-faq-item {
    margin-bottom: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--border-subtle, #1f2937);
}
.sp-faq-item:last-child { border-bottom: none; margin-bottom: 0; }
.sp-faq-q {
    font-size: .88rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 7px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
}
.sp-faq-q::before {
    content: '?';
    background: rgba(var(--primary-rgb), .15);
    color: var(--primary-400);
    min-width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .65rem;
    font-weight: 900;
    flex-shrink: 0;
    margin-top: 1px;
}
.sp-faq-a {
    font-size: .78rem;
    color: var(--text-tertiary);
    line-height: 1.65;
    padding-left: 32px;
}

/* Marcas */
.sp-brands {
    max-width: 1040px;
    margin: 0 auto;
    padding: 0 24px 64px;
    border-top: 1px solid var(--border-subtle, #1f2937);
    padding-top: 40px;
}
.sp-brand-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 14px;
}
.sp-brand-pill {
    background: var(--surface-1, #111827);
    border: 1px solid var(--border-subtle, #1f2937);
    border-radius: 8px;
    padding: 10px 20px;
    font-size: .78rem;
    font-weight: 700;
    color: var(--text-secondary);
    letter-spacing: .06em;
}

/* CTA Final */
.sp-cta {
    background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e3a5f 100%);
    padding: 72px 24px;
    text-align: center;
    border-top: 1px solid var(--border-subtle, #1f2937);
}
.sp-cta-title {
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 900;
    color: #fff;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
}
.sp-cta-sub {
    font-size: .9rem;
    color: #6b7280;
    margin-bottom: 28px;
}
.sp-cta-btn {
    display: inline-block;
    background: var(--primary-500);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    padding: 14px 36px;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 4px 28px rgba(var(--primary-rgb), .38);
    transition: background .2s, transform .2s;
}
.sp-cta-btn:hover {
    background: var(--primary-600, #2563eb);
    transform: translateY(-2px);
}
.sp-cta-note {
    font-size: .72rem;
    color: #4b5563;
    margin-top: 14px;
}

/* Responsive */
@media (max-width: 900px) {
    .sp-hero { height: 360px; }
    .sp-hero-float-btn { display: none; }
    .sp-body { grid-template-columns: 1fr; padding: 48px 20px; gap: 40px; }
    .sp-stats { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 540px) {
    .sp-hero { height: 280px; }
    .sp-hero-title { font-size: 1.6rem; }
    .sp-hero-sub { display: none; }
    .sp-subcards { grid-template-columns: 1fr; }
    .sp-stats { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] Verificar en browser: abrir cualquier subpágina y confirmar que no hay errores CSS en consola.

- [ ] Commit:
```
git add styles.css
git commit -m "feat: add .sp-* CSS classes for service subpage template"
```

---

### Task 2: instalaciones-electricas.html

**Files:**
- Modify: `instalaciones-electricas.html` (rewrite completo)

- [ ] Reescribir el archivo completo:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instalaciones Eléctricas en Madrid | TEF — Autorizados Ministerio Industria</title>
    <meta name="description" content="Instaladores eléctricos autorizados en Madrid. Cuadros eléctricos, cableado completo y boletín CIE tramitado. Material Eaton y Legrand. Presupuesto en 24h.">
    <meta name="keywords" content="instalaciones eléctricas Madrid, electricistas Madrid, cuadros eléctricos, boletín eléctrico, instalador autorizado Madrid, Eaton, Legrand">
    <meta property="og:title" content="Instalaciones Eléctricas en Madrid | TEF">
    <meta property="og:description" content="Instaladores autorizados por el Ministerio de Industria. Cuadros, cableado y boletín CIE incluido. Presupuesto en 24h.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="images/servicio-electricidad.jpg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="particles-container" class="particles-container" aria-hidden="true"></div>

    <nav class="navbar pill-navbar" id="navbar" role="navigation" aria-label="Navegación principal">
        <div class="container nav-container">
            <a href="index.html" class="nav-logo" aria-label="TEF - Volver a Inicio">
                <img src="images/logofinaltef.png" alt="Logo TEF" class="logo-img">
            </a>
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

    <!-- HERO -->
    <div class="sp-hero">
        <img src="images/servicio-electricidad.jpg" alt="Cuadro eléctrico instalado por TEF en Madrid" class="sp-hero-img">
        <div class="sp-hero-overlay">
            <div class="sp-hero-text">
                <a href="index.html" style="display:inline-flex;align-items:center;gap:6px;color:#6b7280;font-size:.8rem;font-weight:600;text-decoration:none;margin-bottom:16px;">← Volver</a>
                <div class="hero-badge"><span class="badge-dot"></span>⚡ Instaladores autorizados · Madrid</div>
                <h1 class="sp-hero-title">Cuadros, cableado y boletín.<br><span>Todo incluido.</span></h1>
                <p class="sp-hero-sub">Instaladores autorizados por el Ministerio de Industria. Material Eaton y Legrand. Presupuesto sin visita en 24h.</p>
            </div>
        </div>
        <a href="chat.html" class="sp-hero-float-btn">Pedir presupuesto →</a>
    </div>

    <!-- TICKER -->
    <div class="sp-ticker">
        <div class="sp-ticker-track">
            <span>Cuadros eléctricos</span><span class="sp-ticker-dot">·</span>
            <span>Boletín CIE incluido</span><span class="sp-ticker-dot">·</span>
            <span>Material Eaton</span><span class="sp-ticker-dot">·</span>
            <span>Normativa RBT/ITC</span><span class="sp-ticker-dot">·</span>
            <span>Viviendas y locales</span><span class="sp-ticker-dot">·</span>
            <span>Naves industriales</span><span class="sp-ticker-dot">·</span>
            <span>Cuadros eléctricos</span><span class="sp-ticker-dot">·</span>
            <span>Boletín CIE incluido</span><span class="sp-ticker-dot">·</span>
            <span>Material Eaton</span><span class="sp-ticker-dot">·</span>
            <span>Normativa RBT/ITC</span><span class="sp-ticker-dot">·</span>
            <span>Viviendas y locales</span><span class="sp-ticker-dot">·</span>
            <span>Naves industriales</span><span class="sp-ticker-dot">·</span>
        </div>
    </div>

    <!-- STATS -->
    <div class="sp-stats">
        <div class="sp-stat"><div class="sp-stat-num">500+</div><div class="sp-stat-label">Instalaciones</div></div>
        <div class="sp-stat"><div class="sp-stat-num">11</div><div class="sp-stat-label">Años en Madrid</div></div>
        <div class="sp-stat"><div class="sp-stat-num">24h</div><div class="sp-stat-label">Presupuesto</div></div>
        <div class="sp-stat"><div class="sp-stat-num">5★</div><div class="sp-stat-label">Google Reviews</div></div>
    </div>

    <!-- BODY -->
    <div class="sp-body">
        <div>
            <div class="sp-section-label">Qué hacemos</div>
            <div class="sp-subcards">
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#1e3a5f,#1d4ed8);">🔌</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Cuadros eléctricos</div><div class="sp-subcard-text">Montaje, ampliación y legalización</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#064e3b,#059669);">🏠</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Viviendas</div><div class="sp-subcard-text">Cableado completo y reformas</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#3b1f5f,#7c3aed);">🏭</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Industrial</div><div class="sp-subcard-text">Naves, locales y acometidas</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#7c2d12,#ea580c);">📄</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Boletín CIE</div><div class="sp-subcard-text">Tramitación con Iberdrola</div></div>
                </div>
            </div>
        </div>
        <div>
            <div class="sp-section-label">Preguntas frecuentes</div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Cuánto cuesta cambiar un cuadro eléctrico en Madrid?</div>
                <div class="sp-faq-a">Desde 350 € con material Legrand o Eaton y boletín eléctrico incluido. Enviamos presupuesto sin visita previa en menos de 24h.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Tramitáis el boletín eléctrico vosotros?</div>
                <div class="sp-faq-a">Sí, gestionamos todo el papeleo con Iberdrola y las distribuidoras de la Comunidad de Madrid. No tienes que hacer nada.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Trabajáis en comunidades de vecinos?</div>
                <div class="sp-faq-a">Sí, somos instaladores de referencia en comunidades de Madrid: garajes, zonas comunes, ascensores y videoporteros.</div>
            </div>
        </div>
    </div>

    <!-- MARCAS -->
    <div class="sp-brands">
        <div class="sp-section-label">Marcas con las que trabajamos</div>
        <div class="sp-brand-row">
            <div class="sp-brand-pill">EATON</div>
            <div class="sp-brand-pill">LEGRAND</div>
            <div class="sp-brand-pill">SCHNEIDER</div>
            <div class="sp-brand-pill">ABB</div>
            <div class="sp-brand-pill">SIEMENS</div>
        </div>
    </div>

    <!-- CTA FINAL -->
    <div class="sp-cta">
        <div class="sp-cta-title">¿Tienes un proyecto eléctrico en Madrid?</div>
        <div class="sp-cta-sub">Presupuesto en el día · Sin visita previa · Boletín incluido</div>
        <a href="chat.html" class="sp-cta-btn">Hablar con un técnico →</a>
        <div class="sp-cta-note">Respondemos en menos de 2 horas · Lunes a viernes</div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

- [ ] Verificar visualmente en browser: hero visible, ticker animado, 4 stats, subcards, FAQ, marcas, CTA.

- [ ] Commit:
```
git add instalaciones-electricas.html
git commit -m "feat: redesign instalaciones-electricas subpage (C+B layout, Madrid content)"
```

---

### Task 3: fibra-optica.html

**Files:**
- Modify: `fibra-optica.html` (rewrite completo)

- [ ] Reescribir con el mismo template, contenido de fibra:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instalación Fibra Óptica en Madrid | TEF — 24h Sin Obras</title>
    <meta name="description" content="Instalación de fibra óptica y redes de datos en Madrid en 24h. Cableado estructurado, racks y patch panels. Todos los operadores. Sin perforaciones innecesarias.">
    <meta name="keywords" content="fibra óptica Madrid, instalación fibra Madrid, cableado estructurado Madrid, redes de datos, instalador fibra">
    <meta property="og:title" content="Fibra Óptica y Redes de Datos en Madrid | TEF">
    <meta property="og:description" content="Instalación de fibra en 24h con cualquier operador en Madrid. Sin obras, sin esperas.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="images/servicio-fibra.jpg">
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
        <img src="images/servicio-fibra.jpg" alt="Rack de fibra óptica instalado por TEF en Madrid" class="sp-hero-img">
        <div class="sp-hero-overlay">
            <div class="sp-hero-text">
                <a href="index.html" style="display:inline-flex;align-items:center;gap:6px;color:#6b7280;font-size:.8rem;font-weight:600;text-decoration:none;margin-bottom:16px;">← Volver</a>
                <div class="hero-badge"><span class="badge-dot"></span>🌐 Fibra óptica · Madrid</div>
                <h1 class="sp-hero-title">Fibra en 24h.<br><span>Sin obras, sin esperas.</span></h1>
                <p class="sp-hero-sub">Instalación con cualquier operador en Madrid. Cableado estructurado, racks y fibra hasta cada puesto.</p>
            </div>
        </div>
        <a href="chat.html" class="sp-hero-float-btn">Pedir presupuesto →</a>
    </div>
    <div class="sp-ticker">
        <div class="sp-ticker-track">
            <span>Fibra óptica</span><span class="sp-ticker-dot">·</span>
            <span>Cableado estructurado</span><span class="sp-ticker-dot">·</span>
            <span>Racks y patch panels</span><span class="sp-ticker-dot">·</span>
            <span>24h instalación</span><span class="sp-ticker-dot">·</span>
            <span>Sin perforaciones</span><span class="sp-ticker-dot">·</span>
            <span>Todos los operadores</span><span class="sp-ticker-dot">·</span>
            <span>Fibra óptica</span><span class="sp-ticker-dot">·</span>
            <span>Cableado estructurado</span><span class="sp-ticker-dot">·</span>
            <span>Racks y patch panels</span><span class="sp-ticker-dot">·</span>
            <span>24h instalación</span><span class="sp-ticker-dot">·</span>
            <span>Sin perforaciones</span><span class="sp-ticker-dot">·</span>
            <span>Todos los operadores</span><span class="sp-ticker-dot">·</span>
        </div>
    </div>
    <div class="sp-stats">
        <div class="sp-stat"><div class="sp-stat-num">300+</div><div class="sp-stat-label">Instalaciones</div></div>
        <div class="sp-stat"><div class="sp-stat-num">11</div><div class="sp-stat-label">Años en Madrid</div></div>
        <div class="sp-stat"><div class="sp-stat-num">24h</div><div class="sp-stat-label">Instalación</div></div>
        <div class="sp-stat"><div class="sp-stat-num">5★</div><div class="sp-stat-label">Google Reviews</div></div>
    </div>
    <div class="sp-body">
        <div>
            <div class="sp-section-label">Qué hacemos</div>
            <div class="sp-subcards">
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#064e3b,#059669);">🏠</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Fibra al hogar</div><div class="sp-subcard-text">Todos los operadores, sin obras</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#1e3a5f,#1d4ed8);">🏢</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Redes de empresa</div><div class="sp-subcard-text">Oficinas, locales y naves</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#3b1f5f,#7c3aed);">🖥️</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Racks y cableado</div><div class="sp-subcard-text">Patch panels y estructurado Cat6A</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#7c2d12,#ea580c);">📡</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">WiFi empresarial</div><div class="sp-subcard-text">Cobertura total sin puntos muertos</div></div>
                </div>
            </div>
        </div>
        <div>
            <div class="sp-section-label">Preguntas frecuentes</div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Cuánto tarda la instalación de fibra?</div>
                <div class="sp-faq-a">La mayoría de instalaciones residenciales se completan en el mismo día. Para oficinas y redes estructuradas, en 24-48h según el tamaño.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Trabajáis con todos los operadores de fibra?</div>
                <div class="sp-faq-a">Sí, instalamos con Movistar, Orange, Vodafone, MásMóvil y cualquier operador que opere en Madrid. También para empresas con fibra dedicada.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Necesitáis hacer obras para pasar la fibra?</div>
                <div class="sp-faq-a">En la mayoría de casos no. Usamos canaletas y técnicas de instalación invisible que evitan perforaciones y obras innecesarias.</div>
            </div>
        </div>
    </div>
    <div class="sp-brands">
        <div class="sp-section-label">Marcas con las que trabajamos</div>
        <div class="sp-brand-row">
            <div class="sp-brand-pill">LEGRAND</div>
            <div class="sp-brand-pill">PANDUIT</div>
            <div class="sp-brand-pill">COMMSCOPE</div>
            <div class="sp-brand-pill">UBIQUITI</div>
        </div>
    </div>
    <div class="sp-cta">
        <div class="sp-cta-title">¿Necesitas fibra o red en Madrid?</div>
        <div class="sp-cta-sub">Instalación en 24h · Sin obras · Todos los operadores</div>
        <a href="chat.html" class="sp-cta-btn">Hablar con un técnico →</a>
        <div class="sp-cta-note">Respondemos en menos de 2 horas · Lunes a viernes</div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

- [ ] Commit:
```
git add fibra-optica.html
git commit -m "feat: redesign fibra-optica subpage (C+B layout, Madrid content)"
```

---

### Task 4: antenas-tv.html

**Files:**
- Modify: `antenas-tv.html` (rewrite completo)

- [ ] Reescribir:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instalación Antenas TDT y Parabólicas en Madrid | TEF</title>
    <meta name="description" content="Instalación y reparación de antenas TDT, parabólicas y distribución comunitaria en Madrid. Medición de campo incluida. Presupuesto en 48h.">
    <meta name="keywords" content="antenas TDT Madrid, antenas parabólicas Madrid, instalador antenas Madrid, distribución TV comunidades, reparación antena Madrid">
    <meta property="og:title" content="Antenas TDT y Parabólicas en Madrid | TEF">
    <meta property="og:description" content="Instalación y reparación de antenas con medición de campo en Madrid. TDT, satélite y distribución comunitaria.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="images/servicio-antenas.jpg">
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
        <img src="images/servicio-antenas.jpg" alt="Técnico TEF instalando antena en tejado en Madrid" class="sp-hero-img">
        <div class="sp-hero-overlay">
            <div class="sp-hero-text">
                <a href="index.html" style="display:inline-flex;align-items:center;gap:6px;color:#6b7280;font-size:.8rem;font-weight:600;text-decoration:none;margin-bottom:16px;">← Volver</a>
                <div class="hero-badge"><span class="badge-dot"></span>📡 Antenas y TV · Madrid</div>
                <h1 class="sp-hero-title">TDT, satélite y<br><span>señal perfecta.</span></h1>
                <p class="sp-hero-sub">Instalación y reparación con medición de campo profesional en Madrid. Viviendas y comunidades de vecinos.</p>
            </div>
        </div>
        <a href="chat.html" class="sp-hero-float-btn">Pedir presupuesto →</a>
    </div>
    <div class="sp-ticker">
        <div class="sp-ticker-track">
            <span>Antenas TDT</span><span class="sp-ticker-dot">·</span>
            <span>Satélite</span><span class="sp-ticker-dot">·</span>
            <span>Distribución comunitaria</span><span class="sp-ticker-dot">·</span>
            <span>Amplificadores de señal</span><span class="sp-ticker-dot">·</span>
            <span>Medición de campo</span><span class="sp-ticker-dot">·</span>
            <span>Madrid</span><span class="sp-ticker-dot">·</span>
            <span>Antenas TDT</span><span class="sp-ticker-dot">·</span>
            <span>Satélite</span><span class="sp-ticker-dot">·</span>
            <span>Distribución comunitaria</span><span class="sp-ticker-dot">·</span>
            <span>Amplificadores de señal</span><span class="sp-ticker-dot">·</span>
            <span>Medición de campo</span><span class="sp-ticker-dot">·</span>
            <span>Madrid</span><span class="sp-ticker-dot">·</span>
        </div>
    </div>
    <div class="sp-stats">
        <div class="sp-stat"><div class="sp-stat-num">400+</div><div class="sp-stat-label">Instalaciones</div></div>
        <div class="sp-stat"><div class="sp-stat-num">11</div><div class="sp-stat-label">Años en Madrid</div></div>
        <div class="sp-stat"><div class="sp-stat-num">48h</div><div class="sp-stat-label">Instalación</div></div>
        <div class="sp-stat"><div class="sp-stat-num">5★</div><div class="sp-stat-label">Google Reviews</div></div>
    </div>
    <div class="sp-body">
        <div>
            <div class="sp-section-label">Qué hacemos</div>
            <div class="sp-subcards">
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#1e3a5f,#1d4ed8);">📺</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Antenas TDT</div><div class="sp-subcard-text">Instalación y reparación con medición</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#064e3b,#059669);">🛰️</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Parabólicas</div><div class="sp-subcard-text">Satélite y canales internacionales</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#3b1f5f,#7c3aed);">🏢</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Comunidades</div><div class="sp-subcard-text">Distribución a todos los vecinos</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#7c2d12,#ea580c);">📶</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Amplificadores</div><div class="sp-subcard-text">Señal perfecta en toda la vivienda</div></div>
                </div>
            </div>
        </div>
        <div>
            <div class="sp-section-label">Preguntas frecuentes</div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Podéis reparar la señal sin cambiar la antena?</div>
                <div class="sp-faq-a">Sí, hacemos medición de campo para diagnosticar el problema exacto. Muchas veces se soluciona limpiando conexiones o cambiando el amplificador, sin tocar la antena.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Instaláis en comunidades de vecinos?</div>
                <div class="sp-faq-a">Sí, somos especialistas en sistemas de distribución comunitaria. Instalamos la antena y el cableado hasta cada vivienda con señal garantizada.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Cuánto cuesta instalar una antena TDT en Madrid?</div>
                <div class="sp-faq-a">Desde 120 € para una instalación básica en vivienda. El precio varía según altura, acceso al tejado y número de puntos de TV. Presupuesto sin compromiso en 24h.</div>
            </div>
        </div>
    </div>
    <div class="sp-brands">
        <div class="sp-section-label">Marcas con las que trabajamos</div>
        <div class="sp-brand-row">
            <div class="sp-brand-pill">TELEVES</div>
            <div class="sp-brand-pill">IKUSI</div>
            <div class="sp-brand-pill">FRACARRO</div>
            <div class="sp-brand-pill">WISI</div>
        </div>
    </div>
    <div class="sp-cta">
        <div class="sp-cta-title">¿Problemas con la señal en Madrid?</div>
        <div class="sp-cta-sub">Diagnóstico gratuito · Medición de campo · Presupuesto en 24h</div>
        <a href="chat.html" class="sp-cta-btn">Hablar con un técnico →</a>
        <div class="sp-cta-note">Respondemos en menos de 2 horas · Lunes a viernes</div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

- [ ] Commit:
```
git add antenas-tv.html
git commit -m "feat: redesign antenas-tv subpage (C+B layout, Madrid content)"
```

---

### Task 5: domotica.html

**Files:**
- Modify: `domotica.html` (rewrite completo)

- [ ] Reescribir:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Domótica y Videoporteros en Madrid | TEF — KNX y Fermax</title>
    <meta name="description" content="Instalación de domótica KNX y videoporteros Fermax en Madrid. Iluminación inteligente, persianas automáticas y control desde el móvil. Presupuesto en 72h.">
    <meta name="keywords" content="domótica Madrid, videoporteros Madrid, KNX Madrid, Fermax Madrid, hogar inteligente Madrid, instalación domótica">
    <meta property="og:title" content="Domótica y Videoporteros en Madrid | TEF">
    <meta property="og:description" content="Videoporteros Fermax, domótica KNX e iluminación inteligente en Madrid. Control total desde el móvil.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="images/servicio-domotica.jpg">
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
        <img src="images/servicio-domotica.jpg" alt="Videoportero Fermax instalado por TEF en Madrid" class="sp-hero-img">
        <div class="sp-hero-overlay">
            <div class="sp-hero-text">
                <a href="index.html" style="display:inline-flex;align-items:center;gap:6px;color:#6b7280;font-size:.8rem;font-weight:600;text-decoration:none;margin-bottom:16px;">← Volver</a>
                <div class="hero-badge"><span class="badge-dot"></span>🏠 Domótica · Madrid</div>
                <h1 class="sp-hero-title">Tu hogar inteligente,<br><span>sin complicaciones.</span></h1>
                <p class="sp-hero-sub">Videoporteros, iluminación y clima controlados desde el móvil. KNX, Fermax y Legrand instalados por técnicos certificados en Madrid.</p>
            </div>
        </div>
        <a href="chat.html" class="sp-hero-float-btn">Pedir presupuesto →</a>
    </div>
    <div class="sp-ticker">
        <div class="sp-ticker-track">
            <span>Domótica KNX</span><span class="sp-ticker-dot">·</span>
            <span>Videoporteros Fermax</span><span class="sp-ticker-dot">·</span>
            <span>Iluminación inteligente</span><span class="sp-ticker-dot">·</span>
            <span>Persianas automáticas</span><span class="sp-ticker-dot">·</span>
            <span>Control desde móvil</span><span class="sp-ticker-dot">·</span>
            <span>Madrid</span><span class="sp-ticker-dot">·</span>
            <span>Domótica KNX</span><span class="sp-ticker-dot">·</span>
            <span>Videoporteros Fermax</span><span class="sp-ticker-dot">·</span>
            <span>Iluminación inteligente</span><span class="sp-ticker-dot">·</span>
            <span>Persianas automáticas</span><span class="sp-ticker-dot">·</span>
            <span>Control desde móvil</span><span class="sp-ticker-dot">·</span>
            <span>Madrid</span><span class="sp-ticker-dot">·</span>
        </div>
    </div>
    <div class="sp-stats">
        <div class="sp-stat"><div class="sp-stat-num">150+</div><div class="sp-stat-label">Instalaciones</div></div>
        <div class="sp-stat"><div class="sp-stat-num">11</div><div class="sp-stat-label">Años en Madrid</div></div>
        <div class="sp-stat"><div class="sp-stat-num">72h</div><div class="sp-stat-label">Instalación</div></div>
        <div class="sp-stat"><div class="sp-stat-num">5★</div><div class="sp-stat-label">Google Reviews</div></div>
    </div>
    <div class="sp-body">
        <div>
            <div class="sp-section-label">Qué hacemos</div>
            <div class="sp-subcards">
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#1e3a5f,#1d4ed8);">🔔</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Videoporteros</div><div class="sp-subcard-text">Fermax y Legrand con app móvil</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#064e3b,#059669);">💡</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Iluminación KNX</div><div class="sp-subcard-text">Escenas y automatización total</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#3b1f5f,#7c3aed);">🪟</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Persianas</div><div class="sp-subcard-text">Motores y control centralizado</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#7c2d12,#ea580c);">📱</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Control móvil</div><div class="sp-subcard-text">App para iOS y Android</div></div>
                </div>
            </div>
        </div>
        <div>
            <div class="sp-section-label">Preguntas frecuentes</div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Qué es KNX y para qué sirve?</div>
                <div class="sp-faq-a">KNX es el estándar europeo de domótica. Permite controlar iluminación, persianas, clima y más desde un único sistema estable y duradero, sin depender de internet.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Se puede integrar con Alexa o Google Home?</div>
                <div class="sp-faq-a">Sí, los sistemas que instalamos son compatibles con los principales asistentes de voz. Puedes controlar luces, persianas y clima con comandos de voz.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Puedo abrir la puerta de mi comunidad desde el móvil?</div>
                <div class="sp-faq-a">Sí, los videoporteros Fermax que instalamos tienen app para iOS y Android. Ves quién llama, hablas y abres la puerta desde cualquier parte del mundo.</div>
            </div>
        </div>
    </div>
    <div class="sp-brands">
        <div class="sp-section-label">Marcas con las que trabajamos</div>
        <div class="sp-brand-row">
            <div class="sp-brand-pill">FERMAX</div>
            <div class="sp-brand-pill">LEGRAND</div>
            <div class="sp-brand-pill">KNX</div>
            <div class="sp-brand-pill">JUNG</div>
            <div class="sp-brand-pill">SIMON</div>
        </div>
    </div>
    <div class="sp-cta">
        <div class="sp-cta-title">¿Quieres domótica en tu hogar de Madrid?</div>
        <div class="sp-cta-sub">Presupuesto personalizado · Sin compromiso · Técnicos certificados KNX</div>
        <a href="chat.html" class="sp-cta-btn">Hablar con un técnico →</a>
        <div class="sp-cta-note">Respondemos en menos de 2 horas · Lunes a viernes</div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

- [ ] Commit:
```
git add domotica.html
git commit -m "feat: redesign domotica subpage (C+B layout, Madrid content)"
```

---

### Task 6: obra-nueva.html

**Files:**
- Modify: `obra-nueva.html` (rewrite completo)

- [ ] Reescribir:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instalaciones en Obra Nueva y Reformas en Madrid | TEF</title>
    <meta name="description" content="Proyecto eléctrico y telecomunicaciones completo en obra nueva y reformas en Madrid. Llave en mano: diseño, ejecución y boletín incluido.">
    <meta name="keywords" content="obra nueva Madrid, instalaciones eléctricas obra nueva Madrid, reformas eléctricas Madrid, proyecto eléctrico Madrid, instalador obra nueva">
    <meta property="og:title" content="Obra Nueva y Reformas en Madrid | TEF">
    <meta property="og:description" content="Proyecto eléctrico y telecomunicaciones completo, llave en mano, en obra nueva y reformas en Madrid.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="images/servicio-obra-nueva.jpg">
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
        <img src="images/servicio-obra-nueva.jpg" alt="Instalación eléctrica en obra nueva en Madrid por TEF" class="sp-hero-img">
        <div class="sp-hero-overlay">
            <div class="sp-hero-text">
                <a href="index.html" style="display:inline-flex;align-items:center;gap:6px;color:#6b7280;font-size:.8rem;font-weight:600;text-decoration:none;margin-bottom:16px;">← Volver</a>
                <div class="hero-badge"><span class="badge-dot"></span>🏗️ Obra nueva · Madrid</div>
                <h1 class="sp-hero-title">Proyecto completo,<br><span>llave en mano.</span></h1>
                <p class="sp-hero-sub">Eléctrico, telecomunicaciones y boletín desde cero. Trabajamos con constructoras y particulares en toda la Comunidad de Madrid.</p>
            </div>
        </div>
        <a href="chat.html" class="sp-hero-float-btn">Pedir presupuesto →</a>
    </div>
    <div class="sp-ticker">
        <div class="sp-ticker-track">
            <span>Obra nueva</span><span class="sp-ticker-dot">·</span>
            <span>Reformas integrales</span><span class="sp-ticker-dot">·</span>
            <span>Proyecto eléctrico</span><span class="sp-ticker-dot">·</span>
            <span>Telecomunicaciones</span><span class="sp-ticker-dot">·</span>
            <span>Boletín incluido</span><span class="sp-ticker-dot">·</span>
            <span>Madrid</span><span class="sp-ticker-dot">·</span>
            <span>Obra nueva</span><span class="sp-ticker-dot">·</span>
            <span>Reformas integrales</span><span class="sp-ticker-dot">·</span>
            <span>Proyecto eléctrico</span><span class="sp-ticker-dot">·</span>
            <span>Telecomunicaciones</span><span class="sp-ticker-dot">·</span>
            <span>Boletín incluido</span><span class="sp-ticker-dot">·</span>
            <span>Madrid</span><span class="sp-ticker-dot">·</span>
        </div>
    </div>
    <div class="sp-stats">
        <div class="sp-stat"><div class="sp-stat-num">200+</div><div class="sp-stat-label">Proyectos</div></div>
        <div class="sp-stat"><div class="sp-stat-num">11</div><div class="sp-stat-label">Años en Madrid</div></div>
        <div class="sp-stat"><div class="sp-stat-num">48h</div><div class="sp-stat-label">Presupuesto</div></div>
        <div class="sp-stat"><div class="sp-stat-num">5★</div><div class="sp-stat-label">Google Reviews</div></div>
    </div>
    <div class="sp-body">
        <div>
            <div class="sp-section-label">Qué hacemos</div>
            <div class="sp-subcards">
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#1e3a5f,#1d4ed8);">⚡</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Proyecto eléctrico</div><div class="sp-subcard-text">Diseño, ejecución y certificación</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#064e3b,#059669);">📡</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Telecomunicaciones</div><div class="sp-subcard-text">Fibra, antenas y red estructurada</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#3b1f5f,#7c3aed);">🏠</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Domótica integrada</div><div class="sp-subcard-text">Preparada desde la obra</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#7c2d12,#ea580c);">📄</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Certificación</div><div class="sp-subcard-text">Boletín y legalizaciones incluidas</div></div>
                </div>
            </div>
        </div>
        <div>
            <div class="sp-section-label">Preguntas frecuentes</div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Trabajáis con constructoras y promotoras?</div>
                <div class="sp-faq-a">Sí, somos subcontratistas habituales de constructoras en Madrid. Nos adaptamos a cronogramas de obra y coordinamos con otros gremios.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Hacéis el proyecto y la ejecución?</div>
                <div class="sp-faq-a">Sí, hacemos el proyecto técnico, la instalación completa y la certificación final con boletín. Un único interlocutor para todo el proceso.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿El boletín eléctrico está incluido en el precio?</div>
                <div class="sp-faq-a">Sí, tramitamos el boletín eléctrico (CIE) con las distribuidoras de Madrid sin coste adicional. Está incluido en todos nuestros proyectos de obra nueva.</div>
            </div>
        </div>
    </div>
    <div class="sp-brands">
        <div class="sp-section-label">Marcas con las que trabajamos</div>
        <div class="sp-brand-row">
            <div class="sp-brand-pill">EATON</div>
            <div class="sp-brand-pill">LEGRAND</div>
            <div class="sp-brand-pill">FERMAX</div>
            <div class="sp-brand-pill">TELEVES</div>
            <div class="sp-brand-pill">SCHNEIDER</div>
        </div>
    </div>
    <div class="sp-cta">
        <div class="sp-cta-title">¿Tienes una obra en Madrid?</div>
        <div class="sp-cta-sub">Presupuesto en 48h · Llave en mano · Boletín incluido</div>
        <a href="chat.html" class="sp-cta-btn">Hablar con un técnico →</a>
        <div class="sp-cta-note">Respondemos en menos de 2 horas · Lunes a viernes</div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

- [ ] Commit:
```
git add obra-nueva.html
git commit -m "feat: redesign obra-nueva subpage (C+B layout, Madrid content)"
```

---

### Task 7: seguridad-videovigilancia.html

**Files:**
- Modify: `seguridad-videovigilancia.html` (rewrite completo)

- [ ] Reescribir:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cámaras de Seguridad y CCTV en Madrid | TEF — Dahua</title>
    <meta name="description" content="Instalación de cámaras de seguridad y CCTV Dahua en Madrid. Visión nocturna real, grabación 24/7 y control desde el móvil. Presupuesto en 48h.">
    <meta name="keywords" content="cámaras seguridad Madrid, CCTV Madrid, videovigilancia Madrid, Dahua Madrid, instalador cámaras Madrid, seguridad comunidades Madrid">
    <meta property="og:title" content="Cámaras de Seguridad CCTV en Madrid | TEF">
    <meta property="og:description" content="Cámaras Dahua con visión nocturna real y acceso desde el móvil 24/7 en Madrid. Presupuesto en 48h.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="images/servicio-cctv.jpg">
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
        <img src="images/servicio-cctv.jpg" alt="Cámara de seguridad Dahua instalada por TEF en Madrid" class="sp-hero-img">
        <div class="sp-hero-overlay">
            <div class="sp-hero-text">
                <a href="index.html" style="display:inline-flex;align-items:center;gap:6px;color:#6b7280;font-size:.8rem;font-weight:600;text-decoration:none;margin-bottom:16px;">← Volver</a>
                <div class="hero-badge"><span class="badge-dot"></span>📹 Cámaras CCTV · Madrid</div>
                <h1 class="sp-hero-title">Visión nocturna real.<br><span>Control desde el móvil.</span></h1>
                <p class="sp-hero-sub">Cámaras Dahua con acceso 24/7 desde cualquier parte del mundo. Grabación continua, detección de movimiento y alertas en tiempo real.</p>
            </div>
        </div>
        <a href="chat.html" class="sp-hero-float-btn">Pedir presupuesto →</a>
    </div>
    <div class="sp-ticker">
        <div class="sp-ticker-track">
            <span>Cámaras CCTV</span><span class="sp-ticker-dot">·</span>
            <span>Dahua</span><span class="sp-ticker-dot">·</span>
            <span>Visión nocturna</span><span class="sp-ticker-dot">·</span>
            <span>Control desde móvil</span><span class="sp-ticker-dot">·</span>
            <span>Grabación 24/7</span><span class="sp-ticker-dot">·</span>
            <span>Madrid</span><span class="sp-ticker-dot">·</span>
            <span>Cámaras CCTV</span><span class="sp-ticker-dot">·</span>
            <span>Dahua</span><span class="sp-ticker-dot">·</span>
            <span>Visión nocturna</span><span class="sp-ticker-dot">·</span>
            <span>Control desde móvil</span><span class="sp-ticker-dot">·</span>
            <span>Grabación 24/7</span><span class="sp-ticker-dot">·</span>
            <span>Madrid</span><span class="sp-ticker-dot">·</span>
        </div>
    </div>
    <div class="sp-stats">
        <div class="sp-stat"><div class="sp-stat-num">200+</div><div class="sp-stat-label">Instalaciones</div></div>
        <div class="sp-stat"><div class="sp-stat-num">11</div><div class="sp-stat-label">Años en Madrid</div></div>
        <div class="sp-stat"><div class="sp-stat-num">48h</div><div class="sp-stat-label">Instalación</div></div>
        <div class="sp-stat"><div class="sp-stat-num">5★</div><div class="sp-stat-label">Google Reviews</div></div>
    </div>
    <div class="sp-body">
        <div>
            <div class="sp-section-label">Qué hacemos</div>
            <div class="sp-subcards">
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#1e3a5f,#1d4ed8);">🏠</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Cámaras exteriores</div><div class="sp-subcard-text">Visión nocturna y resistencia IP67</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#064e3b,#059669);">🏢</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Cámaras interiores</div><div class="sp-subcard-text">Domo y bullet para interiores</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#3b1f5f,#7c3aed);">☁️</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Grabación en nube</div><div class="sp-subcard-text">NVR local y almacenamiento cloud</div></div>
                </div>
                <div class="sp-subcard">
                    <div class="sp-subcard-thumb" style="background:linear-gradient(135deg,#7c2d12,#ea580c);">📱</div>
                    <div class="sp-subcard-body"><div class="sp-subcard-title">Control móvil</div><div class="sp-subcard-text">App Dahua DMSS para iOS y Android</div></div>
                </div>
            </div>
        </div>
        <div>
            <div class="sp-section-label">Preguntas frecuentes</div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Puedo ver las cámaras desde el móvil?</div>
                <div class="sp-faq-a">Sí, con la app Dahua DMSS accedes en tiempo real a todas tus cámaras desde cualquier parte del mundo, con iOS y Android.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Cuánto tiempo se guarda la grabación?</div>
                <div class="sp-faq-a">Depende del disco instalado. Con un NVR de 2TB y 4 cámaras en Full HD tienes aproximadamente 30 días de grabación continua.</div>
            </div>
            <div class="sp-faq-item">
                <div class="sp-faq-q">¿Instaláis en comunidades de vecinos?</div>
                <div class="sp-faq-a">Sí, hacemos instalaciones completas en comunidades: portal, garaje, zonas comunes y perímetro exterior, con un solo sistema centralizado.</div>
            </div>
        </div>
    </div>
    <div class="sp-brands">
        <div class="sp-section-label">Marcas con las que trabajamos</div>
        <div class="sp-brand-row">
            <div class="sp-brand-pill">DAHUA</div>
            <div class="sp-brand-pill">HIKVISION</div>
            <div class="sp-brand-pill">AJAX</div>
            <div class="sp-brand-pill">HANWHA</div>
        </div>
    </div>
    <div class="sp-cta">
        <div class="sp-cta-title">¿Quieres proteger tu negocio o comunidad en Madrid?</div>
        <div class="sp-cta-sub">Presupuesto en 48h · Instalación profesional · Garantía 2 años</div>
        <a href="chat.html" class="sp-cta-btn">Hablar con un técnico →</a>
        <div class="sp-cta-note">Respondemos en menos de 2 horas · Lunes a viernes</div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

- [ ] Commit:
```
git add seguridad-videovigilancia.html
git commit -m "feat: redesign seguridad-videovigilancia subpage (C+B layout, Madrid content)"
```

---

### Task 8: Commit final y push

- [ ] Push todo a GitHub:
```
git push
```

- [ ] Verificar en GitHub que los 6 archivos HTML y styles.css están actualizados.
