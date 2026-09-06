// ── CAROUSEL ENGINE ──
// Carousels are auto-discovered from the DOM and slide counts are
// counted live from each track's .carousel-slide children — no more
// hardcoded totals to remember to update when photos are added.
const carousels = {};
let activeCarouselId = null; // which carousel keyboard arrows control

function initCarousel(id) {
  const track = document.getElementById(id + '-track');
  const total = track.querySelectorAll('.carousel-slide').length;
  carousels[id] = { current: 0, total };

  const dotsContainer = document.getElementById(id + '-dots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.onclick = () => goTo(id, i);
    dotsContainer.appendChild(dot);
  }

  goTo(id, 0);
}

function goTo(id, index) {
  const c = carousels[id];
  c.current = (index + c.total) % c.total;
  document.getElementById(id + '-track').style.transform = `translateX(-${c.current * 100}%)`;
  document.getElementById(id + '-counter').textContent = `${c.current + 1} / ${c.total}`;
  document.querySelectorAll('#' + id + '-dots .dot').forEach((d, i) => {
    d.classList.toggle('active', i === c.current);
  });
}

function slide(id, dir) {
  goTo(id, carousels[id].current + dir);
}

// ── KEYBOARD NAVIGATION ──
// Arrow keys control whichever carousel is currently active (see
// scroll-based activation below), so this keeps working automatically
// as more vehicle carousels are added.
document.addEventListener('keydown', e => {
  if (!activeCarouselId) return;
  if (e.key === 'ArrowLeft') slide(activeCarouselId, -1);
  if (e.key === 'ArrowRight') slide(activeCarouselId, 1);
});

// ── TOUCH / SWIPE SUPPORT ──
function addSwipe(carouselEl, id) {
  let startX = 0;
  carouselEl.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  carouselEl.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) slide(id, diff > 0 ? 1 : -1);
  });
}

// ── SCROLL REVEAL + ACTIVE-CAROUSEL TRACKING ──
function initScrollReveal() {
  const rows = document.querySelectorAll('.vehicle-row');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Whichever vehicle row is most in view becomes the one
        // arrow keys control.
        const carouselEl = e.target.querySelector('.carousel');
        if (carouselEl && carouselEl.id) {
          activeCarouselId = carouselEl.id.replace('-carousel', '');
        }
      }
    });
  }, { threshold: 0.5 });
  rows.forEach(r => io.observe(r));
}

// ── INIT ON DOM READY ──
// Every element with class "carousel" and an id ending in "-carousel"
// is picked up automatically — add a new vehicle block with its own
// unique id prefix and it just works, no JS changes needed.
document.addEventListener('DOMContentLoaded', () => {
  const carouselEls = document.querySelectorAll('.carousel[id$="-carousel"]');
  carouselEls.forEach((el, i) => {
    const id = el.id.replace('-carousel', '');
    initCarousel(id);
    addSwipe(el, id);
    if (i === 0) activeCarouselId = id; // default before any scrolling
  });
  initScrollReveal();
});
