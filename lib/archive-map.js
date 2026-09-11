// The salvage map (v3): first a page of Bhoomi’s paper archive, then — “I’m reading it for spare parts” —
// it lifts into the cinematic view from the Moon (attempt-map.js) with the salvage sites lit.
// mountSalvageMap(root, cfg) → { destroy }   cfg = { ...CONTENT.salvageMap, missions, moonTexture, earthTexture, onDone }
// mountArchiveMap(root, cfg) → { setYear, destroy }   the paper page on its own. Needs vendor/rough.js (global `rough`).
import { SPEED } from './interactions.js';
import { ensurePencil } from './notebook.js';
import { mountAttemptMap } from './attempt-map.js';

const NS = 'http://www.w3.org/2000/svg', Y0 = 1958, Y1 = 2026;
const E = { x: 150, y: 330, r: 62 }, MO = { x: 860, y: 250, r: 190 };
// Real near-side positions (orthographic) for sites the story names. [lat, lon]°
const SITES = { 'Apollo 11': [0.674, 23.473], 'Apollo 12': [-3.012, -23.422], 'Apollo 14': [-3.645, -17.471], 'Apollo 15': [26.132, 3.634],
  'Apollo 16': [-8.973, 15.5], 'Apollo 17': [20.191, 30.772], 'Luna 9': [7.08, -64.37], 'Chandrayaan-3': [-69.373, 32.319], 'IM-2': [-84.8, 1.4] };
const PIN_LABEL = { 'Apollo 11': ['A11 mirror', 14, -12], 'Apollo 12': ['A12 nuclear battery', -150, -14], 'IM-2': ['IM-2 drill', -96, -4], 'Chandrayaan-3': ['Vikram mirror', 14, -2] };
const ortho = ([lat, lon]) => { const la = lat * Math.PI / 180, lo = lon * Math.PI / 180; return [MO.x + MO.r * Math.cos(la) * Math.sin(lo), MO.y - MO.r * Math.sin(la)]; };
const rnd = n => { let t = (n * 2654435761) >>> 0; return () => { t ^= t << 13; t ^= t >>> 17; t ^= t << 5; return ((t >>> 0) % 10000) / 10000; }; };

