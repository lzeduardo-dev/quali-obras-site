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
        g.fromTo(img, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' });
        g.fromTo(body.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06 });
      }
    }
    svcBtns.forEach((b, i) => b.addEventListener('click', () => select(i)));
  }

  /* ---------- Obras: filtros ---------- */
  const cards = [...root.querySelectorAll('[data-card]')];
  if (cards.length) {
    const fBtns = [...root.querySelectorAll('[data-filter]')];
    const sel = root.querySelector('[data-method-select]');
    const countLabel = root.querySelector('[data-countlabel]');
    const empty = root.querySelector('[data-empty]');
    const grid = root.querySelector('[data-grid]');
    const onStyle = fBtns.find((b) => b.getAttribute('aria-pressed') === 'true').getAttribute('style');
    const offStyle = fBtns.find((b) => b.getAttribute('aria-pressed') === 'false').getAttribute('style');
    const pattern = [['g4', 'r-wide'], ['g2', 'r-tall'], ['g3', 'r-half'], ['g3', 'r-half'], ['g3', 'r-half'], ['g3', 'r-half']];
    let cat = 'Todas';
    function apply(animate) {
      const method = sel ? sel.value : '';
      const byMethod = cards.filter((c) => !method || c.dataset.method === method);
      const visible = byMethod.filter((c) => cat === 'Todas' || c.dataset.cat === cat);
      cards.forEach((c) => { c.style.display = 'none'; });
      visible.forEach((c, i) => {
        const p = pattern[i % pattern.length];
        c.style.display = 'flex'; c.className = p[0];
        const box = c.querySelector('[data-ratio]'); if (box) box.className = p[1];
        grid.appendChild(c);
      });
      fBtns.forEach((b) => {
        const label = b.dataset.filter, on = label === cat;
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.setAttribute('style', on ? onStyle : offStyle);
        const cnt = b.querySelector('[data-fcount]');
        cnt.textContent = label === 'Todas' ? byMethod.length : byMethod.filter((c) => c.dataset.cat === label).length;
        cnt.style.color = on ? '#9CC0EC' : '#5B6577';
      });
      countLabel.textContent = visible.length + (visible.length === 1 ? ' obra' : ' obras');
      grid.hidden = visible.length === 0; if (empty) empty.hidden = visible.length !== 0;
      if (animate && anim) {
        g.fromTo(visible, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07 });
        visible.forEach((c, i) => {
          const box = c.querySelector('[data-reveal-img]'), im = box && box.querySelector('img');
          if (box) g.fromTo(box, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, delay: i * 0.07, ease: 'power4.inOut' });
          if (im) g.fromTo(im, { scale: 1.3 }, { scale: 1, duration: 0.95, delay: i * 0.07, ease: 'power3.out' });
        });
      }
    }
    fBtns.forEach((b) => b.addEventListener('click', () => { cat = b.dataset.filter; apply(true); }));
    if (sel) sel.addEventListener('change', () => apply(true));
    const clear = root.querySelector('[data-clear]');
    if (clear) clear.addEventListener('click', () => { cat = 'Todas'; if (sel) sel.value = ''; apply(true); });
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
      root.querySelectorAll('[data-count]').forEach((el) => {
        const t = parseInt(el.textContent.replace(/\D/g, ''), 10); if (!t || /\[/.test(el.textContent)) return;
        const o = { v: 0 }; g.to(o, { v: t, duration: 2, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('pt-BR'); }, scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
      root.querySelectorAll('[data-drawline]').forEach((ln) => g.from(ln, { scaleX: 0, transformOrigin: 'left center', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: ln, start: 'top 88%' } }));
      root.querySelectorAll('[data-reveal-wide]').forEach((box) => {
        const img = box.querySelector('img');
        // Abre (cortina + zoom) acompanhando a rolagem. Quando termina de abrir, solta da rolagem
        // e fica congelada: subir a página não fecha a imagem de novo.
        const tl = g.timeline({ paused: true, defaults: { ease: 'none' } })
          .fromTo(box, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' });
        if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1 }, 0);
        const freeze = (self) => {
          if (self.progress < 1) return;
          self.kill(false, true); // para de seguir a rolagem, mantendo a animação
          g.to(tl, { progress: 1, duration: 0.4, ease: 'power2.out', overwrite: true, onComplete: () => g.set(box, { clearProps: 'clipPath' }) });
        };
        ST.create({ trigger: box, start: 'top 95%', end: 'center 55%', scrub: 0.8, animation: tl, onUpdate: freeze, onRefresh: freeze });
      });
      root.querySelectorAll('[data-reveal-img]').forEach((box) => {
        const img = box.querySelector('img');
        const tl = g.timeline({ scrollTrigger: { trigger: box, start: 'top 88%' } });
        tl.fromTo(box, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power4.inOut' });
        if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.05, ease: 'power3.out' }, 0);
      });
    }
    root.querySelectorAll('[data-magnet]').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => { const r = btn.getBoundingClientRect(); g.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3 }); });
      btn.addEventListener('mouseleave', () => g.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' }));
    });
    root.querySelectorAll('[data-lift]').forEach((card) => {
      const bar = card.querySelector('[data-bar]');
      card.addEventListener('mouseenter', () => { g.to(card, { y: -6, boxShadow: '0 22px 44px rgba(11,30,77,0.12)', duration: 0.35 }); if (bar) g.to(bar, { scaleX: 1, duration: 0.45, ease: 'power3.out' }); });
      card.addEventListener('mouseleave', () => { g.to(card, { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.35 }); if (bar) g.to(bar, { scaleX: 0, duration: 0.35 }); });
    });
    root.querySelectorAll('[data-zoom]').forEach((w) => {
      const img = w.querySelector('img'), ar = w.querySelector('[data-arrow]');
      w.addEventListener('mouseenter', () => { if (img) g.to(img, { scale: 1.05, duration: 0.8, ease: 'power2.out' }); if (ar) g.to(ar, { x: 6, duration: 0.3 }); });
      w.addEventListener('mouseleave', () => { if (img) g.to(img, { scale: 1, duration: 0.8, ease: 'power2.out' }); if (ar) g.to(ar, { x: 0, duration: 0.3 }); });
    });
  }, root);
})();
