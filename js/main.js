document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll reveal animations (slide in from left/right/up)
  const revealEls = document.querySelectorAll('.reveal, .stagger');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => io.observe(el));

  // Clay Pop animation on click
  document.querySelectorAll('.btn, .pill, .nav-links a').forEach((el) => {
    el.addEventListener('click', () => {
      el.classList.remove('clay-pop-active');
      void el.offsetWidth;
      el.classList.add('clay-pop-active');
    });
  });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('nav-open');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => links.classList.remove('nav-open'));
    });
  }

  // Set current year in footer
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  init3DTilt();
  initMagnetic();
  initCardSpotlight();
});

// Mouse Position Spotlight Effect on Capability, Experience, Education & Project Cards
function initCardSpotlight() {
  document.querySelectorAll('.highlight-card, .timeline-item, .edu-card, .project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Cursor 3D Tilt Effect on Cards & Profile Photo Frame
function init3DTilt() {
  const targets = document.querySelectorAll('.clay-card, .hero-photo, .social-link, .download-panel');

  targets.forEach((card) => {
    card.style.transformStyle = 'preserve-3d';

    function onMove(e) {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rotateY = px * 12;
      const rotateX = py * -12;

      card.style.transform = `perspective(900px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-6px) scale(1.02)`;
    }

    function onLeave() {
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)';
    }

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });
}

// Magnetic Button Effect
function initMagnetic() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
}
