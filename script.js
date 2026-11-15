'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 0. API KEY — leer desde <meta name="sf-key"> en lugar de hardcodear
    // =========================================================================
    const sfKey = document.querySelector('meta[name="sf-key"]')?.content || '';
    const contactApiKey = document.getElementById('contact-api-key');
    if (contactApiKey && sfKey) contactApiKey.value = sfKey;

    // =========================================================================
    // 1. PARTICLES
    // =========================================================================
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        const count = window.innerWidth < 768 ? 18 : 40;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.animationDelay = `${Math.random() * 20}s`;
            p.style.animationDuration = `${15 + Math.random() * 15}s`;
            particlesContainer.appendChild(p);
        }
    }

    // =========================================================================
    // 2. NAVBAR SCROLL
    // =========================================================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // =========================================================================
    // 3. HAMBURGER MENU
    // =========================================================================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenuInline = document.getElementById('nav-menu-inline');
    const submenuToggle = document.getElementById('submenu-toggle');
    const serviciosSubmenu = document.getElementById('servicios-submenu');

    if (menuToggle && navMenuInline) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenuInline.classList.toggle('open');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen);
            navMenuInline.setAttribute('aria-hidden', !isOpen);

            if (!isOpen && serviciosSubmenu) {
                serviciosSubmenu.classList.remove('open');
                submenuToggle?.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navMenuInline.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenuInline.setAttribute('aria-hidden', 'true');
                serviciosSubmenu?.classList.remove('open');
            }
        });
    }

    if (submenuToggle && serviciosSubmenu) {
        submenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = serviciosSubmenu.classList.toggle('open');
            submenuToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // =========================================================================
    // 5. SCROLL REVEAL
    // =========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // =========================================================================
    // 6. CONTADORES DE ESTADÍSTICAS
    // =========================================================================
    const statNumbers = document.querySelectorAll('[data-target]');
    if (statNumbers.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                const duration = 1800;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target);
                    if (progress < 1) requestAnimationFrame(update);
                    else el.textContent = target;
                }

                requestAnimationFrame(update);
                countObserver.unobserve(el);
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(el => countObserver.observe(el));
    }

    // =========================================================================
    // 7. FORMULARIO DE CONTACTO
    // =========================================================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot: si el campo _honey tiene valor, es un bot — ignorar silenciosamente
            const honey = contactForm.querySelector('input[name="_honey"]')?.value;
            if (honey) return;

            const name = contactForm.querySelector('#name')?.value.trim();
            const message = contactForm.querySelector('#message')?.value.trim();
            if (!name || !message) return;

            formSubmitBtn.disabled = true;
            formSubmitBtn.textContent = 'Enviando...';

            const subjectEl = document.getElementById('contact-form-subject');
            const serviceHidden = document.getElementById('service-hidden');
            if (subjectEl && serviceHidden?.value) {
                subjectEl.value = `Consulta Web TEF — ${serviceHidden.value}`;
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' }
                });

                if (response.ok || response.redirected) {
                    // Guardar también en PocketBase
                    const phone = contactForm.querySelector('#phone')?.value.trim() || '';
                    const email = contactForm.querySelector('#email')?.value.trim() || '';
                    const especialidad = contactForm.querySelector('#service-hidden')?.value || '';
                    fetch('https://tef-pocketbase.lodgoa.easypanel.host/api/collections/LEAD/records', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            Nombre:   name,
                            Email:    email,
                            Telefono: phone,
                            Detalles: message,
                            Origen:   'contacto',
                            Especialidad: especialidad
                        })
                    }).then(() => {
                        fetch('https://tef-n8n.lodgoa.easypanel.host/webhook/tef', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                company: name,
                                email:   email,
                                goal:    especialidad + ' - ' + message
                            })
                        });
                    }).catch(() => {});

                    contactForm.reset();
                    if (formSuccess) {
                        formSuccess.style.display = 'flex';
                        formSuccess.removeAttribute('aria-hidden');
                    }
                } else {
                    throw new Error('server error');
                }
            } catch {
                // Fallback nativo via iframe (inmune a CORS y AdBlockers)
                contactForm.target = 'contact_hidden_iframe';
                contactForm.submit();
                if (formSuccess) {
                    formSuccess.style.display = 'flex';
                    formSuccess.removeAttribute('aria-hidden');
                }
            } finally {
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = 'Enviar solicitud <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
            }
        });
    }

    // Chips de servicio en el formulario de contacto
    document.querySelectorAll('.service-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.service-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const hidden = document.getElementById('service-hidden');
            if (hidden) hidden.value = chip.dataset.value || '';
        });
    });

    // =========================================================================
    // MURAL DE TRABAJOS (sección #proyectos): comparador antes y después y caso
    // =========================================================================
    const muralDialog = document.getElementById('mural-dialog');
    if (muralDialog) {
        const compare = document.getElementById('mural-compare');
        const range = compare.querySelector('.mural-compare__range');
        const beforeImg = compare.querySelector('.mural-compare__before');
        const afterImg = compare.querySelector('.mural-compare__after');
        const steps = muralDialog.querySelector('.mural-steps');
        const setPos = value => compare.style.setProperty('--pos', value + '%');

        range.addEventListener('input', () => setPos(range.value));

        document.querySelectorAll('.mural-card').forEach(card => {
            card.addEventListener('click', () => {
                const [before, after] = card.querySelectorAll('img');
                muralDialog.querySelector('.mural-dialog__title').textContent = card.querySelector('.mural-card__title').textContent;
                muralDialog.querySelector('.mural-dialog__tag').textContent = card.dataset.tag;
                beforeImg.src = before.src;
                beforeImg.alt = before.alt;
                afterImg.src = after.src;
                afterImg.alt = after.alt;

                steps.replaceChildren(...[...card.querySelectorAll('.mural-card__case span')].map((item, index) => {
                    const step = document.createElement('li');
                    step.className = 'mural-step';
                    const number = document.createElement('span');
                    number.className = 'mural-step__n';
                    number.textContent = String(index + 1).padStart(2, '0');
                    const body = document.createElement('div');
                    const label = document.createElement('span');
                    label.className = 'mural-step__label';
                    label.textContent = item.dataset.label;
                    const text = document.createElement('p');
                    text.className = 'mural-step__text';
                    text.textContent = item.textContent;
                    body.append(label, text);
                    step.append(number, body);
                    return step;
                }));

                range.value = 50;
                setPos(50);
                document.documentElement.classList.add('mural-open');
                muralDialog.showModal();
            });
        });

        muralDialog.querySelector('.mural-dialog__close').addEventListener('click', () => muralDialog.close());
        muralDialog.addEventListener('click', event => {
            const box = muralDialog.getBoundingClientRect();
            const inside = event.clientX >= box.left && event.clientX <= box.right &&
                event.clientY >= box.top && event.clientY <= box.bottom;
            if (!inside) muralDialog.close();
        });
        muralDialog.addEventListener('close', () => document.documentElement.classList.remove('mural-open'));
    }

    // =========================================================================
    // 8. SMOOTH SCROLL para links internos
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navMenuInline?.classList.remove('open');
                menuToggle?.classList.remove('active');
            }
        });
    });

});
