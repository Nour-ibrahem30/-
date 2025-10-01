(function () {
    function getBasePath(): string {
        try {
            return location.pathname.indexOf('/html/') !== -1 ? '..' : '.';
        } catch {
            return '.';
        }
    }

    function createLoader(logoSrc: string): HTMLDivElement {
        const overlay = document.createElement('div');
        overlay.className = 'page-loader';

        const img = document.createElement('img');
        img.src = logoSrc;
        img.alt = 'Logo';
        img.className = 'page-loader__logo';

        overlay.appendChild(img);
        return overlay;
    }

    function showLoader(): void {
        // Avoid adding multiple overlays if one already exists
        if (document.querySelector('.page-loader')) return;

        const base = getBasePath();
        const logoSrc = `${base}/imges/Logo-Footer.png`;
        const overlay = createLoader(logoSrc);

        document.body.appendChild(overlay);

        // Lock scroll using a class so we don't change body opacity (overlay handles dim)
        document.documentElement.classList.add('no-scroll');

        const DISPLAY_MS = 3000; // 3 seconds
        const FADE_MS = 500; // fade-out duration (match CSS)

        setTimeout(() => {
            overlay.classList.add('is-hiding');

            setTimeout(() => {
                overlay.remove();
                document.documentElement.classList.remove('no-scroll');
            }, FADE_MS);
        }, DISPLAY_MS);
    }

    // Show loader on initial DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showLoader);
    } else {
        showLoader();
    }

    // Also run on pageshow (covers reloads and back/forward navigation)
    window.addEventListener('pageshow', () => {
        // pageshow fires on load and when returning from bfcache; ensure loader runs
        showLoader();
    });
})();
