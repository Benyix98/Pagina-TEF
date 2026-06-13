const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8001;
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Middlewares para poder leer datos en formato JSON de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servimos todos los archivos estáticos de la web
app.use(express.static(__dirname));

// --- RUTA PARA REGISTRAR LOS LEADS ---
app.post('/api/leads', (req, res) => {
    const { nombre, email, telefono, origen } = req.body;

    // Validación básica en el servidor por seguridad (por si el cliente bypass-ea JS)
    if (!nombre || !email || !telefono) {
        return res.status(400).json({ error: 'Faltan campos requeridos (nombre, email, telefono)' });
    }

    // Estructuramos el nuevo objeto lead guardando de manera dinámica todas las claves adicionales enviadas
    const nuevoLead = {
        id: 'LEAD-' + Date.now(),
        fecha: new Date().toISOString(),
        ...req.body
    };

    let leads = [];

    // Si el archivo leads.json existe, cargamos su contenido actual
    if (fs.existsSync(LEADS_FILE)) {
        try {
            const data = fs.readFileSync(LEADS_FILE, 'utf8');
            leads = JSON.parse(data);
        } catch (error) {
            console.error('Error al analizar leads.json, inicializando base de datos vacía:', error);
            leads = [];
        }
    }

    // Insertamos el nuevo lead al final del listado
    leads.push(nuevoLead);

    // Escribimos el listado completo y formateado de nuevo en leads.json
    try {
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 4), 'utf8');
        console.log(`✅ Lead guardado (${origen}): ${nombre} - ${telefono}`);
        return res.status(201).json({ mensaje: 'Guardado con éxito', lead: nuevoLead });
    } catch (error) {
        console.error('Error al escribir en leads.json:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Arrancamos el backend
app.listen(PORT, () => {
    console.log(`⚡ Servidor Express escuchando en http://localhost:${PORT}`);
});
