 /* ─── Fresh-Scent main.js ─────────────────────────────── */

/* Nav scroll shadow + transparent-at-top */
const nav = document.getElementById('nav');
function updateNav() {
  nav.classList.toggle('sh', window.scrollY > 20);
  nav.classList.toggle('nav-top', window.scrollY < 10);
}
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

/* Scroll reveal */
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('vis');
  }),
  { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Smooth-scroll helpers (called inline via onclick) */
function scrollTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

/* Mobile nav */
const navBurger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');

navBurger.addEventListener('click', () => {
  const isOpen = navBurger.classList.toggle('open');
  navMobile.classList.toggle('open', isOpen);
  navBurger.setAttribute('aria-expanded', isOpen);
  nav.classList.toggle('nav-menu-open', isOpen);
});

function closeMobileNav() {
  navBurger.classList.remove('open');
  navMobile.classList.remove('open');
  navBurger.setAttribute('aria-expanded', 'false');
  nav.classList.remove('nav-menu-open');
}

/* Sign-up CTA */
document.getElementById('claimBtn').addEventListener('click', () => {
  alert('Thank you! We will be in touch shortly.');
});