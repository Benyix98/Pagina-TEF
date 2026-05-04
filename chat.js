document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.getElementById('chat-widget');
    const chatToggle = document.getElementById('chat-toggle');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const typingIndicator = document.getElementById('typing-indicator');

    let isFirstOpen = true;

    // Toggle Chat Visibility
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active') && isFirstOpen) {
            startChatSequence();
            isFirstOpen = false;
        }
    });

    closeChat.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });

    // Base de Conocimientos de TEF
    const KNOWLEDGE_BASE = {
        empresa: {
            keywords: ['quienes', 'quien', 'tef', 'empresa', 'nosotros', 'experiencia', 'años'],
            response: "TEF es una empresa líder en telecomunicaciones e instalaciones eléctricas con más de una década de experiencia. Somos instaladores autorizados por el Ministerio de Industria, lo que garantiza que todos nuestros trabajos cumplen con las normativas de seguridad y eficiencia energética más estrictas. Nuestra prioridad es la excelencia técnica en cada proyecto."
        },
        fibra: {
            keywords: ['fibra', 'optica', 'internet', 'datos', 'red', 'velocidad', 'ftth', 'oficina'],
            response: "En TEF nos especializamos en redes de Fibra Óptica (FTTH) de alto rendimiento. Diseñamos e instalamos infraestructuras robustas con baja latencia para empresas y oficinas, asegurando una conectividad ininterrumpida que potencia la productividad de su negocio."
        },
        electrica: {
            keywords: ['electrica', 'electricidad', 'instalacion', 'cuadros', 'industriales', 'boletin', 'normativa', 'rebt', 'electricistas'],
            response: "Como instaladores autorizados, ejecutamos instalaciones eléctricas integrales para entornos industriales y residenciales. Realizamos montajes de cuadros eléctricos, acometidas y mantenimiento siguiendo rigurosamente la normativa REBT e ITC-BT. Garantizamos máxima seguridad y optimización del consumo."
        },
        antenas: {
            keywords: ['antenas', 'tdt', 'television', 'parabolica', 'satelite', 'señal', 'comunidad', 'vecinos'],
            response: "Ofrecemos un servicio especializado en instalación y mantenimiento de sistemas de recepción de TV, tanto terrestre (TDT) como vía satélite (parabólicas). Utilizamos tecnología de precisión para asegurar una señal óptima en comunidades de propietarios y viviendas unifamiliares."
        },
        domotica: {
            keywords: ['domotica', 'inteligente', 'knx', 'smart', 'automatizacion', 'hogar', 'control', 'remoto'],
            response: "Transformamos espacios mediante soluciones de domótica avanzada, integradas principalmente bajo el estándar profesional KNX. Podrá controlar la iluminación, el clima y la seguridad de su inmueble desde cualquier lugar, aportando confort y revalorizando su propiedad."
        },
        seguridad: {
            keywords: ['seguridad', 'camaras', 'cctv', 'videovigilancia', 'alarma', 'videoporteros', 'portero', 'proteccion', 'vigo', 'vigilancia'],
            response: "Nuestras soluciones de Seguridad Inteligente incluyen instalación de cámaras de alta resolución (4K) con visión nocturna, sistemas de videovigilancia CCTV, alarmas conectadas y videoporteros IP de alta gama. Todo gestionable en tiempo real desde su dispositivo móvil para su total tranquilidad."
        },
        obra_nueva: {
            keywords: ['obra', 'nueva', 'reforma', 'construccion', 'proyectos', 'promotora', 'constructora'],
            response: "Colaboramos con constructoras y particulares en la ejecución de instalaciones eléctricas para obra nueva y grandes reformas. Nos encargamos de todo el proceso técnico, desde el proyecto inicial y el boletín eléctrico hasta la iluminación LED arquitectónica."
        },
        contacto: {
            keywords: ['telefono', 'contacto', 'llamar', 'email', 'correo', 'donde', 'ubicacion', 'horario', 'emergencias', 'urgencia'],
            response: "Puede contactar con nuestra central en el teléfono +34 600 000 000 o enviarnos un email a info@tef-instalaciones.es. Estamos ubicados en España y atendemos de Lunes a Viernes de 8:00 a 18:00. Para situaciones críticas, ofrecemos servicio de Urgencias 24/7."
        },
        presupuesto: {
            keywords: ['presupuesto', 'precio', 'coste', 'cuanto', 'tarifa', 'cotizacion'],
            response: "Estaremos encantados de facilitarle un presupuesto personalizado y detallado sin compromiso alguno. Para poder asesorarle con precisión, ¿podría indicarme qué tipo de instalación o servicio (Seguridad, Eléctrica, Fibra Óptica, etc.) necesita cubrir?"
        }
    };

    function startChatSequence() {
        setTimeout(() => {
            addMessage("¡Bienvenido a TEF! Soy su Asistente Virtual. Estamos aquí para garantizar la excelencia técnica en su próximo proyecto. ¿En qué área puedo asesorarle hoy?", 'ai');
            setTimeout(showQuickOptions, 600);
        }, 500);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `message-${sender}`);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showQuickOptions() {
        const card = document.createElement('div');
        card.classList.add('quick-options-card');
        
        const title = document.createElement('div');
        title.classList.add('quick-options-title');
        title.innerHTML = '🔍 Especialidades Destacadas';
        card.appendChild(title);

        const grid = document.createElement('div');
        grid.classList.add('quick-options-grid');
        
        const specialties = [
            { id: 'seguridad', label: '🔒 Seguridad' },
            { id: 'fibra', label: '📡 Fibra' },
            { id: 'electrica', label: '⚡ Electricidad' },
            { id: 'domotica', label: '🏠 Domótica' }
        ];

        specialties.forEach(spec => {
            const btn = document.createElement('button');
            btn.classList.add('quick-btn');
            btn.textContent = spec.label;
            btn.onclick = () => {
                const userQuery = spec.label.split(' ').pop();
                addMessage(userQuery, 'user');
                handleAIResponse(spec.id);
                card.remove();
            };
            grid.appendChild(btn);
        });

        card.appendChild(grid);
        chatMessages.appendChild(card);
        scrollToBottom();
    }

    async function handleAIResponse(userMessage) {
        typingIndicator.style.display = 'flex';
        scrollToBottom();

        await new Promise(resolve => setTimeout(resolve, 1200));
        typingIndicator.style.display = 'none';

        const lowerMsg = userMessage.toLowerCase();
        let foundResponse = "";

        for (const key in KNOWLEDGE_BASE) {
            const entry = KNOWLEDGE_BASE[key];
            if (entry.keywords.some(keyword => lowerMsg.includes(keyword))) {
                foundResponse = entry.response;
                break;
            }
        }

        if (!foundResponse) {
            if (lowerMsg.includes('hola') || lowerMsg.includes('buenos dias')) {
                foundResponse = "Buen día. Como representante técnico de TEF, estoy a su entera disposición. ¿Cómo podemos colaborar en su proyecto hoy?";
            } else {
                foundResponse = "Entiendo su consulta. Para poder brindarle la asesoría experta que caracteriza a TEF, ¿podría especificar si su interés reside en temas de seguridad, fibra o instalaciones eléctricas?";
            }
        }

        addMessage(foundResponse, 'ai');
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            handleAIResponse(message);
        }
    });
});
