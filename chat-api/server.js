'use strict';

const express = require('express');
const cors    = require('cors');
const OpenAI  = require('openai');

const app    = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `Eres el asistente virtual de TEF, empresa de instalaciones eléctricas y telecomunicaciones en Madrid con más de 11 años de experiencia.

Servicios que ofrece TEF:
- Instalaciones eléctricas: cuadros eléctricos, cableado, cambio de instalación, boletín CIE para dar de alta la luz.
- Redes y fibra óptica: cableado estructurado Cat6A/Cat7, WiFi empresarial, racks y patch panels.
- Antenas TV: TDT, satélite, distribución comunitaria, amplificadores de señal.
- Domótica y videoporteros: sistemas KNX, marcas Fermax, Legrand y Comelit.
- Videovigilancia y seguridad: cámaras Dahua 4K, alarmas conectadas al móvil, grabación 24/7.

Zona de trabajo: Madrid y alrededores.
Contacto: +34 645 386 684 | info@tefmultiservicios.com
Horario: lunes a viernes 8:00–18:00. Urgencias 24/7.

Instrucciones de comportamiento:
- Responde SIEMPRE en español.
- Sé profesional y amigable.
- Respuestas cortas: máximo 2-3 frases. No escribas párrafos largos.
- Tu objetivo es resolver la duda del usuario y, cuando sea natural, animarle a dejar sus datos para recibir un presupuesto gratuito.
- Si te preguntan algo fuera del ámbito de TEF, redirige educadamente hacia los servicios.
- No inventes precios concretos. Di que el presupuesto es gratuito y sin compromiso.`;

// Rate limiting en memoria: 20 peticiones por IP por hora
const rateStore = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip) {
    const now = Date.now();
    const entry = rateStore.get(ip);
    if (!entry || now > entry.resetAt) {
        rateStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
        return false;
    }
    entry.count += 1;
    return entry.count > RATE_LIMIT;
}

// Limpiar IPs caducadas cada hora para evitar fuga de memoria
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateStore) {
        if (now > entry.resetAt) rateStore.delete(ip);
    }
}, RATE_WINDOW_MS);

app.use(cors({
    origin: ['https://tefmultiservicios.com', 'https://www.tefmultiservicios.com']
}));
app.use(express.json({ limit: '16kb' }));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/chat', async (req, res) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
    if (checkRateLimit(ip)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Inténtalo más tarde.' });
    }

    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'messages requerido' });
    }

    // Validar mensajes: solo roles user/assistant, contenido string, max 2000 chars
    const ALLOWED_ROLES = new Set(['user', 'assistant']);
    for (const msg of messages) {
        if (!ALLOWED_ROLES.has(msg.role)) {
            return res.status(400).json({ error: 'Rol no permitido' });
        }
        if (typeof msg.content !== 'string' || msg.content.length > 2000) {
            return res.status(400).json({ error: 'Mensaje demasiado largo' });
        }
    }

    // Limitar historial a las últimas 10 rondas para controlar coste
    const history = messages.slice(-20);

    try {
        const completion = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...history
            ],
            max_tokens: 200,
            temperature: 0.6
        });

        const reply = completion.choices[0].message.content.trim();
        res.json({ reply });

    } catch (err) {
        console.error('OpenAI error:', err.message);
        res.status(500).json({ error: 'Error al generar respuesta' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TEF chat API running on port ${PORT}`));
