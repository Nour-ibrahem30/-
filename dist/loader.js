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
})();
//# sourceMappingURL=loader.js.map