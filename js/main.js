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

    
  }, root);
})();
