import { initializePageI18n, mountCounters } from './pageShared.jsx';

initializePageI18n('about');
mountCounters([
    { id: 'about-stat-1', to: 3, variant: 'bits' },
    { id: 'about-stat-2', to: 20, variant: 'bits' },
    { id: 'about-stat-3', to: 10, variant: 'bits' },
]);
