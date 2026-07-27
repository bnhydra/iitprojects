// ── Lazy image loader ───────────────────────────────────────────────────────
// Uses IntersectionObserver to load images only when near the viewport.
// Falls back to immediate load for browsers without IntersectionObserver.
(function () {
    const lazyImgs = Array.from(document.querySelectorAll('img.lazy'));
    if (!lazyImgs.length) return;

    function loadImg(img) {
        const src = img.dataset.src;
        if (!src) return;
        img.src = src;
        img.removeAttribute('data-src');
        img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
        img.addEventListener('error', () => img.classList.add('loaded'), { once: true });
    }

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    loadImg(e.target);
                    obs.unobserve(e.target);
                }
            });
        }, { rootMargin: '200px 0px' }); // start loading 200px before entering viewport
        lazyImgs.forEach(img => io.observe(img));
    } else {
        // Fallback: load all immediately
        lazyImgs.forEach(loadImg);
    }
})();

// ── Navbar shadow on scroll ─────────────────────────────────────────────────
window.addEventListener('scroll', () => {
    document.getElementById('mainNav')?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Scroll-spy ──────────────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#mainNav .nav-link[href^="#"]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}, { passive: true });

// ── Gallery lightbox ────────────────────────────────────────────────────────
const lbModal = document.getElementById('lightboxModal');
const lbImg   = document.getElementById('lightboxImg');
if (lbModal && lbImg) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            // Use data-src if not yet loaded, otherwise use current src
            const img = item.querySelector('img');
            lbImg.src = img.src || img.dataset.src;
            new bootstrap.Modal(lbModal).show();
        });
    });
}

// ── Scroll-reveal ────────────────────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
