/**
 * TEF - Telecomunicaciones e Instalaciones Eléctricas
 * chat.js - Lógica integrada del Asistente Virtual
 * - Página dedicada (chat.html): Cotizador Conversacional Híbrido y optimizado para SEO.
 * - Página principal (index.html): Asistente FAQ flotante interactivo.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
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
                "¡Hola! Bienvenido al portal de presupuestos técnicos de <strong>TEF</strong>. " +
                "Soy tu Asistente Virtual y he sido entrenado por nuestros instaladores autorizados para ayudarte " +
                "a cotizar tu proyecto de forma <strong>100% gratuita y sin compromiso</strong> en menos de 1 minuto.<br><br>" +
                "Para comenzar, ¿qué especialidad técnica o de ingeniería necesitas cubrir hoy?",
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
            title.innerHTML = '⚡ Seleccione Especialidad Certificada';
            card.appendChild(title);

            const grid = document.createElement('div');
            grid.classList.add('quick-options-grid');
            
            const services = [
                { id: 'electrica', label: '⚡ Instalación Eléctrica', desc: 'Cuadros, boletines, obra nueva' },
                { id: 'fibra', label: '📡 Red de Fibra Óptica', desc: 'Cableado estructurado, redes datos' },
                { id: 'domotica', label: '🏠 Domótica KNX', desc: 'Hogar inteligente, climatización eficiente' },
                { id: 'seguridad', label: '🔒 Seguridad y CCTV', desc: 'Cámaras 4K, videoporteros IP' }
            ];

            services.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('quick-btn');
                btn.innerHTML = `<i>${item.label.split(' ')[0]}</i> <div><strong>${item.label.substring(2)}</strong><br><span style="font-size:0.72rem; opacity:0.6; font-weight:400;">${item.desc}</span></div>`;
                btn.onclick = () => {
                    wizardData.servicio = item.id;
                    wizardData.servicioLabel = item.label.substring(2);
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
                `Excelente elección. Para poder dimensionar correctamente tu presupuesto de <strong>${wizardData.servicioLabel}</strong>, ` +
                `¿para qué tipo de espacio o edificación requieres el servicio?`,
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
            title.innerHTML = '🏢 Seleccione el Tipo de Edificación';
            card.appendChild(title);

            const grid = document.createElement('div');
            grid.classList.add('quick-options-grid');
            
            const spaces = [
                { id: 'hogar', label: '🏠 Vivienda / Piso', desc: 'Residencial unifamiliar o piso' },
                { id: 'comunidad', label: '🏢 Comunidad de Vecinos', desc: 'Fincas, portales, TDT común' },
                { id: 'oficina', label: '💼 Local / Oficina', desc: 'Espacios comerciales, pymes' },
                { id: 'industrial', label: '🏭 Nave Industrial', desc: 'Instalación de alta potencia' }
            ];

            spaces.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('quick-btn');
                btn.innerHTML = `<i>${item.label.split(' ')[0]}</i> <div><strong>${item.label.substring(2)}</strong><br><span style="font-size:0.72rem; opacity:0.6; font-weight:400;">${item.desc}</span></div>`;
                btn.onclick = () => {
                    wizardData.espacio = item.id;
                    wizardData.espacioLabel = item.label.substring(2);
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
                questionText = `Estupendo. ¿Qué superficie construida aproximada en metros cuadrados (m²) tiene la vivienda?`;
                ranges = [
                    { id: 'hogar_pequeno', label: '🏢 Menos de 60 m²', desc: 'Pisos pequeños o estudios' },
                    { id: 'hogar_mediano', label: '🏠 Entre 60 m² y 100 m²', desc: 'Apartamentos o pisos estándar' },
                    { id: 'hogar_grande', label: '🏡 Entre 100 m² y 150 m²', desc: 'Pisos grandes o casas medianas' },
                    { id: 'hogar_xl', label: '🏰 Más de 150 m²', desc: 'Chalets o unifamiliares de gran tamaño' }
                ];
            } else if (wizardData.espacio === 'oficina') {
                questionText = `Entendido. ¿De qué superficie aproximada en metros cuadrados (m²) dispone el local u oficina?`;
                ranges = [
                    { id: 'ofi_pequeno', label: '💼 Menos de 80 m²', desc: 'Despachos o pequeños locales comerciales' },
                    { id: 'ofi_mediano', label: '🏢 Entre 80 m² y 150 m²', desc: 'Oficinas medianas o tiendas estándar' },
                    { id: 'ofi_grande', label: '🏬 Entre 150 m² y 300 m²', desc: 'Espacios de trabajo corporativos amplios' },
                    { id: 'ofi_xl', label: '🏢 Más de 300 m²', desc: 'Sedes de empresas o naves de oficinas' }
                ];
            } else if (wizardData.espacio === 'industrial') {
                questionText = `Perfecto. ¿Qué superficie en metros cuadrados (m²) tiene la nave industrial aproximadamente?`;
                ranges = [
                    { id: 'ind_pequeno', label: '🏭 Menos de 300 m²', desc: 'Talleres pequeños o almacenes locales' },
                    { id: 'ind_mediano', label: '🏭 Entre 300 m² y 1000 m²', desc: 'Naves industriales de tamaño estándar' },
                    { id: 'ind_grande', label: '🏭 Más de 1000 m²', desc: 'Grandes centros logísticos o de producción' }
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
            title.innerHTML = '📏 Seleccione Superficie en m²';
            card.appendChild(title);

            const grid = document.createElement('div');
            grid.classList.add('quick-options-grid');

            rangesList.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('quick-btn');
                btn.innerHTML = `<i>📏</i> <div><strong>${item.label}</strong><br><span style="font-size:0.72rem; opacity:0.6; font-weight:400;">${item.desc}</span></div>`;
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
                introText = `Perfecto. Como <strong>instalador eléctrico autorizado</strong> en normativa REBT, indícanos qué tipo de trabajo o certificación necesitas realizar en tu <strong>${wizardData.espacioLabel}</strong>:`;
                details = [
                    { id: 'reforma', label: '🔌 Reforma Eléctrica o Reparación', desc: 'Cambios de cableado, enchufes o iluminación' },
                    { id: 'obra_nueva', label: '🏗️ Instalación en Obra Nueva', desc: 'Proyecto eléctrico completo e integral' },
                    { id: 'boletin', label: '📄 Boletín Eléctrico / Certificación', desc: 'Alta de luz oficial y aumento de potencia' },
                    { id: 'cuadros', label: '⚡ Cuadros Eléctricos / Acometida', desc: 'Mantenimiento o montaje de protecciones' }
                ];
            } else if (wizardData.servicio === 'fibra') {
                introText = `Excelente. Para estructurar correctamente la <strong>red de fibra óptica y cableado estructurado</strong>, indícanos cuántos puestos o puntos de conexión necesitas cablear:`;
                details = [
                    { id: 'pequeno', label: '💻 Red básica (1 a 5 puestos)', desc: 'Pequeñas instalaciones domésticas o pyme' },
                    { id: 'mediano', label: '🏢 Red mediana (5 a 20 puestos)', desc: 'Oficinas corporativas estándar' },
                    { id: 'grande', label: '🌐 Red corporativa (+20 puestos)', desc: 'Infraestructuras comerciales críticas' },
                    { id: 'enlace', label: '🔗 Enlace de Fibra o Armario Rack', desc: 'Fusión de fibra y distribución central' }
                ];
            } else if (wizardData.servicio === 'domotica') {
                introText = `Estupendo. La <strong>domótica profesional KNX</strong> aporta máxima eficiencia y confort. ¿Cuál es el enfoque principal de automatización de tu proyecto?`;
                details = [
                    { id: 'clima', label: '🌡️ Climatización Eficiente', desc: 'Ahorro energético inteligente en calefacción/AC' },
                    { id: 'iluminacion', label: '💡 Iluminación LED y Persianas', desc: 'Control de escenarios y automatismos lumínicos' },
                    { id: 'seguridad', label: '🛡️ Seguridad y Control de accesos', desc: 'Videoporteros IP y alarmas integradas' },
                    { id: 'integral', label: '🧠 Integración Domótica Integral', desc: 'Control completo automatizado de alta gama' }
                ];
            } else if (wizardData.servicio === 'seguridad') {
                introText = `Entendido. La <strong>instalación de cámaras de seguridad CCTV</strong> y videoporteros garantiza tu tranquilidad. ¿Qué volumen de equipos estimas instalar?`;
                details = [
                    { id: 'cctv_pequeno', label: '📹 Kit básico (1 a 3 cámaras 4K)', desc: 'Vigilancia para accesos principales y App' },
                    { id: 'cctv_mediano', label: '📹 Kit mediano (4 a 8 cámaras)', desc: 'Protección perimetral inteligente' },
                    { id: 'cctv_grande', label: '🏢 CCTV Comercial (+8 cámaras)', desc: 'Sistemas profesionales para locales e industrias' },
                    { id: 'portero', label: '🔔 Videoportero IP inteligente', desc: 'Control de accesos remotos y videoportero' }
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
            title.innerHTML = '⚙️ Seleccione el Alcance Técnico';
            card.appendChild(title);

            const grid = document.createElement('div');
            grid.classList.add('quick-options-grid');

            detailsList.forEach(item => {
                const btn = document.createElement('button');
                btn.classList.add('quick-btn');
                btn.innerHTML = `<i>⚙️</i> <div><strong>${item.label}</strong><br><span style="font-size:0.72rem; opacity:0.6; font-weight:400;">${item.desc}</span></div>`;
                btn.onclick = () => {
                    wizardData.detalles = item.id;
                    wizardData.detallesLabel = item.label;
                    addMessage(item.label, 'user');
                    card.remove();
                    goToStep3();
                };
                grid.appendChild(btn);
            });

            card.appendChild(grid);
            chatMessages.appendChild(card);
            scrollToBottom();
        }

        // PASO 3: Datos de Contacto (Secuenciales e Interactivos)
        async function goToStep3() {
            currentStep = 3;
            updateProgressBar(3);
            await showTyping(1200);
            addMessage(
                `Estupendo. Contamos con toda la información técnica base. ` +
                `Para poder enviarte tu <strong>presupuesto gratuito en menos de 24 horas</strong> elaborado por nuestros ` +
                `electricistas y técnicos autorizados por el Ministerio de Industria, indícanos por favor tu <strong>Nombre completo</strong>:`,
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
                `Muchas gracias, <strong>${wizardData.nombre}</strong>. ¿A qué <strong>número de teléfono</strong> podemos llamarte ` +
                `en caso de que nuestro departamento de ingeniería necesite resolver alguna duda o agendar una visita técnica gratuita en tu <strong>${wizardData.espacioLabel}</strong>?`,
                'ai'
            );
            showInputBlock('tel', 'Ej: 600000000', (val) => {
                if (/^[6789]\d{8}$/.test(val.replace(/\s+/g, ''))) {
                    wizardData.telefono = val.replace(/\s+/g, '');
                    addMessage(val, 'user');
                    askForEmail();
                } else {
                    addMessage("❌ Por favor, introduce un número de teléfono válido de 9 dígitos (ej. 600000000).", 'ai');
                    askForPhone();
                }
            });
        }

        async function askForEmail() {
            await showTyping(1000);
            addMessage(
                `Excelente, <strong>${wizardData.nombre}</strong>. Por último, ¿a qué <strong>dirección de correo electrónico</strong> ` +
                `deseas que enviemos la propuesta formal y el desglose de costes técnicos?`,
                'ai'
            );
            showInputBlock('email', 'Ej: tu@email.com', (val) => {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
                    wizardData.email = val.trim();
                    addMessage(val, 'user');
                    showSummaryStep();
                } else {
                    addMessage("❌ Por favor, introduce una dirección de correo electrónico válida (ej. cliente@correo.com).", 'ai');
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
                `Perfecto. Hemos estructurado tu <strong>solicitud de presupuesto técnico</strong> de forma integral. ` +
                `A continuación, se detalla la Ficha de Cotización que será revisada por nuestro instalador eléctrico o de telecomunicaciones certificado. ` +
                `Por favor, confirma que toda la información técnica y de contacto sea correcta antes de procesar el envío:`,
                'ai'
            );

            await showTyping(500);
            showSummaryCard();
        }

        function showSummaryCard() {
            const card = document.createElement('div');
            card.className = 'summary-card';

            let superficieRow = "";
            if (wizardData.superficieLabel) {
                superficieRow = `
                <div class="summary-item">
                    <span class="summary-label">Superficie:</span>
                    <span class="summary-value">${wizardData.superficieLabel}</span>
                </div>`;
            }

            card.innerHTML = `
                <div class="summary-title">📝 Ficha Técnica de Presupuesto</div>
                <div class="summary-item">
                    <span class="summary-label">Especialidad:</span>
                    <span class="summary-value">${wizardData.servicioLabel}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Edificación:</span>
                    <span class="summary-value">${wizardData.espacioLabel}</span>
                </div>
                ${superficieRow}
                <div class="summary-item">
                    <span class="summary-label">Detalles del Proyecto:</span>
                    <span class="summary-value">${wizardData.detallesLabel}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Cliente:</span>
                    <span class="summary-value">${wizardData.nombre}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Teléfono:</span>
                    <span class="summary-value">${wizardData.telefono}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Correo:</span>
                    <span class="summary-value">${wizardData.email}</span>
                </div>
                <button class="btn-submit-proposal" id="btn-submit-proposal">
                    🚀 Enviar Solicitud de Presupuesto Oficial
                </button>
            `;

            chatMessages.appendChild(card);
            scrollToBottom();

            const submitBtn = document.getElementById('btn-submit-proposal');
            if (submitBtn) {
                submitBtn.onclick = () => {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Enviando Ficha Técnica...';
                    card.remove();
                    processFinalSubmit();
                };
            }
        }

        // PASO FINAL: Envío Real y Mensaje de Éxito
        async function processFinalSubmit() {
            addMessage("🚀 Enviando ficha técnica a nuestro departamento técnico...", 'user');
            await showTyping(1000);

            // Obtener el formulario oculto y rellenar sus campos
            const hiddenForm = document.getElementById('hidden-budget-form');
            if (hiddenForm) {
                document.getElementById('hidden-subject').value = `Nuevo Presupuesto Web TEF: ${wizardData.servicioLabel} en ${wizardData.espacioLabel}`;
                document.getElementById('hidden-especialidad').value = wizardData.servicioLabel;
                document.getElementById('hidden-espacio').value = wizardData.espacioLabel;
                document.getElementById('hidden-superficie').value = wizardData.superficieLabel || "No aplica (Comunidad)";
                document.getElementById('hidden-detalles').value = wizardData.detallesLabel;
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
                `<span style="font-size: 1.5rem;">✅</span> <strong style="color:#10b981; font-size:1.1rem;">¡SOLICITUD ENVIADA CON ÉXITO!</strong><br><br>` +
                `Tu código único de propuesta técnica es <strong>TEF-WIZ-${Math.floor(1000 + Math.random() * 9000)}</strong>.<br><br>` +
                `Nuestros <strong>instaladores autorizados por el Ministerio de Industria</strong> han recibido tu Ficha de Presupuesto. ` +
                `Un electricista o ingeniero especialista en <strong>${wizardData.servicioLabel}</strong> revisará los alcances de tu proyecto y se pondrá en contacto contigo a tu teléfono (<strong>${wizardData.telefono}</strong>) o a tu correo (<strong>${wizardData.email}</strong>) en un plazo <strong>máximo de 24 horas laborales</strong>.<br><br>` +
                `Te facilitaremos tu presupuesto oficial de forma <strong>100% gratuita y sin compromiso</strong>. ¡Gracias por confiar en el rigor técnico de <strong>TEF</strong>!<br><br>` +
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
                addFloatingMessage("¡Bienvenido a TEF! Soy su Asistente Virtual. Estamos aquí para garantizar la excelencia técnica en su próximo proyecto. ¿En qué área puedo asesorarle hoy?", 'ai');
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

            await new Promise(resolve => setTimeout(resolve, 1200));
            if (typingIndicator) typingIndicator.style.display = 'none';

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

            addFloatingMessage(foundResponse, 'ai');
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
