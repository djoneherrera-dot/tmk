/* Abertura: raios de plasma elétrico desenham o quadrado e as letras da TMK,
   vibrando o tempo todo; no fim o logo dispara um raio até o menu (~3 s). */
(function () {
  const G = window.gsap;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navLogo = document.querySelector('.nav__logo img');
  // aparelho fraco ou economia de dados: pula a abertura e o site abre na hora
  const fraco = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2 || (navigator.connection && navigator.connection.saveData);
  if (!G || reduce || fraco) { window.TMK_INTRO = 0; return; }
  window.TMK_INTRO = 2.9;

  const el = document.createElement('div');
  el.className = 'intro';
  el.innerHTML = `<div class="intro__veil"></div>
    <div class="intro__logo"><div class="intro__fill"></div><img src="assets/img/logo-tmk.webp" alt=""></div>
    <canvas class="intro__cv"></canvas>
    <svg class="intro__bolt"><path/><path class="core"/></svg>`;
  document.body.appendChild(el);
  G.set(navLogo, { opacity: 0 });

  const logo = el.querySelector('.intro__logo'), img = logo.querySelector('img'), fill = logo.querySelector('.intro__fill');
  const cv = el.querySelector('.intro__cv'), ctx = cv.getContext('2d'), bolt = el.querySelector('.intro__bolt');
  const dpr = 1; // leve: sem tela em alta resolução (o brilho esconde a diferença)
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.scale(dpr, dpr);

  /* pontos do contorno das letras (tirados do próprio logo) */
  let edges = [], nb = [];
  const box = () => logo.getBoundingClientRect();
  function readEdges() {
    const b = box(), w = Math.round(b.width), h = Math.round(b.height);
    const o = document.createElement('canvas'); o.width = w; o.height = h;
    const c = o.getContext('2d'); c.drawImage(img, 0, 0, w, h);
    const d = c.getImageData(0, 0, w, h).data, white = (x, y) => { const i = (y * w + x) * 4; return d[i] > 200 && d[i + 1] > 200 && d[i + 2] > 200; };
    const lim = h * .78; // só as letras grandes (acima da faixa branca)
    for (let y = 2; y < lim; y += 2) for (let x = 2; x < w - 2; x += 2)
      if (white(x, y) && (!white(x - 2, y) || !white(x + 2, y) || !white(x, y - 2) || !white(x, y + 2))) edges.push([x, y]);
    // vizinhos de cada ponto (para o raio andar pelo contorno)
    const grid = new Map(), key = (x, y) => (x >> 3) + ',' + (y >> 3);
    edges.forEach((p, i) => { const k = key(p[0], p[1]); (grid.get(k) || grid.set(k, []).get(k)).push(i); });
    nb = edges.map(([x, y]) => { const out = []; for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) { const l = grid.get(((x >> 3) + dx) + ',' + ((y >> 3) + dy)); if (l) l.forEach(j => { const q = edges[j], dd = (q[0] - x) ** 2 + (q[1] - y) ** 2; if (dd >= 4 && dd <= 50) out.push(j); }); } return out; });
  }
  if (img.complete) readEdges(); else img.onload = readEdges;

  const S = { box: 0, letters: 0, power: 1, alive: true };
  const J = (a) => (Math.random() - .5) * a;

  function strand(pts, amp, width, alpha) {
    if (pts.length < 2) return;
    ctx.beginPath();
    pts.forEach(([x, y], i) => i ? ctx.lineTo(x + J(amp), y + J(amp)) : ctx.moveTo(x, y));
    ctx.lineWidth = width; ctx.globalAlpha = alpha; ctx.stroke();
    // brilho barato: o mesmo traço mais largo e transparente (no lugar do shadowBlur, que travava)
    if (width > 1) { ctx.lineWidth = width * 4; ctx.globalAlpha = alpha * .18; ctx.stroke(); }
  }
  function perim(b, t) { // ponto no contorno do quadrado (t de 0 a 1)
    const P = 2 * (b.width + b.height), d = t * P, pad = 6, L = b.left - pad, T = b.top - pad, W = b.width + pad * 2, H = b.height + pad * 2;
    if (d < W) return [L + d, T];
    if (d < W + H) return [L + W, T + d - W];
    if (d < 2 * W + H) return [L + W - (d - W - H), T + H];
    return [L, T + H - (d - 2 * W - H)];
  }
  let last = 0;
  function frame(t) {
    if (!S.alive) return;
    requestAnimationFrame(frame);
    if (t - last < 33) return; // ~30 quadros por segundo bastam para o tremor do raio
    last = t;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.globalCompositeOperation = 'lighter'; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    const b = box(), pw = S.power;
    // quadrado: raios percorrendo o contorno
    if (S.box > 0) {
      for (let pass = 0; pass < 2; pass++) {
        const pts = [], n = Math.round(90 * S.box);
        for (let i = 0; i <= n; i++) pts.push(perim(b, (i / 90) % 1));
        ctx.strokeStyle = pass ? '#5aa8ff' : '#e8f3ff'; 
        strand(pts, (pass ? 7 : 3) * pw, pass ? 2.2 : 1.2, pass ? .55 : .9);
        // galhos saindo do raio
        for (let k = 0; k < 2 * pw; k++) {
          const [x, y] = perim(b, Math.random() * S.box), br = [[x, y]];
          for (let s = 0; s < 5; s++) br.push([br[s][0] + J(26), br[s][1] + J(26)]);
          ctx.strokeStyle = '#7cc4ff'; strand(br, 3, .8, .5);
        }
      }
    }
    // letras: plasma vibrando sobre o contorno
    if (S.letters > 0 && edges.length) {
      const maxX = b.width * S.letters;
      for (let k = 0; k < 55 * pw; k++) {
        let i = (Math.random() * edges.length) | 0, prev = -1;
        if (edges[i][0] > maxX) continue;
        const pts = [[b.left + edges[i][0], b.top + edges[i][1]]];
        for (let s = 0; s < 14; s++) { // anda pelo contorno
          const opts = nb[i].filter(j => j !== prev && edges[j][0] <= maxX);
          if (!opts.length) break;
          prev = i; i = opts[(Math.random() * opts.length) | 0];
          pts.push([b.left + edges[i][0], b.top + edges[i][1]]);
        }
        const front = maxX - edges[i][0] < 40, hot = front || Math.random() < .25;
        ctx.strokeStyle = hot ? '#ffffff' : (Math.random() < .5 ? '#4f9dff' : '#7de3ff');
        strand(pts, 3 * pw, hot ? 1.4 : 2.2, hot ? .95 : .6);
      }
    }
    ctx.globalAlpha = 1;
  }
  requestAnimationFrame(frame);

  function ring(x, y, size, delay, color) {
    const r = document.createElement('i'); r.className = 'intro__ring';
    Object.assign(r.style, { left: x + 'px', top: y + 'px', width: size + 'px', height: size + 'px', borderColor: color || '' });
    el.appendChild(r);
    G.fromTo(r, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: .7, ease: 'expo.out', delay, onComplete: () => r.remove() });
  }
  const mid = () => { const b = box(); return [b.left + b.width / 2, b.top + b.height / 2, b.width]; };

  const tl = G.timeline({ delay: .1 });
  tl.to(S, { box: 1, duration: .75, ease: 'power2.inOut' })
    .call(() => { const [x, y, w] = mid(); ring(x, y, w * 1.7, 0); })
    .to(fill, { opacity: 1, duration: .25, ease: 'steps(4)' }, '-=.1')
    .to(S, { letters: 1, duration: .85, ease: 'power1.inOut' })
    .to(img, { opacity: 1, duration: .35, ease: 'steps(5)' }, '-=.2')
    .to(S, { power: 1.8, duration: .3, ease: 'power2.in' })
    .to(logo, { scale: 1.04, duration: .3, ease: 'power2.in' }, '<')
    .call(() => { const [x, y, w] = mid(); ring(x, y, w * 2.2, 0, 'rgba(242,106,27,.7)'); S.box = 0; S.letters = 0; shoot(); })
    .to(logo, { duration: .55, ease: 'expo.inOut', x: () => fly().x, y: () => fly().y, scale: () => fly().s }, '+=.05')
    .to('.intro__veil', { opacity: 0, duration: .5 }, '<')
    .call(() => { const n = navLogo.getBoundingClientRect(); ring(n.left + n.width / 2, n.top + n.height / 2, 140, 0); })
    .set(navLogo, { opacity: 1 })
    .to(el, { opacity: 0, duration: .2, onComplete: () => { S.alive = false; el.remove(); } });

  function fly() {
    const a = box(), n = navLogo.getBoundingClientRect(), cs = G.getProperty(logo, 'scale'), h = a.height / cs;
    return { x: (n.left + n.width / 2) - (a.left + a.width / 2) + G.getProperty(logo, 'x'), y: (n.top + n.height / 2) - (a.top + a.height / 2) + G.getProperty(logo, 'y'), s: n.height / h };
  }
  function shoot() {
    const a = box(), n = navLogo.getBoundingClientRect();
    const x1 = a.left + a.width * .2, y1 = a.top + a.height * .3, x2 = n.left + n.width / 2, y2 = n.top + n.height / 2;
    let d = `M${x1},${y1}`;
    for (let i = 1; i < 9; i++) { const t = i / 9, j = J(46) * (1 - Math.abs(t - .5)); d += ` L${x1 + (x2 - x1) * t + j},${y1 + (y2 - y1) * t - j * .6}`; }
    d += ` L${x2},${y2}`;
    bolt.setAttribute('viewBox', `0 0 ${innerWidth} ${innerHeight}`);
    bolt.querySelectorAll('path').forEach(p => p.setAttribute('d', d));
    G.fromTo(bolt.querySelectorAll('path'), { strokeDasharray: 3000, strokeDashoffset: 3000 }, { strokeDashoffset: 0, duration: .22, ease: 'power3.in' });
    G.fromTo(bolt, { opacity: 1 }, { opacity: 0, duration: .35, delay: .3 });
    ring(x2, y2, 90, .2, 'rgba(242,106,27,.8)');
  }
})();
