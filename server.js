const express = require('express');

const app = express();
const PORT = 8001;

const API_SECRET = process.env.LEADS_SECRET || 'tef-local-secret';
const PB_URL = process.env.PB_URL || 'http://tef_pocketbase:80';

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

app.post('/api/leads', rateLimit, async (req, res) => {
    const auth = req.headers['x-api-secret'];
    if (auth !== API_SECRET) {
        return res.status(401).json({ error: 'No autorizado' });
    }

    const { nombre, email, telefono, origen } = req.body;
    if (!nombre || !email || !telefono) {
        return res.status(400).json({ error: 'Faltan campos requeridos (nombre, email, telefono)' });
    }

    const nuevoLead = {
        Nombre:          String(nombre).slice(0, 100),
        Email:           String(email).slice(0, 100),
        Telefono:        String(telefono).slice(0, 30),
        Origen:          String(origen || '').slice(0, 50),
        Especialidad:    String(req.body.especialidad    || '').slice(0, 100),
        Edificacion:     String(req.body.edificacion     || '').slice(0, 100),
        Superficie:      String(req.body.superficie      || '').slice(0, 50),
        Detalles:        String(req.body.detalles        || '').slice(0, 200),
        Marca:           String(req.body.marcaPreferida  || '').slice(0, 100),
        Plazo:           String(req.body.plazoEstimado   || '').slice(0, 100),
        Ubicacion:       String(req.body.ubicacion       || '').slice(0, 150),
    };

    try {
        const pbRes = await fetch(`${PB_URL}/api/collections/LEAD/records`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoLead),
        });

        if (!pbRes.ok) {
            const err = await pbRes.text();
            console.error('Error PocketBase:', err);
            return res.status(500).json({ error: 'Error al guardar en la base de datos' });
        }

        const data = await pbRes.json();
        console.log(`✅ Lead guardado en PocketBase (${nuevoLead.Origen}): ${nuevoLead.Nombre} - ${nuevoLead.Telefono}`);

        // Notificar a n8n (fire & forget — no bloquea la respuesta)
        const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL || 'https://tef-n8n.lodgoa.easypanel.host/webhook/f04a2354-0feb-4834-952e-29dbb8a6efbb';
        fetch(N8N_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                company: nuevoLead.Nombre,
                email:   nuevoLead.Email,
                goal:    nuevoLead.Especialidad + ' - ' + nuevoLead.Detalles,
            }),
        }).catch(err => console.error('⚠️ Error notificando a n8n:', err.message));

        return res.status(201).json({ mensaje: 'Guardado con éxito', id: data.id });
    } catch (error) {
        console.error('Error conectando con PocketBase:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`⚡ Servidor TEF escuchando en http://localhost:${PORT}`);
});
