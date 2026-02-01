/* ============================================================
   OrgiPro – Main JavaScript
   Features: Scroll nav, reveal animations, smooth scroll
   ============================================================ */
// ─── VIDEO MODAL LOGIC ───
const watchBtn = document.getElementById('watchStoryBtn');
const videoModal = document.getElementById('videoModal');
const modalClose = document.querySelector('.modal-close');
const videoPlayer = document.getElementById('videoPlayer');
const modalOverlay = document.querySelector('.modal-overlay');

// Add your YouTube/Vimeo ID here
const videoURL = "images/monkfruitvideo1.mp4"; 

if (watchBtn) {
  watchBtn.addEventListener('click', () => {
    videoPlayer.src = videoURL;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });
}

const closeModal = () => {
  videoModal.classList.remove('active');
  videoPlayer.src = ""; // Stop video playback
  document.body.style.overflow = ''; // Restore scrolling
};

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
(function () {
  'use strict';

  // ─── NAV SCROLL EFFECT ───
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ─── SMOOTH SCROLL FOR ANCHOR LINKS ───
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─── ACTIVE NAV LINK ON SCROLL ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - nav.offsetHeight - 60;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  // ─── SCROLL REVEAL (Intersection Observer) ───
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Slight staggered delay for sibling reveals
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        siblings.forEach((el, i) => {
          if (el === entry.target) {
            setTimeout(() => el.classList.add('visible'), i * 100);
          }
        });
        // Fallback: always add visible
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── COMPARISON TABLE ROW HOVER HIGHLIGHT ───
  const tableRows = document.querySelectorAll('.compare-table tbody tr');

  tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.filter = 'brightness(0.96) saturate(1.1)';
    });
    row.addEventListener('mouseleave', () => {
      row.style.filter = '';
    });
  });

  // ─── PRODUCT CARD SUBTLE TILT ON HOVER (optional polish) ───
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'none';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = '';
    });
  });

  // ─── COUNTER ANIMATION FOR STATS (if any) ───
  function animateCounter(el, target, duration = 1500) {
    const start = performance.now();
    const isDecimal = String(target).includes('.');

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = isDecimal
        ? (target * eased).toFixed(1)
        : Math.round(target * eased);
      el.textContent = value;

      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ─── HERO BADGE ENTRANCE ANIMATION ───
  window.addEventListener('load', () => {
    const badges = document.querySelectorAll('.hero-badge, .hero-badge-2');
    badges.forEach((badge, i) => {
      badge.style.opacity = '0';
      badge.style.transform = 'translateY(12px) scale(0.92)';
      setTimeout(() => {
        badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        badge.style.opacity = '1';
        badge.style.transform = '';
      }, 600 + i * 200);
    });
  });

})();
