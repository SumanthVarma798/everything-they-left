// The Attempt Map — the view from the Moon. Every Moon-bound mission is a line thrown from Earth.
// mountAttemptMap(root, { missions, beats, intro, summary, moonTexture, earthTexture }) → { setYear, destroy }
// Colours: fail red · partial amber · success cyan · crewed gold. Launch failures stop near Earth.
import { SPEED } from './interactions.js';

const W = 1000, H = 600, EX = 500, EY = 120, ER = 44, HCY = 1560, HR = 1100;   // horizon = big circle
const Y0 = 1958, Y1 = 2026;
const hY = x => HCY - Math.sqrt(HR * HR - (x - EX) ** 2);
const hash = n => ((n * 2654435761) >>> 0) / 2 ** 32;

export function mountAttemptMap(root, cfg) {
  const M = cfg.missions.filter(m => !m.transit).sort((a, b) => a.n - b.n);
  // v3: beats with `salvage` stay lit in amber (the parts Bhoomi needs)
  const isSalvage = m => cfg.beats.some(b => b.salvage && b.match && m.name.startsWith(b.match));
  const perYear = {};
  const arcs = M.map(m => {
    const k = (perYear[m.year] = (perYear[m.year] || 0) + 1) - 1;
    const x = 90 + (m.year - Y0) / (Y1 - Y0) * 820 + (k % 4) * 5 - 7;
    const lift = m.kind === 'flyby' || m.kind === 'orbiter' ? 26 + hash(m.n) * 18 : 0;
    const ex = x, ey = hY(x) - lift;
    const side = hash(m.n + 7) > .5 ? 1 : -1, cx = (EX + ex) / 2 + side * (40 + hash(m.n) * 120), cy = 170 + hash(m.n + 3) * 140;
    const launchFail = /launch failure/i.test(m.outcome);
    const cls = m.kind === 'crewed' ? (m.result === 'fail' ? 'fail' : 'crewed') : m.result;
    const q = (a, b, c, t) => (1 - t) ** 2 * a + 2 * (1 - t) * t * b + t * t * c;
    const tx = launchFail ? q(EX, cx, ex, .14) : ex, ty = launchFail ? q(EY + ER, cy, ey, .14) : ey;
    return { m, ex, ey, tx, ty, d: `M${EX} ${EY + ER}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`, cls, launchFail };
  });

  root.innerHTML = `<div class="amap">
    <svg class="amap-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Every attempt to reach the Moon, 1958 to 2026">
      <defs>
        <pattern id="am-moon" patternUnits="userSpaceOnUse" width="2200" height="1100"><image href="${cfg.moonTexture}" width="2200" height="1100"/></pattern>
        <pattern id="am-earth" patternUnits="objectBoundingBox" width="1" height="1"><image href="${cfg.earthTexture}" width="${ER * 4}" height="${ER * 2}" x="${-ER}" y="0"/></pattern>
        <radialGradient id="am-shade" cx="30%" cy="35%" r="75%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>
        <linearGradient id="am-horizon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".3" stop-color="#000" stop-opacity=".55"/></linearGradient>
      </defs>
      <circle cx="${EX}" cy="${EY}" r="${ER + 10}" fill="#4a8cff" opacity=".12"/>
      <circle cx="${EX}" cy="${EY}" r="${ER}" fill="url(#am-earth)"/><circle cx="${EX}" cy="${EY}" r="${ER}" fill="url(#am-shade)"/>
      <g class="arcs">${arcs.map((a, i) => `<g class="arc ${a.cls}${a.launchFail ? ' lf' : ''}${isSalvage(a.m) ? ' salvage' : ''}" data-i="${i}">
        <path d="${a.d}" pathLength="100"><title>${a.m.name} · ${a.m.year} · ${a.m.country} · ${a.m.outcome}</title></path>
        ${a.launchFail ? '' : a.cls === 'fail' ? `<path class="burst" d="M${a.ex - 5} ${a.ey - 5}l10 10m0-10l-10 10"/>` : `<circle class="end" cx="${a.ex}" cy="${a.ey}" r="${a.cls === 'crewed' ? 4 : 2.4}"/>`}
        <text class="tag" x="${a.tx.toFixed(1)}" y="${(a.ty - 12).toFixed(1)}" text-anchor="middle">${a.m.name.split(' (')[0]}</text></g>`).join('')}</g>
      <circle cx="${EX}" cy="${HCY}" r="${HR}" fill="url(#am-moon)"/><circle cx="${EX}" cy="${HCY}" r="${HR}" fill="url(#am-horizon)"/>
      <text class="year-big" x="${W - 36}" y="78" text-anchor="end">${Y0}</text>
    </svg>
    <div class="amap-ui">
      <div class="amap-card" aria-live="polite"><p class="amap-log">${cfg.intro}</p></div>
      <div class="amap-row">
        <button type="button" class="amap-play" aria-label="Play">▶</button>
        <input type="range" class="amap-year" min="${Y0}" max="${Y1}" step="1" value="${Y0}" aria-label="${cfg.scrubHint || 'Year'}">
        <span class="amap-count"></span>
      </div>
      <div class="amap-legend"><span class="k fail">crashed / failed</span><span class="k partial">partly worked</span><span class="k success">made it</span><span class="k crewed">people</span></div>
    </div></div>`;

  const svg = root.querySelector('svg'), slider = root.querySelector('.amap-year'), log = root.querySelector('.amap-log'), count = root.querySelector('.amap-count'), big = root.querySelector('.year-big'), play = root.querySelector('.amap-play');
  const groups = [...root.querySelectorAll('.arc')];
  let year = Y0 - 1, playT = null, shownBeat = null;

  function setYear(y) {
    y = Math.max(Y0, Math.min(Y1, y));
    groups.forEach((g, i) => g.classList.toggle('on', arcs[i].m.year <= y));
    const seen = arcs.filter(a => a.m.year <= y), failed = seen.filter(a => a.m.result === 'fail').length;
    count.textContent = `${seen.length} tries · ${failed} failed`;
    big.textContent = y; slider.value = y;
    // newest beat at or before this year, but only once we're actually in that year's window
    const beat = [...cfg.beats].reverse().find(b => b.year <= y);
    if (beat && beat !== shownBeat) {
      shownBeat = beat; log.textContent = `${beat.year} · ${beat.log}`;
      groups.forEach((g, i) => g.classList.toggle('beat', !!beat.match && arcs[i].m.name.startsWith(beat.match)));   // v3 beats can have match: null
    }
    if (y === Y1 && cfg.summary) log.textContent = cfg.summary;
    year = y;
  }
  const stop = () => { clearTimeout(playT); playT = null; play.textContent = '▶'; play.setAttribute('aria-label', 'Play'); };
  const step = () => {
    if (year >= Y1) return stop();
    const next = year + 1, pausesHere = cfg.beats.some(b => b.year === next);
    setYear(next);
    playT = setTimeout(step, (pausesHere ? 3200 : 220) / SPEED);
  };
  play.addEventListener('click', () => { if (playT) return stop(); if (year >= Y1) setYear(Y0); play.textContent = '❚❚'; play.setAttribute('aria-label', 'Pause'); step(); });
  slider.addEventListener('input', () => { stop(); setYear(+slider.value); });
  svg.addEventListener('click', e => {
    const g = e.target.closest('.arc'); if (!g || !g.classList.contains('on')) return;
    const m = arcs[g.dataset.i].m; stop();
    log.textContent = `${m.year} · ${m.name} (${m.country}) · ${m.outcome}`;
    groups.forEach(x => x.classList.toggle('beat', x === g));
  });
  setYear(+(new URLSearchParams(location.search).get('year') || Y0));
  return { setYear, destroy: () => { stop(); root.replaceChildren(); } };
}