export function mountArchiveMap(root, cfg) {
  ensurePencil();
  const M = cfg.missions.filter(m => !m.transit);
  root.innerHTML = `<div class="xmap paper">
    <header><h3>Every machine Earth threw at the Moon</h3><div class="tally" aria-live="polite"></div></header>
    <div class="legend"><span><i style="background:#b0392b"></i>failed</span><span><i style="background:#c7801a"></i>half-worked</span><span><i style="background:#2d2c2a"></i>made it</span><span><i style="background:#a3700d;height:4px"></i>carried people</span><span>⊗ salvage</span></div>
    <div class="stage"><svg class="xmap-svg" viewBox="0 0 1100 520" role="img" aria-label="Hand-drawn map of every mission to the Moon, filtered by year"></svg>
      <aside class="note" aria-live="polite" hidden><div class="yr"></div><div class="txt"></div><img class="sketch" alt="" hidden></aside></div>
    <div class="scrub"><div class="y">${Y0}</div><input type="range" min="${Y0}" max="${Y1}" step="1" value="${Y0}" aria-label="${cfg.scrubHint || 'Year'}"><button type="button">▶ Play</button></div>
    <div class="summary"></div></div>`;
  const $ = s => root.querySelector(s), svg = $('svg'), slider = $('input'), play = $('.scrub button');
  if (!window.rough) { $('.stage').insertAdjacentHTML('beforeend', '<p class="hand">[rough.js missing: load vendor/rough.js]</p>'); return { setYear() {}, destroy() { root.replaceChildren(); } }; }
  const rc = rough.svg(svg);
  const txt = (x, y, s, size = 26, fill = '#2d2c2a') => { const t = document.createElementNS(NS, 'text'); Object.entries({ x, y, 'font-family': 'Caveat, cursive', 'font-size': size, 'font-weight': 700, fill, 'paint-order': 'stroke', stroke: '#eee7d8', 'stroke-width': 5 }).forEach(([k, v]) => t.setAttribute(k, v)); t.textContent = s; svg.append(t); return t; };

  svg.append(rc.circle(E.x, E.y, E.r * 2, { stroke: '#2a4b7c', strokeWidth: 1.6, fill: 'rgba(42,75,124,.22)', fillStyle: 'hachure', hachureGap: 5, roughness: 1.4 }));
  svg.append(rc.circle(MO.x, MO.y, MO.r * 2, { stroke: '#2d2c2a', strokeWidth: 1.8, fill: 'rgba(45,44,42,.08)', fillStyle: 'hachure', hachureGap: 9, hachureAngle: 30, roughness: 1.2 }));
  for (const [dx, dy, r] of [[-60, -40, 30], [50, 60, 22], [-20, 90, 18], [80, -70, 16], [-100, 40, 14]]) svg.append(rc.circle(MO.x + dx, MO.y + dy, r * 2, { stroke: 'rgba(45,44,42,.5)', roughness: 1.6 }));
  txt(E.x - 26, E.y + E.r + 30, 'Earth'); txt(MO.x + MO.r * .55, MO.y + MO.r + 20, 'the Moon');
  { const [x, y] = ortho([-89.67, 129.78]); svg.append(rc.circle(x, y, 10, { stroke: '#2a4b7c', fill: '#2a4b7c', fillStyle: 'solid' })); txt(x - 20, y + 30, 'me (Bhoomi)', 20, '#2a4b7c'); }

  const arcs = M.map(m => {
    const r = rnd(m.n + 7), g = document.createElementNS(NS, 'g'); g.style.opacity = 0;
    const key = Object.keys(SITES).find(k => m.name === k || m.name.startsWith(k + ' '));
    const ang = (r() - .5) * 2.4, rad = MO.r * (.15 + r() * .8);
    const [tx, ty] = key ? ortho(SITES[key]) : [MO.x - Math.abs(Math.cos(ang)) * rad * .9, MO.y + Math.sin(ang) * rad];
    const lift = 60 + r() * 150, cx = (E.x + tx) / 2, cy = Math.min(E.y, ty) - lift;
    const col = m.kind === 'crewed' ? '#a3700d' : m.result === 'fail' ? '#b0392b' : m.result === 'partial' ? '#c7801a' : '#2d2c2a';
    const o = { stroke: col, strokeWidth: m.kind === 'crewed' ? 2.2 : 1.1, roughness: .9, bowing: .6 };
    const stop = /launch failure/i.test(m.outcome) ? .12 + r() * .1 : (m.result === 'fail' && /orbit|flyby/.test(m.kind)) ? .55 + r() * .3 : 1;
    const P = t => [(1 - t) ** 2 * (E.x + E.r * .6) + 2 * (1 - t) * t * cx + t * t * tx, (1 - t) ** 2 * (E.y - E.r * .6) + 2 * (1 - t) * t * cy + t * t * ty];
    const pts = Array.from({ length: 18 }, (_, i) => P(stop * i / 17)), [ex, ey] = pts.at(-1);
    g.append(rc.curve(pts, o));
    if (m.result === 'fail') g.append(rc.line(ex - 5, ey - 5, ex + 5, ey + 5, { ...o, strokeWidth: 1.4 }), rc.line(ex + 5, ey - 5, ex - 5, ey + 5, { ...o, strokeWidth: 1.4 }));
    else g.append(rc.circle(ex, ey, 5, { ...o, fill: col, fillStyle: 'solid' }));
    if (m.kind === 'crewed' && m.result !== 'fail') g.append(rc.curve(Array.from({ length: 12 }, (_, i) => { const t = 1 - i / 11, [x, y] = P(t); return [x, y + 26 * Math.sin(Math.PI * t)]; }), { ...o, strokeWidth: 1, strokeLineDash: [4, 5] }));
    svg.append(g);
    return { m, g, end: [ex, ey] };
  });
  const pins = cfg.beats.filter(b => b.salvage && PIN_LABEL[b.match]).map(b => {
    const a = arcs.find(a => a.m.name.startsWith(b.match)); if (!a) return null;
    const g = document.createElementNS(NS, 'g'), [x, y] = a.end, [name, dx, dy] = PIN_LABEL[b.match], s = { stroke: '#c7801a', strokeWidth: 2, roughness: 1.2 };
    g.style.opacity = 0; g.dataset.year = b.year;
    g.append(rc.circle(x, y, 18, s), rc.line(x - 7, y - 7, x + 7, y + 7, s), rc.line(x + 7, y - 7, x - 7, y + 7, s));
    svg.append(g); g.append(txt(x + dx, y + dy, name, 19, '#a0600c'));
    return g;
  }).filter(Boolean);

  let shown = null, playT = null, year = Y0 - 1;
  function setYear(y) {
    year = y = Math.max(Y0, Math.min(Y1, y)); $('.y').textContent = y; slider.value = y;
    let tries = 0, fails = 0;
    for (const a of arcs) { const on = a.m.year <= y; if (on && a.g.style.opacity === '0') a.g.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 / SPEED, fill: 'forwards' }); a.g.style.opacity = on ? 1 : 0; if (on) { tries++; if (a.m.result === 'fail') fails++; } }
    pins.forEach(p => p.style.opacity = +p.dataset.year <= y ? 1 : 0);
    $('.tally').innerHTML = `${tries} tries · <b>${fails} failed</b>`;
    const beat = [...cfg.beats].reverse().find(b => b.year <= y);
    if (beat && beat !== shown) {
      shown = beat; const note = $('.note'); note.hidden = false;
      note.querySelector('.yr').textContent = beat.year + (beat.match ? ' · ' + beat.match : '');
      note.querySelector('.txt').textContent = beat.log;
      const img = note.querySelector('img'), src = beat.sketch || beat.img; img.hidden = !src; if (src) img.src = (cfg.assetBase || '') + src;
      note.animate([{ opacity: 0, translate: '0 8px' }, { opacity: 1, translate: '0 0' }], 300);
    }
    $('.summary').textContent = y >= Y1 ? cfg.summary : '';
    if (y >= Y1) cfg.onEnd?.();
  }
  const stop = () => { clearTimeout(playT); playT = null; play.textContent = '▶ Play'; };
  const step = () => { if (year >= Y1) return stop(); setYear(year + 1); playT = setTimeout(step, (cfg.beats.some(b => b.year === year) ? 2600 : 180) / SPEED); };
  play.addEventListener('click', () => { if (playT) return stop(); if (year >= Y1) setYear(Y0); play.textContent = '❚❚ Pause'; step(); });
  slider.addEventListener('input', () => { stop(); setYear(+slider.value); });
  setYear(+(new URLSearchParams(location.search).get('year') || Y0));
  return { setYear, destroy: () => { stop(); root.replaceChildren(); } };
}

