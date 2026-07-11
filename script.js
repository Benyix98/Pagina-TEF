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
    // 4. HERO SLOGANS SLIDER
    // =========================================================================
    const slogans = document.querySelectorAll('.hero-slogan');
    const heroFadeElements = document.querySelectorAll('.hero-fade-element');

    if (slogans.length > 0) {
        let currentSlogan = 0;
        const SLOGAN_DURATION = 2200;
        const TOTAL_SLOGAN_TIME = slogans.length * SLOGAN_DURATION;

        function showSlogan(index) {
            slogans.forEach((s, i) => {
                s.classList.remove('active', 'exit');
                if (i === index) s.classList.add('active');
                else if (i === (index - 1 + slogans.length) % slogans.length) s.classList.add('exit');
            });
        }

        showSlogan(0);
        const sloganInterval = setInterval(() => {
            currentSlogan++;
            if (currentSlogan >= slogans.length) {
                clearInterval(sloganInterval);
                // Salida suave del último slogan
                slogans.forEach(s => {
                    if (s.classList.contains('active')) {
                        s.classList.remove('active');
                        s.classList.add('exit');
                    } else {
                        s.classList.remove('active', 'exit');
                    }
                });
                // Revelar hero tras completar la transición de salida
                setTimeout(() => {
                    slogans.forEach(s => { s.style.display = 'none'; });
                    heroFadeElements.forEach(el => el.classList.add('fade-in'));
                }, 600);
                return;
            }
            showSlogan(currentSlogan);
        }, SLOGAN_DURATION);
    } else {
        heroFadeElements.forEach(el => el.classList.add('fade-in'));
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
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
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

    // =========================================================================
    // CTA FINAL — animación de palabras izquierda a derecha
    // =========================================================================
    const ctaFinalSection = document.querySelector('.cta-final');
    const ctaWords        = document.querySelectorAll('.cta-w');
    const ctaEyebrow      = document.getElementById('ctaEyebrow');
    const ctaFinalSub     = document.getElementById('ctaFinalSub');
    const ctaFinalBtn     = document.getElementById('ctaFinalBtnWrap');
    let ctaStarted = false;

    function runCtaAnimation() {
        if (ctaStarted) return;
        ctaStarted = true;

        setTimeout(() => ctaEyebrow?.classList.add('cta-lit'), 200);

        ctaWords.forEach((w, i) => {
            setTimeout(() => w.classList.add('cta-lit'), 500 + i * 320);
        });

        const endDelay = 500 + (ctaWords.length - 1) * 320 + 500;
        setTimeout(() => ctaFinalSub?.classList.add('cta-lit'), endDelay);
        setTimeout(() => ctaFinalBtn?.classList.add('cta-lit'), endDelay + 300);
    }

    if (ctaFinalSection) {
        const ctaObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) runCtaAnimation();
        }, { threshold: 0.35 });
        ctaObserver.observe(ctaFinalSection);
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
    // FILTRO DE PROYECTOS (sección #proyectos)
    // =========================================================================
    const filterChips = document.querySelectorAll('.project-filter .filter-chip');
    const workCards = document.querySelectorAll('.works-grid .work-card');
    if (filterChips.length && workCards.length) {
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const filter = chip.dataset.filter;

                filterChips.forEach(c => {
                    const isActive = c === chip;
                    c.classList.toggle('active', isActive);
                    c.setAttribute('aria-pressed', String(isActive));
                });

                workCards.forEach(card => {
                    const match = filter === 'todos' || card.dataset.category === filter;
                    card.classList.toggle('is-hidden', !match);
                    if (match) {
                        card.classList.remove('card-in');
                        // reflow para reiniciar la animación
                        void card.offsetWidth;
                        card.classList.add('card-in');
                    }
                });

                // Ajustar layout cuando la hero card queda oculta por el filtro
                const heroCard = document.querySelector('.work-card--hero');
                const worksGridEl = document.querySelector('.works-grid');
                if (heroCard && worksGridEl) {
                    worksGridEl.classList.toggle(
                        'works-grid--no-hero',
                        heroCard.classList.contains('is-hidden')
                    );
                }
            });
        });
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

    // =========================================================================
    // 9. TIMELINE + CTA ROTATOR — animación secuencial
    // =========================================================================
    const tlItems   = ['tl1','tl2','tl3','tl4','tl5'];
    const tlFill    = document.getElementById('timelineFill');
    const ctaSection = document.getElementById('ctaSection');

    if (tlFill) {
        const DELAY_FIRST   = 500;
        const DELAY_BETWEEN = 900;

        // Activar línea de color
        setTimeout(() => { tlFill.style.height = '100%'; }, 300);

        // Aparecer items uno a uno
        tlItems.forEach((id, i) => {
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.classList.add('tl-visible');
            }, DELAY_FIRST + i * DELAY_BETWEEN);
        });

        // Aparecer sección CTA tras el último item
        const ctaDelay = DELAY_FIRST + (tlItems.length - 1) * DELAY_BETWEEN + 1000;
        setTimeout(() => {
            if (ctaSection) {
                ctaSection.classList.add('cta-visible');
                startCtaRotator();
            }
        }, ctaDelay);
    }

    function startCtaRotator() {
        const rotatorItems = document.querySelectorAll('.cta-rotator-item');
        const dots         = document.querySelectorAll('.cta-dot');
        if (rotatorItems.length < 2) return;

        let currentCta = 0;
        setInterval(() => {
            const prev = rotatorItems[currentCta];
            prev.classList.remove('is-active');
            prev.classList.add('is-leaving');
            dots[currentCta].classList.remove('active');
            setTimeout(() => prev.classList.remove('is-leaving'), 620);

            currentCta = (currentCta + 1) % rotatorItems.length;
            rotatorItems[currentCta].classList.add('is-active');
            dots[currentCta].classList.add('active');
        }, 3500);
    }

});
