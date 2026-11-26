/* qualiobra — carrossel de depoimentos (troca automática a cada 8 s, com barra de progresso)
   A entrada ao rolar fica com o main.js, como nas outras seções da página inicial. */
(function () {
  'use strict';
  const section = document.getElementById('depoimentos');
  const T = window.QO_DEPOIMENTOS || [];
  if (!section || T.length === 0) return;
  const g = window.gsap;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTERVAL = 8000;
  const el = (k) => section.querySelector('[data-t-' + k + ']');
  const card = section.querySelector('figure');
  const quoteBox = section.querySelector('[data-quote]');
  const bar = section.querySelector('[data-tprogress]');
  let i = 0, timer = null;

  function render(n) {
    const t = T[n];
    el('quote').textContent = t.quote;
    el('initials').textContent = t.initials;
    el('name').textContent = t.name;
    el('detail').textContent = t.detail;
    el('link').setAttribute('href', t.href);
    if (g && !reduce) g.fromTo(quoteBox.children, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12 });
  }
  function progress() {
    if (g && bar && !reduce) g.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: INTERVAL / 1000, ease: 'none', overwrite: true });
  }
  function next() { i = (i + 1) % T.length; render(i); progress(); }
  function start() { stop(); progress(); timer = setInterval(next, INTERVAL); }
  function stop() { clearInterval(timer); timer = null; if (g && bar) { g.killTweensOf(bar); g.set(bar, { scaleX: 0 }); } }

  // pausa quando a aba não está visível e enquanto a pessoa lê (mouse ou foco no card)
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  if (card) {
    card.addEventListener('mouseenter', stop);
    card.addEventListener('mouseleave', start);
    card.addEventListener('focusin', stop);
    card.addEventListener('focusout', start);
  }
  render(0);
  start();
})();
