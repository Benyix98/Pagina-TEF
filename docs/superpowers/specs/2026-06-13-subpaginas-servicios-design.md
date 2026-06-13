# Diseño: Subpáginas de Servicios TEF
**Fecha:** 2026-06-13  
**Estado:** Aprobado

## Resumen

Rediseño de las 6 subpáginas de servicios de TEF (Madrid). Mismo template para las 6, contenido escrito por Claude, corrección de referencias a Vigo/Galicia → Madrid.

## Layout (Mix C+B aprobado)

Orden de secciones en cada subpágina:

1. **Hero** — imagen de fondo (foto IA generada) + overlay oscuro + badge + título impactante + subtítulo + botón flotante "Pedir presupuesto →"
2. **Ticker** — barra azul con keywords del servicio animados de derecha a izquierda
3. **Stats bar** — 4 métricas: instalaciones realizadas · años en Madrid · tiempo presupuesto · valoración Google
4. **Body (2 columnas)**
   - Izquierda: 4 sub-cards visuales con gradiente de color + icono + subtipo + descripción breve
   - Derecha: 3 preguntas FAQ específicas del servicio con respuestas orientadas a conversión
5. **Marcas** — pills con las marcas que usa TEF en ese servicio
6. **CTA final** — gradiente oscuro + texto de cierre + botón principal + nota "Respondemos en 2h"

## Implementación técnica

- **Template único** en HTML: las 6 páginas comparten el mismo esqueleto, solo cambia el contenido
- **CSS**: añadir clases nuevas al `styles.css` compartido (prefijo `.sp-`)
- **Imágenes hero**: usar las 6 fotos IA ya generadas (`servicio-electricidad.jpg`, etc.)
- **Sin JS nuevo**: reutilizar `script.js` existente para partículas y navbar
- **Corregir en todos los archivos**: título `<title>`, meta description, og:title, og:description, og:image, keywords → todos con "Madrid" en lugar de "Vigo/Galicia"

## Contenido por servicio

### 1. Instalaciones Eléctricas (`instalaciones-electricas.html`)
- **Hero**: "Cuadros, cableado y boletín. Todo incluido." / "Instaladores autorizados por el Ministerio de Industria."
- **Ticker**: Cuadros eléctricos · Boletín CIE incluido · Material Eaton · Normativa RBT/ITC · Viviendas · Naves industriales
- **Stats**: 500+ instalaciones · 11 años en Madrid · 24h presupuesto · 5★ Google
- **Sub-cards**: Cuadros eléctricos / Viviendas / Industrial / Boletín CIE
- **FAQ**: ¿Cuánto cuesta cambiar un cuadro? / ¿Tramitáis el boletín? / ¿Trabajáis en comunidades?
- **Marcas**: EATON · LEGRAND · SCHNEIDER · ABB · SIEMENS
- **Imagen**: `servicio-electricidad.jpg`

### 2. Fibra Óptica (`fibra-optica.html`)
- **Hero**: "Fibra en 24h. Sin obras, sin esperas." / "Instalación con cualquier operador en Madrid."
- **Ticker**: Fibra óptica · Cableado estructurado · Racks y patch panels · 24h instalación · Sin perforaciones · Todos los operadores
- **Stats**: 300+ instalaciones · 11 años en Madrid · 24h instalación · 5★ Google
- **Sub-cards**: Fibra hasta el hogar / Redes de empresa / Racks y cableado / Repetidores WiFi
- **FAQ**: ¿Cuánto tarda la instalación? / ¿Trabajáis con todos los operadores? / ¿Necesitáis hacer obras?
- **Marcas**: LEGRAND · PANDUIT · COMMSCOPE · UBIQUITI
- **Imagen**: `servicio-fibra.jpg`

### 3. Antenas y TV (`antenas-tv.html`)
- **Hero**: "TDT, satélite y señal perfecta." / "Instalación y reparación con medición de campo en Madrid."
- **Ticker**: Antenas TDT · Satélite · Distribución comunitaria · Amplificadores · Medición de campo · Madrid
- **Stats**: 400+ instalaciones · 11 años en Madrid · 48h instalación · 5★ Google
- **Sub-cards**: Antenas TDT / Antenas parabólicas / Comunidades de vecinos / Amplificadores de señal
- **FAQ**: ¿Reparáis la señal sin cambiar la antena? / ¿Instaláis en comunidades? / ¿Cuánto cuesta una antena TDT?
- **Marcas**: TELEVES · IKUSI · FRACARRO · WISI
- **Imagen**: `servicio-antenas.jpg`

### 4. Domótica y Videoporteros (`domotica.html`)
- **Hero**: "Tu hogar inteligente, sin complicaciones." / "Videoporteros, iluminación y clima desde el móvil."
- **Ticker**: Domótica KNX · Videoporteros · Iluminación inteligente · Persianas · Control móvil · Fermax · Legrand
- **Stats**: 150+ instalaciones · 11 años en Madrid · 72h instalación · 5★ Google
- **Sub-cards**: Videoporteros / Iluminación KNX / Persianas automáticas / Control por móvil
- **FAQ**: ¿Qué es KNX y para qué sirve? / ¿Se puede integrar con Alexa o Google Home? / ¿Puedo abrir la puerta desde el móvil?
- **Marcas**: FERMAX · LEGRAND · KNX · JUNG · SIMON
- **Imagen**: `servicio-domotica.jpg`

### 5. Obra Nueva y Reformas (`obra-nueva.html`)
- **Hero**: "Proyecto completo, llave en mano." / "Eléctrico, telecomunicaciones y boletín desde cero."
- **Ticker**: Obra nueva · Reformas integrales · Proyecto eléctrico · Telecomunicaciones · Boletín incluido · Madrid
- **Stats**: 200+ proyectos · 11 años en Madrid · Presupuesto en 48h · 5★ Google
- **Sub-cards**: Proyecto eléctrico / Telecomunicaciones / Domótica integrada / Certificación y boletín
- **FAQ**: ¿Trabajáis con constructoras? / ¿Hacéis el proyecto y la ejecución? / ¿Incluís el boletín eléctrico?
- **Marcas**: EATON · LEGRAND · FERMAX · TELEVES · SCHNEIDER
- **Imagen**: `servicio-obra-nueva.jpg`

### 6. Cámaras y CCTV (`seguridad-videovigilancia.html`)
- **Hero**: "Visión nocturna real. Control desde el móvil." / "Cámaras Dahua con acceso 24/7 desde cualquier lugar."
- **Ticker**: Cámaras CCTV · Dahua · Visión nocturna · Control desde móvil · Grabación 24/7 · Madrid
- **Stats**: 200+ instalaciones · 11 años en Madrid · 48h instalación · 5★ Google
- **Sub-cards**: Cámaras exteriores / Cámaras interiores / Grabación en nube / Control desde móvil
- **FAQ**: ¿Puedo ver las cámaras desde el móvil? / ¿Cuánto tiempo se guarda la grabación? / ¿Instaláis en comunidades?
- **Marcas**: DAHUA · HIKVISION · AJAX · HANWHA
- **Imagen**: `servicio-cctv.jpg`

## SEO — correcciones en todos los archivos

- `<title>`: incluir "Madrid" y el servicio específico
- `meta description`: mencionar Madrid, servicio, beneficio clave
- `keywords`: eliminar Vigo/Galicia, añadir Madrid/Comunidad de Madrid
- `og:image`: actualizar a la imagen IA correspondiente
