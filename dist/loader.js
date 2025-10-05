"use strict";
(function () {
    function getBasePath() {
        try {
            return location.pathname.indexOf('/html/') !== -1 ? '..' : '.';
        }
        catch {
            return '.';
        }
    }
    function createLoader(logoSrc) {
        const overlay = document.createElement('div');
        overlay.className = 'page-loader';
        const img = document.createElement('img');
        img.src = logoSrc;
        img.alt = 'Logo';
        img.className = 'page-loader__logo';
        overlay.appendChild(img);
        return overlay;
    }
    function showLoader() {
        if (document.querySelector('.page-loader'))
            return;
        const base = getBasePath();
        const logoSrc = `${base}/imges/Logo-Footer.png`;
        const overlay = createLoader(logoSrc);
        document.body.appendChild(overlay);
        document.documentElement.classList.add('no-scroll');
        const DISPLAY_MS = 3000;
        const FADE_MS = 500;
        setTimeout(() => {
            overlay.classList.add('is-hiding');
            setTimeout(() => {
                overlay.remove();
                document.documentElement.classList.remove('no-scroll');
            }, FADE_MS);
        }, DISPLAY_MS);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showLoader);
    }
    else {
        showLoader();
    }
    window.addEventListener('pageshow', () => {
        showLoader();
    });
    function createBackToTopButton() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.type = 'button';
        button.setAttribute('aria-label', 'العودة للأعلى');
        button.innerHTML = '<span aria-hidden="true">▲</span>';
        button.addEventListener('click', () => {
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
        return button;
    }
    function initBackToTop() {
        if (document.querySelector('.back-to-top'))
            return;
        const btn = createBackToTopButton();
        document.body.appendChild(btn);
        const toggleVisibility = () => {
            const shouldShow = window.scrollY > 300;
            btn.classList.toggle('is-visible', shouldShow);
        };
        toggleVisibility();
        window.addEventListener('scroll', toggleVisibility, { passive: true });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackToTop);
    }
    else {
        initBackToTop();
    }
})();
//# sourceMappingURL=loader.js.map