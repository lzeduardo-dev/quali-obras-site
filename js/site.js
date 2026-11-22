/* Quali Obras — páginas internas (Serviços, Obras, Sobre, páginas de obra) */
(function () {
  'use strict';
  const root = document.getElementById('app');
  if (!root) return;
  const g = window.gsap, ST = window.ScrollTrigger;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const anim = !!g && !reduce;
  if (g && ST) g.registerPlugin(ST);

  /* ---------- Serviços: seletor ---------- */
  const SV = window.QO_SERVICES;
  const svcBtns = [...root.querySelectorAll('[data-svc-btn]')];
  if (SV && svcBtns.length) {
    const activeStyle = svcBtns.find((b) => b.getAttribute('aria-selected') === 'true').getAttribute('style');
    const inactive = svcBtns.find((b) => b.getAttribute('aria-selected') === 'false');
    const inactiveStyle = inactive.getAttribute('style');
    const circleOn = 'flex: 0 0 auto; width: 56px; height: 56px; border-radius: 50%; background: #3B74E0; color: #FFFFFF; display: flex; align-items: center; justify-content: center';
    const circleOff = 'flex: 0 0 auto; width: 56px; height: 56px; border-radius: 50%; border: 1.5px solid #C9D1DE; box-sizing: border-box; color: #141B2D; display: flex; align-items: center; justify-content: center';
    const img = root.querySelector('[data-svc-img]'), title = root.querySelector('[data-svc-title]'), desc = root.querySelector('[data-svc-desc]'), list = root.querySelector('[data-svc-items]');
    const body = title && title.parentElement;
    const check = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CC0EC" stroke-width="2.4" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>';
    let cur = 0;
    function select(k) {
      if (k === cur) return; cur = k;
      svcBtns.forEach((b, i) => {
        const on = i === k;
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        b.setAttribute('style', on ? activeStyle : inactiveStyle);
        const spans = b.children; const sub = spans[0] && spans[0].children[1];
        if (sub) sub.style.color = on ? '#B9C6DE' : '#5B6577';
        if (spans[1]) spans[1].setAttribute('style', on ? circleOn : circleOff);
      });
      const v = SV[k];
      img.src = v.img; img.alt = v.alt; title.textContent = v.title; desc.textContent = v.desc;
      list.innerHTML = v.items.map((t) => '<li style="display: flex; align-items: center; gap: 12px">' + check + t.replace(/</g, '&lt;') + '</li>').join('');
      if (anim) {
        g.fromTo(img, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' });
        g.fromTo(body.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06 });
      }
    }
    svcBtns.forEach((b, i) => b.addEventListener('click', () => select(i)));
  }

  /* ---------- Animações ---------- */
  if (!anim) return;
  g.context(() => {
    g.from('[data-hero]', { y: 50, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.1, delay: 0.1 });
    g.from('[data-float]', { y: 80, opacity: 0, duration: 0.8, delay: 1, ease: 'back.out(1.6)' });
    if (ST) {
      root.querySelectorAll('[data-reveal]').forEach((el) => g.from(el, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
      root.querySelectorAll('[data-stagger]').forEach((grp) => g.from(grp.children, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: grp, start: 'top 85%' } }));
      root.querySelectorAll('[data-parallax]').forEach((img) => g.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } }));
      root.querySelectorAll('[data-drawline]').forEach((ln) => g.from(ln, { scaleX: 0, transformOrigin: 'left center', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: ln, start: 'top 88%' } }));
    }
    root.querySelectorAll('[data-magnet]').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => { const r = btn.getBoundingClientRect(); g.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3 }); });
      btn.addEventListener('mouseleave', () => g.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' }));
    });
  }, root);
})();
