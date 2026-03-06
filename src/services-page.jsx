import { initializePageI18n } from './pageShared.jsx';

initializePageI18n('services');

setTimeout(() => {
    const items = Array.from(document.querySelectorAll('.page-services-list .service-item'));
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const index = items.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('is-line-visible');
            }, Math.max(index, 0) * 120);

            observer.unobserve(entry.target);
        });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

    items.forEach((item) => observer.observe(item));
}, 100);
