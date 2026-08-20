// Lazy image loader
export function lazyLoad(root = document) {
  const imgs = root.querySelectorAll('img.lazy');
  const load = img => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
    img.addEventListener('load',  () => img.classList.add('loaded'), {once:true});
    img.addEventListener('error', () => img.classList.add('loaded'), {once:true});
  };
  if (!('IntersectionObserver' in window)) { imgs.forEach(load); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { load(e.target); obs.unobserve(e.target); } });
  }, {rootMargin:'200px 0px'});
  imgs.forEach(i => io.observe(i));
}

// Scroll-reveal
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, {threshold:0.1});
export function revealAll(root = document) {
  root.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}

// Nav scroll shadow + active link
export function initNav() {
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  }, {passive:true});
  // mark active based on filename
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#mainNav .nav-link').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page) a.classList.add('active');
  });
}

// Shared nav HTML (injected by each page)
export const NAV_HTML = `
<nav id="mainNav" class="navbar navbar-expand-lg fixed-top">
  <div class="container-fluid px-3">
    <a class="navbar-brand" href="index.html">🌊 Flood Forecasting</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="background.html">Background</a></li>
        <li class="nav-item"><a class="nav-link" href="rtff.html">RTFF &amp; RTDAS</a></li>
        <li class="nav-item"><a class="nav-link" href="rht.html">HydroTwin</a></li>
        <li class="nav-item"><a class="nav-link" href="partners.html">Partners</a></li>
        <li class="nav-item"><a class="nav-link" href="reservoir.html">Reservoirs</a></li>
        <li class="nav-item"><a class="nav-link" href="suds.html">SuDS</a></li>
        <li class="nav-item"><a class="nav-link" href="climate.html">Climate</a></li>
        <li class="nav-item"><a class="nav-link" href="gallery.html">Gallery</a></li>
      </ul>
    </div>
  </div>
</nav>`;

// Shared footer HTML
export const FOOTER_HTML = `
<footer>
  <div class="container text-center">
    <p class="mb-1"><strong style="color:#fff">Flood Forecasting Research Group</strong> — Indian Institute of Technology, Madras</p>
    <p class="mb-0">&copy; 2026 &nbsp;|&nbsp; Advisor: Prof. Balaji Narasimhan &nbsp;|&nbsp; <a href="index.html">Home ↑</a></p>
  </div>
</footer>`;

// Lazy img helper
export const img = (src, alt, cls = '') =>
  `<img data-src="${src}" alt="${alt}" class="lazy${cls ? ' '+cls : ''}"/>`;
