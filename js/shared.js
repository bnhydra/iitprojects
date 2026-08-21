export const NAV = `
<header id="site-header">
  <div id="iitm-bar">
    <img src="images/Logo.png" alt="IIT Madras" onerror="this.style.display='none'"/>
    <div class="iitm-title">
      <h1>Hydraulics and Water Resources Engineering (HWRE) Group</h1>
      <h3><a href="http://civil.iitm.ac.in/" target="_blank" rel="noopener">Department of Civil Engineering</a></h3>
      <h4><a href="https://www.iitm.ac.in/" target="_blank" rel="noopener">Indian Institute of Technology Madras, Chennai-600036, Tamil Nadu, India</a></h4>
    </div>
    <div class="nav-links" id="main-nav-links">
      <a href="index.html"><span>Home</span></a>
      <a href="research.html"><span>Research</span></a>
      <a href="projects.html"><span>Sponsored Projects</span></a>
      <a href="teaching.html"><span>Academic Teaching</span></a>
      <a href="outreach.html"><span>Outreach</span></a>
      <a href="consultancy.html"><span>Consultancy</span></a>
      <a href="people.html"><span>People</span></a>
      <a href="publications.html"><span>Publications</span></a>
      <a href="achievements.html"><span>Achievements</span></a>
      <a href="joinus.html"><span>Join our Team</span></a>
    </div>
    <button class="nav-toggle" onclick="document.getElementById('main-nav-links').classList.toggle('open')">☰</button>
  </div>
</header>`;

export const FOOTER = `
<footer>
  <div class="container">
    <span>© <span id="footer-year">2026</span> Prof. Balaji Narasimhan · Dept. of Civil Engineering, IIT Madras</span>
    <span><a href="index.html">Home</a> · <a href="mailto:nbalaji@iitm.ac.in">nbalaji@iitm.ac.in</a></span>
  </div>
</footer>`;

export function initNav() {
  document.body.insertAdjacentHTML('afterbegin', NAV);
  document.body.insertAdjacentHTML('beforeend', FOOTER);
  const y = new Date().getFullYear();
  const el = document.getElementById('footer-year');
  if (el && y !== 2026) el.textContent = y;
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#site-header .nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

export function showLoader() {
  const el = document.createElement('div');
  el.id = 'page-loader';
  el.innerHTML = '<div class="loader-spinner"></div>';
  document.body.appendChild(el);
}

export function hideLoader() {
  document.getElementById('page-loader')?.remove();
}

export function revealOnScroll() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
