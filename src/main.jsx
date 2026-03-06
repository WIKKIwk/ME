import React from 'react';
import { createRoot } from 'react-dom/client';
import DarkVeil from './components/DarkVeil.jsx';
import BlurText from './components/BlurText.jsx';
import StaggeredMenu from './components/StaggeredMenu.jsx';
import SplitText from './components/SplitText.jsx';
import CountUp from './components/CountUp.jsx';
import { getHomeDynamicContent, getMenuItems, initializeI18n } from './i18n.jsx';

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

const mountMenu = (lang) => {
    const menuContainer = document.getElementById('staggered-menu-root');
    if (!menuContainer) return;
    const root = rootCache.get(menuContainer) || createRoot(menuContainer);
    rootCache.set(menuContainer, root);

    root.render(
        <StaggeredMenu
            logoUrl="/logo.png"
            position="right"
            isFixed={true}
            colors={['#1a1a2e', '#16213e']}
            accentColor="#a78bfa"
            menuButtonColor="#ffffff"
            openMenuButtonColor="#000000"
            items={getMenuItems(lang, true)}
            socialItems={socialItems}
        />
    );
};

// Try rendering DarkVeil onto an element
const veilContainer = document.getElementById('veil-root');
if (veilContainer) {
    const root = rootCache.get(veilContainer) || createRoot(veilContainer);
    rootCache.set(veilContainer, root);
    root.render(
        <DarkVeil
            hueShift={360}
            noiseIntensity={0.05}
            speed={2.2}
            scanlineIntensity={1}
            scanlineFrequency={5}
            warpAmount={2.8}
        />
    );
}

const renderDynamicContent = (lang) => {
    const content = getHomeDynamicContent(lang);

    const blurContainer = document.getElementById('blur-root');
    if (blurContainer) {
        const root = rootCache.get(blurContainer) || createRoot(blurContainer);
        rootCache.set(blurContainer, root);
        root.render(
            <BlurText
                text={content.buildTitle}
                className="build-title"
                delay={150}
                animateBy="words"
                direction="top"
            />
        );
    }

    const aboutTitleContainer = document.getElementById('about-title-root');
    if (aboutTitleContainer) {
        const root = rootCache.get(aboutTitleContainer) || createRoot(aboutTitleContainer);
        rootCache.set(aboutTitleContainer, root);
        root.render(
            <BlurText
                text={content.aboutTitle}
                className="section-big-title"
                delay={150}
                animateBy="words"
                direction="top"
            />
        );
    }

    const aboutTextContainer = document.getElementById('about-text-root');
    if (aboutTextContainer) {
        const root = rootCache.get(aboutTextContainer) || createRoot(aboutTextContainer);
        rootCache.set(aboutTextContainer, root);
        root.render(
            <>
                {content.aboutParagraphs.map((text, i) => (
                    <SplitText
                        key={i}
                        text={text}
                        className="about-paragraph"
                        delay={15}
                        animateBy="text"
                        direction="bottom"
                        tag="p"
                        offset={i * 200}
                    />
                ))}
            </>
        );
    }

    const heroNoteContainer = document.getElementById('hero-note-root');
    if (heroNoteContainer) {
        const root = rootCache.get(heroNoteContainer) || createRoot(heroNoteContainer);
        rootCache.set(heroNoteContainer, root);
        const heroNoteLines = [
            'Har bir tizim aniq arxitektura va puxta rejalashtirilgan yechimlardan boshlanadi.',
            'Interfeyslar faqat yuzasi — haqiqiy kuch esa uning ortidagi tizimda bo‘ladi.',
            'Men murakkab vazifalarni barqaror va kengayadigan tizimlarga aylantiraman.',
            'Toza kod, aniq arxitektura va uzoq muddatli ishlash — har bir loyihaning asosi.',
            'Natijada oddiy sahifalar emas, balki real biznes muammolarini hal qiladigan tizimlar yaratiladi.',
        ];

        root.render(
            <>
                {heroNoteLines.map((text, index) => (
                    <SplitText
                        key={index}
                        text={text}
                        className="hero-note-line"
                        delay={0}
                        animateBy="text"
                        direction="top"
                        tag="p"
                        offset={index * 140}
                    />
                ))}
            </>
        );
    }
};

// Render CountUp animations
const counterTargets = [
    { id: 'stat-num-1', to: 2 },
    { id: 'stat-num-2', to: 20 },
    { id: 'stat-num-3', to: 10 },
    { id: 'service-num-1', to: 1, padZero: true },
    { id: 'service-num-2', to: 2, padZero: true },
    { id: 'service-num-3', to: 3, padZero: true },
    { id: 'service-num-4', to: 4, padZero: true },
];

const deferredStatCounters = [];

counterTargets.forEach(({ id, to, padZero }) => {
    const el = document.getElementById(id);
    if (el) {
        if (id.startsWith('stat-num-')) {
            deferredStatCounters.push({ element: el, to });
            return;
        }
        const root = rootCache.get(el) || createRoot(el);
        rootCache.set(el, root);
        root.render(<CountUp from={0} to={to} separator="," direction="up" duration={2} className="count-up-text" padZero={!!padZero} />);
    }
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

    const anchor = document.querySelector('.about-stats') || document.getElementById('about');
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

initializeI18n('home', (lang) => {
    mountMenu(lang);
    renderDynamicContent(lang);
});

// Scroll-triggered animations for service items
// Use setTimeout to ensure all DOM elements are fully rendered
setTimeout(() => {
    const serviceItems = document.querySelectorAll('.service-item');
    if (serviceItems.length === 0) return;

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(serviceItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.classList.add('is-line-visible');
                }, index * 150);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    serviceItems.forEach(item => scrollObserver.observe(item));
}, 100);

setTimeout(() => {
    const dividers = Array.from(document.querySelectorAll('.reveal-divider'));
    if (!dividers.length) return;

    const dividerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const index = dividers.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('is-line-visible');
            }, Math.max(index, 0) * 120);

            dividerObserver.unobserve(entry.target);
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    dividers.forEach((divider) => dividerObserver.observe(divider));
}, 120);
