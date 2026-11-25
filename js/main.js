/* Interações do site TMK */
(function () {
  const D = window.TMK, root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches && innerWidth > 900;
  const G = window.gsap, ST = window.ScrollTrigger;
  const motion = G && ST && !reduce;
  if (motion) { G.registerPlugin(ST); root.classList.add('js'); }

  /* WhatsApp + ano */
  const WA = 'https://wa.me/' + D.whatsapp + '?text=' + encodeURIComponent('Olá! Vim pelo site da TMK e gostaria de falar sobre um projeto.');
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = WA; a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelector('[data-year]').textContent = new Date().getFullYear();

  /* Menu */
  const nav = document.querySelector('[data-nav]');
  document.querySelector('[data-burger]').addEventListener('click', () => nav.classList.toggle('is-menu'));
  nav.querySelectorAll('.nav__links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-menu')));
  let lastY = 0; nav.classList.add('on-hero');
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('is-hidden', y > lastY && y > 400 && !nav.classList.contains('is-menu'));
    nav.classList.toggle('on-hero', y < innerHeight - 90);
    lastY = y;
  }, { passive: true });

  /* ---------- ENTRADA: vídeo do drone rodando sozinho ---------- */
  const hv = document.querySelector('[data-hero]');
  hv.play().catch(() => {});
  if (motion) {
    G.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      .to('.hero__copy', { y: -80, opacity: 0 }, 0)
      .to('.hero__scroll, .hero__tag', { opacity: 0, duration: .3 }, 0)
      .to('.hero__frame', { scale: .92, borderRadius: 28, y: 60 }, 0);
    G.from('.hero__title span, .hero__sub, .hero__cta, .eyebrow--light', { y: 40, opacity: 0, duration: 1.1, stagger: .1, ease: 'power3.out', delay: (window.TMK_INTRO || 0) + .2 });
  }

  /* ---------- linhas de luz percorrendo o site ---------- */
  const flow = document.querySelector('.flow'), g = flow.querySelector('.flow__lines');
  let flowPaths = [];
  function buildFlow() {
    const W = document.documentElement.clientWidth, H = document.body.scrollHeight;
    const y0 = document.querySelector('.hero').offsetHeight * .92;
    const y1 = document.querySelector('.foot').offsetTop + 40;
    flow.setAttribute('viewBox', `0 0 ${W} ${H}`); flow.style.height = H + 'px';
    const legs = Math.max(3, Math.round((y1 - y0) / 1100)), step = (y1 - y0) / legs;
    let html = '';
    const NS = W < 700 ? 4 : 6;
    for (let s = 0; s < NS; s++) {
      const off = (s - (NS - 1) / 2) * (W < 700 ? 3 : 7);
      let x = W * .96 + off, y = y0, d = `M${x},${y}`;
      for (let k = 0; k < legs; k++) {
        const nx = (k % 2 ? W * .96 : W * .04) + off * (k % 2 ? 1 : -1), ny = y + step;
        d += ` C${x},${y + step * .55 + s * 6} ${nx},${ny - step * .55 - s * 6} ${nx},${ny}`;
        x = nx; y = ny;
      }
      const mid = Math.abs(s - (NS - 1) / 2) < 1, sw = mid ? 2.6 : 1.3;
      html += (mid ? `<path class="glow" d="${d}" stroke-width="12"/>` : '') + `<path d="${d}" stroke-width="${sw}" opacity="${mid ? .9 : .45}"/>`;
    }
    g.innerHTML = html;
    fH = document.body.scrollHeight - innerHeight; fHero = document.querySelector('.hero').offsetHeight;
    flowPaths = [...g.querySelectorAll('path')].map(p => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; return [p, L]; });
    flowDraw();
  }
  let fH = 0, fHero = 0, fTick = false;
  function flowDraw() {
    fTick = false;
    const p = Math.min(1, Math.max(0, (scrollY - fHero * .3) / (fH * .95 - fHero * .3)));
    flowPaths.forEach(([el, L]) => { el.style.strokeDashoffset = L * (1 - (reduce ? 1 : p)); });
  }
  // redesenha no máximo 1 vez por quadro, sem medir a página a cada rolagem
  addEventListener('scroll', () => { if (!fTick) { fTick = true; requestAnimationFrame(flowDraw); } }, { passive: true });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { buildFlow(); ST && ST.refresh(); }, 250); });

  /* ---------- números subindo ---------- */
  document.querySelectorAll('[data-count]').forEach(el => {
    const to = +el.dataset.count;
    if (!motion) { el.textContent = to; return; }
    ST.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => {
      const o = { v: 0 };
      G.to(o, { v: to, duration: 2.2, ease: 'expo.out', onUpdate: () => { el.textContent = Math.round(o.v); } });
    } });
  });

  /* ---------- revelar ao rolar ---------- */
  if (motion) {
    document.querySelectorAll('[data-reveal]').forEach(el => G.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }));
    G.fromTo('.safe__img img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.safe', scrub: true } });
  }

  /* ---------- áreas de atuação ---------- */
  const av = document.querySelector('[data-area-video]'), items = document.querySelectorAll('[data-areas] li');
  function setArea(li) {
    items.forEach(x => x.classList.toggle('is-on', x === li));
    const n = li.dataset.v;
    if (av.dataset.cur === n) return;
    av.dataset.cur = n; av.style.opacity = 0;
    setTimeout(() => { av.poster = `assets/video/${n}.webp`; av.src = `assets/video/${n}.mp4`; av.play().catch(() => {}); av.style.opacity = 1; }, 250);
  }
  items.forEach(li => li.addEventListener('mouseenter', () => fine() && setArea(li)));
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !av.dataset.cur) setArea(items[1]); }, { threshold: .3 }).observe(av);
  let areaT; // no celular só troca o vídeo se a pessoa parar ali (rolar rápido não baixa os 4 vídeos)
  if (motion) items.forEach(li => ST.create({ trigger: li, start: 'top 60%', end: 'bottom 60%', onToggle: s => { clearTimeout(areaT); if (s.isActive && !fine()) areaT = setTimeout(() => setArea(li), 450); } }));

  /* ---------- projetos: a pasta abre e as fichas saem de dentro dela ---------- */
  const dlg = document.querySelector('[data-pasta]'), list = dlg.querySelector('[data-plist]');
  ['andamento', 'concluidos'].forEach(k => { document.querySelector(`[data-n="${k}"]`).textContent = D[k].length; });
  const TIPOS = { todas: 'Todas', se: 'Subestações', lt: 'Linhas' };
  function ficha(p) {
    const fotos = [...new Set([p.foto, ...(p.fotos || [])].filter(Boolean))];
    return `
      <li class="ficha" data-tipo="${p.tipo || ''}">
        <span class="ficha__img">${fotos.length ? `<img data-src="assets/img/${fotos[0]}" alt="${p.titulo}" loading="lazy">` : ''}${fotos.length > 1 ? `<i class="ficha__n">${fotos.length} fotos</i>` : ''}</span>
        <button class="ficha__btn" aria-expanded="false">
          <span class="ficha__txt">
            <span class="ficha__cli">${p.cliente}</span>
            <span class="ficha__tit">${p.titulo}</span>
            <span class="ficha__meta"><span>${p.local}</span><span>${p.ano}</span></span>
            <span class="ficha__ver">Ver detalhes</span>
          </span>
        </button>
        <div class="ficha__more"><div>
          <p class="ficha__p">${p.texto}</p>
          ${fotos.length > 1 ? `<div class="ficha__gal">${fotos.map((f, i) => `<button class="${i ? '' : 'is-on'}" data-src="assets/img/${f}" aria-label="Foto ${i + 1}"><img data-lazy="assets/img/${f}" alt=""></button>`).join('')}</div>` : ''}
        </div></div>
      </li>`;
  }
  function render(k) {
    const itens = D[k], temTipo = itens.length > 8;
    const filtro = temTipo ? `<div class="pasta__filtro" role="group" aria-label="Filtrar obras">${Object.entries(TIPOS).map(([t, n]) => `<button data-f="${t}" class="${t === 'todas' ? 'is-on' : ''}">${n} <sup>${t === 'todas' ? itens.length : itens.filter(p => p.tipo === t).length}</sup></button>`).join('')}</div>` : '';
    const outras = k === 'concluidos' && D.outras && D.outras.length ? `<li class="outras" data-tipo="todas"><p class="mono">Outras obras executadas</p><ul>${D.outras.map(([t, tit, loc]) => `<li data-tipo="${t}"><span>${tit}</span><span>${loc}</span></li>`).join('')}</ul></li>` : '';
    list.innerHTML = itens.length ? itens.map(ficha).join('') + outras : '<li class="ficha--empty">Em breve.</li>';
    const old = dlg.querySelector('.pasta__filtro'); if (old) old.remove();
    if (filtro) list.insertAdjacentHTML('beforebegin', filtro);
    dlg.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => {
      const f = b.dataset.f;
      dlg.querySelectorAll('[data-f]').forEach(x => x.classList.toggle('is-on', x === b));
      list.querySelectorAll('[data-tipo]').forEach(li => { li.hidden = !(f === 'todas' || li.dataset.tipo === f || li.dataset.tipo === 'todas'); });
      if (motion) G.from(list.querySelectorAll('.ficha:not([hidden])'), { opacity: 0, y: 24, duration: .5, stagger: .03, ease: 'power2.out' });
    }));
    list.querySelectorAll('.ficha__btn').forEach(b => b.addEventListener('click', () => {
      const li = b.parentElement, open = li.classList.toggle('is-open'); b.setAttribute('aria-expanded', open);
      if (open) li.querySelectorAll('img[data-lazy]').forEach(im => { im.src = im.dataset.lazy; im.removeAttribute('data-lazy'); });
      b.querySelector('.ficha__ver').textContent = open ? 'Fechar detalhes' : 'Ver detalhes';
    }));
    list.querySelectorAll('.ficha__gal button').forEach(t => t.addEventListener('click', () => {
      const li = t.closest('.ficha'), main = li.querySelector('.ficha__img img');
      li.querySelectorAll('.ficha__gal button').forEach(x => x.classList.toggle('is-on', x === t));
      if (motion) G.fromTo(main, { opacity: .2 }, { opacity: 1, duration: .4 });
      main.src = t.dataset.src;
    }));
  }
  /* fotos reais nas pastas, trocando sozinhas (só quando a pasta está na tela) */
  document.querySelectorAll('.folder').forEach(f => {
    const fotos = D[f.dataset.tab].map(p => p.foto).filter(Boolean), imgs = f.querySelectorAll('.folder__doc img');
    let n = 0; const put = () => imgs.forEach((im, i) => { const src = 'assets/img/' + fotos[(n + i) % fotos.length]; im.style.opacity = 0; setTimeout(() => { im.src = src; im.style.opacity = 1; }, 300); });
    put(); let vis = false; new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(f);
    if (!reduce && fotos.length > 3) setInterval(() => { if (vis && !document.hidden && !dlg.open) { n++; put(); } }, 2600 + Math.random() * 600);
  });
  let fromFolder = null;
  function openFolder(b) {
    const k = b.dataset.tab;
    fromFolder = b;
    document.querySelectorAll('[data-tab]').forEach(x => x.classList.toggle('is-on', x === b));
    dlg.querySelector('[data-plabel]').textContent = k === 'andamento' ? 'Em andamento · ' + D[k].length + ' obras' : 'Concluídos · ' + D[k].length + ' obras';
    dlg.querySelector('[data-ptit]').textContent = k === 'andamento' ? 'Projetos em andamento' : 'Projetos concluídos';
    render(k);
    b.classList.add('is-opening');
    const go = () => {
      dlg.showModal(); document.documentElement.classList.add('is-locked'); dlg.querySelector('.pasta__in').scrollTop = 0;
      if (!motion) return;
      // as fichas saem do ponto onde está a pasta
      const r = b.querySelector('.folder__art').getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const cards = [...list.children].filter(c => c.classList.contains('ficha'));
      cards.forEach(c => { const q = c.getBoundingClientRect(); c._dx = cx - (q.left + q.width / 2); c._dy = cy - (q.top + q.height / 2); });
      G.fromTo(dlg, { '--bg': 0 }, { '--bg': 1, duration: .4 });
      G.from('.pasta__head', { y: -20, opacity: 0, duration: .5, ease: 'power3.out' });
      G.from(cards, { x: i => cards[i]._dx, y: i => cards[i]._dy, scale: .2, rotate: () => (Math.random() - .5) * 30, opacity: 0, duration: .8, ease: 'expo.out', stagger: .045 });
    };
    // fotos das fichas: as 6 primeiras já; as outras só quando aparecerem na tela (depois da animação)
    const imgs = [...list.querySelectorAll('.ficha__img img[data-src]')], put = im => { im.src = im.dataset.src; im.removeAttribute('data-src'); };
    imgs.slice(0, 6).forEach(put);
    setTimeout(() => imgs.slice(6).forEach(put), reduce ? 0 : 1300);
    reduce ? go() : setTimeout(go, 380);
  }
  function closeFolder() {
    if (!dlg.open) return;
    const done = () => { dlg.close(); document.documentElement.classList.remove('is-locked'); fromFolder && fromFolder.classList.remove('is-opening'); };
    if (!motion || !fromFolder) return done();
    const r = fromFolder.querySelector('.folder__art').getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const cards = [...list.children].filter(c => c.classList.contains('ficha'));
    G.to(cards, { x: (i, c) => { const q = c.getBoundingClientRect(); return cx - (q.left + q.width / 2); }, y: (i, c) => { const q = c.getBoundingClientRect(); return cy - (q.top + q.height / 2); }, scale: .2, opacity: 0, duration: .45, ease: 'power3.in', stagger: .02 });
    G.to(dlg, { '--bg': 0, duration: .45, delay: .15, onComplete: () => { G.set(dlg, { clearProps: '--bg' }); done(); } });
  }
  document.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => openFolder(b)));
  dlg.querySelector('[data-pclose]').addEventListener('click', closeFolder);
  dlg.addEventListener('cancel', e => { e.preventDefault(); closeFolder(); });
  dlg.addEventListener('click', e => { if (e.target === dlg) closeFolder(); });

  /* ---------- mapa do Brasil ---------- */
  const M = window.BR_MAP, svg = document.querySelector('[data-map]');
  const sx = 600 / (-34.6 + 74.2), prj = (lon, lat) => [(lon + 74.2) * sx, (5.4 - lat) * sx];
  const ufs = D.mapa.map(m => m.uf);
  const tower = (x, y) => `<g class="tower" transform="translate(${x},${y}) scale(1.5)"><g class="tw"><path d="M-6,0 L-2,-26 L2,-26 L6,0 M-4.5,-9 L4.5,-9 M-3.3,-18 L3.3,-18 M-4.5,-9 L3.3,-18 M4.5,-9 L-3.3,-18 M-10,-22 L10,-22 M-8,-22 L-8,-19 M8,-22 L8,-19 M0,-26 L0,-30"/><circle cx="0" cy="-30" r="2"/></g></g>`;
  const pts = D.mapa.map(m => ({ ...m, p: prj(m.lon, m.lat) }));
  const home = pts.find(m => m.status === 'sede') || pts[0];
  let s = `<g>${Object.entries(M.paths).map(([k, d]) => `<path class="uf ${k === home.uf ? 'is-home' : ''}" data-uf="${k}" d="${d}"/>`).join('')}</g><g>`;
  pts.filter(m => m !== home).forEach(m => {
    const [x1, y1] = home.p, [x2, y2] = m.p, cx = (x1 + x2) / 2, cy = Math.min(y1, y2) - 110;
    const d = `M${x1},${y1 - 44} Q${cx},${cy} ${x2},${y2 - 44}`;
    s += `<path class="wire" data-w="${m.uf}" d="${d}" ${m.status === 'futuro' ? 'stroke-dasharray="4 5"' : ''}/><path class="pulse" data-p="${m.uf}" d="${d}"/>`;
  });
  s += '</g>' + pts.map(m => `<g data-t="${m.uf}">${tower(m.p[0], m.p[1])}<text class="lbl" x="${m.p[0] + 16}" y="${m.p[1] + 4}">${m.uf}</text></g>`).join('');
  svg.setAttribute('viewBox', `-20 -40 ${M.w + 40} ${M.h + 50}`); svg.innerHTML = s;
  document.querySelector('[data-legend]').innerHTML = pts.map(m => `<li data-l="${m.uf}"><span><b>${m.uf}</b>${m.cidade}</span><span>${m.status === 'sede' ? 'Sede' : m.status === 'futuro' ? 'Em breve' : 'Obras'}</span></li>`).join('');
  const wires = [...svg.querySelectorAll('.wire')].map(w => { const L = w.getTotalLength(); w.style.strokeDasharray = w.getAttribute('stroke-dasharray') ? null : L; w.style.strokeDashoffset = L; return [w, L]; });
  svg.querySelectorAll('.pulse').forEach(p => { const L = p.getTotalLength(); p.style.strokeDasharray = `18 ${L}`; p.style.strokeDashoffset = 18; p.style.opacity = 0; p._L = L; });
  function playMap() {
    const legend = uf => document.querySelector(`[data-l="${uf}"]`).classList.add('is-on');
    const tl = G.timeline();
    tl.from(`[data-t="${home.uf}"] .tw`, { scaleY: 0, transformOrigin: '50% 100%', duration: .7, ease: 'back.out(2)' }).call(() => legend(home.uf), null, '<');
    pts.filter(m => m !== home).forEach((m, i) => {
      const [w, L] = wires[i], pulse = svg.querySelector(`[data-p="${m.uf}"]`);
      tl.to(w, { strokeDashoffset: 0, duration: .7, ease: 'power2.inOut' }, i ? '-=.4' : '+=.1')
        .call(() => { svg.querySelector(`[data-uf="${m.uf}"]`).classList.add('is-on'); legend(m.uf); })
        .from(`[data-t="${m.uf}"] .tw`, { scaleY: 0, transformOrigin: '50% 100%', duration: .6, ease: 'back.out(2)' }, '<')
        .call(() => { if (m.status !== 'futuro') { pulse.style.opacity = 1; G.fromTo(pulse, { strokeDashoffset: 18 }, { strokeDashoffset: -pulse._L, duration: 1.8, ease: 'none', repeat: -1, repeatDelay: .4 + i * .3 }); } });
    });
    G.set(`[data-t] text`, { opacity: 1 });
  }
  if (motion) {
    G.set('[data-t] .tw', { scaleY: 0, transformOrigin: '50% 100%' }); G.set('[data-t] text', { opacity: 0 });
    ST.create({ trigger: '.map__stage', start: 'top 70%', once: true, onEnter: () => { G.set('[data-t] .tw', { scaleY: 1 }); playMap(); } });
  } else {
    wires.forEach(([w]) => w.style.strokeDashoffset = 0);
    document.querySelectorAll('[data-l]').forEach(l => l.classList.add('is-on'));
    ufs.forEach(u => svg.querySelector(`[data-uf="${u}"]`).classList.add('is-on'));
  }

  /* ---------- formulário: monta a mensagem e abre no WhatsApp ---------- */
  const form = document.querySelector('[data-form]');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form), v = k => (f.get(k) || '').toString().trim();
    const txt = ['Olá! Vim pelo site da TMK.', 'Nome: ' + v('nome'), v('empresa') ? 'Empresa: ' + v('empresa') : null, 'Telefone: ' + v('tel'), v('assunto') ? 'Assunto: ' + v('assunto') : null, '', v('msg')].filter(x => x !== null).join('\n');
    window.open('https://wa.me/' + D.whatsapp + '?text=' + encodeURIComponent(txt), '_blank', 'noopener');
  });

  /* ---------- clientes ---------- */
  const row = document.querySelector('[data-clients]');
  row.innerHTML = [...D.clientes, ...D.clientes].map(c => `<span><img src="assets/img/clientes/${c[0]}.webp" alt="${c[1]}" loading="lazy"></span>`).join('');

  /* monta as linhas de luz depois que tudo carregou */
  addEventListener('load', () => { buildFlow(); ST && ST.refresh(); });
  buildFlow();
})();
