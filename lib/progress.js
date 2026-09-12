// Progress + unlock contract — the ONLY thing shared between the game (index.html + lib/engine.js)
// and the hangar/pause UI (lib/hangar.js + hangar.html). Owned by both, changed by neither alone.
//
// The game calls PROGRESS.unlock(id) as beats complete. The hangar reads PROGRESS.entries(CONTENT, missions)
// and renders whatever is unlocked. Neither side reaches into the other's internals.
//
//   import { PROGRESS, ids } from './lib/progress.js';
//   PROGRESS.unlock(ids.chapter('air'));        // → true if newly unlocked, fires 'etl:unlock' on document
//   PROGRESS.has(id) · PROGRESS.all() · PROGRESS.reset()
//   PROGRESS.reach(catalogue)                   // → { count, total, years[], first, last } for the timeline
//   PROGRESS.entries(CONTENT, missions, ARCHIVE) // → full catalogue, each { id, kind, unlocked, ... }
//
// IDs are derived from content.js structure, so nobody has to edit content.js to add an unlock
// (which keeps the two workstreams out of each other's diffs).
//   chapter:air · fix:air · find:move:1 · moment:signal:0 · moment:opener:1 · moment:finale:3
//   artifact:drill-im2 · mission:Chandrayaan-3 · screen:map · screen:epilogue · event:salyut-7
//
// Archive events (data/archive.js) are things she never lived through. They have no unlock of their own:
// each rides along with the story id in its `with` field, so the library grows as she discovers.
//
// ?unlock=all unlocks everything (build the hangar without playing through), ?unlock=none clears.

const KEY = 'etl-progress';
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const write = list => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {} };

export const ids = {
  chapter: id => `chapter:${id}`,
  fix: id => `fix:${id}`,
  find: (id, i) => `find:${id}:${i}`,
  moment: (part, i) => `moment:${part}:${i}`,     // part = 'opener' | chapter id | 'finale'
  artifact: salvage => `artifact:${salvage}`,     // salvage id from salvageMap beats
  mission: name => `mission:${name}`,             // mission name prefix used in salvageMap beats
  screen: name => `screen:${name}`,
  event: id => `event:${id}`,                     // archive entry, unlocked by its `with` id
};

const q = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('unlock') : null;
let unlocked = q === 'none' ? [] : read();
if (q === 'none') write([]);

export const PROGRESS = {
  get openAll() { return q === 'all'; },
  has(id) { return this.openAll || unlocked.includes(id); },
  all() { return [...unlocked]; },
  unlock(id) {
    if (!id || unlocked.includes(id)) return false;
    unlocked = [...unlocked, id]; write(unlocked);
    if (typeof document !== 'undefined') document.dispatchEvent(new CustomEvent('etl:unlock', { detail: { id, kind: id.split(':')[0], count: unlocked.length } }));
    return true;
  },
  unlockMany(list) { return (list || []).map(id => this.unlock(id)).filter(Boolean).length; },
  reset() { unlocked = []; write(unlocked); if (typeof document !== 'undefined') document.dispatchEvent(new CustomEvent('etl:unlock', { detail: { id: null, kind: 'reset', count: 0 } })); },

  // The catalogue the hangar renders. Every entry carries everything needed to show it.
  // How far she has got, for the hangar timeline and the "12 / 107" counter.
  // Pass the catalogue you already have; nothing is recomputed.
  reach(catalogue) {
    const on = catalogue.filter(e => e.unlocked);
    const years = [...new Set(on.map(e => e.year).filter(Number.isFinite))].sort((a, b) => a - b);
    return { count: on.length, total: catalogue.length, years, first: years[0] ?? null, last: years[years.length - 1] ?? null };
  },
  entries(C, missions = [], archive = []) {
    const out = [];
    const push = e => out.push({ ...e, unlocked: PROGRESS.has(e.id) });
    const moments = (part, key, where) => (part.relive || []).forEach((r, i) => push({
      id: ids.moment(key, i), kind: 'moment', year: r.year, title: r.text.split('. ')[0],
      text: r.text, img: r.img || null, audio: r.audio || null, date: r.date || null, live: !!r.live,
      projected: !!r.projected, basis: r.basis || null, where, sources: part.sources || [],
    }));
    moments(C.opener, 'opener', 'Prologue');
    for (const c of C.crises) {
      push({ id: ids.chapter(c.id), kind: 'chapter', title: `${c.chapter}. ${c.title}`, text: c.alarm.log, mood: c.mood, where: c.name, sources: c.sources });
      push({ id: ids.fix(c.id), kind: 'fix', title: c.interaction.label, text: c.payoff.lines.join(' '), solvedBefore: c.payoff.solvedBefore, where: c.name, sources: c.sources });
      (c.finds || []).forEach((f, i) => push({ id: ids.find(c.id, i), kind: 'find', year: f.year || null, title: (f.text || '').split('. ')[0], text: f.text, img: f.img || null, projected: !!f.projected, basis: f.basis || null, where: c.name, sources: c.sources }));
      moments(c, c.id, c.name);
    }
    moments(C.finale, 'finale', 'Epilogue');

    // Artifacts: the salvage pins, with the real mission row behind them
    for (const b of (C.salvageMap?.beats || [])) {
      const m = b.match ? missions.find(x => x.name.startsWith(b.match)) : null;
      if (b.salvage) push({ id: ids.artifact(b.salvage), kind: 'artifact', year: b.year, title: b.match, text: b.log, img: b.sketch || b.img || null, mission: m || null, where: 'Salvage' });
      else if (b.match) push({ id: ids.mission(b.match), kind: 'mission', year: b.year, title: b.match, text: b.log, img: b.sketch || b.img || null, mission: m || null, where: 'Archive' });
    }
    push({ id: ids.screen('map'), kind: 'screen', title: 'The salvage map', text: C.salvageMap.summary, where: 'Archive' });
    push({ id: ids.screen('epilogue'), kind: 'screen', title: 'Bhoomi', text: C.finale.closing, where: 'Epilogue', sources: C.finale.sources || [] });

    // The Lunar Library: events she never lived through, each riding along with the beat it rhymes with
    for (const e of archive) out.push({
      ...e, id: ids.event(e.id), kind: 'event', with: e.with, unlocked: PROGRESS.has(e.with),
      where: 'Lunar Library', img: null,
    });
    return out;
  },
};

if (typeof window !== 'undefined') window.__progress = PROGRESS;
