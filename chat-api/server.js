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
- Obra nueva y reformas: proyecto eléctrico completo, telecomunicaciones, boletín incluido.

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

app.use(cors({
    origin: [
        'https://tefmultiservicios.com',
        'http://localhost',
        'http://127.0.0.1'
    ]
}));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'messages requerido' });
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