// Paper first; when the scrub reaches 2026 a “Look up” control lifts it into the visor view.
export function mountSalvageMap(root, cfg) {
  const paper = document.createElement('div'), sky = document.createElement('div');
  root.replaceChildren(paper, sky); sky.hidden = true;
  let cine = null, lifted = false;
  const look = Object.assign(document.createElement('button'), { type: 'button', className: 'btn look-up', textContent: 'Look up ▸', hidden: true });
  const lift = () => {
    if (lifted) return; lifted = true; look.hidden = true;
    paper.classList.add('lift-out');
    setTimeout(() => {
      paper.hidden = true; sky.hidden = false; sky.classList.add('lift-in');
      cine = mountAttemptMap(sky, { ...cfg, intro: cfg.handoff, summary: cfg.handoff });
      cine.setYear(Y1);
      cfg.onDone?.();
    }, 1100 / SPEED);
  };
  const archive = mountArchiveMap(paper, { ...cfg, onEnd: () => { if (!lifted) look.hidden = false; } });
  look.addEventListener('click', lift);
  paper.querySelector('.xmap')?.append(look);
  if (new URLSearchParams(location.search).get('lift') === '1') { archive.setYear(Y1); lift(); }
  return { lift, destroy() { archive.destroy(); cine?.destroy(); root.replaceChildren(); } };
}
