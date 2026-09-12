// Game engine (thin): stage + HUD + router + pause. Beat renderers come later (prompts B–D).
// window.__game = { go, state, start, pause, resume, skip, replayCheckpoint, onCheckpoint, stage, hud }
import { CONTENT } from '../content.js';
import { createStage } from './stage3d.js';
import { mountHud } from './hud.js';

const Q = new URLSearchParams(location.search);
const SCREENS = new Set(['title', 'prologue', 'opener', 'map', 'epilogue', 'credits']);
const SALVAGE = { 'reflector-a11': 'APOLLO 11', 'rtg-a12': 'APOLLO 12', 'drill-im2': 'IM-2 DRILL', 'reflector-ch3': 'VIKRAM' };

export function boot({ canvas, hudRoot, cut, still }) {
  const stage = createStage(canvas, {
    moon: 'assets/textures/moon_4k.jpg',
    earth: 'assets/textures/earth_day.jpg',
    stars: 'assets/textures/stars_milky_way.jpg',
  });
  if (stage) still.hidden = true;
  else { canvas.hidden = true; still.hidden = false; }

  const waypoints = CONTENT.salvageMap.beats.filter(b => b.salvage).map(b => SALVAGE[b.salvage]);
  let timerCb = null;
  const hud = mountHud(hudRoot, { waypoints, onTimer: on => timerCb?.(on) });

  let started = false, paused = false;
  let screen = Q.get('screen') || 'title';
  let chapterId = Q.get('c') || null;
  let beat = Q.get('beat') || null;
  const checkpointCbs = [];
  const audios = [];

  const chapterOf = () => CONTENT.crises.find(c => c.id === chapterId) || CONTENT.crises[0];

  function paintCut() {
    cut.replaceChildren();
    const p = document.createElement('p');
    p.className = 'beat-name';
    p.textContent = chapterId ? `${chapterId}:${beat || 'alarm'}` : (screen || 'title');
    cut.append(p);
  }

  function fireCheckpoint() {
    const ch = chapterOf();
    const info = { chapter: ch.chapter, title: ch.title, id: ch.id, name: ch.name };
    checkpointCbs.forEach(cb => cb(info));
  }

  function pause() {
    paused = true;
    cut.querySelectorAll('.timed').forEach(el => el.classList.add('paused'));
    hudRoot.querySelectorAll('.timed').forEach(el => el.classList.add('paused'));
    audios.forEach(a => { try { a.pause(); } catch {} });
  }

  function resume() {
    if (!started) return;
    paused = false;
    cut.querySelectorAll('.timed').forEach(el => el.classList.remove('paused'));
    hudRoot.querySelectorAll('.timed').forEach(el => el.classList.remove('paused'));
  }

  function go(target, beatName) {
    if (!target) return;
    if (SCREENS.has(target)) {
      screen = target;
      chapterId = null;
      beat = beatName || null;
    } else {
      const ch = CONTENT.crises.find(c => c.id === target);
      if (!ch) return;
      screen = 'chapter';
      chapterId = ch.id;
      beat = beatName || 'alarm';
      if (started && stage) stage.snap(ch.waypoint);
      if (beat === 'act' || beat === 'alarm') fireCheckpoint();
    }
    if (started) paintCut();
  }

  function start() {
    if (started) return;
    started = true;
    paused = false;
    hud.unlock(['o2-gauge'], false);
    const c = Q.get('c'), s = Q.get('screen');
    if (c) go(c, Q.get('beat') || 'alarm');
    else go(s || 'title');
  }

  function replayCheckpoint() {
    if (!started) return;
    const ch = chapterOf();
    go(ch.id, 'act');
  }

  const api = {
    get stage() { return stage; },
    get hud() { return hud; },
    get state() {
      const ch = chapterOf();
      return { started, paused, screen, chapter: chapterId, beat, chapterNum: ch.chapter, title: ch.title, name: ch.name };
    },
    start, pause, resume, go,
    skip() {},
    replayCheckpoint,
    onCheckpoint(cb) { checkpointCbs.push(cb); },
    onTimer(cb) { timerCb = cb; },
    trackAudio(a) { audios.push(a); },
  };
  window.__game = api;
  return api;
}
