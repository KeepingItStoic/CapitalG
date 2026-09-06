// ════════════════════════════════════════
// CAPITAL DETAIL — global.js
// Shared behavior across all pages
// ════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SCROLL EFFECT ──
  // Adds a solid background to the nav when user scrolls down
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ── SCROLL REVEAL ──
  // Animates elements with class 'reveal' when they enter the viewport
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => io.observe(el));
  }

});
