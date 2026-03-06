import React from 'react';
import { createRoot } from 'react-dom/client';
import StaggeredMenu from './components/StaggeredMenu.jsx';
import CountUp from './components/CountUp.jsx';
import { getMenuItems, initializeI18n } from './i18n.jsx';

const rootCache = new WeakMap();

const socialItems = [
    { label: 'GitHub', link: 'https://github.com/WIKKIwk' },
    { label: 'Telegram', link: 'https://t.me' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const animateNumericText = (element, to, duration = 1800) => {
    const start = performance.now();

    const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.round(to * eased);
        element.textContent = String(current);

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            element.textContent = String(to);
        }
    };

    element.textContent = '0';
    requestAnimationFrame(tick);
};

export const mountMenu = (lang) => {
    const container = document.getElementById('staggered-menu-root');
    if (!container) return;
    const root = rootCache.get(container) || createRoot(container);
    rootCache.set(container, root);

    root.render(
        <StaggeredMenu
            position="right"
            isFixed={true}
            colors={['#1a1a2e', '#16213e']}
            accentColor="#a78bfa"
            menuButtonColor="#ffffff"
            openMenuButtonColor="#000000"
            items={getMenuItems(lang)}
            socialItems={socialItems}
        />
    );
};

export const mountCounters = (targets) => {
    const deferredStatCounters = [];

    targets.forEach(({ id, to, variant }) => {
        const container = document.getElementById(id);
        if (!container) return;

        if (variant === 'bits') {
            deferredStatCounters.push({ element: container, to });
            return;
        }

        const root = rootCache.get(container) || createRoot(container);
        rootCache.set(container, root);
        root.render(
            <CountUp
                from={0}
                to={to}
                separator=","
                direction="up"
                duration={2}
                className="count-up-text"
            />
        );
    });

    if (deferredStatCounters.length) {
        let lastRunAt = 0;
        const replayCounters = () => {
            const now = Date.now();
            if (now - lastRunAt < 900) return;
            lastRunAt = now;
            deferredStatCounters.forEach(({ element, to }) => {
                animateNumericText(element, to);
            });
        };

        const anchor = document.querySelector('.about-stats') || document.querySelector('.about-section');
        if (anchor) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    replayCounters();
                });
            }, { threshold: 0.35, rootMargin: '0px 0px -20% 0px' });
            sectionObserver.observe(anchor);
        }
    }
};

export const initializePageI18n = (page, onLanguageChange) => {
    initializeI18n(page, (lang) => {
        mountMenu(lang);
        onLanguageChange?.(lang);
    });
};
