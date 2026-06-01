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

/* ─── Modal helpers ──────────────────────────────────── */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.fs-modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.fs-modal-overlay.open').forEach(o => closeModal(o.id));
  }
});

/* ─── Claim modal ────────────────────────────────────── */
document.getElementById('claimBtn').addEventListener('click', () => openModal('claimOverlay'));
document.getElementById('claimClose').addEventListener('click', () => closeModal('claimOverlay'));

document.getElementById('claimForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const first = f.first.value.trim();
  const last  = f.last.value.trim();
  const email = f.email.value.trim();
  const phone   = f.phone.value.trim();
  const zip     = f.zip.value.trim();
  const message = f.message.value.trim();
  const body  = [
    `First Name: ${first}`,
    `Last Name: ${last}`,
    `Email: ${email}`,
    phone   ? `Phone: ${phone}`     : null,
    zip     ? `ZIP Code: ${zip}`    : null,
    message ? `\nMessage:\n${message}` : null,
    '',
    '-- Fresh-Scent 25% Off Claim Form --',
  ].filter(l => l !== null).join('\n');
  window.location.href =
    `mailto:support@fresh-scent.com` +
    `?subject=${encodeURIComponent('25% Off Claim — ' + first + ' ' + last)}` +
    `&body=${encodeURIComponent(body)}`;
});

/* ─── Contact modal ──────────────────────────────────── */
document.querySelectorAll('.open-contact').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    closeMobileNav();
    openModal('contactOverlay');
  });
});
document.getElementById('contactClose').addEventListener('click', () => closeModal('contactOverlay'));

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f       = e.target;
  const first   = f.first.value.trim();
  const last    = f.last.value.trim();
  const email   = f.email.value.trim();
  const subject = f.subject.value.trim() || 'Contact Form Inquiry';
  const message = f.message.value.trim();
  const body = [
    `From: ${first} ${last}`,
    `Email: ${email}`,
    '',
    message,
    '',
    '-- Fresh-Scent Contact Form --',
  ].join('\n');
  window.location.href =
    `mailto:support@fresh-scent.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
});
