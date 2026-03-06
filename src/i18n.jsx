import React from 'react';
import { createRoot } from 'react-dom/client';

const rootCache = new WeakMap();

const translations = {
  uz: {
    common: {
      menu_home: 'Bosh sahifa',
      menu_services: 'Xizmatlar',
      menu_about: 'Men haqimda',
      menu_projects: 'Loyihalar',
      menu_contact: 'Aloqa',
      service_1_title: 'Korporativ ERP yechimlari',
      service_1_body:
        "ERPNext asosidagi to'liq yechimlar — maxsus ishlab chiqarish jarayonlari, ombor avtomatizatsiyasi, ko'p filialli inventar nazorati va uchinchi tomon API integratsiyalarigacha. Real operatsion murakkablikni ko'tara oladigan tizimlar.",
      service_2_title: 'Yuqori unumli TUI dasturlari',
      service_2_body:
        "Linux muhiti uchun to'liq funksional terminal interfeyslari — maksimal tezlik, nolga yaqin dependency va to'g'ridan-to'g'ri qurilma bilan ishlash uchun yaratiladi. GUI sekin bo'lganda, TUI natija beradi.",
      service_3_title: 'Telegram avtomatlashtirish tizimlari',
      service_3_body:
        "Biznes workflow'larini boshqaradigan production-grade Telegram botlari — avtomatik bildirishnomalar, sales pipeline tracking, inventar alert'lari, masofaviy boshqaruv va real-time hisobotlar.",
      service_4_title: 'Qurilma va tizim integratsiyalari',
      service_4_body:
        "Dastur va qurilma orasidagi bo'shliqni yopish — RFID reader, thermal printer, barcode scanner va custom API'larni production muhitda ishonchli ishlaydigan backend tizimlarga ulash.",
      rare_skill: 'Noyob ko‘nikma',
      about_p1:
        "Men real ish jarayonlari uchun ishlab chiqarish darajasidagi dasturiy yechimlar yaratishga ixtisoslashgan tizimlarga yo‘naltirilgan dasturchiman. Mening faoliyatim oddiy veb interfeyslar bilan cheklanmaydi — men biznes operatsiyalarini markaziy darajada qo‘llab-quvvatlaydigan barqaror va kengayadigan tizim arxitekturalarini ishlab chiqaman.",
      about_p2:
        "Yillar davomida ERPNext platformasi bilan keng ko‘lamda ishladim: maxsus modullar, ishlab chiqarish jarayonlari, ombor avtomatlashtirish tizimlari hamda real ehtiyojlarga mos murakkab integratsiyalarni yaratdim. Mening asosiy yondashuvim tezkor vaqtinchalik yechimlar emas, balki toza arxitektura, qo‘llab-quvvatlash qulayligi va uzoq muddatli miqyoslanishdir.",
      about_p3:
        "Shuningdek, yuqori tezlik, ishonchlilik va qurilma darajasidagi integratsiya uchun mo‘ljallangan Linux asosidagi TUI dasturlarini ham ishlab chiqaman. Bunday tizimlar RFID uskunalari, printerlar, API xizmatlari va backend servislar bilan bevosita ishlaydi hamda operatsion jarayonlarning uzluksizligini ta’minlaydi.",
      about_p4:
        "Bundan tashqari, biznes jarayonlarini soddalashtiradigan Telegram avtomatlashtirish tizimlarini ham yarataman. Ular bildirishnomalar, monitoring, masofaviy boshqaruv va jarayonlarni kuzatish kabi funksiyalar orqali kundalik operatsiyalarni ancha samarali qiladi.",
      about_p5:
        "Mening yondashuvim tizimli fikrlashga asoslanadi: avval unumdorlik, dizayn darajasidan boshlab miqyoslanish va imkon qadar chuqur avtomatlashtirish. Backend arxitekturasidan deployment bosqichigacha bo‘lgan yechimlarni men real ta’sir beradigan, ishonchli va uzoq muddat xizmat qiladigan tizim sifatida quraman.",
      stat_years: 'Yillik tajriba',
      stat_projects: 'Tugallangan loyihalar',
      stat_clients: 'Mamnun mijozlar',
    },
    home: {
      document_title: 'Yumshoq Portfolio ✨',
      hero_line_1: 'G‘oyadan',
      hero_line_2: 'tizim',
      hero_line_3: 'arxitekturasigacha',
      hero_subtitle: 'Toza kod. Aqlli tizimlar. Haqiqiy natija.',
      build_title: 'Men nimalar qura olganman',
      scroll_line_1: 'DAVOM ETING',
      scroll_line_2: 'KO‘PROQ BILISH UCHUN',
      about_title: 'MEN HAQIMDA',
      about_next: 'KEYINGI SAHIFA',
      footer_title: 'Murojaat qiling',
      footer_body: 'Loyihangiz bormi? Keling, birga kuchli narsa quramiz.',
      footer_cta: 'Xabar yuborish →',
      curved_text: 'Tizimlar ✦ Sahifalardan ✦ Muhimroq ✦ ',
    },
    services: {
      document_title: 'Xizmatlar',
      badge: 'Xizmatlar',
      title: 'Nimalar Yarataman',
      lead: 'Fokuslangan tizimlar, operatsion dasturlar va production-grade vositalar.',
      footer_cta: 'Xabar yuborish →',
    },
    about: {
      document_title: 'Men haqimda',
      badge: 'Men haqimda',
      title: 'Men Haqimda',
      lead: 'Real operatsiyalar uchun systems-focused development.',
      footer_cta: 'Keyingi: Loyihalar →',
    },
    projects: {
      document_title: 'Loyihalar',
      badge: 'Loyihalar',
      title: 'Tanlangan Ishlar',
      lead: 'Mavjud loyihalar bo‘limi uchun alohida sahifa.',
      p1_title: 'Korporativ Website',
      p1_body: 'Biznes mijoz uchun toza dizayn va silliq animatsiyalar.',
      p2_title: 'Portfolio Shabloni',
      p2_body: 'Creative va developer’lar uchun zamonaviy personal sahifa.',
      p3_title: 'E-Commerce Platforma',
      p3_body: 'Yuqori sifatli shopping tajribasi uchun silliq UI.',
      footer_cta: 'Keyingi: Aloqa →',
    },
    contact: {
      document_title: 'Aloqa',
      badge: 'Aloqa',
      title: 'Gaplashamiz',
      lead: 'Alohida sahifadagi to‘g‘ridan-to‘g‘ri linklar.',
      footer_cta: 'Bosh sahifaga qaytish →',
    },
  },
  en: {
    common: {
      menu_home: 'Home',
      menu_services: 'Services',
      menu_about: 'About',
      menu_projects: 'Projects',
      menu_contact: 'Contact',
      service_1_title: 'Enterprise ERP Solutions',
      service_1_body:
        'End-to-end ERPNext implementations — from custom manufacturing workflows and warehouse automation to multi-branch inventory control and third-party API integrations. Systems built to handle real operational complexity at scale.',
      service_2_title: 'High-Performance TUI Applications',
      service_2_body:
        'Full-featured terminal user interfaces for Linux environments — designed for maximum speed, zero-dependency operation, and direct hardware communication. When GUIs are too slow, TUIs deliver.',
      service_3_title: 'Telegram Automation Systems',
      service_3_body:
        'Production-grade Telegram bots that power business workflows — automated notifications, sales pipeline tracking, inventory alerts, remote device management, and real-time reporting dashboards.',
      service_4_title: 'Hardware & System Integrations',
      service_4_body:
        'Bridging the gap between software and hardware — RFID readers, thermal printers, barcode scanners, and custom APIs wired into robust backend systems that work reliably in production environments.',
      rare_skill: 'Rare Skill',
      about_p1:
        'I am a systems-focused developer specializing in building real-world, production-grade software. My work goes beyond simple web interfaces — I design and engineer scalable architectures that power business operations from the core.',
      about_p2:
        'Over the years, I have worked extensively with ERPNext, building custom modules, manufacturing flows, warehouse automation systems, and complex integrations tailored to real operational needs. I focus on clean architecture, maintainability, and long-term scalability rather than quick, temporary solutions.',
      about_p3:
        'I also develop high-performance Linux-based TUI applications designed for speed, reliability, and hardware-level integration. These systems interact with RFID devices, printers, APIs, and backend services, forming tightly integrated, efficient operational platforms.',
      about_p4:
        'In addition, I build Telegram automation systems that streamline business workflows, notifications, monitoring, and remote control capabilities. I believe automation should reduce complexity, not add to it.',
      about_p5:
        'My approach is rooted in systems thinking — performance first, scalability by design, and automation wherever possible. From backend engineering to deployment and infrastructure, I build solutions that are engineered for impact and built to scale.',
      stat_years: 'Years Experience',
      stat_projects: 'Projects Completed',
      stat_clients: 'Happy Clients',
    },
    home: {
      document_title: 'Soft Portfolio ✨',
      hero_line_1: 'From Idea to',
      hero_line_2: 'Scalable',
      hero_line_3: 'Architecture.',
      hero_subtitle: 'Clean code. Smart systems. Real impact.',
      build_title: 'What I Build',
      scroll_line_1: 'KEEP SCROLLING',
      scroll_line_2: 'TO LEARN MORE',
      about_title: 'ABOUT ME',
      about_next: 'NEXT PAGE',
      footer_title: "LET'S TALK",
      footer_body: "Got a project in mind? Let's make something great together.",
      footer_cta: 'Send a Message →',
      curved_text: 'Think ✦ In ✦ Systems ✦ Not ✦ Pages ✦ ',
    },
    services: {
      document_title: 'Services',
      badge: 'Services',
      title: 'What I Build',
      lead: 'Focused systems, operational software, and production-grade tools.',
      footer_cta: 'Send a Message →',
    },
    about: {
      document_title: 'About',
      badge: 'About',
      title: 'About Me',
      lead: 'Systems-focused development for real-world operations.',
      footer_cta: 'Next: Projects →',
    },
    projects: {
      document_title: 'Projects',
      badge: 'Projects',
      title: 'Selected Work',
      lead: 'A separate page for the existing project section.',
      p1_title: 'Corporate Website',
      p1_body: 'Clean design with smooth animations for a business client.',
      p2_title: 'Portfolio Template',
      p2_body: 'Modern personal page for creatives and developers.',
      p3_title: 'E-Commerce Platform',
      p3_body: 'Smooth UI with high-quality shopping experience.',
      footer_cta: 'Next: Contact →',
    },
    contact: {
      document_title: 'Contact',
      badge: 'Contact',
      title: "Let's Talk",
      lead: 'Direct links in a separate page.',
      footer_cta: 'Back Home →',
    },
  },
  ru: {
    common: {
      menu_home: 'Главная',
      menu_services: 'Услуги',
      menu_about: 'Обо мне',
      menu_projects: 'Проекты',
      menu_contact: 'Контакты',
      service_1_title: 'Корпоративные ERP-решения',
      service_1_body:
        'Полноценные решения на базе ERPNext — от кастомных производственных процессов и автоматизации склада до многофилиального контроля запасов и интеграций со сторонними API. Системы для реальной операционной сложности.',
      service_2_title: 'Высокопроизводительные TUI-приложения',
      service_2_body:
        'Полнофункциональные терминальные интерфейсы для Linux — разработанные для максимальной скорости, почти без зависимостей и с прямой работой с оборудованием. Когда GUI слишком медленный, TUI решает.',
      service_3_title: 'Системы автоматизации Telegram',
      service_3_body:
        'Production-grade Telegram-боты для бизнес-процессов — автоматические уведомления, отслеживание sales pipeline, inventory alerts, удалённое управление и отчёты в реальном времени.',
      service_4_title: 'Интеграции оборудования и систем',
      service_4_body:
        'Связь между софтом и железом — RFID-ридеры, thermal printers, barcode scanners и custom API, подключённые к надёжным backend-системам для production-среды.',
      rare_skill: 'Редкий навык',
      about_p1:
        'Я systems-focused разработчик, специализирующийся на создании production-grade программ для реального мира. Моя работа выходит за рамки обычных web-интерфейсов — я проектирую scalable-архитектуры для бизнес-операций.',
      about_p2:
        'За эти годы я много работал с ERPNext: создавал custom-модули, производственные workflow, автоматизацию склада и сложные интеграции под реальные задачи. Мой фокус — чистая архитектура, поддерживаемость и долгосрочная scalability.',
      about_p3:
        'Также я разрабатываю высокопроизводительные Linux TUI-приложения для скорости, надёжности и интеграции на уровне оборудования. Эти системы работают с RFID, принтерами, API и backend-сервисами.',
      about_p4:
        'Кроме того, я создаю системы автоматизации Telegram, которые упрощают бизнес-процессы, уведомления, мониторинг и удалённое управление. Автоматизация должна уменьшать сложность, а не увеличивать её.',
      about_p5:
        'Мой подход основан на systems thinking — сначала performance, scalability по дизайну и максимум автоматизации. От backend до deployment я строю решения, рассчитанные на реальный impact.',
      stat_years: 'Лет опыта',
      stat_projects: 'Завершённых проектов',
      stat_clients: 'Довольных клиентов',
    },
    home: {
      document_title: 'Мягкое портфолио ✨',
      hero_line_1: 'От идеи к',
      hero_line_2: 'Scalable',
      hero_line_3: 'архитектуре.',
      hero_subtitle: 'Чистый код. Умные системы. Реальный результат.',
      build_title: 'Что я создаю',
      scroll_line_1: 'ПРОКРУЧИВАЙ',
      scroll_line_2: 'ЧТОБЫ УЗНАТЬ БОЛЬШЕ',
      about_title: 'ОБО МНЕ',
      about_next: 'СЛЕДУЮЩАЯ СТРАНИЦА',
      footer_title: 'ДАВАЙ ПОГОВОРИМ',
      footer_body: 'Есть идея проекта? Давай создадим что-то сильное вместе.',
      footer_cta: 'Отправить сообщение →',
      curved_text: 'Думай ✦ Системами ✦ А ✦ Не ✦ Страницами ✦ ',
    },
    services: {
      document_title: 'Услуги',
      badge: 'Услуги',
      title: 'Что я создаю',
      lead: 'Сфокусированные системы, операционный софт и production-grade инструменты.',
      footer_cta: 'Отправить сообщение →',
    },
    about: {
      document_title: 'Обо мне',
      badge: 'Обо мне',
      title: 'Обо мне',
      lead: 'Systems-focused разработка для реальных операций.',
      footer_cta: 'Далее: Проекты →',
    },
    projects: {
      document_title: 'Проекты',
      badge: 'Проекты',
      title: 'Избранные работы',
      lead: 'Отдельная страница для существующего блока проектов.',
      p1_title: 'Корпоративный сайт',
      p1_body: 'Чистый дизайн и плавные анимации для бизнес-клиента.',
      p2_title: 'Шаблон портфолио',
      p2_body: 'Современная персональная страница для креативщиков и разработчиков.',
      p3_title: 'E-Commerce платформа',
      p3_body: 'Плавный UI и качественный shopping experience.',
      footer_cta: 'Далее: Контакты →',
    },
    contact: {
      document_title: 'Контакты',
      badge: 'Контакты',
      title: 'Давай поговорим',
      lead: 'Прямые ссылки на отдельной странице.',
      footer_cta: 'Назад на главную →',
    },
  },
};

