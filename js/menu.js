/* Quali Obras — menu do celular (todas as páginas; não depende do GSAP) */
(function () {
  'use strict';
  const btn = document.querySelector('.qo-menu-btn');
  const menu = document.getElementById('menu-celular');
  if (!btn || !menu) return;
  const html = document.documentElement;
  const mq = window.matchMedia('(max-width: 900px)');

  function setOpen(open, devolverFoco) {
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    html.classList.toggle('qo-menu-aberto', open);
    if (open) {
      const primeiro = menu.querySelector('a');
      if (primeiro) primeiro.focus({ preventScroll: true });
    } else if (devolverFoco) {
      btn.focus();
    }
  }

  btn.addEventListener('click', () => setOpen(menu.hidden));
  // Clicar num link fecha o menu antes de navegar (ou de rolar até a seção)
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setOpen(false, true); });
  // Se a tela crescer até o layout de computador, o painel fecha
  const aoMudar = () => { if (!mq.matches && !menu.hidden) setOpen(false); };
  if (mq.addEventListener) mq.addEventListener('change', aoMudar); else mq.addListener(aoMudar);
})();
