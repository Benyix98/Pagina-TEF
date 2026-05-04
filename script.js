/**
 * TEF - Telecomunicaciones e Instalaciones Eléctricas
 * script.js - Interacciones y animaciones
 */

'use strict';

/* =====================================================
   0. INTRO SPLASH SCREEN LOGIC
   ===================================================== */
(function initIntroSplash() {
    const splash = document.getElementById('intro-splash');
    const slogans = document.querySelectorAll('.intro-slogan');
    const skipBtn = document.getElementById('skip-intro');
    if (!splash || !slogans.length) return;

    // Lock scroll
    document.body.style.overflow = 'hidden';

    let currentSlogan = 0;
    const sloganInterval = 2500; // Time per slogan

    function showSlogan(index) {
        slogans.forEach(s => s.classList.remove('active', 'exit'));
        if (slogans[index]) {
            slogans[index].classList.add('active');
        }
    }

    function exitSlogan(index) {
        if (slogans[index]) {
            slogans[index].classList.remove('active');
            slogans[index].classList.add('exit');
        }
    }

    const startIntro = () => {
        showSlogan(currentSlogan);

        const cycle = setInterval(() => {
            exitSlogan(currentSlogan);
            currentSlogan++;

            if (currentSlogan < slogans.length) {
                setTimeout(() => showSlogan(currentSlogan), 400); // Small gap between slogans
            } else {
                clearInterval(cycle);
                setTimeout(finishIntro, 1000);
            }
        }, sloganInterval);

        function finishIntro() {
            splash.classList.add('hidden');
            document.body.style.overflow = '';
            // Trigger reveals for the hero section
            setTimeout(() => {
                splash.remove(); // Clean up DOM
            }, 1000);
        }

        skipBtn.addEventListener('click', () => {
            clearInterval(cycle);
            finishIntro();
        });
    };

    // Start immediately (since script is at the end of body) or on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(startIntro, 300));
    } else {
        setTimeout(startIntro, 300);
    }
})();



/* =====================================================
   1. PARTICLE SYSTEM
   ===================================================== */
(function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 50;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 20}s;
            animation-duration: ${15 + Math.random() * 10}s;
        `;
        fragment.appendChild(p);
    }

    container.appendChild(fragment);
})();


/* =====================================================
   2. NAVBAR STICKY SCROLL
   ===================================================== */
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = debounce(() => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
})();


/* =====================================================
   3. MOBILE MENU
   ===================================================== */
(function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const overlay = document.getElementById('nav-menu-inline');
    const links = document.querySelectorAll('.mobile-nav-link');
    if (!toggle || !overlay) return;

    function openMenu() {
        toggle.classList.add('active');
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
    }

    // Close menu when any valid link is clicked
    const allMenuLinks = document.querySelectorAll('.mobile-nav-link:not(.submenu-toggle), .submenu-link');
    allMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Toggle menu open/close
    toggle.addEventListener('click', () => {
        if (overlay.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Submenu Toggle Logic
    const submenuToggle = document.getElementById('submenu-toggle');
    const submenu = document.getElementById('servicios-submenu');

    if (submenuToggle && submenu) {
        submenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = submenu.classList.contains('open');
            
            if (isOpen) {
                submenu.classList.remove('open');
                submenuToggle.setAttribute('aria-expanded', 'false');
            } else {
                submenu.classList.add('open');
                submenuToggle.setAttribute('aria-expanded', 'true');
            }
        });
    }

    function closeMenu() {
        toggle.classList.remove('active');
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        
        // Ensure submenu closes too
        if (submenu) {
            submenu.classList.remove('open');
            if(submenuToggle) submenuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
    });
})();


/* =====================================================
   4. SMOOTH SCROLL
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
        });
    });
});


/* =====================================================
   5. SCROLL REVEAL (Intersection Observer)
   ===================================================== */
(function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // Stagger effect
                const delay = (entry.target.dataset.delay || 0) * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    // Add stagger data-delay to sibling cards
    const grids = document.querySelectorAll('.services-grid, .projects-grid, .testimonials-grid, .contact-info');
    grids.forEach(grid => {
        const children = grid.querySelectorAll('.reveal');
        children.forEach((child, i) => {
            child.dataset.delay = i;
        });
    });

    elements.forEach(el => observer.observe(el));
})();


/* =====================================================
   6. ANIMATED COUNTERS
   ===================================================== */
(function initCounters() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
})();


/* =====================================================
   7. FLIP CARDS (tap/click on mobile)
   ===================================================== */
(function initFlipCards() {
    const cards = document.querySelectorAll('.service-card-flip');
    if (!cards.length) return;

    let isTouchDevice = false;

    window.addEventListener('touchstart', () => {
        isTouchDevice = true;
    }, { once: true, passive: true });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (isTouchDevice) {
                card.classList.toggle('flipped');
            }
        });

        // Keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Ver detalles del servicio');

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });
})();


/* =====================================================
   8. CONTACT FORM HANDLER
   ===================================================== */
(function initContactForm() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    const submitBtn = document.getElementById('form-submit-btn');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            shakeForm(form);
            return;
        }

        if (!isValidEmail(email)) {
            form.querySelector('#email').focus();
            form.querySelector('#email').style.borderColor = '#EF4444';
            setTimeout(() => {
                form.querySelector('#email').style.borderColor = '';
            }, 2000);
            return;
        }

        // Simulate send
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Enviar Solicitud <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';

            if (success) {
                success.classList.add('visible');
                success.setAttribute('aria-hidden', 'false');
                setTimeout(() => {
                    success.classList.remove('visible');
                    success.setAttribute('aria-hidden', 'true');
                }, 5000);
            }
        }, 1200);
    });

    // Clear red border on fix
    form.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
})();


/* =====================================================
   9. NAVBAR ACTIVE LINK HIGHLIGHT
   ===================================================== */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--primary-400)';
                    }
                });
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: '-80px 0px 0px 0px'
    });

    sections.forEach(section => observer.observe(section));
})();


/* =====================================================
   10. PARALLAX SUBTLE BACKGROUND
   ===================================================== */
(function initParallax() {
    const heroVisual = document.querySelector('.hero-image');
    if (!heroVisual) return;

    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.08}px)`;
        }
    }, 5), { passive: true });
})();


/* =====================================================
   UTILITY FUNCTIONS
   ===================================================== */
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeForm(form) {
    form.style.animation = 'none';
    form.offsetHeight; // reflow
    form.style.animation = 'shake 0.5s ease';
    setTimeout(() => { form.style.animation = ''; }, 500);
}

// Inject shake keyframe
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-6px); }
    80%       { transform: translateX(6px); }
}
`;
document.head.appendChild(style);


/* =====================================================
   INIT COMPLETE
   ===================================================== */
console.log('%c⚡ TEF - Telecomunicaciones e Instalaciones Eléctricas', 'color:#3B82F6;font-size:14px;font-weight:bold;');
