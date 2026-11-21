/* Quali Obras — interações e animações (GSAP + ScrollTrigger) */
(function () {
  'use strict';
  const root = document.getElementById('app');
  if (!root) return;
  const g = window.gsap, ST = window.ScrollTrigger;

  /* ---------- Animações ---------- */
  if (!g) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (ST) g.registerPlugin(ST);
  g.context(() => {

      g.from('[data-hero]', { y: 56, opacity: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12, delay: 0.15 });
      g.from('[data-hero-img]', { scale: 1.18, duration: 2.6, ease: 'power2.out' });
      const header = root.querySelector('[data-header]');
      if (header && ST) {
        g.set(header, { backgroundColor: 'rgba(10,24,56,0)' });
        ST.create({ start: 80, end: 'max', onToggle: (self) => g.to(header, { backgroundColor: self.isActive ? 'rgba(10,24,56,0.94)' : 'rgba(10,24,56,0)', boxShadow: self.isActive ? '0 10px 30px rgba(5,14,40,0.25)' : '0 0 0 rgba(0,0,0,0)', duration: 0.35 }) });
        g.to('[data-hero-img]', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '#topo', start: 'top top', end: 'bottom top', scrub: true } });
      }
      root.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseInt(el.textContent.replace(/\D/g, ''), 10);
        if (!target || /\[/.test(el.textContent)) return;
        const obj = { v: 0 };
        g.to(obj, { v: target, duration: 2, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('pt-BR'); },
          scrollTrigger: ST ? { trigger: el, start: 'top 85%' } : undefined });
      });
    
  }, root);
})();
