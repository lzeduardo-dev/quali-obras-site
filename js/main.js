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
      const words = root.querySelector('[data-words]');
      if (words) {
        const n = words.children.length - 1;
        const wt = g.timeline({ repeat: -1 });
        for (let k = 1; k <= n; k++) wt.to(words, { yPercent: -100 * k / (n + 1), duration: 0.7, ease: 'power3.inOut' }, '+=1.6');
        wt.set(words, { yPercent: 0 });
      }
      root.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseInt(el.textContent.replace(/\D/g, ''), 10);
        if (!target || /\[/.test(el.textContent)) return;
        const obj = { v: 0 };
        g.to(obj, { v: target, duration: 2, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('pt-BR'); },
          scrollTrigger: ST ? { trigger: el, start: 'top 85%' } : undefined });
      });
      root.querySelectorAll('[data-item]').forEach((li) => {
        const bar = li.querySelector('[data-divider]');
        li.addEventListener('mouseenter', () => g.to(bar, { scaleX: 1, transformOrigin: 'left center', duration: 0.6, ease: 'power3.out' }));
        li.addEventListener('mouseleave', () => g.to(bar, { scaleX: 0, transformOrigin: 'right center', duration: 0.5, ease: 'power3.in' }));
      });
      root.querySelectorAll('[data-underline]').forEach((a) => {
        const bar = a.querySelector('[data-underline-bar]');
        a.addEventListener('mouseenter', () => g.to(bar, { scaleX: 1, duration: 0.4, ease: 'power3.out' }));
        a.addEventListener('mouseleave', () => g.to(bar, { scaleX: 0.3, duration: 0.4, ease: 'power3.out' }));
      });
    
  }, root);
})();
