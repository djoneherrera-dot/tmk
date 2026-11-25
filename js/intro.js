/* Abertura leve: um raio de energia desenha o quadrado da TMK, um brilho passa
   pelas letras acendendo o logo, ondas de choque e o logo voa até o menu (~2,6 s).
   Só usa transform/opacity e traços SVG pequenos — nada redesenha a tela inteira. */
(function () {
  const G = window.gsap;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navLogo = document.querySelector('.nav__logo img');
  // aparelho fraco ou economia de dados: pula a abertura e o site abre na hora
  const fraco = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2 || (navigator.connection && navigator.connection.saveData);
  if (!G || reduce || fraco) { window.TMK_INTRO = 0; return; }
  window.TMK_INTRO = 2.6;

  const el = document.createElement('div');
  el.className = 'intro';
  el.innerHTML = `<div class="intro__veil"></div>
    <div class="intro__logo">
      <svg class="intro__box">
        <rect class="glow" pathLength="1"/>
        <rect class="core" pathLength="1"/>
        <path class="zap"/>
      </svg>
      <div class="intro__fill"></div>
      <div class="intro__clip"><img src="assets/img/logo-tmk.webp" alt=""></div>
      <i class="intro__sweep"></i>
    </div>
    <svg class="intro__bolt"><path class="glow"/><path class="core"/></svg>`;
  document.body.appendChild(el);
  G.set(navLogo, { opacity: 0 });

  const logo = el.querySelector('.intro__logo'), clip = el.querySelector('.intro__clip');
  const rects = el.querySelectorAll('.intro__box rect'), zap = el.querySelector('.zap'), sweep = el.querySelector('.intro__sweep');
  const bolt = el.querySelector('.intro__bolt');
  // quadrado no tamanho real do logo (sem esticar), para o traço correr certinho
  const svgBox = el.querySelector('.intro__box'), bb = svgBox.getBoundingClientRect(), W = bb.width - 14, H = bb.height - 14;
  svgBox.setAttribute('viewBox', `-7 -7 ${W + 14} ${H + 14}`);
  rects.forEach(r => { r.setAttribute('width', W); r.setAttribute('height', H); });

  /* faísca tremendo na ponta do raio: só um trecho curto, atualizado ~20x por segundo */
  const S = { t: 0, on: true };
  const J = a => (Math.random() - .5) * a;
  function perim(t) { t = Math.min(Math.max(t, 0), 1); let d = t * 2 * (W + H); // anda pelo contorno no mesmo sentido do traço
    if (d < W) return [d, 0]; d -= W; if (d < H) return [W, d]; d -= H; if (d < W) return [W - d, H]; d -= W; return [0, H - d]; }
  let last = 0;
  (function spark(now) {
    if (!S.on) return;
    requestAnimationFrame(spark);
    if (now - last < 50) return; last = now;
    let d = '';
    for (let i = 0; i <= 8; i++) { const [x, y] = perim(S.t - i * .01); d += (i ? 'L' : 'M') + (x + J(9)).toFixed(1) + ',' + (y + J(9)).toFixed(1); }
    zap.setAttribute('d', d);
  })(0);

  function ring(x, y, size, delay, color) {
    const r = document.createElement('i'); r.className = 'intro__ring';
    Object.assign(r.style, { left: x + 'px', top: y + 'px', width: size + 'px', height: size + 'px', borderColor: color || '' });
    el.appendChild(r);
    G.fromTo(r, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: .7, ease: 'expo.out', delay, onComplete: () => r.remove() });
  }
  const box = () => logo.getBoundingClientRect();
  const mid = () => { const b = box(); return [b.left + b.width / 2, b.top + b.height / 2, b.width]; };

  const tl = G.timeline({ delay: .1 });
  tl.fromTo(rects, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .8, ease: 'power2.inOut' }, 0)
    .to(S, { t: 1, duration: .8, ease: 'power2.inOut' }, 0)
    .set(zap, { opacity: 0 })
    .call(() => { S.on = false; const [x, y, w] = mid(); ring(x, y, w * 1.7, 0); })
    .to('.intro__fill', { opacity: 1, duration: .25, ease: 'steps(4)' }, '-=.05')
    // brilho passa pelas letras e o logo acende atrás dele
    .fromTo(sweep, { xPercent: -100, opacity: 1 }, { xPercent: 900, duration: .75, ease: 'power1.inOut', immediateRender: false })
    .fromTo(clip, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .75, ease: 'power1.inOut', immediateRender: false }, '<')
    .to(sweep, { opacity: 0, duration: .15 }, '-=.15')
    .to(logo, { scale: 1.05, duration: .22, ease: 'power2.in' })
    .call(() => { const [x, y, w] = mid(); ring(x, y, w * 2.2, 0, 'rgba(242,106,27,.7)'); G.to(rects, { opacity: 0, duration: .2 }); shoot(); })
    .to(logo, { duration: .5, ease: 'expo.inOut', x: () => fly().x, y: () => fly().y, scale: () => fly().s }, '+=.03')
    .to('.intro__veil', { opacity: 0, duration: .45 }, '<')
    .call(() => { const n = navLogo.getBoundingClientRect(); ring(n.left + n.width / 2, n.top + n.height / 2, 140, 0); })
    .set(navLogo, { opacity: 1 })
    .to(el, { opacity: 0, duration: .2, onComplete: () => { el.remove(); document.dispatchEvent(new Event('tmk:intro-end')); } });

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