const labels = {
  uz: 'UZ',
  en: 'EN',
  ru: 'RU',
};

export const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'uz';
  return window.localStorage.getItem('site-language') || 'uz';
};

export const translate = (page, lang, key) => {
  return translations[lang]?.[page]?.[key] ?? translations[lang]?.common?.[key] ?? key;
};

const setStoredLanguage = (lang) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('site-language', lang);
};

const getHtmlLang = (lang) => {
  if (lang === 'ru') return 'ru';
  if (lang === 'en') return 'en';
  return 'uz';
};

export const applyStaticTranslations = (page, lang) => {
  document.documentElement.lang = getHtmlLang(lang);
  document.title = translate(page, lang, 'document_title');

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translate(page, lang, key);
  });
};

const LanguageSwitcher = ({ lang, onChange }) => (
  <div className="lang-switcher" aria-label="Language switcher">
    {['uz', 'en', 'ru'].map((code) => (
      <button
        key={code}
        type="button"
        className={`lang-switcher-btn${lang === code ? ' is-active' : ''}`}
        onClick={() => onChange(code)}
      >
        {labels[code]}
      </button>
    ))}
  </div>
);

export const mountLanguageSwitcher = (lang, onChange) => {
  const container = document.getElementById('lang-switcher-root');
  if (!container) return;
  const root = rootCache.get(container) || createRoot(container);
  rootCache.set(container, root);
  root.render(<LanguageSwitcher lang={lang} onChange={onChange} />);
};

