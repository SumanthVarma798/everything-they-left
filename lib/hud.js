// The visor HUD (v3). Halo-style: thin, translucent, edges only; the centre stays clear.
// mountHud(frame, { waypoints, o2Seconds, onTimer }) → { panel, unlock, setObjective, setPower, fail, toast, timer, destroy }
// `frame` is a positioned box that already holds the world (3D canvas or still). The storm leaves the
// HUD dead; unlock(keys) brings pieces back in content.js `hudUnlock` order. Keys: o2-gauge, objective,
// o2-bar, power-bar, compass, water-bar, salvage-tracker, link-earth, or 'all'.
import { wireTimerSwitch } from './interactions.js';

export function mountHud(frame, { waypoints = [], o2Seconds = 8 * 3600, onTimer } = {}) {
  frame.classList.add('visor-frame');
  frame.insertAdjacentHTML('beforeend', `
    <div class="visor-glass" aria-hidden="true"></div>
    <section class="hudel hud-objective" data-hud="objective" aria-live="polite"><div class="lbl">Objective</div><div class="txt"></div></section>
    <section class="hudel hud-top" data-hud="o2-bar" aria-hidden="true"><div class="lbl">Suit O₂</div><div class="hud-o2"></div>
      <div class="hud-compass" data-hud="compass"><div class="strip"></div></div></section>
    <section class="hudel hud-corner" data-hud="o2-gauge">
      <div class="hud-clock"><div>O₂ RESERVE</div><div class="clk">08:00:00</div><div class="hud-link" data-hud="link-earth">LINK · EARTH</div></div>
      <button type="button" class="hud-switch"></button></section>
    <section class="hudel hud-tracker" data-hud="salvage-tracker" aria-hidden="true"><div class="disc"><div class="sweep"></div></div>
      <i class="ping" style="left:68%;top:30%"></i><i class="ping" style="left:34%;top:62%"></i><div class="lbl">Salvage</div></section>
    <section class="hudel hud-gauges">
      <div class="hud-gauge" data-hud="power-bar"><div class="lbl">Power</div><div class="val pw">31%</div><div class="bar"><i class="pwbar" style="width:31%"></i></div></div>
      <div class="hud-gauge" data-hud="water-bar"><div class="lbl">Water</div><div class="val">9 L</div><div class="bar"><i style="width:18%"></i></div></div></section>
    <div class="visor-edge" aria-hidden="true"></div>
    <div class="visor-alert" role="alert" hidden></div>
    <div class="visor-toast" role="status" hidden></div>
    <div class="visor-panel"></div>`);
  const $ = s => frame.querySelector(s);

  // furniture
  $('.hud-o2').innerHTML = Array.from({ length: 20 }, (_, i) => `<i class="${i < 3 ? 'lo' : ''}${i > 14 ? ' empty' : ''}"></i>`).join('');
  const dirs = ['N', '', 'NE', '', 'E', '', 'SE', '', 'S', '', 'SW', '', 'W', '', 'NW', ''];
  const strip = $('.hud-compass .strip');
  strip.innerHTML = Array.from({ length: 96 }, (_, i) => { const d = dirs[i % 16]; return `<div class="t ${d ? 'big' : ''}"><span>${d}</span></div>`; }).join('')
    + waypoints.map((w, i) => `<div class="wp" style="left:${(12 + i * 23) * 20}px">${w} ▾</div>`).join('');
  let heading = 400, raf;
  const drift = () => { heading += 0.08; strip.style.transform = `translateX(${-(heading % 320) - 40}px)`; raf = requestAnimationFrame(drift); };
  raf = requestAnimationFrame(drift);
  let left = o2Seconds;
  const clk = setInterval(() => { left = Math.max(0, left - 1); $('.clk').textContent = new Date(left * 1000).toISOString().slice(11, 19); }, 1000);

  // unlocks — everything starts dead
  const all = () => [...frame.querySelectorAll('[data-hud]')];
  all().forEach(el => el.classList.add('off'));
  const unlock = (keys, animate = true) => {
    const want = keys.includes('all') ? all().map(el => el.dataset.hud) : keys;
    want.forEach((k, i) => {
      const el = frame.querySelector(`[data-hud="${k}"]`); if (!el || !el.classList.contains('off')) return;
      const on = () => { el.classList.remove('off'); if (animate) { el.classList.remove('booting'); void el.offsetWidth; el.classList.add('booting'); } };
      animate ? setTimeout(on, 250 + i * 380) : on();
    });
  };

  const timer = wireTimerSwitch($('.hud-switch'), onTimer);
  let alertT, toastT;
  return {
    panel: $('.visor-panel'),
    unlock,
    timer,
    setObjective: t => { $('.hud-objective .txt').textContent = t; },
    setPower: p => { $('.pw').textContent = Math.round(p) + '%'; $('.pwbar').style.width = p + '%'; },
    fail(msg = 'O₂ DEPLETED · RESTORING CHECKPOINT') {                 // shields-down: edges only, centre stays visible
      const e = $('.visor-edge'); e.classList.remove('pulse'); void e.offsetWidth; e.classList.add('pulse');
      const a = $('.visor-alert'); a.textContent = msg; a.hidden = false; clearTimeout(alertT); alertT = setTimeout(() => (a.hidden = true), 1300);
    },
    toast(msg, ms = 6000) { const t = $('.visor-toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), ms); },
    destroy() { cancelAnimationFrame(raf); clearInterval(clk); clearTimeout(alertT); clearTimeout(toastT); },
  };
}
