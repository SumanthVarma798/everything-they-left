// Game engine: beat list + renderers + SARATHI-7 companion band.
// window.__game = { go, state, start, pause, resume, skip, replayCheckpoint, onCheckpoint, onPause, stage, hud }
import { CONTENT } from '../content.js';
import { createStage } from './stage3d.js';
import { mountHud } from './hud.js';
import { eraFrame, eraOf } from './era.js';
import { ensurePencil, drawPlan } from './notebook.js';
import { mountInteraction, SPEED } from './interactions.js';
import { mountSalvageMap } from './archive-map.js';
import { PROGRESS, ids } from './progress.js';

const Q = new URLSearchParams(location.search);
const SCREENS = new Set(['title', 'prologue', 'opener', 'map', 'epilogue', 'credits']);
const DEBUG = Q.get('debug') === '1';
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DEEP = !!(Q.get('c') || Q.get('screen'));
const CPS_BHOOMI = 45;
const CPS_SARATHI = 30;
const HOLD_LABEL = 'PRESS & HOLD SPACE';
const REQUIRED_MEDIA = [
  'Solar System Scope — moon/earth/stars textures, CC BY 4.0',
  'Nathan Hughes Hamilton — Vikram Sarabhai photograph, CC BY 2.0',
  'ISRO — GODL-India images. Credit: ISRO',
  'Wikipedia contributors — missions data, CC BY-SA',
];

function cueFor(part, i) {
  const key = `${part}:${i}`;
  const cue = CONTENT.companion.cues[key];
  if (!cue) throw new Error(`missing companion cue ${key}`);
  return cue;
}

function buildBeats() {
  const C = CONTENT, S = C.companion, beats = [];
  const push = b => beats.push(b);
  const relives = (part, scenes, screen, chapter = null) => {
    (scenes || []).forEach((scene, i) => {
      push({ type: 'cue', kind: 'relive', part, i, cue: cueFor(part, i), screen, chapter });
      push({ type: 'relive', kind: 'relive', part, i, scene, screen, chapter });
    });
  };

  push({ type: 'title', kind: 'title', screen: 'title' });

  // Storm (first four prologue lines), then SARATHI boot, then she moves.
  C.prologue.lines.slice(0, 4).forEach((text, i) => push({ type: 'line', kind: 'prologue', text, screen: 'prologue', i }));
  S.boot.forEach((text, i) => push({ type: 'cue', kind: 'prologue', cue: { line: text }, dwell: i === 1, boot: true, screen: 'prologue' }));
  C.prologue.lines.slice(4).forEach((text, i) => push({ type: 'line', kind: 'prologue', text, screen: 'prologue', i: i + 4 }));

  push({ type: 'hold', kind: 'opener', screen: 'opener', prompt: C.opener.prompt, result: C.opener.result, hudUnlock: C.opener.hudUnlock });
  C.opener.lines.forEach((text, i) => push({ type: 'line', kind: 'opener', text, screen: 'opener', fillHold: text.includes('{s}') }));
  relives('opener', C.opener.relive, 'opener');
  push({ type: 'wonder', kind: 'wonder', text: C.opener.wonder, screen: 'opener' });
  C.motivation.forEach(text => push({ type: 'line', kind: 'opener', text, screen: 'opener' }));
  push({ type: 'notebook', kind: 'opener', notebook: C.notebook, screen: 'opener' });

  const seenMood = new Set();
  for (const c of C.crises) {
    if (!seenMood.has(c.mood)) {
      seenMood.add(c.mood);
      push({ type: 'line', kind: 'mood', text: S.arc[c.mood], screen: 'chapter', chapter: c.id, mood: true });
    }
    push({ type: 'alarm', kind: 'alarm', screen: 'chapter', chapter: c.id, crisis: c });
    push({ type: 'finds', kind: 'finds', screen: 'chapter', chapter: c.id, crisis: c });
    push({ type: 'act', kind: 'act', screen: 'chapter', chapter: c.id, crisis: c });
    push({ type: 'payoff', kind: 'payoff', screen: 'chapter', chapter: c.id, crisis: c });
    relives(c.id, c.relive, 'chapter', c.id);
    push({ type: 'wonder', kind: 'wonder', text: c.wonder, screen: 'chapter', chapter: c.id });
    if (c.hook) push({ type: 'hook', kind: 'hook', text: c.hook, screen: 'chapter', chapter: c.id });
    if (c.id === 'library') push({ type: 'map', kind: 'map', screen: 'map' });
  }

  C.finale.reply.forEach(text => push({ type: 'line', kind: 'epilogue', text, screen: 'epilogue' }));
  relives('finale', C.finale.relive, 'epilogue');
  push({ type: 'rows', kind: 'rows', screen: 'epilogue', heading: C.finale.heading, note: C.finale.note, rows: C.finale.rows });
  push({ type: 'plaque', kind: 'plaque', plaque: C.finale.plaque, screen: 'epilogue' });
  const L = S.lessonOne;
  push({ type: 'cue', kind: 'epilogue', cue: { lesson: 1, line: L.cue }, screen: 'epilogue', lessonOne: true });
  push({ type: 'recording', kind: 'epilogue', year: L.recorded, voice: L.voice, text: L.line, screen: 'epilogue' });
  push({ type: 'cue', kind: 'epilogue', cue: { line: L.after[0] }, boot: true, screen: 'epilogue' });
  push({ type: 'cue', kind: 'epilogue', cue: { line: L.after[1] }, boot: true, screen: 'epilogue' });
  push({ type: 'line', kind: 'epilogue', text: L.after[2], screen: 'epilogue' });
  C.finale.choice.forEach(text => push({ type: 'line', kind: 'epilogue', text, screen: 'epilogue' }));
  push({ type: 'line', kind: 'epilogue', text: C.finale.closing, screen: 'epilogue' });
  push({ type: 'line', kind: 'epilogue', text: C.finale.last, screen: 'epilogue' });
  push({ type: 'credits', kind: 'credits', screen: 'credits' });
  return beats;
}

