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
        const base = getBasePath();
        const logoSrc = `${base}/imges/Logo-Footer.png`;
        const overlay = createLoader(logoSrc);

        document.body.appendChild(overlay);

        // Dim background and lock scroll
        document.body.style.opacity = '0.8';
        document.documentElement.style.overflow = 'hidden';

        const DISPLAY_MS = 3000; // 3 seconds
        const FADE_MS = 500; // fade-out duration (match CSS)

        setTimeout(() => {
            overlay.classList.add('is-hiding');
            document.body.style.opacity = '1';

            setTimeout(() => {
                overlay.remove();
                document.documentElement.style.overflow = '';
            }, FADE_MS);
        }, DISPLAY_MS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showLoader);
    } else {
        showLoader();
    }
})();
