'use strict';

(function () {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('in'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('in', entry.isIntersecting));
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(el => observer.observe(el));
})();