export const initializeI18n = (page, onLanguageChange) => {
  const apply = (lang) => {
    setStoredLanguage(lang);
    applyStaticTranslations(page, lang);
    onLanguageChange?.(lang);
    mountLanguageSwitcher(lang, apply);
  };

  apply(getInitialLanguage());
};

export const getMenuItems = (lang, isHome = false) => {
  const homeLink = isHome ? '#hero' : './index.html';

  return [
    { label: translate('common', lang, 'menu_home'), link: homeLink },
    { label: translate('common', lang, 'menu_services'), link: './services.html' },
    { label: translate('common', lang, 'menu_about'), link: './about.html' },
    { label: translate('common', lang, 'menu_projects'), link: './projects.html' },
    { label: translate('common', lang, 'menu_contact'), link: './contact.html' },
  ];
};

export const getHomeDynamicContent = (lang) => ({
  buildTitle: translate('home', lang, 'build_title'),
  aboutTitle: translate('home', lang, 'about_title'),
  curvedText: translate('home', lang, 'curved_text'),
  aboutParagraphs: [
    translate('common', lang, 'about_p1'),
    translate('common', lang, 'about_p2'),
    translate('common', lang, 'about_p3'),
    translate('common', lang, 'about_p4'),
    translate('common', lang, 'about_p5'),
  ],
});