const BEATS = buildBeats();

function allSources() {
  const out = [];
  const add = srcs => (srcs || []).forEach(([label, url]) => { if (url) out.push({ label, url }); });
  add(CONTENT.opener.sources);
  add(CONTENT.notebook.sources);
  add(CONTENT.companion.sources);
  add(CONTENT.finale.sources);
  CONTENT.crises.forEach(c => add(c.sources));
  return out;
}

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

let missionsP = null;
function loadMissions() {
  if (!missionsP) {
    missionsP = fetch('data/missions.json').then(r => r.ok ? r.json() : []).catch(() => []);
  }
  return missionsP;
}

export function boot({ canvas, hudRoot, cut, still }) {
  const stage = createStage(canvas, {
    moon: 'assets/textures/moon_4k.jpg',
    earth: 'assets/textures/earth_day.jpg',
    stars: 'assets/textures/stars_milky_way.jpg',
  });
  if (stage) still.hidden = true;
  else { canvas.hidden = true; still.hidden = false; }

  const waypoints = CONTENT.salvageMap.beats.filter(b => b.salvage).map(b => b.match);
  let timerCb = null;
  const hud = mountHud(hudRoot, { waypoints, onTimer: on => { timerCb?.(on); activeAct?.setTimer?.(on); } });

  const body = el('div');
  body.id = 'cut-body';
  body.dataset.debug = 'cut-body';
  const band = mountBand(cut);
  cut.prepend(body);
  const nameTag = el('p', 'beat-name');
  nameTag.hidden = !DEBUG;
  cut.append(nameTag);

  let started = false, paused = false;
  let screen = Q.get('screen') || 'title';
  let chapterId = Q.get('c') || null;
  let beat = Q.get('beat') || null;
  let index = 0;
  let holdSeconds = 0;
  let misses = Math.max(0, +(Q.get('misses') || 0));
  let holding = false;
  let activeAct = null;
  let currentAnim = null;
  let skipType = null;
  let audioCtx = null;
  let currentClip = null;
  let abort = null;
  let flown = null;
  let mapApi = null;
  let mapObs = null;
  let mapLifted = false;
  const checkpointCbs = [];
  const pauseCbs = [];
  const audios = [];

  const chapterOf = () => CONTENT.crises.find(c => c.id === chapterId) || CONTENT.crises[0];
  const current = () => BEATS[index];
  const stale = () => abort?.signal.aborted;

  function unlockAudio() {
    try {
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();
    } catch {}
  }

  function stopClip() {
    if (currentClip) { try { currentClip.pause(); currentClip.src = ''; } catch {} currentClip = null; }
  }

  function playClip(src, start = 0, dur = 5) {
    if (!src) return;
    stopClip();
    const a = new Audio(src);
    a.currentTime = start;
    const ms = dur * 1000 / SPEED;
    const stop = () => { if (currentClip === a) { a.pause(); currentClip = null; } };
    a.addEventListener('playing', () => setTimeout(stop, ms));
    a.play().catch(() => {});
    currentClip = a;
    audios.push(a);
  }

  function alarmBeep() {
    if (!audioCtx) return;
    [0, 0.18, 0.36].forEach((t, i) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.frequency.value = i % 2 ? 660 : 880;
      o.connect(g); g.connect(audioCtx.destination);
      const t0 = audioCtx.currentTime + t;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
      o.start(t0); o.stop(t0 + 0.16);
    });
  }

  function typeInto(node, text, cps) {
    node.textContent = text;
    skipType = null;
    currentAnim?.cancel();
    currentAnim = null;
    if (REDUCE || !text) return Promise.resolve();
    const n = Math.max(1, text.length);
    const ms = (n / cps) * 1000 / SPEED;
    return new Promise(resolve => {
      let settled = false;
      const anim = node.animate(
        [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
        { duration: ms, easing: `steps(${n}, end)`, fill: 'forwards' }
      );
      currentAnim = anim;
      const done = () => {
        if (settled) return;
        settled = true;
        if (skipType === done) skipType = null;
        if (currentAnim === anim) {
          currentAnim = null;
          try { anim.cancel(); } catch {}
          node.style.clipPath = 'none';
          node.textContent = text;
        }
        resolve();
      };
      skipType = done;
      if (paused) anim.pause();
      anim.finished.then(done).catch(done);
    });
  }

  function wait(ms) {
    return new Promise(resolve => {
      const signal = abort?.signal;
      if (signal?.aborted) return resolve(false);
      let left = ms, last = performance.now(), raf;
      const onAbort = () => { cancelAnimationFrame(raf); resolve(false); };
      signal?.addEventListener('abort', onAbort, { once: true });
      const tick = now => {
        if (!paused) left -= now - last;
        last = now;
        if (left <= 0) { signal?.removeEventListener('abort', onAbort); resolve(true); }
        else raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
  }

  function fireCheckpoint() {
    const ch = chapterOf();
    const info = { chapter: ch.chapter, title: ch.title, id: ch.id, name: ch.name };
    checkpointCbs.forEach(cb => cb(info));
  }

  function clearAct() {
    activeAct?.destroy();
    activeAct = null;
    hud.panel.replaceChildren();
  }

  function clearMap() {
    mapObs?.disconnect();
    mapObs = null;
    mapApi?.destroy();
    mapApi = null;
    mapLifted = false;
  }

  function unlockMapYear(y) {
    if (!Number.isFinite(y)) return;
    for (const beat of CONTENT.salvageMap.beats) {
      if (beat.year > y) continue;
      if (beat.match) PROGRESS.unlock(ids.mission(beat.match));
      if (beat.salvage) PROGRESS.unlock(ids.artifact(beat.salvage));
    }
  }

  function hookMapYear(root) {
    const yEl = root.querySelector('.y');
    const slider = root.querySelector('input[type=range]');
    const apply = () => {
      const y = +(slider?.value || yEl?.textContent);
      unlockMapYear(y);
    };
    slider?.addEventListener('input', apply);
    if (yEl) {
      mapObs = new MutationObserver(apply);
      mapObs.observe(yEl, { childList: true, characterData: true, subtree: true });
    }
    apply();
  }

  function aimCamera(b) {
    if (!b?.chapter || !stage || !started) return;
    const wp = CONTENT.crises.find(c => c.id === b.chapter)?.waypoint;
    if (!wp) return;
    if (DEEP || flown === b.chapter) stage.snap(wp);
    else {
      flown = b.chapter;
      stage.flyTo(wp, 3);
    }
  }

  function focusAct() {
    const node = hud.panel.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
    node?.focus({ preventScroll: true });
  }

  function letterbox(text, { italic = false, fillHold = false } = {}) {
    body.append(el('div', 'letterbox top'), el('div', 'letterbox bottom'));
    const p = el('p', italic ? 'cut-line wonder-line' : 'cut-line');
    p.dataset.debug = italic ? 'wonder' : 'line';
    const t = fillHold ? text.replace('{s}', String(Math.round(holdSeconds))) : text;
    body.append(p);
    return { p, t };
  }

  function mountBand(root) {
    const aside = el('aside', 'companion-band');
    aside.id = 'companion-band';
    aside.hidden = true;
    aside.dataset.debug = 'companion-band';
    aside.innerHTML = `<span class="companion-glyph" data-debug="companion-glyph" aria-hidden="true">⟐</span>
      <div class="companion-copy"><div class="companion-meta" data-debug="companion-meta"></div>
      <p class="companion-line" data-debug="companion-line"></p></div>`;
    root.append(aside);
    const meta = aside.querySelector('.companion-meta');
    const line = aside.querySelector('.companion-line');
    const unit = CONTENT.companion.unit;
    const total = CONTENT.companion.lessons;
    return {
      async speak(cue) {
        aside.hidden = false;
        aside.classList.add('on', 'speaking');
        aside.classList.remove('fade');
        meta.textContent = cue.lesson != null ? `${unit} · LESSON ${cue.lesson} / ${total}` : unit;
        await typeInto(line, cue.line, CPS_SARATHI);
      },
      keep() { aside.hidden = false; aside.classList.add('on'); aside.classList.remove('fade'); },
      fade() {
        aside.classList.remove('speaking', 'on');
        aside.classList.add('fade');
      },
      hide() {
        aside.hidden = true;
        aside.classList.remove('on', 'fade', 'speaking', 'paused');
        line.textContent = '';
        meta.textContent = '';
      },
      pause() { aside.classList.add('paused'); },
      resume() { aside.classList.remove('paused'); },
      get visible() { return !aside.hidden && aside.classList.contains('on'); },
    };
  }

  async function render(b) {
    body.replaceChildren();
    clearAct();
    holding = false;
    const keepBand = b.type === 'relive' && BEATS[index - 1]?.type === 'cue' && !BEATS[index - 1].boot && !BEATS[index - 1].lessonOne;
    if (b.type === 'cue') {
      /* band speaks; centre stays empty */
    } else if (!keepBand) {
      band.hide();
    } else {
      band.keep();
    }

    if (b.screen === 'epilogue' && b === BEATS.find(x => x.screen === 'epilogue')) PROGRESS.unlock(ids.screen('epilogue'));

    if (b.type === 'title') {
      const wrap = el('div', 'title-card');
      wrap.dataset.debug = 'title';
      wrap.append(el('h1', '', CONTENT.title), el('p', 'sub', CONTENT.subtitle));
      wrap.append(el('p', 'title-hold-hint', CONTENT.opener.prompt.split('.')[0] + '.'));
      const btn = el('button', 'hold-btn', HOLD_LABEL);
      btn.type = 'button';
      wrap.append(btn);
      body.append(wrap);
      btn.focus({ preventScroll: true });
      wireHold(btn, () => { unlockAudio(); next(); });
      return;
    }

    if (b.type === 'line' || b.type === 'hook') {
      const { p, t } = letterbox(b.text, { fillHold: b.fillHold });
      await typeInto(p, t, CPS_BHOOMI);
      if (stale()) return;
      if (await wait(1500 / SPEED)) next();
      return;
    }

    if (b.type === 'wonder') {
      const { p, t } = letterbox(b.text, { italic: true });
      await typeInto(p, t, CPS_BHOOMI);
      return;
    }

    if (b.type === 'cue') {
      await band.speak(b.cue);
      if (stale()) return;
      const dwell = b.dwell ? 2200 / SPEED : 1500 / SPEED;
      if (await wait(dwell)) next();
      return;
    }

    if (b.type === 'hold') {
      const wrap = el('div', 'title-card');
      const prompt = el('p', 'cut-line');
      prompt.dataset.debug = 'opener-prompt';
      wrap.append(prompt);
      const btn = el('button', 'hold-btn', HOLD_LABEL);
      btn.type = 'button';
      wrap.append(btn);
      body.append(wrap);
      btn.focus({ preventScroll: true });
      typeInto(prompt, b.prompt, CPS_BHOOMI);
      const t0 = { at: 0 };
      wireHold(btn, () => {
        holdSeconds = t0.at ? (performance.now() - t0.at) / 1000 : 0;
        if (b.hudUnlock) hud.unlock(b.hudUnlock, false);
        next();
      }, t0);
      return;
    }

    if (b.type === 'alarm') {
      const c = b.crisis;
      PROGRESS.unlock(ids.chapter(c.id));
      hud.setObjective(c.objective);
      fireCheckpoint();
      alarmBeep();
      const status = el('p', 'alarm-status', c.alarm.status);
      status.dataset.debug = 'alarm-status';
      const log = el('p', 'alarm-log');
      log.dataset.debug = 'alarm-log';
      body.append(status, log);
      if (c.alarm.plan) {
        const paper = el('div', 'paper alarm-plan');
        paper.dataset.debug = 'alarm-plan';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('plan-svg');
        paper.append(svg);
        body.append(paper);
        drawPlan(svg, c.alarm.plan);
      }
      await typeInto(log, c.alarm.log, CPS_BHOOMI);
      return;
    }

    if (b.type === 'finds') {
      const c = b.crisis;
      ensurePencil();
      const card = el('div', 'paper paper-card');
      card.dataset.debug = 'finds';
      c.finds.forEach((f, i) => {
        PROGRESS.unlock(ids.find(c.id, i));
        const block = el('div', 'find-block');
        if (f.projected) block.append(el('span', 'projected-tag', 'PROJECTED'));
        if (f.year) block.append(el('div', 'find-year', String(f.year)));
        block.append(el('p', 'hand find-text', f.text));
        if (f.img) {
          const img = el('img', 'sketch');
          img.src = f.img;
          img.alt = '';
          img.width = 320;
          block.append(img);
        }
        card.append(block);
      });
      body.append(card);
      return;
    }

    if (b.type === 'act') {
      const c = b.crisis;
      fireCheckpoint();
      activeAct = mountInteraction(hud.panel, c.interaction, {
        timerOn: hud.timer.on,
        onWin: () => { PROGRESS.unlock(ids.fix(c.id)); next(); },
        onMiss: () => {
          hud.fail();
          misses += 1;
          if (misses === 3) hud.toast('Want to read at your own pace? Turn off the timer ↗');
        },
      });
      focusAct();
      return;
    }

    if (b.type === 'payoff') {
      const c = b.crisis;
      if (c.hudUnlock) hud.unlock(c.hudUnlock);
      hud.setObjective(c.objective);
      const wrap = el('div', 'payoff');
      wrap.dataset.debug = 'payoff';
      c.payoff.lines.forEach(text => wrap.append(el('p', 'payoff-line', text)));
      if (c.payoff.solvedBefore) wrap.append(el('div', 'solved-stamp', `SOLVED BEFORE · ${c.payoff.solvedBefore}`));
      body.append(wrap);
      return;
    }

    if (b.type === 'relive') {
      PROGRESS.unlock(ids.moment(b.part, b.i));
      const s = b.scene;
      const frame = el('div', 'relive-frame');
      frame.dataset.debug = 'relive';
      if (s.img) {
        const fig = eraFrame(s.img, s.year, { date: s.date, live: s.live });
        fig.classList.add('relive-era');
        if (!REDUCE) {
          fig.classList.add('kenburns');
          if (b.part === 'finale') fig.querySelector('img')?.style.setProperty('animation-duration', `${4 / SPEED}s`);
        }
        frame.append(fig);
      } else {
        frame.append(captionCard(s.year, s.text, { projected: s.projected }));
      }
      const cap = el('p', 'relive-caption', s.text);
      cap.dataset.debug = 'relive-caption';
      frame.append(cap);
      body.append(frame);
      if (s.audio) playClip(s.audio, s.audioStart || 0, s.audioDur || 5);
      if (keepBand) {
        wait(1200 / SPEED).then(ok => { if (ok && !stale()) band.fade(); });
      }
      const hold = (b.part === 'finale' ? 4000 : 8000) / SPEED;
      if (await wait(hold)) next();
      return;
    }

    if (b.type === 'notebook') {
      ensurePencil();
      const card = el('div', 'paper paper-card');
      card.dataset.debug = 'notebook';
      b.notebook.lines.forEach(text => card.append(el('p', 'hand find-text', text)));
      body.append(card);
      return;
    }

    if (b.type === 'rows') {
      ensurePencil();
      const card = el('div', 'paper paper-card rows-card');
      card.dataset.debug = 'rows';
      card.append(el('h2', 'hand rows-heading', b.heading));
      card.append(el('p', 'hand rows-note', b.note));
      b.rows.forEach(row => {
        const block = el('div', 'find-block');
        if (row.projected) block.append(el('span', 'projected-tag', 'PROJECTED'));
        block.append(el('p', 'hand find-text', row.imagined));
        block.append(el('p', 'hand find-text', row.real));
        if (row.gap) block.append(el('div', 'find-year', row.gap));
        if (row.img) {
          const img = el('img', 'sketch');
          img.src = row.img;
          img.alt = '';
          img.width = 320;
          block.append(img);
        }
        card.append(block);
      });
      body.append(card);
      return;
    }

    if (b.type === 'plaque') {
      const p = b.plaque;
      const card = el('div', 'plaque-card');
      card.dataset.debug = 'plaque';
      card.append(el('p', 'plaque-lead', p.lead));
      card.append(el('p', 'plaque-text', p.text));
      p.after.forEach(text => card.append(el('p', 'plaque-after', text)));
      body.append(card);
      return;
    }

    if (b.type === 'recording') {
      const era = eraOf(b.year);
      const fig = el('figure', `era era-${era.key} recording-card`);
      fig.dataset.debug = 'recording';
      fig.innerHTML = `<i class="era-grain" aria-hidden="true"></i><i class="era-fx" aria-hidden="true"></i>
        <span class="era-tag">${era.label} · ${b.year}</span>`;
      fig.append(el('p', 'recording-voice', b.voice));
      const line = el('p', 'recording-line');
      fig.append(line);
      body.append(fig);
      await typeInto(line, b.text, CPS_SARATHI);
      return;
    }

    if (b.type === 'credits') {
      const wrap = el('div', 'credits-card');
      wrap.dataset.debug = 'credits';
      wrap.append(el('h2', '', 'Memorial'));
      const ul = el('ul', 'credits-memorial');
      CONTENT.memorial.forEach(n => ul.append(el('li', '', n)));
      wrap.append(ul);
      wrap.append(el('h2', '', 'Sources'));
      const src = el('ul', 'credits-sources');
      allSources().forEach(({ label, url }) => {
        const li = el('li');
        const a = el('a', '', label);
        a.href = url; a.target = '_blank'; a.rel = 'noreferrer';
        li.append(a);
        src.append(li);
      });
      wrap.append(src);
      wrap.append(el('h2', '', 'Media'));
      const media = el('ul', 'credits-media');
      REQUIRED_MEDIA.forEach(t => media.append(el('li', '', t)));
      wrap.append(media);
      body.append(wrap);
      fetch('CREDITS.md').then(r => r.ok ? r.text() : '').then(md => {
        if (stale() || !md) return;
        wrap.append(el('pre', 'credits-md', md));
      }).catch(() => {});
      return;
    }

    if (b.type === 'map') {
      PROGRESS.unlock(ids.screen('map'));
      body.classList.add('is-map');
      const missions = await loadMissions();
      if (stale()) return;
      mapApi = mountSalvageMap(body, {
        ...CONTENT.salvageMap,
        missions,
        moonTexture: 'assets/textures/moon_2k.jpg',
        earthTexture: 'assets/textures/earth_day.jpg',
        onDone: () => { mapLifted = true; },
      });
      hookMapYear(body);
      return;
    }
  }

  function captionCard(year, text, { projected = false } = {}) {
    const era = eraOf(year);
    const fig = el('figure', `era era-${era.key} recording-card`);
    fig.innerHTML = `<i class="era-grain" aria-hidden="true"></i><i class="era-fx" aria-hidden="true"></i>
      <span class="era-tag">${era.label} · ${year}</span>`;
    if (projected) fig.append(el('span', 'projected-tag', 'PROJECTED'));
    fig.append(el('p', 'recording-line', text));
    return fig;
  }

  function wireHold(btn, onDone, t0) {
    holding = true;
    let down = false, fired = false;
    const startHold = () => { if (down || fired) return; down = true; unlockAudio(); if (t0) t0.at = performance.now(); btn.classList.add('holding'); };
    const end = () => {
      if (!down || fired) return;
      down = false; btn.classList.remove('holding');
      fired = true; holding = false; onDone();
    };
    btn.addEventListener('pointerdown', e => { e.preventDefault(); btn.setPointerCapture(e.pointerId); startHold(); });
    btn.addEventListener('pointerup', end);
    btn.addEventListener('pointercancel', () => { down = false; btn.classList.remove('holding'); });
    const onKey = e => {
      if (e.code !== 'Space' && e.key !== ' ') return;
      e.preventDefault();
      if (e.type === 'keydown' && !e.repeat) startHold();
      if (e.type === 'keyup') end();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('keyup', onKey);
    abort.signal.addEventListener('abort', () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('keyup', onKey);
      holding = false;
    }, { once: true });
  }

  function paintName(b) {
    if (!DEBUG || !b) { nameTag.hidden = true; return; }
    nameTag.hidden = false;
    nameTag.textContent = b.chapter ? `${b.chapter}:${b.kind}` : (b.screen || b.type);
  }

  async function playIndex(i) {
    if (i < 0 || i >= BEATS.length) return;
    abort?.abort();
    abort = new AbortController();
    stopClip();
    skipType = null;
    currentAnim?.cancel();
    currentAnim = null;
    clearMap();
    body.classList.remove('is-map');
    index = i;
    const b = BEATS[i];
    screen = b.screen;
    chapterId = b.chapter || (b.screen === 'chapter' ? chapterId : null);
    beat = b.kind;
    aimCamera(b);
    paintName(b);
    await render(b);
  }

  function next() {
    if (!started || paused) return;
    if (index + 1 < BEATS.length) playIndex(index + 1);
  }

  function findBeat(target, beatName) {
    if (target === 'epilogue' && beatName) {
      const i = BEATS.findIndex(b => b.screen === 'epilogue' && (b.type === beatName || b.kind === beatName));
      if (i >= 0) return i;
    }
    if (SCREENS.has(target)) return BEATS.findIndex(b => b.screen === target);
    const want = beatName || 'alarm';
    if (want === 'relive') return BEATS.findIndex(b => b.chapter === target && b.type === 'cue');
    return BEATS.findIndex(b => b.chapter === target && b.kind === want);
  }

  function go(target, beatName) {
    if (!target) return;
    const i = findBeat(target, beatName);
    if (i < 0) return;
    const b = BEATS[i];
    screen = b.screen;
    chapterId = b.chapter || null;
    beat = beatName || b.kind;
    if (SCREENS.has(target) && !b.chapter) chapterId = null;
    if (b.chapter && (b.kind === 'act' || b.kind === 'alarm')) fireCheckpoint();
    if (started) playIndex(i);
  }

  function pause() {
    if (!started) return;
    if (skipType) skipType();
    const was = paused;
    paused = true;
    currentAnim?.pause();
    band.pause();
    cut.classList.add('paused');
    cut.querySelectorAll('.timed').forEach(n => n.classList.add('paused'));
    hudRoot.querySelectorAll('.timed').forEach(n => n.classList.add('paused'));
    audios.forEach(a => { try { a.pause(); } catch {} });
    if (!was) pauseCbs.forEach(cb => cb());
  }

  function resume() {
    if (!started) return;
    paused = false;
    currentAnim?.play();
    band.resume();
    cut.classList.remove('paused');
    cut.querySelectorAll('.timed').forEach(n => n.classList.remove('paused'));
    hudRoot.querySelectorAll('.timed').forEach(n => n.classList.remove('paused'));
    if (currentClip && currentClip.paused) currentClip.play().catch(() => {});
  }

  function skip() {
    if (!started || paused) return;
    const b = current();
    if (!b) return;
    if (b.type === 'cue' || b.type === 'relive') {
      let i = index;
      const part = b.part;
      while (i < BEATS.length && (BEATS[i].type === 'cue' || BEATS[i].type === 'relive') && BEATS[i].part === part) i++;
      band.hide();
      playIndex(i);
      return;
    }
    next();
  }

  function onAdvance(e) {
    if (!started || paused) return;
    const b = current();
    if (!b || b.type === 'act' || b.type === 'credits' || holding) return;
    if (b.type === 'map' && !mapLifted) return;
    if (e && e.target.closest?.('.visor-panel, .hud-switch, .hold-btn, .stage-cta, .control-bar, a, input, button')) return;
    if (skipType) { skipType(); return; }
    next();
  }

  function onKey(e) {
    if (!started) return;
    if (e.key === 'Escape') { e.preventDefault(); pause(); return; }
    if (paused || holding) return;
    const b = current();
    if (!b || b.type === 'act' || b.type === 'credits') return;
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.closest?.('input, textarea, button.hold-btn')) return;
      e.preventDefault();
      if (skipType) skipType();
      else next();
    }
  }

  cut.parentElement?.addEventListener('click', onAdvance);
  document.addEventListener('keydown', onKey);

  function start() {
    if (started) return;
    started = true;
    paused = false;
    hud.unlock(['o2-gauge'], false);
    const c = Q.get('c'), s = Q.get('screen');
    if (c) go(c, Q.get('beat') || 'alarm');
    else go(s || 'title', Q.get('beat') || null);
    if (!abort) {
      const i = Math.max(0, findBeat(c || s || 'title', Q.get('beat')));
      playIndex(i);
    }
  }

  function replayCheckpoint() {
    if (!started) return;
    go(chapterOf().id, 'act');
  }

  const api = {
    get stage() { return stage; },
    get hud() { return hud; },
    get state() {
      const ch = chapterOf();
      const b = current();
      return {
        started, paused, screen, chapter: chapterId, beat: b?.kind || beat,
        chapterNum: ch.chapter, title: ch.title, name: ch.name,
      };
    },
    start, pause, resume, go, skip, replayCheckpoint,
    onCheckpoint(cb) { checkpointCbs.push(cb); },
    onPause(cb) { pauseCbs.push(cb); },
    onTimer(cb) { timerCb = cb; },
    trackAudio(a) { audios.push(a); },
  };
  window.__game = api;
  return api;
}
