// ============================================================
// PROALCO — Script compartido
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Año en footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar: cambia de transparente a sólido al hacer scroll
  const navbar = document.getElementById('navbar');
  const onScrollNav = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  if (navbar) { onScrollNav(); window.addEventListener('scroll', onScrollNav, { passive: true }); }

  // Menú móvil
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal, .reveal-zoom').forEach(el => io.observe(el));

  // Contadores animados
  const counters = document.querySelectorAll('.counter-num');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const cIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); cIo.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => cIo.observe(el));

  // Tilt premium en tarjetas con clase .tilt
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)'; });
  });

  // Parallax sutil en elementos con data-parallax
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        el.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }

  // Lightbox de galería
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item').forEach(btn => {
      btn.addEventListener('click', () => {
        lightboxImg.src = btn.getAttribute('data-full');
        lightbox.classList.add('open');
      });
    });
    const closeBtn = document.getElementById('lightboxClose');
    if (closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  }

  // Scroll-spy: resalta el enlace activo segun la seccion visible
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length && navAnchors.length) {
    const spyIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(a => {
            a.classList.toggle('in-view', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => spyIo.observe(s));
  }


  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const inputs = this.querySelectorAll('input, select, textarea');
      const [name, company, phone, sector, msg] = inputs;
      let text = `Hola PROALCO, quiero solicitar una cotización.\n\n`;
      text += `Nombre: ${name.value}\n`;
      if (company && company.value) text += `Empresa/Granja: ${company.value}\n`;
      text += `Teléfono: ${phone.value}\n`;
      text += `Sector de interés: ${sector.value}\n`;
      if (msg && msg.value) text += `Detalle: ${msg.value}\n`;
      const url = `https://wa.me/573148400754?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }
});
