// The interaction verbs (drag / balance / focus / morse) inside a timed panel.
// mountInteraction(root, spec, { onWin, onMiss, timerOn }) → { setTimer, restart, destroy }
// spec shapes live in content.js (crisis.interaction). No dependencies.

export const SPEED = Math.max(0.1, +(new URLSearchParams(location.search).get('speed') || 1));

const ICONS = {
  drill: `<svg viewBox="0 0 64 64" fill="none" stroke="#c8d8f0" stroke-width="3" stroke-linejoin="round"><rect x="20" y="6" width="24" height="16" rx="3"/><path d="M26 22h12l-2 10h-8z"/><path d="M32 32v24" stroke="#7fd4ff"/><path d="M27 38l10 4M27 46l10 4" stroke="#7fd4ff"/></svg>`,
  // Apollo 13 “mailbox” scraps (v3 Air)
  card: `<svg viewBox="0 0 64 64" fill="none" stroke="#c8d8f0" stroke-width="3" stroke-linejoin="round"><path d="M10 18l40-6 4 34-40 6z" fill="#8a6a3a"/><path d="M18 26l26-4M19 34l26-4M20 42l18-3" stroke="#e8d3a6" stroke-width="2"/></svg>`,
  bag: `<svg viewBox="0 0 64 64" fill="none" stroke="#c8d8f0" stroke-width="3" stroke-linejoin="round"><path d="M14 16q18-8 36 0l-4 38q-14 5-28 0z" fill="rgba(127,212,255,.25)"/><path d="M22 16q10 6 20 0" stroke-width="2"/></svg>`,
  hose: `<svg viewBox="0 0 64 64" fill="none" stroke-linecap="round"><path d="M8 48c10-30 22 6 30-18s16-12 18-18" stroke="#c8d8f0" stroke-width="7"/><path d="M8 48c10-30 22 6 30-18s16-12 18-18" stroke="#1a2230" stroke-width="3" stroke-dasharray="3 4"/></svg>`,
  tape: `<svg viewBox="0 0 64 64" fill="none" stroke="#c8d8f0" stroke-width="3"><circle cx="32" cy="32" r="20" fill="#9aa4b1"/><circle cx="32" cy="32" r="9" fill="#0d1420"/><path d="M50 36l10 4-2 6-12-4" fill="#9aa4b1" stroke-linejoin="round"/></svg>`,
  // Apollo 17 map fender (v4 Move)
  map: `<svg viewBox="0 0 64 64" fill="none" stroke="#c8d8f0" stroke-width="3" stroke-linejoin="round"><path d="M8 14l16-5 16 5 16-5v41l-16 5-16-5-16 5z" fill="#3b5d4a"/><path d="M24 9v41M40 14v41" stroke-width="2"/><path d="M13 30c6-4 10 3 16-1s9 2 14-2" stroke="#e8d3a6" stroke-width="2"/></svg>`,
  clamp: `<svg viewBox="0 0 64 64" fill="none" stroke="#c8d8f0" stroke-width="3" stroke-linejoin="round"><path d="M14 12h30v12H26v16h18v12H14z" fill="#8a98ad"/><path d="M44 18h8M44 46h8" stroke-width="4"/></svg>`,
};
const SCENES = {
  // rover wheel with a snapped fender; maps + clamps + tape rebuild it (Apollo 17, 1972)
  fender: `<svg viewBox="0 0 300 180" width="100%" height="100%" aria-hidden="true"><circle cx="150" cy="118" r="46" fill="#1a2230" stroke="#33445e" stroke-width="3"/><circle cx="150" cy="118" r="14" fill="#0b0f16" stroke="#6b82a3"/>${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<path d="M${(150 + 16 * Math.cos(a)).toFixed(1)} ${(118 + 16 * Math.sin(a)).toFixed(1)}L${(150 + 44 * Math.cos(a)).toFixed(1)} ${(118 + 44 * Math.sin(a)).toFixed(1)}" stroke="#33445e"/>`; }).join('')}<path d="M92 104a62 62 0 0 1 60-50" fill="none" stroke="#6b82a3" stroke-width="6"/><path d="M160 54l18 4" stroke="#ffaa00" stroke-width="3" stroke-dasharray="4 4"/><text x="214" y="58" fill="#ffaa00" font-family="monospace" font-size="10">snapped</text><g class="placed-here"></g></svg>`,
  // round scrubber port; each scrap drops into the square-to-round adapter
  port: `<svg viewBox="0 0 300 180" width="100%" height="100%" aria-hidden="true"><rect x="36" y="46" width="88" height="88" rx="4" fill="#1a2230" stroke="#33445e"/><text x="80" y="152" text-anchor="middle" fill="#6b82a3" font-family="monospace" font-size="10">square cartridge</text><circle cx="222" cy="90" r="46" fill="#03050a" stroke="#ffaa00" stroke-width="2" stroke-dasharray="5 4"/><circle cx="222" cy="90" r="22" fill="#0b0f16" stroke="#33445e"/><text x="222" y="152" text-anchor="middle" fill="#ffaa00" font-family="monospace" font-size="10">round port</text><g class="placed-here"></g></svg>`,
  psr: `<svg viewBox="0 0 300 180" width="100%" height="100%" aria-hidden="true"><defs><radialGradient id="psr" cx="50%" cy="45%"><stop offset="0" stop-color="#01030a"/><stop offset=".8" stop-color="#06101d"/><stop offset="1" stop-color="#7fd4ff" stop-opacity=".35"/></radialGradient></defs><ellipse cx="150" cy="104" rx="120" ry="52" fill="url(#psr)" stroke="#7fd4ff" stroke-opacity=".5"/><text x="150" y="112" text-anchor="middle" fill="#7fd4ff" font-family="monospace" font-size="11" opacity=".8">no sunlight in billions of years</text><g class="placed-here"></g></svg>`,
};

// Timer switch: vertical Apple-style toggle. Remembers the choice (localStorage may throw: wrap it).
export function wireTimerSwitch(btn, onChange) {
  let on = true;
  try { on = localStorage.getItem('hyb-timer') !== 'off'; } catch {}
  const q = new URLSearchParams(location.search).get('timer'); if (q) on = q !== 'off';
  const set = v => { on = v; btn.setAttribute('aria-checked', String(on)); try { localStorage.setItem('hyb-timer', on ? 'on' : 'off'); } catch {} onChange?.(on); };
  btn.setAttribute('role', 'switch'); btn.setAttribute('aria-label', 'Timer');
  btn.innerHTML = `<span class="knob"><svg viewBox="0 0 24 24"><circle cx="12" cy="13.5" r="7.5" fill="none" stroke="#111" stroke-width="2"/><path d="M12 13.5V9.5M10 2.5h4M18.5 6.5l1.5-1.5" stroke="#111" stroke-width="2" stroke-linecap="round"/></svg></span>`;
  btn.addEventListener('click', () => set(!on));
  btn.setAttribute('aria-checked', String(on));
  return { get on() { return on; }, set };
}

export function mountInteraction(root, spec, { onWin = () => {}, onMiss = () => {}, timerOn = true } = {}) {
  root.innerHTML = `<div class="timed"><svg class="fuse-svg" aria-hidden="true"><rect class="track" pathLength="100"/><rect class="fuse" pathLength="100"/></svg>
    <h3 class="int-title"></h3><p class="int-hint" aria-live="polite"></p><div class="int-body"></div></div>`;
  const panel = root.firstElementChild, svg = panel.querySelector('svg'), fuse = panel.querySelector('.fuse');
  const title = panel.querySelector('.int-title'), hintEl = panel.querySelector('.int-hint'), body = panel.querySelector('.int-body');
  let state = 'idle', cleanup = () => {}, overlay = null, failT, on = timerOn;

  // trap #1: size the SVG to real pixels so corners stay round and pathLength dashes stay correct
  const ro = new ResizeObserver(([e]) => {
    const w = e.target.offsetWidth, h = e.target.offsetHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    for (const r of svg.querySelectorAll('rect')) Object.entries({ x: 1, y: 1, width: w - 2, height: h - 2, rx: 12 }).forEach(([k, v]) => r.setAttribute(k, v));
  });
  ro.observe(panel);

  const hint = (msg = '', cls = '') => { hintEl.textContent = msg; hintEl.className = 'int-hint ' + cls; };
  const show = (cls, big, small) => { overlay?.remove(); overlay = Object.assign(document.createElement('div'), { className: 'outcome ' + cls, innerHTML: `<div><b>${big}</b><span>${small}</span></div>` }); panel.append(overlay); };
  const runFuse = () => {
    panel.classList.remove('running', 'paused'); void panel.offsetWidth;   // restart the CSS animation
    panel.style.setProperty('--fuse-s', (spec.seconds || 8) / SPEED + 's');
    panel.classList.toggle('off', !on);
    if (on) panel.classList.add('running');
  };
  const win = () => {
    if (state !== 'playing') return;
    state = 'won'; panel.classList.add('paused'); cleanup();
    show('win', '✓ ' + spec.label, 'Nice.');
    setTimeout(onWin, 900 / SPEED);
  };
  fuse.addEventListener('animationend', () => {             // trap #4: CSS animation, not setInterval
    if (state !== 'playing') return;
    state = 'failed'; cleanup(); onMiss();
    show('fail', 'O₂ DEPLETED', 'Restoring checkpoint…');
    failT = setTimeout(start, 1200 / SPEED);
  });

  function start() {
    overlay?.remove(); overlay = null; state = 'playing';
    const steps = [spec];
    let i = 0;
    const next = () => {
      const step = steps[i];
      title.textContent = step.label; hint(step.hint || '');
      let finished = false;                                   // verbs may report success more than once
      cleanup = VERBS[step.verb](body, step, { hint, done: () => { if (finished) return; finished = true; cleanup(); ++i < steps.length ? next() : win(); } });
    };
    next(); runFuse();
  }
  start();
  return {
    setTimer(v) { on = v; if (state === 'playing') { panel.classList.toggle('off', !on); on ? runFuse() : panel.classList.remove('running'); } },
    restart: () => { clearTimeout(failT); cleanup(); start(); },
    destroy() { clearTimeout(failT); cleanup(); ro.disconnect(); root.replaceChildren(); },
  };
}

// ── DRAG: drag items onto the target, or click an item then click the target (WCAG 2.5.7) ──
function drag(body, spec, { hint, done }) {
  const t = spec.target, n = spec.items.length;
  const name = /^[A-Z][a-z]/.test(t.label) ? t.label[0].toLowerCase() + t.label.slice(1) : t.label;   // “ENG ARM” stays caps
  const slots = t.slots ? `<div class="slots">${Array.from({ length: t.slots }, () => '<div class="slot"></div>').join('')}</div>` : SCENES[t.id] || '';
  body.innerHTML = `<div class="drag-wrap"><div class="tray">${spec.items.map((it, i) =>
      `<button type="button" class="item" data-i="${i}" aria-pressed="false" aria-label="${it.label}: drag to ${t.label}, or select it and then select the target">${ICONS[it.icon] || it.label}</button>`).join('')}</div>
    <div class="target" role="button" tabindex="0" aria-label="Place on ${t.label}" style="--glow:${t.glow || 'var(--accent2)'}"><span class="label">${t.label}</span>${slots}</div></div>`;
  const target = body.querySelector('.target');
  let selected = null, placed = 0, ghost = null, start = null, dragged = false;
  hint(n > 1 ? `Drag all ${n} onto the ${name}.` : `Drag it onto the ${name}.`);

  const place = item => {
    const it = spec.items[item.dataset.i];
    item.classList.add('placed'); item.disabled = true; item.setAttribute('aria-pressed', 'false'); placed++;
    const slot = target.querySelectorAll('.slot')[placed - 1];
    if (slot) slot.innerHTML = ICONS[it.icon];
    else if (t.id === 'port') target.querySelector('.placed-here')?.insertAdjacentHTML('beforeend', `<g transform="translate(${104 + (placed - 1) * 20} ${48 + (placed - 1) * 10})">${ICONS[it.icon].replace('<svg', '<svg width="44" height="44"')}</g>`);   // stack the scraps across the gap
    else if (t.id === 'fender') target.querySelector('.placed-here')?.insertAdjacentHTML('beforeend', `<g transform="translate(${96 + (placed - 1) * 26} ${34 - (placed - 1) * 4})">${ICONS[it.icon].replace('<svg', '<svg width="40" height="40"')}</g>`);   // rebuild along the arc
    else target.querySelector('.placed-here')?.insertAdjacentHTML('beforeend', `<g transform="translate(${t.id === 'breaker' ? '124 66' : '118 44'})">${ICONS[it.icon].replace('<svg', '<svg width="64" height="64"')}</g>`);
    placed === n ? done() : hint(`${placed} of ${n}.`, 'good');
  };
  const over = (x, y) => { const r = target.getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; };

  body.querySelectorAll('.item').forEach(item => {
    item.addEventListener('pointerdown', e => { item.setPointerCapture(e.pointerId); start = { x: e.clientX, y: e.clientY }; dragged = false; });
    item.addEventListener('pointermove', e => {
      if (!start) return;
      if (!ghost && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 6) {
        dragged = true; ghost = item.cloneNode(true); ghost.classList.add('dragging'); document.body.append(ghost);
      }
      if (ghost) { ghost.style.left = e.clientX - 42 + 'px'; ghost.style.top = e.clientY - 42 + 'px'; target.classList.toggle('hot', over(e.clientX, e.clientY)); }
    });
    const end = e => {
      if (ghost) { ghost.remove(); ghost = null; target.classList.remove('hot'); if (e.type === 'pointerup' && over(e.clientX, e.clientY)) place(item); }
      start = null;
    };
    item.addEventListener('pointerup', end); item.addEventListener('pointercancel', end);
    item.addEventListener('click', () => {                    // click / Enter / Space → select
      if (dragged) { dragged = false; return; }
      selected?.setAttribute('aria-pressed', 'false');
      selected = selected === item ? null : item;
      selected?.setAttribute('aria-pressed', 'true');
      target.classList.toggle('hot', !!selected);
      if (selected) hint(`Now select the ${name}.`);
    });
  });
  const drop = () => { if (selected) { const s = selected; selected = null; target.classList.remove('hot'); place(s); } };
  target.addEventListener('click', drop);
  target.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); drop(); } });
  return () => { ghost?.remove(); };
}

// ── BALANCE: available power falls; keep the total under it without crossing any red line ──
function balance(body, spec, { hint, done }) {
  const A = spec.available, loads = spec.loads.map(l => ({ ...l, v: l.start }));
  body.innerHTML = `<div class="bal"><div class="power" role="img" aria-label="Power used versus available"><div class="avail"></div><div class="used"></div><span class="read"></span></div>
    ${loads.map(l => `<div class="load" data-id="${l.id}"><label for="ld-${l.id}">${l.label}</label>
      <div class="track-wrap"><input type="range" id="ld-${l.id}" min="0" max="100" step="1" value="${l.v}"><i class="redline" style="left:${l.min}%"></i></div><output>${l.v}%</output></div>`).join('')}</div>`;
  const power = body.querySelector('.power');
  let avail = A.from, t0 = performance.now(), raf, fallen = false;
  const sum = () => loads.reduce((s, l) => s + l.v, 0);
  const check = () => {
    const s = sum(), low = loads.find(l => l.v < l.min);
    power.classList.toggle('over', s > avail);
    power.querySelector('.used').style.width = Math.min(s, 100) + '%';
    power.querySelector('.avail').style.width = avail + '%';
    power.querySelector('.read').textContent = `${s}% used · ${Math.round(avail)}% available`;
    for (const l of loads) body.querySelector(`.load[data-id="${l.id}"]`).classList.toggle('low', l.v < l.min);
    if (!fallen) return hint('Sunset. Power is falling…');
    if (low) return hint(`${low.label} is below its red line.`, 'bad');
    if (s > avail) return hint(`Over by ${s - Math.round(avail)}%. Cut something.`, 'bad');
    done();
  };
  loads.forEach(l => body.querySelector('#ld-' + l.id).addEventListener('input', e => {
    l.v = +e.target.value; e.target.closest('.load').querySelector('output').textContent = l.v + '%'; check();
  }));
  const tick = now => {
    const p = Math.min(1, (now - t0) / 1000 * SPEED / A.fallSeconds);
    avail = A.from + (A.to - A.from) * p;
    if (p >= 1) fallen = true;
    check();
    if (!fallen) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

// ── MORSE: cover the reflector. Short press = dot, long press = dash (v3 Signal) ──
// Pointer or Space on the mirror; ambiguous lengths are ignored with a shake; a wrong symbol resets.
// Dot/dash buttons are the no-timing fallback (motor accessibility).
function morse(body, spec, { hint, done }) {
  const want = spec.code.replace(/\s/g, '');
  const glyph = c => (c === '.' ? '·' : '−');
  body.innerHTML = `<div class="morse">
    <button type="button" class="mirror" aria-label="Laser reflector. Press briefly for a dot, hold for a dash."></button>
    <div><div class="code" aria-live="polite">${[...want].map(c => `<span>${glyph(c)}</span>`).join('')}</div>
      <p class="morse-msg">${spec.message}: ${spec.code.split(' ').map(g => [...g].map(glyph).join('')).join('  ')}</p>
      <div class="morse-alt"><button type="button" data-s=".">· dot</button><button type="button" data-s="-">− dash</button></div></div></div>`;
  const mirror = body.querySelector('.mirror'), spans = [...body.querySelectorAll('.code span')];
  let got = 0, downAt = 0;
  hint(spec.hint);
  const paint = bad => spans.forEach((s, i) => { s.className = i < got ? 'ok' : bad && i === got ? 'bad' : ''; });
  const add = sym => {
    if (sym === want[got]) { got++; paint(); got === want.length ? done() : hint(`${got} of ${want.length}.`, 'good'); }
    else { paint(true); got = 0; hint('Wrong symbol. From the top.', 'bad'); setTimeout(() => paint(), 400); }
  };
  const down = () => { if (downAt) return; downAt = performance.now(); mirror.classList.add('covered'); };
  const up = () => {
    if (!downAt) return;
    const ms = (performance.now() - downAt) * SPEED; downAt = 0; mirror.classList.remove('covered');
    if (ms <= spec.dotMaxMs) add('.'); else if (ms >= spec.dashMinMs) add('-');
    else { hint('Too in-between. Short, or long.', 'bad'); body.querySelector('.code').animate([{ translate: '-4px 0' }, { translate: '4px 0' }, { translate: '0 0' }], 180); }
  };
  mirror.addEventListener('pointerdown', e => { mirror.setPointerCapture(e.pointerId); down(); });
  mirror.addEventListener('pointerup', up); mirror.addEventListener('pointercancel', up);
  mirror.addEventListener('contextmenu', e => e.preventDefault());
  mirror.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); down(); } });
  mirror.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') up(); });
  body.querySelectorAll('.morse-alt button').forEach(b => b.addEventListener('click', () => add(b.dataset.s)));
  mirror.focus({ preventScroll: true });
  return () => {};
}

// ── FOCUS: slide the magnifier until the etched page resolves (v4 Library) ──
// Blur is proportional to distance from the target; win on release within tolerance (native range = keyboard-accessible).
function focus(body, spec, { hint, done }) {
  body.innerHTML = `<div class="focus"><div class="fiche" aria-hidden="true">${spec.page.map((l, i) => `<div class="${i ? '' : 'h'}">${l}</div>`).join('')}</div>
    <div class="mix"><span>near</span><input type="range" min="0" max="100" step="1" value="12" aria-label="Magnifier focus"><span>far</span></div></div>`;
  const input = body.querySelector('input'), fiche = body.querySelector('.fiche');
  hint('Slide the magnifier until the letters are sharp. Let go when they are.');
  const upd = commit => {
    const off = Math.abs(+input.value - spec.target), sharp = off <= spec.tolerance;
    fiche.style.filter = `blur(${Math.min(9, off * 0.35).toFixed(2)}px)`;
    fiche.classList.toggle('sharp', sharp);
    if (commit && sharp) done();
  };
  input.addEventListener('input', () => upd(false));
  input.addEventListener('change', () => upd(true));
  upd(false);
  return () => {};
}

const VERBS = { drag, balance, morse, focus };
