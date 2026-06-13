const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8001;
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Token interno para autenticar peticiones desde el chatbot
const API_SECRET = process.env.LEADS_SECRET || 'tef-local-secret';

// Rate limiting simple: max 10 peticiones por IP en 60 segundos
const rateMap = new Map();
function rateLimit(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const entry = rateMap.get(ip) || { count: 0, start: now };

    if (now - entry.start > 60_000) {
        rateMap.set(ip, { count: 1, start: now });
        return next();
    }
    if (entry.count >= 10) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Espera un minuto.' });
    }
    entry.count++;
    rateMap.set(ip, entry);
    next();
}

app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.static(__dirname));

// --- RUTA PARA REGISTRAR LOS LEADS ---
app.post('/api/leads', rateLimit, (req, res) => {
    // Autenticación por header
    const auth = req.headers['x-api-secret'];
    if (auth !== API_SECRET) {
        return res.status(401).json({ error: 'No autorizado' });
    }

    const { nombre, email, telefono, origen } = req.body;

    if (!nombre || !email || !telefono) {
        return res.status(400).json({ error: 'Faltan campos requeridos (nombre, email, telefono)' });
    }

    // Campos permitidos explícitamente — evita prototype pollution del ...spread
    const nuevoLead = {
        id: 'LEAD-' + Date.now(),
        fecha: new Date().toISOString(),
        nombre:          String(nombre).slice(0, 100),
        email:           String(email).slice(0, 100),
        telefono:        String(telefono).slice(0, 30),
        origen:          String(origen || '').slice(0, 50),
        especialidad:    String(req.body.especialidad    || '').slice(0, 100),
        edificacion:     String(req.body.edificacion     || '').slice(0, 100),
        superficie:      String(req.body.superficie      || '').slice(0, 50),
        detalles:        String(req.body.detalles        || '').slice(0, 200),
        marcaPreferida:  String(req.body.marcaPreferida  || '').slice(0, 100),
        plazoEstimado:   String(req.body.plazoEstimado   || '').slice(0, 100),
        ubicacion:       String(req.body.ubicacion       || '').slice(0, 150),
    };

    let leads = [];
    if (fs.existsSync(LEADS_FILE)) {
        try {
            leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
        } catch {
            leads = [];
        }
    }

    leads.push(nuevoLead);

    try {
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 4), 'utf8');
        console.log(`✅ Lead guardado (${nuevoLead.origen}): ${nuevoLead.nombre} - ${nuevoLead.telefono}`);
        return res.status(201).json({ mensaje: 'Guardado con éxito' });
    } catch (error) {
        console.error('Error al escribir en leads.json:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`⚡ Servidor TEF escuchando en http://localhost:${PORT}`);
});
