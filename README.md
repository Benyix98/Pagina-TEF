# TEF - Telecomunicaciones e Instalaciones Eléctricas

Sitio web profesional de TEF, especialistas en telecomunicaciones e instalaciones eléctricas.

## 🎨 Paleta de Colores

| Variable | Valor | Uso |
|---------|-------|-----|
| `--primary-500` | `#3B82F6` | Azul eléctrico principal |
| `--bg-primary` | `#000000` | Fondo principal |
| `--bg-secondary` | `#09090B` | Fondo secciones alternas |
| `--text-primary` | `#FFFFFF` | Texto principal |

## 📁 Estructura del Proyecto

```
Pagina TEF/
├── index.html          # Estructura HTML completa
├── styles.css          # Sistema de diseño y estilos
├── script.js           # Animaciones e interacciones
├── README.md           # Este archivo
└── images/
    ├── logo.png            # Logo TEF (generado con IA)
    ├── hero_visual.png     # Visual principal del hero
    ├── service_1.png       # Fibra Óptica
    ├── service_2.png       # Instalación Eléctrica
    ├── service_3.png       # Redes y Cableado
    ├── service_4.png       # Domótica
    ├── service_5.png       # Mantenimiento
    └── service_6.png       # Energía Solar
```

## 📋 Secciones

1. **Hero** – Título principal, estadísticas y visual flotante con partículas blancas
2. **Social Proof** – Logos de partners (Vodafone, Orange, Movistar, Endesa, etc.)
3. **Servicios** – 6 flip cards interactivas con imágenes reales
4. **Proyectos** – Casos de éxito con métricas
5. **Testimonios** – Opiniones de clientes
6. **Sobre Nosotros** – Historia y valores de TEF
7. **CTA Final** – Llamada a la acción con efecto glow
8. **Contacto** – Formulario y datos de contacto
9. **Footer** – Links, redes sociales y copyright

## ⚡ Funcionalidades

- 50 partículas blancas/azules flotantes animadas
- Navbar sticky con blur al hacer scroll
- Flip cards 3D interactivas (hover en desktop, tap en mobile)
- Contadores animados con easing cúbico
- Scroll reveal con efecto stagger
- Formulario de contacto con validación
- Menú hamburguesa para mobile
- Smooth scroll
- Parallax sutil en el hero
- Active link highlighting en navbar

## 🛠️ Cómo Personalizar

### Cambiar datos de contacto
Editar en `index.html`:
- Teléfono: buscar `+34 600 000 000`
- Email: buscar `info@tef-instalaciones.es`
- Horario: buscar `Lun–Vie: 8:00–18:00`

### Cambiar color principal
En `styles.css`, modificar:
```css
--primary-500: #3B82F6; /* Nuevo color HEX aquí */
```

### Actualizar estadísticas del hero
En `index.html`, modificar los atributos `data-target`:
```html
<span class="stat-number" data-target="200">0</span>
```

## 🚀 Publicación

Sube todos los archivos (incluyendo la carpeta `/images/`) a tu hosting web.
El sitio no requiere ningún servidor especial ni dependencias externas.

---
© 2026 TEF. Todos los derechos reservados.
