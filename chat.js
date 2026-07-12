/**
 * TEF - Telecomunicaciones e Instalaciones Eléctricas
 * chat.js - Lógica integrada del Asistente Virtual
 * - Página dedicada (chat.html): Cotizador Conversacional Híbrido y optimizado para SEO.
 * - Página principal (index.html): Asistente FAQ flotante interactivo.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Inyectar API key desde <meta name="sf-key"> en los formularios ocultos
    const sfKey = document.querySelector('meta[name="sf-key"]')?.content || '';
    const budgetApiKey = document.getElementById('budget-api-key');
    if (budgetApiKey && sfKey) budgetApiKey.value = sfKey;

    // Detectar si estamos en la página de chat dedicada
    const isChatPage = document.body.classList.contains('chat-page');

    if (isChatPage) {
        // =========================================================================
        // 1. LÓGICA DEL COTIZADOR CONVERSACIONAL HÍBRIDO (chat.html)
        // =========================================================================
        const chatMessages = document.getElementById('chat-messages');
        const typingIndicator = document.getElementById('typing-indicator');
        const progressLine = document.getElementById('progress-line');

        // Estado del Formulario
        const wizardData = {
            servicio: '',
            servicioLabel: '',
            espacio: '',
            espacioLabel: '',
            superficie: '',
            superficieLabel: '',
            detalles: '',
            detallesLabel: '',
            marca: '',
            marcaLabel: '',
            plazo: '',
            plazoLabel: '',
            ubicacion: '',
            nombre: '',
            telefono: '',
            email: ''
        };

        // Control de Pasos (0: Servicio, 1: Espacio, 2: Detalles, 3: Contacto, 4: Listo)
        let currentStep = 0;

        // Actualizar Barra de Progreso Visual
        function updateProgressBar(step) {
            const fillPercentages = { 0: 0, 1: 25, 2: 50, 3: 75, 4: 100 };
            if (progressLine) {
                progressLine.style.width = `${fillPercentages[step]}%`;
            }

            // Clases de los Nodos de Paso
            for (let i = 0; i <= 4; i++) {
                const stepNode = document.getElementById(`step-${i}`);
                if (stepNode) {
                    if (i < step) {
                        stepNode.classList.remove('active');
                        stepNode.classList.add('completed');
                    } else if (i === step) {
                        stepNode.classList.add('active');
                        stepNode.classList.remove('completed');
                    } else {
                        stepNode.classList.remove('active', 'completed');
                    }
                }
            }
        }

        // Desplazar automáticamente al fondo
        function scrollToBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Agregar mensaje en forma de burbuja
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `message-${sender}`);
            messageDiv.innerHTML = text;
            chatMessages.appendChild(messageDiv);
            scrollToBottom();
        }

        // Mostrar el indicador de escritura simulando retraso natural
        async function showTyping(ms = 1000) {
            typingIndicator.style.display = 'flex';
            scrollToBottom();
            await new Promise(resolve => setTimeout(resolve, ms));
            typingIndicator.style.display = 'none';
        }

        // PASO 0: Inicio y Selección de Servicio
        async function initWizard() {
            updateProgressBar(0);
            await showTyping(1200);
            addMessage(
                "Hola, soy Carlos de <strong>TEF</strong>. Cuéntame qué necesitas y te preparo un presupuesto sin coste — te llega hoy mismo.<br><br>" +
                "¿Qué tipo de trabajo estás buscando?",
                'ai'
            );

            await showTyping(500);
            showServiceGrid();
        }

        function showServiceGrid() {
            const card = document.createElement('div');
            card.classList.add('quick-options-card');
            
            const title = document.createElement('div');
            title.classList.add('quick-options-title');
            title.innerHTML = '¿Qué necesitas?';
            card.appendChild(title);

            const grid = document.createElement('div');
            grid.classList.add('quick-options-grid');
            
            const services = [
                { id: 'electrica', label: 'Instalación Eléctrica', desc: 'Cuadros, boletines, obra nueva' },
                { id: 'fibra', label: 'Red de Fibra Óptica', desc: 'Cableado estructurado, redes datos' },
                { id: 'domotica', label: 'Domótica KNX', desc: 'Hogar inteligente, climatización eficiente' },
                { id: 'seguridad', label: 'Seguridad y CCTV', desc: 'Cámaras 4K, videoporteros IP' }
            ];

            services.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('quick-btn');
                btn.innerHTML = `<div><strong>${item.label}</strong><br><span style="font-size:0.72rem; opacity:0.6; font-weight:400;">${item.desc}</span></div>`;
                btn.onclick = () => {
                    wizardData.servicio = item.id;
                    wizardData.servicioLabel = item.label;
                    addMessage(item.label, 'user');
                    card.remove();
                    goToStep1();
                };
                grid.appendChild(btn);
            });

            card.appendChild(grid);
            chatMessages.appendChild(card);
            scrollToBottom();
        }

        // PASO 1: Selección de Espacio/Inmueble
        async function goToStep1() {
            currentStep = 1;
            updateProgressBar(1);
            await showTyping(1000);
            addMessage(
                `Perfecto, <strong>${wizardData.servicioLabel}</strong>. ` +
                `¿Dónde hay que hacer el trabajo?`,
                'ai'
            );
            await showTyping(400);
            showSpaceGrid();
        }

        function showSpaceGrid() {
            const card = document.createElement('div');
            card.classList.add('quick-options-card');
            
            const title = document.createElement('div');
            title.classList.add('quick-options-title');
            title.innerHTML = '¿Dónde es el trabajo?';
            card.appendChild(title);

            const grid = document.createElement('div');
            grid.classList.add('quick-options-grid');
            
            const spaces = [
                { id: 'hogar', label: 'Vivienda / Piso', desc: 'Residencial unifamiliar o piso' },
                { id: 'comunidad', label: 'Comunidad de Vecinos', desc: 'Fincas, portales, TDT común' },
                { id: 'oficina', label: 'Local / Oficina', desc: 'Espacios comerciales, pymes' },
                { id: 'industrial', label: 'Nave Industrial', desc: 'Instalación de alta potencia' }
            ];

            spaces.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('quick-btn');
                btn.innerHTML = `<div><strong>${item.label}</strong><br><span style="font-size:0.72rem; opacity:0.6; font-weight:400;">${item.desc}</span></div>`;
                btn.onclick = () => {
                    wizardData.espacio = item.id;
                    wizardData.espacioLabel = item.label;
                    addMessage(item.label, 'user');
                    card.remove();
                    
                    // Si el espacio requiere selección de superficie (vivienda, oficina o nave)
                    if (item.id === 'hogar' || item.id === 'oficina' || item.id === 'industrial') {
                        goToSuperficieStep();
                    } else {
                        // En caso de Comunidad, omitir superficie
                        goToStep2();
                    }
                };
                grid.appendChild(btn);
            });

            card.appendChild(grid);
            chatMessages.appendChild(card);
            scrollToBottom();
        }

        // PASO INTERMEDIO: Selección de Superficie (m²)
        async function goToSuperficieStep() {
            await showTyping(1000);
            
            let questionText = "";
            let ranges = [];

            if (wizardData.espacio === 'hogar') {
                questionText = `¿Más o menos cuántos metros tiene la vivienda?`;
                ranges = [
                    { id: 'hogar_pequeno', label: 'Menos de 60 m²', desc: 'Pisos pequeños o estudios' },
                    { id: 'hogar_mediano', label: 'Entre 60 m² y 100 m²', desc: 'Apartamentos o pisos estándar' },
                    { id: 'hogar_grande', label: 'Entre 100 m² y 150 m²', desc: 'Pisos grandes o casas medianas' },
                    { id: 'hogar_xl', label: 'Más de 150 m²', desc: 'Chalets o unifamiliares de gran tamaño' }
                ];
            } else if (wizardData.espacio === 'oficina') {
                questionText = `¿Cuántos metros tiene el local u oficina, más o menos?`;
                ranges = [
                    { id: 'ofi_pequeno', label: 'Menos de 80 m²', desc: 'Despachos o pequeños locales comerciales' },
                    { id: 'ofi_mediano', label: 'Entre 80 m² y 150 m²', desc: 'Oficinas medianas o tiendas estándar' },
                    { id: 'ofi_grande', label: 'Entre 150 m² y 300 m²', desc: 'Espacios de trabajo corporativos amplios' },
                    { id: 'ofi_xl', label: 'Más de 300 m²', desc: 'Sedes de empresas o naves de oficinas' }
                ];
            } else if (wizardData.espacio === 'industrial') {
                questionText = `¿Y la nave, tienes idea de cuántos metros tiene aproximadamente?`;
                ranges = [
                    { id: 'ind_pequeno', label: 'Menos de 300 m²', desc: 'Talleres pequeños o almacenes locales' },
                    { id: 'ind_mediano', label: 'Entre 300 m² y 1000 m²', desc: 'Naves industriales de tamaño estándar' },
                    { id: 'ind_grande', label: 'Más de 1000 m²', desc: 'Grandes centros logísticos o de producción' }
                ];
            }

            addMessage(questionText, 'ai');
            await showTyping(400);
            showSuperficieGrid(ranges);
        }

        function showSuperficieGrid(rangesList) {
            const card = document.createElement('div');
            card.classList.add('quick-options-card');
            
            const title = document.createElement('div');
            title.classList.add('quick-options-title');
            title.innerHTML = 'Superficie en m²';
            card.appendChild(title);

            const grid = document.createElement('div');
            grid.classList.add('quick-options-grid');

            rangesList.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('quick-btn');
                btn.innerHTML = `<div><strong>${item.label}</strong><br><span style="font-size:0.72rem; opacity:0.6; font-weight:400;">${item.desc}</span></div>`;
                btn.onclick = () => {
                    wizardData.superficie = item.id;
                    wizardData.superficieLabel = item.label;
                    addMessage(item.label, 'user');
                    card.remove();
                    goToStep2();
                };
                grid.appendChild(btn);
            });

            card.appendChild(grid);
            chatMessages.appendChild(card);
            scrollToBottom();
        }

        // PASO 2: Detalles Técnicos Específicos (Dinámicos)
        async function goToStep2() {
            currentStep = 2;
            updateProgressBar(2);
            await showTyping(1100);

            let introText = "";
            let details = [];

            if (wizardData.servicio === 'electrica') {
                introText = `Bien. ¿Qué tipo de trabajo eléctrico necesitas en tu <strong>${wizardData.espacioLabel}</strong>?`;
                details = [
                    { id: 'reforma', label: 'Reforma Eléctrica o Reparación', desc: 'Cambios de cableado, enchufes o iluminación' },
                    { id: 'obra_nueva', label: 'Instalación en Obra Nueva', desc: 'Proyecto eléctrico completo e integral' },
                    { id: 'boletin', label: 'Boletín Eléctrico / Certificación', desc: 'Alta de luz oficial y aumento de potencia' },
                    { id: 'cuadros', label: 'Cuadros Eléctricos / Acometida', desc: 'Mantenimiento o montaje de protecciones' }
                ];
            } else if (wizardData.servicio === 'fibra') {
                introText = `¿Cuántos puntos de red necesitas cablear más o menos?`;
                details = [
                    { id: 'pequeno', label: 'Red básica (1 a 5 puestos)', desc: 'Pequeñas instalaciones domésticas o pyme' },
                    { id: 'mediano', label: 'Red mediana (5 a 20 puestos)', desc: 'Oficinas corporativas estándar' },
                    { id: 'grande', label: 'Red corporativa (+20 puestos)', desc: 'Infraestructuras comerciales críticas' },
                    { id: 'enlace', label: 'Enlace de Fibra o Armario Rack', desc: 'Fusión de fibra y distribución central' }
                ];
            } else if (wizardData.servicio === 'domotica') {
                introText = `¿Qué es lo que quieres automatizar principalmente?`;
                details = [
                    { id: 'clima', label: 'Climatización Eficiente', desc: 'Ahorro energético inteligente en calefacción/AC' },
                    { id: 'iluminacion', label: 'Iluminación LED y Persianas', desc: 'Control de escenarios y automatismos lumínicos' },
                    { id: 'seguridad', label: 'Seguridad y Control de accesos', desc: 'Videoporteros IP y alarmas integradas' },
                    { id: 'integral', label: 'Integración Domótica Integral', desc: 'Control completo automatizado de alta gama' }
                ];
            } else if (wizardData.servicio === 'seguridad') {
                introText = `¿Qué tipo de sistema de seguridad necesitas?`;
                details = [
                    { id: 'cctv_pequeno', label: 'Kit básico (1 a 3 cámaras 4K)', desc: 'Vigilancia para accesos principales y App' },
                    { id: 'cctv_mediano', label: 'Kit mediano (4 a 8 cámaras)', desc: 'Protección perimetral inteligente' },
                    { id: 'cctv_grande', label: 'CCTV Comercial (+8 cámaras)', desc: 'Sistemas profesionales para locales e industrias' },
                    { id: 'portero', label: 'Videoportero IP inteligente', desc: 'Control de accesos remotos y videoportero' }
                ];
            }

            addMessage(introText, 'ai');
            await showTyping(400);
            showDetailsGrid(details);
        }

        function showDetailsGrid(detailsList) {
            const card = document.createElement('div');
            card.classList.add('quick-options-card');
            
            const title = document.createElement('div');
            title.classList.add('quick-options-title');
            title.innerHTML = '¿Cuál es tu caso?';
            card.appendChild(title);

            const grid = document.createElement('div');
            grid.classList.add('quick-options-grid');

            detailsList.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('quick-btn');
                btn.innerHTML = `<div><strong>${item.label}</strong><br><span style="font-size:0.72rem; opacity:0.6; font-weight:400;">${item.desc}</span></div>`;
                 btn.onclick = () => {
                     wizardData.detalles = item.id;
                     wizardData.detallesLabel = item.label;
                     addMessage(item.label, 'user');
                     card.remove();
                     goToBrandStep();
                 };
                grid.appendChild(btn);
            });

            card.appendChild(grid);
            chatMessages.appendChild(card);
            scrollToBottom();
        }

        // --- NUEVOS PASOS ENRIQUECIDOS PARA MEJORAR EL PRESUPUESTO ---
        async function goToBrandStep() {
            await showTyping(1000);
            addMessage(
                "¿Tienes preferencia de marca o te doy yo la que mejor encaja para tu caso?",
                'ai'
            );
            await showTyping(400);
            showBrandGrid();
        }

        function showBrandGrid() {
            const card = document.createElement('div');
            card.classList.add('quick-options-card');
            
            const title = document.createElement('div');
            title.classList.add('quick-options-title');
            title.innerHTML = 'Marca preferida';
            card.appendChild(title);

            const grid = document.createElement('div');
            grid.classList.add('quick-options-grid');

            const brands = [
                { id: 'televes', label: 'Televés', desc: 'Líder en antenas y telecomunicaciones' },
                { id: 'fermax', label: 'Fermax', desc: 'Videoporteros e intercomunicación de alta gama' },
                { id: 'tegui', label: 'Tegui / Legrand', desc: 'Material eléctrico y telefonillos residenciales' },
                { id: 'knx', label: 'KNX / Domótica Estándar', desc: 'Sistemas inteligentes domóticos' },
                { id: 'sin_preferencia', label: 'Sin preferencia', desc: 'La mejor opción técnica recomendada por TEF' }
            ];

            brands.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('quick-btn');
                btn.innerHTML = `<div><strong>${item.label}</strong><br><span style="font-size:0.72rem; opacity:0.6; font-weight:400;">${item.desc}</span></div>`;
                btn.onclick = () => {
                    wizardData.marca = item.id;
                    wizardData.marcaLabel = item.label;
                    addMessage(item.label, 'user');
                    card.remove();
                    goToTimelineStep();
                };
                grid.appendChild(btn);
            });

            card.appendChild(grid);
            chatMessages.appendChild(card);
            scrollToBottom();
        }

        async function goToTimelineStep() {
            await showTyping(1000);
            addMessage(
                "¿Y para cuándo necesitas tenerlo listo?",
                'ai'
            );
            await showTyping(400);
            showTimelineGrid();
        }

        function showTimelineGrid() {
            const card = document.createElement('div');
            card.classList.add('quick-options-card');
            
            const title = document.createElement('div');
            title.classList.add('quick-options-title');
            title.innerHTML = '¿Cuándo lo necesitas?';
            card.appendChild(title);

            const grid = document.createElement('div');
            grid.classList.add('quick-options-grid');

            const timelines = [
                { id: 'urgente', label: 'Inmediato (menos de 15 días)', desc: 'Requiere planificación y prioridad técnica' },
                { id: 'medio', label: 'Próximo mes', desc: 'Instalación planificada estándar' },
                { id: 'largo', label: 'Planificación (+3 meses)', desc: 'Fase de estudio y presupuesto previo' }
            ];

            timelines.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('quick-btn');
                btn.innerHTML = `<div><strong>${item.label}</strong><br><span style="font-size:0.72rem; opacity:0.6; font-weight:400;">${item.desc}</span></div>`;
                btn.onclick = () => {
                    wizardData.plazo = item.id;
                    wizardData.plazoLabel = item.label;
                    addMessage(item.label, 'user');
                    card.remove();
                    goToLocationStep();
                };
                grid.appendChild(btn);
            });

            card.appendChild(grid);
            chatMessages.appendChild(card);
            scrollToBottom();
        }

        async function goToLocationStep() {
            await showTyping(1000);
            addMessage(
                "¿En qué zona de Madrid está el trabajo? (barrio o municipio)",
                'ai'
            );
            showInputBlock('text', 'Ej: Vallecas, Alcobendas, Getafe...', (val) => {
                wizardData.ubicacion = val;
                addMessage(val, 'user');
                goToStep3();
            });
        }
        // --- FIN NUEVOS PASOS ---

        // PASO 3: Datos de Contacto (Secuenciales e Interactivos)
        async function goToStep3() {
            currentStep = 3;
            updateProgressBar(3);
            await showTyping(1200);
            addMessage(
                `Perfecto, ya tengo todo lo que necesito. Dime tu <strong>nombre</strong> para poner el presupuesto a tu nombre:`,
                'ai'
            );
            showInputBlock('text', 'Escribe tu nombre y apellidos...', (val) => {
                wizardData.nombre = val;
                addMessage(val, 'user');
                askForPhone();
            });
        }

        async function askForPhone() {
            await showTyping(1000);
            addMessage(
                `<strong>${wizardData.nombre}</strong>, ¿cuál es tu teléfono? Te llamamos para cuadrar los detalles si hace falta.`,
                'ai'
            );
            showInputBlock('tel', 'Ej: 600000000', (val) => {
                if (/^[6789]\d{8}$/.test(val.replace(/\s+/g, ''))) {
                    wizardData.telefono = val.replace(/\s+/g, '');
                    addMessage(val, 'user');
                    askForEmail();
                } else {
                    addMessage(" Por favor, introduce un número de teléfono válido de 9 dígitos (ej. 600000000).", 'ai');
                    askForPhone();
                }
            });
        }

        async function askForEmail() {
            await showTyping(1000);
            addMessage(
                `Y tu email, para mandarte el presupuesto por escrito:`,
                'ai'
            );
            showInputBlock('email', 'Ej: tu@email.com', (val) => {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
                    wizardData.email = val.trim();
                    addMessage(val, 'user');
                    showSummaryStep();
                } else {
                    addMessage(" Por favor, introduce una dirección de correo electrónico válida (ej. cliente@correo.com).", 'ai');
                    askForEmail();
                }
            });
        }

        function showInputBlock(type, placeholder, onConfirm) {
            const block = document.createElement('div');
            block.className = 'chat-input-block';

            const input = document.createElement('input');
            input.type = type;
            input.placeholder = placeholder;
            input.required = true;
            
            setTimeout(() => input.focus(), 100);

            const btn = document.createElement('button');
            btn.textContent = 'Aceptar';

            const submit = () => {
                const val = input.value.trim();
                if (val) {
                    block.remove();
                    onConfirm(val);
                }
            };

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    submit();
                }
            });

            btn.onclick = submit;

            block.appendChild(input);
            block.appendChild(btn);
            chatMessages.appendChild(block);
            scrollToBottom();
        }

        // PASO 4: Ficha de Resumen y Confirmación de Envío
        async function showSummaryStep() {
            await showTyping(1200);
            addMessage(
                `Repasa los datos y si todo está bien, dale al botón:`,
                'ai'
            );

            await showTyping(500);
            showSummaryCard();
        }

        function showSummaryCard() {
            const card = document.createElement('div');
            card.className = 'summary-card';

            const row = (label, value) => value
                ? `<div class="summary-item"><span class="summary-label">${label}</span><span class="summary-value">${value}</span></div>`
                : '';

            card.innerHTML = `
                <div class="summary-title">📝 Resumen de tu solicitud</div>
                ${row('Especialidad:', wizardData.servicioLabel)}
                ${row('Edificación:', wizardData.espacioLabel)}
                ${row('Superficie:', wizardData.superficieLabel)}
                ${row('Detalles del Proyecto:', wizardData.detallesLabel)}
                ${row('Marca Preferida:', wizardData.marcaLabel)}
                ${row('Ubicación:', wizardData.ubicacion)}
                ${row('Plazo Estimado:', wizardData.plazoLabel)}
                ${row('Cliente:', wizardData.nombre)}
                ${row('Teléfono:', wizardData.telefono)}
                ${row('Correo:', wizardData.email)}
                <button class="btn-submit-proposal" id="btn-submit-proposal">
                    Enviar y recibir presupuesto →
                </button>
            `;

            chatMessages.appendChild(card);
            scrollToBottom();

            const submitBtn = document.getElementById('btn-submit-proposal');
            if (submitBtn) {
                submitBtn.onclick = () => {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Enviando...';
                    card.remove();
                    processFinalSubmit();
                };
            }
        }

        // PASO FINAL: Envío Real y Mensaje de Éxito
        async function processFinalSubmit() {
            addMessage("Enviando solicitud...", 'user');
            await showTyping(1000);

            // --- PERSISTENCIA: GUARDAR LEAD EN NUESTRO BACKEND LOCAL ---
            const leadData = {
                nombre: wizardData.nombre,
                email: wizardData.email,
                telefono: wizardData.telefono,
                origen: 'presupuesto',
                especialidad: wizardData.servicioLabel,
                edificacion: wizardData.espacioLabel,
                superficie: wizardData.superficieLabel || "No aplica",
                detalles: wizardData.detallesLabel,
                marcaPreferida: wizardData.marcaLabel,
                plazoEstimado: wizardData.plazoLabel,
                ubicacion: wizardData.ubicacion
            };

            // Guardar siempre en localStorage como red de seguridad
            try {
                const stored = JSON.parse(localStorage.getItem('tef_leads') || '[]');
                stored.push({ ...leadData, timestamp: new Date().toISOString() });
                localStorage.setItem('tef_leads', JSON.stringify(stored));
            } catch (_) {}

            fetch('https://tef-pocketbase.lodgoa.easypanel.host/api/collections/LEAD/records', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Nombre:       leadData.nombre,
                    Email:        leadData.email,
                    Telefono:     leadData.telefono,
                    Origen:       leadData.origen,
                    Especialidad: leadData.especialidad,
                    Edificacion:  leadData.edificacion,
                    Superficie:   leadData.superficie,
                    Detalles:     leadData.detalles,
                    Marca:        leadData.marcaPreferida,
                    Plazo:        leadData.plazoEstimado,
                    Ubicacion:    leadData.ubicacion
                })
            })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(() => {
                try {
                    const stored = JSON.parse(localStorage.getItem('tef_leads') || '[]');
                    const filtered = stored.filter(l => l.email !== leadData.email || l.timestamp !== stored[stored.length - 1]?.timestamp);
                    localStorage.setItem('tef_leads', JSON.stringify(filtered));
                } catch (_) {}
                fetch('https://tef-n8n.lodgoa.easypanel.host/webhook/tef', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        company: leadData.nombre,
                        email:   leadData.email,
                        goal:    leadData.especialidad + ' - ' + leadData.detalles
                    })
                }).catch(() => {});
            })
            .catch(() => {
                // Fallo silencioso: el lead ya está en localStorage como respaldo
            });
            // --- FIN PERSISTENCIA ---

            // Obtener el formulario oculto y rellenar sus campos
            const hiddenForm = document.getElementById('hidden-budget-form');
            if (hiddenForm) {
                document.getElementById('hidden-subject').value = `Nuevo Presupuesto Web TEF: ${wizardData.servicioLabel} en ${wizardData.espacioLabel}`;
                document.getElementById('hidden-especialidad').value = wizardData.servicioLabel;
                document.getElementById('hidden-espacio').value = wizardData.espacioLabel;
                document.getElementById('hidden-superficie').value = wizardData.superficieLabel || "No aplica (Comunidad)";
                document.getElementById('hidden-detalles').value = wizardData.detallesLabel;
                document.getElementById('hidden-ubicacion').value = wizardData.ubicacion;
                document.getElementById('hidden-plazo').value = wizardData.plazoLabel;
                document.getElementById('hidden-marca').value = wizardData.marcaLabel;
                document.getElementById('hidden-nombre').value = wizardData.nombre;
                document.getElementById('hidden-telefono').value = wizardData.telefono;
                document.getElementById('hidden-email').value = wizardData.email;

                // Envío nativo a través del iframe oculto (inmune a CORS y AdBlockers)
                hiddenForm.submit();
                console.log("Presupuesto enviado de forma robusta vía iframe a tefmultiservicios@gmail.com");
            } else {
                console.warn("Formulario oculto no encontrado, procesando en modo contingencia");
            }
            
            currentStep = 4;
            updateProgressBar(4);
            await showTyping(800);

            addMessage(
                `<span style="font-size: 1.5rem;"></span> <strong style="color:#10b981; font-size:1.1rem;">¡Listo, ${wizardData.nombre}!</strong><br><br>` +
                `He recibido tu solicitud para <strong>${wizardData.servicioLabel}</strong>. ` +
                `En menos de 24 horas te mando el presupuesto a <strong>${wizardData.email}</strong> y si necesito aclarar algo te llamo al <strong>${wizardData.telefono}</strong>.<br><br>` +
                `Sin compromiso — si tienes dudas antes, llámanos directamente.<br><br>` +
                `<a href="index.html" class="btn-outline" style="margin-top:10px; display:inline-block; border-color:#10b981; color:#10b981;">← Volver al inicio</a>`,
                'ai'
            );
        }

        // Arrancar el Wizard de inmediato
        initWizard();

    } else {
        // =========================================================================
        // 2. LÓGICA DEL ASISTENTE FLOTANTE FAQ ORIGINAL (index.html)
        // =========================================================================
        const chatWidget = document.getElementById('chat-widget');
        const chatToggle = document.getElementById('chat-toggle');
        const closeChat = document.getElementById('close-chat');
        const chatMessages = document.getElementById('chat-messages');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const typingIndicator = document.getElementById('typing-indicator');

        if (!chatWidget || !chatToggle) return;

        const CHAT_API = 'https://tef-tef-chat-api.lodgoa.easypanel.host/api/chat';
        const conversationHistory = [];
        let isFirstOpen = true;

        // Toggle Chat Visibility
        chatToggle.addEventListener('click', () => {
            chatWidget.classList.toggle('active');
            if (chatWidget.classList.contains('active') && isFirstOpen) {
                startChatSequence();
                isFirstOpen = false;
            }
        });

        if (closeChat) {
            closeChat.addEventListener('click', () => {
                chatWidget.classList.remove('active');
            });
        }

        // Base de Conocimientos de TEF
        const KNOWLEDGE_BASE = {
            empresa: {
                keywords: ['quienes', 'quien', 'tef', 'empresa', 'nosotros', 'experiencia', 'años'],
                response: "Somos TEF, instaladores eléctricos y de telecomunicaciones en Madrid. Llevamos más de 11 años haciendo instalaciones en viviendas, comunidades y empresas. Trabajamos con material de primeras marcas y todos nuestros técnicos están certificados."
            },
            fibra: {
                keywords: ['fibra', 'optica', 'internet', 'datos', 'red', 'velocidad', 'ftth', 'oficina'],
                response: "Montamos redes de fibra óptica y cableado estructurado para oficinas y locales. Desde el armario rack hasta cada puesto de trabajo — sin perder señal, sin improvisar. ¿Cuántos puntos necesitas cablear?"
            },
            electrica: {
                keywords: ['electrica', 'electricidad', 'instalacion', 'cuadros', 'industriales', 'boletin', 'normativa', 'rebt', 'electricistas'],
                response: "Hacemos instalaciones eléctricas completas: cuadros eléctricos, cambio de cableado, boletines para dar de alta la luz, obra nueva... Todo con el boletín del instalador autorizado para que no tengas problemas con la compañía eléctrica."
            },
            antenas: {
                keywords: ['antenas', 'tdt', 'television', 'parabolica', 'satelite', 'señal', 'comunidad', 'vecinos'],
                response: "Instalamos y reparamos antenas TDT y parabólicas, tanto en viviendas como en comunidades de vecinos. Si tienes mala señal o quieres poner una ICT nueva, cuéntanos y te damos precio rápido."
            },
            domotica: {
                keywords: ['domotica', 'inteligente', 'knx', 'smart', 'automatizacion', 'hogar', 'control', 'remoto'],
                response: "Instalamos domótica KNX y sistemas de hogar inteligente: controlar la luz, la calefacción y las persianas desde el móvil o con voz. Es más sencillo de lo que parece y el ahorro en electricidad se nota. ¿Tienes ya algo instalado o sería desde cero?"
            },
            seguridad: {
                keywords: ['seguridad', 'camaras', 'cctv', 'videovigilancia', 'alarma', 'videoporteros', 'portero', 'proteccion', 'madrid', 'vigilancia'],
                response: "Ponemos cámaras Dahua 4K, videoporteros Fermax/Legrand y sistemas de alarma conectada al móvil. Todo configurado para que veas tu casa o local en tiempo real desde cualquier sitio. ¿Es para una vivienda, comunidad o local comercial?"
            },
            obra_nueva: {
                keywords: ['obra', 'nueva', 'reforma', 'construccion', 'proyectos', 'promotora', 'constructora'],
                response: "Trabajamos con promotoras y particulares en obra nueva y reformas: proyecto eléctrico completo, instalación de red de datos, antenas y domótica. Nos encargamos de toda la parte técnica para que el arquitecto no tenga que preocuparse."
            },
            contacto: {
                keywords: ['telefono', 'contacto', 'llamar', 'email', 'correo', 'donde', 'ubicacion', 'horario', 'emergencias', 'urgencia'],
                response: "Puedes llamarnos o mandarnos un mensaje — atendemos de lunes a viernes de 8:00 a 18:00. Para urgencias también tenemos cobertura. ¿Prefieres que te llamemos nosotros? Deja aquí tu número."
            },
            presupuesto: {
                keywords: ['presupuesto', 'precio', 'coste', 'cuanto', 'tarifa', 'cotizacion'],
                response: "El presupuesto es gratis y sin compromiso. Cuéntame qué necesitas y te lo preparo hoy mismo — ¿eléctrica, fibra, cámaras o domótica?"
            }
        };

        function startChatSequence() {
            setTimeout(() => {
                addFloatingMessage("¡Hola! Soy Carlos de TEF. ¿En qué te puedo ayudar?", 'ai');
                setTimeout(showFloatingQuickOptions, 600);
            }, 500);
        }

        function addFloatingMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `message-${sender}`);
            messageDiv.textContent = text;
            chatMessages.appendChild(messageDiv);
            scrollFloatingBottom();
        }

        function scrollFloatingBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showFloatingQuickOptions() {
            const card = document.createElement('div');
            card.classList.add('quick-options-card');
            
            const title = document.createElement('div');
            title.classList.add('quick-options-title');
            title.innerHTML = '¿Qué te interesa?';
            card.appendChild(title);

            const grid = document.createElement('div');
            grid.classList.add('quick-options-grid');
            
            const specialties = [
                { id: 'seguridad', label: 'Seguridad' },
                { id: 'fibra', label: 'Fibra' },
                { id: 'electrica', label: 'Electricidad' },
                { id: 'domotica', label: 'Domótica' }
            ];

            specialties.forEach(spec => {
                const btn = document.createElement('button');
                btn.classList.add('quick-btn');
                btn.textContent = spec.label;
                btn.onclick = () => {
                    const userQuery = spec.label;
                    addFloatingMessage(userQuery, 'user');
                    handleFloatingAIResponse(spec.id);
                    card.remove();
                };
                grid.appendChild(btn);
            });

            card.appendChild(grid);
            chatMessages.appendChild(card);
            scrollFloatingBottom();
        }

        async function handleFloatingAIResponse(userMessage) {
            if (typingIndicator) typingIndicator.style.display = 'flex';
            scrollFloatingBottom();

            conversationHistory.push({ role: 'user', content: userMessage });

            let reply;
            try {
                const res = await fetch(CHAT_API, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: conversationHistory })
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                reply = data.reply;
            } catch (_) {
                // Fallback si el backend no está disponible
                const lowerMsg = userMessage.toLowerCase();
                let found = '';
                for (const key in KNOWLEDGE_BASE) {
                    const entry = KNOWLEDGE_BASE[key];
                    if (entry.keywords.some(kw => lowerMsg.includes(kw))) { found = entry.response; break; }
                }
                reply = found || '¿En qué te puedo ayudar? Cuéntame qué necesitas.';
            }

            conversationHistory.push({ role: 'assistant', content: reply });

            if (typingIndicator) typingIndicator.style.display = 'none';
            addFloatingMessage(reply, 'ai');
        }

        if (chatForm) {
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const message = chatInput.value.trim();
                if (message) {
                    addFloatingMessage(message, 'user');
                    chatInput.value = '';
                    handleFloatingAIResponse(message);
                }
            });
        }
    }
});
