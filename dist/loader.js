(function () {
  function getBasePath() {
    try {
      return location.pathname.indexOf('/html/') !== -1 ? '..' : '.';
    } catch (_) {
      return '.';
    }
  }

  function createLoader(logoSrc) {
    var overlay = document.createElement('div');
    overlay.className = 'page-loader';

    var img = document.createElement('img');
    img.src = logoSrc;
    img.alt = 'Logo';
    img.className = 'page-loader__logo';

    overlay.appendChild(img);
    return overlay;
  }

  function showLoader() {
    var base = getBasePath();
    var logoSrc = base + '/imges/Logo-Footer.png';
    var overlay = createLoader(logoSrc);

    document.body.appendChild(overlay);

    // Dim background and lock scroll
    document.body.style.opacity = '0.8';
    document.documentElement.style.overflow = 'hidden';

    var DISPLAY_MS = 10000000; // 10000 seconds
    var FADE_MS = 500; // fade-out duration should match CSS

    setTimeout(function () {
      overlay.classList.add('is-hiding');
      document.body.style.opacity = '1';
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
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

