/* Quali Obras — interações e animações (GSAP + ScrollTrigger) */
(function () {
  'use strict';
  const root = document.getElementById('app');
  if (!root) return;
  const g = window.gsap, ST = window.ScrollTrigger;
  const state = { svcCur: -1, faq: -1 };

  /* ---------- Serviços (acordeão + troca de imagem) ---------- */
  function selectSvc(k, instant) {

    if (k === state.svcCur) return;
    const g = window.gsap, old = state.svcCur; state.svcCur = k;
    const q = (sel) => root.querySelectorAll(sel);
    const items = q('[data-svc-item]'), imgs = q('[data-svc-img]'), cards = q('[data-svc-card]');
    const on = { title: { color: '#141B2D' }, btn: { backgroundColor: '#0B1E4D', borderColor: '#0B1E4D', color: '#FFFFFF' } };
    const off = { title: { color: '#6B7891' }, btn: { backgroundColor: 'rgba(11,30,77,0)', borderColor: '#C9D1DE', color: '#141B2D' } };
    const parts = (n) => { const it = items[n]; return it ? { it, t: it.querySelector('[data-svc-title]'), b: it.querySelector('[data-svc-btn]'), p: it.querySelector('[data-svc-panel]'), btn: it.querySelector('button') } : null; };
    const nw = parts(k), od = old >= 0 ? parts(old) : null;
    if (nw) nw.btn.setAttribute('aria-expanded', 'true');
    if (od) od.btn.setAttribute('aria-expanded', 'false');
    const anim = g && !instant && true;
    if (!anim) {
      const set = (el, props) => { if (!el) return; if (g) g.set(el, props); else Object.assign(el.style, props); };
      if (od) { set(od.t, off.title); set(od.b, off.btn); set(od.p, { height: '0px', opacity: 0 }); }
      if (nw) { set(nw.t, on.title); set(nw.b, on.btn); set(nw.p, { height: 'auto', opacity: 1 }); }
      imgs.forEach((im, n) => set(im, { opacity: n === k ? 1 : 0 }));
      cards.forEach((c, n) => set(c, { opacity: n === k ? 1 : 0 }));
      return;
    }
    const ease = 'power3.inOut';
    if (od) {
      g.to(od.p, { height: 0, opacity: 0, duration: 0.7, ease, overwrite: true });
      g.to(od.t, { ...off.title, duration: 0.5, ease: 'power2.out' });
      g.to(od.b, { ...off.btn, duration: 0.5, ease: 'power2.out' });
      if (imgs[old]) g.to(imgs[old], { opacity: 0, duration: 1, ease: 'power2.inOut', overwrite: true });
      if (cards[old]) g.to(cards[old], { opacity: 0, y: -10, duration: 0.4, ease: 'power2.in', overwrite: true });
    }
    if (nw) {
      g.fromTo(nw.p, { height: nw.p.offsetHeight }, { height: 'auto', opacity: 1, duration: 0.7, ease, overwrite: true });
      g.to(nw.t, { ...on.title, duration: 0.5, ease: 'power2.out' });
      g.to(nw.b, { ...on.btn, duration: 0.5, ease: 'power2.out' });
    }
    if (imgs[k]) g.fromTo(imgs[k], { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', overwrite: true });
    if (cards[k]) g.fromTo(cards[k], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power3.out', overwrite: true });
  
  }
  root.querySelectorAll('[data-svc-item]').forEach((item, k) => {
    item.querySelector('button').addEventListener('click', () => selectSvc(k));
  });
  selectSvc(0, true);

  /* ---------- FAQ ---------- */
  const faqItems = [...root.querySelectorAll('[data-faq-btn]')].map((btn) => {
    const wrap = btn.parentElement;
    return { btn, panel: wrap.querySelector('[data-faq-panel]'), open: btn.querySelector('[data-icon-open]'), closed: btn.querySelector('[data-icon-closed]') };
  });
  function setFaq(k, instant) {
    faqItems.forEach((it, n) => {
      const isOpen = n === k;
      it.btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      it.open.style.display = isOpen ? 'flex' : 'none';
      it.closed.style.display = isOpen ? 'none' : 'flex';
      if (g && !instant) g.to(it.panel, { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, duration: 0.5, ease: 'power2.inOut', overwrite: true });
      else { it.panel.style.height = isOpen ? 'auto' : '0px'; it.panel.style.opacity = isOpen ? 1 : 0; }
    });
    state.faq = k;
  }
  faqItems.forEach((it, k) => it.btn.addEventListener('click', () => setFaq(state.faq === k ? -1 : k)));
  setFaq(0, true);

  /* ---------- Formulário de orçamento ---------- */
  const form = root.querySelector('#orcamento-form');
  const sent = root.querySelector('[data-sent]');
  if (form && sent) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      // TODO: enviar os dados (fetch para backend, Formspree, EmailJS etc.)
      // const data = Object.fromEntries(new FormData(form));
      form.hidden = true; form.style.display = 'none';
      sent.hidden = false; sent.style.display = 'flex';
      if (g) { g.from(sent, { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }); g.from(sent.firstElementChild, { scale: 0, rotate: -90, duration: 0.7, delay: 0.15, ease: 'back.out(2)' }); }
    });
    const reset = sent.querySelector('[data-reset]');
    if (reset) reset.addEventListener('click', () => { form.reset(); sent.hidden = true; sent.style.display = 'none'; form.hidden = false; form.style.display = 'grid'; });
  }

  /* ---------- Vídeo de fundo ---------- */
  const v = root.querySelector('[data-bgvideo]');
  if (v) { v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); }

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
      const dots = root.querySelectorAll('[data-hdot]'), rings = root.querySelectorAll('[data-hring]'), fill = root.querySelector('[data-hfill]');
      if (dots.length && fill) {
        const C = 194.8, last = dots.length - 1;
        g.set(rings, { strokeDashoffset: C });
        g.set(fill, { scaleX: 0 });
        const st = g.timeline({ repeat: -1, repeatDelay: 0.6, delay: 0.6 });
        dots.forEach((dot, k) => {
          st.to(rings[k], { strokeDashoffset: 0, duration: 0.9, ease: 'power1.inOut' })
            .to(dot, { backgroundColor: '#3B74E0', borderColor: '#3B74E0', duration: 0.35, ease: 'power2.out' })
            .to(dot, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 }, '<');
          if (k < last) st.to(fill, { scaleX: (k + 1) / last, duration: 0.8, ease: 'power1.inOut' });
        });
        st.to({}, { duration: 1.6 })
          .to(dots, { backgroundColor: '#0A1838', borderColor: '#24407F', duration: 0.5 })
          .to(rings, { strokeDashoffset: C, duration: 0.5 }, '<')
          .to(fill, { scaleX: 0, duration: 0.5 }, '<');
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
      root.querySelectorAll('[data-work]').forEach((w) => {
        const img = w.querySelector('img'), t = w.querySelector('[data-work-title]'), ar = w.querySelector('[data-arrow]');
        w.addEventListener('mouseenter', () => { g.to(img, { scale: 1.06, duration: 0.8, ease: 'power2.out' }); if (t) g.to(t, { color: '#163A8C', duration: 0.3 }); if (ar) g.to(ar, { x: 6, duration: 0.3, ease: 'power2.out' }); });
        w.addEventListener('mouseleave', () => { g.to(img, { scale: 1, duration: 0.8, ease: 'power2.out' }); if (t) g.to(t, { color: '#141B2D', duration: 0.3 }); if (ar) g.to(ar, { x: 0, duration: 0.3 }); });
      });
    
  }, root);
})();
